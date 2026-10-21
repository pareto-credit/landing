# Offering redesign — 2026-10-21

## Direction

The current direction uses isometric financial buildings in mint wireframe,
with an animated point field behind each illustration. This replaces the
initial metallic rings and knot. The section retains Pareto's forest/mint palette,
Inter / IBM Plex Mono typography, all features and contact destinations.
No prices or popularity claims were added.

## Institutional architecture (current)

A second research pass compared financial infrastructure, editorial design and
physical modular design. References informed separate principles:

| Reference | Trait studied | Avoid carrying over |
| --- | --- | --- |
| [Addepar Design](https://www.addepar.design/) | Flowing point field on dark green; spacious editorial hierarchy | Its hero composition, thin display typography and point geometry |
| [Clear Street](https://www.clearstreet.io/) | Dimensional infrastructure forms with a clear silhouette | Cobalt palette, stacked-diamond forms and centered hero |
| [Stripe Treasury](https://stripe.com/treasury) | Precise technical grids and financial information hierarchy | Purple/orange colors, product UI and wave imagery |
| [USM](https://www.usm.com/en) | Consistent frames, panels and modular proportions | Retail presentation and automatic slideshow behavior |
| [Vitra](https://www.vitra.com/en-gb/home) | Deliberate object staging and breathing room | Photography-led full-screen retail layout |

Three concepts were considered: architectural models, a technical point/network
instrument, and layered underwriting documents. Architectural wireframes were
selected following the user's building suggestion. The user's subsequent
Addepar clarification added a flowing animated point background, rather than
stationary dots. More detailed architecture replaced the first simple block study:

- Core: a compact three-storey office for the family-office / small-fintech metaphor,
  with a recessed entrance, canopy and roof terrace.
- Pro: a compact asymmetric skyline of three slender glass towers with
  varied heights, angled roofs and vertical facade divisions. The towers sit
  close together on the ground grid without a shared raised podium or cornices.
- White-Glove: the columned bank with a pitched pediment, portico and stepped base,
  representing banks and large institutions.

This mapping follows the user's refinement of the architectural progression.
The earlier bank / tower / headquarters arrangement is superseded. These are
visual metaphors; tier features, audience copy and eligibility are unchanged.

`OfferingArchitecture` projects original model coordinates into SVG. Fine mint
edges, facade divisions and corner points connect the drawings to the hero globe
and Studio grid. The forms and point field occupy the existing 190px visual area
(180px on phones), preserving compact cards and equal desktop rows. The point
field covers wide tablet cards without stretching the architectural drawing.
The sloped tower roofs retain clearance during the 5px hover lift. The first
block-like district was replaced after the user found it castle-like; the
slender towers were then brought closer together at the user's request.

CSS animates the point rows and facade highlights only while the card is hovered
with a mouse or has visible keyboard focus. Point motion pauses at its current
phase when interaction ends, avoiding a reset jump. There is no autoplay;
touch does not start decorative motion. Reduced motion disables the animations,
lift and transitions. SVGs are decorative, hidden from assistive technology and
not focusable. No additional WebGL contexts, frame loops or environment-map
imports are needed. The prior Three.js sculpture implementation is superseded.

Final drawings were rendered and inspected at 1440, 1024, 768, 390 and 320px.
No horizontal overflow was observed. At 1440px all cards remain 631px tall,
with titles and bottom CTAs aligned. Hover activates only the relevant point
field, leaving it pauses all point rows, and keyboard focus also activates the
relevant card. Tablet/phone tier switching and the detailed Core/Pro/White-Glove
silhouettes were inspected. The revised office / district / bank mapping was
also inspected at all five widths; all 17 section tests, TypeScript and targeted
lint pass. A temporary Vite HMR error occurred while renaming
the component; a fresh browser load had no warnings/errors. Reduced motion was
reviewed in CSS; browser emulation was unavailable.

TypeScript, targeted ESLint, all 17 related section tests and the isolated
production build pass. The previous architecture build produced roughly 1,323 KB / 385 KB gzip,
down from roughly 1,537 KB / 444 KB gzip with the metallic sculptures. The
existing large-chunk warning remains. The last full-suite run recorded three
known baseline failures; that historical result is recorded below.

## Clean contextual explanations (current)

The final explanation styling uses a light sage surface (`#e7f0e9`), dark forest
body text (`#284333`), a subtle border/shadow and an 8px radius. Both heading and
body use the existing sans-serif at 14px; headings are sentence case and 600
weight. Body text contrast is 9.29:1 and heading contrast is 12.4:1. The initial
technical-note experiment was simplified following user feedback: no markers,
corner brackets, accent stripes, uppercase mono labels, connector lines or
extra header dividers remain. The lighter surface follows the user's subsequent
request for stronger contrast against the dark cards.

Tier descriptions dock over the reserved illustration area when it is visible
and fits, with the drawing dimmed behind the text. Titles, subtitles, features
and CTAs remain in place; cards do not grow. The familiar “How it works” chevron
indicates expanded state. When the illustration is unavailable in the viewport,
the explanation falls back to placement near its control.

Feature explanations use the same surface with a descriptive heading. Their
width is bounded by the card's content area and the viewport. They prefer the
space above their control inside the feature list; notes near the first feature
can open below to preserve the tier heading, provided they fit before the CTA.
Viewport edge fallback, scroll/resize updates and hidden-tier dismissal remain.

Hover/focus reveals an explanation, click/tap pins it, and Escape, a repeated
activation or an outside click dismisses it. Opening another explanation closes
the previous one, including pinned notes. A short close delay lets the pointer
move into the panel. No focus moves into the noninteractive tooltip. ARIA names,
expanded state and described-by relationships remain; reduced motion disables
the brief opacity entrance. Complete availability and credit-risk text is preserved.

Final light surfaces were rendered and inspected at 1440, 1024, 768, 390 and
320px. Overviews fit above the tier title; feature notes stayed within viewport
bounds and clear of the CTA, including the longer NorthBridge disclosure on
320px. No horizontal overflow or browser warnings/errors were observed. The
technical/dark trials and earlier floating treatment are superseded.

TypeScript, targeted lint, 18 related section tests and the isolated production
build pass. The added regression covers switching away from a pinned explanation.
The existing large-chunk warning and the previously recorded full-suite baseline
failures remain outside this iteration's targeted checks.

## Initial metallic direction (superseded)

### Initial research and alternatives

Live references informed separate aspects of the design:

| Reference | Useful principle | Avoid carrying over |
| --- | --- | --- |
| [Riotters pricing](https://dribbble.com/shots/25646793-Pricing-table) | Metallic forms, hover lighting and cursor-following button glow; video inspected | Purple/blue palette, prices and camera zooms |
| [ClarityLab](https://dribbble.com/shots/23606015--ClarityLab-Pricing-Cards) | Clear tier comparison and strong material contrast | Its exact composition and sales badges |
| [Baseten](https://www.baseten.co/) | Technical clarity and infrastructure presentation | Its product illustrations |
| [Teenage Engineering](https://teenage.engineering/) | Restrained industrial controls | Product catalog styling |
| [Pentagram](https://www.pentagram.com/) | Editorial spacing and hierarchy | Serif identity |
| [Vitra](https://www.vitra.com/) | Objects presented as tangible materials | Photography-led retail layout |
| [Stripe Payments](https://stripe.com/payments) | Financial product hierarchy | Its palette and payment demos |

Alternatives considered were editorial ledger rows, a single operating-model
console, and comparable cards with material illustrations. The last direction
was selected following the user's references. The illustrations progress from a
single ring, through a knot, to interlocking rings; feature inheritance and the
named curator remain the actual explanation of the tiers.

### Initial implementation

- The two-color section title uses the same classes as Underwriting: Inter,
  700 weight, 36px / 48px size, and -0.025em tracking. The split heading/intro
  layout and section padding also follow adjacent sections.
- Compact cards contain the sculpture, tier title, subtitle, an on-demand description,
  inherited-feature explanation, complete feature list and bottom CTA.
  Core is “Self-serve”, Pro is “Guided launch”, and White-Glove retains
  “by NorthBridge” and its brand mark. Decorative indices, studio signatures,
  repeated taglines and footer slogans were removed.
- Desktop CSS subgrid shares the visual, inheritance, feature-list and action
  rows, including when copy wraps. The title/subtitle gap is 4px.
- The sculpture camera fits a rotation-independent bounding sphere, with extra
  room for hover lift. The visual has a reserved 190px desktop / 180px phone
  height; the animated forms must remain inside the canvas at every angle.
- Sculptures render once at rest, rotate and brighten on hover (or visible
  keyboard focus), then return to rest. There is no autoplay. Touch does not
  activate decorative motion. Reduced motion snaps to rest and removes CSS
  transitions. Buttons retain a cursor-following sheen.
- Three.js is already a project dependency. Illustration code loads near the
  viewport, caps device pixel ratio at 1.5, stops scheduling frames at rest and
  disposes its renderer, geometry, material and environment on unmount.
  WebGL failure leaves all tier content/actions usable without the illustration.
- Below 1024px, one tier is shown through tabs with ArrowLeft/Right, Home/End,
  roving focus and linked tab panels. Contact interests and NorthBridge's link,
  early-access/Beta tags and risk footnote are preserved.

### Initial validation

Rendered and inspected at 1440, 1024, 768, 390 and 320px. Desktop row positions
were measured; titles, subtitles, description starts, inheritance rows and CTAs
align across all three tiers. No horizontal overflow was observed. Hover samples
confirmed rotation and the revised framing; leaving the card removes active state.
Mobile tier clicks and keyboard navigation were checked in the browser.

TypeScript and targeted ESLint pass. The full suite has 124 passing tests and the
same three pre-existing failures (shared radius tokens, NarrativeScroll radius,
SyntheticDollar mobile height). The new tab keyboard regression passes. The
production build passes; the main JavaScript chunk is about 1.54 MB before gzip
(about 444 KB gzip), up from about 1.32 MB before the redesign. The existing
large-chunk warning remains. A Three.js warning
occurred during Vite dependency replacement; no new warning appeared after reload.
Reduced-motion behavior was reviewed in code; browser emulation was unavailable.

## Compact-card refinement

The subtitle divider was removed, description text reduced to 13px and feature
text to 12px on desktop. Tighter list gaps, group spacing and action padding
reduce the 1440px card height from about 719px to 670px. Phones use 14px
body/feature text; tablet feature text is 13px. The sculpture area grew from
150px to 190px (140px to 180px on phones), making the geometry larger while
retaining the camera's full-rotation fit and hover-only behavior.

Rendered at 1440, 1024, 768, 390 and 320px; title/description rows and bottom CTAs
remain aligned. Phone Pro and White-Glove tabs and enlarged hover framing were
inspected. No horizontal overflow or browser warnings/errors were observed.
The 15 related section tests pass. Production CSS compilation also passes.

## Explanations inside the relevant cards (initial version)

The two section footnotes are removed. Pro and White-Glove now explicitly list
“White-label lender app available” with an info control. The NorthBridge curator
feature has its own info control with the complete existing agreements and
credit-risk wording. Core does not show either note. No availability or risk
wording was changed.

Info controls expand a short explanation directly beneath the related feature.
They work by click, tap, Enter/Space and close on a second activation or Escape.
Each has an accessible name, aria-expanded and a unique aria-controls target.
Notes remain in normal flow, so they cannot be cut off by the card's overflow;
the shared desktop feature row keeps bottom CTAs aligned while notes are open.
There is no hover-only content, popup positioning or new dependency. Coarse
pointers get 44px targets. Opening a note deliberately increases the card height;
closed cards retain the compact presentation.

Checked open notes at 1440, 1024, 768, 390 and 320px, including keyboard opening
and Escape dismissal. Note text remained inside the card at every width, with
no horizontal overflow or browser warnings/errors. TypeScript, targeted lint,
16 related section tests and the production build pass.

## On-demand descriptions and anchored tooltips (earlier floating treatment)

The full tier descriptions no longer occupy a static row. Each subtitle has a
“How it works” control that reveals the unchanged description on hover or focus;
click/tap pins it until toggled, dismissed outside, or closed with Escape. Desktop
cards are now about 631px tall at 1440px, versus about 695px with static descriptions
and the new feature notes. Opening any explanation leaves card height unchanged.

Tier descriptions, white-label availability and the NorthBridge disclosure all
use `OfferingTooltip`: a light mint surface with dark text, subtle border/shadow
and a pointer anchored to its control. It renders in a body portal, below the
control when there is space and above otherwise. Position updates on scroll and
resize, clamps to the viewport (including scrollbar width), and closes when its
card is hidden or the trigger scrolls off screen. A short close delay allows the
pointer to cross into the tooltip and keep the explanation visible. The prior
inline expanding feature notes are superseded by these tooltips.

Checked desktop/tablet/phone at 1440, 1024, 768, 390 and 320px, plus above-control
placement near the bottom of a 900px viewport. Tooltips stayed inside the screen;
all titles, feature starts and bottom CTAs remain aligned. Browser diagnostics
were clear. Regression coverage includes hover persistence, Escape, click/outside
dismissal, aria relationships and tier-specific availability/disclosure content.

Final checks for this iteration: TypeScript, targeted lint and production build
pass. Vitest has 126 passing tests and the same three pre-existing failures;
all 17 related section tests pass. The existing bundle-size warning remains.
