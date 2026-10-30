# Credit Vaults and Pareto Studio product pages

## Authorized scope

Create `/credit-vaults` and `/studio`, with institutional copy, editorial scroll highlights, capabilities/configuration sections, Core/Pro/White-Glove pricing tiers, existing partner-story placeholders, FAQs and a real contact form. Credit Vaults expands the homepage facility-type bento and adds a modular animated facility diagram. Studio draws on the supplied Clear Street Studio references, without video, and reuses the approved fixed-height, clipped, automatic persona preview.

Agents belongs within each product. Credit Vaults explains current read-only MCP access, future operations as roadmap, and Cura AI as an underwriting companion. Studio retains the fuller current agent workflow. The homepage keeps a much shorter introduction and routes visitors into the product pages.

Solutions links to the two product pages and no longer lists Agents independently. About replaces the standalone Thesis navigation and contains Thesis, Data Dashboard and Brand. Brand points to the existing official media kit. No verified existing external analytics destination was found, so `/data` provides a native dashboard using the existing product-data hook, with fallback data clearly disclosed.

## Architecture and constraints

- Shared `ProductPage` wraps product-specific narratives with pricing, stories, FAQs, contact, Navbar and Footer.
- Existing pricing tiers/features are reused; no numeric prices are invented.
- Reusable `StudioPreview` preserves all existing event, visibility, focus and reduced-motion safeguards, overlay toasts, fixed equal heights and no internal scrolling.
- `ScrollHighlight` uses Framer Motion scroll values and word opacity, with readable static/reduced-motion text. No per-frame React state.
- Diagram-design guides the inline Credit Vault architecture plus a self-contained HTML companion. Use current Pareto palette/fonts and 6px radii rather than the skill’s default skin. Modules are configuration options; offchain agreements are not represented as universally automatic enforcement.
- Credit-source basis is published KB commit `539dba671797ece04f98e698de04124d175fcdd0`. Existing prior freshness check succeeded 27 October; current fetch failed DNS. No deployment or legal-right inference from source.
- Existing routes, audience pages, Live Vault descriptions, legal links and unrelated uncommitted changes remain intact. Use spaced en dashes.
- No dependencies, commit, push or deployment requested.

## Work

- [x] Studio narrative and shared preview extraction.
- [x] Credit Vault narrative, facility bento and module diagram.
- [x] Navigation/About and canonical footer links.
- [x] Native data dashboard with clear loading/fallback states.
- [x] Shared page shell, product pricing, FAQs and contact integration.
- [x] Tailored AI variants and concise homepage section.
- [x] Routes, discovery/sitemap, regression checks and source review.

## Validation focus

Deep-linked product routes and navigation must work; product CTAs must select the local contact interest; roadmap capabilities must not appear live; native dashboard must distinguish examples from current data; scroll highlights and diagrams must remain readable for reduced motion; shared preview extraction must preserve automatic playback without introducing scrollable mockups. Full-suite baseline has one existing unrelated SyntheticDollarSection mobile-height assertion failure. Rendered browser QA has not yet been available in this environment.

## Integration and review

Pricing/form extension regressions were observed failing before their shared APIs were implemented, then passed. Module selection, SVG description state, local product CTA selection, route/deep-link preservation, dropdown navigation and dashboard states have focused coverage. Existing Studio playback tests passed after preview extraction.

Independent source review found two important integration issues. The product header’s light background now applies only while the mobile menu is closed, preserving the open menu’s light logo and close icon on its dark surface. Partial API source availability is carried through the product-data mapper and hook to the dashboard; missing balances/aggregates display unavailable markers rather than invented zeros, while valid zero values remain zero. Partial data is distinguished from a full illustrative fallback.

Review also led to removing redundant shared hero padding/typography that overrode Studio’s own layout, restoring keyboard menu close toggling, aligning Cura assessment availability with the existing Pro beta tier (ongoing monitoring remains planned), and adding a dashboard document title. SVG title and description are separate accessible name/description references. No source review inferred signed rights or live deployments from contract code.

## Final verification

Production TypeScript/Vite build passes. All scoped ESLint checks and `git diff --check` pass. The diagram-design offline self-check passes for the standalone companion. Final full suite: **229 passing tests, one existing unrelated failure** in `SyntheticDollarSection.test.tsx:240` (36rem expected vs unchanged 31rem component). That source/test remain unchanged from HEAD. New partial-source regression coverage preserves valid zero values and complete sibling aggregation; local form/plan interactions, product route deep links, module state, navigation and existing Studio rotation safeguards pass.

The existing bundle-size advisory remains. Associated browser tools were unavailable, so rendered typography, mobile overflow and animation smoothness were not visually certified. External form delivery and deployment were not exercised. No commit, push or deployment performed; unrelated package-lock change preserved.

## Studio walkthrough and native workspace refinement

The final Studio composition uses the centered Pareto Studio wordmark with its animated gradient, supplied subtitle and Request Access CTA. The fixed-height walkthrough switches between facility setup, operations, participant access and reporting within the mockup. Its controls do not scroll the page or change the fragment, and the application remains inert. The accepted hover-illustration cards and matching About dropdown styling are preserved.

All functional pages now reuse the actual `StudioDesk` shell, sidebar, account header, breadcrumbs, preview tokens and bounded content area. `StudioWorkspaceScreens` supplies native read-only facility fields and validation, existing request/transaction tables, organization permissions and a dark report chart/document table. There is no separate miniature marketing panel or duplicate application shell. Only body content changes between feature views, so the operating queue stays intact. Guided overview retains automatic persona playback; the homepage keeps its existing default behavior.

Workflow changes happen inline: terms save and become ready for review, a pending access review becomes active, and a received report becomes available in its document row. The local workflow clock is separate from the request sequence. Unrelated requests and notifications pause outside the operations view. Both clocks stop when hidden, offscreen or reduced motion is active; reduced motion composes completed workflow states. Native navigation and breadcrumbs agree on the selected page.

Guide markers anchor to the actual native sidebar targets using DOM-only geometry updates after resize or role changes. Geometry reads are batched before writes. A target must be visible within the clipped sidebar and screen, with the full hit area inside the frame; otherwise the guide uses an in-frame fallback. Smaller screens use a quiet four-item navigation row inside the app frame. Native phone layouts preserve core fields, request amounts, access states and report documents without adding internal scrolling.

- [x] Observe eight expected native-screen integration failures before implementation.
- [x] Reuse `StudioDesk` navigation, chrome, layout and operating state for all four features.
- [x] Implement native fields, request queue, role/access table and reports with inline workflow animation.
- [x] Preserve operating queue state across feature navigation, inert app semantics and Escape/focus behavior.
- [x] Verify reduced-motion composition and visibility-paused native reviews.
- [x] Reproduce clipped guide anchoring as a failing geometry regression, then verify the visible-target/fallback correction.
- [x] Run production build, scoped lint, focused checks and the full suite.

Read-only review confirmed the common workspace integration, queue persistence, workflow clocks, inert app, observer cleanup and bounded layouts. Its clipped-sidebar finding is fixed with a RED-to-GREEN regression; the Reports breadcrumb also matches its Management navigation group. No additional review pass was needed.

Final production TypeScript/Vite build and scoped ESLint pass; whitespace checks pass. The first native integration run passed 28 focused checks. Later coverage includes 16 StudioDesk cases and 10 playback/geometry cases. The final full suite (`npm test -- --maxWorkers=2`) has **244 passing tests and one unchanged SyntheticDollarSection.test.tsx:240 height assertion failure**. An unrestricted run hit a five-second product-page integration timeout under parallel load; targeted tests passed, and the two-worker full run cleared that timeout without changing test timeouts or application behavior. Existing chunk-size advice remains. Browser-rendered alignment, clipping and animation appearance remain unverified. No new dependencies, commit, push or deployment; unrelated package-lock changes are preserved.
