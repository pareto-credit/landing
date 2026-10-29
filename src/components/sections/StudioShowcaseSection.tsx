import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { usePageVisibility } from "../../hooks/usePageVisibility";
import "./studio/studio-showcase.css";
import { STUDIO_PRODUCT_NAME } from "../../data/brand";
import { requestContact } from "../../lib/siteNavigation";
import { Button } from "../ui/Button";
import { PageLink } from "../ui/PageLink";
import { SectionContainer, SectionHeader } from "../ui/Section";
import StudioPreview from "./studio/StudioPreview";

export default function StudioShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ambientVisible = useInView(sectionRef, { amount: 0.08 });
  const pageVisible = usePageVisibility();
  const reduced = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="studio"
      data-ambient-running={ambientVisible && pageVisible && !reduced}
      className="studio-showcase relative overflow-hidden border-y border-[var(--color-border-inverse-subtle)] text-[var(--color-text-inverse)]"
    >
      <SectionContainer className="ui-section-shell">
        <SectionHeader
          eyebrow={STUDIO_PRODUCT_NAME}
          title={
            <>
              Every facility, <span className="ui-text-shimmer">one desk.</span>
            </>
          }
          description="A connected operating environment for the people behind every credit facility."
          tone="dark"
        />
        <StudioPreview />
        <div
          data-testid="studio-overview"
          className="mt-8 overflow-hidden rounded-[6px] border border-white/15"
        >
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between lg:p-7">
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              Structure, launch and run credit facilities from one place. Bring
              your team, participants and facility operations into a shared
              environment.
            </p>
            <Button
              variant="primary"
              size="md"
              className="shrink-0 self-start md:self-center"
              onClick={() => requestContact("Pareto Studio (Core)")}
            >
              Request Studio access
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          <PageLink
            to="/studio"
            className="inline-flex min-h-11 items-center gap-3 text-sm text-[#c8dbbb] transition-colors hover:text-white"
          >
            Explore Pareto Studio <span aria-hidden="true">↗</span>
          </PageLink>
          <PageLink
            to="/originators"
            className="inline-flex min-h-11 items-center gap-3 text-sm text-[#c8dbbb] transition-colors hover:text-white"
          >
            For originators<span aria-hidden="true">↗</span>
          </PageLink>
        </div>
      </SectionContainer>
    </section>
  );
}
