import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { MoveRight } from "lucide-react";
import newsPlaceholder from "../../assets/svgs/news-placeholder.svg";
import { PARAGRAPH_BLOG_URL } from "../../data/news";
import { useMinWidth } from "../../hooks/useMinWidth";
import { useParagraphFeed } from "../../hooks/useParagraphFeed";
import type { NewsArticle } from "../../types/news";
import { ButtonLink } from "../ui/Button";
import { SectionContainer, SectionHeading } from "../ui/Section";

const NEWS_SKELETON_COUNT = 3;
const DRAG_THRESHOLD_PX = 4;

const isInteractiveMarqueeTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(
    target.closest(
      "a, button, input, select, textarea, summary, [role='button'], [role='link']",
    ),
  );

const NewsSection = () => {
  const { articles, isLoading } = useParagraphFeed(NEWS_SKELETON_COUNT);
  const showHeaderCta = useMinWidth(768);
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
  const isMobileSlider = !showHeaderCta && !isLoading && articles.length > 0;

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.onerror = null;
    image.src = newsPlaceholder;
  };

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

  const getCenteredScrollLeft = (
    viewport: HTMLDivElement,
    card: HTMLElement,
  ) => Math.max(0, card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2);

  const syncActiveIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport || !isMobileSlider) return;

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

  const renderArticleCard = (article: NewsArticle) => (
    <a
      key={article.id}
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      onClickCapture={(event) => {
        if (didDragRef.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      className="group block cursor-pointer"
    >
      <div className="relative mb-5 h-40 w-full overflow-hidden rounded border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] transition-colors group-hover:border-[color:rgb(112_177_158_/_0.50)] xl:h-44">
        <img
          src={article.image || newsPlaceholder}
          alt={article.title}
          loading="lazy"
          draggable={false}
          onError={handleImageError}
          className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:rgb(14_24_19_/_0.28)] via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-brand-alt)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-90" />
      </div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {article.date}
        </span>
        <span className="rounded border border-[var(--color-border-soft)] bg-[var(--color-chip-bg)] px-2 py-1 font-mono text-[10px] text-[var(--color-brand-deep)]">
          {article.tag}
        </span>
      </div>
      <h4 className="mb-3 text-base font-bold text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-brand-alt)] xl:text-lg">
        {article.title}
      </h4>
      {article.excerpt ? (
        <p className="mb-4 min-h-[3rem] text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {article.excerpt}
        </p>
      ) : null}
      <div className="flex items-center gap-2 font-mono text-sm text-[var(--color-text-secondary)]">
        Read Article <MoveRight size={14} />
        <span className="text-xs text-[var(--color-text-muted)]">
          {article.readTime}
        </span>
      </div>
    </a>
  );

  return (
    <section
      id="news"
      className="ui-section-fit relative bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full blur-[120px]" />
      <SectionContainer className="ui-section-shell">
        <div className="mb-8 flex flex-col items-end justify-between gap-4 md:flex-row xl:mb-10">
          <SectionHeading
            eyebrow="Insights"
            title="Research, market structure, and onchain credit"
            size="2xl"
            titleClassName="text-4xl text-[var(--color-text-primary)] md:text-4xl"
            descriptionClassName="text-[var(--color-text-secondary)]"
          />

          {showHeaderCta ? (
            <div data-testid="news-header-actions">
              <ButtonLink
                href={PARAGRAPH_BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="md"
                className="text-[var(--color-text-primary)]"
              >
                View All Articles
              </ButtonLink>
            </div>
          ) : null}
        </div>

        <div data-testid="news-grid" className="hidden gap-5 md:grid md:grid-cols-3 xl:gap-6">
          {isLoading
            ? Array.from({ length: NEWS_SKELETON_COUNT }).map((_, index) => (
                <div
                  key={`news-skeleton-${index}`}
                  role="status"
                  className="animate-pulse"
                >
                  <div className="mb-5 h-40 w-full rounded border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] xl:h-44" />
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="h-3 w-24 rounded-full bg-[var(--color-surface-muted)]" />
                    <div className="h-5 w-20 rounded bg-[var(--color-surface-muted)]" />
                  </div>
                  <div className="mb-3 h-6 w-11/12 rounded bg-[var(--color-surface-muted)]" />
                  <div className="mb-3 h-6 w-8/12 rounded bg-[var(--color-surface-muted)]" />
                  <div className="mb-4 space-y-2">
                    <div className="h-3 w-full rounded bg-[var(--color-surface-muted)]" />
                    <div className="h-3 w-10/12 rounded bg-[var(--color-surface-muted)]" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-24 rounded bg-[var(--color-surface-muted)]" />
                    <div className="h-4 w-14 rounded bg-[var(--color-surface-muted)]" />
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              ))
            : articles.map((article) => renderArticleCard(article))}
        </div>

        {isMobileSlider ? (
          <>
            <div
              ref={viewportRef}
              data-testid="news-mobile-slider"
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
              } md:hidden`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none shrink-0"
                style={{ flexBasis: "calc(50% - min(42vw, 12.5rem))" }}
              />
              {articles.map((article, index) => (
                <article
                  key={article.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  data-testid={`news-mobile-card-${index}`}
                  className={`w-[84%] max-w-[25rem] shrink-0 snap-center snap-always ${
                    index === articles.length - 1 ? "" : "mr-4"
                  }`}
                >
                  {renderArticleCard(article)}
                </article>
              ))}
              <div
                aria-hidden="true"
                className="pointer-events-none shrink-0"
                style={{ flexBasis: "calc(50% - min(42vw, 12.5rem))" }}
              />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
              {articles.map((article, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={article.id}
                    type="button"
                    aria-label={`Go to news card ${index + 1}`}
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
                        ? "w-10 bg-[var(--color-text-primary)]"
                        : "w-6 bg-[color:rgb(14_24_19_/_0.16)]"
                    }`}
                  >
                    <span className="sr-only">{article.title}</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : null}

        {!showHeaderCta ? (
          <div
            data-testid="news-footer-actions"
            className="mt-10 flex justify-center md:mt-12 md:justify-end"
          >
            <ButtonLink
              href={PARAGRAPH_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
              className="text-[var(--color-text-primary)]"
            >
              View All Articles
            </ButtonLink>
          </div>
        ) : null}
      </SectionContainer>
    </section>
  );
};

export default NewsSection;
