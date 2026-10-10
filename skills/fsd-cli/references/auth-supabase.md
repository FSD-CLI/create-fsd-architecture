# Auth and Supabase integration

## Capability gate

Published CLI 2.6.1 generates auth UI/schema and example integration endpoints.
Supabase --auth-provider belongs to CLI candidate d5a0bb1, not to that artifact.
Read commands.md and actual --help before choosing a flag. Selecting Skill v2
never installs a different CLI or grants backend access.

The candidate writes an adapter into the auth slice, without installing SDKs,
provisioning a Supabase project or editing env files. Actual SDK2.117.2 requires
Node >=22; recheck the chosen SDK engine. CLI runtime and application engines
are different contracts.

## Browser contract

Create a browser Supabase client from public application URL and publishable/anon
key, then configureSupabaseAuth(client) through the slice public API before forms
submit. Do not read secret values for a report. Never put service-role/secret keys
in the frontend. SDK persistence/refresh owns the session; onAuthStateChange must
synchronize application state. Local store clearing alone is not provider logout.

Login normalizes a real session and rejects absent sessions/provider errors.
Signup may return null when confirmation is required: display instructions rather
than authenticated success. Recovery uses email OTP with recovery type, not signup
verification. Email recovery templates must expose {{ .Token }} for this flow.
Password reset needs matching confirmation and verified identity; proof is consumed
once. Use provider signOut and handle errors without logging passwords/OTPs/tokens.
If query hooks are disabled, connect submit handlers explicitly to API methods.

## SSR and authorization

The browser singleton rejects server setup. Use a request-local server SDK and the
framework cookie/callback integration. Do not share mutable request sessions across
users. Server actions and protected data routes enforce authorization independently
of UI visibility. RLS policies are application/backend work; the adapter does not
create or certify them. For actual API details consult installed versions and
[Supabase SSR guidance](https://supabase.com/docs/guides/auth/server-side).

## Acceptance

Local: provider doubles for failure/confirmation/recovery/logout, actual SDK type
compatibility, and generated framework lint/types/build. Staging: authorized test
project, signup/mail confirmation/login, invalid credentials, recovery/expired OTP,
reset/new-password login, refresh/logout and unauthorized RLS rejection. Check SSR
only where used. Retain redacted logs and versions; local mocks are not live E2E.
Never use production accounts automatically or send credentials in chat. Missing
staging access blocks live-acceptance claims, not independent local work.

## Older-CLI manual fallback and provenance

If the app/framework and requested auth scope are identified, absence of a CLI
flag does not forbid authorized ordinary code edits. Inspect the existing client,
forms/store and API contract; consult official docs for the installed SDK; add a
small adapter in the existing auth API boundary, update its public API/consumers,
and test success/failure/confirmation/recovery/logout contracts. Do not replace
an existing auth slice. Installing an SDK or configuring staging must remain
within the requested scope; missing integration details need focused clarification.
Keep SSR clients/callbacks separate and record live acceptance as unverified.

A request for an 'official adapter' can mean this CLI's supported integration or
the official Supabase SDK. Neither implies Feature-Sliced Design maintainers
endorse the community CLI. Resolve that wording when it materially changes the
requested dependency or support contract; do not claim external endorsement.
