# Ecosystem design and navigation — 2026-10-23

## Direction

The Ecosystem opening now uses the landing's Inter typography, two-color heading,
forest/mint surfaces and 6px card/control radius tokens. The title and introduction
share a compact split header. Four editorial role panels replace the old tall
cards. Each has an audience, explanation, capability list, contact link and a
custom credit schematic. All information remains visible without opening a panel.

At 1440px, the first panels start at about 293px instead of 625px; the title is
48px instead of approximately 74px. Each panel is about 608 × 287px. Desktop uses
a two-by-two grid; tablet uses wide single-column panels; phones stack each panel's
description, capabilities and CTA. Existing role copy, links and contact interests
are preserved in `src/data/ecosystem.ts`.

The selected concept is a connected credit desk: facility rails for borrowers,
documents and verification for curators, allocations for lenders, and a network
hub for distribution. Two alternatives were considered: an interactive network
board (hid useful role details) and four vertical art cards (repeated the Offering
composition). Diagrams animate only on deliberate hover or keyboard focus, with
reduced-motion overrides. SVGs are decorative beside the explanatory text.

## Reference matrix

Live references were reviewed for principles, rather than copied as layouts.

| Reference | Observed approach | Application |
| --- | --- | --- |
| [Addepar Design](https://www.addepar.design/) | Dark technical point field and editorial finance presentation | Sparse point texture inside diagrams; retain Pareto's existing type and palette |
| [Stripe Connect](https://stripe.com/connect) | Text review: platform participants and their distinct needs | Separate each audience's purpose from its capabilities |
| [DTCC](https://www.dtcc.com/) | Text review: market infrastructure and service segmentation | Direct institutional language; concrete roles rather than decorative tier names |
| [USM](https://www.usm.com/en) | Modular system reference; visual inspection was limited by its consent overlay | Consider structural proportions, without claiming a detailed product-page study |
| [Pentagram work](https://www.pentagram.com/work) | Editorial index with modular compositions and serif/sans contrast | Wider panels and visual pacing; retain Inter instead of introducing a second heading family |

The design combines the site's technical point language with editorial panels and
modular divisions. It keeps the landing's established sans-serif/mono hierarchy.
Motion uses restrained schematic signal flow and a small diagram lift; neither
requires autoplay or conceals content.

The hero keeps the page-level “Ecosystem” caption. The later “Engineered for global
scale” section uses “Built for institutions” to distinguish institution types from
the opening participant roles. Partner group headings, “Live Vaults” and
“Testimonials” retain their descriptive labels without another Ecosystem caption.

## Current navigation

`Navbar` subscribes to router location. Ecosystem and Thesis receive a visible
underline and `aria-current="page"`. Solutions is highlighted on the homepage;
its matching hash destination receives `aria-current="location"` in the dropdown.
The mobile menu uses a tinted current row with an inset accent. These states
update after client navigation and browser back. The hash indicates the selected
destination; this is not a scroll-position tracker.

## Partner logo behavior and sources

Both the Ecosystem grid and homepage strip use `PartnerLogo`. Logos are monochrome
at rest, then reveal the unfiltered source artwork on mouse hover and keyboard
focus. Light or dark backing keeps native wordmark ink readable. Touch pointers
show the original artwork without needing hover. Reduced-motion preferences remove
the color-transition animation. The homepage strip also pauses during keyboard
focus. Duplicate marquee links remain outside the tab order and accessibility tree.

Flattened assets could not regain colors through a CSS filter, so replacement
artwork was retrieved from primary brand sources on 2026-10-23:

| Local asset in `src/assets/images/partners/` | Primary source |
| --- | --- |
| `falconx.svg` | Header artwork at [FalconX](https://www.falconx.io/), blue wordmark |
| `rockawayx.svg` | Header artwork at [RockawayX](https://www.rockawayx.com/), dark wordmark with green X; preserve its aspect ratio |
| `bastion.svg` | Header artwork at [Bastion Trading](https://bastiontrading.com/), official white version |
| `m11credit.svg` | [M11 Credit logo](https://www.m11credit.com/hubfs/M11%20Credit/logos/m11-credit-logo.svg), official white version |
| `fasanara.png` | Header artwork at [Fasanara](https://www.fasanara.com/), silver parent-brand wordmark used for the Fasanara Digital roster entry |
| `morpho.svg` | Horizontal light-mode SVG from the [official Morpho brand kit](https://brand.morpho.org/) |

Existing original-color RedStone, Gauntlet and Euler assets are retained, as are
the native monochrome Two Prime, Adaptive Frontier, Steakhouse and Keyring assets.
Official monochrome brands stay monochrome; no invented accent colors are added.
Logo sources used by Live Vaults and testimonials are unchanged. Imported SVGs
contain no scripts, foreign objects, event attributes or external references.

## Validation

- Rendered and inspected 1440, 1024, 768, 390 and 320px layouts; no horizontal overflow.
- Verified desktop current-page underline, mobile current-page row, client navigation
  from Ecosystem to Thesis, and browser back restoring the Ecosystem state.
- Checked all 13 logo images load and expose keyboard color/focus states; visually
  verified blue FalconX, green RockawayX and dark Keyring with readable backing.
  Actual mouse hover also restores the FalconX artwork. Checked the shared strip
  on the light homepage background. Touch and reduced-motion rules were reviewed
  in CSS; no physical touch-device test was performed.
- All changed TypeScript/TSX files pass targeted ESLint. Full-project ESLint retains
  the existing 579 errors and 1 warning, outside this change.
- Full Vitest run: 137 pass, 1 existing failure. The SyntheticDollarSection mobile
  height test expects `36rem`; the existing implementation uses `31rem`.
- TypeScript and isolated production build pass. The existing large-bundle warning
  remains. The isolated build avoids changing tracked discovery-file timestamps.
- Regression tests cover current states after client navigation, the mobile current
  page, selected solution hash, and all four role-to-contact interests.
