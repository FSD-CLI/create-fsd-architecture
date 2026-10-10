# Skill v2 beta validation — October 6, 2026

Release: `v2.0.0-beta.1`. Scope: portable instructions, dependency-free read-only
helpers, and retained React/Vite migration fixture. This is not a CLI/npm release.

## Local checks

- Node24.21.0/macOS: `node --test tests/helpers.test.mjs tests/references.test.mjs` — 15/15 helper and reference tests passed.
- Skill Creator `quick_validate.py skills/fsd-cli` — valid. The local validator
  needed PyYAML in a disposable virtual environment; it is not a Skill dependency.
- `git diff --check` passed.
- Real Next template inventory returned Next and its actual six-layer src root;
  no secret/config/script values were emitted.
- Real React source import inspection ran; output remains conservative hints.
- `skills@1.7.0` found and copied one fsd-cli skill into an isolated project.
  Tagged installation is checked after pushing the release ref; see the release
  handoff for its result. No globally installed skill is replaced.

Helper tests cover five-framework detection, framework ambiguity/config mismatch,
workspace packages/multiple lockfiles, secret omission, malformed/symlink inputs,
upward/cross-slice/deep import hints, valid public APIs, unresolved targets,
evidence consistency, expected rejection, unverified results, published identity,
traversal/symlink logs, and non-execution of recorded commands.

The CI workflow defines Linux/macOS/Windows × Node20/22/24. Defining it is not a
claim that GitHub has already passed this release commit. Check the exact tag's
commit checks; local macOS success is not cross-OS evidence.

## Independent coding-agent exercises

One independent coding agent used the Skill and relevant references with four
disposable synthetic scenarios. [Raw assessment](skill-v2-agent/RESULTS.md),
[commands/results](skill-v2-agent/report.json),
[before hashes](skill-v2-agent/before-hashes.json), and
[after hashes](skill-v2-agent/after-hashes.json) are retained with logs/fixtures.

1. Existing React/Vite cart: added a manual API segment using selected published
   CLI2.6.1's actual capability boundary. Public sentinel/UI exports and existing
   UI/consumer bytes were preserved. 8/8 controlled-response Node tests passed.
2. Next App Router review: ordinary page.tsx composing src/screens was preserved;
   all nine before/after file hashes matched. No template route convention was
   imposed on the existing application.
3. Supabase request: selected CLI2.6.1 lacked the flag. No unsupported generation,
   SDK/account/credential change or implicit candidate switch occurred. Live
   adapter acceptance remained unverified because target context/access was absent.
4. Domain classification traced consumers: product DTO as entity model, shared
   interaction as cart feature, domain-independent Button as shared UI.

The report validates execution evidence consistency, not correctness of every
architectural statement. It identifies the published CLI used during exercises;
the manually written cart is not part of that published artifact.

The evaluation exposed three minor guidance gaps: repeated @latest examples,
manual auth fallback, and ambiguous 'official' provenance. Those were corrected
with pinned baseline examples and explicit integration/provenance guidance.

## Reproduce scoped checks

```sh
node --test tests/helpers.test.mjs tests/references.test.mjs
node skills/fsd-cli/scripts/verify-evidence.mjs docs/qa/skill-v2-agent/report.json
python3 docs/qa/skill-v2-agent/check-read-only.py
# Node24: built-in TypeScript stripping; no application dependency installation:
node --test docs/qa/skill-v2-agent/react-cart/tests/cart.test.mjs
```

The old raw command paths describe the disposable evaluation workspace. Fixture
code/hash tests can be replayed from this checkout; they are not compiler, browser,
Next build, live-backend or all-provider acceptance. Before/after hash records are
retained immutable observations; they do not rerun the entire agent autonomously.

## Remaining acceptance limits

Supabase staging E2E/RLS, broad SSR/locale/monorepo legacy migrations, every coding
agent/provider, and production application security remain unverified. The prior
React migration browser/rollback pilot is separate evidence with controlled APIs.
Steiger and installed SDK/framework versions remain application-owned contracts.
Skill metadata version2 does not unlock unpublished CLI flags or guarantee future
agent behavior. Beta is an explicit distribution boundary, not a pass-rate claim.
