# Originators and Capital Providers

## Approved design

Replace the standalone Ecosystem page with two audience destinations at
`/originators` and `/capital-providers`. Use a “Who we serve” menu with exactly
those destinations. Redirect legacy audience URLs to the matching page and
`/ecosystem` to the homepage. The Studio homepage link should point to Originators.

Use the approved business-led hero language. Page order: introduction, relevant
proof, benefits, one interactive facility/assessment framework, participation
paths, product or live-facility demonstration, customer evidence, onboarding,
questions and contact. Replace problem-first comparisons and repeated plan grids.

Originators configure facilities; Capital Providers assess them. Keep borrower
and curator roles distinct. Describe withdrawals as facility-specific; distinguish
onchain records from offchain reporting and legal obligations. Mark illustrative
product data. Keep agent capability availability as already labelled in the site.

Preserve approved homepage copy and the restored vault descriptions. Retain the
green palette, compact radii, accessible focus and reduced-motion behavior. Use
spaced en dashes in new copy. No deployment or changes to existing package-lock.

## Implementation plan

1. Add behavioral coverage for the two audience destinations, contact intents,
   framework keyboard interaction, FAQs, navigation and legacy redirects.
2. Replace persona content with audience-specific benefits, framework details,
   participation routes, process, case-study context and FAQs. Add an accessible
   framework component and rebuild the shared page with distinct audience content.
3. Add canonical routes and legacy redirects. Update navbar, footer, homepage
   links, machine-readable discovery and route documentation. Remove the hub UI.
4. Run targeted tests, full tests, lint and production build. Review responsive
   CSS, link destinations and claim boundaries. Attempt a browser preview.

## Review focus

- Keyboard and touch selection of every framework panel; no automatic rotation.
- Canonical and legacy URLs, including direct loads and contact context.
- Loading and unavailable public data; no invented numeric proof.
- Capital Providers never configured as if they control a borrower's terms.
- Existing approved homepage changes and package-lock remain intact.

## Execution record

Working in the existing feature checkout to preserve the user's ongoing changes.
The user approved the design and execution in this conversation. Implementation
will remain uncommitted and unpublished for review.

### Completion and validation

- Rebuilt both audience pages and replaced the hub with redirects. Updated the
  navbar, footer, Studio link, public sitemap/robots/Markdown and browser MCP links.
- Added keyboard-accessible, manually controlled frameworks and native FAQ
  disclosures. Kept the live-vault component unchanged.
- Fresh review identified three issues, all fixed with failing-then-passing
  regression tests: fallback metrics presented as current; old section bookmarks
  losing their targets; hub redirects losing query context. Old section hashes
  now map to the corresponding new section, with the closing anchor retained.
- All 67 focused tests pass. Final full suite: 173 pass, one failure in the
  unchanged synthetic-dollar mobile-height test (expects 36rem; component 31rem).
- Production build and changed-file ESLint pass. Repository-wide ESLint reports
  existing issues in data-access declarations and unrelated sections.
- Browser preview could not run: the environment rejects the local server bind
  with EPERM. Responsive styles and interaction semantics were reviewed in source;
  rendered desktop/mobile QA remains outstanding.
- Existing approved Agents/Structures edits and the prior package-lock changes
  were preserved. No commit, push or deployment was performed.
