// data/products.ts
//
// The actual catalog content now lives in data/products.json, which is
// read and written by the admin tool at /admin. You can still hand-edit
// products.json directly if you'd rather skip the tool for a quick fix.

import productsData from "./products.json";

export type Product = {
  slug: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
};

export const products = productsData as Product[];
