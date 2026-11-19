# Clients stack and Studio polish

Continuation of the user-approved local website edits. Preserve the existing
feature branch and unrelated changes. No publication, commits, dependencies or
blog implementation.

- [x] Replace both Clients layer explorers with six stacked planes, connected
  labels and concise summaries, following Morpho's institutions stack. Hover,
  click/touch and keyboard navigation select the same layer. Retain optional
  secondary details and protect keyboard focus while hovering.
- [x] Use Upcoming for Agent-prepared actions and its compact Pareto Agents
  mention. Keep other agents' existing availability and ordinary Next controls.
- [x] Diagnose and fix Studio's clipped final letter.
- [x] Keep Studio mockup interaction hints visible by default while retaining
  their controls and keyboard/mobile usability.
- [x] Verify the relevant interactions, full test suite and production build;
  record any existing failures and browser verification limits.

The mesh hero, restored reference-rate institution icons, removed thesis
paragraph and smaller source links were saved before the workspace disconnected.

Clients and Agent checks: 37 tests pass. Hovering a plane or label, clicking a
plane and direct tab focus select the matching layer. Arrow/Home/End navigation
and optional details are retained; hovering cannot remove focused details.

Studio's text-clipped gradients inherit negative letter spacing that shortens
the final glyph's paint box. Both the base and sheen now reserve the matching
trailing space. All four tour callout labels remain visible and clickable across
the overview and feature mockups; compact desktop labels fit the Requests and
Reports anchors, while the mobile label dock remains available.

Final checks: 354 tests pass, with the same existing failure in
`SyntheticDollarSection.test.tsx` (mobile cards expect 36rem, unchanged source
uses 31rem). TypeScript and the production build pass. Browser/pixel verification
is unavailable: starting the local Vite preview fails with
`listen EPERM 127.0.0.1:5174`.

Scoped ESLint passes. Independent source review found no issues in these
changes. Rendered hit testing, overlap/cropping and the final letter's pixel
appearance remain unverified because browser preview is unavailable.
