import { useEffect, useState } from "react";
import { fetchProducts } from "./api";
import { addProduct } from "./cart";
import type { Product } from "./types";
export function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    fetchProducts().then(data => { if (active) setProducts(data); }).catch(() => { if (active) setError("Catalog request failed"); });
    return () => { active = false; };
  }, []);
  return <main><h1>Catalog</h1><p>Cart: {count}</p>{error && <p role="alert">{error}</p>}{products.map(product => <button key={product.id} onClick={() => setCount(value => addProduct(value))}>Add {product.name}</button>)}</main>;
}
