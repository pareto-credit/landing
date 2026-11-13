import { useEffect, useRef, useState, type RefObject } from "react";
import { easeInOut, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import financialMarketVideo from "../../../assets/videos/financial-market.mp4";
import tradingDeskVideo from "../../../assets/videos/trading-desk.mp4";
import financialDocumentsVideo from "../../../assets/videos/financial-docs.mp4";
import financialMarketPoster from "../../../assets/images/thesis/financial-market-poster.jpg";
import tradingDeskPoster from "../../../assets/images/thesis/trading-desk-poster.jpg";
import financialDocumentsPoster from "../../../assets/images/thesis/financial-docs-poster.jpg";
import { thesisProblems, type ThesisProblemVideo } from "../../../data/thesis";
import { useMinWidth } from "../../../hooks/useMinWidth";
import { usePageVisibility } from "../../../hooks/usePageVisibility";

const VIDEO_SOURCES: Record<ThesisProblemVideo, { src: string; poster: string }> = {
  market: { src: financialMarketVideo, poster: financialMarketPoster },
  desk: { src: tradingDeskVideo, poster: tradingDeskPoster },
  documents: { src: financialDocumentsVideo, poster: financialDocumentsPoster },
};

const DESKTOP_MIN_WIDTH = 1024;
const LOAD_AHEAD_MARGIN = "1200px 0px";

/** Plays only while asked to; never throws where media playback is unavailable. */
const StoryVideo = ({ video, shouldLoad, play, className }: { video: ThesisProblemVideo; shouldLoad: boolean; play: boolean; className?: string }) => {
  const src = shouldLoad ? VIDEO_SOURCES[video].src : undefined;
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !src) return;
    const pause = () => element.pause();
    if (!play) {
      pause();
    } else {
      try {
        element.play()?.catch(() => undefined);
      } catch {
        // Autoplay can be refused; the poster remains available.
      }
    }
    return pause;
  }, [play, src]);

  return (
    <video
      ref={ref}
      data-video={video}
      src={src}
      poster={VIDEO_SOURCES[video].poster}
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

const StoryClaim = ({ title, progress, start = 0, end = 1, active = true, initiallyVisible = false }: {
  title: string;
  progress: MotionValue<number>;
  start?: number;
  end?: number;
  active?: boolean;
  initiallyVisible?: boolean;
}) => {
  const fadeDistance = (end - start) * 0.27;
  const stops = [start, start + fadeDistance, end - fadeDistance, end];
  const opacity = useTransform(progress, stops, [initiallyVisible ? 1 : 0, 1, 1, 0], { ease: easeInOut });
  const y = useTransform(progress, stops, [initiallyVisible ? 0 : 44, 0, 0, -44], { ease: easeInOut });

  return <motion.h3 aria-hidden={!active || undefined} style={{ opacity, y }}>{title}</motion.h3>;
};

/** One full-viewport scene, with one claim, changes as the reader scrolls. */
const StickyStory = ({ pageVisible }: { pageVisible: boolean }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const isInView = useInView(containerRef, { amount: 0.05 });
  const shouldLoad = useLoadWhenNear(containerRef);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!Number.isFinite(progress)) return;
    const next = Math.min(thesisProblems.length - 1, Math.max(0, Math.floor(progress * thesisProblems.length)));
    setActive((current) => (current === next ? current : next));
  });

  return (
    <div ref={containerRef} className="thesis-story thesis-story--sticky" style={{ height: `${thesisProblems.length * 100}svh` }}>
      <div className="thesis-story__viewport">
        <div className="thesis-story__media" aria-hidden="true">
          {thesisProblems.map((problem, index) => (
            <StoryVideo
              key={problem.video}
              video={problem.video}
              shouldLoad={shouldLoad}
              play={isInView && pageVisible && index === active}
              className={index === active ? "thesis-story__video thesis-story__video--active" : "thesis-story__video"}
            />
          ))}
        </div>
        <div className="thesis-story__shade" aria-hidden="true" />
        <div className="thesis-story__content">
          {thesisProblems.map((problem, index) => (
            <StoryClaim
              key={problem.video}
              title={problem.title}
              progress={scrollYProgress}
              start={index / thesisProblems.length}
              end={(index + 1) / thesisProblems.length}
              active={index === active}
              initiallyVisible={index === 0}
            />
          ))}
        </div>
        <a href="#opportunity" className="thesis-story__skip">Skip to the opportunity</a>
      </div>
    </div>
  );
};

const StackedStep = ({ problem, pageVisible, initiallyVisible }: {
  problem: typeof thesisProblems[number];
  pageVisible: boolean;
  initiallyVisible: boolean;
}) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const shouldLoad = useLoadWhenNear(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <li ref={ref} className="thesis-story__stacked-step">
      <div className="thesis-story__media" aria-hidden="true">
        <StoryVideo
          video={problem.video}
          shouldLoad={shouldLoad}
          play={isInView && pageVisible}
          className="thesis-story__video thesis-story__video--active"
        />
      </div>
      <div className="thesis-story__shade" aria-hidden="true" />
      <div className="thesis-story__content">
        <StoryClaim title={problem.title} progress={scrollYProgress} initiallyVisible={initiallyVisible} />
      </div>
    </li>
  );
};

/** Smaller screens use full-height scenes in the document's natural scroll flow. */
const StackedStory = ({ pageVisible }: { pageVisible: boolean }) => (
  <ol className="thesis-story thesis-story--stacked">
    {thesisProblems.map((problem, index) => (
      <StackedStep key={problem.video} problem={problem} pageVisible={pageVisible} initiallyVisible={index === 0} />
    ))}
  </ol>
);

/** Reduced motion: every claim remains readable over its existing still image. */
const PosterStory = () => (
  <ol className="thesis-story thesis-story--posters">
    {thesisProblems.map((problem) => (
      <li key={problem.video} className="thesis-story__stacked-step">
        <img src={VIDEO_SOURCES[problem.video].poster} alt="" loading="lazy" decoding="async" className="thesis-story__poster" />
        <div className="thesis-story__shade" aria-hidden="true" />
        <div className="thesis-story__content"><h3>{problem.title}</h3></div>
      </li>
    ))}
  </ol>
);

const ThesisProblemStory = () => {
  const isDesktop = useMinWidth(DESKTOP_MIN_WIDTH);
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();
  if (reducedMotion) return <PosterStory />;
  return isDesktop ? <StickyStory pageVisible={pageVisible} /> : <StackedStory pageVisible={pageVisible} />;
};

export default ThesisProblemStory;
