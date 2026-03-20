import { useEffect, useRef, useState, type ReactNode } from "react";
import { studioFeatures, wlFeatures } from "../../data/solutions";
import { Button } from "../ui/Button";
import FeatureList from "./solutions/FeatureList";
import StudioVisual from "./solutions/StudioVisual";
import WhiteLabelVisual from "./solutions/WhiteLabelVisual";
import { SectionContainer, SectionHeading } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";

interface MobileSolutionsSliderProps {
  sliderTestId: string;
  paginationLabel: string;
  features: typeof studioFeatures;
  renderCard: (index: number) => ReactNode;
}

const MobileSolutionsSlider = ({
  sliderTestId,
  paginationLabel,
  features,
  renderCard,
}: MobileSolutionsSliderProps) => {
  const edgeSpacerFlexBasis = "calc(50% - min(42vw, 12.5rem))";
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartScrollRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const getCenteredScrollLeft = (
    viewport: HTMLDivElement,
    card: HTMLElement,
  ) => Math.max(0, card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2);

  const syncActiveIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const nearestIndex = cardRefs.current.reduce((closestIndex, card, index) => {
      if (!card) return closestIndex;

      const currentCard = cardRefs.current[closestIndex];
      if (!currentCard) return index;

      const currentDistance = Math.abs(
        getCenteredScrollLeft(viewport, currentCard) - viewport.scrollLeft,
      );
      const nextDistance = Math.abs(
        getCenteredScrollLeft(viewport, card) - viewport.scrollLeft,
      );

      return nextDistance < currentDistance ? index : closestIndex;
    }, 0);

    setActiveIndex(nearestIndex);
  };

  const finishDragging = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (
      pointerIdRef.current !== null &&
      viewport.hasPointerCapture(pointerIdRef.current)
    ) {
      viewport.releasePointerCapture(pointerIdRef.current);
    }

    pointerIdRef.current = null;
    setIsDragging(false);
    syncActiveIndex();
  };

  return (
    <div className="md:hidden">
      <div
        ref={viewportRef}
        data-testid={sliderTestId}
        onPointerDown={(event) => {
          const viewport = viewportRef.current;
          if (!viewport) return;

          pointerIdRef.current = event.pointerId;
          viewport.setPointerCapture(event.pointerId);
          pointerStartXRef.current = event.clientX;
          pointerStartScrollRef.current = viewport.scrollLeft;
          setIsDragging(true);
        }}
        onPointerMove={(event) => {
          if (pointerIdRef.current !== event.pointerId) return;

          const viewport = viewportRef.current;
          if (!viewport) return;

          const deltaX = event.clientX - pointerStartXRef.current;
          viewport.scrollLeft = pointerStartScrollRef.current - deltaX;
        }}
        onScroll={() => {
          if (scrollFrameRef.current !== null) {
            window.cancelAnimationFrame(scrollFrameRef.current);
          }

          scrollFrameRef.current = window.requestAnimationFrame(() => {
            syncActiveIndex();
            scrollFrameRef.current = null;
          });
        }}
        onPointerUp={finishDragging}
        onPointerCancel={finishDragging}
        onLostPointerCapture={finishDragging}
        className={`marquee-scroll -mx-6 flex overflow-x-auto pb-2 pt-1 touch-pan-x select-none snap-x snap-mandatory ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } md:hidden`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none shrink-0"
          style={{ flexBasis: edgeSpacerFlexBasis }}
        />
        {features.map((feature, index) => (
          <article
            key={feature.name}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            data-testid={`${sliderTestId.replace("-slider", "")}-card-${index}`}
            className={`w-[84%] max-w-[25rem] shrink-0 snap-center ${
              index === features.length - 1 ? "" : "mr-4"
            }`}
          >
            {renderCard(index)}
          </article>
        ))}
        <div
          aria-hidden="true"
          className="pointer-events-none shrink-0"
          style={{ flexBasis: edgeSpacerFlexBasis }}
        />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {features.map((feature, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={feature.name}
              type="button"
              aria-label={`Go to ${paginationLabel} card ${index + 1}`}
              aria-current={isActive ? "true" : "false"}
              onClick={() => {
                const viewport = viewportRef.current;
                const card = cardRefs.current[index];
                if (!viewport || !card) return;

                const nextLeft = getCenteredScrollLeft(viewport, card);
                setActiveIndex(index);

                if (typeof viewport.scrollTo === "function") {
                  viewport.scrollTo({ left: nextLeft, behavior: "smooth" });
                } else {
                  viewport.scrollLeft = nextLeft;
                }
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-10 bg-[var(--color-text-inverse)]"
                  : "w-6 bg-[color:rgb(255_255_255_/_0.18)]"
              }`}
            >
              <span className="sr-only">{feature.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

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
              title="Turn credit infrastructure into a competitive advantage"
              description="Support origination, management, and distribution through flexible infrastructure designed to fit how you go to market."
              size="4xl"
              className="mx-auto mb-14 text-center lg:mb-16 xl:mb-20"
              titleClassName="leading-tight text-[var(--color-text-inverse)] md:text-5xl lg:text-[3.5rem]"
              descriptionClassName="mx-auto max-w-3xl text-[var(--color-text-muted)]"
            />

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
              <div className="order-2 hidden md:block lg:order-1">
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
                  <div data-testid="studio-feature-list" className="hidden md:block">
                    <FeatureList
                      features={studioFeatures}
                      activeIndex={safeStudioIndex}
                      onHover={setActiveStudio}
                    />
                  </div>
                  <div className="mt-6">
                    <MobileSolutionsSlider
                      sliderTestId="studio-mobile-slider"
                      paginationLabel="Pareto Studio"
                      features={studioFeatures}
                      renderCard={(index) => <StudioVisual activeIndex={index} />}
                    />
                  </div>
                  <div className="mt-6 flex justify-center lg:justify-start xl:mt-7">
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
              <div
                data-testid="white-label-copy-slot"
                className="order-1 lg:order-1"
              >
                <div>
                  <h3 className="mb-3 text-[1.9rem] font-bold tracking-tight text-[var(--color-text-inverse)] xl:text-[2rem]">
                    Pareto White Label
                  </h3>
                  <p className="mb-6 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)] xl:mb-7 xl:text-lg">
                    Deploy branded credit infrastructure with the compliance,
                    liquidity, reporting, and uptime guarantees institutional
                    products require.
                  </p>
                  <div data-testid="white-label-feature-list" className="hidden md:block">
                    <FeatureList
                      features={wlFeatures}
                      activeIndex={safeWhiteLabelIndex}
                      onHover={setActiveWhiteLabel}
                    />
                  </div>
                  <div className="mt-6">
                    <MobileSolutionsSlider
                      sliderTestId="white-label-mobile-slider"
                      paginationLabel="Pareto White Label"
                      features={wlFeatures}
                      renderCard={(index) => <WhiteLabelVisual activeIndex={index} />}
                    />
                  </div>
                  <div className="mt-6 flex justify-center lg:justify-start xl:mt-7">
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
              <div
                data-testid="white-label-visual-slot"
                className="order-2 mt-4 hidden md:block lg:order-2 lg:mt-0"
              >
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
