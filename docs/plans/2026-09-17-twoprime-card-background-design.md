# TwoPrime card background design

## Scope

Add a TwoPrime watermark to the existing vault-card background treatment.
Keep carousel markup, positioning, and opacity unchanged.

## Design

Derive a transparent SVG from the supplied TwoPrime profile asset: retain the
logo path, remove the opaque purple background, and recolor the mark with the
shared muted watermark color `#BCC8C0`. Register it under the existing
normalized `twoprime` background key. The carousel already renders this
background at the lower right of each matching vault card.

## Verification

Add a resolver test for the `TWO_PRIME` background, verify it fails before
the mapping exists, then run focused tests and a production build.
