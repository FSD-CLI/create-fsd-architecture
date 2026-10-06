# React + Vite implementation guide

## Inspect before generation

CLI template source root: `src`. Existing app conventions can differ.
Read package versions, config, routes, aliases, providers and current consumers.
`frameworks.md` owns the capability matrix; `commands.md` owns command syntax.

## Routing and composition

Inspect the installed React Router mode and managed routing entry. Preserve loaders, nested routes, basename and existing providers. CLI page generation expects managed router markers; arbitrary custom routers need scoped manual integration.

## State, forms and SSR

Reuse configured query/client stores and forms. A page-local state need not become a feature store. Keep mutations and API consumers through public APIs.

## Integration acceptance

Inspect generated imports and public APIs; implement the requested behavior.
Run existing lint/types/tests/build commands, then check affected routes and error
states. Preserve UI/copy and locale resolution. Auth needs the separate
`../auth-supabase.md` contract and real staging evidence where claimed.
A passing generated build is not proof of authorization, RLS or production security.

For migration, establish before/after behavior and a byte-restorable batch.
The committed pilot is React/Vite only; this framework guide is implementation
instruction, not evidence of a completed legacy migration for every app.
