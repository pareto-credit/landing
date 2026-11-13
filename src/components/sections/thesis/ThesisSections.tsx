import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import { thesisChapters, thesisStats, type ThesisChapterId, type ThesisStat } from "../../../data/thesis";
import { GENERAL_CONTACT_INTEREST, INVESTOR_CONTACT_INTEREST } from "../../../data/brand";
import { PageLink } from "../../ui/PageLink";
import ContactSection from "../ContactSection";
import { ThesisAnatomy } from "./ThesisAnatomy";
import ThesisProblemStory from "./ThesisProblemStory";
import ThesisReasons from "./ThesisReasons";
import ThesisGapChart from "./ThesisGapChart";
import "./thesis-sections.css";
import "./thesis-chapters.css";

interface ChapterProps {
  id: ThesisChapterId;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}

const Chapter = ({ id, title, description, children }: ChapterProps) => {
  const chapter = thesisChapters.find((item) => item.id === id);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`thesis-chapter thesis-chapter--${id} thesis-chapter--light`}>
      <SectionContainer className="ui-section-shell">
        <SectionHeader
          eyebrow={chapter?.label}
          title={title}
          description={description}
          titleId={`${id}-title`}
          titleTabIndex={-1}
        />
        {children}
      </SectionContainer>
    </section>
  );
};

const SourceLink = ({ stat }: { stat: ThesisStat }) => (
  <a href={stat.url} target="_blank" rel="noopener noreferrer" className="thesis-source">
    {stat.source}<ArrowUpRight size={12} aria-hidden="true" />
  </a>
);

const [privateCredit, , tokenizedCredit] = thesisStats;
const privateCreditEstimate = privateCredit.value.replace(/^\+/, "more than ");
const tokenizedShare = tokenizedCredit.amountBillions / privateCredit.amountBillions;
const tokenizedShareCeiling = Math.ceil(tokenizedShare * 100);
const thesisInterestOptions = [GENERAL_CONTACT_INTEREST, INVESTOR_CONTACT_INTEREST] as const;

const OpportunityBar = ({ share, index }: { share: number; index: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5, margin: "0px 0px -32px 0px" });

  return (
    <div ref={ref} className="thesis-scale__track" data-revealed={isInView || undefined} aria-hidden="true">
      <span style={{ "--thesis-share": `${share}%`, "--thesis-delay": `${index * 120}ms` } as CSSProperties} />
    </div>
  );
};

/** Bars drawn to scale against the largest estimate. */
const OpportunityScale = () => {
  const largest = Math.max(...thesisStats.map((stat) => stat.amountBillions));

  return (
    <div className="thesis-scale">
      <ol className="thesis-scale__bars">
        {thesisStats.map((stat, index) => (
          <li key={stat.value} className="thesis-scale__row">
            <div className="thesis-scale__head">
              <span className="thesis-kicker">{stat.kicker}</span>
              <span className="thesis-scale__value">{stat.value}</span>
            </div>
            <OpportunityBar share={Math.max((stat.amountBillions / largest) * 100, 0.8)} index={index} />
            <div className="thesis-scale__caption">
              <p>{stat.label}</p>
              <SourceLink stat={stat} />
            </div>
          </li>
        ))}
      </ol>
      <aside className="thesis-scale__gap" aria-label="The gap">
        <span className="thesis-kicker">The gap</span>
        <div className="thesis-scale__gap-figure">
          <ThesisGapChart privateCredit={privateCredit} tokenizedCredit={tokenizedCredit} tokenizedShare={tokenizedShare} />
          <strong>&lt;{tokenizedShareCeiling}%</strong>
        </div>
        <p>
          Estimated tokenized credit of {tokenizedCredit.value}, compared with {privateCreditEstimate}
          {" "}in private credit assets under management.
        </p>
      </aside>
    </div>
  );
};

const ThesisSections = () => (
  <>
    <Chapter
      id="structured-credit"
      title={<>The business <span className="text-[var(--color-text-muted)]">comes first</span></>}
      description="Pareto’s modular smart contract architecture lets each facility have its own legal agreements, underwriting and credit terms, with shared infrastructure for servicing and distribution."
    >
      <ThesisAnatomy />
    </Chapter>

    <section
      id="constraints"
      aria-labelledby="constraints-title"
      className="thesis-chapter thesis-chapter--constraints thesis-chapter--dark"
    >
      <h2 id="constraints-title" tabIndex={-1} className="sr-only">The constraints</h2>
      <ThesisProblemStory />
    </section>

    <Chapter
      id="opportunity"
      title={
        <>
          A market of {privateCreditEstimate}.<br />
          <span className="text-[var(--color-text-muted)]">Under {tokenizedShareCeiling}% in tokenized credit</span>
        </>
      }
      description="Private credit is an established market. Stablecoins offer a new source of capital for it, and tokenized credit shows how early that connection still is."
    >
      <OpportunityScale />
    </Chapter>

    <Chapter
      id="why-pareto"
      title={<>Why credit teams <span className="text-[var(--color-text-muted)]">build on Pareto</span></>}
      description="The infrastructure used for one facility can be reused for the next, even when the assets, counterparties and terms change."
    >
      <ThesisReasons />
    </Chapter>

    <ContactSection
      className="thesis-chapter thesis-chapter--light"
      eyebrow=""
      title={<>Get in <span className="text-[var(--color-text-muted)]">touch</span></>}
      description={
        <>
          Have a question about Pareto? Send us a message or{" "}
          <PageLink to="/data" className="underline underline-offset-4">explore platform data</PageLink>.
        </>
      }
      defaultInterest={GENERAL_CONTACT_INTEREST}
      interestOptions={thesisInterestOptions}
      submitLabel="Send enquiry"
    />
  </>
);

export default ThesisSections;
