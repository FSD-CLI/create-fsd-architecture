# Implement a vertical outcome

Write the concrete user behavior and acceptance conditions before choosing files.
Keep API shape, state authority and consumer boundaries explicit. Generate the
supported scaffold, inspect it, then implement only the requested business scope.

## Contracts and state

Use existing API clients, providers and package-manager choices. Define input,
result, error and cancellation behavior. Unknown backend contracts need a declared
assumption or a focused question; a controlled response can validate UI behavior
but is not evidence of a deployed service. Keep DTO mapping at a clear boundary.

Server-state caching and mutations belong to existing query conventions. Client
state is not a duplicate backend cache or a substitute for permissions. Invalidation,
optimistic updates and rollback must reflect observed product behavior. Do not add
a new state/form library just to match a preferred template.

## UI and integration

Cover loading, empty, success and failure states when the outcome needs them.
Preserve supplied copy, accessibility, layout boundaries and locale behavior.
Update imports through public APIs and connect actual route/provider consumers.
Generated examples and TODOs do not count as completed business behavior.

In SSR apps, separate request data from browser-only APIs. Check initial HTML when
crawler-visible content or locale isolation is required. A client flag is not an
authorization check. Read the applicable framework guide for lifetime and routing.

## Verification and handoff

Test meaningful behavior: result/error mapping, mutation effects, route access and
state recovery. Run project lint/types/build and relevant tests in proportion to
risk. Use browser checks for observable interactions where they matter. Do not
add tests that merely repeat file names or implementation wording.

Report the feature outcome, CLI-generated paths versus manual logic, verification
commands, and unverified integrations. Do not publish, contact another person or
change remote data just because implementation was authorized.
