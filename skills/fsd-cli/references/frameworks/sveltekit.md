# SvelteKit implementation guide

## Inspect before generation

CLI template source root: `src`. Existing app conventions can differ.
Read package versions, config, routes, aliases, providers and current consumers.
`frameworks.md` owns the capability matrix; `commands.md` owns command syntax.

## Routing and composition

Routes live in src/routes with +page.svelte/+page.server and layouts; the CLI page slice gets a thin wrapper. Preserve route groups, load/action contracts, SSR and progressive enhancement.

## State, forms and SSR

Use installed Svelte5 syntax and actual Superforms/Zod versions. Server state is per request; never store authenticated user sessions in a module-global writable store. Preserve action errors, validation and public/private env separation.

## Integration acceptance

Inspect generated imports and public APIs; implement the requested behavior.
Run existing lint/types/tests/build commands, then check affected routes and error
states. Preserve UI/copy and locale resolution. Auth needs the separate
`../auth-supabase.md` contract and real staging evidence where claimed.
A passing generated build is not proof of authorization, RLS or production security.

For migration, establish before/after behavior and a byte-restorable batch.
The committed pilot is React/Vite only; this framework guide is implementation
instruction, not evidence of a completed legacy migration for every app.
