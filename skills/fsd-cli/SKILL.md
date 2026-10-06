---
name: fsd-cli
description: Beta skill for using create-fsd-architecture to scaffold supported Feature-Sliced Design projects and generate feature, entity, widget, or page slices. Trigger for requests to initialize a new FSD project, scaffold a feature or auth flow, create an entity, widget, or page, inspect an FSD CLI project, safely check an upgrade, or audit and guide incremental migration of an existing React/Vite, Next.js, Vue/Vite, Nuxt, or SvelteKit application. Inspect the project first and never invent an init, segment, or migration command the CLI does not provide.
---

# FSD CLI

Use the CLI as the structural execution layer. The CLI owns supported project
scaffolding, slice files, public APIs, framework route wrappers, configuration,
and managed upgrades. The agent owns business logic and any unsupported manual
work.

## Workflow

1. Inspect `package.json`, `fsd.config.json`, `.fsd/manifest.json`, the source
   tree, lockfiles, and existing slices before choosing an action.
2. Identify whether the request targets a new project or an existing project.
   For existing non-CLI applications, read
   [references/existing-projects.md](references/existing-projects.md) and use the
   supported audit/guided-migration workflow.
3. Map the request to a supported operation. Read
   [references/scaffolding.md](references/scaffolding.md) for ambiguous intent.
4. Read [references/commands.md](references/commands.md) before composing a CLI
   command. Use only documented syntax and options.
5. Read [references/frameworks.md](references/frameworks.md) when framework
   detection, source roots, stack choices, or page routing matters.
6. Preview destructive or uncertain work with `--dry-run`. Do not use `--force`
   unless the user intends to replace the existing target or slice.
7. Run the command from the correct directory, inspect every generated or
   changed path, then implement requested business behavior.
8. Run relevant project checks and report the command, generated structure,
   follow-up implementation, validation, and any unsupported part.

## Non-negotiable boundaries

- Prefer FSD CLI over manually recreating an operation it supports.
- Do not initialize again when `fsd.config.json` or a valid existing FSD CLI
  structure shows the project is already configured.
- The CLI creates new projects; it has no command that initializes an arbitrary
  existing application in place.
- The only slice generator types are `feature`, `entity`, `widget`, and `page`.
  There is no standalone segment generator. A request for only `ui`, `api`, or
  `model` may require using a supported slice generator and then editing its
  output, or doing narrowly scoped manual work.
- `feature auth` is a special complete auth scaffold. Its endpoints and UI are
  starting points, not a deployed authentication backend.
- Never treat `--force` as an upgrade mechanism. Use the `upgrade` command only
  for CLI-owned tooling that its plan can prove safe to change.
- Preserve existing naming, source-root, routing, public-API, package-manager,
  and stack conventions. Read
  [references/architecture-rules.md](references/architecture-rules.md) before
  modifying an existing project.
- If the CLI cannot perform the requested structure, say so and continue
  manually only when that remains within the user's request.

This skill complements the official Feature-Sliced Design guidance. It does not
replace the methodology or decide ambiguous architectural ownership without
project context.
