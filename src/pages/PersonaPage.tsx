import Footer from "../components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import SubpageHeader from "../components/sections/SubpageHeader";
import originatorsMobile from "../assets/images/ecosystem/fintech-card.jpg";
import originatorsMobileAvif from "../assets/images/ecosystem/fintech-card.avif";
import originatorsDesktop from "../assets/images/page-headers/originators-1920.jpg";
import originatorsLarge from "../assets/images/page-headers/originators-3200.jpg";
import allocatorsMobile from "../assets/images/ecosystem/brokers-card.jpg";
import allocatorsMobileAvif from "../assets/images/ecosystem/brokers-card.avif";
import allocatorsDesktop from "../assets/images/page-headers/capital-allocators-1920.jpg";
import allocatorsLarge from "../assets/images/page-headers/capital-allocators-3200.jpg";
import AudienceCardArt, {
  type AudienceArtKind,
} from "../components/sections/persona/AudienceCardArt";
import AudienceFramework from "../components/sections/persona/AudienceFramework";
import AudienceReveal from "../components/sections/persona/AudienceReveal";
import AudienceStories from "../components/sections/persona/AudienceStories";
import ContactSection from "../components/sections/ContactSection";
import "../components/sections/persona/persona.css";
import { buttonClassName } from "../components/ui/buttonStyles";
import { PageLink } from "../components/ui/PageLink";
import { SectionContainer, SectionHeader } from "../components/ui/Section";
import FaqAccordion from "../components/ui/FaqAccordion";
import { PARETO_DOCS_URL, type ContactInterest } from "../data/brand";
import {
  getPersonaPage,
  type PersonaPageId,
  type PersonaPath,
} from "../data/personas";
import { requestContact } from "../lib/siteNavigation";

const headerImages = {
  originators: {
    mobile: originatorsMobile,
    mobileAvif: originatorsMobileAvif,
    desktop: originatorsDesktop,
    large: originatorsLarge,
    largeWidth: 3200,
  },
  "capital-providers": {
    mobile: allocatorsMobile,
    mobileAvif: allocatorsMobileAvif,
    desktop: allocatorsDesktop,
    large: allocatorsLarge,
    largeWidth: 3200,
  },
};

const benefitArtwork: Record<PersonaPageId, AudienceArtKind[]> = {
  originators: ["structure", "network", "activity", "distribution"],
  "capital-providers": ["selection", "network", "terms", "activity"],
};
const TwoToneTitle = ({
  title,
  muted,
  dark = false,
}: {
  title: string;
  muted?: string;
  dark?: boolean;
}) =>
  muted && title.endsWith(muted) ? (
    <>
      {title.slice(0, -muted.length)}
      <span
        className={
          dark
            ? "text-[var(--color-text-muted-inverse)]"
            : "text-[var(--color-text-muted)]"
        }
      >
        {muted}
      </span>
    </>
  ) : (
    title
  );

const ContactLink = ({
  label,
  interest,
  variant = "text",
  to,
}: {
  label: string;
  interest: ContactInterest;
  variant?: "primary" | "header-link" | "text";
  to: PersonaPath;
}) => (
  <PageLink
    to={to}
    hash="contact"
    onClick={(event) => {
      if (
        event.button === 0 &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        event.preventDefault();
        requestContact(interest);
      }
    }}
    className={
      variant === "primary"
        ? buttonClassName("primary", "md")
        : variant === "header-link"
        ? "subpage-header__secondary"
        : "audience-text-link"
    }
  >
    {label}
  </PageLink>
);

export default function PersonaPage({ id }: { id: PersonaPageId }) {
  const page = getPersonaPage(id);
  const { primaryCta, secondaryCta } = page;

  return (
    <div className="subpage-layout min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main className="audience-main">
        <SubpageHeader
          category="Clients"
          pageName={page.navLabel}
          titleId="hero-title"
          title={
            <>
              {page.title}{" "}
              <span className="block text-[var(--color-text-muted)]">
                {page.titleMuted}
              </span>
            </>
          }
          description={page.intro}
          image={headerImages[id]}
        >
          {primaryCta.interest ? (
            <ContactLink
              label={primaryCta.label}
              interest={primaryCta.interest}
              to={page.path}
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
              to={page.path}
              variant="header-link"
            />
          ) : (
            <PageLink
              to={secondaryCta.to ?? (secondaryCta.home ? "/" : page.path)}
              hash={secondaryCta.hash}
              className="subpage-header__secondary"
            >
              {secondaryCta.label}
            </PageLink>
          )}
        </SubpageHeader>

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
                title={
                  <TwoToneTitle
                    title={page.benefits.title}
                    muted={page.benefits.titleMuted}
                  />
                }
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
                title={
                  <TwoToneTitle
                    title={page.framework.title}
                    muted={page.framework.titleMuted}
                    dark
                  />
                }
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
                    to={page.path}
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
                title={
                  <TwoToneTitle
                    title="Credit in practice."
                    muted="in practice."
                  />
                }
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
                  title={
                    <TwoToneTitle
                      title="Your questions answered"
                      muted="answered"
                    />
                  }
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

        <ContactSection
          className="audience-section audience-contact"
          defaultInterest={page.closing.interest}
          title={
            <TwoToneTitle
              title={page.closing.title}
              muted={page.closing.titleMuted}
            />
          }
          description={page.closing.copy}
          submitLabel="Send enquiry"
          disclaimer={page.disclaimer}
        />
      </main>
      <Footer />
    </div>
  );
}
