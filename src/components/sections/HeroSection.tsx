import { motion } from "framer-motion";
import Earth3D from "../three/Earth3D";
import { Button } from "../ui/Button";
import { SectionContainer } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";
import { AirportBoardNumber } from "../ui/AirportBoardNumber";
import type { VanityMetrics } from "../../types/products";

interface HeroSectionProps {
  metrics: VanityMetrics;
  isMetricsLoading: boolean;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const HeroSection = ({ metrics, isMetricsLoading }: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)] md:min-h-screen"
    >
      <Earth3D />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[color:rgb(114_244_201_/_0.10)] blur-[132px]" />

      <SectionContainer
        data-testid="hero-content-shell"
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center pb-44 pt-24 text-center sm:pb-48 sm:pt-28 md:min-h-screen md:pb-20 lg:pb-36 lg:pt-32"
      >
        <div className="flex w-full max-w-3xl flex-col items-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="ui-frost-chip mb-8 inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] shadow-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-brand)] shadow-[0_0_8px_var(--color-brand)]" />
            Onchain credit solutions
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="hero-title"
            className="mb-4 text-[clamp(2.35rem,11vw,4.2rem)] font-semibold leading-[0.98] tracking-tight sm:mb-7 sm:text-[clamp(3.4rem,12vw,5rem)] sm:leading-[1.03] lg:text-7xl"
          >
            It&apos;s time to upgrade <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[var(--color-text-primary)] to-[var(--color-brand)] bg-clip-text text-transparent">
              the credit operating <br className="hidden sm:block" />
              system
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="ui-copy-muted mx-auto mb-5 max-w-[20rem] text-[0.9rem] font-medium leading-relaxed sm:mb-8 sm:max-w-2xl sm:text-lg md:text-xl"
            style={{ textShadow: "0 2px 10px rgba(232, 235, 230, 0.8)" }}
          >
            Transparent credit infrastructure. Enterprise-grade compliance.
            <br />
            Built for the way capital flows today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            data-testid="hero-cta-group"
            className="flex w-full max-w-sm flex-col items-stretch justify-center gap-2.5 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full px-6 py-3 text-sm font-semibold sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              onClick={() => scrollToSection("contact")}
            >
              Build a Credit Line
            </Button>
            <Button
              variant="white"
              size="lg"
              className="w-full px-6 py-3 text-sm sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              onClick={() => scrollToSection("products")}
            >
              Explore Vaults
            </Button>
          </motion.div>
        </div>
      </SectionContainer>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        data-testid="hero-metrics"
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-5 px-6 pb-6 pt-4 sm:gap-8 sm:pb-8 sm:pt-8 lg:pb-10">
          <div>
            <div className="ui-copy-muted mb-1 font-mono text-xs uppercase tracking-widest">
              Active Loans
            </div>
            <AirportBoardNumber
              value={CURRENCY_FORMATTER.format(metrics.outstandingLoans)}
              isLoading={isMetricsLoading}
              className="font-mono text-[1.7rem] tracking-tight text-[var(--color-text-primary)] sm:text-3xl"
            />
          </div>
          <div className="hidden h-12 w-px bg-[var(--color-border-soft)] md:block" />
          <div>
            <div className="ui-copy-muted mb-1 font-mono text-xs uppercase tracking-widest">
              Credit serviced
            </div>
            <AirportBoardNumber
              value={CURRENCY_FORMATTER.format(metrics.creditExtended)}
              isLoading={isMetricsLoading}
              className="font-mono text-[1.7rem] tracking-tight text-[var(--color-brand)] sm:text-3xl"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
