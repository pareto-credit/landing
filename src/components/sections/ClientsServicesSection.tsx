import { motion, useReducedMotion } from "framer-motion";
import { SectionContainer, SectionHeading } from "../ui/Section";

const barHeights = [
  95, 85, 75, 65, 58, 52, 47, 42, 38, 34, 30, 26, 23, 20, 18, 16, 14,
];

const serviceTags = [
  {
    label: "Onchain Settlement",
    className:
      "absolute left-[10%] top-[10%] -rotate-6 bg-white/10 border border-white/20 px-5 py-3 text-white",
    transition: {
      duration: 9.6,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 0.15,
    },
    animate: {
      y: [-7, -1, 4, 1, -6],
      x: [-3, 1, 3, -1, -2],
      scale: [1, 1.012, 0.996, 1.01, 1],
      opacity: [0.9, 1, 0.92, 0.98, 0.9],
    },
  },
  {
    label: "Risk Monitoring",
    className:
      "absolute right-[15%] top-[15%] rotate-3 border border-[#7791B7]/30 bg-[#7791B7]/20 px-5 py-3 text-white",
    transition: {
      duration: 11.1,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 1.37,
    },
    animate: {
      y: [5, 0, -4, -1, 4],
      x: [2, -2, -3, 1, 2],
      scale: [1, 1.008, 1, 0.996, 1],
      opacity: [0.88, 0.98, 0.9, 1, 0.88],
    },
  },
  {
    label: "Compliance Controls",
    className:
      "absolute left-[5%] top-[35%] hidden border border-[#7584B6]/30 bg-[#7584B6]/20 px-5 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:block",
    transition: {
      duration: 8.7,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 0.62,
    },
    animate: {
      y: [-5, -2, 3, 0, -4],
      x: [-2, 1, 2, 0, -2],
      scale: [1, 1.01, 0.995, 1.008, 1],
      opacity: [0.9, 1, 0.9, 0.97, 0.9],
    },
  },
  {
    label: "Smart Contract Escrow",
    className:
      "absolute right-[5%] top-[25%] border border-[#A2CFC0]/30 bg-[#A2CFC0]/20 px-5 py-3 text-[#71B29F] shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:right-[35%]",
    transition: {
      duration: 12.2,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 2.05,
    },
    animate: {
      y: [4, 1, -3, 0, 5],
      x: [2, 0, -2, -1, 1],
      scale: [1, 1.01, 0.997, 1.012, 1],
      opacity: [0.9, 1, 0.92, 0.99, 0.9],
    },
  },
  {
    label: "KYC / KYB Flows",
    className:
      "absolute bottom-[10%] right-[10%] -rotate-3 border border-[#78A790]/30 bg-[#78A790]/20 px-5 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:bottom-[45%]",
    transition: {
      duration: 9.1,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 1.83,
    },
    animate: {
      y: [-4, -1, 3, 0, -3],
      x: [-3, -1, 2, 1, -2],
      scale: [1, 1.008, 0.995, 1.006, 1],
      opacity: [0.87, 0.98, 0.9, 0.97, 0.87],
    },
  },
  {
    label: "API Integrations",
    className:
      "absolute bottom-[48%] right-[1%] flex w-[11.5rem] justify-center whitespace-nowrap text-center -rotate-8 border border-[#8696C8]/30 bg-[#8696C8]/20 px-5 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:left-[40%] md:w-[12.5rem]",
    transition: {
      duration: 10.9,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 0.44,
    },
    animate: {
      y: [4, 0, -5, -1, 3],
      x: [2, -1, -2, 1, 2],
      scale: [1, 1.012, 0.996, 1.006, 1],
      opacity: [0.9, 1, 0.89, 0.97, 0.9],
    },
  },
  {
    label: "Portfolio Reporting",
    className:
      "absolute bottom-[35%] left-[10%] flex w-[11.5rem] justify-center whitespace-nowrap text-center -rotate-6 border border-[#94A3D3]/30 bg-[#94A3D3]/20 px-5 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] md:right-[30%] md:w-[12.5rem]",
    transition: {
      duration: 8.3,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut" as const,
      delay: 2.47,
    },
    animate: {
      y: [-5, -1, 4, 0, -4],
      x: [-2, 1, 2, -1, -2],
      scale: [1, 1.009, 0.994, 1.007, 1],
      opacity: [0.9, 0.98, 0.88, 1, 0.9],
    },
  },
];

const ClientsServicesSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative z-20 overflow-hidden border-b border-white/5 bg-[#254839] py-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />
      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Where institutional capital meets programmable credit."
          className="mb-16"
          eyebrowClassName="text-[#71B29F]"
          titleClassName="text-white"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="group relative flex min-h-[450px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-[#183026] shadow-2xl md:min-h-[500px] lg:col-span-5">
            <div className="pointer-events-none absolute inset-0 z-10 h-1/2 bg-gradient-to-b from-[#254839]/80 via-transparent to-transparent" />
            <div className="relative z-20 p-10">
              <h3 className="mb-4 text-3xl font-bold text-white">Clients</h3>
              <p className="text-sm leading-relaxed text-[#E8EBE6]/80">
                Sophisticated credit funds, prime brokerage, DeFi protocols and
                the largest institutions across the global capital markets, all
                use Pareto.
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-0 flex h-3/4 items-end gap-[3px] px-8 pb-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
              {barHeights.map((height, idx) => (
                <motion.div
                  key={`bar-${idx}`}
                  className="flex-1 origin-bottom rounded-t-sm bg-gradient-to-t from-[#71B29F]/80 to-[#78FFC5]"
                  style={{ height: `${height}%` }}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { scaleY: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: idx * 0.1,
                        }
                  }
                />
              ))}
              <svg
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-full w-full"
                preserveAspectRatio="none"
                viewBox="0 0 400 200"
              >
                <path
                  d="M -10 180 Q 60 40 150 100 T 410 170"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  className="opacity-40 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                />
              </svg>
            </div>
          </div>

          <div className="group relative flex min-h-[450px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#183026] shadow-2xl md:min-h-[500px] lg:col-span-7">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(113,178,159,0.15)_0%,transparent_70%)] opacity-50 transition-opacity duration-700 group-hover:opacity-100" />

              {serviceTags.map((tag) => (
                <motion.div
                  key={tag.label}
                  animate={shouldReduceMotion ? undefined : tag.animate}
                  transition={shouldReduceMotion ? undefined : tag.transition}
                  className={`${tag.className} -translate-y-2 rounded-full font-mono text-xs tracking-tight backdrop-blur-md will-change-transform`}
                >
                  {tag.label}
                </motion.div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full bg-gradient-to-t from-[#183026] via-[#183026]/90 to-transparent px-8 pb-8 pt-32 md:px-10 md:pb-10">
              <div className="pointer-events-auto">
                <h3 className="mb-3 text-3xl font-bold text-white">Services</h3>
                <p className="max-w-2xl text-sm leading-relaxed text-[#E8EBE6]/80">
                  Pareto is enabling access to credit market participants on
                  modern infrastructure, minimizing risk and facilitating growth
                  for our clients with our onchain, real-time fixed income
                  protocol.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default ClientsServicesSection;
