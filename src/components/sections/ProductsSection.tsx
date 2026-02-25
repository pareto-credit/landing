import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import {
  getOperatorBackground,
  getOperatorLogo,
} from "../../data/operatorLogos";
import type { ProductVaultCard } from "../../types/products";
import { ButtonLink } from "../ui/Button";
import { SectionContainer } from "../ui/Section";

interface ProductsSectionProps {
  vaults: ProductVaultCard[];
  isVaultsLoading: boolean;
}

const PRODUCTS_SKELETON_COUNT = 4;

const getStatusClassName = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("run") || normalized.includes("ready")) {
    return "border border-[color:rgb(113_178_159_/_0.35)] bg-[color:rgb(113_178_159_/_0.15)] text-[var(--color-brand-deep)]";
  }
  if (
    normalized.includes("stop") ||
    normalized.includes("close") ||
    normalized.includes("pause") ||
    normalized.includes("disable")
  ) {
    return "border border-[var(--color-state-danger-border)] bg-[var(--color-state-danger-bg)] text-[var(--color-state-danger-text)]";
  }
  return "border border-[var(--color-border-soft-strong)] bg-[var(--color-surface-soft)] text-[var(--color-text-muted-soft)]";
};

const formatStatusLabel = (status: string) => status.replace(/_/g, " ");

const truncateDescription = (description?: string) =>
  description && description.length > 190
    ? `${description.slice(0, 187).trimEnd()}...`
    : description;

const metricLabelClassName =
  "font-mono text-[10px] uppercase tracking-[0.16em] leading-none text-[var(--color-text-secondary)]";
const metricValueClassName =
  "whitespace-nowrap font-sans text-[1.01rem] font-semibold leading-none tracking-tight text-[var(--color-text-primary)] md:text-[1.35rem]";

const ProductsSection = ({ vaults, isVaultsLoading }: ProductsSectionProps) => {
  return (
    <section
      id="products"
      className="relative overflow-hidden border-y border-[var(--color-border-soft)] bg-[var(--color-bg-light)] py-24 text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[color:rgb(113_178_159_/_0.10)] blur-[100px]" />

      <SectionContainer className="relative z-10 mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
        <div className="max-w-3xl">
          <div className="ui-eyebrow mb-4">
            Live Markets
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Transparent risk. Verifiable yield.
          </h2>
          <p className="ui-copy-muted max-w-2xl text-lg leading-relaxed">
            Explore our active institutional lending markets. Data is pulled
            directly from onchain states in real-time.
          </p>
        </div>

        <ButtonLink
          href="https://app.pareto.credit/"
          target="_blank"
          rel="noopener noreferrer"
          variant="underline"
          size="sm"
          className="normal-case text-[var(--color-text-primary)]"
        >
          Explore All Vaults <ArrowRight size={14} />
        </ButtonLink>
      </SectionContainer>

      {isVaultsLoading ? (
        <div className="relative z-10 mx-auto flex w-full max-w-7xl gap-6 overflow-hidden px-6 py-8">
          {Array.from({ length: PRODUCTS_SKELETON_COUNT }).map((_, index) => (
            <div
              key={`product-skeleton-${index}`}
              role="status"
              className="ui-card-surface min-w-[420px] max-w-[420px] flex-shrink-0 animate-pulse p-8"
            >
              <div className="mb-8 flex items-start justify-between">
                <div className="h-11 w-48 rounded-full bg-[var(--color-bg-light)]" />
                <div className="h-6 w-20 rounded-full bg-[var(--color-bg-light)]" />
              </div>

              <div className="mb-5 h-9 w-52 rounded bg-[var(--color-bg-light)]" />
              <div className="mb-6 flex gap-2">
                <div className="h-6 w-16 rounded bg-[var(--color-bg-light)]" />
                <div className="h-6 w-24 rounded bg-[var(--color-bg-light)]" />
              </div>

              <div className="mb-8 space-y-2">
                <div className="h-3 w-full rounded bg-[var(--color-bg-light)]" />
                <div className="h-3 w-full rounded bg-[var(--color-bg-light)]" />
                <div className="h-3 w-4/5 rounded bg-[var(--color-bg-light)]" />
              </div>

              <div className="ui-radius-panel grid grid-cols-3 overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)]">
                <div className="h-[84px] border-r border-[var(--color-border-soft)]" />
                <div className="h-[84px] border-r border-[var(--color-border-soft)]" />
                <div className="h-[84px]" />
              </div>
              <span className="sr-only">Loading vault cards...</span>
            </div>
          ))}
        </div>
      ) : vaults.length === 0 ? (
        <SectionContainer className="relative z-10 py-8">
          <div className="ui-radius-panel border border-[color:rgb(14_24_19_/_0.15)] bg-[var(--color-overlay-surface-70)] p-8 text-center backdrop-blur-sm">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
              Live data unavailable
            </p>
            <p className="ui-copy-muted mt-3 text-lg">
              Vault cards are temporarily unavailable. Refresh the page in a few
              seconds.
            </p>
          </div>
        </SectionContainer>
      ) : (
        <div className="group relative z-10 marquee-container w-full cursor-grab py-8 active:cursor-grabbing">
          <div className="marquee-content gap-6 px-6">
            {[...Array(2)].map((_, loopIndex) => (
              <Fragment key={`vault-loop-${loopIndex}`}>
                {vaults.map((vault) => {
                  const operatorLogo = getOperatorLogo(
                    vault.operatorCode,
                    vault.operatorName,
                  );
                  const operatorBackground = getOperatorBackground(
                    vault.operatorCode,
                    vault.operatorName,
                  );
                  const curatorLogo = getOperatorLogo(
                    vault.curatorCode,
                    vault.curatorName,
                  );
                  const statusClassName = getStatusClassName(vault.status);
                  const description = truncateDescription(vault.description);
                  const vaultLink = `https://app.pareto.credit/vault#${vault.address}`;

                  return (
                    <a
                      key={`${loopIndex}-${vault.id}`}
                      href={vaultLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${vault.name} vault`}
                      className="ui-card-surface group relative flex min-w-[420px] max-w-[420px] flex-shrink-0 flex-col overflow-hidden p-8 no-underline shadow-[0_8px_30px_rgb(0,0,0,0.04)] whitespace-normal transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.10)]"
                    >
                      {operatorBackground ? (
                        <img
                          src={operatorBackground}
                          alt=""
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-0 right-0 z-0 h-[62%] w-[72%] select-none object-contain object-right-bottom opacity-[0.18]"
                        />
                      ) : null}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:rgb(113_178_159_/_0.05)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                      <div className="relative z-10 flex h-full flex-col">
                        <div className="mb-6 flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            {vault.operatorName ? (
                              <div className="flex items-start gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
                                  {operatorLogo ? (
                                    <img
                                      src={operatorLogo}
                                      alt={vault.operatorName}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <span className="font-sans text-base font-bold text-[var(--color-brand)]">
                                      {vault.operatorName
                                        .charAt(0)
                                        .toUpperCase()}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0 pt-0.5">
                                  <p className="truncate whitespace-nowrap text-[1.7rem] font-semibold leading-none tracking-tight text-[var(--color-text-primary)]">
                                    {vault.name}
                                  </p>
                                  {vault.subtitle ? (
                                    <p className="mt-1 truncate whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                                      {vault.subtitle}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            ) : (
                              <p className="truncate whitespace-nowrap text-[1.7rem] font-semibold leading-none tracking-tight text-[var(--color-text-primary)]">
                                {vault.name}
                              </p>
                            )}
                          </div>

                          <span
                            className={`inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 font-mono text-[9px] font-bold uppercase tracking-widest leading-none shadow-sm ${statusClassName}`}
                          >
                            {formatStatusLabel(vault.status)}
                          </span>
                        </div>

                        <div className="mb-6 flex flex-wrap gap-2">
                          {vault.curatorName ? (
                            <span className="inline-flex h-8 items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-3 font-mono text-[10px] font-semibold uppercase tracking-widest leading-none text-[var(--color-chip-text)]">
                              <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-soft)]">
                                {curatorLogo ? (
                                  <img
                                    src={curatorLogo}
                                    alt={vault.curatorName}
                                    className="h-5 w-5 object-contain"
                                  />
                                ) : (
                                  <span className="text-[10px] text-[var(--color-brand-soft)]">
                                    {vault.curatorName.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </span>
                              {vault.curatorName}
                            </span>
                          ) : null}

                          <span className="inline-flex h-8 items-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-3 font-mono text-[10px] font-semibold uppercase tracking-widest leading-none text-[var(--color-chip-text)]">
                            {vault.asset}
                          </span>

                          {vault.type ? (
                            <span className="inline-flex h-8 items-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-3 font-mono text-[10px] font-semibold uppercase tracking-widest leading-none text-[var(--color-chip-text)]">
                              {vault.type}
                            </span>
                          ) : null}
                        </div>

                        {description ? (
                          <p className="mb-8 flex-1 break-words whitespace-normal font-mono text-[13px] leading-[1.7] text-[var(--color-text-secondary)]">
                            {description}
                          </p>
                        ) : null}

                        <div className="ui-radius-panel grid grid-cols-3 overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)]">
                          <div className="flex h-[80px] flex-col justify-center gap-2 border-r border-[var(--color-border-soft)] px-4">
                            <p className={metricLabelClassName}>TVL</p>
                            <p className={metricValueClassName}>{vault.tvl}</p>
                          </div>
                          <div className="flex h-[80px] flex-col justify-center gap-2 border-r border-[var(--color-border-soft)] bg-[var(--color-overlay-surface-50)] px-4">
                            <p className={metricLabelClassName}>Net APY</p>
                            <p className={metricValueClassName}>{vault.apy}</p>
                          </div>
                          <div className="flex h-[80px] flex-col justify-center gap-2 bg-[var(--color-surface-muted)] px-4">
                            <p className={metricLabelClassName}>Redemptions</p>
                            <p className={metricValueClassName}>
                              {vault.redemptions ?? "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsSection;
