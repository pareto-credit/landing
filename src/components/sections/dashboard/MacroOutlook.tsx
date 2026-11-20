import { Landmark } from "lucide-react";
import ProviderLogo from "./ProviderLogo";
import { useDashboardMotion } from "../../../hooks/useDashboardMotion";
import {
  MACRO_SOURCES,
  treasuryCurveSlopeBps,
  type BenchmarkRates,
  type MarketObservation,
  type ProtocolRate,
  type TreasuryRates,
} from "../../../lib/macroMarkets";
import "./macro-outlook.css";

const rateFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function observationDate(asOf: string | null) {
  return asOf
    ? dateFormatter.format(new Date(`${asOf.slice(0, 10)}T12:00:00Z`))
    : null;
}

function ReferenceRate({
  label,
  observation,
  description,
  source,
  loading,
}: {
  label: string;
  observation?: MarketObservation;
  description: string;
  source: { name: string; url: string };
  loading: boolean;
}) {
  const date = observationDate(observation?.asOf ?? null);
  return (
    <div className="macro-outlook__rate">
      <dt>{label}</dt>
      <dd className="macro-outlook__value">
        {loading ? (
          <>
            <span className="macro-outlook__skeleton" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </>
        ) : observation?.value != null ? (
          `${rateFormatter.format(observation.value)}%`
        ) : (
          <span aria-label="Unavailable">
            —
          </span>
        )}
      </dd>
      <dd className="macro-outlook__description">{description}</dd>
      <dd className="macro-outlook__source">
        <span>
          {loading ? (
            "Loading observation…"
          ) : date ? (
            <>
              As of <time dateTime={observation!.asOf!}>{date}</time>
            </>
          ) : (
            "Observation unavailable"
          )}
        </span>
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {source.name} <span aria-hidden="true">↗</span>
        </a>
      </dd>
    </div>
  );
}

export function ReferenceRates({
  benchmarks,
  treasury,
}: {
  benchmarks: { data?: BenchmarkRates; isPending: boolean };
  treasury: { data?: TreasuryRates; isPending: boolean };
}) {
  const curveSlope = treasuryCurveSlopeBps(treasury.data);
  return (
    <section className="macro-outlook__reference" aria-labelledby="reference-rates-title">
      <div className="macro-outlook__reference-heading">
        <div>
          <p className="data-dashboard-eyebrow">Market context</p>
          <h2 id="reference-rates-title">
            Reference <span className="text-[var(--color-text-muted)]">rates</span>
          </h2>
        </div>
        <Landmark size={20} strokeWidth={1.6} aria-hidden="true" />
      </div>

      <dl
        className="macro-outlook__benchmarks"
        aria-label="Dollar reference rates"
        aria-busy={benchmarks.isPending || treasury.isPending}
      >
        <ReferenceRate
          label="30-day average SOFR"
          observation={benchmarks.data?.sofr30d}
          description="Backward-looking · compounded annual rate"
          source={MACRO_SOURCES.nyFed}
          loading={benchmarks.isPending}
        />
        <ReferenceRate
          label="Overnight SOFR"
          observation={benchmarks.data?.sofr}
          description="Treasury-secured overnight funding"
          source={MACRO_SOURCES.nyFed}
          loading={benchmarks.isPending}
        />
        <ReferenceRate
          label="Effective fed funds rate"
          observation={benchmarks.data?.effr}
          description="Unsecured overnight federal funds"
          source={MACRO_SOURCES.nyFed}
          loading={benchmarks.isPending}
        />
        <ReferenceRate
          label="2-year U.S. Treasury"
          observation={treasury.data?.twoYear}
          description="Daily par yield · annual rate"
          source={MACRO_SOURCES.treasury}
          loading={treasury.isPending}
        />
        <ReferenceRate
          label="10-year U.S. Treasury"
          observation={treasury.data?.tenYear}
          description="Daily par yield · annual rate"
          source={MACRO_SOURCES.treasury}
          loading={treasury.isPending}
        />
      </dl>

      <div className="macro-outlook__curve">
        <span>
          U.S. Treasury curve{" "}
          <span className="macro-outlook__curve-tenors">
            10-year − 2-year
          </span>
        </span>
        <span>
          {treasury.isPending ? (
            "Loading…"
          ) : curveSlope == null ? (
            "Observation unavailable"
          ) : (
            <>
              <strong>
                {new Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 0,
                  signDisplay: "always",
                }).format(curveSlope)}{" "}
                bps
              </strong>
              <span>
                {" "}
                · As of {observationDate(treasury.data!.twoYear.asOf)}
              </span>
            </>
          )}
        </span>
      </div>
    </section>
  );
}

export default function MacroOutlook({
  protocolRates,
}: {
  protocolRates: ProtocolRate[];
}) {
  const motion = useDashboardMotion<HTMLElement>();
  return (
    <section className="macro-outlook" aria-labelledby="macro-outlook-title" {...motion}>
      <div className="data-dashboard-section-heading">
        <div>
          <p className="data-dashboard-eyebrow">Market context</p>
          <h2 id="macro-outlook-title">
            Stablecoin <span className="text-[var(--color-text-muted)]">lending</span>
          </h2>
        </div>
        <p>Ethereum · supply and borrow APY</p>
      </div>
      <div
        className="macro-outlook__lending"
        role="list"
        aria-label="Stablecoin lending rates"
      >
        {protocolRates.map((rate) => (
          <article
            className="macro-outlook__protocol"
            data-protocol={rate.protocol}
            key={`${rate.protocol}-${rate.asset}`}
            role="listitem"
            aria-busy={rate.isLoading}
          >
            <div className="macro-outlook__protocol-title">
              <h3>
                <ProviderLogo provider={rate.protocol === "Aave" ? "aave" : "morpho"} />
                {rate.protocol} <span className="macro-outlook__asset">{rate.asset}</span>
              </h3>
              <span className="macro-outlook__network">Ethereum</span>
            </div>
            <dl className="macro-outlook__protocol-values">
              <div>
                <dt>Supply APY</dt>
                <dd>
                  {rate.isLoading ? (
                    <>
                      <span
                        className="macro-outlook__skeleton"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Loading</span>
                    </>
                  ) : rate.supplyApy == null ? (
                    "—"
                  ) : (
                    `${rateFormatter.format(rate.supplyApy)}%`
                  )}
                </dd>
              </div>
              <div>
                <dt>Borrow APY</dt>
                <dd>
                  {rate.isLoading ? (
                    <>
                      <span
                        className="macro-outlook__skeleton"
                        aria-hidden="true"
                      />
                      <span className="sr-only">Loading</span>
                    </>
                  ) : rate.borrowApy == null ? (
                    "—"
                  ) : (
                    `${rateFormatter.format(rate.borrowApy)}%`
                  )}
                </dd>
              </div>
            </dl>
            <p className="macro-outlook__coverage">{rate.coverage}</p>
            <div className="macro-outlook__source">
              <span>
                {rate.isLoading ? (
                  "Loading rates…"
                ) : rate.asOf ? (
                  <>
                    As of{" "}
                    <time dateTime={rate.asOf}>
                      {observationDate(rate.asOf)}
                    </time>
                  </>
                ) : rate.retrievedAt &&
                  (rate.supplyApy != null || rate.borrowApy != null) ? (
                  <>
                    Retrieved{" "}
                    <time dateTime={rate.retrievedAt}>
                      {observationDate(rate.retrievedAt)}
                    </time>{" "}
                    · publication time not supplied
                  </>
                ) : (
                  "Rate feed unavailable"
                )}
              </span>
              <a
                href={rate.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {rate.protocol} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="macro-outlook__notes">
        <p>
          Supply APY is the lender’s annualized return; borrow APY is the
          borrower’s annualized cost. Rates vary with utilization. Morpho
          rates depend on the selected market and collateral.
        </p>
        <p>
          Corporate credit context:{" "}
          <a
            href="https://fred.stlouisfed.org/series/BAMLC0A0CM"
            target="_blank"
            rel="noopener noreferrer"
          >
            U.S. investment-grade spreads ↗
          </a>{" "}
          ·{" "}
          <a
            href="https://fred.stlouisfed.org/series/BAMLH0A0HYM2"
            target="_blank"
            rel="noopener noreferrer"
          >
            U.S. high-yield spreads ↗
          </a>
          . Live spread observations are unavailable here.
        </p>
      </div>
    </section>
  );
}
