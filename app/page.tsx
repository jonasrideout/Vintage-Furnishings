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

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {products.map((product) => (
          <li key={product.slug}>
            <Link
              href={`/product/${product.slug}`}
              className="group flex h-36 sm:h-44 overflow-hidden rounded-2xl bg-paper shadow-md transition-shadow duration-200 hover:shadow-lg focus-visible:outline-2"
            >
              <div className="relative w-2/5 shrink-0 bg-shade p-3 sm:p-4">
                <div className="relative h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 40vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </div>
              <div className="flex flex-1 items-start px-6 py-5">
                <p className="font-heading text-lg sm:text-xl text-ink leading-snug">
                  {product.title}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
