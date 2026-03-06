import { useState } from "react";
import { studioFeatures, wlFeatures } from "../../data/solutions";
import { Button } from "../ui/Button";
import FeatureList from "./solutions/FeatureList";
import StudioVisual from "./solutions/StudioVisual";
import WhiteLabelVisual from "./solutions/WhiteLabelVisual";
import { SectionContainer, SectionHeading } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";

const SolutionsSection = () => {
  const [activeWhiteLabel, setActiveWhiteLabel] = useState(0);
  const [activeStudio, setActiveStudio] = useState(0);
  const safeWhiteLabelIndex = Math.min(activeWhiteLabel, wlFeatures.length - 1);
  const safeStudioIndex = Math.min(activeStudio, studioFeatures.length - 1);

  return (
    <section
      id="solutions"
      className="relative z-10 overflow-hidden border-b border-[var(--color-border-inverse-subtle)] bg-[var(--color-brand-mid)] py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-[color:rgb(112_177_158_/_0.05)] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-[var(--color-glow-blue)] blur-[150px]" />

      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Solutions"
          title="Launch your own credit facility in minutes"
          size="4xl"
          className="mx-auto mb-24 text-center"
          titleClassName="leading-tight md:text-5xl lg:text-6xl text-[var(--color-text-inverse)]"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <StudioVisual activeIndex={safeStudioIndex} />
          </div>

          <div className="order-1 lg:order-2">
            <div>
              <h3 className="mb-4 text-3xl font-bold">Pareto Studio</h3>
              <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-muted)]">
                Streamline the entire debt lifecycle, from origination and
                issuance to reporting and capital flows.
              </p>
              <FeatureList
                features={studioFeatures}
                activeIndex={safeStudioIndex}
                onHover={setActiveStudio}
              />
              <div className="mt-8 flex justify-start">
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="ghost"
                  size="md"
                >
                  Request access
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div>
              <h3 className="mb-4 text-3xl font-bold">Pareto White Label</h3>
              <p className="mb-8 text-lg leading-relaxed text-[var(--color-text-muted)]">
                Pareto enables fintechs, prime brokers, and institutions to deploy
                fully white-labeled credit infrastructure.
              </p>
              <FeatureList
                features={wlFeatures}
                activeIndex={safeWhiteLabelIndex}
                onHover={setActiveWhiteLabel}
              />
              <div className="mt-8 flex justify-start">
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="ghost"
                  size="md"
                >
                  Request setup
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <WhiteLabelVisual activeIndex={safeWhiteLabelIndex} />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default SolutionsSection;
