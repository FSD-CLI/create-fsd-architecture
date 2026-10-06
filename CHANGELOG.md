# Agent Skill releases

## 2.0.0 — 2026-10-06

- Promote the documented v2 instruction/helper scope to stable after helper tests,
  nine OS/Node CI jobs, independent agent exercises, and pinned installation checks.
- Update version metadata, UI status, and pinned installation to the stable tag.
- Keep the beta tags immutable and retain their release notes below.
- No CLI npm release or helper/workflow behavior changes. Published CLI 2.6.1
  remains the baseline. Broad provider/framework migration certification and
  live Supabase staging remain outside verified release coverage.

## 2.0.0-beta.1 — 2026-10-06

- Expand the skill from scaffold routing to implementation, domain decisions,
  architecture review, auth integration, incremental migration and release evidence.
- Route details progressively through five framework guides and task-specific
  references while preserving the existing skill name and implicit invocation.
- Gate newer Supabase, preserving segments/custom roots, native batch and Steiger
  wrapper syntax against actual CLI capabilities. npm2.6.1 remains the baseline;
  installing this Skill does not publish or upgrade that CLI.
- Add three dependency-free read-only Node helpers: sanitized inventory,
  conservative literal-import hints, and evidence schema/log consistency checks.
- Add helper/reference regression tests and a three-OS/three-Node CI workflow.
- Preserve the previously implemented React/Vite migration pilot and rollback
  fixture. It is not cross-framework or production-backend certification.

See [validation scope](docs/qa/SKILL-V2-VALIDATION.md) for commands, independent
exercises and limitations. This remains beta; all providers, SSR/locale/monorepo
migration and live Supabase staging are not certified.

## 1.0.0-beta.1

Initial portable scaffolding/generation skill with project inspection and
existing-code protection. Tag retained without modification.
