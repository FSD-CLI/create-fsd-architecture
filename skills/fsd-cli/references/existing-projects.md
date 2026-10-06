# Existing applications: audit and guided migration

The canonical [support policy](https://github.com/FSD-CLI/cli/blob/main/docs/EXISTING-PROJECT-SUPPORT.md)
includes React/Vite, Next.js App Router, Vue/Vite, Nuxt and SvelteKit applications
that were not created with FSD CLI.

Start with an architecture audit and a migration map. Record baseline lint,
types, tests and build results; identify source roots, routes, imports, state,
API integrations and ownership. Missing or failing checks limit what can be
verified and must remain visible.

When the user authorizes migration, refactor one domain/route per batch. The map
must explain current path, target layer/slice, responsibility, consumers, route
impact, risk and checks. Update public APIs and consumers together, preserve
SSR/client and locale boundaries, and check deep/circular imports. Ask only when
ownership or behavioral scope is unclear; do not repeat granted authorization.
Use a reversible commit/backup and verify after each batch.

This workflow uses ordinary agent edits. The CLI has no arbitrary-app init or
migrate command. Do not scaffold over the application root, use --force to
upgrade, or create ownership manifests for unverified business code. A saved
config does not make every file CLI-owned. Confirm a compatible FSD contract
before generator dry-runs; managed upgrade only changes verified owned files.

Migration v1 is a Skill workflow with authorized incremental writes, not a new
CLI command. Read [migration-workflow.md](migration-workflow.md) before executing
it. The committed React/Vite fixture covers two batches and a fault-injected
rollback. Its evidence does not certify every existing application or framework.
A packaged CLI planner and broader legacy fixtures remain research.
