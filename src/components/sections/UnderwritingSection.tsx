import { motion, useReducedMotion } from "framer-motion";
import diligenceImage from "../../assets/images/underwriting/diligence.jpg";
import monitoringImage from "../../assets/images/underwriting/monitoring.jpg";
import structureImage from "../../assets/images/underwriting/structure.jpg";
import { SectionContainer, SectionHeader } from "../ui/Section";

interface Pillar {
  title: string;
  /** One-line summary revealed on hover; always shown on touch screens. */
  description: string;
  image: string;
  imageClassName: string;
  tags: Array<[label: string, value: string]>;
}

const pillars: Pillar[] = [
  {
    title: "Onchain collateral",
    description:
      "Structure credit against crypto and tokenized assets. Configure LTV thresholds, margin calls, collateral top-ups and grace periods around the facility’s terms.",
    image: diligenceImage,
    imageClassName: "object-[40%_30%]",
    tags: [
      ["Assets", "Crypto & tokenized assets"],
      ["Controls", "LTV · margin calls · top-ups"],
    ],
  },
  {
    title: "Custodian-held collateral",
    description:
      "Keep collateral with qualified custodians, in off-exchange custody or bank accounts. Facility agreements connect those offchain arrangements to the onchain Credit Vault, with agreed account controls, monitoring and reporting.",
    image: structureImage,
    imageClassName: "object-center",
    tags: [
      ["Custody", "Custodians · banks · off-exchange"],
      ["Legal", "Linked through facility agreements"],
    ],
  },
  {
    title: "Receivables & loan portfolios",
    description:
      "Finance commercial receivables, invoices and loan portfolios. Set eligible assets, advance rates and borrowing-base requirements, with pool reporting to support asset-backed and warehouse financing.",
    image: monitoringImage,
    imageClassName: "object-[60%_40%]",
    tags: [
      ["Assets", "Receivables · invoices · loans"],
      ["Controls", "Eligibility · borrowing base"],
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
      <div className="pointer-events-none absolute -right-32 top-48 h-[520px] w-[520px] rounded-full bg-[var(--color-glow-brand)] blur-[120px]" />

      <SectionContainer className="ui-section-shell relative z-10">
        <SectionHeader
          eyebrow="Institutional grade"
          title={<>Credit infrastructure <span className="text-[var(--color-text-muted)]">across the collateral spectrum.</span></>}
          description="From onchain assets to collateral held with qualified custodians and banks, receivables and loan portfolios. Configure the credit facility around the assets behind it."
        />

        <div
          data-testid="underwriting-pillars"
          className="marquee-scroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        >
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              tabIndex={0}
              aria-label={pillar.title}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group ui-radius-card relative min-h-[27rem] w-[84%] max-w-[24rem] shrink-0 snap-center overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-bg-dark)] shadow-[var(--shadow-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand)] md:aspect-[3/4] md:w-auto md:max-w-none"
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
              <div className="absolute inset-0 bg-[#081912]/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100" />

              <div className="relative flex h-full flex-col justify-end p-6 lg:p-7">

                <div>
                  <h3 className="text-[1.65rem] font-semibold leading-tight tracking-tight text-[var(--color-text-inverse)] lg:text-[1.85rem]">
                    {pillar.title}
                  </h3>
                  <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <p className="overflow-hidden text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.82)]">
                      <span className="block pt-2">{pillar.description}</span>
                    </p>
                  </div>
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
