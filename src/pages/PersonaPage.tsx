import Footer from "../components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import AudienceHeroVisual from "../components/sections/persona/AudienceHeroVisual";
import AudienceCardArt, {
  type AudienceArtKind,
} from "../components/sections/persona/AudienceCardArt";
import AudienceFramework from "../components/sections/persona/AudienceFramework";
import AudienceReveal from "../components/sections/persona/AudienceReveal";
import AudienceStories from "../components/sections/persona/AudienceStories";
import "../components/sections/persona/persona.css";
import { buttonClassName } from "../components/ui/buttonStyles";
import { PageLink } from "../components/ui/PageLink";
import { SectionContainer, SectionHeader } from "../components/ui/Section";
import FaqAccordion from "../components/ui/FaqAccordion";
import { PARETO_DOCS_URL, type ContactInterest } from "../data/brand";
import { getPersonaPage, type PersonaPageId } from "../data/personas";
import { setPendingContactInterest } from "../lib/siteNavigation";

const benefitArtwork: Record<PersonaPageId, AudienceArtKind[]> = {
  originators: ["structure", "network", "activity", "distribution"],
  "capital-providers": ["selection", "network", "terms", "activity"],
};
const ContactLink = ({
  label,
  interest,
  variant = "text",
}: {
  label: string;
  interest: ContactInterest;
  variant?: "primary" | "white" | "text";
}) => (
  <PageLink
    to="/"
    hash="contact"
    onClick={() => setPendingContactInterest(interest)}
    className={
      variant === "text" ? "audience-text-link" : buttonClassName(variant, "md")
    }
  >
    {label}
  </PageLink>
);

export default function PersonaPage({ id }: { id: PersonaPageId }) {
  const page = getPersonaPage(id);
  const originators = id === "originators";
  const { primaryCta, secondaryCta } = page;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main className="audience-main">
        <section
          id="hero"
          className="audience-hero"
          aria-labelledby="hero-title"
        >
          <SectionContainer className="audience-hero__inner">
            <div className="audience-hero__layout">
              <AudienceReveal className="audience-hero__copy">
                <h1 id="hero-title" tabIndex={-1}>
                  {page.title} <span>{page.titleMuted}</span>
                </h1>
                <p className="audience-hero__intro">{page.intro}</p>
                <div className="audience-hero__actions">
                  {primaryCta.interest ? (
                    <ContactLink
                      label={primaryCta.label}
                      interest={primaryCta.interest}
                      variant="primary"
                    />
                  ) : (
                    <a
                      href={primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClassName("primary", "md")}
                    >
                      {primaryCta.label}
                    </a>
                  )}
                  {secondaryCta.interest ? (
                    <ContactLink
                      label={secondaryCta.label}
                      interest={secondaryCta.interest}
                      variant="white"
                    />
                  ) : (
                    <PageLink
                      to={
                        secondaryCta.to ?? (secondaryCta.home ? "/" : page.path)
                      }
                      hash={secondaryCta.hash}
                      className={buttonClassName("white", "md")}
                    >
                      {secondaryCta.label}
                    </PageLink>
                  )}
                </div>
              </AudienceReveal>
              <AudienceReveal delay={0.1} className="audience-hero__art">
                <AudienceHeroVisual originators={originators} />
              </AudienceReveal>
            </div>
          </SectionContainer>
        </section>

        <section
          id="benefits"
          className="audience-section"
          aria-labelledby="benefits-title"
        >
          <SectionContainer className="ui-section-shell">
            <AudienceReveal>
              <SectionHeader
                eyebrow="Why Pareto"
                titleId="benefits-title"
                title={page.benefits.title}
                description={page.benefits.intro}
              />
            </AudienceReveal>
            <ol className="audience-benefits">
              {page.benefits.items.map((item, index) => (
                <li key={item.title}>
                  <AudienceReveal delay={(index % 2) * 0.07}>
                    <article
                      tabIndex={0}
                      aria-labelledby={`benefit-${index}-title`}
                    >
                      <AudienceCardArt kind={benefitArtwork[id][index]} />
                      <div className="audience-benefit__copy">
                        <h3 id={`benefit-${index}-title`}>{item.title}</h3>
                        <p>{item.copy}</p>
                      </div>
                    </article>
                  </AudienceReveal>
                </li>
              ))}
            </ol>
          </SectionContainer>
        </section>

        <section
          id="framework"
          className="audience-section audience-section--layers"
          aria-labelledby="framework-title"
        >
          <SectionContainer className="ui-section-shell">
            <AudienceReveal>
              <SectionHeader
                eyebrow="Credit infrastructure"
                titleId="framework-title"
                title={page.framework.title}
                description={page.framework.intro}
                tone="dark"
              />
            </AudienceReveal>
            <AudienceReveal>
              <AudienceFramework
                title={page.framework.title}
                items={page.framework.items}
                action={
                  <ContactLink
                    label={page.frameworkCta.label}
                    interest={page.frameworkCta.interest}
                    variant="primary"
                  />
                }
              />
            </AudienceReveal>
          </SectionContainer>
        </section>

        <section
          id="experience"
          className="audience-section"
          aria-labelledby="experience-title"
        >
          <SectionContainer className="ui-section-shell">
            <AudienceReveal>
              <SectionHeader
                eyebrow="Client stories"
                titleId="experience-title"
                title="Credit in practice."
                variant="collection"
              />
            </AudienceReveal>
            <AudienceStories />
          </SectionContainer>
        </section>

        <section
          id="questions"
          className="audience-section audience-section--muted"
          aria-labelledby="questions-title"
        >
          <SectionContainer className="ui-section-shell">
            <AudienceReveal className="audience-questions">
              <div>
                <SectionHeader
                  eyebrow="FAQ"
                  titleId="questions-title"
                  title="Your questions answered"
                  variant="collection"
                />
                <a
                  href={PARETO_DOCS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="audience-text-link"
                >
                  Read the documentation
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <FaqAccordion key={id} items={page.questions} />
            </AudienceReveal>
          </SectionContainer>
        </section>

        <section
          id="get-started"
          className="audience-closing"
          aria-labelledby="closing-title"
        >
          <SectionContainer className="ui-section-shell">
            <AudienceReveal>
              <SectionHeader
                eyebrow="Get started"
                titleId="closing-title"
                title={page.closing.title}
                description={page.closing.copy}
                variant="collection"
                tone="dark"
                action={
                  <div className="audience-closing__action">
                    <ContactLink
                      label={page.closing.cta}
                      interest={page.closing.interest}
                      variant="primary"
                    />
                  </div>
                }
              />
              {page.disclaimer && (
                <p className="audience-disclaimer">{page.disclaimer}</p>
              )}
            </AudienceReveal>
          </SectionContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
}
