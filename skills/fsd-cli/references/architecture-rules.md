# Existing-project safety rules

## Before mutation

- Run from the intended project root, not a workspace or repository parent.
- Inspect `git status`; preserve unrelated and uncommitted user changes.
- Read `fsd.config.json` and `.fsd/manifest.json` when present.
- For CLI inspection confirm the configured source root and expected layers: `app`, `pages`,
  `widgets`, `features`, `entities`, and `shared`.
- Check for an existing slice and any route file a page generator would touch.
- Use `check`, `doctor`, or `config` for evidence, not as initialization steps.

## Generation

- Use kebab-case names that normalize to a value beginning with a letter.
- Preview uncertain generation with `--dry-run`.
- Keep the generated `index.ts` public API; consumers should import through it.
- Use public APIs across slices. Trace a legacy deep import and its behavior
  before a scoped migration; its existence alone is not a methodology exemption.
- Do not manually add folders that duplicate a supported generator run.
- Treat page generation as both slice creation and route integration.

## Existing output

The CLI rejects an existing slice by default. Do not automatically retry with
`--force`. Inspect the existing slice and ask for or rely on clear replacement
intent. `--force` replaces the whole slice and may replace the generated route
surface associated with a page.

## Upgrades

- Start with `upgrade --dry-run` or `upgrade --check`.
- Apply only when the plan is conflict-free and the requested mutation is
  authorized.
- Never use project creation or slice `--force` as an upgrade shortcut.
- Preserve application code, environment files, secrets, custom scripts,
  unrelated dependencies, and unowned configuration.
- A dirty-worktree override is a conscious exception, not a default.

## After mutation

- Inspect every generated and updated path.
- Implement business logic without moving or renaming generated structure
  unless the project convention requires it.
- Run the project's formatter, typecheck, tests, and build in proportion to the
  change.
- Report which files came from the CLI and which were written manually.


## Methodology versus CLI requirements

The methodology does not require filling all layers in every app. Existing apps
can use only layers they need. Respect layer direction, same-layer slice isolation
and public APIs; App/Shared are sliceless. Scope any methodology exception explicitly.
Check/doctor layer presence is not import validation or domain ownership proof.
Use architecture-review.md for review and domain-decisions.md for decomposition.
