import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fetchCart, CartApiError } from '../src/features/cart/api/fetchCart.ts';
const fixture = { id: 'cart-1', items: [{ productId: 'p1', quantity: 2 }] };
test('success decodes controlled response and sends GET plus cancellation signal', async () => {
  const signal = new AbortController().signal;
  let observed;
  const result = await fetchCart({ signal, fetchImpl: async (url, options) => {
    observed = {url, options};
    return new Response(JSON.stringify(fixture), {status: 200});
  }});
  assert.deepEqual(result, fixture);
  assert.equal(observed.url, '/api/cart');
  assert.equal(observed.options.method, 'GET');
  assert.equal(observed.options.signal, signal);
});
test('HTTP failure exposes status without accepting response data', async () => {
  await assert.rejects(fetchCart({fetchImpl: async () => new Response('private-error', {status: 503})}),
    error => error instanceof CartApiError && error.kind === 'http' && error.status === 503 && !error.message.includes('private-error'));
});
test('network failure has a stable error contract', async () => {
  await assert.rejects(fetchCart({fetchImpl: async () => { throw new TypeError('failed fetch'); }}),
    error => error instanceof CartApiError && error.kind === 'network');
});
test('malformed JSON rejects', async () => {
  await assert.rejects(fetchCart({fetchImpl: async () => new Response('{', {status: 200})}),
    error => error instanceof CartApiError && error.kind === 'invalid-response');
});
test('malformed product quantities reject', async () => {
  for (const quantity of [-1, 0, 1.5, '2']) {
    await assert.rejects(fetchCart({fetchImpl: async () => new Response(JSON.stringify({id:'c',items:[{productId:'p',quantity}]}))}),
      error => error instanceof CartApiError && error.kind === 'invalid-response');
  }
});
test('empty cart succeeds', async () => {
  assert.deepEqual(await fetchCart({fetchImpl: async () => new Response(JSON.stringify({id:'c',items:[]}))}),{id:'c',items:[]});
});
test('cancellation remains distinguishable', async () => {
  const controller = new AbortController();controller.abort();
  const aborted = new DOMException('Aborted', 'AbortError');
  await assert.rejects(fetchCart({signal:controller.signal, fetchImpl: async () => {throw aborted;}}),error => error === aborted);
});
test('existing UI and consumer bytes survive; sentinel and CartView exports remain', () => {
  const before = JSON.parse(readFileSync(new URL('../../before-hashes.json', import.meta.url), 'utf8'));
  for (const path of ['src/features/cart/ui/CartView.tsx','src/app/App.tsx']) {
    const bytes = readFileSync(new URL('../'+path,import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),before['react-cart/'+path]);
  }
  const barrel = readFileSync(new URL('../src/features/cart/index.ts',import.meta.url),'utf8');
  assert.ok(barrel.startsWith("export const CART_SENTINEL = 'keep-existing-public-api';\nexport { CartView } from './ui/CartView';\n"));
  assert.ok(barrel.includes("export { fetchCart, CartApiError } from './api/fetchCart';"));
});
