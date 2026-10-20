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

## Revision 2 (same day, Teo's feedback)

- Hero copy restored to "It's time to upgrade the credit operating system" plus the original subline. The Studio CTAs and the MCP chip are kept.
- Underwriting cards: tags now sit on two rows on every card, and "Keyring" is replaced by "Built-in, per facility".
- Studio is now colourful and animated:
  - aurora background, shimmer headline and a travelling-light border on the desk
  - persona tabs autoplay every 9s with a progress bar, stopping on click
  - count-up figures, a sparkline that draws in, animated mix bars, and a live activity tape while in view
  - all animation is disabled under `prefers-reduced-motion`
- The "Structure, launch and run…" copy and CTA moved under the desk, merged into one panel with the four lifecycle steps.
- Credit structures is now a bento grid (4 columns on desktop, 2 on mobile). Clicking a tile morphs it into a detail dialog (framer-motion `layoutId`), with a "Discuss this structure" CTA. Esc, the X button or the backdrop close it.
- Agents: the demo is animated in a loop while in view (typing, tool calls running, then a streamed answer). The left cards and the right column (demo, disclaimer and CTA) stretch to equal height. The CTA now reads "Join early access".
- Plans: Pro has its own mint gradient with a dark CTA.
- Order: … Agents → Vaults → Plans → Testimonials → Insights → Contact.
- Header: a "Solutions" dropdown in the Centrifuge style, with "For issuers and underwriters" (Pareto Studio, Agents, Plans) and "For lenders" (Vaults), plus a footer link to contact us. Ecosystem and Thesis stay at the top level. It opens on hover; the keyboard toggles it; Esc or an outside click closes it.
- Validation:
  - 118 tests pass, with the same 3 failures already on `main`.
  - No lint findings in touched files, and the build passes.
  - Browser-checked: the dropdown, the bento open and close, the demo loop, equal column heights, and the 390px layouts.

## Revision 3 (copy)

- Underwriting headline changed to "Credit infrastructure built for regulated capital.", since "built for scrutiny" was too close to River. The intro now reads "Pareto provides credit underwriting infrastructure…", and the § A/B/C markers are removed.
- Structures:
  - chip now reads "Credit facilities"
  - headline: "One platform. Infinite credit opportunities."
  - intro rewritten ("If it can be underwritten, it can run on Pareto…")
- Plans was renamed to **Offering**: the section eyebrow, the Solutions dropdown item, the mobile menu and the section id (`#offering`).
- New title: "From self-serve to fully managed." The intro now describes the three tiers.
