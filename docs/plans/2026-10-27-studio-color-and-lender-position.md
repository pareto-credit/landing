# Studio color and Lender App Position preview

User request: restore the animated highlight around the Studio previews and the animated gradient on “one desk”; make the dark app previews more colorful; rebuild the Lender App against `Screenshot 2026-10-27 at 14.57.38.png`, retaining automatic events and notifications.

Use the existing Framer Motion, palette foundation and compact radii. Extend accents to mint/cyan/blue/amber. Use a rotating conic border and the existing text shimmer, paused offscreen/when hidden and static for reduced motion. Preserve automatic Underwriter → Borrower → Lender rotation, no stage/playback UI, table-focus preservation and growing layout with reserved notification space.

Lender reference structure: facility header for FalconX (prime brokerage), chain/TVL/net APY/next repayment summary, Overview/Position/Performances/Integrators/Documents tabs with Position selected; Your position (period, net value, earnings, realized APY); Current cycle (period, balance, expected interest, net APY); Your requests (amount and due date). Use the provided snapshot as illustrative data, with simulated deposit/accrual/withdrawal events rather than live customer activity. A pending withdrawal does not deduct funds before settlement. The image’s extracted content was read; pixel materialization and rendered browser QA have not been verified.

## Execution

- [x] Restore showcase accent motion and add role-aware color to metrics, vaults, tables and notifications. No added dependencies or extra playback controls.
- [x] Replace the portfolio overview with the supplied Position composition. Update the automatic lender event data to the illustrated facility; verify balance/earnings and pending request consistency.
- [x] Run existing autoplay/focus/reduced-motion regressions, changed-file lint and production build. Preserve unrelated work and record any baseline failures. No commit, push or deployment requested.


## Validation

All 31 focused Studio, autoplay/focus and homepage tests pass. The lender position regression was observed failing before implementation; it verifies deposit/accrual updates, current-cycle balance, earnings and the non-deduction of pending withdrawal requests. Changed-file ESLint and the TypeScript/Vite production build pass. The existing bundle-size advisory remains.

Independent source review found no Critical or Important issues. Its smaller observations were addressed: the rotating border is sized from the frame’s diagonal through ResizeObserver so it covers narrow/tall layouts; lender table selectors now override generic table defaults consistently; unused portfolio/heading selectors were removed. Motion remains static for reduced motion and pauses offscreen/when hidden. Rendered browser and pixel-fidelity verification remain unavailable. No commit, push or deployment performed.
