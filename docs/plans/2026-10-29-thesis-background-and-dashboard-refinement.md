# Thesis background and dashboard refinement

User-authorized continuation of the current local website. Preserve unrelated
changes and the blog hold. No publication, commits or additional dependencies.

## Design

- A cinematic emerald/glass hero background frames the existing single claim.
  Gentle decorative motion pauses offscreen and in hidden tabs; reduced motion
  keeps a still composition. The artwork is decorative, not a factual diagram.
- Remove the inline Structured credit / Constraints / Opportunity / Why Pareto
  contents legend. Keep the actual chapter destinations and header navigation.
- Show six Clients modules connected directly to a central Credit Vault. Clear
  ports and wires, connected/disconnected states and keyboard controls explain
  that facilities can use different combinations. Keep the copy concise.
- Carry each historical series' last known value forward through later missing
  values. Preserve a leading unknown and real zero, and never use a future value
  to fill an earlier date. Draw steps between observations. Rename the visible
  TVL series Outstanding Loans; retain its vault-TVL accounting definition.
- Replace generic provider icons with local Fed, Treasury, Aave and Morpho logos.
  Use official source assets and the existing Morpho asset, without runtime image
  requests to third parties or changes to rate queries.

## Implementation

- [x] Add regression coverage for carry-forward, zero, leading unknowns and a
  range beginning after the last known value; implement a display-only helper in
  `creditHistory.ts` and update `CreditHistoryChart.tsx` and affected fixtures.
- [x] Remove `ThesisIndex` from `ThesisSections.tsx`; update page expectations.
- [x] Rework `ThesisAnatomy.tsx` and its styles/tests around connected modules,
  maintaining accessible focus, keyboard activation and mobile legibility.
- [x] Integrate generated hero art in a focused background component and styles.
- [x] Add local source logos and update `MacroOutlook.tsx`, its CSS and tests.
- [x] Source review, focused checks, application tests and production build.
  Record existing baseline failures and browser verification limits explicitly.

## Review focus

Leading gaps must remain unknown. Carry-forward must happen before range
filtering, and the raw historical cache must remain unchanged. The Outstanding
Loans label does not turn vault TVL into borrower principal. All module controls
must remain usable without pointer input and visibly connect to the same vault
on small screens. Hero text must remain readable when animation is disabled.

## Final verification

The hero uses a 1942 × 809 JPEG (439,720 bytes), a finite 4.8-second reveal,
visibility/hidden-tab safeguards and a static reduced-motion state. The Thesis
header uses the light logo over the dark hero and its normal treatment on scroll.

All six modules toggle independently; keyboard focus and Space/Enter activation
are covered. Desktop and mobile connections have separate geometry. The mobile
shared trunk is neutral, with each branch showing its own connected state.

The chart's source cache is unchanged. Its source and built-copy SHA-256 is
`9a2c768a859957be5fc431192d25bfafcaa013522bbe07669d86070c1a30c774`.
Carry-forward, leading unknowns, real zero, range-boundary seeding and held-value
pointer inspection are covered. The visible Outstanding Loans label retains the
`tvlUsd` contract and its vault-TVL caption.

Independent source review has no remaining findings. Final application checks:
348 tests passed; the existing `SyntheticDollarSection` mobile-height assertion
still fails (36rem expected, unchanged source 31rem). Production build and scoped
ESLint pass; the existing bundle-size advisory remains. Browser layout and native
scroll geometry remain unverified because preview infrastructure is unavailable.
No rate queries, historical source observations, deployment or blog changes.
