export type CartItem = { productId: string; quantity: number };
export type Cart = { id: string; items: CartItem[] };
export class CartApiError extends Error {
  kind: 'http' | 'network' | 'invalid-response';
  status?: number;
  constructor(kind: 'http' | 'network' | 'invalid-response', message: string, status?: number) {
    super(message);
    this.name = 'CartApiError';
    this.kind = kind;
    this.status = status;
  }
}
export async function fetchCart(options: { fetchImpl?: typeof fetch; signal?: AbortSignal } = {}): Promise<Cart> {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  let response: Response;
  try {
    response = await fetchImpl('/api/cart', { method: 'GET', signal: options.signal });
  } catch (error) {
    if (options.signal?.aborted || (error instanceof Error && error.name === 'AbortError')) throw error;
    throw new CartApiError('network', 'Unable to fetch cart');
  }
  if (!response.ok) throw new CartApiError('http', 'Cart request failed', response.status);
  let data: unknown;
  try { data = await response.json(); }
  catch { throw new CartApiError('invalid-response', 'Cart response is not JSON'); }
  if (typeof data !== 'object' || data === null || !('id' in data) || typeof data.id !== 'string' ||
      !('items' in data) || !Array.isArray(data.items) || !data.items.every((item: unknown) =>
        typeof item === 'object' && item !== null && 'productId' in item && typeof item.productId === 'string' &&
        'quantity' in item && typeof item.quantity === 'number' && Number.isInteger(item.quantity) && item.quantity > 0)) {
    throw new CartApiError('invalid-response', 'Cart response has an invalid shape');
  }
  return { id: data.id, items: data.items.map((item: CartItem) => ({ productId: item.productId, quantity: item.quantity })) };
}
