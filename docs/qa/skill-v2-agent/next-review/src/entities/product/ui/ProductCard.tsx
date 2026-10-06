import type { ProductDto } from '../model/types';
export function ProductCard({product}: {product:ProductDto}) { return <article>{product.name}</article>; }
