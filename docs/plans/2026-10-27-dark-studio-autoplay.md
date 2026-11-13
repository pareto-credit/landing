# Dark Studio previews and audience hero motion

User correction supersedes the previous playback controls and hero-demo decisions. Use dark theme for all three product previews. The Studio screenshot is the layout reference for underwriter and borrower: navigation sidebar, header, summary metrics, vault cards left and Transactions/Requests tables right. Add incoming requests for underwriters, incoming transaction activity for borrowers. Run each persona's complete sequence, hold its final state, then automatically select the next persona in order Underwriter → Borrower → Lender → Underwriter. Remove counters, stage descriptions and playback controls. Preserve optional direct role selection, reduced-motion preferences and viewport/hidden-tab safeguards.

The two Who we serve pages retain their approved six sections and copy, but use an abstract animated geometric hero inspired by the supplied Morpho reference. Remove product demos and role selectors from those heroes. Use a distinct modular composition for originators and connected allocation geometry for capital allocators. Keep the existing green palette and 6px interface radii; no new dependencies.

References read: `Screenshot 2026-10-27 at 12.44.21.png` (Studio), `Screenshot 2026-10-27 at 12.43.54.png` and `image(20261027-114343).png` (Morpho). Screenshot content and dimensions are available; pixel materialization failed. Do not claim pixel-exact screenshot matching or rendered browser QA without evidence.

## Execution

- [x] Replace preview timing with a bounded automatic sequence and completion callback. Verify no premature/double advance, timer cleanup, hidden-tab/offscreen behavior and role reset. Keep data explicitly illustrative.
- [x] Rebuild dark underwriter/borrower overview from the supplied screen's layout; animate new Requests/Transactions into bounded lists. Preserve and darken the Lender App portfolio view.
- [x] Connect completion to homepage persona rotation; keep role tabs without stage numbering and leave focus unchanged during automatic transitions.
- [x] Replace audience hero product previews with abstract, viewport-aware motion. Reduced motion renders a composed static image; no dashboard tables or playback UI in audience heroes.
- [x] Run targeted regressions, changed-file lint, production build and final review. Preserve existing unrelated changes and the existing SyntheticDollarSection test failure. No deployment/commit requested.


## Review and verification

An independent source review found two important issues: the fixed preview height clipped lower table rows at narrow widths, and automatic role replacement could discard focus inside a table. Both are fixed. The app now uses a growing grid with a reserved notification row, with a shared minimum height for stable role transitions. Role playback suspends while focus is inside the preview and resumes after focus leaves, without adding playback controls. The keyboard-focus regression was observed failing before the fix and passing afterward.

Final verification after reconnection: production TypeScript/Vite build passes; changed-file ESLint passes; full suite has 190 passing tests and the single existing SyntheticDollarSection mobile-height failure (expects 36rem, source uses 31rem). Those unrelated source/test files remain untouched. The automatic sequence, final hold, persona order/loop, direct selection, hidden/offscreen suspension, reduced motion, keyboard focus and absence of product demos from audience heroes are covered by passing tests.

Rendered browser and pixel-fidelity checks remain unverified because browser access was unavailable. No commit, push or deployment performed.
