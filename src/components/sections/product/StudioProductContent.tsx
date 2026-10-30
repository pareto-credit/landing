import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { requestContact } from "../../../lib/siteNavigation";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import { buttonClassName } from "../../ui/buttonStyles";
import { SectionContainer } from "../../ui/Section";
import AgentsSection from "../AgentsSection";
import AudienceReveal from "../persona/AudienceReveal";
import StudioFeatureTour from "./StudioFeatureTour";
import StudioCapabilityArt from "./StudioCapabilityArt";
import ScrollHighlight from "./ScrollHighlight";
import "./studio-product.css";

function CapabilityCard({
  id,
  index,
  kicker,
  title,
  description,
  children,
}: {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.12 });
  const pageVisible = usePageVisibility();
  const reduced = useReducedMotion();
  return (
    <article
      ref={ref}
      id={id}
      tabIndex={0}
      aria-labelledby={`${id}-title`}
      className="studio-product-card"
      data-running={visible && pageVisible && !reduced}
    >
      <div className="studio-product-card__art">{children}</div>
      <div className="studio-product-card__copy">
        <p className="product-kicker">
          <span>{index}</span> {kicker}
        </p>
        <h3 id={`${id}-title`}>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}

export default function StudioProductContent() {
  const heroRef = useRef<HTMLElement>(null);
  const heroVisible = useInView(heroRef);
  const pageVisible = usePageVisibility();
  const reduced = useReducedMotion();
  return (
    <div className="studio-product">
      <section
        ref={heroRef}
        id="hero"
        className="product-hero studio-product-hero"
        aria-labelledby="hero-title"
        data-ambient-running={heroVisible && pageVisible && !reduced}
      >
        <SectionContainer className="studio-product-hero__inner">
          <AudienceReveal>
            <h1 id="hero-title" tabIndex={-1}>
              Pareto{" "}
              <span className="studio-product-wordmark">
                Studio
                <span
                  className="studio-product-wordmark__sheen"
                  aria-hidden="true"
                >
                  Studio
                </span>
              </span>
            </h1>
            <h2>Every facility. One operating environment.</h2>
            <div className="studio-product-hero__actions">
              <a
                href="#contact"
                onClick={() => requestContact("Pareto Studio (Core)")}
                className={buttonClassName("primary", "md")}
              >
                Request Access <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </AudienceReveal>
        </SectionContainer>
      </section>

      <section
        id="workspace"
        className="product-section studio-product-workspace"
        aria-label="Explore the Studio workspace"
      >
        <SectionContainer>
          <AudienceReveal className="studio-product-tour">
            <StudioFeatureTour />
          </AudienceReveal>
          <p className="studio-product-workspace__caption">
            Explore the highlighted areas to see Studio in action.
          </p>
        </SectionContainer>
      </section>

      <section
        className="product-section studio-product-narrative"
        aria-label="A connected credit workflow"
      >
        <SectionContainer>
          <p className="product-kicker">
            From first terms to ongoing operations
          </p>
          <ScrollHighlight
            as="h2"
            className="studio-product-narrative__statement"
            text="Designed to bring front-to-back loan management and a modern financing portal together in one integrated experience."
          />
          <div className="studio-product-narrative__foot">
            <span>One environment. The full operating cycle.</span>
            <ArrowDown size={20} aria-hidden="true" />
          </div>
        </SectionContainer>
      </section>

      <section
        className="product-section studio-product-capabilities"
        aria-labelledby="capabilities-title"
      >
        <SectionContainer>
          <AudienceReveal className="studio-product-capabilities__heading">
            <p className="product-kicker">Built around the work</p>
            <h2 id="capabilities-title">
              The full operating cycle. Connected.
            </h2>
          </AudienceReveal>
          <div className="studio-product-capabilities__grid">
            <CapabilityCard
              id="structuring"
              index="01"
              kicker="Facility structuring"
              title="Shape the facility around the mandate."
              description="Define terms, participants and operating requirements in one structured setup, with a clear handover into operations."
            >
              <StudioCapabilityArt kind="structuring" />
            </CapabilityCard>
            <CapabilityCard
              id="operations"
              index="02"
              kicker="Connected operations"
              title="Keep daily activity in context."
              description="Review requests, follow funding and repayments, and connect every event to the facility it belongs to."
            >
              <StudioCapabilityArt kind="operations" />
            </CapabilityCard>
            <CapabilityCard
              id="participants"
              index="03"
              kicker="Shared participant view"
              title="Different responsibilities. Shared context."
              description="Bring underwriters, borrowers and lenders into a connected workflow, with views shaped around each participant’s role."
            >
              <StudioCapabilityArt kind="participants" />
            </CapabilityCard>
            <CapabilityCard
              id="reporting"
              index="04"
              kicker="Reporting and visibility"
              title="Make reporting part of the workflow."
              description="Bring activity, transactions and participant information together to give your team and lenders a clearer basis for review."
            >
              <StudioCapabilityArt kind="reporting" />
            </CapabilityCard>
          </div>
        </SectionContainer>
      </section>
      <AgentsSection variant="studio" />
    </div>
  );
}
