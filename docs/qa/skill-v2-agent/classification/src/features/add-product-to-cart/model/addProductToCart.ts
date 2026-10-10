export function addProductToCart(productId: string, cart: {add(id:string): void}) { cart.add(productId); }
