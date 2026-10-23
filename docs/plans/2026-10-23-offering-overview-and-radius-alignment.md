# Offering overviews and shared radii — 2026-10-23

## Current behavior

“How it works” now opens an in-place overview covering the full card footprint.
The original architectural illustration, tier title, subtitle and trigger remain
above the reading layer. The feature list retains its layout underneath, so
opening the overview does not change card height or CTA alignment.

A uniform pale sage frost at 72% opacity uses an 18px backdrop blur and
slightly reduced saturation. There is no shaded fade or gradient mask. A thin,
light gloss line aligns exactly with the original feature divider, including its
horizontal insets. The original divider becomes transparent while open, retaining
its layout. Text begins 24px below this line. Deep forest text remains
opaque for contrast. The original CTA is visually hidden under the overlay to
avoid its mint fill creating a false halo through the glass; the blurred feature
list remains underneath. The divider position is measured and observed rather
than assumed, including when the subtitle wraps or a breakpoint changes.

The original tier description is followed by a short explanation derived from
existing features. White-Glove repeats the complete existing NorthBridge
agreements and credit-risk disclosure. Availability, product names and CTA
contact interests are unchanged. Feature-specific info notes remain anchored,
high-contrast tooltips; they do not use this full-card overview treatment.

`OfferingOverview` owns the overview interaction and uses the same
`OfferingCta` component as the original card. Overview CTAs use darker forest
variants, retaining the pointer-following highlight and arrow movement. Only the
outer card clips rounded corners, avoiding doubled curves and dark corner gaps.
There is no close icon. Hover or focus reveals the overview; click/tap pins or
toggles it. Escape, an outside click or selecting another mobile tier dismisses
it. Opening another explanation closes the previous one, including pinned notes.

The covered feature body is inert and hidden from assistive technology while
open. Keyboard users reach the overview CTA directly from its trigger; Escape
from the overview restores trigger focus. The panel is a named region and the
trigger exposes expanded state and its description. Motion is disabled by the
section's existing reduced-motion rules. Coarse pointers retain 44px triggers.

Copy fits without inner scrolling at the checked default text sizes. A hidden
scrollbar preserves overflow access when text zoom or a constrained layout makes
it necessary; copy is not clipped with a fixed-height truncation.

## Radius policy

Live Vaults is the reference: `--radius-card`, `--radius-panel` and
`--radius-control` resolve to `--radius-md` (0.375rem / 6px at the default root
font size). Rectangular UI surfaces use their semantic class or CSS variable.
Offering, Credit facilities/dialogs, Studio, agent previews, navigation panels,
news imagery, solution previews and secondary-page cards now follow this scale.
Circle logos, dots, pills and chart geometry keep their intentional shapes.

The Narrative SVG cutout also uses 6px. Its numeric geometry constant is
explicitly documented against the CSS token because SVG path arithmetic needs
pixel values. Existing radius regression expectations now reflect this policy.

## Validation

- Rendered Offering at 1440, 1024, 768, 390 and 320px; all three tier descriptions
  fit without inner scrolling, with no horizontal overflow or card-height change.
- Checked keyboard traversal to the overview CTA, Escape focus restoration,
  mobile tier switching and bottom corner clipping. Browser diagnostics were clear.
- Verified computed 6px surface radii on the homepage, Ecosystem and Thesis;
  inspected secondary pages at desktop and 390px widths.
- TypeScript and the 20 related home-section tests pass. The isolated production
  build passes; the existing large JavaScript chunk warning remains.
- Full Vitest: 131 passing, one unchanged SyntheticDollarSection assertion failure
  (test expects a 36rem mobile slide; implementation uses 31rem).
- Full ESLint: the existing 579 errors / one warning remain. Changed-file lint
  reports only existing EcosystemSection and NewsSection synchronous-effect
  findings and NarrativeScrollSection's mixed-exports finding; these were also
  verified against HEAD. New Offering components pass lint.
