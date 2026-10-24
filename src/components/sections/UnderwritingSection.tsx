import { motion, useReducedMotion } from "framer-motion";
import diligenceImage from "../../assets/images/underwriting/diligence.jpg";
import monitoringImage from "../../assets/images/underwriting/monitoring.jpg";
import structureImage from "../../assets/images/underwriting/structure.jpg";
import { SectionContainer, SectionHeader } from "../ui/Section";

interface Pillar {
  title: string;
  description: string;
  image: string;
  imageClassName: string;
  tags: Array<[label: string, value: string]>;
}

const pillars: Pillar[] = [
  {
    title: "Institutional diligence.",
    description:
      "Every borrower and lender is KYC/KYB-verified, and every facility is underwritten before launch: the same standards institutions apply today.",
    image: diligenceImage,
    imageClassName: "object-[40%_30%]",
    tags: [
      ["KYC/KYB", "Every counterparty"],
      ["Credit", "Underwritten, signed off"],
    ],
  },
  {
    title: "Isolated facilities.",
    description:
      "Each loan has its own vault, lenders and accounting. Nothing is pooled, so one borrower's problems can't spread to another facility.",
    image: structureImage,
    imageClassName: "object-center",
    tags: [
      ["Structure", "One vault per facility"],
      ["Exposure", "No shared pool"],
    ],
  },
  {
    title: "Automated oversight.",
    description:
      "Draws, repayments and collateral checks run onchain as they happen, with live, machine-readable data instead of monthly reconciliation.",
    image: monitoringImage,
    imageClassName: "object-[60%_40%]",
    tags: [
      ["Servicing", "Automated, onchain"],
      ["Data", "Live, machine-readable"],
    ],
  },
];

const UnderwritingSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="underwriting"
      className="relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-[var(--color-glow-brand)] blur-[120px]" />

      <SectionContainer className="ui-section-shell relative z-10">
        <SectionHeader
          eyebrow="Underwriting infrastructure"
          title={<>Credit infrastructure <span className="text-[var(--color-text-muted)]">you can verify.</span></>}
          description="Pareto provides credit underwriting infrastructure for compliant onchain finance: the diligence, legal structure and oversight lenders expect, enforced by code and visible onchain."
        />

        <div
          data-testid="underwriting-pillars"
          className="marquee-scroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group ui-radius-card relative h-[27rem] w-[84%] max-w-[24rem] shrink-0 snap-center overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-bg-dark)] shadow-[var(--shadow-soft)] md:aspect-[3/4] md:h-auto md:w-auto md:max-w-none"
            >
              <img
                src={pillar.image}
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover saturate-[0.85] transition-transform duration-700 ease-out ${
                  shouldReduceMotion ? "" : "group-hover:scale-105"
                } ${pillar.imageClassName}`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_25_18_/_0.05)_0%,rgb(8_25_18_/_0.2)_50%,rgb(8_25_18_/_0.92)_100%)]" />

              <div className="relative flex h-full flex-col justify-end p-6 lg:p-7">

                <div>
                  <h3 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-[var(--color-text-inverse)] lg:text-[1.85rem]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.78)]">
                    {pillar.description}
                  </p>
                  <dl className="mt-5 flex flex-col gap-2 border-t border-[color:rgb(255_255_255_/_0.14)] pt-4">
                    {pillar.tags.map(([label, value]) => (
                      <div key={label} className="flex items-baseline gap-2">
                        <dt className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:rgb(255_255_255_/_0.55)]">
                          {label}
                        </dt>
                        <dd className="text-xs text-[var(--color-text-inverse)]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default UnderwritingSection;
