# Published use cases and facility illustration polish

User-approved continuation of the current local website. Preserve unrelated
changes; no commits, publication, dependencies or blog implementation.

- [x] Order shared use-case cards RockawayX, M11 Credit, FalconX across both
  Clients pages and both product pages. Link the first two to the exact supplied
  Paragraph articles; show FalconX as COMING SOON without a link.
- [x] Make the Credit Vaults flow markers circular. The location question for
  the reported dot returned no answer, so this follows the nearby Credit Vaults
  illustration context; the available screenshot shows the use-case cards.
  Keep moving circles outside the stretched revolving SVG, retain the lifecycle
  controls and use responsive travel distances. Round custody/receivables dots.
- [x] Replace abstract multiasset symbols with local USDC/USDT, ETH and BTC
  logos, preserving the three isolated ledgers and their existing motion.
- [x] Put Studio walkthrough labels to the left of every marker, including
  outside the mockup, and reserve desktop space to keep them in the viewport.
  Retain the compact mobile dock.
- [x] Give published cards and the FalconX placeholder the same inner layout:
  fixed logo row, common copy start and a footer pushed to the card's bottom.
- [x] Run relevant checks and production build; record baseline failures and
  visual verification limits.

The supplied RockawayX and M11 Credit articles were opened to verify the links
and card titles. Existing audience-page assertions now check order, exact URLs,
safe external links and the unlinked FalconX placeholder. Audience/Product page
checks pass (24 tests).

Final verification: production build (including TypeScript) and scoped ESLint
pass. Full suite: 354 passed, with the existing SyntheticDollarSection mobile
height assertion still failing (36rem expected; unchanged source uses 31rem).
The four local PNG logos were visually inspected and have verified PNG
signatures and square dimensions. Browser layout/pixel verification remains
unavailable because the local preview server cannot open its port.
