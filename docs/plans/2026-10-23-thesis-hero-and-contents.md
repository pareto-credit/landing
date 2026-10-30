# Thesis hero and header index — 2026-10-23

## Hero

The hero uses the established Inter heading, two-color statement and mono section
caption. “Thesis” is the only eyebrow; the institutional-briefing and October 2026
labels are removed. The introduction is shortened while preserving its underwriting
argument. Title and introduction precede the path graphic, as on the Ecosystem
opening. Height follows the content, with no full-viewport minimum.

At 1440px, the hero is approximately 657px high, compared with the previous 817px
opening. The title uses 48px desktop type and 32–36px on phones. Existing section
containers, forest/mint colors and semantic 6px radii remain in use.

`ThesisPathGraphic` illustrates fragmented workflows → accountable underwriting →
connected markets. Wireframe records, a signed decision and connected positions
use the landing's line and point language. The later
[chapter and vector refinement](2026-10-23-thesis-sections-redesign.md) unifies the
hero and chapter artwork with clean outlines and opaque, consistently projected
faces. Labels remain HTML, SVG geometry keeps
its proportions, and non-scaling strokes preserve clarity on phones. Connection
points move only on deliberate hover; reduced motion disables them. No images,
WebGL or additional dependencies are introduced.

## Reading index in the site header

There is no secondary navigation bar beneath the hero. The “Thesis” item in the
fixed site header opens the chapter index on every page. It has no chapter total
or scrolling counter. On phones it reads “Thesis” on other pages and “Chapters”
while reading the Thesis, beside the global menu button. At 320px the logo is
28px high throughout the site to keep the two controls separate.

The index organizes the seven destinations into three groups:

- Context: The legacy, Opportunity, The constraint.
- Foundations: Why onchain, Accountability.
- Execution: One platform, What's next.

Desktop displays these as three columns. Phones use compact grouped rows, with
natural phrase wrapping and at least 44px link targets. The index includes the
current chapter on Thesis and a Back to overview link. On other pages it uses
“Thesis contents” and “Read the overview”, with all destinations linking directly
to the corresponding Thesis anchors. Available height is bounded below
the site header; short screens can scroll the index internally.

`Navbar` coordinates the Solutions and Thesis disclosures so only one is open.
Opening the full-screen mobile menu closes and hides the chapter control. The
index closes on selection, an outside pointer, Escape, page scroll or resize.
Escape returns focus to the trigger; scroll and resize do so if focus would
otherwise remain inside hidden content. A selection within Thesis focuses its
heading with `preventScroll`. Cross-page selections let the router manage arrival
without focusing a matching heading on the old page. `PageLink` delegates hash
scrolling to the router and respects reduced motion. Modified clicks retain normal
link behavior.

`thesisChapters` in `src/data/thesis.ts` is the shared source for destination ids,
labels, groups and numbering. “The legacy” links to the narrative carousel's
`legacy` anchor. On Thesis, passive reading updates `aria-current="location"`
inside the menu without writing URL/history. The trigger identifies Thesis as the
current page only on that route. Chapter tracking is disabled elsewhere, so shared
section ids on other pages cannot produce false highlights. Tracking uses the
reading line beneath the fixed header.

Chapter scroll margins reserve the site header and a small gap. The carousel's
internal viewport fills the space below that header, using its existing resize
observer to update the visual geometry. There is no extra sticky contents layer.

## Design rationale and references

The selected composition pairs an editorial opening with a credit-path diagram
and a reading index inside the existing navigation. The diagram explains the
argument; the header index exposes the article's structure only when needed.
Grouping chapters by Context, Foundations and Execution avoids a persistent row
of seven controls. The trigger stays compact and does not change its visible text
while reading.

The established visual references from the Ecosystem work inform continuity;
live contents-navigation references inform the interaction. Principles are used
without reproducing another site's visual identity.

| Reference | Principle used | Not copied |
| --- | --- | --- |
| [Addepar Design](https://www.addepar.design/) | Technical point details | Hero silhouette and typography |
| [Stripe Connect](https://stripe.com/connect) | Distinct participants and responsibilities | Imagery and palette |
| [DTCC](https://www.dtcc.com/) | Concrete institutional language | Navigation and layout |
| [USM](https://www.usm.com/en) | Modular structural thinking; prior visual review was limited | Product geometry and branding |
| [Pentagram work](https://www.pentagram.com/work) | Editorial proportions and pacing | Serif identity and work-index layout |
| [NN/G in-page links](https://www.nngroup.com/articles/in-page-links-content-navigation/) | Explicit contents label and recognizable jump links | Article layout |
| [GOV.UK contents list](https://design-guide.publishing.service.gov.uk/components/content-list/) | Ordered destinations mapping to document structure | Government styling |

## Validation

- Rendered and inspected 1440, 1024, 768, 390 and 320px widths. The graphic follows
  both title and introduction at each size; the index stays inside the viewport
  and header controls do not overlap the logo. Approximate hero heights: 657, 660, 650, 713 and 722px.
- Inspected the desktop three-column index and phone grouped index, including
  320 × 667px. Available height and phrase wrapping keep destinations readable.
- Verified Home/Ecosystem → Thesis chapter navigation on desktop and phone,
  route-specific current-page state, and the absence of trigger counters.
- Verified carousel navigation, active chapter, heading focus, dismissal,
  browser-back behavior and stable reading position with native pointer input.
- Eight focused index tests cover destinations, tracking without history writes,
  the carousel, focus and dismissal. Navbar regression tests cover route changes
  and coordination with Solutions, plus index availability on all three main pages. Existing narrative tests pass.
- Full Vitest: 149 pass, 1 existing unrelated failure. The SyntheticDollarSection
  height test expects `36rem`, while the existing implementation uses `31rem`.
- New Thesis components, page, Navbar, related tests and data pass targeted ESLint.
  Full-project lint retains the prior 579 errors and 1 warning. The modified
  narrative component retains its existing mixed-exports React Refresh error.
- TypeScript and isolated production build pass. The existing bundle-size warning
  remains. Isolated compilation avoids changing tracked generated timestamps.
  Reduced-motion and touch rules were reviewed; no physical-device or Safari
  test was performed.
