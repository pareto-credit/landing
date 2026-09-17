# Northbridge curator icon design

## Scope

Add the supplied Northbridge PNG to the existing operator-logo registry. It
will render in the curator chip for the TwoPrime vault without changing
carousel components or lookup behavior.

## Design

The existing resolver normalizes the API code `NORTHBRIDGE` to `northbridge`.
Register the PNG under that key. The existing curator lookup will then use the
image wherever Northbridge is supplied as a curator.

## Verification

Add a focused resolver test for `NORTHBRIDGE`, verify it fails before adding
the registry entry, then run focused tests and a production build.
