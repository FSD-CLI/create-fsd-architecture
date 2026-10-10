# Independent forward test

Only `/tmp/fsd-skill-v2-agent-eval` was written. Repository source and global skills were not edited. CLI installation was `npm install --prefix /tmp/fsd-skill-v2-agent-eval/tooling --cache /tmp/fsd-skill-v2-agent-eval/npm-cache --no-audit --no-fund --ignore-scripts create-fsd-architecture@2.6.1`; exit 0. Help and version commands invoked this installation's `bin/index.mjs` with Node. Logs and exact check argument arrays are in report.json.

Published identity: 2.6.1, gitHead 4c83d0a75ec20117edc8880aba065bdb21edfa6d, integrity sha512-X1StMp1ytT0g1A8H/5b1ok8HN+5yRSIhoOAoG5w1g7Wz+HxFLRfE364QXrkxyRT35WEZJp9wNYL2qCt+2XAoRg==.

## Scenario 1 — existing React/Vite cart

Read package, existing UI, consumer and public API; append exports rather than replace the slice. Since 2.6.1 exposes no preserving segment operation, no native cart generation or force was invoked. Added api/fetchCart.ts and tests/cart.test.mjs, appended fetchCart/CartApiError and Cart/CartItem exports in index.ts. Existing UI and App consumer bytes are unchanged, and original sentinel/CartView export text remains the exact barrel prefix.

Explicit local contract assumption: GET /api/cart returns {id:string,items:[{productId:string,quantity:positiveInteger}]}; empty items is valid. Unknown backend shape is not verified. Injectable fetch receives cancellation signal. CartApiError distinguishes HTTP status, network and invalid JSON/schema failures; abort is preserved. Response error bodies are not exposed.

`npm test --prefix /tmp/fsd-skill-v2-agent-eval/react-cart` exited 0: 8/8 pass, covering controlled success, 503 error, network failure, malformed JSON, invalid quantities, empty response, cancellation and preservation. Node v24.21.0 strips TS for this runtime test. No TypeScript compiler, React/Vite build or browser validation was run.

## Scenario 2 — Next architectural review

Read package/version, alias config, route and layout, screens/catalog public API and implementation, product public API, DTO and UI. Existing src/app/catalog/page.tsx is a thin ordinary App Router route composing CatalogScreen through its public API. screens/catalog owns catalog composition and imports ProductCard through the entity public API; entity UI imports its own model relatively. Placement is consistent with this app's screens convention. No architectural move or page.route.tsx/pages creation is needed. No generator, build or architecture-check command was invoked. Nine before/after hashes are identical; manifests and check-read-only.py are retained. Review conclusion is scoped to the traced fixture paths; no Steiger configuration or runtime verification exists.

## Scenario 3 — Supabase adapter request

Read auth capability/acceptance guidance and actual selected CLI help/version. Decided not to execute adapter generation: --auth-provider is absent from published 2.6.1, and generic auth scaffold does not supply the requested provider adapter. No candidate selection, SDK install, accounts, credentials, env edits or external writes occurred. Calling a community CLI output official would also need clarification: official Supabase SDK/adapter integration is distinct from CLI provenance.

The requested adapter remains unimplemented. Possible subsequent work is an explicitly reviewed later CLI or scoped manual integration against verified SDK docs; no SDK API was invented. Unverified prerequisites include application/framework auth state and existing client conventions, chosen SDK/engine compatibility, public project configuration, request-local SSR clients/cookies/callbacks if applicable, test project access, confirmation/recovery email templates, authorization and RLS policies. Browser provider doubles cannot prove staging acceptance.

## Scenario 4 — responsibility classification

Read DTO, action, Button and two action consumers. ProductDto belongs to entities/product/model because it represents product identity/data independent of an action. addProductToCart belongs to features/add-product-to-cart because it performs a user interaction with cart effects used by catalog and product screens. Button belongs to shared/ui because its label/onClick props have no domain coupling. Existing deep imports in the synthetic action consumers would need public API correction in an implementation request, but classification itself wrote no fixture files. Reuse supports the feature decision here; reuse alone is not the rule.

## Skill guidance assessment

The relevant references successfully prevented replacement of cart public APIs, false page-route migration, unsupported Supabase flags and layer classification solely by file extension/reuse. No blocking guidance defect was observed in these four exercises.

Minor gaps: the auth document focuses on a candidate adapter and does not give a concrete manual adapter fallback for the selected older baseline; therefore this request ends with an honest unavailable-capability report. There is no explicit decision for the ambiguous word “official”. The command reference still repeats @latest examples despite a strong reproducibility note; exact-version selection was needed throughout this evaluation. These local synthetic fixtures establish behavior under limited contracts, not all frameworks/backend acceptance.
