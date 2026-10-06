# create-fsd-architecture Agent Skill

![Status: Beta](https://img.shields.io/badge/status-beta-f59e0b)

> [!IMPORTANT]
> This Agent Skill is in beta. Its CLI commands and installation flow are
> verified, but agent behavior can vary across coding tools and existing project
> structures. Review generated changes before committing them.

Portable Agent Skill for the [`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture) CLI.

The skill teaches compatible coding agents how to inspect a project, translate
natural-language FSD requests into verified CLI commands, domain decisions,
business implementation, architectural review and incremental migration.

## Install

```bash
npx skills add FSD-CLI/create-fsd-architecture --skill fsd-cli
```

That unpinned command follows the repository default branch. For the v2 beta tag:

```bash
npx skills@1.7.0 add https://github.com/FSD-CLI/create-fsd-architecture/tree/v2.0.0-beta.1/skills/fsd-cli --skill fsd-cli
```

Installer 1.7.0 requires Node >=22.20.0. The dependency-free helpers support Node
>=20; application/CLI/SDK engines remain separate requirements.

## Scope

- Create supported Feature-Sliced Design projects.
- Generate feature, entity, widget, and page slices.
- Generate the supported complete authentication feature scaffold.
- Inspect project configuration and health.
- Preview and apply safe CLI-owned upgrades.
- Audit and guide incremental migration of existing non-CLI applications.
- Keep unsupported commands and framework behavior explicit.
- Choose domain responsibilities and implement the requested vertical behavior.
- Review import/public API boundaries with actual project evidence.
- Integrate auth with explicit browser/SSR and backend acceptance boundaries.
- Verify evidence and keep candidate work separate from published artifacts.

The CLI implementation remains in
[`FSD-CLI/cli`](https://github.com/FSD-CLI/cli). This repository contains the
portable Agent Skill and read-only diagnostic helpers; it does not publish a CLI.

## Beta status

The current tagged beta release is `v2.0.0-beta.1`. Version 1 remains available.
The tag can be installed before the candidate branch merges; an unpinned install
still follows main. See [changelog](CHANGELOG.md) and
[v2 validation scope](docs/qa/SKILL-V2-VALIDATION.md).

- CLI contract rechecked against published `create-fsd-architecture@2.6.1` on 2026-10-06.
- Published-package create, generate, doctor/check and generated builds passed
  locally for React/Vite and Next.js with npm on macOS. This does not verify
  every framework, package manager or agent integration.
- [Canonical release and QA status](https://github.com/FSD-CLI/cli/blob/main/docs/RELEASE-STATUS.md).
- Local and tagged installation are checked separately with the pinned `skills` CLI.
- Intended for evaluation with Codex, Claude Code, Cursor, and other compatible
  coding agents.
- Feedback and reproducible issues are welcome in this repository's issue
  tracker.

## Structure

```text
skills/
└── fsd-cli/
    ├── SKILL.md
    ├── agents/
    │   └── openai.yaml
    ├── scripts/               # inventory, import hints, evidence validation
    ├── references/            # task-specific workflows
    │   └── frameworks/        # five implementation guides
    ├── fixtures/              # verified React migration pilot
    └── release.json
```

Run repository regressions with `node --test tests/*.test.mjs`. No project scripts
or remote APIs are executed by the diagnostic helpers. Their findings are scoped
to documented heuristics, not production/security certification.

## Support FSD CLI

If this project helps you, you can optionally support its development:

- [GitHub Sponsors](https://github.com/sponsors/ashrafmo-1?frequency=one-time&sponsor=ashrafmo-1)
- [Buy Me a Coffee](https://buymeacoffee.com/ashrafqopiah)
- **InstaPay (Egypt):** `ashrafmo-1`

For InstaPay, use the username exactly as shown and verify the recipient details
in the app before confirming a transfer. Donations are optional.
