# Verified command reference

This reference describes `create-fsd-architecture` 2.6.1. Recheck `--help`, the
installed version, and the repository before assuming a later release has the
same contract.

## Entrypoint

Use the published package through `npx` unless the project intentionally pins or
invokes another installation:

```bash
npx create-fsd-architecture@2.6.1 --help
```

For reproducible automation, replace `latest` with the intended version.

## Create a project

```text
create-fsd-architecture [project-name] [options]
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
npx create-fsd-architecture@2.6.1 storefront \
  --framework nextjs \
  --package-manager pnpm \
  --yes \
  --no-start
```

Inspect a plan first when the target or stack choice is uncertain:

```bash
npx create-fsd-architecture@2.6.1 storefront \
  --framework nextjs \
  --yes \
  --dry-run
```

## Generate a slice

```text
create-fsd-architecture --generate <type> <name> [--force] [--dry-run]
create-fsd-architecture -g <type> <name> [--force] [--dry-run]
```

The only valid types are `feature`, `entity`, `widget`, and `page`.

```bash
npx create-fsd-architecture@2.6.1 -g feature cart --dry-run
npx create-fsd-architecture@2.6.1 -g entity product
npx create-fsd-architecture@2.6.1 -g widget site-header
npx create-fsd-architecture@2.6.1 -g page checkout
npx create-fsd-architecture@2.6.1 -g feature auth
```

Run generation from the project root. The generator reads `fsd.config.json`
when present and otherwise infers a supported framework and stack from
`package.json`. Existing slice directories are rejected unless `--force` is
explicit. A page generator may also update or create a framework route file.

There is no command for generating an individual segment such as `api`, `ui`,
or `model`.

## Inspect a project

```bash
npx create-fsd-architecture@2.6.1 check
npx create-fsd-architecture@2.6.1 doctor
npx create-fsd-architecture@2.6.1 config
```

- `check` validates configuration, `package.json`, and the required FSD layers.
- `doctor` adds Node.js, Git, and selected package-manager availability checks.
- `config` prints the resolved configuration.

These commands inspect; they do not initialize an existing application.

## Upgrade CLI-owned tooling

```text
create-fsd-architecture upgrade [--dry-run] [--check] [--yes] [--no-install] [--allow-dirty]
```

Start with one of the read-only forms:

```bash
npx create-fsd-architecture@2.6.1 upgrade --dry-run
npx create-fsd-architecture@2.6.1 upgrade --check
```

Apply only a conflict-free plan:

```bash
npx create-fsd-architecture@2.6.1 upgrade --yes
npx create-fsd-architecture@2.6.1 upgrade --yes --no-install
```

`--allow-dirty` permits apply after a warning; it does not reset, stash, commit,
or switch branches. Upgrade has no `--force` option. `--check` cannot be combined
with `--yes` or `--no-install`.

## Discovery and global options

```bash
npx create-fsd-architecture@2.6.1 --list-templates
npx create-fsd-architecture@2.6.1 --version
npx create-fsd-architecture@2.6.1 --help
```

No arbitrary-app init/migrate/add/plugin command is implemented in this baseline.


## Candidate capability gate — absent from npm2.6.1

CLI candidate d5a0bb1e464f2364593800deede428a957b5c32b contains the following.
Use only after the user selects a reviewed checkout/installation and its actual
help confirms support. Skill v2 does not upgrade the package automatically.

```sh
node /path/to/reviewed-cli/bin/index.mjs -g entity product customer --dry-run
node /path/to/reviewed-cli/bin/index.mjs -g feature cart --segments ui,api --root src/lib
node /path/to/reviewed-cli/bin/index.mjs -g shared --segments ui,lib --root src
node /path/to/reviewed-cli/bin/index.mjs -g app --segments providers --root src
node /path/to/reviewed-cli/bin/index.mjs -g feature auth --auth-provider supabase
node /path/to/reviewed-cli/bin/index.mjs check --architecture
```

Native batch normalizes/preflights names and restores earlier affected output on
failure; no batch --force. --segments is structure-only preserving creation of
directories and empty TypeScript public APIs, not native components or routes.
It accepts one comma-separated value; app/shared take no slice names. --root
requires --segments and does not rewrite aliases/routes. --force and Supabase
options cannot be combined with this mode. Names start with a lowercase letter
and use lowercase letters/digits/hyphens; slice groups are outside this contract.

--architecture runs only locally installed Steiger against the adapter source root
and propagates its failure. It installs nothing. See auth-supabase.md for browser
and SSR boundaries. If capabilities are absent, make narrowly scoped ordinary
edits when authorized, or use existing local Steiger directly; never invent flags.
