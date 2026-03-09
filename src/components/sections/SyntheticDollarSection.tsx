import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
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
import { SectionContainer } from "../ui/Section";

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
      className="ui-section-fit relative overflow-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <SectionContainer className="ui-section-shell relative z-10">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between xl:mb-12">
          <div className="max-w-2xl">
            <div className="mb-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-alt)]">
              Synthetic Assets
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-5xl">
              Building blocks of the new era.
            </h2>
          </div>

          <div
            aria-label="Synthetic dollar token selector"
            className="shrink-0"
          >
            <div className="inline-flex rounded-full border border-[var(--color-border-soft-strong)] bg-[var(--color-surface)] p-1.5 shadow-sm">
              {TOKEN_ORDER.map((token) => {
                const isActive = activeToken === token;

                return (
                  <button
                    key={token}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveToken(token)}
                    className={`relative flex min-h-11 items-center gap-3 rounded-full px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(112_177_158_/_0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-light-alt)] sm:px-8 ${
                      isActive
                        ? "text-[var(--color-text-inverse)]"
                        : "text-[color:rgb(41_59_51_/_0.56)] hover:text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="synthetic-dollar-tab"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 30 }
                        }
                        className="absolute inset-0 rounded-full bg-[var(--color-brand-mid)] shadow-[0_6px_16px_rgb(14_24_19_/_0.16)]"
                      />
                    ) : null}

                    <span className="relative z-10 flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center overflow-hidden rounded-full`}
                      >
                        <img
                          src={tokenIcons[token]}
                          alt={`${token} icon`}
                          draggable={false}
                          className={`h-7 w-7  object-contain ${
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
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeToken}
            initial={panelMotion.initial}
            animate={panelMotion.animate}
            exit={panelMotion.exit}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }
            }
            className="relative z-10 grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-8 shadow-[0_20px_40px_rgb(14_24_19_/_0.04)] lg:col-span-6 lg:p-12">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top_right,rgb(113_178_159_/_0.16),transparent_62%)] blur-3xl" />

              <div className="relative z-10">
                <h3 className="max-w-xl text-[1.9rem] font-bold leading-[1.15] tracking-tight text-[var(--color-text-primary)] md:text-[2.3rem]">
                  {content.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:rgb(41_59_51_/_0.90)]">
                  {content.description}
                </p>
              </div>

              <div
                className="relative z-10 mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-border-soft)] sm:grid-cols-3 xl:mt-10"
                aria-busy={isLoading}
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`bg-[var(--color-surface)] p-5 text-center ${
                      isLoading ? "animate-pulse" : ""
                    }`}
                  >
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-4 xl:mt-10">
                <ButtonLink
                  href={OPEN_IN_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="md"
                  className="shadow-lg"
                >
                  Open In App
                  <ArrowRight size={14} />
                </ButtonLink>
                <ButtonLink
                  href={DOCUMENTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="white"
                  size="md"
                  className="border-[var(--color-border-soft-strong)] bg-[var(--color-surface)]"
                >
                  Documents
                </ButtonLink>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-6 lg:gap-4">
              {content.features.map((feature) => (
                <article
                  key={feature.name}
                  className="group flex items-start gap-4 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:border-[var(--color-border-soft)] hover:bg-[color:rgb(255_255_255_/_0.55)] lg:p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-sm transition-all duration-300 group-hover:border-[color:rgb(113_178_159_/_0.30)] group-hover:shadow-[0_0_15px_rgba(113,178,159,0.15)] lg:h-14 lg:w-14">
                    <feature.icon
                      size={24}
                      className="text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:text-[var(--color-brand-alt)]"
                    />
                  </div>

                  <div>
                    <h4 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)] lg:text-xl">
                      {feature.name}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[color:rgb(41_59_51_/_0.82)]">
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </SectionContainer>
    </section>
  );
};

export default SyntheticDollarSection;
