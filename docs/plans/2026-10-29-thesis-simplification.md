# Thesis simplification

The page now opens with one existing claim, “Credit is moving onchain.” The
short write-up follows in the first chapter. The compact contents and the shared
header menu both link to four chapters: structured credit, constraints,
opportunity and Why Pareto. Accountability and Roadmap are removed.

The existing borrower / vault / lender diagram remains. Six accessible layer
controls use the Originators content from `src/data/personas.ts`: application,
eligibility, underwriting, credit terms, servicing and distribution. The terms
panel includes the existing term, revolving, collateralized and asset-backed
facility options. These are illustrative supported structures, not deployment
or signed-agreement assertions.

Constraints use the existing three videos as full-viewport scenes, with one
claim per scene. Desktop scroll changes the active scene; keyboard scene controls
can move directly between them. Smaller screens use natural scrolling between
full-height scenes. Videos load near the story and pause offscreen, in hidden
tabs, on user request and on unmount. Reduced motion uses the existing posters
and keeps all three claims readable without loading videos.

Why Pareto contains only Familiar, Verifiable, Efficient and Composable cards.
Their existing vector illustrations have slight motion while the card group is
visible; hidden tabs, the group leaving view and reduced-motion preferences stop
that motion.

Source review used the published Pareto knowledge build at
`539dba671797ece04f98e698de04124d175fcdd0`, its architecture, permissions and
revolving notes, and the cited factory / epoch source. The knowledge base's
2026-10-29 remote check reports that commit unchanged. The copy shares the
qualified Clients descriptions and removes earlier blanket statements about
legal enforcement, universal KYC, automatic servicing and live integrations.
Repository source does not establish a deployed implementation or legal right.

The earlier project plan names River as a reference without identifying a URL.
This change follows the requested sparse typography and pacing; no River site
identity or live visual comparison was assumed. Browser verification was
unavailable. Verification covers rendered semantics, keyboard navigation, media
lifecycle, reduced-motion rendering and existing chapter navigation, plus scoped
ESLint. The root task runs the full application checks after integration.

Final source review identified and resolved the desktop tab-order issue: scene
tabs now precede the active claim, then Pause and Skip, in forward keyboard order.
The regression failed before the DOM reorder and passed afterwards. Mobile
coverage verifies visible-scene playback and shared pause state across scenes.
All 28 focused Thesis tests pass. Final integrated checks: 345 tests passed, one
unchanged synthetic-card height assertion failed, and the production build passed.
Edited-file lint and whitespace checks pass. Global lint errors remain in
unchanged files; the reviewed Thesis changes have no unresolved source findings.
