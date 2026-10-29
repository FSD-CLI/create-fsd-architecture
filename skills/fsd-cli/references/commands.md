# Verified command reference

This reference describes `create-fsd-architecture` 2.7.1, rechecked against the
published package's `--help` and generator source. Recheck `--help` and the
installed version before assuming another release has the same contract. Flags
marked **2.7.0+** do not exist in older installations; never retry them there.

## Entrypoint

`fsd` and `create-fsd-architecture` are the same CLI (the `fsd` bin exists since
2.7.1). Use the published package through `npx` unless the project intentionally
pins or invokes another installation:

```bash
npx create-fsd-architecture@latest --help
npx create-fsd-architecture@latest --version
```

For reproducible automation, replace `latest` with the intended version. The CLI
requires Node.js 22.12.0 or later since 2.7.0; Nuxt and SvelteKit templates need
22.22.2 or later.

## Create a project

```text
create-fsd-architecture [project-name] [options]
fsd create [project-name] [options]
```

Supported create options:

| Option | Contract |
| --- | --- |
| `-f, --framework <id>` | Choose `react-vite`, `nextjs`, `vue-vite`, `nuxt`, or `sveltekit`. `--template` is an accepted alias for `--framework`. |
| `-y, --yes` | Accept defaults. Requires both a project name and `--framework`. |
| `--package-manager <id>` | Choose `npm`, `pnpm`, `yarn`, or `bun`. |
| `--api-client <id>` | Choose `axios` or `fetch`. |
| `--server-state <id>` | Choose a value supported by the selected framework. |
| `--client-state <id>` | Choose a value supported by the selected framework. |
| `--forms <id>` | Choose a value supported by the selected framework. |
| `--no-install` | Skip dependency installation. |
| `--no-start` | Do not offer to start the dev server. |
| `--dry-run` | Print the creation plan without writing. |
| `--force` | Transactionally replace an existing target directory. |

Example:

```bash
npx create-fsd-architecture@latest storefront \
  --framework nextjs \
  --package-manager pnpm \
  --yes \
  --no-start
```

Inspect a plan first when the target or stack choice is uncertain:

```bash
npx create-fsd-architecture@latest storefront \
  --framework nextjs \
  --yes \
  --dry-run
```

## Generate slices

```text
create-fsd-architecture -g <type> <name...> [--force] [--dry-run]
create-fsd-architecture -g <type> [names...] --segments ui,api [--root src]
create-fsd-architecture -g shared <ui|api> [components...] [--dry-run]
```

Native types are `feature`, `entity`, `widget`, and `page`.

```bash
npx create-fsd-architecture@latest -g feature cart --dry-run
npx create-fsd-architecture@latest -g entity product
npx create-fsd-architecture@latest -g widget site-header
npx create-fsd-architecture@latest -g page checkout
npx create-fsd-architecture@latest -g feature auth
```

Run generation from the project root. The generator reads `fsd.config.json`
when present and otherwise infers a supported framework and stack from
`package.json`. Existing slice directories are rejected unless `--force` is
explicit. A page generator may also update or create a framework route file.

Added in **2.7.0+**:

```bash
npx create-fsd-architecture@latest -g entity product customer --dry-run   # batch
npx create-fsd-architecture@latest -g feature cart --segments ui,api --root src/lib
npx create-fsd-architecture@latest -g shared --segments ui,lib --root src
npx create-fsd-architecture@latest -g shared ui button input
npx create-fsd-architecture@latest -g shared api
npx create-fsd-architecture@latest -g feature auth --auth-provider supabase
```

- **Batch**: several names normalize and preflight together and restore earlier
  output if a later slice fails. Batch refuses `--force`.
- **`--segments`** is structure-only: it creates missing directories and empty
  TypeScript public APIs and preserves existing files. It generates no native
  components, routes, backend, or state registration. It takes one
  comma-separated value; `shared` and `app` take no slice names.
- **`--root`** requires `--segments` and does not rewrite aliases or routes.
  `--force` and Supabase options cannot be combined with structure-only mode.
- **`shared ui|api`** writes shared primitives (`button`, `input`, `label`,
  `card`) or an `apiClient`, never overwriting files.
- **Presets** (2.7.0+ widgets, 2.7.1+ pages): `navbar`, `sidebar`, `footer`,
  `bottom-bar` widgets and `home`, `about`, `consult` pages generate prepared
  content instead of an empty slice.
- **`--auth-provider supabase`** is valid only for `feature auth`; see
  auth-supabase.md.

There is no command for generating an individual native segment inside an
existing slice beyond the structure-only mode above.

## Inspect a project

```bash
npx create-fsd-architecture@latest check
npx create-fsd-architecture@latest doctor
npx create-fsd-architecture@latest config
npx create-fsd-architecture@latest check --architecture   # 2.7.0+
```

- `check` validates configuration, `package.json`, and the required FSD layers.
- `doctor` adds Node.js, Git, and selected package-manager checks against the
  framework's runtime ranges.
- `config` prints the resolved configuration.
- `--architecture` runs only the project's locally installed Steiger against the
  adapter source root and propagates its failure. It installs nothing.

These commands inspect; they do not initialize an existing application.

## Upgrade CLI-owned tooling

```text
create-fsd-architecture upgrade [--dry-run] [--check] [--yes] [--no-install] [--allow-dirty]
```

Start with one of the read-only forms:

```bash
npx create-fsd-architecture@latest upgrade --dry-run
npx create-fsd-architecture@latest upgrade --check
```

`--check` exits 0 when current, 2 when an upgrade is available, 3 when blocked
by conflicts, and 4 when the project is invalid. Apply only a conflict-free
plan:

```bash
npx create-fsd-architecture@latest upgrade --yes
npx create-fsd-architecture@latest upgrade --yes --no-install
```

`--allow-dirty` permits apply after a warning; it does not reset, stash, commit,
or switch branches. Upgrade has no `--force` option. `--check` cannot be combined
with `--yes` or `--no-install`.

## Discovery and global options

```bash
npx create-fsd-architecture@latest --list-templates
npx create-fsd-architecture@latest --version
npx create-fsd-architecture@latest --help
```

No arbitrary-app init/migrate/add/plugin command is implemented. Angular is
accepted for read-only inspection only (since 2.6.3); scaffolding, generation,
and managed upgrades reject it before writing.

## Older installations

If `--version` reports a release before 2.7.0, the batch, `--segments`, `--root`,
`shared ui|api`, presets, `--auth-provider`, and `--architecture` options are
absent. Make narrowly scoped ordinary edits when authorized, or run the project's
local Steiger directly; never invent flags. Recommend upgrading the CLI instead of
emulating newer behavior.
