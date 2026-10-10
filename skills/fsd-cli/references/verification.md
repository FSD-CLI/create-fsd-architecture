# Verification and evidence

Choose checks based on the affected behavior and project scripts. Unit tests cover
contracts and regression triggers; lint/typecheck/build establish source quality;
browser/runtime checks establish selected interactions. Controlled API fixtures
are not live backend acceptance. SSR/locale requirements need initial HTML and
request isolation checks, not only a hydrated screen.

Record failed baselines before changes. Missing checks are unverified, not passed
or automatically blocked. Use bounded retries for transient failures; do not alter
unrelated settings just to turn results green. Preserve raw logs and exit codes.

## Evidence schema v1

Use JSON with:
- schemaVersion: 1
- source: {kind: candidate|published|merged, commit: full 40-character SHA}
- for published only: source.version, source.integrity (sha512), source.gitHead
- environment: {node, platform}; add package manager/framework/browser as needed
- checks: [{id, command: [executable, ...args], cwd, exitCode, expectedExitCode,
  outcome: pass|fail|unverified, log, assertions: [nonempty descriptions]}]
- limitations: array of explicit remaining scope

Outcomes must agree with exitCode and expectedExitCode. An expected rejection can
pass with exitCode 1 when expectedExitCode is 1; label it as a negative assertion.
Unverified checks have null exitCode, null expectedExitCode and no fabricated log.
A source candidate may share a package version with npm while its bytes differ;
do not label that candidate's checks as published-artifact checks.

`node <skill-path>/scripts/verify-evidence.mjs <report.json>` checks consistency
and referenced log presence within the report directory. It never runs commands,
verifies remote SHAs or proves assertions are true. Reject log traversal/symlinks;
redact credentials before retaining evidence. Keep reports/logs together.

## Human handoff

Give the observable outcome, exact relevant source/artifact identity, commands and
results, coverage limitations and remaining actions. Separate candidate CI from
main CI and package smoke. Scope coverage and pass rate are different measures.
Do not claim all frameworks, OSes, package managers or agent integrations from one
successful pilot. Never use a numerical quality score as a substitute for evidence.
