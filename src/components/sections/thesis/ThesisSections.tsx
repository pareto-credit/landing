import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import { ButtonLink } from "../../ui/Button";
import { PageLink } from "../../ui/PageLink";
import { PARETO_DOCS_URL } from "../../../data/brand";
import { thesisChapters, thesisStats, type ThesisStat } from "../../../data/thesis";
import { setPendingContactInterest } from "../../../lib/siteNavigation";
import { ThesisAnatomy } from "./ThesisAnatomy";
import ThesisProblemStory from "./ThesisProblemStory";
import ThesisReasons from "./ThesisReasons";
import "./thesis-sections.css";
import "./thesis-chapters.css";

interface ChapterProps {
  id: (typeof thesisChapters)[number]["id"];
  title: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  children: ReactNode;
}

const Chapter = ({ id, title, description, tone = "light", children }: ChapterProps) => {
  const index = thesisChapters.findIndex((chapter) => chapter.id === id);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`thesis-chapter thesis-chapter--${id} thesis-chapter--${tone}`}>
      <SectionContainer className="ui-section-shell">
        <SectionHeader
          eyebrow={`${String(index + 1).padStart(2, "0")} / ${thesisChapters[index].label}`}
          title={title}
          description={description}
          titleId={`${id}-title`}
          titleTabIndex={-1}
          tone={tone}
        />
        {children}
      </SectionContainer>
    </section>
  );
};

const SourceLink = ({ stat }: { stat: ThesisStat }) => (
  <a href={stat.url} target="_blank" rel="noopener noreferrer" className="thesis-source">
    {stat.source}<ArrowUpRight size={8} aria-hidden="true" />
  </a>
);

/** Bars drawn to true scale against the largest market, so the gap is visible. */
const OpportunityScale = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const largest = Math.max(...thesisStats.map((stat) => stat.amountBillions));
  const [privateCredit, , tokenizedCredit] = thesisStats;
  const tokenizedShare = (tokenizedCredit.amountBillions / privateCredit.amountBillions) * 100;

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
        <strong>&lt;{Math.ceil(tokenizedShare)}%</strong>
        <p>
          of private credit is tokenized today: {tokenizedCredit.value} against {privateCredit.value.replace(">", "more than ")}.
          The onchain dollars are already here. The credit needs rails lenders can trust.
        </p>
      </aside>
    </div>
  );
};

const ThesisSections = () => (
  <>
    <Chapter
      id="structured-credit"
      title="The business comes first."
    >
      <p className="thesis-writeup">
        Pareto brings applications, eligibility, underwriting, credit terms,
        servicing and distribution into one connected facility. Each layer is
        shaped around the business, the participants and the relevant agreements.
      </p>
      <ThesisAnatomy />
      <div className="thesis-section-action">
        <PageLink to="/" hash="structures" className="thesis-text-link">See the credit facilities we support<ArrowUpRight size={16} aria-hidden="true" /></PageLink>
      </div>
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
      title={<>A market of more than $2T.<br /><span className="thesis-heading-secondary">Less than 2% of it onchain.</span></>}
      description="Private credit has the yield. Stablecoins hold the onchain dollars looking for it. Tokenized credit, the bridge between the two, is still small."
    >
      <OpportunityScale />
    </Chapter>

    <Chapter
      id="why-pareto"
      title="A better foundation for credit."
      description="Keep the structure credit teams know. Connect the work around it."
    >
      <ThesisReasons />
    </Chapter>

    <section className="thesis-closing" aria-labelledby="thesis-closing-title">
      <SectionContainer className="ui-section-shell">
        <SectionHeader eyebrow="Pareto today" title={<>Put the thesis <span className="thesis-heading-secondary">to work.</span></>} titleId="thesis-closing-title" variant="centered" tone="dark" description="Structure, launch and operate credit facilities with Pareto Studio." />
        <div className="thesis-closing__actions">
          <PageLink to="/" hash="contact" onClick={() => setPendingContactInterest("Pareto Studio (Core)")} className="thesis-closing__primary">Request Studio access<ArrowUpRight size={16} aria-hidden="true" /></PageLink>
          <ButtonLink href={PARETO_DOCS_URL} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">Read the docs<ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
        </div>
        <p className="thesis-closing__disclaimer">This page is for information only and is not an offer or solicitation to lend, borrow or invest. Market figures are third-party estimates as of the dates shown.</p>
      </SectionContainer>
    </section>
  </>
);

export default ThesisSections;
