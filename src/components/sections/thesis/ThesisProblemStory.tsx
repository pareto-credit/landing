import { useEffect, useId, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Pause, Play } from "lucide-react";
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

interface PlaybackProps {
  paused: boolean;
  onToggle: () => void;
  pageVisible: boolean;
}

const PlaybackToggle = ({ paused, onToggle }: Pick<PlaybackProps, "paused" | "onToggle">) => (
  <button
    type="button"
    className="thesis-story__playback"
    aria-label={paused ? "Resume background videos" : "Pause background videos"}
    onClick={onToggle}
  >
    {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
  </button>
);

/** One full-viewport scene, with one claim, changes as the reader scrolls. */
const StickyStory = ({ paused, onToggle, pageVisible }: PlaybackProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const instanceId = useId();
  const [active, setActive] = useState(0);
  const isInView = useInView(containerRef, { amount: 0.05 });
  const shouldLoad = useLoadWhenNear(containerRef);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!Number.isFinite(progress)) return;
    const next = Math.min(thesisProblems.length - 1, Math.max(0, Math.floor(progress * thesisProblems.length)));
    setActive((current) => (current === next ? current : next));
  });

  const selectScene = (index: number) => {
    setActive(index);
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const travel = Math.max(0, bounds.height - window.innerHeight);
    window.scrollTo({
      top: window.scrollY + bounds.top + travel * index / (thesisProblems.length - 1),
      behavior: "auto",
    });
  };

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % thesisProblems.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + thesisProblems.length) % thesisProblems.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = thesisProblems.length - 1;
    else return;
    event.preventDefault();
    selectScene(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={containerRef} className="thesis-story thesis-story--sticky" style={{ height: `${thesisProblems.length * 100}svh` }}>
      <div className="thesis-story__viewport">
        <div className="thesis-story__media" aria-hidden="true">
          {thesisProblems.map((problem, index) => (
            <StoryVideo
              key={problem.video}
              video={problem.video}
              shouldLoad={shouldLoad}
              play={isInView && pageVisible && index === active && !paused}
              className={index === active ? "thesis-story__video thesis-story__video--active" : "thesis-story__video"}
            />
          ))}
        </div>
        <div className="thesis-story__shade" aria-hidden="true" />
        <div className="thesis-story__controls">
          <div role="tablist" aria-label="Constraint scenes" className="thesis-story__scene-tabs">
            {thesisProblems.map((problem, index) => (
              <button
                key={problem.video}
                ref={(node) => { tabs.current[index] = node; }}
                type="button"
                role="tab"
                id={`${instanceId}-scene-tab-${index}`}
                aria-label={`Scene ${index + 1}: ${problem.label}`}
                aria-controls={`${instanceId}-scene-${index}`}
                aria-selected={active === index}
                tabIndex={active === index ? 0 : -1}
                onClick={() => selectScene(index)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
              >
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="thesis-story__content">
          {thesisProblems.map((problem, index) => (
            <div
              key={problem.video}
              role="tabpanel"
              id={`${instanceId}-scene-${index}`}
              aria-labelledby={`${instanceId}-scene-tab-${index}`}
              hidden={index !== active}
              tabIndex={0}
              className="thesis-story__claim"
            >
              <h3>{problem.title}</h3>
            </div>
          ))}
        </div>
        <div className="thesis-story__controls thesis-story__controls--playback">
          <PlaybackToggle paused={paused} onToggle={onToggle} />
        </div>
        <a href="#opportunity" className="thesis-story__skip">Skip to the opportunity</a>
      </div>
    </div>
  );
};

const StackedStep = ({ index, paused, onToggle, pageVisible }: { index: number } & PlaybackProps) => {
  const ref = useRef<HTMLLIElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const shouldLoad = useLoadWhenNear(ref);
  const problem = thesisProblems[index];

  return (
    <li ref={ref} className="thesis-story__stacked-step">
      <div className="thesis-story__media" aria-hidden="true">
        <StoryVideo
          video={problem.video}
          shouldLoad={shouldLoad}
          play={isInView && pageVisible && !paused}
          className="thesis-story__video thesis-story__video--active"
        />
      </div>
      <div className="thesis-story__shade" aria-hidden="true" />
      <div className="thesis-story__content"><h3>{problem.title}</h3></div>
      <div className="thesis-story__controls">
        <span className="thesis-story__scene-number" aria-hidden="true">{String(index + 1).padStart(2, "0")} / 03</span>
        <PlaybackToggle paused={paused} onToggle={onToggle} />
      </div>
    </li>
  );
};

/** Smaller screens use full-height scenes in the document's natural scroll flow. */
const StackedStory = (props: PlaybackProps) => (
  <ol className="thesis-story thesis-story--stacked">
    {thesisProblems.map((problem, index) => (
      <StackedStep key={problem.video} index={index} {...props} />
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
  const [paused, setPaused] = useState(false);
  const playback = { paused, onToggle: () => setPaused((current) => !current), pageVisible };
  if (reducedMotion) return <PosterStory />;
  return isDesktop ? <StickyStory {...playback} /> : <StackedStory {...playback} />;
};

export default ThesisProblemStory;
