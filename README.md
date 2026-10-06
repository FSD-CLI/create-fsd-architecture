# create-fsd-architecture Agent Skill

![Status: Beta](https://img.shields.io/badge/status-beta-f59e0b)

> [!IMPORTANT]
> This Agent Skill is in beta. Its CLI commands and installation flow are
> verified, but agent behavior can vary across coding tools and existing project
> structures. Review generated changes before committing them.

Portable Agent Skill for the [`create-fsd-architecture`](https://www.npmjs.com/package/create-fsd-architecture) CLI.

The skill teaches compatible coding agents how to inspect a project, translate
natural-language scaffolding requests into verified CLI commands, protect
existing code, and continue with the requested business implementation.

## Install

```bash
npx skills add FSD-CLI/create-fsd-architecture --skill fsd-cli
```

## Scope

- Create supported Feature-Sliced Design projects.
- Generate feature, entity, widget, and page slices.
- Generate the supported complete authentication feature scaffold.
- Inspect project configuration and health.
- Preview and apply safe CLI-owned upgrades.
- Audit and guide incremental migration of existing non-CLI applications.
- Keep unsupported commands and framework behavior explicit.

The CLI implementation remains in
[`FSD-CLI/cli`](https://github.com/FSD-CLI/cli). This repository contains the
portable Agent Skill only.

## Beta status

The current beta release is `v1.0.0-beta.1`.

- CLI contract rechecked against published `create-fsd-architecture@2.6.1` on 2026-10-06.
- Published-package create, generate, doctor/check and generated builds passed
  locally for React/Vite and Next.js with npm on macOS. This does not verify
  every framework, package manager or agent integration.
- [Canonical release and QA status](https://github.com/FSD-CLI/cli/blob/main/docs/RELEASE-STATUS.md).
- Installation tested with the `skills` CLI.
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
    └── references/
        ├── architecture-rules.md
        ├── commands.md
        ├── frameworks.md
        ├── scaffolding.md
        └── existing-projects.md
```

## Support FSD CLI

If this project helps you, you can optionally support its development:

- [GitHub Sponsors](https://github.com/sponsors/ashrafmo-1?frequency=one-time&sponsor=ashrafmo-1)
- [Buy Me a Coffee](https://buymeacoffee.com/ashrafqopiah)
- **InstaPay (Egypt):** `ashrafmo-1`

For InstaPay, use the username exactly as shown and verify the recipient details
in the app before confirming a transfer. Donations are optional.
