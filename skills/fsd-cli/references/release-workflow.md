# Release and publication

A request to create/push the named release is authorization for that release's
necessary work. Reuse authorization already granted. Prepare a concrete verified
artifact before asking about any genuinely new remote side effect. A skill never
supplies permission to send messages, merge, publish or modify a backend itself.

## Separate repositories and deliverables

CLI/npm, templates, documentation and this Agent Skill are separate repositories.
Skill v2 is not CLI2.7 and tagging this repo does not publish npm. Identify required
companion refs and ownership; avoid overlapping unrelated teammate changes.
Tag exactly the tested Skill commit. Use an annotated unique tag; never retarget
an existing release silently. Push the branch and tag, then compare local commit,
tag object and peeled remote SHA. A tag can distribute a beta before main merges;
explain that unpinned installs follow the default branch.

Pinned Skill installation uses a GitHub tree URL naming the tag and fsd-cli path.
Verify discovery and installation in a disposable project. Do not replace the
user's globally installed skill without a request. Record installer version and
whether files were copied or linked. Local validation and installation cannot
certify every agent's future behavior.

## npm release, when explicitly requested

Review exact CLI/template heads and their CI. Resolve material release holds;
update version/changelog, run checks, inspect pack files, and publish manually
with the authorized maintainer setup. Do not print tokens or infer publish access
from SSH access. Verify npm version/integrity/gitHead and smoke the exact published
artifact. Git tags create source releases; this project's tag workflow never
publishes npm. Update docs only with the true published version and evidence.

## Skill acceptance and notes

Run helper tests, local-reference integrity, frontmatter validation and an isolated
installation. Execute realistic agent exercises when available and authorized;
state which requests and providers actually ran. Review preservation and unsupported
command mistakes, not just whether the agent wrote plausible prose. Keep beta
scope explicit; blocked Supabase staging/other framework pilots remain limitations.
Record the changelog, validation evidence and reproducible commands. Do not invent
CI passes before GitHub executes the tagged commit's workflow.
