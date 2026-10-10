# Troubleshoot the actual failure

| Symptom | Inspect first | Avoid |
| --- | --- | --- |
| Unknown flag | selected CLI version/help and command gate | retrying candidate flags on npm2.6.1 |
| Wrong root | target package, aliases, routes and workspaces | choosing repository parent by default |
| Existing slice | changed paths and user intent | automatic --force |
| Upgrade conflict | ownership hash and customized file | manifest adoption or res-scaffold |
| Generated import failure | public APIs, aliases, adapter source root | unrelated global path rewrites |
| Node/dependency failure | actual SDK/framework engine and lockfile | assuming CLI engine covers the application |
| Hook failure | configured policy and named failing check | disabling hooks permanently |
| Provider auth failure | confirmation/recovery/session contract | logging secrets or using production as staging |
| SSR data leakage | module lifetime, request client and locale | adding a browser store as server authority |
| Baseline migration failure | raw command/log and preexisting behavior | moving code and relabeling failures |

Retry only a plausible transient operation, with a stopping condition and changed
evidence. Do not repeatedly install dependencies or swap package managers without
explaining the cause. Keep failures and partial output. If required information
is missing, continue independent work and ask a focused question about the blocker.
Rollback only recorded affected paths; newer user edits are not ours to discard.
