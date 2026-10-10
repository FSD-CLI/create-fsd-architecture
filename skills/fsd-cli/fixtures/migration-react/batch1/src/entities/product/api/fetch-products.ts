import type { Product } from "../model/product";
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");
  if (!response.ok) throw new Error("Catalog request failed");
  return response.json();
}
