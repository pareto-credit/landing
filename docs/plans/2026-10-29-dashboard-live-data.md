# Dashboard live data and client-page refinement

User-authorized work: build historical aggregation, simplify Aave to a verified
direct query, and validate using a working network runtime. Blog stays on hold.
Navigation has been renamed Clients; its 24 tests pass.

The user explicitly selected **Active vault value** for the second chart line.
Label it **Credit Vault TVL**, using `tvlUsd`, rather than Outstanding Loans.
Use the same TVL field preference as the facility mapper: `withRequestsUSD`, then
`USD` when the extended field was not supplied. TVL may include idle funds,
retained interest and pending withdrawals; do not describe it as borrower debt.

## Verified live contracts — 2026-10-29

- Connected `mcp__node_repl__js` initially reached public HTTPS APIs and the same
  workspace filesystem, while exec_command DNS failed.
- Aave: POST `https://api.v3.aave.com/graphql`, `MarketRequest` input,
  `market { address chain { chainId } reserves { underlyingToken { address symbol }
  supplyInfo { apy { formatted } } borrowInfo { apy { formatted } } } }`.
  HTTP 200, Ethereum chain 1, USDC and USDT observations, CORS `*`.
  Stale docs/source used `supplyReserves`; the deployed schema uses `reserves`.
  Verified payload/query saved under `/tmp/pareto-dashboard-aave-*`.
- Pareto public `/v1/public/vaults`, `/vault-blocks`, `/vault-epochs`, `/tokens`
  and `/vaults/performances` returned HTTP 200 anonymously. Max page size is **50**.
  With Origin `https://pareto.credit`, public responses return a matching CORS
  header. `fields` does not reduce public history responses; do not depend on it.
- Catalog currently lists seven PUBLIC CDO_EPOCH vaults and one credit-index
  wrapper. History scope uses the seven published lending vaults, excludes the
  wrapper and does not add sibling IDs as additional loans.
- Snapshot/epoch USD fields use six base-unit decimals; current aggregate
  `/performances` amounts already use normalized USD. Never mix the two.

## Implementation

- [x] Aave owner: `aaveRates.ts` and tests only. One verified query, pool/chain
  validation, percentage and zero handling, abort/timeout cleanup. 15 tests pass.
- [x] Root: pure historical aggregator plus strict public pagination and scope
  validation. Daily latest indexed vault TVL plus latest reported cumulative
  epoch credit per vault; no summed cumulative totals across epochs. Record
  fixed current-public-vault scope and observation/carry-forward methodology.
- [x] Root: an explicit refresh command writes the verified aggregate snapshot
  atomically to `public/data/credit-history.json`; retain a good file on errors.
  Visitors read the compact snapshot, not every raw vault block.
- [x] Root: live-check the final exported history refresh, Aave and current-data
  fetchers. The cache contains 641 points from 3,983 blocks and 237 epochs across
  seven facilities, through 2026-10-29. The production parser retains all points;
  amounts and chronology validate. Current protocol-wide aggregates have a wider
  cohort, so equality with historical public-cohort totals is not expected.
- [x] Rate owner: replace Listed facilities and Assets represented with Average
  interest rate (native TVL-weighted APR) and signed Premium over 30-day SOFR in
  bps. Preserve observed zero, suppress fallback rates, share the benchmark cache
  and use public metadata page limits of 50. 63 focused tests/lint/TypeScript pass.
- [x] Root: final rate fetchers checked live: native APR 7.842736407823771%, SOFR
  30-day average 3.89522% dated 2026-10-28; unrounded premium 394.7516407823771 bps.
- [x] Root: independent data/client review found no blocking issues; 108 scoped
  tests independently passed. Thesis review's desktop tab-order issue was fixed
  and its requested mobile playback coverage added; re-review is clear.
- [x] Root: final application checks: 345 tests pass, with the one unchanged
  SyntheticDollarSection mobile-height failure; production build succeeds with
  the existing chunk-size advisory. Edited-file ESLint and `git diff --check`
  pass. Repository-wide lint still reports 578 errors and one warning in
  unchanged vendored declarations and existing application files.
- [x] Independent UI owner: simplify both client pages toward Morpho institutions,
  with larger Studio-style artwork, concise visible copy, generous spacing,
  subtle hover/focus motion and accessible disclosures. Audience tests/lint/tsc
  pass; source review/integration remains with root.

Preserve unrelated local work. No new dependencies, commit, push or deployment.
Known baseline failure: SyntheticDollarSection mobile-height assertion expects
36rem while unchanged source uses 31rem. Browser rendering remains unverified.
The attempted local Vite preview could not bind port 5173 (`listen EPERM`) in the
restricted execution environment. No browser appearance or scroll-geometry claim
is made from jsdom tests or successful API requests.

Network note: the connected Node runtime was restored after a transient transport
disconnect; final live validation succeeded there while shell DNS remained
restricted. The New York Fed first exceeded its 12-second timeout, then succeeded
in the final exported adapter on retry; both results are recorded. Pareto and
Aave returned HTTP 200 and matching/permissive CORS response headers. See
`docs/data-dashboard-live-validation.json` for timestamps and observations.
