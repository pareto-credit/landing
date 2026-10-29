import { useEffect } from "react";
import { Coins, Layers3, Network, Wallet, type LucideIcon } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { buttonClassName } from "../components/ui/buttonStyles";
import { SectionContainer } from "../components/ui/Section";
import { PARETO_APP_URL, PARETO_DOCS_URL } from "../data/brand";
import { useProductsData } from "../hooks/useProductsData";
import { useBenchmarkRates } from "../hooks/useMacroMarkets";
import { useCreditHistory } from "../hooks/useCreditHistory";
import { useDashboardMotion } from "../hooks/useDashboardMotion";
import CreditHistoryChart from "../components/sections/dashboard/CreditHistoryChart";
import MacroOutlook from "../components/sections/dashboard/MacroOutlook";
import "./data-dashboard.css";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatUsd = (value: number) =>
  Number.isFinite(value) ? currencyFormatter.format(value) : "—";

const rateFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const basisPointsFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  signDisplay: "exceptZero",
});

const Arrow = () => <span aria-hidden="true">↗</span>;

function Metric({
  label,
  value,
  description,
  isLoading,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  isLoading: boolean;
  icon: LucideIcon;
}) {
  const motion = useDashboardMotion<HTMLDivElement>();
  return (
    <div className="data-dashboard-metric" {...motion}>
      <dt><Icon size={16} strokeWidth={1.6} aria-hidden="true" />{label}</dt>
      <dd>
        {isLoading ? (
          <>
            <span className="data-dashboard-skeleton" aria-hidden="true" />
            <span className="sr-only">Loading</span>
          </>
        ) : (
          <span className="data-dashboard-metric__value" key={value}>{value}</span>
        )}
        <span className="data-dashboard-metric__description">
          {description}
        </span>
      </dd>
    </div>
  );
}

export default function DataDashboardPage() {
  const heroMotion = useDashboardMotion<HTMLElement>();
  const tableMotion = useDashboardMotion<HTMLDivElement>();
  const {
    metrics,
    vaults,
    weightedAverageApr,
    isLoading,
    isUsingFallback,
    availability,
    isPartialData,
  } = useProductsData();
  const benchmarks = useBenchmarkRates();
  const history = useCreditHistory();
  const orderedVaults = [...vaults].sort((a, b) => {
    const first =
      typeof a.tvlUsd === "number" && Number.isFinite(a.tvlUsd)
        ? a.tvlUsd
        : -Infinity;
    const second =
      typeof b.tvlUsd === "number" && Number.isFinite(b.tvlUsd)
        ? b.tvlUsd
        : -Infinity;
    return first === second ? 0 : first < second ? 1 : -1;
  });
  const largestTvl = orderedVaults.reduce((largest, { tvlUsd }) =>
    typeof tvlUsd === "number" && Number.isFinite(tvlUsd)
      ? Math.max(largest, tvlUsd)
      : largest, 0);
  useEffect(() => {
    const previous = document.title;
    document.title = "Data Dashboard | Pareto";
    return () => {
      document.title = previous;
    };
  }, []);
  const hasCreditExtended =
    isUsingFallback || availability.metrics.creditExtended;
  // This legacy hook field contains the API's aggregate TVL, not loan principal.
  const hasTvl = isUsingFallback || availability.metrics.outstandingLoans;
  const hasAverageInterestRate =
    !isUsingFallback &&
    typeof weightedAverageApr === "number" &&
    Number.isFinite(weightedAverageApr);
  const sofr30d = benchmarks.data?.sofr30d;
  const premiumBps =
    hasAverageInterestRate &&
    typeof sofr30d?.value === "number" &&
    Number.isFinite(sofr30d.value) &&
    sofr30d.asOf
      ? (weightedAverageApr - sofr30d.value) * 100
      : null;
  const hasPremium = premiumBps !== null && Number.isFinite(premiumBps);
  const isPremiumLoading = isLoading || (hasAverageInterestRate && benchmarks.isPending);

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main className="data-dashboard-main">
        <section className="data-dashboard-hero" aria-labelledby="hero-title" {...heroMotion}>
          <SectionContainer>
            <p className="data-dashboard-eyebrow">Data dashboard</p>
            <div className="data-dashboard-hero__layout">
              <div>
                <h1 id="hero-title" tabIndex={-1}>
                  Credit, <span className="data-dashboard-title-accent">in view.</span>
                </h1>
                <p className="data-dashboard-hero__intro">
                  Protocol metrics and public Credit Vaults, in one place.
                  Explore the facilities behind the figures.
                </p>
              </div>
              <a
                className={buttonClassName("primary", "md")}
                href={PARETO_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the app <Arrow />
              </a>
            </div>

            <div
              className={`data-dashboard-source${
                !isLoading && (isUsingFallback || isPartialData)
                  ? " data-dashboard-source--fallback"
                  : ""
              }`}
              role="status"
              aria-live="polite"
            >
              <span className="data-dashboard-source__dot" aria-hidden="true" />
              {isLoading ? (
                <span>Loading protocol data…</span>
              ) : isUsingFallback ? (
                <>
                  <span>Illustrative snapshot – live data is unavailable.</span>
                  <a
                    href={PARETO_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open the Pareto app <Arrow />
                  </a>
                </>
              ) : isPartialData ? (
                <>
                  <span>
                    Partial data – some protocol metrics or vault values are
                    unavailable. Unavailable values are marked —.
                  </span>
                  <a
                    href={PARETO_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open the Pareto app <Arrow />
                  </a>
                </>
              ) : (
                <span>From the Pareto API</span>
              )}
            </div>

          </SectionContainer>
        </section>

        <section className="data-dashboard-overview" aria-label="Protocol metrics">
          <SectionContainer>
            <dl
              className="data-dashboard-metrics"
              aria-label="Protocol overview"
              aria-busy={isLoading || isPremiumLoading}
            >
              <Metric
                icon={Network}
                label="Credit extended"
                value={
                  hasCreditExtended ? formatUsd(metrics.creditExtended) : "—"
                }
                description={
                  hasCreditExtended
                    ? "Protocol aggregate · USD"
                    : "Unavailable · USD"
                }
                isLoading={isLoading}
              />
              <Metric
                icon={Wallet}
                label="Total value locked"
                value={hasTvl ? formatUsd(metrics.outstandingLoans) : "—"}
                description={
                  hasTvl ? "Protocol aggregate · USD" : "Unavailable · USD"
                }
                isLoading={isLoading}
              />
              <Metric
                icon={Layers3}
                label="Average interest rate"
                value={
                  hasAverageInterestRate ? `${rateFormatter.format(weightedAverageApr)}%` : "—"
                }
                description={
                  hasAverageInterestRate ? "TVL-weighted · APR" : "Unavailable · TVL-weighted APR"
                }
                isLoading={isLoading}
              />
              <Metric
                icon={Coins}
                label="Premium over 30-day SOFR"
                value={
                  hasPremium ? `${basisPointsFormatter.format(premiumBps)} bps` : "—"
                }
                description="Average APR less 30-day SOFR"
                isLoading={isPremiumLoading}
              />
            </dl>
          </SectionContainer>
        </section>

        <section className="data-dashboard-history" aria-label="Historical credit activity">
          <SectionContainer>
            <CreditHistoryChart {...history} />
          </SectionContainer>
        </section>

        <MacroOutlook />

        <section
          className="data-dashboard-facilities"
          aria-labelledby="facilities-title"
        >
          <SectionContainer>
            <div className="data-dashboard-section-heading">
              <div>
                <p className="data-dashboard-eyebrow">Facility overview</p>
                <h2 id="facilities-title">Public credit facilities</h2>
              </div>
              <p>
                Ordered by TVL. Explore each vault in the app for its full terms
                and details.
              </p>
            </div>

            <div
              className="data-dashboard-table-wrap"
              {...tableMotion}
              role="region"
              aria-label="Credit facilities table"
              tabIndex={0}
            >
              <table aria-labelledby="facilities-title" aria-busy={isLoading}>
                <thead>
                  <tr>
                    <th scope="col">Facility</th>
                    <th scope="col">Operator</th>
                    <th scope="col">Asset</th>
                    <th scope="col" className="data-dashboard-number">
                      APY
                    </th>
                    <th
                      scope="col"
                      className="data-dashboard-number"
                      aria-sort="descending"
                    >
                      TVL
                    </th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 4 }, (_, index) => (
                      <tr key={index} aria-hidden="true">
                        {Array.from({ length: 6 }, (_, column) => (
                          <td key={column}>
                            <span className="data-dashboard-skeleton" />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : vaults.length > 0 ? (
                    orderedVaults.map((vault) => (
                      <tr key={vault.id}>
                        <th scope="row">
                          {vault.address.trim() ? (
                            <a
                              href={`${PARETO_APP_URL}vault/${encodeURIComponent(
                                vault.address.trim()
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="data-dashboard-facility-mark" aria-hidden="true">
                                {vault.name.trim().slice(0, 1)}
                              </span>
                              {vault.name} <Arrow />
                            </a>
                          ) : (
                            vault.name
                          )}
                        </th>
                        <td>{vault.operatorName || "—"}</td>
                        <td>
                          <span className="data-dashboard-asset" data-asset={vault.asset.toUpperCase()}>
                            {vault.asset || "—"}
                          </span>
                        </td>
                        <td className="data-dashboard-number">
                          {vault.apy || "—"}
                        </td>
                        <td className="data-dashboard-number">
                          {vault.tvl || "—"}
                          {typeof vault.tvlUsd === "number" &&
                          Number.isFinite(vault.tvlUsd) && vault.tvlUsd >= 0 && largestTvl > 0 ? (
                            <span className="data-dashboard-tvl-rail" aria-hidden="true">
                              <span style={{ width: `${(vault.tvlUsd / largestTvl) * 100}%` }} />
                            </span>
                          ) : null}
                        </td>
                        <td>
                          <span className="data-dashboard-status" data-state={vault.status.toUpperCase()}>
                            {vault.status.replace(/_/g, " ") || "—"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="data-dashboard-empty">
                        <p>
                          {isUsingFallback
                            ? "Facility data is unavailable."
                            : "No public facilities to display."}
                        </p>
                        <a
                          href={PARETO_APP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Explore vaults in the app <Arrow />
                        </a>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="data-dashboard-notes">
              <p>
                USD totals and the TVL-weighted APR are protocol aggregates.
                The premium compares the average APR with the New York Fed’s
                30-day SOFR, in basis points.
              </p>
              <a
                href={PARETO_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read documentation <Arrow />
              </a>
            </div>
          </SectionContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
}
