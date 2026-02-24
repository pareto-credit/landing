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
      className="relative min-h-screen overflow-hidden border-b border-[#0E1813]/10 bg-[#E8EBE6] text-[#0E1813]"
    >
      <Earth3D />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#72F4C9]/10 blur-[120px]" />

      <SectionContainer className="relative z-10 flex min-h-screen flex-col items-center justify-center pb-32 pt-28 text-center lg:pb-36 lg:pt-32">
        <div className="flex max-w-3xl flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/[0.08] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#71B29F] shadow-[0_8px_24px_rgba(255,255,255,0.16),inset_0_1px_0_rgba(255,255,255,0.5)] backdrop-blur-md shadow-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#71B29F] shadow-[0_0_8px_#71B29F]" />
            Tokenized fixed income solutions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 text-5xl font-semibold leading-[1.05] tracking-tight lg:text-7xl"
          >
            It&apos;s time to update the <br />
            <span className="bg-gradient-to-r from-[#0E1813] to-[#71B29F] bg-clip-text text-transparent">
              credit operating system.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-[#293B33] md:text-xl"
            style={{ textShadow: "0 2px 10px rgba(232, 235, 230, 0.8)" }}
          >
            Programmable institutional credit. Enterprise-grade compliance.
            <br />
            Built for the way capital flows today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              className="font-semibold"
              onClick={() => scrollToSection("contact")}
            >
              Build a Credit Line
            </Button>
            <Button
              variant="secondary"
              size="lg"
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
        className="absolute inset-x-0 bottom-0 z-10"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-8 border-t border-[#0E1813]/10 pb-8 pt-8 lg:pb-10">
          <div>
            <div className="mb-1 font-mono text-xs uppercase tracking-widest text-[#293B33]">
              Outstanding Loans
            </div>
            <AirportBoardNumber
              value={CURRENCY_FORMATTER.format(metrics.outstandingLoans)}
              isLoading={isMetricsLoading}
              className="font-mono text-3xl tracking-tight text-[#0E1813]"
            />
          </div>
          <div className="hidden h-12 w-px bg-[#0E1813]/10 md:block" />
          <div>
            <div className="mb-1 font-mono text-xs uppercase tracking-widest text-[#293B33]">
              Credit Extended
            </div>
            <AirportBoardNumber
              value={CURRENCY_FORMATTER.format(metrics.creditExtended)}
              isLoading={isMetricsLoading}
              className="font-mono text-3xl tracking-tight text-[#71B29F]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
