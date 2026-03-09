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
      className="relative z-10 overflow-hidden border-b border-[var(--color-border-inverse-subtle)] bg-[var(--color-brand-mid)]"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-[color:rgb(112_177_158_/_0.05)] blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-[var(--color-glow-blue)] blur-[150px]" />

      <SectionContainer className="ui-section-shell relative z-10 py-16 md:py-20 lg:py-0">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center py-10 md:py-14 lg:min-h-[100svh] lg:py-16 xl:py-20">
            <SectionHeading
              eyebrow="Solutions"
              title="Launch your own credit facility in minutes"
              size="4xl"
              className="mx-auto mb-14 text-center lg:mb-16 xl:mb-20"
              titleClassName="leading-tight text-[var(--color-text-inverse)] md:text-5xl lg:text-[3.5rem]"
            />

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
              <div className="order-2 lg:order-1">
                <StudioVisual activeIndex={safeStudioIndex} />
              </div>

              <div className="order-1 lg:order-2">
                <div>
                  <h3 className="mb-3 text-[1.9rem] font-bold tracking-tight text-[var(--color-text-inverse)] xl:text-[2rem]">
                    Pareto Studio
                  </h3>
                  <p className="mb-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] xl:mb-7 xl:text-lg">
                    Streamline the entire debt lifecycle, from origination and
                    issuance to reporting and capital flows.
                  </p>
                  <FeatureList
                    features={studioFeatures}
                    activeIndex={safeStudioIndex}
                    onHover={setActiveStudio}
                  />
                  <div className="mt-6 flex justify-start xl:mt-7">
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
          </div>

          <div className="flex flex-col justify-center py-10 md:py-14 lg:min-h-[100svh] lg:py-16 xl:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
              <div className="order-2 lg:order-1">
                <div>
                  <h3 className="mb-3 text-[1.9rem] font-bold tracking-tight text-[var(--color-text-inverse)] xl:text-[2rem]">
                    Pareto White Label
                  </h3>
                  <p className="mb-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] xl:mb-7 xl:text-lg">
                    Pareto enables fintechs, prime brokers, and institutions to deploy
                    fully white-labeled credit infrastructure.
                  </p>
                  <FeatureList
                    features={wlFeatures}
                    activeIndex={safeWhiteLabelIndex}
                    onHover={setActiveWhiteLabel}
                  />
                  <div className="mt-6 flex justify-start xl:mt-7">
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
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default SolutionsSection;
