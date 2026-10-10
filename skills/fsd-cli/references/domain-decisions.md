# Domain responsibility decisions

Classify responsibility, not file extensions or component reuse alone.

| Responsibility | Likely location | Decision test |
| --- | --- | --- |
| Product identity, data shape, domain display | entities/product | Does this represent a business concept independent of a user action? |
| Add product to cart | features/add-product-to-cart | Is this a meaningful user action reused or isolated beyond local page logic? |
| Search catalog and paginate one screen | page-local or feature | Extract only when responsibility/reuse justifies it. |
| Catalog composition | pages/catalog or widget | Does it assemble a large independent block reused by pages? |
| ProductCard | entity UI or consuming slice | Business responsibility matters more than repeated JSX. |
| Button/Input/formatting primitive | shared segment | It must remain independent of business domains. |
| Session authorization | server boundary/policy | Client store state alone never grants access. |

App composes initialization, providers and routing. Pages compose screen behavior.
Widgets compose substantial independent blocks. Features model user interactions;
entities represent domain concepts. Shared contains domain-independent code.
App and Shared are sliceless: their segments are not business slices.

## Questions that change a decision

Identify consumers, lifecycle, ownership of state, API contract, SSR/client scope
and locale boundaries. If two layers plausibly own a responsibility, explain the
tradeoff with actual consumers. Prefer the smaller decomposition that satisfies
isolation; a tiny screen need not populate every layer.

Examples: a page-local toggle may stay local; a purchase action with mutations,
permissions and multiple consumers warrants a feature. A product type can be an
entity model while its fetch adapter stays beside it when that matches project
API conventions. Do not migrate all fetches to Shared simply because they use HTTP.

Follow the official [layers reference](https://fsd.how/docs/reference/layers/)
and [public API reference](https://fsd.how/docs/reference/public-api/) for methodology.
Architecture recommendations need context; generators cannot decide domain meaning.
