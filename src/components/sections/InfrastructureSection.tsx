import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Building2,
  CheckCircle2,
  Code,
  Layers,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface InfraFeature {
  name: string;
  icon: LucideIcon;
  desc: string;
}

const infraFeatures1: InfraFeature[] = [
  {
    name: "Onchain settlement and enforcement",
    icon: Zap,
    desc: "Automate the entire lifecycle of credit agreements directly onchain, eliminating delays and reducing counterparty settlement risk.",
  },
  {
    name: "Real-time data and risk management",
    icon: Activity,
    desc: "Monitor collateral health, interest accrual, and margin requirements block-by-block with transparent, immutable ledger data.",
  },
  {
    name: "Enterprise-grade compliance",
    icon: ShieldCheck,
    desc: "Integrate existing KYC/AML frameworks natively into the smart contract level, ensuring full regulatory adherence before any capital moves.",
  },
];

const infraFeatures2: InfraFeature[] = [
  {
    name: "Onchain native, API-based, AI-enhanced",
    icon: Code,
    desc: "Interact programmatically via robust REST and WebSocket APIs. Leverage structured onchain data for AI-driven portfolio analysis.",
  },
  {
    name: "Horizontally scalable infrastructure",
    icon: Layers,
    desc: "Built to handle institutional volume. Deploy hundreds of isolated credit facilities without degraded performance or network congestion.",
  },
  {
    name: "Cost-effective facility setup",
    icon: Building2,
    desc: "Bypass legacy legal structuring costs and intermediary fees. Spin up secure, programmable vaults at a fraction of traditional costs.",
  },
];

interface InfrastructureFeatureListProps {
  features: InfraFeature[];
  activeIndex: number;
  onChange: (index: number) => void;
}

const InfrastructureFeatureList = ({
  features,
  activeIndex,
  onChange,
}: InfrastructureFeatureListProps) => (
  <ul className="space-y-3">
    {features.map((feature, index) => (
      <li key={feature.name}>
        <button
          type="button"
          onMouseEnter={() => onChange(index)}
          onFocus={() => onChange(index)}
          onClick={() => onChange(index)}
          className={`ui-radius-panel flex w-full items-center gap-4 border p-5 text-left transition-all duration-300 ${
            activeIndex === index
              ? "border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-[0_15px_40px_rgba(14,24,19,0.06)]"
              : "border-transparent hover:bg-[var(--color-overlay-surface-50)]"
          }`}
        >
          <feature.icon
            size={24}
            className={activeIndex === index ? "text-[var(--color-brand)]" : "text-[var(--color-text-muted-soft)]"}
          />
          <span
            className={`text-lg font-semibold ${
              activeIndex === index ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
            }`}
          >
            {feature.name}
          </span>
        </button>
      </li>
    ))}
  </ul>
);

const InfrastructureVisualOne = ({ activeIndex }: { activeIndex: number }) => (
  <div className="flex flex-1 items-center justify-center px-8 pt-8">
    {activeIndex === 0 ? (
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="ui-radius-panel flex h-20 w-20 items-center justify-center border border-[var(--color-overlay-inverse-20)] bg-[var(--color-brand)] shadow-xl"
        >
          <Zap className="text-[var(--color-text-inverse)]" size={32} />
        </motion.div>
        <div className="relative h-1.5 w-12 overflow-hidden rounded-full bg-[var(--color-border-soft)]">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-full w-full bg-[color:rgb(113_178_159_/_0.50)]"
          />
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
          className="ui-radius-panel flex h-20 w-20 items-center justify-center bg-[var(--color-text-primary)] shadow-xl"
        >
          <CheckCircle2 className="text-[var(--color-brand)]" size={32} />
        </motion.div>
      </div>
    ) : null}

    {activeIndex === 1 ? (
      <div className="flex h-40 items-end gap-4">
        {[40, 70, 50, 90, 60, 80].map((height, index) => (
          <motion.div
            key={`infra-one-bars-${index}`}
            animate={{
              height: [
                `${height}%`,
                `${height > 60 ? height - 20 : height + 20}%`,
                `${height}%`,
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
            className="w-8 rounded-t-lg border-t border-[var(--color-overlay-surface-50)] bg-gradient-to-t from-[var(--color-state-info-soft)] to-[color:rgb(113_178_159_/_0.80)] shadow-sm"
          />
        ))}
      </div>
    ) : null}

    {activeIndex === 2 ? (
      <div className="relative flex items-center justify-center">
        <ShieldCheck className="relative z-10 h-32 w-32 text-[var(--color-brand-deep)] drop-shadow-xl" />
        <motion.div
          animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute h-32 w-32 rounded-full border-2 border-[var(--color-brand)]"
        />
        <motion.div
          animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
          className="absolute h-32 w-32 rounded-full border border-[var(--color-brand)]"
        />
      </div>
    ) : null}
  </div>
);

const InfrastructureVisualTwo = ({ activeIndex }: { activeIndex: number }) => (
  <div className="flex flex-1 items-center justify-center px-8 pt-8">
    {activeIndex === 0 ? (
      <div className="ui-radius-panel w-72 border border-[color:rgb(113_178_159_/_0.20)] bg-[var(--color-text-primary)] p-8 font-mono text-[13px] text-[var(--color-brand)] shadow-2xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          {`{`}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pl-4"
        >
          "endpoint": <span className="text-[var(--color-state-info)]">"/v1/vault"</span>,
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pl-4"
        >
          "status": <span className="text-[var(--color-state-success)]">"active"</span>,
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="pl-4"
        >
          "ai_model": <span className="text-[var(--color-state-warning)]">"optimized"</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          {`}`}
        </motion.div>
      </div>
    ) : null}

    {activeIndex === 1 ? (
      <div className="relative flex h-48 w-full max-w-[200px] flex-col items-center justify-center">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={`infra-two-stacks-${index}`}
            animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.4,
              ease: "easeInOut",
            }}
            className="absolute h-24 w-48 -skew-x-12 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-overlay-surface-80)] shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md"
            style={{ top: `${index * 35}px`, zIndex: 3 - index }}
          />
        ))}
      </div>
    ) : null}

    {activeIndex === 2 ? (
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="h-48 w-48 rounded-full border-[16px] border-[var(--color-surface-soft)] border-r-[var(--color-brand)] border-t-[var(--color-brand)] drop-shadow-md"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold text-[var(--color-text-primary)]">-60%</span>
          <span className="mt-1 font-sans text-[10px] uppercase tracking-widest text-[var(--color-text-muted-soft)]">
            Setup Costs
          </span>
        </div>
      </div>
    ) : null}
  </div>
);

interface InfrastructureVisualCardProps {
  activeIndex: number;
  feature: InfraFeature;
  cardKey: string;
  children: React.ReactNode;
}

const InfrastructureVisualCard = ({
  activeIndex,
  feature,
  cardKey,
  children,
}: InfrastructureVisualCardProps) => (
  <div className="ui-radius-card relative flex h-[450px] items-center justify-center overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-xl md:h-[550px]">
    <AnimatePresence mode="popLayout">
      <motion.div
        key={`${cardKey}-${activeIndex}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 flex flex-col"
      >
        {children}
        <div className="z-10 mt-auto bg-gradient-to-t from-[var(--color-surface)] via-[var(--color-overlay-surface-90)] to-transparent p-8 pt-12 text-center">
          <h4 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">{feature.name}</h4>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {feature.desc}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
);

const InfrastructureSection = () => {
  const [activeInfra1, setActiveInfra1] = useState(0);
  const [activeInfra2, setActiveInfra2] = useState(0);

  return (
    <section
      id="infrastructure"
      className="relative z-10 overflow-hidden border-y border-[var(--color-border-soft-muted)] bg-[var(--color-bg-light-alt)] py-32"
    >
      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Infrastructure"
          title="Onchain credit infrastructure for modern capital markets."
          size="4xl"
          className="mx-auto mb-24 text-center"
          eyebrowClassName="font-semibold text-[var(--color-text-secondary)]"
          titleClassName="font-sans leading-[1.05] text-[var(--color-text-primary)] md:text-5xl lg:text-[56px]"
        />

        <div className="space-y-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <h3 className="mb-8 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Built for Next-Gen Fixed-Income
              </h3>
              <InfrastructureFeatureList
                features={infraFeatures1}
                activeIndex={activeInfra1}
                onChange={setActiveInfra1}
              />
            </div>

            <div className="order-1 lg:order-2">
              <InfrastructureVisualCard
                activeIndex={activeInfra1}
                feature={infraFeatures1[activeInfra1]}
                cardKey="infra-1"
              >
                <InfrastructureVisualOne activeIndex={activeInfra1} />
              </InfrastructureVisualCard>
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <InfrastructureVisualCard
                activeIndex={activeInfra2}
                feature={infraFeatures2[activeInfra2]}
                cardKey="infra-2"
              >
                <InfrastructureVisualTwo activeIndex={activeInfra2} />
              </InfrastructureVisualCard>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="mb-8 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
                Designed for the future
              </h3>
              <InfrastructureFeatureList
                features={infraFeatures2}
                activeIndex={activeInfra2}
                onChange={setActiveInfra2}
              />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default InfrastructureSection;
