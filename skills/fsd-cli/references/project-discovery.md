# Discover the application before writing

## Root decisions

A repository, workspace package, application, and FSD source root can differ.
Start from the user's target; inspect package.json, lockfiles and directory layout.
If several applications are plausible, identify their paths and ask which target
only when the request does not already choose it. Never select the first package
merely because it has React dependencies.

Use the optional inventory helper with --root. It scans a bounded set of known
workspace locations and never follows symlinks. It deliberately lists npm script
names, not their bodies, and never opens env files. Returned roots are hints.
Validate tsconfig aliases and actual routes manually; config syntax may contain
comments or extends chains that the helper does not resolve.

## Evidence precedence

1. User's chosen application and local AGENTS/maintained project conventions.
2. Actual package versions, source layout, routing/config and import consumers.
3. fsd.config.json when valid; reconcile mismatches rather than blindly obey it.
4. Template defaults only when creating a new project or the layout agrees.

SvelteKit/Nuxt/Next packages dominate their React/Vue implementation dependencies.
Conflicting top-level frameworks need investigation. A package without an explicit
framework is unknown, even though the CLI defaults to React. Missing six layers
in an existing application is not proof its current architecture is wrong: the
CLI expects them, while the methodology can use only layers the app needs.

## Ownership and baseline

Inspect git status and the manifest, but do not expose remote credentials or env
values. A manifest's mere existence is not proof that every file is owned or
unchanged. Upgrade dry-run performs its own ownership validation. Inventory
reports only presence; inspect managed hashes when the operation needs it.

Choose the existing package manager from the lockfile and project policy.
Multiple lockfiles need explanation, not automatic deletion. Check installed
engines for framework/SDK separately from the CLI. Record the smallest relevant
baseline before mutation; failing unrelated checks remain identified separately.
