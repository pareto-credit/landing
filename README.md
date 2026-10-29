# Pareto landing

## Local development

```sh
npm install
npm run dev
```

The development server proxies `/v1/public/*` to `PUBLIC_API_ENDPOINT`
(default: `https://api.pareto.credit/`). This follows idle-multiverse's local
gateway approach: the browser calls its own origin and the server forwards
requests to the remote API, avoiding browser CORS errors.

To use another API, set `PUBLIC_API_ENDPOINT` in `.env.local` and restart
`npm run dev`. No separate gateway process or credentials are needed for these
public routes. Standard Vite flags still work, e.g. `npm run dev -- --port 5174`.

Production builds and `npm run preview` use the configured remote endpoint
directly; the proxy is only enabled for the development server.

## Landing content and navigation

The homepage presents underwriting, Pareto Studio, credit facilities, agents,
live vaults and the Core/Pro/White-Glove offering. Long-form content lives at
`/credit-vaults`, `/studio`, `/thesis`, `/originators` and `/capital-providers`.
`/data` provides protocol metrics, selectable credit history, sourced market
context and a public facility table ordered by numeric USD TVL. Unknown TVLs sort
after a real zero. The hero shows Credit extended, Total value locked, the API's
TVL-weighted Average interest rate (APR), and its premium over 30-day average SOFR
in basis points. Missing source observations stay unavailable. Colorful cards,
chart reveals and table accents respect reduced motion and tab visibility.
The historical chart uses Credit Extended and Outstanding Loans (vault TVL), with a cached
snapshot of 641 dated observations across seven published facilities through
2026-10-29. This current-public cohort differs from the protocol-wide headlines.
Run `npm run data:refresh` from a networked runtime to refresh the snapshot;
failed refreshes retain the previous good file. The chart carries last reported
values through gaps and draws steps without backfilling before a first report.
Reference-rate cards use institution icons; Aave and Morpho use local brand marks.
See [dashboard feed contracts and source limitations](docs/data-dashboard-feeds.md).
USP/sUSP remain available for preview with
`/?showIndexes=1`; they are hidden by default.

- Product names: `src/data/brand.ts`.
- Offering features: `src/data/plans.ts` (Cura AI assessment Beta belongs to Pro).
- Rectangular UI surfaces share the Live Vaults 6px radius through the semantic
  card, panel and control tokens; circles and chart geometry retain their shapes.
- Current Offering interaction and validation: [overview and radius notes](docs/plans/2026-10-23-offering-overview-and-radius-alignment.md).
- Shared partner roster: `src/data/partners.ts`.
- Product narratives and motion live in `src/components/sections/product`;
  `ProductPage` shares pricing tiers, story placeholders, FAQs and a local contact
  form. Product FAQ copy lives in `src/data/productPages.ts`. `ScrollHighlight`
  uses scroll motion values and a static reduced-motion rendering.
  Credit Vaults uses scroll emphasis only for its editorial paragraph. Eight
  facility cards each have an integrated animated illustration. Decorative motion
  pauses offscreen and in hidden tabs, with static reduced-motion artwork. Eight
  facility templates highlight a compatible set of fourteen grouped design choices
  in the architecture figure; template data lives in `src/data/facilityTemplates.ts`.
  DeFi adapters list Morpho, Aave and Pendle; legal/compliance covers agreements
  and KYC/AML arrangements. Working capital is the term-lending example. The
  explanatory panel stays fixed while templates update the diagram and its status.
  Individual modules can also be toggled with pointer, Space or Enter; custom
  choices update the configuration status and selecting a template resets them.
  The selected template replaces the full configuration, with an
  optional self-contained companion at `public/diagrams/credit-vault-modules.html`.
  Studio opens with a centered wordmark and an automatic workspace preview.
  Tooltip-style hotspots switch between facility setup, operations, participant
  views and reporting inside the same fixed frame; the app remains inert.
  All four functionality pages share `StudioDesk` navigation, chrome and layout.
  `StudioWorkspaceScreens` supplies native forms, queues, access and report tables;
  workflow updates happen inline, and the queue persists between feature views.
  Guide markers anchor to the actual navigation items and adapt after resizing.
  The four capability cards use compact artwork with hover/focus transitions,
  in a four/two/one-column responsive grid. Reduced motion keeps the art static.
- `AgentsSection` defaults to the concise homepage view, with inline availability
  chips and the larger shared `agents/AgentSession` illustration. Both `studio`
  and `credit-vaults` use the same fuller workflow. The illustrative read-only
  prompt, queries and results pause offscreen/hidden and remain static for reduced
  motion. A small pause/resume control lets readers inspect the MCP illustration.
  Its client is labelled Your LLM; the result table and row dividers become visible
  only at their respective reveal times, without changing the reserved layout.
  No standalone Agents navigation or product-specific homepage agent links.
- Clients links to Originators and Capital Allocators. Audience content lives in
  `src/data/personas.ts`; the two pages share an accessible layers explorer while
  keeping configuration and allocation distinct. The latter
  page is labelled Capital Allocators; its URL remains `/capital-providers`.
  Both follow an abstract animated hero → features → layers → stories → FAQs → contact.
  Feature cards use larger interface-inspired artwork, one-sentence descriptions
  and subtle hover/focus motion. Layer summaries reveal supporting details on
  demand, while preserving keyboard tab navigation and reduced-motion support.
  Story placeholders live in `AudienceStories.tsx`; approved article URLs can be
  added there. Role-specific illustrative event sequences live in
  `studioDeskData.ts`. Dark previews automatically complete each role’s sequence
  before rotating Underwriters → Borrowers → Lenders. There are no phase counters
  or playback controls. The Studio overview follows the supplied screen’s vaults,
  transactions and requests layout; the data remains illustrative. Offscreen,
  hidden-tab and reduced-motion safeguards apply to both product and hero motion.
  The lender preview follows the supplied Portfolio overview, using fictional
  facilities, allocation and earnings charts, and a populated vault table.
  Borrower-report, accrual and available-withdrawal events update the matching
  table state and notifications; claimable funds remain included until claimed.
  Each persona enters with staggered panels and filling charts/progress bars.
  All three previews share a 660px frame capped at 78% of viewport height;
  excess content is clipped and the previews do not scroll. Toasts overlay the
  app content. Illustrative tables do not add keyboard tab stops.
  Showcase accents live in `studio-showcase.css`, entrance motion in
  `studio-motion.css`, and the Portfolio layout in `lender-portfolio.css`.
  Legacy `/ecosystem` redirects home; legacy audience URLs redirect to their
  canonical paths, preserving query parameters and section hashes.
  [Current dark-preview and hero notes](docs/plans/2026-10-27-dark-studio-autoplay.md)
  record the design and source-reference limitations.
- Solutions contains only Credit Vaults and Pareto Studio. The navbar follows
  router location and page links use `aria-current="page"`.
- About shares the other dropdowns’ icon tiles, typography and footer, and groups
  Thesis, Data Dashboard and the official Brand assets link. Thesis opens with a
  single claim over a subtle animated mesh, followed by a short write-up.
  The SVG grid drifts slowly, pauses offscreen and in hidden tabs, and offers a
  pause/resume control. Reduced motion uses a static grid. No hero image loads.
  The inline chapter legend is removed. Six Clients modules connect directly to
  the central Credit Vault through visible ports and wires; each module can be
  toggled independently, with keyboard support and a responsive diagram.
  Full-viewport constraint scenes change
  with scroll and support keyboard controls and paused playback. Reduced motion
  uses posters. Why Pareto contains four illustrated value cards; Accountability
  and Roadmap are removed from the page and reading index.
  [Thesis simplification notes](docs/plans/2026-10-29-thesis-simplification.md)
  record source review, accessibility and validation limits.
- Internal links: `PageLink` delegates hash scrolling to the router; section
  scroll margins account for the fixed navbar. Avoid delayed scroll corrections.
- Structure details use a body portal, keyboard focus containment and an inert
  background. Dismissal restores tile focus; the contact CTA focuses the form.

Run `npm test`, `npm run lint` and `npm run build` before shipping changes.
Current implementation decisions, review findings and baseline check failures
are recorded in [the Studio restructure notes](docs/plans/2026-10-20-landing-studio-restructure.md).

## Vite template notes

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
