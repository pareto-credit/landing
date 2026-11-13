# Product motion and audience pages

Superseded for playback controls, preview theme and audience heroes by [the user’s subsequent correction](2026-10-27-dark-studio-autoplay.md).

User brief: replace stylized Studio mockups with dynamic product-based previews for underwriters, borrowers and lenders. Audience pages follow hero with animated product and caption → feature cards → interactive layers and CTA → FalconX/M11/RockawayX placeholder stories → FAQs → Talk to us linking to the existing contact form. Add restrained motion throughout.

Implementation choices: React/TypeScript, existing Framer Motion, existing palette/type and 6px radii. No added dependencies. Work in the existing feature checkout to preserve ongoing edits. Keep `/capital-providers` URLs for compatibility, display Capital Allocators. No commit or deployment requested.

Product references: locally available `idle-multiverse-staging/apps/pareto-lp/src/components/header.tsx`, `portfolio/portfolio-details.tsx`, `portfolio/portfolio-vaults-grid.tsx`; institutional vault management source. Public app is client rendered; Studio could not be loaded; browser connection and shell DNS unavailable. The exact screen mentioned by the user was not recoverable. Product reconstructions must remain explicitly illustrative and require Studio screenshot comparison before fidelity can be claimed. Do not invent live customer events or imply a demo is connected to a wallet.

## Plan

- [x] Replace StudioDesk's abstract analytics with product-derived layouts; separate lender navigation/portfolio from Studio roles. Use bounded role-specific scenario steps that update rows, status and notifications together. Provide pause/replay/next; stop timers when offscreen, hidden, paused or reduced motion is requested. Role changes reset the sequence. Keep illustrative notices visible.
- [x] Simplify audience data/page to the user's six sections. Hero hosts role-specific mockups with short animated captions. Cards carry concise benefits. Layers are individually selectable with keyboard support, clear detail panels and a contact CTA. Capital allocation layers explain access and diligence without suggesting investors set borrower terms.
- [x] Replace quotes/metrics with three non-clickable story placeholders (FalconX, M11 Credit, RockawayX), with optional future URLs. Preserve FAQs and contact inquiry routing. Remove auxiliary participation/onboarding sections from this page and keep legacy anchor compatibility.
- [x] Add subtle viewport reveals, card hover and layer transitions. Respect reduced motion, keyboard/touch and narrow screens. Keep motion functional and avoid continuous ambient effects.
- [x] Verify scenario timing/pause/resume/reset, offscreen and reduced-motion behavior; audience section order, layer keyboard access, story placeholders and contact preselection. Run relevant navigation suites, TypeScript/build and changed-file lint.

## Review focus

1. Background/offscreen animation must stop, without leaked intervals.
2. Role switches must reset rows and notifications, including while paused.
3. Reduced-motion visitors must retain manual access to the full scenario.
4. Placeholders must never navigate to invented articles.
5. Contact CTAs preserve Borrowing/Underwriting/Lending intent; old audience URLs and hashes remain usable.

## Progress

Exploration complete. Exact Studio screen and rendered browser QA unavailable in this environment; do not claim live-interface fidelity.


Implementation review: fresh independent source review found a homepage visibility observer scoped too broadly, replay inheriting the previous interval deadline, and illustrative allocation proportions that did not follow balances. Fixed the observer to target only the preview, restart the interval on replay, and derive total funds/shares from the current displayed balances. Added timing, visibility integration and portfolio consistency regressions, observed failures before fixes and passing results after. Corrected active-vault count to exclude the draft.

Compatibility: display Capital Allocators while preserving `/capital-providers`; retired canonical and legacy audience hashes map to the corresponding new section and retain campaign query parameters.

Remaining: exact comparison against the user-shared Studio screen and the live apps; rendered desktop/mobile QA. No browser connection is available, and public live app pages are client rendered. The current Studio reconstruction is illustrative and cannot be described as a verified copy of live Studio.

Final automated validation: 185 tests pass; the unchanged SyntheticDollarSection mobile-height test still fails (expects 36rem; component uses 31rem). Changed-file ESLint passes. TypeScript/Vite production build passes, with the existing large-bundle advisory. Rendered browser QA and exact live-screen matching remain outstanding. No dependencies added; no commit, push or deployment.
