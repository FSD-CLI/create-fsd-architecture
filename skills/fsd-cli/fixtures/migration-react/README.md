# React legacy migration pilot

Synthetic legacy React/Vite catalog with a fixed API endpoint, local cart state,
a route and error behavior. It is not a production legacy-app certification.

With Node24 and an installed React template checkout, run:

```sh
node verify.mjs /path/to/React-template /new/disposable/workspace /path/to/evidence /path/to/npm-cli.js
```

The disposable workspace and its before/batch1/after/rollback siblings must not
exist. The runner copies package/config files, references installed dependencies,
runs lint/types/build and cart/API/import checks in every phase, injects a failing
type assignment, restores the previous batch's exact source bytes and verifies
package/lock preservation. Browser runtime requires the separate browser test.
This fixture is agent-edited source snapshots, not a CLI migration command.

## Runtime verification

Serve each phase workspace with Vite on ports4320–4323 (before, batch1, after,
rollback), then run `node browser.mjs /absolute/path/to/playwright/index.mjs
/path/to/browser.json`. Install Playwright Chromium in a user cache if needed.
The browser script validates /catalog, two cart clicks, wildcard route, API
success/error and absence of page errors. API responses are controlled fixtures;
this does not exercise an external production backend.

Committed evidence was collected with Node24.21.0 on macOS and Chromium151.0.7922.34.
All four phase lint/types/build and cart/API/import checks passed; the injected
type error exited2 and recovery restored exact batch1 source bytes. Browser
interactions passed in before/batch1/after/rollback with no page errors.
