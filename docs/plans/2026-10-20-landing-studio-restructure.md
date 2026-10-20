# Landing restructure: Studio-first, agents, plans (2026-10-20)

Branch: `feat/landing-studio-restructure` (from `main` @ 15d905b). Not deployed.

## Objective

Reposition pareto.credit around today's offering: Pareto as credit underwriting
infrastructure for compliant onchain finance, with Pareto Studio at the centre,
agentic underwriting (Pareto MCP first, then the AI agent), supported credit
structures, and three plans. Shorten the homepage and move long-form content to
dedicated pages.

## Homepage, new order

1. Hero: "Turn a term sheet into a live credit facility", with the CTAs Request
   Studio access and Explore live vaults. It also has a "Pareto MCP early access"
   chip and keeps the live metrics.
2. Partner marquee (unchanged).
3. `UnderwritingSection` (`#underwriting`): "Credit infrastructure built for
   scrutiny", with three pillars: diligence, ring-fenced facilities and
   monitoring.
4. `StudioShowcaseSection` (`#studio`): persona tabs (Underwrite, Borrow,
   Allocate) over an illustrative Studio desk, followed by the four lifecycle
   steps and a link to /ecosystem.
5. `StructuresSection` (`#structures`): eight structures, including revolving.
   Each one expands to a spec table.
6. `AgentsSection` (`#agents`), in three steps:
   - Pareto MCP (early access)
   - agent-prepared actions (next)
   - Pareto Cura AI (coming soon)
7. Testimonials, moved up.
8. Live vaults.
9. `PlansSection` (`#plans`): Core, Pro and White-Glove by NorthBridge. On mobile
   one plan shows at a time, chosen with tabs.
10. Insights and Contact. The plan, MCP and role CTAs pre-select the matching
    "Interested in" option.

The following moved off the homepage:

- Narrative scroll: moved to `/thesis`.
- Ecosystem segments: moved to `/ecosystem`.
- Infrastructure and Solutions: replaced by the Studio section. The component
  files remain in the repo, unused.
- USP/sUSP: hidden. Preview it with `/?showIndexes=1`.

Length at 1440×900 went from about 16 screens to 12.4. At 390×844 it went from
about 17.9 to 15.5.

## New pages

- `/thesis` (`src/pages/ThesisPage.tsx`) is a River-style briefing. It opens with
  a hero and the existing narrative scroll, then six numbered chapters, live
  Pareto metrics and a disclaimer. The market stats come from Moody's, DefiLlama
  and rwa.xyz, dated Oct 20, 2026, in `src/data/thesis.ts`.
- `/ecosystem` (`src/pages/EcosystemPage.tsx`) has the four roles with CTAs and
  the partner roster grouped as credit or infrastructure. It also includes the
  ecosystem segments, the live vaults and the testimonials.

## Decisions

- The AI is named **Pareto Cura AI** (Latin *cura*, care or diligence, the root
  of "curator"). It's a single constant, `AI_NAME` in `src/data/brand.ts`.
  Shortlisted alternatives were Fides and Optima.
- Plans are Core, Pro and White-Glove. No prices are published; "pricing is set
  per facility".
- Status labels: the MCP is "Early access" and the AI is "Coming soon". In the
  Core plan, AI assessment is tagged "Beta".
- Revolving is listed because the factory has a dedicated revolving path
  (idle-tranches 539dba6). Native senior/junior tranching is **not** listed.
- The NorthBridge footnote says it "acts as curator under its own agreements",
  that curation doesn't guarantee repayment, and that credit risk stays with
  lenders.

## Navigation and plumbing

- Navbar: Studio · Agents · Plans · Vaults · Ecosystem · Thesis. It works from
  any page through `useRouter({ warn: false })` with a full-navigation fallback.
  The desktop links now start at `lg`.
- `src/lib/siteNavigation.ts` handles contact pre-selection (an event on the
  homepage, a pending value across pages) and scrolls to the hash after
  navigating.
- `src/components/ui/PageLink.tsx` provides internal links that use the router
  when it's mounted.
- `src/data/partners.ts` holds the partner list shared by the marquee and
  /ecosystem.
- SEO and discovery: the title and description in `index.html` are updated.
  /thesis and /ecosystem are added to the sitemap and robots, and
  `/?showIndexes=` is disallowed. The product areas in `public/index.md` and the
  WebMCP section list are updated.

## Validation

- `npm run build` passes.
- Vitest: 115 tests pass. The 3 failures were already failing on `main`
  (SyntheticDollar mobile height, narrative radius, radius tokens).
- ESLint: no findings in any changed or new file. The repo-wide count (579
  errors) is unchanged from `main`.
- Visual review at 1440 and 390 for /, /thesis and /ecosystem. Live API data
  isn't reachable from the build sandbox, so the vault cards showed their
  fallback state.

## Open items

- Confirm the AI name, or swap `AI_NAME`.
- Confirm the public wording on NorthBridge's relationship to Pareto: the DDQs
  call it affiliated, while the NorthBridge site says independent.
- Confirm these plan claims: multichain deployment, co-marketing, white-label on
  Pro/White-Glove, standard legal templates, and the AI assessment beta in Core.
- Refresh the Thesis market stats periodically, since they're static.
- Optional: lazy-load the /thesis and /ecosystem routes. The main chunk was
  already above 500 kB on `main`.
