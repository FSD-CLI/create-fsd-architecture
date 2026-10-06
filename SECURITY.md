# Security policy

Owner: FSD CLI maintainers (ashrafmo-1).

## Reporting

Use [private vulnerability reporting](https://github.com/FSD-CLI/create-fsd-architecture/security/advisories/new) if available. Otherwise ask the maintainers for a private channel before sharing vulnerability details. Do not publish credentials, sensitive application data or exploit details in public issues. Include affected commit/package versions, platform, reproduction and impact.

## Repository checks

This repository contains an Agent Skill, not a published JavaScript runtime. npm audit and application CodeQL are intentionally not applicable here. GitHub Actions dependencies are reviewed through Dependabot.

Security exceptions require an advisory, affected scope, owner, reason, compensating control and review date. High/critical findings have no implicit exception; the gate stays failed until remediated or an explicit reviewed exception is approved. Branch protection and required-check settings need repository administrator configuration; checked-in workflows alone do not enforce merge protection.

See the [cross-repository security inventory](https://github.com/FSD-CLI/cli/blob/main/docs/SECURITY-BASELINE.md) for coverage and unresolved findings.
