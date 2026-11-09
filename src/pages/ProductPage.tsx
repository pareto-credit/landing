import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CreditVaultsContent from "../components/sections/product/CreditVaultsContent";
import StudioProductContent from "../components/sections/product/StudioProductContent";
import AudienceStories from "../components/sections/persona/AudienceStories";
import AudienceReveal from "../components/sections/persona/AudienceReveal";
import PlansSection from "../components/sections/PlansSection";
import ContactSection from "../components/sections/ContactSection";
import { SectionContainer, SectionHeader } from "../components/ui/Section";
import FaqAccordion from "../components/ui/FaqAccordion";
import { PARETO_DOCS_URL } from "../data/brand";
import { productQuestions, type ProductPageId } from "../data/productPages";
import "../components/sections/persona/persona.css";
import "../components/sections/product/product-pages.css";

export default function ProductPage({ id }: { id: ProductPageId }) {
  const vaults = id === "credit-vaults";

  return (
    <div
      className={`product-page ${
        vaults ? "credit-vaults-page subpage-layout" : ""
      } min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]`}
    >
      <Navbar />
      <main className="product-main">
        {vaults ? <CreditVaultsContent /> : <StudioProductContent />}
        <PlansSection
          id="pricing"
          eyebrow="Pricing tiers"
          title={
            vaults ? (
              <>
                The right foundation.{" "}
                <span className="text-[var(--color-text-muted)]">
                  The right level of support
                </span>
              </>
            ) : (
              <>
                An operating model{" "}
                <span className="text-[var(--color-text-muted)]">
                  that grows with you
                </span>
              </>
            )
          }
          description="Choose Core, Pro or White-Glove. Commercial terms are tailored to your facility and the support you need."
        />
        <section
          id="experience"
          className="product-section product-section--light"
          aria-labelledby="product-stories-title"
        >
          <SectionContainer>
            <AudienceReveal>
              <SectionHeader
                eyebrow="Success stories"
                title={
                  <>
                    Credit{" "}
                    <span className="text-[var(--color-text-muted)]">
                      in practice
                    </span>
                  </>
                }
                description="Perspectives from across the Pareto network."
                titleId="product-stories-title"
              />
            </AudienceReveal>
            <AudienceStories />
          </SectionContainer>
        </section>
        <section
          id="questions"
          className="product-section product-section--muted"
          aria-labelledby="product-questions-title"
        >
          <SectionContainer>
            <AudienceReveal className="audience-questions">
              <div>
                <SectionHeader
                  variant="collection"
                  eyebrow="Practical considerations"
                  titleId="product-questions-title"
                  title={
                    <>
                      Your questions{" "}
                      <span className="text-[var(--color-text-muted)]">
                        answered
                      </span>
                    </>
                  }
                  description="A starting point for your team’s review."
                />
                <a
                  href={PARETO_DOCS_URL}
                  className="audience-text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the documentation <span aria-hidden="true">↗</span>
                </a>
              </div>
              <FaqAccordion key={id} items={productQuestions[id]} />
            </AudienceReveal>
          </SectionContainer>
        </section>
        <ContactSection
          key={id}
          defaultInterest={vaults ? "Borrowing" : "Pareto Studio (Core)"}
          submitLabel={vaults ? "Send enquiry" : undefined}
          title={
            vaults ? (
              <>
                Let’s build{" "}
                <span className="text-[var(--color-text-muted)]">
                  your next credit facility
                </span>
              </>
            ) : (
              <>
                Bring your credit{" "}
                <span className="text-[var(--color-text-muted)]">
                  operations together
                </span>
              </>
            )
          }
          description={
            vaults
              ? "Tell us what you want to finance. We’ll help you shape the facility and the infrastructure around it."
              : "Tell us about your team and your facilities. We’ll help you find the right starting point."
          }
        />
      </main>
      <Footer />
    </div>
  );
}
