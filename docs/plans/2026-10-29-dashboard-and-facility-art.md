# Dashboard and facility illustrations

**Approved scope:** Add selectable Credit Extended / Outstanding Loans history, order public facilities by TVL, add a Rates & credit markets section between aggregates and facilities, and give all eight Credit Vault facility cards an integrated animated illustration. Latest macro direction replaces stablecoin supply/liquidity with USDC and USDT supply/borrow rates on Aave and Morpho.

**Architecture:** A standalone SVG history chart consumes dated USD observations through a separate history hook. Public API history capability is being checked; unavailable data must not become invented historical points. Preserve numeric TVL in the products mapper, then sort a copy in the dashboard. A macro leaf uses independent, sourced public data queries and explicitly states protocol/chain/rate methodology. Facility illustrations remain decorative, isolated and visibility-gated.

**Constraints:** Preserve all existing uncommitted work, copy and brand decisions. No secrets in the browser, invented metrics, rescaled normalized API aggregates, fake curve history, commits, pushes or deployment. Keep current CV gradient and scroll offsets. Pause decorative motion offscreen/hidden and show completed static art for reduced motion.

## Tasks

- [x] Verify public history contract and preserve numeric TVL, testing unknown and real zero separately.
- [x] Implement accessible selectable line chart with range controls, dated inspection and honest loading/unavailable states.
- [x] Integrate macro outlook, numeric TVL order, and isolated source failures; test dashboard behavior.
- [x] Implement all eight animated facility-card illustrations with existing bento layout.
- [x] Run source review, scoped lint, build and full suite; record actual source availability and test results.

## Progress

The workspace disconnected during initial research and was subsequently restored. No latest-batch source edits existed at the checkpoint. Parallel owners resumed macro sources and facility artwork after reconnection. LIBOR ended on 2024-09-30 per FCA; use current rate benchmarks. History must come from a verified public source, not a guessed authenticated endpoint.

Implemented eight decorative facility illustrations with visibility/hidden-tab
pause and static reduced-motion art. The dashboard preserves raw numeric TVL for
ordering and no longer rescales already-normalized API aggregates by magnitude.
Current aggregate TVL is labelled correctly; the history chart retains both
requested series without substituting TVL for outstanding loan principal.

Public aggregate history was not verified. The chart's default history file is
empty and the unavailable state is explicit. An authenticated per-vault route is
not used as a guessed public aggregate feed. See the
[feed contracts](../data-dashboard-feeds.md) for source commits and required data.

Market context now includes SOFR, fed funds, Treasury yields/curve and USDC/USDT
supply and borrow APYs from Aave/Morpho, with source, date, coverage and unavailable
states. Aave read-query metadata is validated at runtime; no static query name was
assumed. Live DNS/CORS/schema checks remain unverified. Corporate spread references
are links, not observations. The browser connection stalled, so rendered QA is
also outstanding.

Review found and fixed a chart defect where isolated zero observations were
invisible until interaction. Its regression test failed first, then passed.
A second regression prevents normalized USD aggregates above $1T from being
rescaled. Aave source-unit and failure-isolation review found no concrete defects.

Validation: 54 focused tests pass. Full suite: 275 pass, with the existing
SyntheticDollarSection mobile-height assertion failure (36rem expected, 31rem
in unchanged source). Build passes with the existing bundle-size advisory.
Repository-wide lint still reports generated package declarations and unchanged
legacy components. Final scoped lint passes, the post-review build passes, and
`git diff --check` is clean. The build-only health timestamp was restored while
preserving all source/content changes. No commit, push or deployment performed.

## Retry verification — 2026-10-29

The workspace is reachable and all saved dashboard/artwork changes are present.
Fresh production build and scoped ESLint checks pass. The full suite again has
275 passing tests and the same unchanged SyntheticDollarSection height failure.

Connected Pareto API reads succeeded for production metrics and individual vault
blocks, but did not establish a public aggregate history feed or a distinct
outstanding-principal observation. The convenience history request and attempted
epoch request returned HTTP 400; an explicit vault-block query with timestamp
sorting and a separate order parameter succeeded. No single-vault sample or
current TVL was substituted into the aggregate historical chart.

New York Fed JSON was readable through web retrieval; direct execution still
failed DNS resolution. Live Aave/Morpho responses, browser CORS and rendered QA
remain unverified. The historical chart remains intentionally empty until a
verified feed is supplied. No commit, push or deployment performed.

## Dashboard visual pass

Latest user direction: make the dashboard more colorful and animated, using
https://data.morpho.org/ as the reference. Keep Pareto's existing light palette,
compact corners, typography and page structure. Use mint, blue, violet and amber
accents, subtle entrance motion, actual-value reveals, chart line drawing,
hover/focus feedback and facility-size bars based on known numeric TVL.

Use a small shared visibility hook to pause decorative loops offscreen or in a
hidden tab and honor reduced motion. Keep text readable without animation. Data
values, availability, sources, history gaps and API contracts remain unchanged;
no illustrative trend lines or price movements. Work in the current checkout to
preserve the ongoing local edits. No new dependencies, commit, push or deployment.

- [x] Verify shared visibility / reduced-motion gating and cleanup.
- [x] Style overview cards, chart controls and market cards; add TVL comparison bars.
- [x] Run focused regressions, scoped lint, production build and source review.

Ruling: existing functional tests cover the visual pass's data boundaries; add
tests only for the new motion lifecycle rather than assertions mirroring CSS.

Latest steering also requests selecting individual modules in the Credit Vaults
diagram. Keep templates as presets, mark manually edited selections as Custom
configuration, preserve the fixed explanation, and support pointer, Space and
Enter with visible keyboard focus. The explorer remains illustrative and does
not validate deployment compatibility. Re-selecting a preset resets its modules.

- [x] Enable individual module selection and verify keyboard/preset behavior.

The separate internal-blog request is requirements gathering only: do not
implement a blog or migrate articles until the user chooses that next step.

Visual/selector validation: 24 focused tests pass. Fresh production build and
scoped lint pass; full suite has 280 passing tests and the unchanged
SyntheticDollarSection mobile-height failure. The new module description
regression exposed a label/description target mismatch; moving the description
ID to the sublabel fixed it. Independent source review found no material
correctness or accessibility issues. Browser verification
and the aggregate history integration remain pending as described above.
