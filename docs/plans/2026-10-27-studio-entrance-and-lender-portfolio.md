# Studio entrance motion and Lender App portfolio

**Goal:** Give each automatically selected persona a composed entrance and replace the Lender App facility view with the supplied Portfolio overview, using fictional facilities and contextual notifications.

**Reference:** `Screenshot 2026-10-27 at 15.19.54 (2).png` (Portfolio heading, total funds, pending deposits/withdrawals, allocation, earnings, realized APY and vault table). Extracted content was read; local pixel transfer was unavailable. Improve hierarchy and populate the table with clearly illustrative Aster, Meridian and Harbour facilities. No real partner identity appears in these previews.

**Approach:** Keep the existing React/Framer Motion automatic session state and timings. Add a short CSS entrance cascade, filling progress indicators, a moving allocation ring and growing earnings bars. Replay these on persona mount; pause offscreen/hidden, and provide a static reduced-motion state. Preserve the dark green base, mint/cyan/blue/amber accents, 6px surfaces, animated border and headline gradient. No dependencies or playback controls.

**Lender sequence:** A borrower report becomes available, accrued earnings update, then a pre-existing withdrawal becomes claimable. The report does not change balances. Accrual increases total value and earnings by 2,180 USDC. A claimable withdrawal remains included in total funds until claimed; it leaves the pending subtotal. These are simulated states, not live activity or product guarantees.

## Execution

- [x] Replace the lender regression with portfolio/report/withdrawal behavior; observe the expected failure.
- [x] Build the portfolio summary, allocation, earnings and vault table; connect report and available-withdrawal events. Remove the superseded Position component/styles.
- [x] Add staggered entrances and chart/progress motion to each persona, retaining visibility, focus and reduced-motion protections.
- [x] Run focused tests, changed-file lint and the production build; review the final increment. Preserve unrelated changes; no commit, push or deployment.

## Review focus

Small screens must scroll tables without clipping notifications; each persona resets entrance and event state; report availability must not affect money; available withdrawals must not prematurely deduct balances; motion must stop offscreen/when hidden and for reduced motion.

## Validation

Observed the replacement lender regression fail against the former Position view, then pass against the Portfolio implementation. All 32 focused Studio/playback/homepage tests pass, including the review correction below. Changed-file ESLint and the TypeScript/Vite production build pass. The final full suite has 191 passing tests and one existing unrelated failure in `SyntheticDollarSection.test.tsx:240` (the expected mobile height is 36rem, while the unchanged component uses 31rem). Source and test match HEAD. No rendered browser was available, so appearance and pixel fidelity have not been verified in a browser. The existing bundle-size advisory remains.

Independent source review identified one important accessibility issue: the focus guard paused delayed, transparent entrance panels. Corrected by separating `pauseEvents` from visibility-driven `data-motion-running`; table focus now holds event/role advancement while entrances finish. The early-focus regression was observed failing before the fix, then passing in the final suite. The mobile allocation ring minimum was reduced to 72px with a 16px gap and a larger legend column so narrow layouts retain label space. No unresolved Critical or Important findings. Pixel fidelity, rendered mobile behavior and animation smoothness remain unverified; protocol/deployment behavior and unrelated changes were outside this UI review.

## Follow-up: compact, equal-height frames

User requested that all three mockups fit within one viewport and share exactly the same height, with toasts overlaid on content. The common preview now uses `height: min(660px, 78svh)` and a bounded grid for chrome, app and footer. Removed the former 860/980/1000px app minimums and the reserved notification row. Toasts are absolutely positioned above the app content. Main content scrolls within the shared frame on compact screens, with horizontal table scrolling retained. Summary panels, charts, table rows and spacing were tightened, preserving the persona entrance and event state machines. This is a CSS-only adjustment; existing Studio regression checks and production build are the relevant validation.

Follow-up verification: all 32 focused Studio/playback/homepage tests pass; the production build and `git diff --check` pass. No new dependencies or behavior changes. The existing bundle-size advisory remains; rendered browser verification is still unavailable.

Latest user correction supersedes internal scrolling: all mockup frames, app interiors, sidebars and table viewports now clip overflow, preserving the common height and overlaid toasts. Illustrative table regions use `tabIndex={-1}` so clipped content adds no keyboard tab stops. No internal scrollbars or wheel/touch scroll areas remain. All 32 focused regression tests, the production build and whitespace checks pass after this correction.

Latest fixture update: scale the underwriter/borrower views to hundreds of millions. Underwriter TVL is derived from Aster 248.6M, Meridian 176.4M and Harbour 125M (550M total); the finished Cedar vault remains empty. Borrower capacity is 300M with 248.6M initially outstanding, a 12.5M drawdown and 6.25M principal repayment. Available capacity and the Aster card follow those balance changes; the 1,672,240 USDC interest payment changes no principal. Requests and transaction history also use larger illustrative amounts. Lender portfolio figures remain personal-position examples. Existing balance regressions were updated and observed failing before implementation, then all 32 focused tests passed. Changed-file ESLint, production build and whitespace checks pass.
