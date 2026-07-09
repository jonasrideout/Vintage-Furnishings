// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

export default function CatalogPage() {
  return (
    <main className="min-h-screen px-5 py-10 sm:px-10 sm:py-16 lg:px-20">
      <header className="mb-12 sm:mb-16">
        <p className="font-mono text-xs tracking-[0.3em] text-muted uppercase">
          My pieces
        </p>
      </header>

      {products.length === 0 && (
        <p className="text-muted text-sm">
          Nothing here yet — use the Catalog Builder tool to prep pieces, then
          drag the exported files into this repo.
        </p>
      )}

      <ul>
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/product/${product.slug}`}
              className="group flex items-center gap-6 py-6 sm:py-8 focus-visible:outline-2 rounded-md transition-colors hover:bg-black/[0.02]"
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-md bg-panel">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="112px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <p className="font-display text-lg sm:text-xl text-ink leading-snug">
                {product.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
