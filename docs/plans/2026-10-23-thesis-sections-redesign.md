# Thesis sections: design review and implementation — 2026-10-23

## Review

The legacy carousel already shares the Home implementation. The remaining
chapters used a separate report layout: a 200px label gutter, top rules, narrower
content, a different heading scale, and repeated white card grids. This created
a visual break after the hero and carousel. The mobile content lacked a distinct
reading hierarchy; the roadmap gave present and future capabilities equal weight.

The selected direction is a credit-infrastructure field guide, using the existing
Inter/IBM Plex Mono, forest/mint palette, section containers, spacing and 6px
semantic radii. Shared `SectionHeader` supplies explanatory layouts, with centered
headers for the accountability statement and closing invitation. Essential text
stays visible. An editorial report and additional cinematic scroll sequences were
considered but would preserve the original mismatch or duplicate the carousel.

## Section decisions

- **The legacy:** retain the shared Home carousel, its anchor and fixed-header
  offset. Its content and interaction remain intact.
- **Opportunity:** two paired capital-pool panels and a separate tokenized-credit
  context strip. Source values, attribution and dates are preserved. Artwork is
  conceptual and does not encode a quantitative comparison between the figures.
- **The constraint:** an illustrated document panel beside five open explanatory
  rows. On desktop the panel stretches to exactly the list's height, with the
  illustration centered between its label and caption. Rows are slightly more
  compact. Phones stack the panel and list at natural heights.
- **Why onchain:** one mint vault illustration alongside a unified six-part list.
  Small standalone letter badges and repetitive detached cards are removed.
- **Accountability:** a dark statement section places the human sign-off between
  agent preparation and code execution. The curator panel has visual priority;
  the lender credit-risk statement remains visible.
- **One platform:** a reader-controlled lifecycle explorer. Five labelled tabs,
  illustrations and explanatory panels show each step without automatic cycling.
  Arrow keys wrap between tabs; Home/End reach the ends. The next-stage control
  focuses the newly selected tab. Hidden panels are excluded from reading and tab
  order. Facility links retain the existing Home destination.
- **What's next:** MCP early access is distinguished from the two future steps.
  Its CTA carries the MCP interest into the existing contact flow. Status labels
  remain explicit; the future items are not presented as available features.
- **Closing:** a centered invitation, Studio/contact and documentation actions,
  live metrics and the existing informational disclaimer.

`ThesisSections` holds chapter composition; `ThesisLifecycle` owns its small local
selection state. `thesisChapters` remains the shared navigation source. Section
heading ids and focus targets are preserved. The optional `titleTabIndex` on the
shared header supports these targets without changing other sections' behavior.

## Illustration refinement

All seven illustrations are vector components shared with the hero. Records,
structured terms, a signed decision, a dedicated vault, servicing cycles,
execution and connected markets have distinct silhouettes.

The previous translucent wireframes exposed rear edges through foreground faces,
and the layered vault had intersecting outlines. Solids now use one mathematical
isometric projection, with opaque faces and restrained face shading. Document
layers are drawn back to front. The vault has a correctly projected door and
handle; code symbols stay within one front-face panel. Network edges terminate
behind nodes instead of crossing them.

Primary outlines use 1.5px non-scaling strokes, secondary lines use 1.1px and fine
detail uses 0.9px. Fine detail is suppressed on phones. HTML retains all labels;
illustrations are decorative and do not add duplicate screen-reader content.
Pattern ids are unique per instance. Hover/focus can animate connection signals;
reduced motion disables them. No image generation, WebGL, filters or dependencies
are required.

## Research and originality

The established project references were revisited with live sources. Their
principles inform composition without replacing the project's visual identity.

| Reference | Principle studied | Intentionally not copied |
| --- | --- | --- |
| [Addepar Design](https://www.addepar.design/) | Technical detail and financial-product clarity | Typography, hero silhouette and floating widgets |
| [Stripe Connect](https://stripe.com/connect) | Distinct workflow participants and connected stages | Palette and product diagrams |
| [DTCC](https://www.dtcc.com/) | Contextualizing financial scale and named responsibilities | Navigation and page structure |
| [Pentagram work](https://www.pentagram.com/work) | Editorial hierarchy and variation between visual moments | Identity, type and portfolio grids |
| [USM](https://www.usm.com/en) | Consistent modular construction | Furniture silhouettes and photography |
| [NN/G accordions](https://www.nngroup.com/articles/accordions-on-desktop/) | Disclosure costs: avoid hiding essential short explanations | Article presentation |

The paired capital-pool board/context strip and the curator-centered responsibility
sequence are product-specific composition choices. The reference families include
institutional finance, product workflows, editorial design and modular industrial
design. Motion is limited to deliberate interactions. UI/UX Pro Max's generated
cyberpunk/neon recommendation was rejected because it conflicts with the user's
established institutional style and explicit preference against game-like UI.

## Validation

- Rendered and inspected 1440, 1024, 768, 390 and 320px layouts, including the
  rebuilt hero art, dark/light illustrations and lifecycle controls. SVGs retain
  their proportions and do not depend on tiny text. The narrow layouts keep
  explanatory content in reading order.
- Measured the constraint card and list at 1440px: both approximately 582px high.
  Mobile retains natural stacked heights.
- Verified current-chapter links, mouse/touch stage selection, roving tab focus,
  arrow-key wrapping, Home/End, next-stage navigation and contact intent.
- Focused page, lifecycle, chapter-index and navbar tests: 39 pass.
- Full Vitest: 156 pass, one pre-existing SyntheticDollarSection height assertion
  fails (`36rem` expected versus existing `31rem`).
- Targeted lint passes. Full lint retains 579 errors and one warning, matching the
  previous baseline. TypeScript and isolated production build pass; the existing
  bundle-size warning remains.
- No Safari or physical-device test was performed. The existing body minimum
  width of 320px can reserve an extra scrollbar width in desktop phone emulation;
  the Thesis components themselves introduce no horizontal content overflow.
