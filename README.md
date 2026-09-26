# create-fsd-architecture Agent Skill

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
- Keep unsupported commands and framework behavior explicit.

The CLI implementation remains in
[`FSD-CLI/cli`](https://github.com/FSD-CLI/cli). This repository contains the
portable Agent Skill only.

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
        └── scaffolding.md
```

