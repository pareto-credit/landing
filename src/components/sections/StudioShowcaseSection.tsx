import "./studio/studio-showcase.css";
import { PARETO_APP_URL, STUDIO_PRODUCT_NAME } from "../../data/brand";
import { requestContact } from "../../lib/siteNavigation";
import { Button, ButtonLink } from "../ui/Button";
import { buttonClassName } from "../ui/buttonStyles";
import { PageLink } from "../ui/PageLink";
import { SectionContainer, SectionHeader } from "../ui/Section";
import StudioPreview from "./studio/StudioPreview";
import type { PersonaId } from "./studio/studioDeskData";

/** Keeps the product claim, access action and preview in one viewport. */
export default function StudioShowcaseSection() {
  return (
    <section
      id="studio"
      aria-labelledby="studio-title"
      className="studio-showcase relative border-y border-[var(--color-border-inverse-subtle)] text-[var(--color-text-inverse)]"
    >
      <SectionContainer className="studio-showcase__shell">
        <div data-testid="studio-overview" className="studio-showcase__header">
          <SectionHeader
            eyebrow={STUDIO_PRODUCT_NAME}
            titleId="studio-title"
            variant="centered"
            title={
              <>
                Every facility, <span className="text-white/65">one desk</span>
              </>
            }
            description="Structure, launch and run credit facilities from one place."
            tone="dark"
          />
        </div>
        <div className="studio-showcase__stage">
          <StudioPreview
            variant="showcase"
            renderActions={(persona) => <StudioActions persona={persona} />}
          />
        </div>
      </SectionContainer>
    </section>
  );
}

/** Keeps the inquiry and destination relevant to the role currently on display. */
function StudioActions({ persona }: { persona: PersonaId }) {
  const lender = persona === "allocate";

  return (
    <div className="studio-showcase__actions">
      <div className="studio-showcase__cta-row">
        <Button
          variant="primary"
          size="lg"
          onClick={() =>
            requestContact(lender ? "Lending" : "Pareto Studio (Core)")
          }
        >
          {lender ? "Ask a question" : "Request Studio access"}
        </Button>
        {lender ? (
          <ButtonLink
            href={PARETO_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="white"
            size="lg"
            className="studio-showcase__explore"
          >
            Enter app
          </ButtonLink>
        ) : (
          <PageLink
            to="/studio"
            className={buttonClassName(
              "white",
              "lg",
              "studio-showcase__explore"
            )}
          >
            Explore Studio
          </PageLink>
        )}
      </div>
    </div>
  );
}
