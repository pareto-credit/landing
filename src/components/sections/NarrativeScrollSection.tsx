import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import paretoMark from "../../assets/svgs/pareto-mark.svg";

const NarrativeScrollSection = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.45, 0.5],
    [100, 0, 0, -100],
  );

  const opacity3 = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.7, 0.75],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(
    scrollYProgress,
    [0.45, 0.5, 0.7, 0.75],
    [100, 0, 0, -100],
  );

  const opacity4 = useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.7, 0.75, 1], [100, 0, 0]);
  const scale4 = useTransform(scrollYProgress, [0.7, 0.8], [0.8, 1]);

  const bg1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const bg2Opacity = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.45, 0.55],
    [0, 1, 1, 0],
  );
  const bg3Opacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.8],
    [0, 1, 1, 0],
  );
  const bg4Opacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[420vh] border-b border-white/5 bg-[#050B08] md:h-[500vh] lg:h-[560vh]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: bg1Opacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-[#020604]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1B4332_2px,transparent_2px),linear-gradient(to_bottom,#1B4332_2px,transparent_2px)] bg-[size:60px_60px] opacity-60" />
          <div className="h-[800px] w-[800px] rounded-full bg-[#2D6A4F] opacity-40 blur-[200px]" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
            }}
          />
        </motion.div>

        <motion.div
          style={{ opacity: bg2Opacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#030906] [perspective:1200px]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0A1A12_0%,#030906_100%)]" />
          <div className="relative flex h-full w-full items-center justify-center transform-gpu">
            <motion.div
              animate={{ y: [-10, 10, -10], rotateZ: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ rotateX: 65 }}
              className="absolute h-[900px] w-[900px] overflow-hidden rounded-[40px] border-[2px] border-white/10 bg-[#081912]/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_2px,transparent_2px),linear-gradient(to_bottom,#ffffff0a_2px,transparent_2px)] bg-[size:60px_60px]" />
            </motion.div>
            <motion.div
              animate={{ y: [-50, -30, -50], rotateZ: [15, 375] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              style={{ rotateX: 65 }}
              className="absolute h-[700px] w-[700px] overflow-hidden rounded-[40px] border-[2px] border-[#70B19E]/20 bg-[#050B08]/60 shadow-[0_30px_60px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#70B19E15_2px,transparent_2px),linear-gradient(to_bottom,#70B19E15_2px,transparent_2px)] bg-[size:40px_40px]" />
            </motion.div>
            <motion.div
              animate={{ y: [-90, -70, -90], rotateZ: [30, 390] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{ rotateX: 65 }}
              className="absolute flex h-[500px] w-[500px] items-center justify-center rounded-[40px] border border-white/30 bg-white/[0.03] shadow-[0_40px_80px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            >
              <div className="flex h-1/2 w-1/2 items-center justify-center rounded-full border border-white/20 animate-pulse">
                <div className="h-1/2 w-1/2 rounded-full bg-white/10" />
              </div>
            </motion.div>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030906]/80 via-transparent to-[#030906]/90" />
        </motion.div>

        <motion.div
          style={{ opacity: bg3Opacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-[#0A0000]"
        >
          <motion.div
            animate={{ x: ["-10%", "10%", "-10%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 z-0 w-[150vw] bg-black/60 blur-[100px]"
          />
          <div className="pointer-events-none absolute inset-0 z-10 opacity-60">
            <motion.div
              animate={{ x: [0, 15, -15, 0], y: [0, -15, 15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 origin-center scale-150 skew-y-[15deg] bg-[linear-gradient(to_right,#ff2222_1px,transparent_1px),linear-gradient(to_bottom,#ff2222_1px,transparent_1px)] bg-[size:80px_80px]"
            />
            <motion.div
              animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 origin-center -skew-y-[15deg] scale-150 bg-[linear-gradient(to_right,#cc0000_1px,transparent_1px),linear-gradient(to_bottom,#cc0000_1px,transparent_1px)] bg-[size:60px_60px] opacity-80"
            />
          </div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-[800px] w-[800px] translate-x-[-250px] translate-y-[-150px] rounded-full bg-red-600/40 blur-[150px] mix-blend-screen"
            />
            <motion.div
              animate={{ scale: [1.4, 1, 1.4], opacity: [0.4, 0.9, 0.4] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute h-[900px] w-[900px] translate-x-[250px] translate-y-[200px] rounded-full bg-orange-600/30 blur-[180px] mix-blend-screen"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
        </motion.div>

        <motion.div
          style={{ opacity: bg4Opacity }}
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-[#081912]"
        >
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute h-[900px] w-[900px] rounded-full bg-[#70B19E]/30 blur-[180px]"
          />
          <div className="absolute h-screen w-[2px] bg-gradient-to-b from-transparent via-[#70B19E]/80 to-transparent shadow-[0_0_30px_#70B19E]" />
          <div className="absolute h-[2px] w-screen bg-gradient-to-r from-transparent via-[#70B19E]/80 to-transparent shadow-[0_0_30px_#70B19E]" />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 z-10 mx-auto w-full max-w-5xl px-6 text-center">
          <motion.div
            style={{ opacity: opacity1, y: y1 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-7xl">
              Credit markets still operate on
              <br />
              infrastructure built in the{" "}
              <span className="rounded-md border border-[#70B19E]/50 bg-[#70B19E]/20 px-4 py-1 font-mono text-[#70B19E] shadow-[0_0_30px_#70B19E50]">
                1970s.
              </span>
            </h2>
          </motion.div>
          <motion.div
            style={{ opacity: opacity2, y: y2 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-7xl">
              Over decades, technology has been
              <br />
              layered on top of{" "}
              <span className="line-through decoration-[#70B19E] decoration-4 opacity-80 text-gray-500">
                outdated systems.
              </span>
            </h2>
          </motion.div>
          <motion.div
            style={{ opacity: opacity3, y: y3 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-7xl">
              The result:
              <br />
              <span className="italic text-red-400/90 drop-shadow-[0_0_25px_rgba(248,113,113,0.8)]">
                inefficiency
              </span>
              ,{" "}
              <span className="italic text-red-400/90 drop-shadow-[0_0_25px_rgba(248,113,113,0.8)]">
                opacity
              </span>
              , and
              <br />
              <span className="italic text-red-400/90 drop-shadow-[0_0_25px_rgba(248,113,113,0.8)]">
                unnecessary risk.
              </span>
            </h2>
          </motion.div>
          <motion.div
            style={{ opacity: opacity4, y: y4, scale: scale4 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            <img
              src={paretoMark}
              alt="Pareto mark"
              className="h-40 w-40 mb-10 rounded-4xl bg-[#70B19E]/15 shadow-[0_0_40px_#70B19E60]"
            />
            <h2 className="bg-gradient-to-b from-white to-[#70B19E] bg-clip-text pb-2 text-5xl font-bold leading-none tracking-tighter text-transparent drop-shadow-2xl md:text-7xl lg:text-8xl">
              This is where Pareto
              <br />
              comes in.
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NarrativeScrollSection;
