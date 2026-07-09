// app/product/[slug]/page.tsx
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductViewer from "@/components/ProductViewer";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = products.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const product = products[index];
  const prevProduct = products[(index - 1 + products.length) % products.length];
  const nextProduct = products[(index + 1) % products.length];

  return (
    <ProductViewer
      product={product}
      lotNumber={index + 1}
      totalLots={products.length}
      prevSlug={prevProduct.slug}
      nextSlug={nextProduct.slug}
    />
  );
}
