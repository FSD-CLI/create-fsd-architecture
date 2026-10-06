# Next.js App Router implementation guide

## Inspect before generation

CLI template source root: `src`. Existing app conventions can differ.
Read package versions, config, routes, aliases, providers and current consumers.
`frameworks.md` owns the capability matrix; `commands.md` owns command syntax.

## Routing and composition

Read installed-version guides when available. Inspect custom pageExtensions: the CLI template uses page.route.tsx wrappers, whereas ordinary App Router apps often use page.tsx. Existing apps may use screens instead of pages; do not create Pages Router routes accidentally.

## State, forms and SSR

Server Components can compose domain code without browser state. Use client boundaries only where browser APIs are needed. Cookies, auth and cached data must reflect request/user/locale scope; do not configure the Supabase browser singleton on the server.

## Integration acceptance

Inspect generated imports and public APIs; implement the requested behavior.
Run existing lint/types/tests/build commands, then check affected routes and error
states. Preserve UI/copy and locale resolution. Auth needs the separate
`../auth-supabase.md` contract and real staging evidence where claimed.
A passing generated build is not proof of authorization, RLS or production security.

For migration, establish before/after behavior and a byte-restorable batch.
The committed pilot is React/Vite only; this framework guide is implementation
instruction, not evidence of a completed legacy migration for every app.
