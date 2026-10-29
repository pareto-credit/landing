import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import suspIcon from "../../assets/svgs/sUSP.svg";
import uspIcon from "../../assets/svgs/USP.svg";
import { FALLBACK_SYNTHETIC_DOLLAR_DATA } from "../../data/syntheticDollar";
import { cn } from "../../lib/cn";
import { useMinWidth } from "../../hooks/useMinWidth";
import type {
  SyntheticDollarDataPayload,
  SyntheticToken,
} from "../../types/syntheticDollar";
import { ButtonLink } from "../ui/Button";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface SyntheticFeature {
  name: string;
}

interface SyntheticTokenContent {
  title: string;
  description: string;
  features: SyntheticFeature[];
}

interface SyntheticDollarSectionProps {
  data?: SyntheticDollarDataPayload;
  isLoading?: boolean;
}

const OPEN_IN_APP_URL = "https://app.pareto.credit/usp";
// const DOCUMENTS_URL = "https://docs.pareto.credit/product/usp";
const TOKEN_ORDER: SyntheticToken[] = ["USP", "sUSP"];
const tokenIcons: Record<SyntheticToken, string> = {
  USP: uspIcon,
  sUSP: suspIcon,
};
const metricLabelClassName =
  "font-mono text-[10px] font-semibold uppercase tracking-widest";
const metricValueClassName =
  "mt-2 whitespace-nowrap text-2xl font-bold tracking-tight";
const DRAG_THRESHOLD_PX = 4;

const isInteractiveMarqueeTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(
    target.closest(
      "a, button, input, select, textarea, summary, [role='button'], [role='link']",
    ),
  );

const syntheticDollarContent: Record<SyntheticToken, SyntheticTokenContent> = {
  USP: {
    title: "USP, the credit<br />index unit",
    description:
      "USP tracks a diversified basket of loans, offering a stable reference unit for onchain credit markets.",
    features: [
      {
        name: "Composable",
      },
      {
        name: "Capital Efficient",
      },
      {
        name: "Diversified",
      },
    ],
  },
  sUSP: {
    title: "sUSP, the credit<br />index return",
    description:
      "sUSP accrues the aggregate yield of the underlying credit index - giving holders passive exposure to credit returns.",
    features: [
      {
        name: "Yield Generating",
      },
      {
        name: "Liquid",
      },
      {
        name: "Diversified",
      },
    ],
  },
};

const SyntheticDollarSection = ({
  data = FALLBACK_SYNTHETIC_DOLLAR_DATA,
  isLoading = false,
}: SyntheticDollarSectionProps) => {
  const showHeaderCta = useMinWidth(1024);
  const isMobileSlider = !showHeaderCta;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollFrameRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const pointerStartScrollRef = useRef(0);
  const pointerStartedOnInteractiveRef = useRef(false);
  const didDragRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cards = TOKEN_ORDER.map((token) => ({
    content: syntheticDollarContent[token],
    icon: tokenIcons[token],
    isDark: token === "sUSP",
    stats: data[token].stats,
    token,
  }));

  useEffect(() => {
    if (!isMobileSlider) {
      setActiveIndex(0);
    }
  }, [isMobileSlider]);

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const getCenteredScrollLeft = (viewport: HTMLDivElement, card: HTMLElement) =>
    Math.max(
      0,
      card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2,
    );

  const syncActiveIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport || !isMobileSlider) return;

    const nearestIndex = cardRefs.current.reduce(
      (closestIndex, card, index) => {
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
      },
      0,
    );

    setActiveIndex(nearestIndex);
  };

  const finishDragging = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (
      pointerIdRef.current !== null &&
      typeof viewport.hasPointerCapture === "function" &&
      viewport.hasPointerCapture(pointerIdRef.current)
    ) {
      viewport.releasePointerCapture(pointerIdRef.current);
    }

    pointerIdRef.current = null;
    pointerStartedOnInteractiveRef.current = false;
    didDragRef.current = false;
    setIsDragging(false);
    syncActiveIndex();
  };

  const renderCard = ({
    content,
    icon,
    isDark,
    stats,
    token,
  }: (typeof cards)[number]) => (
    <a
      key={token}
      href={OPEN_IN_APP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${token} in app`}
      draggable={false}
      onClickCapture={(event) => {
        if (didDragRef.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      className={cn(
        "ui-radius-card relative flex h-full flex-col overflow-hidden border p-8 no-underline shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg-light-alt)] md:p-12",
        isDark
          ? "border-[var(--color-border-inverse-soft)] bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)]"
          : "border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-primary)]",
      )}
    >
      {!isDark ? (
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_top_right,rgb(113_178_159_/_0.14),transparent_62%)] blur-3xl" />
      ) : null}

      <div className="relative z-10 flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-sm",
            isDark
              ? "border-[var(--color-border-inverse-soft)] bg-[var(--color-bg-dark-alt)]"
              : "border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)]",
          )}
        >
          <img
            src={icon}
            alt={`${token} icon`}
            draggable={false}
            className="h-12 w-12 object-contain"
          />
        </div>
        <span
          className={cn(
            "text-2xl font-bold tracking-tight",
            isDark
              ? "text-[var(--color-text-inverse)]"
              : "text-[var(--color-text-primary)]",
          )}
        >
          {token}
        </span>
      </div>

      <h3
        className={cn(
          "relative z-10 mt-5 text-2xl md:text-3xl font-bold leading-tight tracking-tight md:mt-5",
          isDark
            ? "text-[var(--color-text-inverse)]"
            : "text-[var(--color-text-primary)]",
        )}
        dangerouslySetInnerHTML={{ __html: content.title }}
      ></h3>
      <p
        className={cn(
          "relative z-10 mt-5 text-sm  md:text-base leading-relaxed",
          isDark
            ? "text-[var(--color-text-muted-softer)]"
            : "text-[var(--color-text-secondary)]",
        )}
      >
        {content.description}
      </p>

      <ul className="relative z-10 my-5 space-y-3 md:mt-5 md:space-y-4">
        {content.features.map((feature) => (
          <li key={feature.name} className="flex items-start gap-3">
            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0 text-[var(--color-brand-alt)]"
            />
            <span
              className={cn(
                "text-sm leading-relaxed",
                isDark
                  ? "text-[var(--color-text-muted-softer)]"
                  : "text-[var(--color-text-secondary)]",
              )}
            >
              <span
                className={cn(
                  "font-semibold",
                  isDark
                    ? "text-[var(--color-text-inverse)]"
                    : "text-[var(--color-text-primary)]",
                )}
              >
                {feature.name}.
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "relative z-10 mt-auto grid grid-cols-3 gap-4 border-t pt-5 md:gap-6",
          isDark
            ? "border-[var(--color-border-inverse-soft)]"
            : "border-[var(--color-border-soft)]",
        )}
        aria-busy={isLoading}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={isLoading ? "animate-pulse" : undefined}
          >
            <div
              className={cn(
                metricLabelClassName,
                isDark
                  ? "text-[var(--color-text-muted-soft)]"
                  : "text-[var(--color-text-secondary)]",
              )}
            >
              {stat.label}
            </div>
            <div
              className={cn(
                metricValueClassName,
                isDark
                  ? "text-[var(--color-text-inverse)]"
                  : "text-[var(--color-text-primary)]",
              )}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </a>
  );

  return (
    <section
      id="synthetic-dollar"
      className="relative overflow-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <SectionContainer className="relative z-10 py-24 lg:py-32">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Indexes"
            title="The credit market, made investable"
            description="Pareto introduces a composable index unit and its yield-bearing counterpart, designed to give onchain access to private credit baskets."
            size="2xl"
            className="max-w-2xl"
          />

          {showHeaderCta ? (
            <div data-testid="synthetic-header-actions">
              <ButtonLink
                href={OPEN_IN_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                className="shadow-lg"
              >
                Explore
              </ButtonLink>
            </div>
          ) : null}
        </div>

        <div
          data-testid="synthetic-desktop-grid"
          className="hidden gap-6 lg:grid lg:grid-cols-2"
        >
          {cards.map((card) => renderCard(card))}
        </div>

        {isMobileSlider ? (
          <>
            <div
              ref={viewportRef}
              data-testid="synthetic-mobile-slider"
              onPointerDown={(event) => {
                const viewport = viewportRef.current;
                if (!viewport) return;

                pointerIdRef.current = event.pointerId;
                pointerStartXRef.current = event.clientX;
                pointerStartYRef.current = event.clientY;
                pointerStartScrollRef.current = viewport.scrollLeft;
                pointerStartedOnInteractiveRef.current =
                  isInteractiveMarqueeTarget(event.target);
                didDragRef.current = false;
                setIsDragging(false);
              }}
              onPointerMove={(event) => {
                if (pointerIdRef.current !== event.pointerId) return;

                const viewport = viewportRef.current;
                if (!viewport) return;

                const deltaX = event.clientX - pointerStartXRef.current;
                const deltaY = event.clientY - pointerStartYRef.current;
                const absX = Math.abs(deltaX);
                const absY = Math.abs(deltaY);

                if (!didDragRef.current) {
                  if (absX <= DRAG_THRESHOLD_PX && absY <= DRAG_THRESHOLD_PX) {
                    return;
                  }

                  if (absY > absX) {
                    pointerIdRef.current = null;
                    pointerStartedOnInteractiveRef.current = false;
                    setIsDragging(false);
                    return;
                  }
                }

                if (!didDragRef.current) {
                  didDragRef.current = true;
                  setIsDragging(true);

                  const hasPointerCapture =
                    typeof viewport.hasPointerCapture === "function" &&
                    viewport.hasPointerCapture(event.pointerId);

                  if (!hasPointerCapture) {
                    viewport.setPointerCapture(event.pointerId);
                  }

                  if (pointerStartedOnInteractiveRef.current) {
                    event.preventDefault();
                  }
                }

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
              className={`marquee-scroll -mx-6 flex overflow-x-auto overflow-y-hidden pb-2 pt-1 select-none snap-x snap-mandatory ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              } lg:hidden`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none shrink-0"
                style={{ flexBasis: "calc(50% - min(42vw, 12.5rem))" }}
              />
              {cards.map((card, index) => (
                <article
                  key={card.token}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  data-testid={`synthetic-mobile-card-${index}`}
                  className={`h-[31rem] w-[84%] max-w-[25rem] shrink-0 snap-center snap-always md:h-auto ${
                    index === cards.length - 1 ? "" : "mr-4"
                  }`}
                >
                  {renderCard(card)}
                </article>
              ))}
              <div
                aria-hidden="true"
                className="pointer-events-none shrink-0"
                style={{ flexBasis: "calc(50% - min(42vw, 12.5rem))" }}
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 lg:hidden">
              {cards.map((card, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={card.token}
                    type="button"
                    aria-label={`Go to synthetic card ${index + 1}`}
                    aria-current={isActive ? "true" : "false"}
                    onClick={() => {
                      const viewport = viewportRef.current;
                      const currentCard = cardRefs.current[index];
                      if (!viewport || !currentCard) return;

                      const nextLeft = getCenteredScrollLeft(
                        viewport,
                        currentCard,
                      );
                      setActiveIndex(index);

                      if (typeof viewport.scrollTo === "function") {
                        viewport.scrollTo({
                          left: nextLeft,
                          behavior: "smooth",
                        });
                      } else {
                        viewport.scrollLeft = nextLeft;
                      }
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-10 bg-[var(--color-text-primary)]"
                        : "w-6 bg-[color:rgb(14_24_19_/_0.16)]"
                    }`}
                  >
                    <span className="sr-only">{card.token}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {!showHeaderCta ? (
          <div
            data-testid="synthetic-footer-actions"
            className="mt-10 flex justify-center lg:mt-12 lg:justify-end"
          >
            <ButtonLink
              href={OPEN_IN_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              className="shadow-lg"
            >
              Explore
            </ButtonLink>
          </div>
        ) : null}
      </SectionContainer>
    </section>
  );
};

export default SyntheticDollarSection;
