// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function CatalogPage() {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-10 sm:py-16 lg:px-20">
      <header className="mb-10 sm:mb-14">
        <p className="font-mono text-xs tracking-[0.3em] text-brass uppercase mb-3">
          Estate Collection
        </p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory italic">
          The Catalog
        </h1>
        <p className="mt-3 text-muted text-sm sm:text-base max-w-md">
          {products.length} pieces. Tap any lot to view full size, then swipe
          through the rest.
        </p>
      </header>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, index) => (
          <li key={product.slug}>
            <Link
              href={`/product/${product.slug}`}
              className="group block focus-visible:outline-2"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-walnutdeep">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute top-2 left-2 font-mono text-[10px] tracking-widest text-ivory/90 bg-black/40 px-2 py-1 rounded">
                  LOT {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 font-display text-ivory text-sm sm:text-base leading-snug">
                {product.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
