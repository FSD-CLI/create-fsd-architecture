# Framework and stack behavior

## Supported frameworks

| CLI ID | Framework | FSD source root | Page routing behavior |
| --- | --- | --- | --- |
| `react-vite` | React + Vite | `src` | Updates the managed React Router entry. |
| `nextjs` | Next.js App Router | `src` | Creates `src/app/<name>/page.route.tsx` as a thin route wrapper. |
| `vue-vite` | Vue + Vite | `src` | Updates the managed Vue Router entry. |
| `nuxt` | Nuxt | `app` | Creates `app/app/routes/<name>.vue` as a thin file-based route wrapper. |
| `sveltekit` | SvelteKit | `src` | Creates `src/routes/<name>/+page.svelte` as a thin route wrapper. |

Angular and other frameworks are not registered in 2.6.1. Do not include them
in commands or examples.

## Detect the framework

Prefer the explicit `framework` in `fsd.config.json`. If it is absent, inspect
`package.json` and the directory layout. The CLI's fallback order is SvelteKit,
Nuxt, Next.js, Vue, then React + Vite. Because the last case is a fallback, do
not treat inference alone as proof that an arbitrary directory is a valid FSD
project; also verify the source root and required layers.

## Stack capabilities

All five frameworks support npm, pnpm, Yarn, and Bun, plus Axios or native
Fetch. Framework-specific choices are:

| Framework | Server state | Client state | Forms |
| --- | --- | --- | --- |
| React + Vite / Next.js | React Query or none | Zustand, Redux Toolkit, or none | React Hook Form + Zod or none |
| Vue + Vite / Nuxt | Vue Query or none | Pinia or none | VeeValidate + Zod or none |
| SvelteKit | Svelte Query or none | Svelte stores or none | SvelteKit Superforms + Zod or none |

Nuxt and SvelteKit default to native Fetch. The other frameworks default to
Axios. Project creation saves the resolved choices in `fsd.config.json` so
generators do not ask again.

## Generated files

- React-family output uses `.tsx` and TypeScript modules.
- Vue-family output uses `.vue` components and TypeScript modules.
- SvelteKit output uses `.svelte` components and TypeScript modules.
- Every generated slice receives an `index.ts` public API exporting only files
  marked public by the generator.
- A generic feature's API/query/state files vary with configured capabilities.
- Entity, widget, and page generators have smaller fixed scaffolds.

Inspect the dry-run and the final diff instead of assuming identical files
across frameworks.


## Implementation guides

Read only the guide matching the target: [React/Vite](frameworks/react-vite.md),
[Next.js](frameworks/nextjs.md), [Vue/Vite](frameworks/vue-vite.md),
[Nuxt](frameworks/nuxt.md), or [SvelteKit](frameworks/sveltekit.md). Existing source
roots and route conventions take precedence over template defaults.
