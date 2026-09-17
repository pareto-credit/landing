# TwoPrime carousel image design

## Scope

Add the supplied Two Prime profile SVG as an operator asset for the product
carousel. Do not change the carousel or its asset-resolution mechanism.

## Design

The API supplies the operator code `TWO_PRIME`. The existing resolver
normalizes operator codes by lowercasing and removing non-alphanumeric
characters, producing `twoprime`. Register the supplied SVG with that key in
the existing operator-logo mapping. The carousel already asks this resolver
for every vault's operator image, so the matching TwoPrime vault displays the
same asset automatically.

## Verification

Add a focused resolver test for `TWO_PRIME`, verify it fails before adding the
mapping, then run the focused and full test suites after the asset is added.
