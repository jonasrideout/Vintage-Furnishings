// components/ProductViewer.tsx
"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  lotNumber: number;
  totalLots: number;
  prevSlug: string;
  nextSlug: string;
};

const SWIPE_THRESHOLD_PX = 50;

export default function ProductViewer({
  product,
  lotNumber,
  totalLots,
  prevSlug,
  nextSlug,
}: Props) {
  const router = useRouter();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const allImages = [product.image, ...(product.images || [])];
  const [activeIndex, setActiveIndex] = useState(0);

  const goToProduct = useCallback(
    (slug: string) => {
      router.push(`/product/${slug}`);
    },
    [router]
  );

  const goBack = useCallback(() => {
    router.push("/");
  }, [router]);

  const goToPhoto = useCallback(
    (delta: 1 | -1) => {
      setActiveIndex((prev) => (prev + delta + allImages.length) % allImages.length);
    },
    [allImages.length]
  );

  // Reset to the primary photo whenever we land on a different product.
  useEffect(() => {
    setActiveIndex(0);
  }, [product.slug]);

  // Keyboard arrows move between products (not photos) - matches the
  // swipe gesture and the edge arrows, so there's one consistent shortcut
  // for "next/previous piece."
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goToProduct(prevSlug);
      if (e.key === "ArrowRight") goToProduct(nextSlug);
      if (e.key === "Escape") goBack();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goToProduct, goBack, prevSlug, nextSlug]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Ignore mostly-vertical swipes so scrolling isn't hijacked.
    // Swipe moves between products (not photos) - same reasoning as keyboard.
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      if (dx > 0) {
        goToProduct(prevSlug);
      } else {
        goToProduct(nextSlug);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  const hasThumbnails = allImages.length > 1;

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden bg-paper text-ink"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Content column: image+thumbnails take whatever space is available,
          then the arrows/title/description block sits directly under it at
          its own natural height - so a short description doesn't leave a
          gap, and a long one doesn't get clipped. */}
      <div className="absolute inset-0 flex flex-col items-center px-4 pt-20 pb-6 sm:px-10 sm:pt-24 sm:pb-8">
        <div className="flex min-h-0 w-full max-w-5xl flex-1 flex-row items-stretch gap-4 sm:gap-6">
          <div className="relative min-h-0 min-w-0 flex-1">
            <Image
              key={allImages[activeIndex]}
              src={allImages[activeIndex]}
              alt={product.title}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {hasThumbnails && (
            <div className="flex max-h-full shrink-0 flex-col gap-2 overflow-y-auto py-1 pr-1">
              {allImages.map((src, index) => (
                <button
                  key={src}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View photo ${index + 1} of ${allImages.length}`}
                  aria-current={index === activeIndex}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-panel sm:h-20 sm:w-20 ${
                    index === activeIndex ? "ring-2 ring-ink" : "opacity-50"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Photo-nav arrows flank the title/description. A hidden spacer of
            the same width stands in for a missing arrow so the text stays
            centered whether or not this piece has extra photos. */}
        <div className="mt-4 grid w-full max-w-2xl shrink-0 grid-cols-[auto_1fr_auto] items-center gap-3 sm:mt-6 sm:gap-5">
          {hasThumbnails ? (
            <button
              onClick={() => goToPhoto(-1)}
              aria-label="Previous photo of this piece"
              className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink"
            >
              &larr;
            </button>
          ) : (
            <span className="h-9 w-9" aria-hidden="true" />
          )}

          <div className="px-1 text-center">
            <h1 className="font-heading text-2xl text-ink sm:text-3xl">
              {product.title}
            </h1>
            <p className="mx-auto mt-2 max-w-md font-description font-light text-sm text-muted sm:text-base">
              {product.description}
            </p>
          </div>

          {hasThumbnails ? (
            <button
              onClick={() => goToPhoto(1)}
              aria-label="Next photo of this piece"
              className="glass flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink"
            >
              &rarr;
            </button>
          ) : (
            <span className="h-9 w-9" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* Back to catalog - top left glass control */}
      <button
        onClick={goBack}
        aria-label="Back to catalog"
        className="glass absolute left-4 top-4 sm:left-6 sm:top-6 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-ink font-body text-sm"
      >
        <span aria-hidden="true">&larr;</span>
        Catalog
      </button>

      {/* Position in the catalog - top right */}
      <div className="glass absolute right-4 top-4 sm:right-6 sm:top-6 z-10 rounded-full px-4 py-2.5 font-mono text-xs tracking-widest text-ink">
        {String(lotNumber).padStart(2, "0")} / {String(totalLots).padStart(2, "0")}
      </div>

      {/* Previous/next piece - fixed to the screen edges, desktop only.
          On mobile, swipe and (on a connected keyboard) arrow keys cover
          the same action, so the edge buttons would just crowd a small
          screen without adding capability. */}
      <button
        onClick={() => goToProduct(prevSlug)}
        aria-label="Previous piece"
        className="glass absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ink text-lg sm:flex"
      >
        &larr;
      </button>
      <button
        onClick={() => goToProduct(nextSlug)}
        aria-label="Next piece"
        className="glass absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-ink text-lg sm:flex"
      >
        &rarr;
      </button>
    </main>
  );
}
