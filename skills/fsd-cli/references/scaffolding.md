# Intent-to-scaffolding guide

Map the request to a supported structural operation, then let the agent fill in
business behavior after inspecting generated output.

## Supported mappings

| Natural-language intent | Supported interpretation | CLI action |
| --- | --- | --- |
| “Create a cart feature” | Feature slice named `cart` | `-g feature cart` |
| “Create a product entity” | Entity slice named `product` | `-g entity product` |
| “Create a reusable header section” | Usually a widget named `site-header` | Inspect composition first, then `-g widget site-header` when it is a large reusable UI block. |
| “Create a checkout page” | FSD page slice plus framework route integration | `-g page checkout` |
| “Add authentication flows” | Special auth feature scaffold | `-g feature auth` |
| “Create a new React FSD app” | New React + Vite project | Create with `--framework react-vite`. |

Always use `--dry-run` first if the target name, existing slice, or route impact
is unclear.

## Ambiguous requests

For “add favorites functionality” or similarly broad requests:

1. Inspect existing features, entities, widgets, and pages.
2. Find where the user action and business concept already live.
3. Decide whether a new slice is needed or an existing slice should be edited.
4. Generate only when a new supported slice is justified.

Do not create a `favorites` feature automatically when the project already has
a product interaction feature that owns the behavior.

## Segment requests

The CLI does not expose `generate segment`. It generates a predetermined set of
files based on the slice type and saved stack.

For “create a product entity with ui, api, and model”:

- `-g entity product` creates the supported entity scaffold, which includes
  model and UI output plus a public `index.ts`.
- It does not create an entity API segment.
- Add API files manually only if the architecture and user request justify them;
  do not invent a CLI flag or command.

For a generic feature, generated API/query/state files depend on the saved
server-state and client-state choices. Forms are not added to every generic
feature automatically.

## Auth boundary

`-g feature auth` creates login, registration, forgot-password,
reset-password, and verification-code UI. It conditionally adds API/query,
state, and validation files according to `fsd.config.json`.

The generated endpoints are placeholders under `/auth/*`. The CLI does not
provision a backend, secrets, database, sessions, or deployment. Implement and
verify those separately when requested.

## Existing-project initialization

There is no in-place `init` or `migrate arbitrary project` command. If a user
asks to initialize FSD inside an existing application:

1. Inspect whether it is already an FSD CLI project.
2. Do not run project creation over the existing directory.
3. Explain that in-place initialization is unsupported.
4. Offer either a separately generated reference project or a careful manual
   migration only when the user authorizes that approach.

## Unsupported requests

Do not invent commands for components, processes, app slices, shared segments,
individual segments, deleting or renaming slices, or arbitrary migrations. Use
ordinary code edits when appropriate and clearly distinguish them from CLI
output.

