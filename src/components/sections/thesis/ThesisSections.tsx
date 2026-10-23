import { useRef, type CSSProperties, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import { ButtonLink } from "../../ui/Button";
import { PageLink } from "../../ui/PageLink";
import { MCP_PRODUCT_NAME, PARETO_DOCS_URL } from "../../../data/brand";
import { thesisChapters, thesisReasons, thesisRoadmap, thesisStats, type ThesisStat } from "../../../data/thesis";
import { setPendingContactInterest } from "../../../lib/siteNavigation";
import { ThesisAnatomy, ThesisMapping } from "./ThesisAnatomy";
import ThesisDiagram from "./ThesisDiagram";
import ThesisLifecycle from "./ThesisLifecycle";
import ThesisProblemStory from "./ThesisProblemStory";
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
    {stat.source}<ArrowUpRight size={13} aria-hidden="true" />
  </a>
);

const responsibilities = [
  { title: "Agents prepare", role: "Preparation", diagram: "records", copy: "Document review, tape reconciliation, borrowing-base and covenant calculations, lender reports." },
  { title: "Curators decide", role: "Human sign-off", diagram: "signature", copy: "Credit approval, terms, exceptions and enforcement stay with a named, accountable curator." },
  { title: "Code enforces", role: "Execution", diagram: "code", copy: "Signed decisions move capital onchain; nothing changes in a vault without a signature." },
] as const;

const compactCurrency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", minimumFractionDigits: 0, maximumFractionDigits: 1 });

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

const RoadmapTimeline = () => (
  <ol className="thesis-timeline">
    {thesisRoadmap.map((stage) => (
      <li key={stage.status} className={`thesis-timeline__stage thesis-timeline__stage--${stage.status}`}>
        <div className="thesis-timeline__marker">
          <span className="thesis-timeline__dot" aria-hidden="true" />
          <span className="thesis-kicker">{stage.statusLabel}</span>
        </div>
        <div className="thesis-timeline__items">
          {stage.items.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
          {stage.status === "early-access" ? (
            <PageLink
              to="/"
              hash="contact"
              onClick={() => setPendingContactInterest(`${MCP_PRODUCT_NAME} early access`)}
              className="thesis-text-link"
            >
              Join early access<ArrowUpRight size={16} aria-hidden="true" />
            </PageLink>
          ) : null}
        </div>
      </li>
    ))}
  </ol>
);

interface ThesisSectionsProps {
  creditServiced: number;
  activeLoans: number;
  isLoading: boolean;
}

const ThesisSections = ({ creditServiced, activeLoans, isLoading }: ThesisSectionsProps) => (
  <>
    <Chapter
      id="structured-credit"
      title={<>What we mean by structured credit.<br /><span className="thesis-heading-secondary">And how we build it onchain.</span></>}
      description="Structured credit is lending under a written structure: who borrows, against what, on which terms, and what happens if something goes wrong. Pareto keeps that structure and runs it onchain, one facility at a time."
    >
      <ThesisAnatomy />
      <ThesisMapping />
      <div className="thesis-section-action">
        <PageLink to="/" hash="structures" className="thesis-text-link">See the credit facilities we support<ArrowUpRight size={16} aria-hidden="true" /></PageLink>
      </div>
    </Chapter>

    <Chapter
      id="constraints"
      tone="dark"
      title={<>Trillions in credit.<br /><span className="thesis-heading-secondary">Still run on PDFs and phone calls.</span></>}
      description="Three problems keep private credit slow, opaque and hard to reach. They sit in the work between a credit decision and a funded facility."
    >
      <ThesisProblemStory />
    </Chapter>

    <Chapter
      id="opportunity"
      title={<>A market of more than $2T.<br /><span className="thesis-heading-secondary">Less than 2% of it onchain.</span></>}
      description="Private credit has the yield. Stablecoins hold the onchain dollars looking for it. Tokenized credit, the bridge between the two, is still small."
    >
      <OpportunityScale />
    </Chapter>

    <Chapter
      id="why-pareto"
      title={<>Familiar safeguards.<br /><span className="thesis-heading-secondary">Enforced by code.</span></>}
      description="Pareto doesn't reinvent credit. It keeps the structure credit committees already trust and removes the manual work around it."
    >
      <ol className="thesis-reasons">
        {thesisReasons.map((reason, index) => (
          <li key={reason.title}>
            <span className="thesis-kicker">{String(index + 1).padStart(2, "0")} · {reason.label}</span>
            <h3>{reason.title}</h3>
            <p>{reason.copy}</p>
          </li>
        ))}
      </ol>
      <div className="thesis-subsection">
        <h3 className="thesis-subheading">Five stages. <span className="thesis-heading-secondary">One connected platform.</span></h3>
        <p className="thesis-subsection__lead">From borrower diligence to distribution, each stage belongs to the same facility workflow. Select a stage to explore.</p>
        <ThesisLifecycle />
      </div>
    </Chapter>

    <section className="thesis-chapter thesis-chapter--dark thesis-accountability" aria-labelledby="accountability-title">
      <SectionContainer className="ui-section-shell">
        <SectionHeader
          variant="centered"
          tone="dark"
          eyebrow="Accountability"
          title={<>Agents prepare, curators decide.<br /><span className="thesis-heading-secondary">Code enforces.</span></>}
          description="AI can prepare the back office. A named curator, your team or NorthBridge, remains accountable for the credit decision."
          titleId="accountability-title"
        />
        <ol className="thesis-responsibilities">
          {responsibilities.map((item) => <li key={item.title} className={item.diagram === "signature" ? "thesis-responsibilities__decision" : undefined}>
            <span className="thesis-kicker">{item.role}</span>
            <ThesisDiagram kind={item.diagram} />
            <h3>{item.title}</h3><p>{item.copy}</p>
          </li>)}
        </ol>
        <dl className="thesis-proof">
          <div><dt>Credit serviced</dt><dd>{isLoading ? "—" : compactCurrency.format(creditServiced)}</dd></div>
          <div><dt>Active loans</dt><dd>{isLoading ? "—" : compactCurrency.format(activeLoans)}</dd></div>
        </dl>
        <p className="thesis-risk-note">Pareto figures are read live from the Pareto API. Curation does not guarantee repayment; credit risk remains with lenders.</p>
      </SectionContainer>
    </section>

    <Chapter
      id="roadmap"
      title={<>Where it goes next.<br /><span className="thesis-heading-secondary">Agents in the loop.</span></>}
      description="Facilities and distribution are live today. Next, agents take on more of the back office, with a person signing every change."
    >
      <RoadmapTimeline />
    </Chapter>

    <section className="thesis-closing" aria-labelledby="thesis-closing-title">
      <SectionContainer className="ui-section-shell">
        <SectionHeader eyebrow="Pareto today" title={<>Put the thesis <span className="thesis-heading-secondary">to work.</span></>} titleId="thesis-closing-title" variant="centered" tone="dark" description="Structure, launch and operate credit facilities with Pareto Studio." />
        <div className="thesis-closing__actions">
          <PageLink to="/" hash="contact" onClick={() => setPendingContactInterest("Pareto Studio (Core)")} className="thesis-closing__primary">Request Studio access<ArrowUpRight size={16} aria-hidden="true" /></PageLink>
          <ButtonLink href={PARETO_DOCS_URL} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">Read the docs<ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
        </div>
        <p className="thesis-closing__disclaimer">This page is for information only and is not an offer or solicitation to lend, borrow or invest. Market figures are third-party estimates as of the dates shown; Pareto figures are read live from the Pareto API.</p>
      </SectionContainer>
    </section>
  </>
);

export default ThesisSections;
