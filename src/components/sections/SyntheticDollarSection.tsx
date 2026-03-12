import {
  CheckCircle2,
  Droplets,
  LineChart,
  Network,
  Puzzle,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import suspIcon from "../../assets/svgs/sUSP.svg";
import uspIcon from "../../assets/svgs/USP.svg";
import { FALLBACK_SYNTHETIC_DOLLAR_DATA } from "../../data/syntheticDollar";
import { cn } from "../../lib/cn";
import type {
  SyntheticDollarDataPayload,
  SyntheticToken,
} from "../../types/syntheticDollar";
import { ButtonLink } from "../ui/Button";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface SyntheticFeature {
  name: string;
  description: string;
  icon: LucideIcon;
}

interface SyntheticTokenContent {
  title: string;
  description: string;
  features: SyntheticFeature[];
}

interface SyntheticDollarSectionProps {
  data?: SyntheticDollarDataPayload;
  isLoading?: boolean;
}

const OPEN_IN_APP_URL = "https://app.pareto.credit/usp";
// const DOCUMENTS_URL = "https://docs.pareto.credit/product/usp";
const TOKEN_ORDER: SyntheticToken[] = ["USP", "sUSP"];
const tokenIcons: Record<SyntheticToken, string> = {
  USP: uspIcon,
  sUSP: suspIcon,
};

const syntheticDollarContent: Record<SyntheticToken, SyntheticTokenContent> = {
  USP: {
    title: "USP, the credit-based<br />synthetic dollar",
    description:
      "USP is a synthetic dollar protocol backed by real-world institutional-grade private credit.",
    features: [
      {
        name: "Composable",
        description:
          "USP is a transferable, permissionless asset that integrates across DeFi and CeFi, streamlining capital deployment, risk management, and settlements.",
        icon: Puzzle,
      },
      {
        name: "Capital Efficient",
        description:
          "Minted 1:1 against major stablecoins, USP is deployed into a diversified portfolio of liquid, short- and long-term credit to balance liquidity and yield.",
        icon: LineChart,
      },
      {
        name: "Protected",
        description:
          "USP holds senior priority in the capital stack and is shielded by a stability reserve, providing an added buffer against defaults and market stress.",
        icon: ShieldCheck,
      },
    ],
  },
  sUSP: {
    title: "sUSP, the credit<br />savings rate",
    description:
      "sUSP is the staking version of USP, acting like a savings account for RWA credit lines.",
    features: [
      {
        name: "Yield Generating",
        description:
          "sUSP allows users to earn yield from Credit Vaults and participate in Pareto's long-term growth, designed for stable, risk-adjusted returns.",
        icon: TrendingUp,
      },
      {
        name: "Liquid",
        description:
          "sUSP is fully liquid and non-custodial, allowing holders to exit at any time by simply unstaking without lockups or withdrawal restrictions.",
        icon: Droplets,
      },
      {
        name: "Diversified",
        description:
          "sUSP provides exposure to a broad set of credit lines, reducing single-counterparty risk through structured diversification.",
        icon: Network,
      },
    ],
  },
};

const SyntheticDollarSection = ({
  data = FALLBACK_SYNTHETIC_DOLLAR_DATA,
  isLoading = false,
}: SyntheticDollarSectionProps) => {
  const cards = TOKEN_ORDER.map((token) => ({
    content: syntheticDollarContent[token],
    icon: tokenIcons[token],
    isDark: token === "sUSP",
    stats: data[token].stats,
    token,
  }));

  return (
    <section
      id="synthetic-dollar"
      className="relative overflow-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <SectionContainer className="relative z-10 py-24 lg:py-32">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Synthetic Assets"
            title="Building blocks of the new era"
            description="Pareto introduces a stable unit of account and a yield-bearing savings asset, designed to work in tandem for optimal capital efficiency."
            size="2xl"
            className="max-w-2xl"
          />

          <div className="flex shrink-0 flex-wrap gap-4">
            <ButtonLink
              href={OPEN_IN_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              className="shadow-lg"
            >
              Explore
            </ButtonLink>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {cards.map(({ content, icon, isDark, stats, token }) => (
            <article
              key={token}
              className={cn(
                "ui-radius-card relative overflow-hidden border p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.10)] md:p-12",
                isDark
                  ? "border-[var(--color-border-inverse-soft)] bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)]"
                  : "border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-primary)]",
              )}
            >
              {!isDark ? (
                <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top_right,rgb(113_178_159_/_0.14),transparent_62%)] blur-3xl" />
              ) : null}

              <div className="relative z-10 flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-sm",
                    isDark
                      ? "border-[var(--color-border-inverse-soft)] bg-[var(--color-bg-dark-alt)]"
                      : "border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)]",
                  )}
                >
                  <img
                    src={icon}
                    alt={`${token} icon`}
                    draggable={false}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  {token}
                </span>
              </div>

              <h3
                className="relative z-10 mt-8 text-3xl font-bold leading-tight tracking-tight"
                dangerouslySetInnerHTML={{ __html: content.title }}
              ></h3>
              <p
                className={cn(
                  "relative z-10 mt-4 text-base leading-relaxed",
                  isDark
                    ? "text-[var(--color-text-muted-softer)]"
                    : "text-[var(--color-text-secondary)]",
                )}
              >
                {content.description}
              </p>

              <ul className="relative z-10 mt-10 space-y-4">
                {content.features.map((feature) => (
                  <li key={feature.name} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[var(--color-brand-alt)]"
                    />
                    <span
                      className={cn(
                        "text-sm leading-relaxed",
                        isDark
                          ? "text-[var(--color-text-muted-softer)]"
                          : "text-[var(--color-text-secondary)]",
                      )}
                    >
                      <span
                        className={cn(
                          "font-semibold",
                          isDark
                            ? "text-[var(--color-text-inverse)]"
                            : "text-[var(--color-text-primary)]",
                        )}
                      >
                        {feature.name}.
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div
                className={cn(
                  "relative z-10 mt-10 grid grid-cols-3 gap-6 border-t pt-10",
                  isDark
                    ? "border-[var(--color-border-inverse-soft)]"
                    : "border-[var(--color-border-soft)]",
                )}
                aria-busy={isLoading}
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={isLoading ? "animate-pulse" : undefined}
                  >
                    <div
                      className={cn(
                        "font-mono text-[10px] font-semibold uppercase tracking-widest",
                        isDark
                          ? "text-[var(--color-text-muted-soft)]"
                          : "text-[var(--color-text-secondary)]",
                      )}
                    >
                      {stat.label}
                    </div>
                    <div className="mt-2 text-2xl font-bold tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default SyntheticDollarSection;
