import { motion, useReducedMotion } from "framer-motion";
import { Activity, Building2, Network, type LucideIcon } from "lucide-react";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface EcosystemSegment {
  title: string;
  icon: LucideIcon;
  desc: string;
  services: string[];
}

const ecosystemSegments: EcosystemSegment[] = [
  {
    title: "Prime Brokers & Funds",
    icon: Building2,
    desc: "Secure, isolated environments for large-scale capital deployment and origination.",
    services: [
      "Smart Contract Escrow",
      "KYC/AML Enclaves",
      "Portfolio Reporting",
      "Risk Isolation Models",
    ],
  },
  {
    title: "Market Makers & Trading",
    icon: Activity,
    desc: "High-velocity infrastructure designed for programmatic execution and liquidity.",
    services: [
      "Onchain Settlement",
      "Real-time Margin",
      "Automated Liquidations",
      "WebSocket APIs",
    ],
  },
  {
    title: "Fintechs & Platforms",
    icon: Network,
    desc: "Modular building blocks to launch proprietary, branded credit products.",
    services: [
      "White-label UX",
      "Modular Credit Vaults",
      "Compliance Orchestration",
      "Fiat On/Off Ramps",
    ],
  },
];

interface SegmentVisualProps {
  index: number;
  shouldReduceMotion: boolean;
}

const SegmentVisual = ({ index, shouldReduceMotion }: SegmentVisualProps) => {
  if (index === 0) {
    return (
      <div className="flex h-10 items-end gap-1.5">
        {[1, 2, 3, 4, 5].map((barIndex) => (
          <motion.div
            key={`ecosystem-bars-${barIndex}`}
            animate={
              shouldReduceMotion
                ? undefined
                : { height: ["30%", "100%", "30%"] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: barIndex * 0.15,
                  }
            }
            className="w-1.5 rounded-full bg-gradient-to-t from-[color:rgb(113_178_159_/_0.20)] to-[color:rgb(113_178_159_/_0.72)]"
          />
        ))}
      </div>
    );
  }

  if (index === 1) {
    return (
      <motion.div
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }
        }
        className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-dashed border-[color:rgb(113_178_159_/_0.40)]"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="h-6 w-6 rounded-full bg-[color:rgb(113_178_159_/_0.25)]"
        />
      </motion.div>
    );
  }

  return (
    <div className="flex w-full items-center px-8">
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [0, 15, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="z-10 h-2.5 w-2.5 rounded-full bg-[color:rgb(113_178_159_/_0.70)] shadow-[0_0_8px_rgba(113,178,159,0.5)]"
      />
      <div className="h-[1.5px] flex-1 bg-[color:rgb(113_178_159_/_0.20)]" />
      <motion.div
        animate={shouldReduceMotion ? undefined : { x: [0, -15, 0] }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }
        }
        className="z-10 h-2.5 w-2.5 rounded-full border-2 border-[color:rgb(113_178_159_/_0.70)] bg-[var(--color-surface)]"
      />
    </div>
  );
};

const ClientsServicesSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-20 overflow-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-surface)] py-24 text-[var(--color-text-primary)]">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[color:rgb(113_178_159_/_0.08)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[color:rgb(59_130_246_/_0.08)] blur-[100px]" />

      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Engineered for institutional scale"
          description="Tailored infrastructure and dedicated services powering the next generation of capital allocators, trading desks, and digital venues."
          className="mx-auto mb-24 text-center"
          size="4xl"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {ecosystemSegments.map((segment, idx) => (
            <motion.article
              key={segment.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
              }}
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,24,19,0.06)] md:p-10"
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] transition-all duration-500 group-hover:border-[color:rgb(113_178_159_/_0.20)] group-hover:bg-[color:rgb(113_178_159_/_0.10)]">
                  <segment.icon
                    className="text-[var(--color-text-secondary)] transition-colors group-hover:text-[var(--color-brand-alt)]"
                    size={24}
                  />
                </div>
                <h3 className="text-xl font-bold leading-tight tracking-tight text-[var(--color-text-primary)]">
                  {segment.title}
                </h3>
              </div>

              <p className="mb-8 min-h-[60px] text-sm leading-relaxed text-[color:rgb(41_59_51_/_0.90)]">
                {segment.desc}
              </p>

              <div className="relative mb-8 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-inner">
                <SegmentVisual
                  index={idx}
                  shouldReduceMotion={Boolean(shouldReduceMotion)}
                />
              </div>

              <div className="mt-auto">
                <div className="mb-4 border-b border-[var(--color-border-soft)] pb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Core Capabilities
                </div>
                <ul className="space-y-3">
                  {segment.services.map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-[2px] border border-[color:rgb(113_178_159_/_0.50)] bg-[var(--color-surface)] transition-all duration-300 group-hover:bg-[var(--color-brand-alt)] group-hover:border-[var(--color-brand-alt)]" />
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default ClientsServicesSection;
