# Architectural review

Bind the actual application scope and diff/commit before reviewing. Trace imports,
public APIs, route composition and state lifetime. Read existing conventions and
rules before classifying an exception as a defect.

## Checks

- Across slices, consume the public API instead of internal implementation paths.
- Same-layer cross-slice imports and upward imports need methodology-aware review.
- Inside a slice prefer relative imports; avoid reimporting its own barrel and cycles.
- App/Shared segment relationships differ from business slices; do not report
  every same-layer Shared import as a cross-slice violation.
- Validate framework aliases, custom roots and route wrappers, not folder names alone.
- Check request/session/locale isolation when SSR behavior is affected.

check/doctor inspect CLI configuration/layers/toolchain; they do not prove correct
FSD imports. Run the installed project's Steiger with its configured rules. The
new CLI --architecture wrapper is candidate-only; older installations can run their
local Steiger directly. Do not automatically download an unpinned package or disable
rules to make a result green. Missing lint configuration limits conclusions.

The optional inspect-imports helper is a conservative static hint extractor. It
recognizes literal relative imports and simple supplied aliases, not all syntax,
reexports, runtime paths or framework resolution. Use its unresolved/limitations
fields. It skips comments and string contents only heuristically; confirm source
and use the real parser/linter before turning a hint into a finding.

## Findings and fixes

For an actionable finding give trigger, file/line, actual versus intended behavior,
impact, evidence and verification. Separate confirmed from hypothesis and bot output.
Fix the public API and consumers together; moving an import without preserving
runtime behavior is incomplete. Review-only requests authorize no writes.

Do not escalate ordinary review into an unrelated exhaustive security scan.
Concrete authorization or secret exposure issues deserve scoped diagnosis; do not
promise universal security or production readiness based on passing import lint.
