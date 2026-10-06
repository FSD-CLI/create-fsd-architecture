# Nuxt implementation guide

## Inspect before generation

CLI template source root: `app`. Existing app conventions can differ.
Read package versions, config, routes, aliases, providers and current consumers.
`frameworks.md` owns the capability matrix; `commands.md` owns command syntax.

## Routing and composition

CLI template uses app/app/routes with configured Nuxt routing; ordinary Nuxt apps can use different pages conventions. Read nuxt.config and current app root before writing wrappers.

## State, forms and SSR

Read runtimeConfig public/private boundaries and installed modules. Initialize request data per request; avoid module-global session state. Pinia/query providers follow current Nuxt integration. Node and security status of the selected dependencies are separate gates.

## Integration acceptance

Inspect generated imports and public APIs; implement the requested behavior.
Run existing lint/types/tests/build commands, then check affected routes and error
states. Preserve UI/copy and locale resolution. Auth needs the separate
`../auth-supabase.md` contract and real staging evidence where claimed.
A passing generated build is not proof of authorization, RLS or production security.

For migration, establish before/after behavior and a byte-restorable batch.
The committed pilot is React/Vite only; this framework guide is implementation
instruction, not evidence of a completed legacy migration for every app.
