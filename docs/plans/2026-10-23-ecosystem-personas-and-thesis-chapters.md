# Ecosystem personas and Thesis chapters — 2026-10-23

Teo asked to rethink Ecosystem and Thesis before implementing the priority
improvements (`2026-10-23-priority-improvements.md`). References reviewed:
Fence (capital-providers, originators, about#principles), Tradable
(for-institutions, for-investors) and River (thesis).

## Decisions (Teo, Oct 23)

- Ecosystem menu lists **two personas, like Fence**: Originators (borrowers +
  underwriters) and Capital providers (lenders). Distribution partners stay on
  the overview page.
- Menu label stays **Ecosystem**.
- Thesis problem videos become a **short scroll story** on desktop (one video
  window, three problems) and stacked cards below 1024px.

## Navigation

- Header: Solutions ▾ · Ecosystem ▾ · Thesis ▾.
- Solutions is now products only: Platform (Pareto Studio, Agents, Vaults) and
  Plans (Offering). The old "For issuers / For lenders" groups were removed so
  audiences live in one place.
- Ecosystem ▾: Who we serve (Originators, Capital providers) and Network
  (Roles & partners → `/ecosystem`). Both dropdowns share one implementation in
  `Navbar.tsx` (`menus`), and only one is open at a time.
- Mobile menu adds Originators and Capital providers (9 items; it scrolls).

## Persona pages

Routes `/ecosystem/originators` and `/ecosystem/capital-providers`
(`src/routes/ecosystem_.*.tsx`, non-nested), one template in
`src/pages/PersonaPage.tsx`, content in `src/data/personas.ts`, styles in
`src/components/sections/persona/persona.css`.

Sections: hero (breadcrumb, two-tone H1, audience chips, CTAs that preselect the
contact interest, matching Studio desk view: `borrow` / `allocate`) → The
problem (4 items) → Traditional vs Pareto (semantic table, stacks on mobile) →
Originators: "Two ways in" (reuses the Borrowers and Underwriters role cards) /
Capital providers: live vaults (`ProductsSection`) → How it works (5 steps) →
On Pareto today (live metrics, persona testimonials, credit partner logos) →
Originators only: plans → closing CTA (+ risk disclaimer on Capital providers).

Testimonials by persona: originators — Bob Rutherford (FalconX), Thibault Labidi
(M11 Credit), Han Chang (Adaptive Frontier); capital providers — Adam Bilko
(RockawayX), Carson Brown (Gauntlet). No invented statistics: problem items use
labels, not numbers.

`/ecosystem` keeps the hero, the four role cards (now with a "For originators" /
"For capital providers" link) and the partner grid. Added two persona links
under the hero. Removed the generic segments section, the repeated live vaults
and the repeated testimonials. `EcosystemSection.tsx` is no longer used on any
page but was left in place.

## Thesis

Five chapters (`thesisChapters` in `src/data/thesis.ts`), mirrored in the
header chapter menu (groups now derived from data: "The case", "Pareto"):

1. **Structured credit** — facility anatomy (curator, borrower, Credit Vault,
   lenders, DeFi distribution; HTML/CSS diagram) and a traditional → Pareto
   mapping (6 rows, reuses the former safeguards copy).
2. **The constraints** — `ThesisProblemStory`: the three existing videos
   (financial-market, trading-desk, financial-docs) with the five frictions
   mapped onto them. Sticky ~270svh on desktop, stacked below 1024px. Videos
   lazy-load 1200px ahead, play only the active one while in view, never
   autoplay with reduced motion. Poster frames added in
   `src/assets/images/thesis/` (extracted at 1s with ffmpeg).
3. **The opportunity** — bars drawn to true scale (>$2T private credit, $301B
   stablecoins, $38B tokenized credit; sources and dates unchanged) and a
   "<2%" gap callout derived from the same data.
4. **Why Pareto** — four reasons, the existing five-stage lifecycle, then a dark
   accountability band ("Agents prepare, curators decide. Code enforces.") with
   live Pareto figures.
5. **Roadmap** — status timeline: Live (Studio, Credit Vaults, DeFi
   distribution) → Early access (Pareto MCP, "Join early access") → Next
   (signed agent actions) → Coming soon (Pareto Cura AI).

The hero keeps its copy; a Fence-style five-row index replaces the path graphic.
Removed: `NarrativeScrollSection` (+ test), `ThesisPathGraphic`, the old chapter
CSS. The closing no longer repeats the live figures (they sit in chapter 4).

Length: Thesis desktop 12.2 → 11.1 screens (the story accounts for ~2.7),
mobile 17.1 → 15.6. Persona pages: ~6.5 desktop, ~10–13 mobile.

## Also changed

- `src/components/ui/buttonStyles.ts`: shared button classes plus
  `buttonClassName()` for internal `PageLink`s styled as buttons.
- `PageLink` accepts the two persona paths.
- Sitemap, robots and `index.md` list the persona pages
  (`scripts/generate-agent-discovery.js`).

## Validation

- `tsc -b` clean; ESLint clean on touched files.
- Vitest: 159/160. The one failure is the existing SyntheticDollarSection
  height test, already failing on main.
- `npm run build` passes (existing bundle-size warning).
- Rendered at 1440×900 and 390×844: no horizontal overflow. Checked the
  dropdowns, the scroll story steps at three scroll positions, and the posters.
  Headless Chromium here lacks H.264, so video playback itself was not
  observable; the same files play on the live site.

## Open items

- Priority improvements P1–P4 are still to do.
- Cura's status is still inconsistent ("Coming soon" on Thesis and Agents, "Beta"
  in Pro). Thesis still says "Signed agent actions" while home says
  "Agent-prepared actions". Both are covered by P3.
- The mobile header still shows the Thesis chapter menu on every page.
