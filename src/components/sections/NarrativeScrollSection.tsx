import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import serverRoomVideo from "../../assets/videos/server-room.mp4";
import tradingDeskVideo from "../../assets/videos/trading-desk.mp4";
import financialDocumentsVideo from "../../assets/videos/financial-documents.mp4";
import hyperCityVideo from "../../assets/videos/hyper-city.mp4";
import paretoMarkGlass from "../../assets/svgs/pareto-mark-glass.svg";

const NAVBAR_OFFSET_PX = 96;
const WINDOW_TOP_PX = 64;
const WINDOW_BOTTOM_PX = 64;
const WINDOW_RIGHT_PX = 64;
const WINDOW_LEFT_RATIO = 0.55;
const WINDOW_RADIUS_PX = 32;
const WINDOW_SAFE_TOP_PX = NAVBAR_OFFSET_PX + 16;

const NarrativeScrollSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Slide 1: The Legacy
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -40]);
  const vidOpacity1 = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Slide 2: The Patchwork
  const opacity2 = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45, 0.55],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45, 0.55],
    [40, 0, 0, -40],
  );
  const vidOpacity2 = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.45, 0.55],
    [0, 1, 1, 0],
  );

  // Slide 3: The Friction
  const opacity3 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.78],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.78],
    [40, 0, 0, -40],
  );
  const vidOpacity3 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.78],
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
    [0.78, 0.85, 1],
    [0, 1, 1],
  );
  const climaxScale = useTransform(scrollYProgress, [0.78, 1], [0.95, 1]);

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

  return (
    <section
      ref={containerRef}
      className="relative h-[500vh] bg-[var(--color-bg-narrative)]"
    >
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen w-full overflow-hidden bg-[var(--color-bg-narrative)]"
      >
        {/* Layer 1: Full-screen background videos */}
        <motion.div
          style={{ opacity: splitScreenOpacity }}
          className="absolute inset-0 z-0"
        >
          <motion.div
            style={{ opacity: vidOpacity1 }}
            className="absolute inset-0 h-full w-full"
          >
            <video
              src={serverRoomVideo}
              poster="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1000"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: vidOpacity2 }}
            className="absolute inset-0 h-full w-full"
          >
            <video
              src={tradingDeskVideo}
              poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ opacity: vidOpacity3 }}
            className="absolute inset-0 h-full w-full"
          >
            <video
              src={financialDocumentsVideo}
              poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Contrast layer to keep frosty perceived opacity stable on bright/dark frames */}
        <motion.div
          style={{ opacity: splitScreenOpacity }}
          className="pointer-events-none absolute inset-0 z-[5] bg-[color:rgb(2_5_4_/_0.25)]"
        ></motion.div>

        {/* Layer 2: Frosted glass mask */}
        <motion.div className="pointer-events-none absolute inset-0 z-10">
          {/* Mobile: frosty layer full width */}
          <motion.div
            style={{ backgroundColor: frostyTint, opacity: splitScreenOpacity }}
            className="absolute inset-0 backdrop-blur-2xl backdrop-saturate-150 lg:hidden"
          ></motion.div>

          {/* Desktop: single frosty layer with rounded transparent cutout */}
          <motion.div
            style={{
              backgroundColor: frostyTint,
              opacity: splitScreenOpacity,
              clipPath: frostyDesktopClipPath,
            }}
            className="absolute inset-0 hidden backdrop-blur-2xl backdrop-saturate-150 lg:block"
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

        {/* Layer 3: Left fixed texts */}
        <motion.div
          style={{ opacity: splitScreenOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex h-full w-full"
        >
          <div className="relative flex h-full w-full flex-col justify-center px-8 pointer-events-auto lg:w-[55%] lg:pl-24 lg:pr-16">
            <motion.div
              style={{ opacity: opacity1, y: y1 }}
              className="absolute top-1/2 left-8 right-8 -translate-y-1/2 lg:left-24 lg:right-16"
            >
              <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--color-brand-alt)] uppercase">
                <span className="h-px w-8 bg-[color:rgb(112_177_158_/_0.50)]"></span> 01. The
                Legacy
              </div>
              <h2 className="mb-6 text-4xl leading-[1.1] font-medium tracking-tight text-[var(--color-text-inverse)] md:text-5xl">
                Credit markets operate on infrastructure built in the 1970s.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-inverse)]/85">
                Archaic databases and fragmented ledgers were never designed for
                the velocity and scale required by modern global capital.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: opacity2, y: y2 }}
              className="absolute top-1/2 left-8 right-8 -translate-y-1/2 lg:left-24 lg:right-16"
            >
              <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--color-brand-alt)] uppercase">
                <span className="h-px w-8 bg-[color:rgb(112_177_158_/_0.50)]"></span> 02. The
                Patchwork
              </div>
              <h2 className="mb-6 text-4xl leading-[1.1] font-medium tracking-tight text-[var(--color-text-inverse)] md:text-5xl">
                Decades of technology layered on outdated systems.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-inverse)]/85">
                Instead of rebuilding from the ground up, the industry has
                stacked intermediary protocols on top of fragile core banking
                frameworks.
              </p>
            </motion.div>

            <motion.div
              style={{ opacity: opacity3, y: y3 }}
              className="absolute top-1/2 left-8 right-8 -translate-y-1/2 lg:left-24 lg:right-16"
            >
              <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-[var(--color-brand-alt)] uppercase">
                <span className="h-px w-8 bg-[color:rgb(112_177_158_/_0.50)]"></span> 03. The
                Friction
              </div>
              <h2 className="mb-6 text-4xl leading-[1.1] font-medium tracking-tight text-[var(--color-text-inverse)] md:text-5xl">
                Inefficiency, opacity, and unnecessary risk.
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-[var(--color-text-inverse)]/85">
                The result is a fragile ecosystem plagued by T+2 settlement
                delays, hidden counterparty risks, and excessive capital
                overhead.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Layer 4: Pareto climax */}
        <motion.div
          style={{ opacity: climaxOpacity }}
          className="absolute inset-0 z-30 flex items-center justify-center bg-[var(--color-bg-narrative)]"
        >
          <video
            src={hyperCityVideo}
            poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover filter brightness-[0.58] contrast-110"
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
              This is where Pareto
              <br />
              <span className="bg-gradient-to-b from-[var(--color-text-inverse)] to-[var(--color-brand-alt)] bg-clip-text text-transparent">
                comes in.
              </span>
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NarrativeScrollSection;
