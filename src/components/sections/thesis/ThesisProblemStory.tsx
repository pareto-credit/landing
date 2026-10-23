import { useEffect, useRef, useState, type RefObject } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import financialMarketVideo from "../../../assets/videos/financial-market.mp4";
import tradingDeskVideo from "../../../assets/videos/trading-desk.mp4";
import financialDocumentsVideo from "../../../assets/videos/financial-docs.mp4";
import financialMarketPoster from "../../../assets/images/thesis/financial-market-poster.jpg";
import tradingDeskPoster from "../../../assets/images/thesis/trading-desk-poster.jpg";
import financialDocumentsPoster from "../../../assets/images/thesis/financial-docs-poster.jpg";
import { thesisConstraints, thesisProblems, type ThesisProblemVideo } from "../../../data/thesis";
import { useMinWidth } from "../../../hooks/useMinWidth";

const VIDEO_SOURCES: Record<ThesisProblemVideo, { src: string; poster: string }> = {
  market: { src: financialMarketVideo, poster: financialMarketPoster },
  desk: { src: tradingDeskVideo, poster: tradingDeskPoster },
  documents: { src: financialDocumentsVideo, poster: financialDocumentsPoster },
};

const DESKTOP_MIN_WIDTH = 1024;
const LOAD_AHEAD_MARGIN = "1200px 0px";

const constraintCopy = (title: string) => thesisConstraints.find((item) => item.title === title)?.copy ?? "";

/** Plays only while asked to; never throws where media playback is unavailable. */
const StoryVideo = ({ video, shouldLoad, play, className }: { video: ThesisProblemVideo; shouldLoad: boolean; play: boolean; className?: string }) => {
  const src = shouldLoad ? VIDEO_SOURCES[video].src : undefined;
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !src) return;
    if (!play) {
      element.pause?.();
      return;
    }
    try {
      const result = element.play?.();
      if (result && typeof result.catch === "function") result.catch(() => undefined);
    } catch {
      // Autoplay can be refused (power saving, data saver); the first frame stays visible.
    }
  }, [play, src]);

  return (
    <video
      ref={ref}
      data-video={video}
      src={src}
      poster={shouldLoad ? VIDEO_SOURCES[video].poster : undefined}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden="true"
      className={className}
    />
  );
};

/** Lazy-loads the videos once the story is within reach of the viewport. */
const useLoadWhenNear = (ref: RefObject<HTMLElement | null>) => {
  // Without IntersectionObserver there is no way to defer, so load straight away.
  const [shouldLoad, setShouldLoad] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || shouldLoad) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: LOAD_AHEAD_MARGIN },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, shouldLoad]);

  return shouldLoad;
};

const ProblemCopy = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const problem = thesisProblems[index];
  return (
    <article className="thesis-story__step" data-active={isActive || undefined} aria-current={isActive ? "step" : undefined}>
      <span className="thesis-story__label">
        <span>{String(index + 1).padStart(2, "0")}</span>
        {problem.label}
      </span>
      <h3>{problem.title}</h3>
      <ul className="thesis-story__frictions">
        {problem.frictions.map((title) => (
          <li key={title}>
            <strong>{title}</strong>
            <span>{constraintCopy(title)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
};

/** Desktop: one sticky video window that changes as the reader scrolls through the three problems. */
const StickyStory = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(containerRef, { amount: 0.15 });
  const shouldLoad = useLoadWhenNear(containerRef);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(thesisProblems.length - 1, Math.max(0, Math.floor(progress * thesisProblems.length)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <div ref={containerRef} className="thesis-story thesis-story--sticky" style={{ height: `${thesisProblems.length * 90}svh` }}>
      <div className="thesis-story__viewport">
        <div className="thesis-story__copy">
          <div className="thesis-story__progress" aria-hidden="true">
            <span>{String(active + 1).padStart(2, "0")} / {String(thesisProblems.length).padStart(2, "0")}</span>
            <span className="thesis-story__progress-track">
              <span style={{ transform: `scaleX(${(active + 1) / thesisProblems.length})` }} />
            </span>
          </div>
          {thesisProblems.map((problem, index) => (
            <ProblemCopy key={problem.video} index={index} isActive={index === active} />
          ))}
        </div>
        <div className="thesis-story__frame">
          {thesisProblems.map((problem, index) => (
            <StoryVideo
              key={problem.video}
              video={problem.video}
              shouldLoad={shouldLoad}
              play={isInView && index === active && !shouldReduceMotion}
              className={index === active ? "thesis-story__video thesis-story__video--active" : "thesis-story__video"}
            />
          ))}
          <div className="thesis-story__caption" aria-hidden="true">
            <span>{String(active + 1).padStart(2, "0")}</span>
            {thesisProblems[active].label}
          </div>
        </div>
      </div>
    </div>
  );
};

const StackedStep = ({ index }: { index: number }) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { amount: 0.5 });
  const shouldLoad = useLoadWhenNear(ref);
  const problem = thesisProblems[index];

  return (
    <li ref={ref} className="thesis-story__stacked-step">
      <div className="thesis-story__frame">
        <StoryVideo
          video={problem.video}
          shouldLoad={shouldLoad}
          play={isInView && !shouldReduceMotion}
          className="thesis-story__video thesis-story__video--active"
        />
      </div>
      <ProblemCopy index={index} isActive />
    </li>
  );
};

/** Tablet and phone: the same three problems as stacked cards, no scroll-linked motion. */
const StackedStory = () => (
  <ol className="thesis-story thesis-story--stacked">
    {thesisProblems.map((problem, index) => (
      <StackedStep key={problem.video} index={index} />
    ))}
  </ol>
);

const ThesisProblemStory = () => {
  const isDesktop = useMinWidth(DESKTOP_MIN_WIDTH);
  return isDesktop ? <StickyStory /> : <StackedStory />;
};

export default ThesisProblemStory;
