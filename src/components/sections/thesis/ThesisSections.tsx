import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import { thesisChapters, thesisStats, type ThesisChapterId, type ThesisStat } from "../../../data/thesis";
import ContactSection from "../ContactSection";
import { ThesisAnatomy } from "./ThesisAnatomy";
import ThesisProblemStory from "./ThesisProblemStory";
import ThesisReasons from "./ThesisReasons";
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
const privateCreditEstimate = privateCredit.value.replace(/^>/, "more than ");
const tokenizedShareCeiling = Math.ceil((tokenizedCredit.amountBillions / privateCredit.amountBillions) * 100);

/** Bars drawn to scale against the largest estimate. */
const OpportunityScale = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const largest = Math.max(...thesisStats.map((stat) => stat.amountBillions));

  return (
    <div ref={ref} className="thesis-scale" data-revealed={isInView || undefined}>
      <ol className="thesis-scale__bars">
        {thesisStats.map((stat, index) => (
          <li key={stat.value} className="thesis-scale__row">
            <div className="thesis-scale__head">
              <span className="thesis-kicker">{stat.kicker}</span>
              <span className="thesis-scale__value">{stat.value}</span>
            </div>
            <div className="thesis-scale__track" aria-hidden="true">
              <span
                style={{
                  "--thesis-share": `${Math.max((stat.amountBillions / largest) * 100, 0.8)}%`,
                  "--thesis-delay": `${index * 140}ms`,
                } as CSSProperties}
              />
            </div>
            <div className="thesis-scale__caption">
              <p>{stat.label}</p>
              <SourceLink stat={stat} />
            </div>
          </li>
        ))}
      </ol>
      <aside className="thesis-scale__gap" aria-label="The gap">
        <span className="thesis-kicker">The gap</span>
        <strong>&lt;{tokenizedShareCeiling}%</strong>
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
      description="Pareto brings applications, eligibility, underwriting, credit terms, servicing and distribution into one connected facility. Each layer is shaped around the business, the participants and the relevant agreements."
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
      description="Private credit has the yield. Stablecoins hold the onchain dollars looking for it. Tokenized credit, the bridge between the two, is still small."
    >
      <OpportunityScale />
    </Chapter>

    <Chapter
      id="why-pareto"
      title={<>A better foundation <span className="text-[var(--color-text-muted)]">for credit</span></>}
      description="Keep the structure credit teams know. Connect the work around it."
    >
      <ThesisReasons />
    </Chapter>

    <ContactSection
      defaultInterest="Borrowing"
      title={<>Let’s talk about <span className="text-[var(--color-text-muted)]">your credit facility</span></>}
      description="Tell us what you’re building. We’ll help you find the right setup."
      submitLabel="Send enquiry"
    />
  </>
);

export default ThesisSections;
