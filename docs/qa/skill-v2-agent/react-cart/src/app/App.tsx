import { CartView, CART_SENTINEL } from '../features/cart';
export function App() { return <main data-sentinel={CART_SENTINEL}><CartView /></main>; }
