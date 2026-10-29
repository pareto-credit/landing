import { SectionContainer } from "../../ui/Section";
import { Landmark } from "lucide-react";
import ProviderLogo from "./ProviderLogo";
import { useDashboardMotion } from "../../../hooks/useDashboardMotion";
import { useMacroMarkets } from "../../../hooks/useMacroMarkets";
import {
  MACRO_SOURCES,
  treasuryCurveSlopeBps,
  type MarketObservation,
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

function RateCard({
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
  const motion = useDashboardMotion<HTMLDivElement>();
  const date = observationDate(observation?.asOf ?? null);
  return (
    <div className="macro-outlook__rate" {...motion}>
      <dt><Landmark size={15} strokeWidth={1.6} aria-hidden="true" />{label}</dt>
      <dd className="macro-outlook__value">
        {loading ? (
          <>
            <span className="macro-outlook__skeleton" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </>
        ) : observation?.value != null ? (
          <>
            <span className="macro-outlook__rate-number" key={observation.value}>{rateFormatter.format(observation.value)}</span>
            <span>%</span>
          </>
        ) : (
          <span className="macro-outlook__missing" aria-label="Unavailable">
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

export default function MacroOutlook() {
  const motion = useDashboardMotion<HTMLElement>();
  const { benchmarks, treasury, protocolRates } = useMacroMarkets();
  const curveSlope = treasuryCurveSlopeBps(treasury.data);
  return (
    <>
    <section className="macro-outlook" aria-labelledby="macro-outlook-title">
      <SectionContainer>
        <div className="macro-outlook__heading">
          <div>
            <p className="macro-outlook__eyebrow">Market context</p>
            <h2 id="macro-outlook-title">Rates &amp; credit markets</h2>
          </div>
          <p>
            Dollar funding benchmarks and onchain lending rates. Each
            observation carries its own date.
          </p>
        </div>

        <dl
          className="macro-outlook__benchmarks"
          aria-label="Dollar reference rates"
        >
          <RateCard
            label="30-day average SOFR"
            observation={benchmarks.data?.sofr30d}
            description="Backward-looking · compounded annual rate"
            source={MACRO_SOURCES.nyFed}
            loading={benchmarks.isPending}
          />
          <RateCard
            label="Overnight SOFR"
            observation={benchmarks.data?.sofr}
            description="Treasury-secured overnight funding"
            source={MACRO_SOURCES.nyFed}
            loading={benchmarks.isPending}
          />
          <RateCard
            label="Effective fed funds rate"
            observation={benchmarks.data?.effr}
            description="Unsecured overnight federal funds"
            source={MACRO_SOURCES.nyFed}
            loading={benchmarks.isPending}
          />
          <RateCard
            label="2-year U.S. Treasury"
            observation={treasury.data?.twoYear}
            description="Daily par yield · annual rate"
            source={MACRO_SOURCES.treasury}
            loading={treasury.isPending}
          />
          <RateCard
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

      </SectionContainer>
    </section>
    <section className="macro-outlook macro-outlook--lending" aria-labelledby="macro-lending-title" {...motion}>
      <SectionContainer>
        <div className="macro-outlook__lending-heading">
          <h2 id="macro-lending-title">Stablecoin lending</h2>
          <span>Ethereum · supply and borrow APY</span>
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
                <h4>
                  <ProviderLogo provider={rate.protocol === "Aave" ? "aave" : "morpho"} />
                  {rate.protocol} <span className="macro-outlook__asset">{rate.asset}</span>
                </h4>
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
      </SectionContainer>
    </section>
    </>
  );
}
