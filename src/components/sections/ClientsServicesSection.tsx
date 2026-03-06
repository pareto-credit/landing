import { motion, useReducedMotion } from "framer-motion";
import { Activity, Building2, Network, type LucideIcon } from "lucide-react";
import brokersImage from "../../assets/images/ecosystem/brokers-card.jpg";
import fintechImage from "../../assets/images/ecosystem/fintech-card.jpg";
import marketMakersImage from "../../assets/images/ecosystem/market-makers-card.jpg";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface EcosystemSegment {
  title: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  imageClassName: string;
  desc: string;
  services: string[];
}

const ecosystemSegments: EcosystemSegment[] = [
  {
    title: "Prime Brokers<br />& Funds",
    icon: Building2,
    image: brokersImage,
    imageAlt: "Skyscrapers viewed from below through heavy fog.",
    imageClassName: "object-center brightness-[0.8] saturate-[0.82]",
    desc: "Secure, isolated environments for large-scale capital deployment and origination.",
    services: [
      "Smart Contract Escrow",
      "KYC/AML Enclaves",
      "Portfolio Reporting",
      "Risk Isolation Models",
    ],
  },
  {
    title: "Market Makers<br />& Trading",
    icon: Activity,
    image: marketMakersImage,
    imageAlt: "Glass trading tower rising into a foggy sky.",
    imageClassName: "object-[60%_22%] brightness-[0.8] saturate-[0.82]",
    desc: "High-velocity infrastructure designed for programmatic execution and liquidity.",
    services: [
      "Onchain Settlement",
      "Real-time Margin",
      "Automated Liquidations",
      "WebSocket APIs",
    ],
  },
  {
    title: "Fintechs<br />& Platforms",
    icon: Network,
    image: fintechImage,
    imageAlt: "Lit office tower at night seen from above street level.",
    imageClassName: "object-[52%_40%] brightness-[1.05] saturate-[0.94]",
    desc: "Modular building blocks to launch proprietary, branded credit products.",
    services: [
      "White-label UX",
      "Modular Credit Vaults",
      "Compliance Orchestration",
      "Fiat On/Off Ramps",
    ],
  },
];

const ClientsServicesSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const mediaMotionClass = shouldReduceMotion
    ? ""
    : "transition-transform duration-700 ease-out group-hover:scale-105";

  return (
    <section className="relative z-20 overflow-hidden bg-[var(--color-bg-light-alt)] py-24 text-[var(--color-text-primary)]">
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[var(--color-glow-brand)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--color-glow-blue)] blur-[100px]" />

      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Engineered for institutional scale."
          description="Tailored infrastructure and dedicated services powering the next generation of capital allocators, trading desks, and digital venues."
          className="mx-auto mb-20 text-center"
          size="3xl"
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
              className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,24,19,0.06)]"
            >
              <div className="relative h-64 w-full overflow-hidden bg-[var(--color-bg-dark)]">
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgb(255_255_255_/_0.24)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.24)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[color:rgb(112_177_158_/_0.18)] blur-3xl" />
                <div className="absolute -bottom-14 left-[-8%] h-36 w-36 rounded-full bg-[color:rgb(59_130_246_/_0.16)] blur-3xl" />
                <img
                  src={segment.image}
                  alt={segment.imageAlt}
                  fetchPriority="low"
                  decoding="async"
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${segment.imageClassName} ${mediaMotionClass}`}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[color:rgb(8_25_18_/_0.96)] via-[color:rgb(8_25_18_/_0.34)] to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 z-20 md:bottom-8 md:left-8 md:right-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-overlay-inverse-30)] bg-[color:rgb(255_255_255_/_0.20)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors duration-500 group-hover:bg-[color:rgb(255_255_255_/_0.28)]">
                    <segment.icon
                      className="text-[var(--color-text-inverse)] drop-shadow-md"
                      size={26}
                    />
                  </div>
                  <div className="mt-4 flex min-h-[3.9rem] items-end">
                    <h3
                      className="text-balance text-[1.72rem] font-bold leading-[1.05] tracking-tight text-[var(--color-text-inverse)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] md:text-[1.8rem]"
                      dangerouslySetInnerHTML={{ __html: segment.title }}
                    ></h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col bg-[var(--color-bg-light-alt)] p-8">
                <p className="mb-8 min-h-[72px] text-sm leading-relaxed text-[color:rgb(41_59_51_/_0.90)]">
                  {segment.desc}
                </p>

                <div className="mt-auto">
                  <div className="mb-4 border-b border-[var(--color-border-soft)] pb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                    Core Capabilities
                  </div>
                  <ul className="space-y-3">
                    {segment.services.map((service) => (
                      <li key={service} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-[2px] border border-[color:rgb(113_178_159_/_0.50)] bg-[var(--color-surface)] transition-all duration-300 group-hover:border-[var(--color-brand-alt)] group-hover:bg-[var(--color-brand-alt)]" />
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default ClientsServicesSection;
