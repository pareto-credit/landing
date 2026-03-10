import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Code,
  Layers,
  ShieldCheck,
  Sliders,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import paretoMark from "../../assets/svgs/pareto-mark-circle.svg";
import { SectionContainer, SectionHeading } from "../ui/Section";

type UseCaseId = "launch" | "allocate" | "operate";

interface UseCase {
  id: UseCaseId;
  title: string;
  desc: string;
}

interface EcosystemNode {
  id: string;
  label: string;
  icon: LucideIcon;
  x: number;
  y: number;
  cases: UseCaseId[];
}

const useCasesData: UseCase[] = [
  {
    id: "launch",
    title: "Launch credit facilities",
    desc: "Configure bespoke structures, vault wrappers, servicing flows, and lender-specific terms before capital is deployed.",
  },
  {
    id: "allocate",
    title: "Allocate with clearer terms",
    desc: "Access curated deal flow with transparent risk structures, security profiles, and ongoing reporting.",
  },
  {
    id: "operate",
    title: "Operate and oversee facilities",
    desc: "Monitor, service, and manage capital flows across vaults, borrower cohorts, servicing, and covenant events.",
  },
];

const ecosystemNodesData: EcosystemNode[] = [
  {
    id: "api",
    label: "API Sync",
    icon: Code,
    x: 50,
    y: 12,
    cases: ["launch", "allocate", "operate"],
  },
  {
    id: "margin",
    label: "Monitoring & Reporting",
    icon: Activity,
    x: 85,
    y: 32,
    cases: ["allocate", "operate"],
  },
  {
    id: "settle",
    label: "Automated Settlement",
    icon: Zap,
    x: 85,
    y: 68,
    cases: ["launch", "allocate", "operate"],
  },
  {
    id: "params",
    label: "Servicing Flows",
    icon: Sliders,
    x: 50,
    y: 88,
    cases: ["operate"],
  },
  {
    id: "kyc",
    label: "Compliance Controls",
    icon: ShieldCheck,
    x: 15,
    y: 68,
    cases: ["launch", "allocate", "operate"],
  },
  {
    id: "tranches",
    label: "Facility Terms",
    icon: Layers,
    x: 15,
    y: 32,
    cases: ["launch", "allocate"],
  },
];

const InfrastructureSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredUseCase, setHoveredUseCase] = useState<UseCaseId | null>(null);

  return (
    <section
      id="infrastructure"
      className="ui-section-fit relative z-10 overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <SectionContainer className="ui-section-shell relative z-10">
        <SectionHeading
          eyebrow="Core Platform"
          title="A unified technology layer for modern credit markets."
          description="From facility setup to allocation, servicing, redemptions, and reporting, Pareto gives every participant a common infrastructure layer for onchain credit."
          size="4xl"
          className="mx-auto mb-14 text-center xl:mb-10"
        />

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-10 xl:gap-12">
          <div className="w-full lg:w-1/3">
            <h3 className="mb-4 border-b border-[var(--color-border-soft-strong)] pb-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] xl:mb-6">
              Core Workflows
            </h3>

            <div
              className="flex flex-col gap-3 xl:gap-4"
              onMouseLeave={() => setHoveredUseCase(null)}
            >
              {useCasesData.map((useCase) => {
                const isActive = hoveredUseCase === useCase.id;
                const isDimmed =
                  hoveredUseCase !== null && hoveredUseCase !== useCase.id;

                return (
                  <button
                    key={useCase.id}
                    type="button"
                    onMouseEnter={() => setHoveredUseCase(useCase.id)}
                    onFocus={() => setHoveredUseCase(useCase.id)}
                    onBlur={() => setHoveredUseCase(null)}
                    onClick={() =>
                      setHoveredUseCase((current) =>
                        current === useCase.id ? null : useCase.id,
                      )
                    }
                    className={`relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[color:rgb(113_178_159_/_0.50)] bg-[var(--color-surface)] shadow-[0_10px_30px_rgba(113,178,159,0.15)]"
                        : isDimmed
                          ? "border-transparent bg-[var(--color-bg-light-alt)] opacity-50 grayscale"
                          : "border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-sm hover:border-[var(--color-border-soft-strong)]"
                    }`}
                  >
                    <div
                      className={`absolute bottom-0 left-0 top-0 w-1 transition-all duration-300 ${
                        isActive ? "bg-[var(--color-brand)]" : "bg-transparent"
                      }`}
                    />
                    <h4
                      className={`text-lg font-bold tracking-tight transition-colors xl:text-xl ${
                        isActive
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-secondary)]"
                      }`}
                    >
                      {useCase.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[color:rgb(41_59_51_/_0.80)]">
                      {useCase.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex w-full items-center justify-center lg:w-2/3">
            <div className="relative aspect-square w-full max-w-[500px] xl:max-w-[560px]">
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ zIndex: 0 }}
              >
                {ecosystemNodesData.map((node) => {
                  const isActive =
                    hoveredUseCase === null ||
                    node.cases.includes(hoveredUseCase);

                  return (
                    <line
                      key={`line-${node.id}`}
                      x1="50%"
                      y1="50%"
                      x2={`${node.x}%`}
                      y2={`${node.y}%`}
                      stroke={
                        isActive && hoveredUseCase !== null
                          ? "var(--color-brand)"
                          : "var(--color-text-primary)"
                      }
                      strokeWidth={
                        isActive && hoveredUseCase !== null ? "3" : "1"
                      }
                      strokeOpacity={
                        isActive && hoveredUseCase !== null ? "0.4" : "0.05"
                      }
                      className="transition-all duration-500 ease-in-out"
                    />
                  );
                })}
              </svg>

              {ecosystemNodesData.map((node) => {
                const isActive =
                  hoveredUseCase === null ||
                  node.cases.includes(hoveredUseCase);

                return (
                  <div
                    key={`node-${node.id}`}
                    className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-500 ease-in-out ${
                      isActive && hoveredUseCase !== null
                        ? "z-20 scale-110"
                        : !isActive
                          ? "z-10 scale-90 opacity-40 grayscale"
                          : "z-10 scale-100"
                    }`}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border shadow-lg transition-all duration-500 ${
                        isActive && hoveredUseCase !== null
                          ? "border-[var(--color-brand)] bg-[var(--color-surface)] shadow-[0_0_20px_rgba(113,178,159,0.3)]"
                          : "border-[var(--color-border-soft-strong)] bg-[var(--color-surface)]"
                      }`}
                    >
                      <node.icon
                        className={`transition-colors duration-500 ${
                          isActive && hoveredUseCase !== null
                            ? "text-[var(--color-brand)]"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                        size={24}
                      />
                    </div>

                    <div className="w-max max-w-[120px] rounded-lg border border-[var(--color-border-soft)] bg-[color:rgb(255_255_255_/_0.90)] px-3 py-1.5 text-center shadow-sm backdrop-blur-sm">
                      <span
                        className={`block font-sans text-[11px] font-bold leading-tight ${
                          isActive && hoveredUseCase !== null
                            ? "text-[var(--color-text-primary)]"
                            : "text-[var(--color-text-secondary)]"
                        }`}
                      >
                        {node.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: hoveredUseCase ? [1, 1.085, 1] : [1, 1.06, 1],
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: hoveredUseCase ? 1.55 : 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-surface)] shadow-[0_24px_60px_rgba(14,24,19,0.28)]"
                >
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: hoveredUseCase ? [1, 1.34, 1] : [1, 1.24, 1],
                            opacity: hoveredUseCase
                              ? [0.4, 0.82, 0.4]
                              : [0.22, 0.5, 0.22],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: hoveredUseCase ? 1.7 : 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,_rgba(113,178,159,0.52)_0%,_rgba(113,178,159,0)_76%)] blur-[12px]"
                  />

                  <motion.img
                    src={paretoMark}
                    alt="Pareto Credit"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            filter: hoveredUseCase
                              ? [
                                  "drop-shadow(0 0 0 rgba(113,178,159,0)) brightness(1) saturate(1)",
                                  "drop-shadow(0 0 18px rgba(113,178,159,0.7)) brightness(1.18) saturate(1.3)",
                                  "drop-shadow(0 0 0 rgba(113,178,159,0)) brightness(1) saturate(1)",
                                ]
                              : [
                                  "drop-shadow(0 0 0 rgba(113,178,159,0)) brightness(1) saturate(1)",
                                  "drop-shadow(0 0 10px rgba(113,178,159,0.42)) brightness(1.08) saturate(1.15)",
                                  "drop-shadow(0 0 0 rgba(113,178,159,0)) brightness(1) saturate(1)",
                                ],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: hoveredUseCase ? 1.55 : 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className="relative z-10"
                  />

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: hoveredUseCase ? [1, 1.42] : [1, 1.34],
                            opacity: hoveredUseCase ? [0.78, 0] : [0.5, 0],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: hoveredUseCase ? 1.55 : 1.95,
                            repeat: Infinity,
                            ease: "easeOut",
                          }
                    }
                    className="pointer-events-none absolute inset-0 rounded-full border border-[color:rgb(113_178_159_/_0.86)]"
                  />
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: hoveredUseCase ? [1, 1.72] : [1, 1.62],
                            opacity: hoveredUseCase ? [0.5, 0] : [0.34, 0],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            duration: hoveredUseCase ? 1.55 : 1.95,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.28,
                          }
                    }
                    className="pointer-events-none absolute inset-0 rounded-full border border-[color:rgb(113_178_159_/_0.65)]"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default InfrastructureSection;
