import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import { ButtonLink } from "../../ui/Button";
import { PageLink } from "../../ui/PageLink";
import { MCP_PRODUCT_NAME, PARETO_DOCS_URL } from "../../../data/brand";
import { thesisChapters, thesisConstraints, thesisRoadmap, thesisSafeguards, thesisStats, type ThesisStat } from "../../../data/thesis";
import { setPendingContactInterest } from "../../../lib/siteNavigation";
import ThesisDiagram from "./ThesisDiagram";
import ThesisLifecycle from "./ThesisLifecycle";
import "./thesis-sections.css";

interface ChapterProps {
  id: (typeof thesisChapters)[number]["id"];
  title: ReactNode;
  description?: string;
  tone?: "light" | "dark";
  centered?: boolean;
  children: ReactNode;
}

const Chapter = ({ id, title, description, tone = "light", centered = false, children }: ChapterProps) => {
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
          variant={centered ? "centered" : "explanatory"}
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

interface ThesisSectionsProps {
  creditServiced: number;
  activeLoans: number;
  isLoading: boolean;
}

const ThesisSections = ({ creditServiced, activeLoans, isLoading }: ThesisSectionsProps) => (
  <>
    <Chapter
      id="opportunity"
      title={<>Two pools of capital.<br /><span className="thesis-heading-secondary">One infrastructure gap.</span></>}
      description="Stablecoins bring onchain dollars looking for real yield. Private credit has the yield, but reaches lenders through slow, manual processes. The gap is infrastructure."
    >
      <div className="thesis-markets">
        <div className="thesis-markets__pools">
          {thesisStats.slice(0, 2).map((stat, index) => (
            <figure key={stat.value} className={`thesis-market thesis-market--${index === 0 ? "credit" : "dollars"}`}>
              <span className="thesis-kicker">{index === 0 ? "Private credit" : "Onchain dollars"}</span>
              <div className="thesis-market__value">{stat.value}</div>
              <figcaption><p>{stat.label}</p><SourceLink stat={stat} /></figcaption>
              <div className="thesis-market__wire" aria-hidden="true"><span /><span /><span /><span /><span /></div>
            </figure>
          ))}
          <div className="thesis-markets__join" aria-hidden="true"><svg viewBox="0 0 64 32" fill="none"><path d="M1 16h19m24 0h19" stroke="currentColor" /><circle cx="20" cy="16" r="2" fill="currentColor" /><circle cx="44" cy="16" r="2" fill="currentColor" /></svg></div>
        </div>
        <figure className="thesis-markets__context">
          <div><span className="thesis-kicker">Already onchain</span><span className="thesis-markets__context-value">{thesisStats[2].value}</span></div>
          <figcaption><p>{thesisStats[2].label}</p><SourceLink stat={thesisStats[2]} /></figcaption>
        </figure>
      </div>
    </Chapter>

    <Chapter
      id="constraint"
      title={<>Why credit is still slow.<br /><span className="thesis-heading-secondary">Five points of friction.</span></>}
      description="The work between a credit decision and a funded facility still passes through disconnected systems and manual handoffs."
    >
      <div className="thesis-frictions">
        <figure className="thesis-frictions__visual">
          <span className="thesis-kicker">The manual handoff</span>
          <ThesisDiagram kind="records" />
          <figcaption><strong>Information moves.<br />Context gets lost.</strong><p>Documents, decisions and servicing live in separate places.</p></figcaption>
        </figure>
        <ol className="thesis-frictions__list">
          {thesisConstraints.map((item, index) => <li key={item.title}>
            <span className="thesis-frictions__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div><h3>{item.title}</h3><p>{item.copy}</p></div>
          </li>)}
        </ol>
      </div>
    </Chapter>

    <Chapter
      id="rails"
      title={<>Familiar safeguards.<br /><span className="thesis-heading-secondary">Enforced by code.</span></>}
      description="Keep the safeguards credit committees already rely on. Make the rules, permissions and servicing verifiable onchain."
    >
      <div className="thesis-safeguards">
        <figure className="thesis-safeguards__visual">
          <span className="thesis-kicker">A dedicated Credit Vault</span>
          <ThesisDiagram kind="vault" />
          <figcaption><strong>One facility.<br />Defined rules.</strong><span>Legal terms · Permissions · Accounting</span></figcaption>
        </figure>
        <ol className="thesis-safeguards__list">
          {thesisSafeguards.map((item, index) => <li key={item.title}>
            <span className="thesis-kicker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3><p>{item.copy}</p>
          </li>)}
        </ol>
      </div>
    </Chapter>

    <Chapter
      id="accountability"
      tone="dark"
      centered
      title={<>Agents draft. <span className="thesis-heading-secondary">Humans sign.</span></>}
      description="AI can prepare the back office. A named curator—your team or NorthBridge—remains accountable for the credit decision."
    >
      <ol className="thesis-responsibilities">
        {responsibilities.map((item) => <li key={item.title} className={item.diagram === "signature" ? "thesis-responsibilities__decision" : undefined}>
          <span className="thesis-kicker">{item.role}</span>
          <ThesisDiagram kind={item.diagram} />
          <h3>{item.title}</h3><p>{item.copy}</p>
        </li>)}
      </ol>
      <p className="thesis-risk-note">Curation does not guarantee repayment. Credit risk remains with lenders.</p>
    </Chapter>

    <Chapter
      id="platform"
      title={<>Five stages.<br /><span className="thesis-heading-secondary">One connected platform.</span></>}
      description="From borrower diligence to distribution, each stage belongs to the same facility workflow. Select a stage to explore."
    >
      <ThesisLifecycle />
      <div className="thesis-section-action"><PageLink to="/" hash="structures" className="thesis-text-link">See the credit facilities we support<ArrowUpRight size={16} aria-hidden="true" /></PageLink></div>
    </Chapter>

    <Chapter
      id="next"
      title={<>Where it goes next.<br /><span className="thesis-heading-secondary">Agents in the loop.</span></>}
      description="Start with direct access to facility data. Move toward agent-prepared work that still requires a human signature."
    >
      <div className="thesis-roadmap">
        <article className="thesis-roadmap__current">
          <div className="thesis-roadmap__status"><span className="thesis-status-dot" />{thesisRoadmap[0].status}</div>
          <ThesisDiagram kind="network" />
          <h3>{thesisRoadmap[0].name}</h3><p>{thesisRoadmap[0].copy}</p>
          <PageLink to="/" hash="contact" onClick={() => setPendingContactInterest(`${MCP_PRODUCT_NAME} early access`)} className="thesis-text-link">Request early access<ArrowUpRight size={16} aria-hidden="true" /></PageLink>
        </article>
        <div className="thesis-roadmap__upcoming">
          {thesisRoadmap.slice(1).map((item) => <article key={item.name}>
            <span className="thesis-kicker">{item.status}</span><h3>{item.name}</h3><p>{item.copy}</p>
          </article>)}
        </div>
      </div>
    </Chapter>

    <section className="thesis-closing" aria-labelledby="thesis-closing-title">
      <SectionContainer className="ui-section-shell">
        <SectionHeader eyebrow="Pareto today" title={<>Put the thesis <span className="thesis-heading-secondary">to work.</span></>} titleId="thesis-closing-title" variant="centered" tone="dark" description="Structure, launch and operate credit facilities with Pareto Studio." />
        <div className="thesis-closing__actions">
          <PageLink to="/" hash="contact" onClick={() => setPendingContactInterest("Pareto Studio (Core)")} className="thesis-closing__primary">Request Studio access<ArrowUpRight size={16} aria-hidden="true" /></PageLink>
          <ButtonLink href={PARETO_DOCS_URL} target="_blank" rel="noopener noreferrer" variant="ghost" size="md">Read the docs<ArrowUpRight size={16} aria-hidden="true" /></ButtonLink>
        </div>
        <dl className="thesis-closing__metrics">
          <div><dt>Credit serviced</dt><dd>{isLoading ? "—" : compactCurrency.format(creditServiced)}</dd></div>
          <div><dt>Active loans</dt><dd>{isLoading ? "—" : compactCurrency.format(activeLoans)}</dd></div>
        </dl>
        <p className="thesis-closing__disclaimer">This page is for information only and is not an offer or solicitation to lend, borrow or invest. Market figures are third-party estimates as of the dates shown; Pareto figures are read live from the Pareto API.</p>
      </SectionContainer>
    </section>
  </>
);

export default ThesisSections;
