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

type UseCaseId = "yield" | "borrow" | "manage";

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
    id: "yield",
    title: "Earn yield on capital",
    desc: "Deploy liquidity into curated pools for automated, risk-adjusted returns.",
  },
  {
    id: "borrow",
    title: "Borrow against collateral",
    desc: "Unlock instant liquidity with predictable, transparent margin mechanics.",
  },
  {
    id: "manage",
    title: "Manage investment cycles",
    desc: "Structure parameters, orchestrate flows, and monitor vault health.",
  },
];

const ecosystemNodesData: EcosystemNode[] = [
  {
    id: "api",
    label: "API & WebSocket Sync",
    icon: Code,
    x: 50,
    y: 12,
    cases: ["yield", "borrow", "manage"],
  },
  {
    id: "margin",
    label: "Real-time Margin",
    icon: Activity,
    x: 85,
    y: 32,
    cases: ["borrow", "manage"],
  },
  {
    id: "settle",
    label: "Automated Settlement",
    icon: Zap,
    x: 85,
    y: 68,
    cases: ["yield", "borrow", "manage"],
  },
  {
    id: "params",
    label: "Custom Parameters",
    icon: Sliders,
    x: 50,
    y: 88,
    cases: ["manage"],
  },
  {
    id: "kyc",
    label: "KYC/AML Enclaves",
    icon: ShieldCheck,
    x: 15,
    y: 68,
    cases: ["yield", "borrow", "manage"],
  },
  {
    id: "tranches",
    label: "Risk Tranches",
    icon: Layers,
    x: 15,
    y: 32,
    cases: ["yield", "manage"],
  },
];

const InfrastructureSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredUseCase, setHoveredUseCase] = useState<UseCaseId | null>(null);

  return (
    <section
      id="infrastructure"
      className="relative z-10 overflow-hidden border-y border-[var(--color-border-soft-muted)] bg-[var(--color-bg-light-alt)] py-32 text-[var(--color-text-primary)]"
    >
      <SectionContainer className="relative z-10">
        <SectionHeading
          eyebrow="Modular Infrastructure"
          title="One protocol. Shared utility."
          description="Every participant leverages the same immutable core. Hover over your primary objective to see how Pareto's features orchestrate your strategy."
          size="4xl"
          className="mx-auto mb-24 text-center"
        />

        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-8">
          <div className="w-full lg:w-1/3">
            <h3 className="mb-6 border-b border-[var(--color-border-soft-strong)] pb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
              Primary Objectives
            </h3>

            <div
              className="flex flex-col gap-4"
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
                      className={`text-xl font-bold tracking-tight transition-colors ${
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
            <div className="relative aspect-square w-full max-w-[600px]">
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
