# Vue + Vite implementation guide

## Inspect before generation

CLI template source root: `src`. Existing app conventions can differ.
Read package versions, config, routes, aliases, providers and current consumers.
`frameworks.md` owns the capability matrix; `commands.md` owns command syntax.

## Routing and composition

Inspect the actual Vue Router entry, history mode and provider setup. CLI wrappers modify managed routing markers; preserve manually owned routes and guards.

## State, forms and SSR

Use existing Pinia, Vue Query and VeeValidate contracts. Keep composable lifecycle cleanup and cancellation. Query state is not duplicated manually in a second store.

## Integration acceptance

Inspect generated imports and public APIs; implement the requested behavior.
Run existing lint/types/tests/build commands, then check affected routes and error
states. Preserve UI/copy and locale resolution. Auth needs the separate
`../auth-supabase.md` contract and real staging evidence where claimed.
A passing generated build is not proof of authorization, RLS or production security.

For migration, establish before/after behavior and a byte-restorable batch.
The committed pilot is React/Vite only; this framework guide is implementation
instruction, not evidence of a completed legacy migration for every app.
