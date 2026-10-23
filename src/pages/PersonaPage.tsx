import { useRef } from "react";
import { useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import ProductsSection from "../components/sections/ProductsSection";
import EcosystemRoleCard from "../components/sections/ecosystem/EcosystemRoleCard";
import "../components/sections/ecosystem/ecosystem.css";
import "../components/sections/persona/persona.css";
import StudioDesk from "../components/sections/studio/StudioDesk";
import { personaDesks } from "../components/sections/studio/studioDeskData";
import { buttonClassName } from "../components/ui/buttonStyles";
import { PageLink } from "../components/ui/PageLink";
import PartnerLogo from "../components/ui/PartnerLogo";
import { SectionContainer, SectionHeader } from "../components/ui/Section";
import { PARETO_APP_URL } from "../data/brand";
import { ecosystemRoles } from "../data/ecosystem";
import { partners } from "../data/partners";
import { getPersonaPage, type PersonaPageId } from "../data/personas";
import { plans } from "../data/plans";
import { testimonialList } from "../data/testimonials";
import { useProductsData } from "../hooks/useProductsData";
import { setPendingContactInterest } from "../lib/siteNavigation";

const compactCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const twoLineTitle = (title: string, muted: string) => (
  <>
    {title}
    <br />
    <span className="persona-muted">{muted}</span>
  </>
);

const PersonaPage = ({ id }: { id: PersonaPageId }) => {
  const page = getPersonaPage(id);
  const { metrics, vaults, isLoading } = useProductsData();
  const deskRef = useRef<HTMLDivElement | null>(null);
  const isDeskInView = useInView(deskRef, { amount: 0.2 });
  const desk = personaDesks.find((item) => item.id === page.desk) ?? personaDesks[0];
  const quotes = page.testimonials.flatMap((name) => testimonialList.filter((item) => item.name === name));
  const originatorRoles = ecosystemRoles.filter((role) => role.id === "borrowers" || role.id === "underwriters");
  const creditPartners = partners.filter((partner) => partner.group === "credit");
  const isOriginators = page.id === "originators";
  const { primaryCta, secondaryCta } = page;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main className="persona-main">
        <section id="hero" className="persona-hero" aria-labelledby="hero-title">
          <div className="persona-hero__backdrop" aria-hidden="true" />
          <SectionContainer className="persona-hero__inner">
            <nav aria-label="Breadcrumb" className="persona-hero__crumbs">
              <PageLink to="/ecosystem" hash="hero">Ecosystem</PageLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.eyebrow}</span>
            </nav>
            <div className="persona-hero__layout">
              <h1 id="hero-title" tabIndex={-1}>
                {page.title}
                <span>{page.titleMuted}</span>
              </h1>
              <div className="persona-hero__intro">
                <p>{page.intro}</p>
                <ul className="persona-hero__audience" aria-label="Who it's for">
                  {page.audience.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="persona-hero__actions">
                  <PageLink
                    to="/"
                    hash="contact"
                    onClick={() => setPendingContactInterest(primaryCta.interest)}
                    className={buttonClassName("primary", "md")}
                  >
                    {primaryCta.label}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </PageLink>
                  {secondaryCta.interest ? (
                    <PageLink
                      to="/"
                      hash="contact"
                      onClick={() => setPendingContactInterest(secondaryCta.interest ?? null)}
                      className="persona-hero__secondary"
                    >
                      {secondaryCta.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </PageLink>
                  ) : (
                    <PageLink to={page.path} hash={secondaryCta.hash} className="persona-hero__secondary">
                      {secondaryCta.label}
                      <ArrowRight size={16} aria-hidden="true" />
                    </PageLink>
                  )}
                </div>
              </div>
            </div>
            <div ref={deskRef} className="persona-hero__desk">
              <StudioDesk desk={desk} isLive={isDeskInView} />
            </div>
          </SectionContainer>
        </section>

        <section id="problem" className="persona-section persona-section--surface" aria-labelledby="problem-title">
          <SectionContainer className="ui-section-shell">
            <SectionHeader
              eyebrow="The problem"
              title={twoLineTitle(page.problem.title, page.problem.titleMuted)}
              description={page.problem.description}
              titleId="problem-title"
            />
            <ol className="persona-problems">
              {page.problem.items.map((item, index) => (
                <li key={item.title}>
                  <span className="persona-kicker">{String(index + 1).padStart(2, "0")} · {item.signal}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </section>

        <section id="comparison" className="persona-section persona-section--muted" aria-labelledby="comparison-title">
          <SectionContainer className="ui-section-shell">
            <SectionHeader
              eyebrow="Traditional vs Pareto"
              title={twoLineTitle(page.comparison.title, page.comparison.titleMuted)}
              description={page.comparison.description}
              titleId="comparison-title"
            />
            <table className="persona-compare">
              <caption className="sr-only">How {page.navLabel.toLowerCase()} work today compared with Pareto</caption>
              <thead>
                <tr>
                  <th scope="col">Area</th>
                  <th scope="col">Traditional</th>
                  <th scope="col">With Pareto</th>
                </tr>
              </thead>
              <tbody>
                {page.comparison.rows.map((row) => (
                  <tr key={row.topic}>
                    <th scope="row">{row.topic}</th>
                    <td data-label="Traditional"><span><Minus size={14} aria-hidden="true" />{row.traditional}</span></td>
                    <td data-label="With Pareto"><span><Check size={14} aria-hidden="true" />{row.pareto}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionContainer>
        </section>

        {isOriginators ? (
          <section id="paths" className="persona-section persona-section--light" aria-labelledby="paths-title">
            <SectionContainer className="ui-section-shell">
              <SectionHeader
                eyebrow="Two ways in"
                title={twoLineTitle("Borrow for your book,", "or underwrite for others.")}
                description="Both run on the same facility infrastructure. Prefer not to curate? NorthBridge can act as the named curator."
                titleId="paths-title"
              />
              <div className="eco-roles persona-paths">
                {originatorRoles.map((role, index) => (
                  <EcosystemRoleCard key={role.id} role={role} index={index} headingLevel="h3" showPageLink={false} />
                ))}
              </div>
            </SectionContainer>
          </section>
        ) : (
          <ProductsSection vaults={vaults} isVaultsLoading={isLoading} />
        )}

        <section id="how-it-works" className="persona-section persona-section--surface" aria-labelledby="steps-title">
          <SectionContainer className="ui-section-shell">
            <SectionHeader
              eyebrow="How it works"
              title={twoLineTitle(page.steps.title, page.steps.titleMuted)}
              description={page.steps.description}
              titleId="steps-title"
            />
            <ol className="persona-steps">
              {page.steps.items.map((step, index) => (
                <li key={step.title}>
                  <span className="persona-steps__number" aria-hidden="true">{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </section>

        <section id="proof" className="persona-section persona-section--dark" aria-labelledby="proof-title">
          <SectionContainer className="ui-section-shell">
            <SectionHeader
              eyebrow="On Pareto today"
              title={twoLineTitle("Already running", "in production.")}
              tone="dark"
              titleId="proof-title"
            />
            <div className="persona-proof">
              <dl className="persona-proof__metrics">
                <div>
                  <dt>Credit serviced</dt>
                  <dd>{isLoading ? "—" : compactCurrency.format(metrics.creditExtended)}</dd>
                </div>
                <div>
                  <dt>Active loans</dt>
                  <dd>{isLoading ? "—" : compactCurrency.format(metrics.outstandingLoans)}</dd>
                </div>
                <p>Read live from the Pareto API.</p>
              </dl>
              <div className="persona-proof__quotes">
                {quotes.map((quote) => (
                  <figure key={quote.name} className="persona-quote">
                    <blockquote>“{quote.quote}”</blockquote>
                    <figcaption>
                      <strong>{quote.name}</strong>
                      <span>{quote.role}, {quote.company}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <div className="persona-logos">
              <p>Credit partners running facilities on Pareto</p>
              <ul>
                {creditPartners.map((partner) => (
                  <li key={partner.name}>
                    <PartnerLogo partner={partner} tone="dark" presentation="grid" />
                  </li>
                ))}
              </ul>
            </div>
          </SectionContainer>
        </section>

        {isOriginators ? (
          <section id="plans" className="persona-section persona-section--light" aria-labelledby="plans-title">
            <SectionContainer className="ui-section-shell">
              <SectionHeader
                variant="collection"
                eyebrow="Offering"
                title={twoLineTitle("Choose how much", "we run for you.")}
                titleId="plans-title"
                action={
                  <PageLink to="/" hash="offering" className="persona-text-link">
                    Compare plans<ArrowRight size={16} aria-hidden="true" />
                  </PageLink>
                }
              />
              <ol className="persona-plans">
                {plans.map((plan) => (
                  <li key={plan.id}>
                    <span className="persona-kicker">{plan.subtitle ?? "Fully managed"}</span>
                    <h3>
                      {plan.name}
                      {plan.byline ? <small>{plan.byline}</small> : null}
                    </h3>
                    <p>{plan.description}</p>
                    <PageLink to="/" hash="contact" onClick={() => setPendingContactInterest(plan.contactInterest)}>
                      {plan.cta}<ArrowUpRight size={16} aria-hidden="true" />
                    </PageLink>
                  </li>
                ))}
              </ol>
            </SectionContainer>
          </section>
        ) : null}

        <section id="get-started" className="persona-closing" aria-labelledby="closing-title">
          <SectionContainer className="ui-section-shell">
            <SectionHeader
              variant="centered"
              tone="dark"
              eyebrow="Get started"
              title={<>{page.closing.title} <span className="text-[#a3c6b5]">{page.closing.titleMuted}</span></>}
              description={page.closing.copy}
              titleId="closing-title"
            />
            <div className="persona-closing__actions">
              <PageLink
                to="/"
                hash="contact"
                onClick={() => setPendingContactInterest(primaryCta.interest)}
                className={buttonClassName("primary", "md")}
              >
                {primaryCta.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </PageLink>
              {secondaryCta.interest ? (
                <PageLink
                  to="/"
                  hash="contact"
                  onClick={() => setPendingContactInterest(secondaryCta.interest ?? null)}
                  className={buttonClassName("ghost", "md")}
                >
                  {secondaryCta.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </PageLink>
              ) : (
                <a href={PARETO_APP_URL} target="_blank" rel="noopener noreferrer" className={buttonClassName("ghost", "md")}>
                  Open the Pareto app
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
            {page.disclaimer ? <p className="persona-disclaimer">{page.disclaimer}</p> : null}
          </SectionContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PersonaPage;
