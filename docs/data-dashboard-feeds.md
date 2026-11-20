# Dashboard feeds

The dashboard separates current Pareto aggregates, cached historical observations
and external market context. Each source has independent loading and unavailable
states. No authentication secrets are shipped to the browser.

## Current portfolio metrics

Current protocol metrics come from `/v1/public/vaults/performances`. Its aggregate
USD amounts are already normalized; do not divide them by token decimals again.
Total value locked retains the shared hook's legacy `outstandingLoans` property
name, but it is displayed as TVL, not borrower debt.

**Average interest rate** uses the API's native `APRs.AVG`, in annual percentage
points. The reviewed aggregate calculation weights each reported vault APR by
its TVL. Display rounding does not change the input used for comparisons.
**Premium over 30-day SOFR** is `(APRs.AVG − SOFR average30day) × 100` basis
points, using the latest dated New York Fed observation. The dashboard and macro
section share one cached benchmark query. Missing APR, SOFR or benchmark date
produces a dash; an observed zero remains zero. Illustrative fallback data does
not supply either metric.

## Historical credit and TVL

`useCreditHistory` reads `VITE_PARETO_HISTORY_URL`, or the same-origin
`public/data/credit-history.json` by default. The checked-in snapshot was generated
from anonymous production API requests on **2026-10-29**, with **641 dated
observations across seven published credit facilities**, through 2026-10-29.
The source metadata and validation receipt record exact retrieval times.

The schema is version 2:

```json
{
  "schemaVersion": 2,
  "source": "Pareto public API · 7 credit facilities",
  "asOf": "2026-10-29",
  "retrievedAt": "2026-10-29T11:36:12.158Z",
  "points": [
    { "date": "2026-10-29", "creditExtendedUsd": 3544957547.532455, "tvlUsd": 229621955.213853 }
  ],
  "scope": { "vaultIds": [], "vaultNames": [], "description": "Document the covered cohort." },
  "methodology": { "creditExtended": "…", "tvl": "…", "observations": "…" }
}
```

Each point has an exact UTC calendar date and normalized USD amounts or `null`.
The two displayed series are **Credit Extended** and **Outstanding Loans**.
The latter retains the `tvlUsd` accounting definition: it may include idle capital,
retained interest and pending withdrawal cash, rather than representing only
borrower debt. The chart caption identifies its vault-TVL basis.

The refresh uses these anonymously accessible endpoints:

- `https://api.pareto.credit/v1/public/vaults`
- `/v1/public/vault-blocks?vaultId=…&sort=timestamp&order=asc`
- `/v1/public/vault-epochs?vaultAddress=…&sort=timestamp&order=asc`

All pages use `limit=50` and explicit offsets. The API rejects larger limits.
The fetcher validates pagination completeness and vault IDs, limits concurrency,
and aborts remaining requests if any facility fails. Public responses currently
ignore `fields`, so large nested records are reduced to the required accounting
fields after each page is read.

The catalog selects current PUBLIC `CDO_EPOCH` facilities with READY, PAUSED or
BOOSTED status. The generated cohort includes M1 Capital, Bastion Trading,
Adaptive Frontier, Two Prime, Fasanara Digital, RockawayX and FalconX USDC.
Credit-index wrappers, private facilities and unlisted sibling vault IDs are
excluded. This is a history of the current published cohort, not a reconstruction
of every historical catalog membership. Current protocol headline totals and
facility-table groupings can cover a different scope and need not equal it.

For each source-observation date, the aggregate uses the last indexed vault TVL
and the latest reported cumulative epoch credit value per vault, ordered by
observation block timestamp. It never adds cumulative credit totals across epochs
or backdates a final epoch total to its start date. Later observations of an older
cycle cannot replace a newer cycle. TVL prefers `withRequestsUSD`, falling back
to `USD` only when the extended field is absent. These raw historical USD fields
have six base-unit decimals and are divided by `1e6` once.

Last reported values carry forward between index updates. A facility contributes
zero before its first indexed snapshot; after a known first epoch start, missing
cumulative credit remains unavailable until reported. Missing reported amounts
remain gaps, and future-dated observations are excluded. The snapshot contains
47 credit gaps and two TVL gaps. These coverage rules are included in the feed.

The chart supports independent series selection, 1M/3M/1Y/All ranges, pointer
inspection and keyboard navigation. The display carries each series' last known
value forward across missing values, preserving zero and leaving observations
before the first reported value unavailable. A step line holds each value until
the next report instead of drawing a linear change between reports. Range
filtering happens after carry-forward and seeds the range boundary from the last
earlier value. The raw cache and its missing-value metadata remain unchanged.
Range windows end at the latest observation, not the visitor's clock.

### Refreshing the snapshot

From a runtime with working public HTTPS access, run:

```sh
npm run data:refresh
```

The script runs the production aggregation module using the existing TypeScript
dependency, validates that both series contain usable observations, then replaces
`public/data/credit-history.json` atomically. A fetch or validation failure retains
the previous good snapshot. Visitors download this compact file, not the complete
raw vault history. Refresh is explicit; no recurring job or deployment was added.
The displayed source date makes the snapshot's age visible.

## External rates and credit markets

| Source | Displayed observations | Method |
| --- | --- | --- |
| [New York Fed](https://markets.newyorkfed.org/static/docs/markets-api.html) | 30-day average SOFR, overnight SOFR, effective fed funds | Latest dated observation per rate type; percentages are already percentage points. |
| [U.S. Treasury](https://home.treasury.gov/treasury-daily-interest-rate-xml-feed) | 2-year and 10-year par yields, curve slope | Current-year XML feed; slope is `(10y − 2y) × 100` bps only when dates match. |
| [Aave API](https://www.aave.com/docs/aave-v3/getting-started/graphql) | USDC and USDT supply/borrow APY | Ethereum V3 Core pool `0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2`; base APY excludes incentives. |
| [Morpho API](https://docs.morpho.org/developers/api/morpho/) | USDC and USDT supply/borrow APY | Top 100 listed Ethereum markets by supplied USD; per-asset supply/borrow APYs weighted by supplied/borrowed USD respectively, excluding rewards. |
| FRED | Investment-grade and high-yield spread references | Source links only; no licensed spread observations reproduced. |

Aave uses one fixed, live-verified `DashboardAaveRates($request: MarketRequest!)`
query against `https://api.v3.aave.com/graphql`. The deployed Market field is
`reserves`. The adapter validates the pool address and Ethereum chain ID 1, then
selects canonical USDC/USDT token addresses. It does not use introspection.
`PercentValue.formatted` already represents percentage points (`"11"` means 11%).

Morpho rate fractions are multiplied by 100. Its cross-market sample is a benchmark,
not an executable rate for every position. Missing positive-weight observations
invalidate that weighted dimension instead of silently excluding them. Canonical
Ethereum token addresses identify USDC/USDT; symbols alone do not select assets.

Publication dates are shown where supplied. Protocol responses without documented
publication timestamps use a separately labelled retrieval date. Requests have
cancellation and a 12-second timeout. Failed fetches do not produce sample rates.
Fed and Treasury reference-rate cards use institution icons. Aave and Morpho use
local brand marks; their sources are recorded in
`src/assets/images/providers/SOURCES.md`. Existing Morpho artwork is reused.

## Verification and limits

The final exported historical refresh function was executed successfully against
all seven facilities. The final exported current-portfolio and New York Fed
fetchers also succeeded, confirming the native APR, dated SOFR average and their
computed premium. The New York Fed initially timed out; its successful retry and
separate matching-origin CORS check are recorded. The final exported Aave fetcher was executed in a networked
runtime and returned two asset observations from a single HTTP 200 request with
`Access-Control-Allow-Origin: *`. Pareto's public endpoints returned the requested
origin for `Origin: https://pareto.credit`. These are server response checks;
browser rendering has not been checked.

See [the recorded live validation](data-dashboard-live-validation.json) for the
request timestamp, Aave observations, history scope and coverage. Fixture tests
cover aggregation, pagination, atomic cache preservation, rate parsing and chart
interaction. Treasury and Morpho adapters have fixture coverage but are not covered
by this live validation receipt. A successful networked runtime check does not
establish that every browser environment can reach every external provider.
