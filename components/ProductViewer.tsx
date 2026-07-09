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
  // Layout direction is decided by the declared primary photo's own
  // orientation, not whichever thumbnail happens to be showing, so the
  // layout doesn't jump around as you click between thumbnails.
  const [primaryOrientation, setPrimaryOrientation] = useState<"portrait" | "landscape">(
    "landscape"
  );

  const goTo = useCallback(
    (slug: string) => {
      router.push(`/product/${slug}`);
    },
    [router]
  );

  const goBack = useCallback(() => {
    router.push("/");
  }, [router]);

  // Reset to the primary photo whenever we land on a different product.
  useEffect(() => {
    setActiveIndex(0);
  }, [product.slug]);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      setPrimaryOrientation(img.naturalWidth >= img.naturalHeight ? "landscape" : "portrait");
    };
    img.src = product.image;
  }, [product.image]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(prevSlug);
      if (e.key === "ArrowRight") goTo(nextSlug);
      if (e.key === "Escape") goBack();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo, goBack, prevSlug, nextSlug]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Ignore mostly-vertical swipes so scrolling isn't hijacked.
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD_PX) {
      if (dx > 0) {
        goTo(prevSlug);
      } else {
        goTo(nextSlug);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  const hasThumbnails = allImages.length > 1;
  const isPortrait = primaryOrientation === "portrait";

  return (
    <main
      className="relative h-[100dvh] w-full overflow-hidden bg-walnut"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stage: primary image + thumbnail strip, letterboxed to handle
          mixed portrait/landscape gracefully. Thumbnails sit beside the
          image when the primary is portrait, below it when landscape. */}
      <div className="absolute inset-0 flex items-center justify-center px-4 pb-40 pt-20 sm:px-10 sm:pb-44 sm:pt-24">
        <div
          className={`flex h-full w-full max-w-5xl ${
            isPortrait ? "flex-row items-center gap-4 sm:gap-6" : "flex-col items-center gap-3 sm:gap-4"
          }`}
        >
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
            <div
              className={
                isPortrait
                  ? "flex max-h-full flex-col gap-2 overflow-y-auto py-1 pr-1"
                  : "flex max-w-full flex-row gap-2 overflow-x-auto px-1"
              }
            >
              {allImages.map((src, index) => (
                <button
                  key={src}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View photo ${index + 1} of ${allImages.length}`}
                  aria-current={index === activeIndex}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-md sm:h-20 sm:w-20 ${
                    index === activeIndex ? "ring-2 ring-brass" : "opacity-60"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Back to catalog - top left glass control */}
      <button
        onClick={goBack}
        aria-label="Back to catalog"
        className="glass absolute left-4 top-4 sm:left-6 sm:top-6 z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-ivory font-body text-sm"
      >
        <span aria-hidden="true">&larr;</span>
        Catalog
      </button>

      {/* Lot label - top right */}
      <div className="glass absolute right-4 top-4 sm:right-6 sm:top-6 z-10 rounded-full px-4 py-2.5 font-mono text-xs tracking-widest text-ivory">
        LOT {String(lotNumber).padStart(2, "0")} / {String(totalLots).padStart(2, "0")}
      </div>

      {/* Title + description - bottom, above the nav bar */}
      <div className="absolute bottom-24 left-0 right-0 z-10 px-6 text-center sm:bottom-28">
        <h1 className="font-display text-2xl italic text-ivory sm:text-3xl">
          {product.title}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted sm:text-base">
          {product.description}
        </p>
      </div>

      {/* Swipe navigation - bottom glass bar */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 sm:bottom-6">
        <button
          onClick={() => goTo(prevSlug)}
          aria-label="Previous piece"
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-ivory text-lg"
        >
          &larr;
        </button>
        <button
          onClick={() => goTo(nextSlug)}
          aria-label="Next piece"
          className="glass flex h-12 w-12 items-center justify-center rounded-full text-ivory text-lg"
        >
          &rarr;
        </button>
      </div>
    </main>
  );
}
