# Credit facilities diagram correction — 2026-10-23

The Revolving credit lines tile and detail dialog now share
`RevolvingCreditDiagram`. A stepped drawn-balance schematic replaces the smooth
wave: a draw increases outstanding credit, a repayment reduces it, and a redraw
increases it again. Each balance stays below a dashed credit-limit line. No
amounts, dates or rates are implied.

Labels render as HTML outside the SVG, so widening the dialog cannot stretch
the lettering. SVG geometry scales to available width; non-scaling strokes keep
lines consistent. The detail view has more plot height and an accessible image
description of the mechanics. The compact card preview remains decorative
alongside the existing facility description. Existing forest/mint colors and
typography are retained.

The section footer labels “8 facility types and counting” and
“Illustrative · not an offer of credit” are removed at the user's request.
Facility descriptions, specifications and contact routing are unchanged.

Validation: TypeScript, targeted ESLint, the 20 related section tests and the
isolated production build pass. Rendered the card at desktop width and the
expanded diagram at 1440, 1024, 768, 390 and 320px. Labels remain undistorted and
there is no horizontal overflow. Browser diagnostics were clear. The existing
production bundle-size warning remains.
