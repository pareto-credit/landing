import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Droplets,
  LineChart,
  Network,
  Puzzle,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import suspIcon from "../../assets/svgs/sUSP.svg";
import uspIcon from "../../assets/svgs/USP.svg";
import { FALLBACK_SYNTHETIC_DOLLAR_DATA } from "../../data/syntheticDollar";
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
const DOCUMENTS_URL = "https://docs.pareto.credit/product/usp";
const TOKEN_ORDER: SyntheticToken[] = ["USP", "sUSP"];
const tokenIcons: Record<SyntheticToken, string> = {
  USP: uspIcon,
  sUSP: suspIcon,
};

const syntheticDollarContent: Record<SyntheticToken, SyntheticTokenContent> = {
  USP: {
    title: "USP, the credit-based synthetic dollar",
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
    title: "sUSP, the credit savings rate",
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
  const shouldReduceMotion = useReducedMotion();
  const [activeToken, setActiveToken] = useState<SyntheticToken>("USP");

  const content = syntheticDollarContent[activeToken];
  const stats = data[activeToken].stats;
  const panelMotion = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  return (
    <section
      id="synthetic-dollar"
      className="relative overflow-hidden bg-[var(--color-bg-light-alt)] py-24 text-[var(--color-text-primary)]"
    >
      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Synthetic Dollar"
          title="Building blocks of the new era."
          className="mx-auto mb-14 text-center"
          titleClassName="text-[var(--color-text-primary)]"
        />

        <div className="ui-radius-card relative overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:p-12">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[color:rgb(113_178_159_/_0.10)] blur-[110px]" />

          <div
            aria-label="Synthetic dollar token selector"
            className="relative z-10 mb-12 flex justify-center lg:mb-14"
          >
            <div className="inline-flex rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-light)] p-1.5 shadow-inner">
              {TOKEN_ORDER.map((token) => {
                const isActive = activeToken === token;

                return (
                  <button
                    key={token}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveToken(token)}
                    className={`relative flex min-h-12 items-center gap-3 rounded-full px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(112_177_158_/_0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-light)] sm:px-8 ${
                      isActive
                        ? "text-[var(--color-text-primary)]"
                        : "text-[color:rgb(41_59_51_/_0.56)] hover:text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="synthetic-dollar-tab"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 }
                        }
                        className="absolute inset-0 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-[0_2px_10px_rgb(14,24,19,0.06)]"
                      />
                    ) : null}

                    <span className="relative z-10 flex items-center gap-3">
                      <span
                        className={`flex items-center justify-center overflow-hidden rounded-full border ${
                          isActive
                            ? "border-[var(--color-brand-deep)] bg-[var(--color-brand-deep)]"
                            : "border-[var(--color-border-soft-strong)] bg-transparent"
                        }`}
                      >
                        <img
                          src={tokenIcons[token]}
                          alt={`${token} icon`}
                          draggable={false}
                          className={`h-6 w-6  object-contain ${
                            isActive ? "opacity-100" : "opacity-75"
                          }`}
                        />
                      </span>
                      <span>{token}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeToken}
              initial={panelMotion.initial}
              animate={panelMotion.animate}
              exit={panelMotion.exit}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.3 }
              }
              className="relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16"
            >
              <div className="lg:col-span-5 lg:self-center">
                <h3 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)] md:text-4xl">
                  {content.title}
                </h3>
                <p className="mt-4 max-w-xl font-mono text-[13px] leading-[1.8] text-[var(--color-text-secondary)]">
                  {content.description}
                </p>

                <div
                  className="mt-8 grid grid-cols-3 gap-3"
                  aria-busy={isLoading}
                >
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className={`rounded-[1.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 text-center shadow-sm ${
                        isLoading ? "animate-pulse" : ""
                      }`}
                    >
                      <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.03em] text-[var(--color-text-secondary)]">
                        {stat.label}
                      </div>
                      <div className="mt-2 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] md:text-2xl">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink
                    href={OPEN_IN_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="md"
                    className="text-[var(--color-text-primary)]"
                  >
                    Open In App
                  </ButtonLink>
                  <ButtonLink
                    href={DOCUMENTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="white"
                    size="md"
                    className="border-[var(--color-border-soft-strong)] bg-[var(--color-surface)]/70 text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]"
                  >
                    Documents
                  </ButtonLink>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:col-span-7 lg:self-center">
                {content.features.map((feature) => (
                  <article
                    key={feature.name}
                    className="group rounded-[1.75rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_10px_30px_rgb(14,24,19,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:rgb(113_178_159_/_0.32)] hover:shadow-[0_18px_36px_rgb(14,24,19,0.08)]"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.1rem] border border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] transition-colors duration-300 group-hover:border-[color:rgb(113_178_159_/_0.24)] group-hover:bg-[color:rgb(113_178_159_/_0.10)]">
                        <feature.icon
                          size={22}
                          className="text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-brand-alt)]"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)]">
                          {feature.name}
                        </h4>
                        <p className="mt-2 font-mono text-[11px] leading-[1.8] text-[color:rgb(41_59_51_/_0.82)]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </SectionContainer>
    </section>
  );
};

export default SyntheticDollarSection;
