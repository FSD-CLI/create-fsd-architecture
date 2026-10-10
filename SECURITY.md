# Security policy

Owner: FSD CLI maintainers (ashrafmo-1).

## Reporting

Use [private vulnerability reporting](https://github.com/FSD-CLI/create-fsd-architecture/security/advisories/new) if available. Otherwise ask the maintainers for a private channel before sharing vulnerability details. Do not publish credentials, sensitive application data or exploit details in public issues. Include affected commit/package versions, platform, reproduction and impact.

## Repository checks

This repository contains an Agent Skill plus dependency-free Node diagnostic
helpers. It does not contain the published CLI or a third-party npm dependency
tree to audit. Helpers require scoped code review and regression checks for
bounded reads, secret-value omission, path handling and non-execution of report
commands. Import hints and evidence validation do not certify security or
architectural correctness. GitHub Actions dependencies are reviewed through
Dependabot, and workflow actions are pinned to immutable commits.

Security exceptions require an advisory, affected scope, owner, reason, compensating control and review date. High/critical findings have no implicit exception; the gate stays failed until remediated or an explicit reviewed exception is approved. Branch protection and required-check settings need repository administrator configuration; checked-in workflows alone do not enforce merge protection.

See the [cross-repository security inventory](https://github.com/FSD-CLI/cli/blob/main/docs/SECURITY-BASELINE.md) for coverage and unresolved findings.
