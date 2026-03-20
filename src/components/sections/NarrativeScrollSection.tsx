import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import financialMarketVideo from "../../assets/videos/financial-market.mp4";
import tradingDeskVideo from "../../assets/videos/trading-desk.mp4";
import financialDocumentsVideo from "../../assets/videos/financial-docs.mp4";
import hyperCityVideo from "../../assets/videos/hyper-city.mp4";
import paretoMarkGlass from "../../assets/svgs/pareto-mark-glass.svg";
import { cn } from "../../lib/cn";

const NAVBAR_OFFSET_PX = 96;
const WINDOW_TOP_PX = 64;
const WINDOW_BOTTOM_PX = 64;
const WINDOW_RIGHT_PX = 64;
const WINDOW_LEFT_RATIO = 0.55;
export const WINDOW_RADIUS_PX = 10;
const WINDOW_SAFE_TOP_PX = NAVBAR_OFFSET_PX + 16;
const VIDEO_LOAD_AHEAD_MARGIN = "1200px 0px";
const NARRATIVE_SCROLL_HEIGHT_CLASS = "h-[480vh]";

type NarrativeVideoKey =
  | "serverRoom"
  | "tradingDesk"
  | "financialDocuments"
  | "hyperCity";

const NARRATIVE_VIDEO_ASSETS: Record<NarrativeVideoKey, { src: string }> = {
  serverRoom: {
    src: financialMarketVideo,
  },
  tradingDesk: {
    src: tradingDeskVideo,
  },
  financialDocuments: {
    src: financialDocumentsVideo,
  },
  hyperCity: {
    src: hyperCityVideo,
  },
};

const NARRATIVE_VIDEO_KEYS: NarrativeVideoKey[] = [
  "serverRoom",
  "tradingDesk",
  "financialDocuments",
  "hyperCity",
];

const SLIDE_1_EXIT_START = 0.14;
const SLIDE_1_EXIT_END = 0.2;
const SLIDE_2_EXIT_START = 0.43;
const SLIDE_2_EXIT_END = 0.49;
const SLIDE_3_EXIT_START = 0.72;
const SLIDE_3_EXIT_END = 0.78;
const CLIMAX_FADE_IN_START = 0.76;
const CLIMAX_FADE_IN_END = 0.83;

export const getVisibleVideoKeys = (progress: number): NarrativeVideoKey[] => {
  if (progress < SLIDE_1_EXIT_START) return ["serverRoom"];
  if (progress < SLIDE_1_EXIT_END) return ["serverRoom", "tradingDesk"];
  if (progress < SLIDE_2_EXIT_START) return ["tradingDesk"];
  if (progress < SLIDE_2_EXIT_END) return ["tradingDesk", "financialDocuments"];
  if (progress < SLIDE_3_EXIT_START) return ["financialDocuments"];
  if (progress < SLIDE_3_EXIT_END) return ["financialDocuments", "hyperCity"];

  return ["hyperCity"];
};

const getPreloadVideoKeys = (progress: number): NarrativeVideoKey[] => {
  if (progress < SLIDE_1_EXIT_END) return ["serverRoom", "tradingDesk"];
  if (progress < SLIDE_2_EXIT_END) return ["tradingDesk", "financialDocuments"];
  if (progress < SLIDE_3_EXIT_END) return ["financialDocuments", "hyperCity"];

  return ["hyperCity"];
};

const sameVideoKeys = (
  current: NarrativeVideoKey[],
  next: NarrativeVideoKey[],
) =>
  current.length === next.length &&
  current.every((key, index) => key === next[index]);

const shouldEnableFullNarrative = (): boolean => {
  if (typeof window === "undefined") return false;

  const value = new URLSearchParams(window.location.search).get(
    "enableFullNarrative",
  );
  if (value === null) return false;

  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
};

const NarrativeScrollSection = () => {
  const isFullNarrativeEnabled = useMemo(() => shouldEnableFullNarrative(), []);
  const containerRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Record<NarrativeVideoKey, HTMLVideoElement | null>>({
    serverRoom: null,
    tradingDesk: null,
    financialDocuments: null,
    hyperCity: null,
  });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
  const [activeVideoKeys, setActiveVideoKeys] = useState<NarrativeVideoKey[]>([
    "serverRoom",
  ]);
  const [loadedVideoKeys, setLoadedVideoKeys] = useState<
    Record<NarrativeVideoKey, boolean>
  >({
    serverRoom: false,
    tradingDesk: false,
    financialDocuments: false,
    hyperCity: false,
  });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Slide 1: The Legacy
  const opacity1 = useTransform(
    scrollYProgress,
    [0, SLIDE_1_EXIT_START, SLIDE_1_EXIT_END],
    [1, 1, 0],
  );
  const y1 = useTransform(scrollYProgress, [0, SLIDE_1_EXIT_END], [0, -40]);
  const vidOpacity1 = useTransform(
    scrollYProgress,
    [0, SLIDE_1_EXIT_END],
    [1, 0],
  );

  // Slide 2: The Patchwork
  const opacity2 = useTransform(
    scrollYProgress,
    [
      SLIDE_1_EXIT_START,
      SLIDE_1_EXIT_END,
      SLIDE_2_EXIT_START,
      SLIDE_2_EXIT_END,
    ],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [
      SLIDE_1_EXIT_START,
      SLIDE_1_EXIT_END,
      SLIDE_2_EXIT_START,
      SLIDE_2_EXIT_END,
    ],
    [40, 0, 0, -40],
  );
  const vidOpacity2 = useTransform(
    scrollYProgress,
    [
      SLIDE_1_EXIT_START,
      SLIDE_1_EXIT_END,
      SLIDE_2_EXIT_START,
      SLIDE_2_EXIT_END,
    ],
    [0, 1, 1, 0],
  );

  // Slide 3: The Friction
  const opacity3 = useTransform(
    scrollYProgress,
    [
      SLIDE_2_EXIT_START,
      SLIDE_2_EXIT_END,
      SLIDE_3_EXIT_START,
      CLIMAX_FADE_IN_START,
    ],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(
    scrollYProgress,
    [
      SLIDE_2_EXIT_START,
      SLIDE_2_EXIT_END,
      SLIDE_3_EXIT_START,
      CLIMAX_FADE_IN_START,
    ],
    [40, 0, 0, -40],
  );
  const vidOpacity3 = useTransform(
    scrollYProgress,
    [
      SLIDE_2_EXIT_START,
      SLIDE_2_EXIT_END,
      SLIDE_3_EXIT_START,
      CLIMAX_FADE_IN_START,
    ],
    [0, 1, 1, 0],
  );

  // General Fade out for the split-screen section
  const splitScreenOpacity = useTransform(
    scrollYProgress,
    [0.75, 0.82],
    [1, 0],
  );
  const frostyTintAlpha = useTransform(
    scrollYProgress,
    [0, 0.75, 0.82],
    [0.2, 0.2, 0],
  );
  const frostyBorderAlpha = useTransform(
    scrollYProgress,
    [0, 0.75, 0.82],
    [0.3, 0.3, 0],
  );
  const frostyTint = useMotionTemplate`rgba(255, 255, 255, ${frostyTintAlpha})`;
  const frostyBorder = useMotionTemplate`rgba(255, 255, 255, ${frostyBorderAlpha})`;

  // Slide 4: Climax (Pareto - Full Screen)
  const climaxOpacity = useTransform(
    scrollYProgress,
    [CLIMAX_FADE_IN_START, CLIMAX_FADE_IN_END, 1],
    [0, 1, 1],
  );
  const climaxScale = useTransform(
    scrollYProgress,
    [CLIMAX_FADE_IN_START, 1],
    [0.95, 1],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateSize = () => {
      setViewportSize({
        width: viewport.clientWidth,
        height: viewport.clientHeight,
      });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(viewport);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldLoadVideos) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;

        setShouldLoadVideos(true);
        observer.disconnect();
      },
      { rootMargin: VIDEO_LOAD_AHEAD_MARGIN },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [shouldLoadVideos]);

  useEffect(() => {
    if (!shouldLoadVideos) return;

    const progress = scrollYProgress.get();
    const initialActiveKeys = getVisibleVideoKeys(progress);
    const initialPreloadKeys = getPreloadVideoKeys(progress);

    startTransition(() => {
      setActiveVideoKeys(initialActiveKeys);
      setLoadedVideoKeys((current) => {
        let changed = false;
        const next = { ...current };

        for (const key of initialPreloadKeys) {
          if (next[key]) continue;

          next[key] = true;
          changed = true;
        }

        return changed ? next : current;
      });
    });
  }, [scrollYProgress, shouldLoadVideos]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!shouldLoadVideos) return;

    const nextActiveKeys = getVisibleVideoKeys(latest);
    const nextPreloadKeys = getPreloadVideoKeys(latest);

    startTransition(() => {
      setActiveVideoKeys((current) =>
        sameVideoKeys(current, nextActiveKeys) ? current : nextActiveKeys,
      );
      setLoadedVideoKeys((current) => {
        let changed = false;
        const next = { ...current };

        for (const key of nextPreloadKeys) {
          if (next[key]) continue;

          next[key] = true;
          changed = true;
        }

        return changed ? next : current;
      });
    });
  });

  useEffect(() => {
    for (const key of NARRATIVE_VIDEO_KEYS) {
      const video = videoRefs.current[key];
      if (!video) continue;

      if (!shouldLoadVideos || !loadedVideoKeys[key]) {
        video.pause();
        continue;
      }

      if (!activeVideoKeys.includes(key)) {
        video.pause();
        continue;
      }

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    }
  }, [activeVideoKeys, loadedVideoKeys, shouldLoadVideos]);

  const windowRect = useMemo(() => {
    const width = viewportSize.width;
    const height = viewportSize.height;
    const left = width * WINDOW_LEFT_RATIO;
    const top = Math.max(WINDOW_TOP_PX, WINDOW_SAFE_TOP_PX);
    const windowWidth = Math.max(0, width - left - WINDOW_RIGHT_PX);
    const windowHeight = Math.max(0, height - top - WINDOW_BOTTOM_PX);
    const radius = Math.max(
      0,
      Math.min(WINDOW_RADIUS_PX, windowWidth / 2, windowHeight / 2),
    );

    return {
      left,
      top,
      width: windowWidth,
      height: windowHeight,
      radius,
    };
  }, [viewportSize.height, viewportSize.width]);

  const frostyDesktopClipPath = useMemo(() => {
    if (
      !viewportSize.width ||
      !viewportSize.height ||
      !windowRect.width ||
      !windowRect.height
    ) {
      return undefined;
    }

    const x = windowRect.left;
    const y = windowRect.top;
    const w = windowRect.width;
    const h = windowRect.height;
    const r = windowRect.radius;
    const right = x + w;
    const bottom = y + h;

    const outerPath = `M0 0 H${viewportSize.width} V${viewportSize.height} H0 Z`;
    const innerPath = [
      `M${x + r} ${y}`,
      `A${r} ${r} 0 0 0 ${x} ${y + r}`,
      `V${bottom - r}`,
      `A${r} ${r} 0 0 0 ${x + r} ${bottom}`,
      `H${right - r}`,
      `A${r} ${r} 0 0 0 ${right} ${bottom - r}`,
      `V${y + r}`,
      `A${r} ${r} 0 0 0 ${right - r} ${y}`,
      `H${x + r}`,
      "Z",
    ].join(" ");

    return `path("${outerPath} ${innerPath}")`;
  }, [
    viewportSize.height,
    viewportSize.width,
    windowRect.height,
    windowRect.left,
    windowRect.radius,
    windowRect.top,
    windowRect.width,
  ]);

  const narrativeTextRailClassName = isFullNarrativeEnabled
    ? "relative flex h-full w-full flex-col items-center justify-center px-8 text-center lg:px-24"
    : "relative flex h-full w-full flex-col justify-center px-8 pointer-events-auto lg:w-[55%] lg:pl-24 lg:pr-16";

  const narrativeSlideClassName = isFullNarrativeEnabled
    ? "absolute top-1/2 left-1/2 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2"
    : "absolute top-1/2 left-8 right-8 -translate-y-1/2 lg:left-24 lg:right-16";

  const narrativeEyebrowClassName = cn(
    "mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--color-brand-alt)] uppercase",
    isFullNarrativeEnabled && "justify-center",
  );

  const narrativeHeadingClassName = cn(
    "mb-6 text-4xl leading-[1.1] font-medium tracking-tight text-[var(--color-text-inverse)] md:text-5xl",
    isFullNarrativeEnabled &&
      "mx-auto max-w-4xl text-center drop-shadow-[0_12px_30px_rgba(0,0,0,0.45)]",
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative bg-[var(--color-bg-narrative)]",
        NARRATIVE_SCROLL_HEIGHT_CLASS,
      )}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen w-full overflow-hidden bg-[var(--color-bg-narrative)]"
      >
        {/* Layer 1: Full-screen background videos */}
        <motion.div
          style={{ opacity: splitScreenOpacity }}
          className="absolute inset-0 z-0 transform-gpu will-change-[opacity]"
        >
          <motion.div
            style={{ opacity: vidOpacity1 }}
            className="absolute inset-0 h-full w-full transform-gpu will-change-[opacity]"
          >
            <video
              ref={(node) => {
                videoRefs.current.serverRoom = node;
              }}
              src={
                loadedVideoKeys.serverRoom
                  ? NARRATIVE_VIDEO_ASSETS.serverRoom.src
                  : undefined
              }
              loop
              muted
              playsInline
              preload={
                activeVideoKeys.includes("serverRoom") ? "auto" : "metadata"
              }
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              className="h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
            />
          </motion.div>
          <motion.div
            style={{ opacity: vidOpacity2 }}
            className="absolute inset-0 h-full w-full transform-gpu will-change-[opacity]"
          >
            <video
              ref={(node) => {
                videoRefs.current.tradingDesk = node;
              }}
              src={
                loadedVideoKeys.tradingDesk
                  ? NARRATIVE_VIDEO_ASSETS.tradingDesk.src
                  : undefined
              }
              loop
              muted
              playsInline
              preload={
                activeVideoKeys.includes("tradingDesk") ? "auto" : "metadata"
              }
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              className="h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
            />
          </motion.div>
          <motion.div
            style={{ opacity: vidOpacity3 }}
            className="absolute inset-0 h-full w-full transform-gpu will-change-[opacity]"
          >
            <video
              ref={(node) => {
                videoRefs.current.financialDocuments = node;
              }}
              src={
                loadedVideoKeys.financialDocuments
                  ? NARRATIVE_VIDEO_ASSETS.financialDocuments.src
                  : undefined
              }
              loop
              muted
              playsInline
              preload={
                activeVideoKeys.includes("financialDocuments")
                  ? "auto"
                  : "metadata"
              }
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden="true"
              className="h-full w-full object-cover [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
            />
          </motion.div>
        </motion.div>

        {isFullNarrativeEnabled ? null : (
          <>
            {/* Contrast layer to keep frosty perceived opacity stable on bright/dark frames */}
            <motion.div
              style={{ opacity: splitScreenOpacity }}
              className="pointer-events-none absolute inset-0 z-[5] hidden bg-[color:rgb(2_5_4_/_0.25)] lg:block"
            ></motion.div>

            {/* Layer 2: Frosted glass mask */}
            <motion.div className="pointer-events-none absolute inset-0 z-10">
              {/* Desktop: single frosty layer with rounded transparent cutout */}
              <motion.div
                style={{
                  backgroundColor: frostyTint,
                  opacity: splitScreenOpacity,
                  clipPath: frostyDesktopClipPath,
                }}
                className="absolute inset-0 hidden backdrop-blur-xl lg:block"
              ></motion.div>

              <motion.div
                style={{
                  left: windowRect.left,
                  top: windowRect.top,
                  width: windowRect.width,
                  height: windowRect.height,
                  borderRadius: windowRect.radius,
                  borderColor: frostyBorder,
                  opacity: splitScreenOpacity,
                }}
                className="pointer-events-none absolute hidden border shadow-[0_0_50px_rgba(255,255,255,0.05),inset_0_0_80px_rgba(0,0,0,0.5)] lg:block"
              ></motion.div>
            </motion.div>
          </>
        )}

        {/* Layer 3: Left fixed texts */}
        <motion.div
          style={{ opacity: splitScreenOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex h-full w-full"
        >
          <div className={narrativeTextRailClassName}>
            <motion.div
              style={{ opacity: opacity1, y: y1 }}
              className={narrativeSlideClassName}
            >
              <div className={narrativeEyebrowClassName}>
                <span className="h-px w-8 bg-[color:rgb(112_177_158_/_0.50)]"></span>{" "}
                01. The Legacy
              </div>
              <h2 className={narrativeHeadingClassName}>
                Credit markets run on a stack of legacy systems, patched
                together over decades
              </h2>
              {/* <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-inverse)]/85">
                Archaic databases and fragmented ledgers were never designed for
                the velocity and scale required by modern global capital.
              </p> */}
            </motion.div>

            <motion.div
              style={{ opacity: opacity2, y: y2 }}
              className={narrativeSlideClassName}
            >
              <div className={narrativeEyebrowClassName}>
                <span className="h-px w-8 bg-[color:rgb(112_177_158_/_0.50)]"></span>{" "}
                02. The Patchwork
              </div>
              <h2 className={narrativeHeadingClassName}>
                Trillions deployed. Still managed on spreadsheets and phone
                calls
              </h2>
              {/* <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-inverse)]/85">
                Instead of rebuilding from the ground up, the industry has
                stacked intermediary protocols on top of fragile core banking
                frameworks.
              </p> */}
            </motion.div>

            <motion.div
              style={{ opacity: opacity3, y: y3 }}
              className={narrativeSlideClassName}
            >
              <div className={narrativeEyebrowClassName}>
                <span className="h-px w-8 bg-[color:rgb(112_177_158_/_0.50)]"></span>{" "}
                03. The Friction
              </div>
              <h2 className={narrativeHeadingClassName}>
                The result: a fragile system where opacity is the norm and risk
                hides in the gaps
              </h2>
              {/* <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-inverse)]/85">
                The result is a fragile ecosystem plagued by T+2 settlement
                delays, hidden counterparty risks, and excessive capital
                overhead.
              </p> */}
            </motion.div>
          </div>
        </motion.div>

        {/* Layer 4: Pareto climax */}
        <motion.div
          style={{ opacity: climaxOpacity }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-[var(--color-bg-narrative)] transform-gpu will-change-[opacity]"
        >
          <video
            ref={(node) => {
              videoRefs.current.hyperCity = node;
            }}
            src={
              loadedVideoKeys.hyperCity
                ? NARRATIVE_VIDEO_ASSETS.hyperCity.src
                : undefined
            }
            loop
            muted
            playsInline
            preload={
              activeVideoKeys.includes("hyperCity") ? "auto" : "metadata"
            }
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-center brightness-[0.58] contrast-110 [backface-visibility:hidden] [transform:translateZ(0)] will-change-transform"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[color:rgb(5_11_8_/_0.45)] via-[color:rgb(5_11_8_/_0.08)] to-transparent"></div>

          <motion.div
            style={{ scale: climaxScale }}
            className="relative z-10 px-6 text-center"
          >
            <img
              src={paretoMarkGlass}
              alt="Pareto mark"
              className="h-40 w-40 mx-auto mb-8 h-20 w-20 items-center justify-center"
            />
            <h2 className="text-5xl leading-none font-semibold tracking-tighter text-[var(--color-text-inverse)] drop-shadow-2xl md:text-7xl lg:text-8xl">
              Pareto is here to
              <br />
              <span className="bg-gradient-to-b from-[var(--color-text-inverse)] to-[var(--color-brand-alt)] bg-clip-text text-transparent">
                set a new standard
              </span>
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NarrativeScrollSection;
