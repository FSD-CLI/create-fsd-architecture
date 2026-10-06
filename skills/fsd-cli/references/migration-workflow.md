# Existing application migration workflow

Approved October 6, 2026. v1 is Skill-only: audit, plan, authorized incremental
writes and verification. The CLI has no arbitrary-app migrate command. Official
support covers React/Vite, Next App Router, Vue/Vite, Nuxt and SvelteKit. The first
pilot validates a synthetic React/Vite legacy application only.

## Audit and map

Inspect source roots, workspaces, routing, SSR/client ownership, locale boundaries,
API clients, stores, effects and consumers. Record the starting commit and dirty
files. Preserve all existing integrations and application contracts.

The map has schemaVersion, framework, sourceRoot, baseline and ordered batches.
Each batch has an id and entries with currentPath, targetPath, layer, slice,
reason, risk, consumers, routeImpact and verification commands. Use the committed
[example map](../fixtures/migration-react/migration-map.json). Paths stay within
verified source roots; reject traversal, ambiguous roots and unreviewed symlinks.

## Baseline

Run lint, types, tests, build and relevant runtime checks before writing. Record
command, cwd, version, exit and raw output. Missing tests require an adequate
behavior baseline before the affected writes. Existing failures stay visible;
audit and planning may continue, but dependent migration writes wait until the
verification gap is resolved. Do not relabel failures as passes.

## Batch and authorization

Work on one route/domain at a time. A request to migrate the identified scope
is authorization for reversible edits within it. Ask only for ambiguous business
ownership, behavior changes, new destructive scope or new external side effects;
do not repeatedly ask for permission already granted. Add Public APIs and update
consumers atomically. Avoid cross-slice deep imports, upward dependencies and
cycles. App/Shared segment relationships follow the existing FSD conventions.

Keep routes, state semantics, UI, SSR and locale behavior stable. No big-bang
rewrite; do not scaffold over the application root. A config is not ownership.
Never use upgrade to rewrite unowned business code or adopt it into a manifest.

## Verify and recover

Before each batch retain a reversible commit or independent byte snapshot of
changed files, removals, lock/config and preexisting uncommitted work. After the
batch run lint/types/tests/build, import-boundary/cycle checks, routes and runtime
interactions. If a regression cannot be resolved, restore that batch's snapshot;
remove only newly created paths in its recorded scope. Never use a whole-project
hard reset that destroys preexisting work. Verify byte restoration and rerun
checks/runtime before starting the next batch.

## Pilot scope

The committed before/batch1/after source trees preserve /catalog, /api/products,
cart increments, the wildcard route and the API error message. Batch1 extracts
Product model/API; batch2 extracts add-product and catalog page/App composition.
The fault injection creates a type error, restores batch1 byte hashes and reruns
checks. package/lock bytes are preserved; no CLI manifest is created. The catalog
is representative of flat domain/API/state/route code, not a production app.

The pilot browser checks passed for before/batch1/after/rollback on Chromium151,
with controlled API responses and no page errors. See the committed fixture
evidence. Broader framework results must be recorded explicitly. Build and
unit success alone do not certify runtime preservation or SSR/locale behavior.
