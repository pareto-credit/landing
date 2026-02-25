import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionContainer } from "../ui/Section";

type DiagramNodeId = "borrower" | "lenders" | "vault" | "curator" | "tranches";

interface DiagramNode {
  id: DiagramNodeId;
  title: string;
  label: string;
  desc: string;
}

interface InteractiveBanknoteProps {
  activeNode: DiagramNodeId | null;
  setActiveNode: (node: DiagramNodeId | null) => void;
}

const diagramNodes: Record<DiagramNodeId, DiagramNode> = {
  borrower: {
    id: "borrower",
    title: "Borrower Flow",
    label: "BORROWER",
    desc: "Borrowers request loans and provide collateral to the Vault. Once approved, they pay regular interest to maintain their active credit facility.",
  },
  lenders: {
    id: "lenders",
    title: "Lender Flow",
    label: "LENDERS",
    desc: "Capital allocators supply liquidity directly into the Vault, earning programmable, risk-adjusted interest generated from borrower repayments.",
  },
  vault: {
    id: "vault",
    title: "Credit Vault",
    label: "CREDIT VAULT",
    desc: "The immutable core of the system. An isolated smart contract managing collateral, enforcing rules, and routing funds safely.",
  },
  curator: {
    id: "curator",
    title: "Curator Flow",
    label: "CURATOR",
    desc: "Risk managers evaluate loan requests, configure vault parameters, and manage interest rate models to ensure the facility's health.",
  },
  tranches: {
    id: "tranches",
    title: "Tranche Flow",
    label: "TRANCHES",
    desc: "Vault liquidity is structured into risk-diversified tranches, offering lenders a choice between senior protection or junior optimization.",
  },
};

const InteractiveBanknote = ({
  activeNode,
  setActiveNode,
}: InteractiveBanknoteProps) => {
  const reduceMotion = useReducedMotion();

  const activeElements = useMemo(() => {
    if (activeNode === "vault") return ["vault"];
    if (activeNode === "borrower")
      return ["borrower", "loanRequest", "interestPayment", "vault"];
    if (activeNode === "curator")
      return ["curator", "creditAssessment", "ratesManagement", "vault"];
    if (activeNode === "lenders")
      return ["lenders", "liquidityProvision", "interestEarnings", "vault"];
    if (activeNode === "tranches")
      return ["tranches", "riskDiversification", "interestEarnings", "vault"];
    return [];
  }, [activeNode]);

  const isElemActive = (id: string) => activeElements.includes(id);
  const activeStrokeWidth = reduceMotion ? "2.4" : "2.8";
  const edgeTransitionClass = reduceMotion
    ? ""
    : "transition-[stroke,stroke-width] duration-200 ease-out";
  const nodeTransitionClass = reduceMotion
    ? ""
    : "transition-transform duration-200 ease-out";
  const labelTransitionClass = reduceMotion
    ? "cursor-pointer"
    : "cursor-pointer transition-opacity duration-200 ease-out";
  const nodeScale = (node: DiagramNodeId) =>
    reduceMotion
      ? "scale(1)"
      : activeNode === node
        ? "scale(1.02)"
        : "scale(1)";
  const vaultScale = reduceMotion
    ? "scale(1)"
    : activeNode === "vault"
      ? "scale(1.015)"
      : "scale(1)";

  return (
    <div className="mt-12 flex w-full flex-col items-center">
      <div className="relative mb-12 hidden w-full justify-center overflow-visiblem lg:flex">
        <svg
          viewBox="0 0 1200 800"
          className="h-[min(68vh,780px)] w-auto max-w-full shadow-lg rounded-[2rem]"
        >
          <defs>
            <pattern
              id="guilloche"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="#1A3326"
                strokeWidth="0.5"
                opacity="0.35"
              />
              <line
                x1="3"
                y1="0"
                x2="3"
                y2="6"
                stroke="#1A3326"
                strokeWidth="0.5"
                opacity="0.1"
              />
            </pattern>
            <pattern
              id="guilloche-dense"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-30)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="4"
                stroke="#1A3326"
                strokeWidth="0.5"
                opacity="0.25"
              />
            </pattern>

            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#0E1813" />
            </marker>
            <marker
              id="arrow-glow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#71B29F" />
            </marker>

            <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="5"
                result="noise"
              />
              <feDiffuseLighting
                in="noise"
                lightingColor="#ffffff"
                surfaceScale="0.8"
                result="light"
              >
                <feDistantLight azimuth="45" elevation="60" />
              </feDiffuseLighting>
              <feBlend
                mode="multiply"
                in="light"
                in2="SourceGraphic"
                result="blend"
              />
              <feComposite in="blend" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>

          <rect
            width="1200"
            height="800"
            rx="30"
            fill="#C9D6CE"
            filter="url(#paper-texture)"
          />
          <rect
            x="20"
            y="20"
            width="1160"
            height="760"
            rx="20"
            fill="none"
            stroke="#1A3326"
            strokeWidth="1"
            opacity="0.3"
          />

          <g>
            <path
              d="M 350 140 L 835 140"
              fill="none"
              stroke={isElemActive("loanRequest") ? "#71B29F" : "#0E1813"}
              strokeWidth={
                isElemActive("loanRequest") ? activeStrokeWidth : "2"
              }
              strokeDasharray="6 4"
              markerEnd={
                isElemActive("loanRequest") ? "url(#arrow-glow)" : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
            <path
              d="M 850 180 L 365 180"
              fill="none"
              stroke={isElemActive("creditAssessment") ? "#71B29F" : "#0E1813"}
              strokeWidth={
                isElemActive("creditAssessment") ? activeStrokeWidth : "2"
              }
              strokeDasharray="6 4"
              markerEnd={
                isElemActive("creditAssessment")
                  ? "url(#arrow-glow)"
                  : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
            <path
              d="M 120 220 V 320 H 405"
              fill="none"
              stroke={isElemActive("interestPayment") ? "#71B29F" : "#0E1813"}
              strokeWidth={
                isElemActive("interestPayment") ? activeStrokeWidth : "2"
              }
              markerEnd={
                isElemActive("interestPayment")
                  ? "url(#arrow-glow)"
                  : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
            <path
              d="M 120 580 V 480 H 405"
              fill="none"
              stroke={
                isElemActive("liquidityProvision") ? "#71B29F" : "#0E1813"
              }
              strokeWidth={
                isElemActive("liquidityProvision") ? activeStrokeWidth : "2"
              }
              markerEnd={
                isElemActive("liquidityProvision")
                  ? "url(#arrow-glow)"
                  : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
            <path
              d="M 1080 220 V 320 H 795"
              fill="none"
              stroke={isElemActive("ratesManagement") ? "#71B29F" : "#0E1813"}
              strokeWidth={
                isElemActive("ratesManagement") ? activeStrokeWidth : "2"
              }
              markerEnd={
                isElemActive("ratesManagement")
                  ? "url(#arrow-glow)"
                  : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
            <path
              d="M 1080 580 V 480 H 795"
              fill="none"
              stroke={
                isElemActive("riskDiversification") ? "#71B29F" : "#0E1813"
              }
              strokeWidth={
                isElemActive("riskDiversification") ? activeStrokeWidth : "2"
              }
              markerEnd={
                isElemActive("riskDiversification")
                  ? "url(#arrow-glow)"
                  : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
            <path
              d="M 850 640 H 365"
              fill="none"
              stroke={isElemActive("interestEarnings") ? "#71B29F" : "#0E1813"}
              strokeWidth={
                isElemActive("interestEarnings") ? activeStrokeWidth : "2"
              }
              markerEnd={
                isElemActive("interestEarnings")
                  ? "url(#arrow-glow)"
                  : "url(#arrow)"
              }
              className={edgeTransitionClass}
            />
          </g>

          <g
            onMouseEnter={() => setActiveNode("borrower")}
            className={`cursor-pointer ${nodeTransitionClass}`}
            style={{
              transformOrigin: "200px 160px",
              transform: nodeScale("borrower"),
            }}
          >
            <path
              d="M 50 100 H 350 V 160 A 60 60 0 0 0 290 220 H 50 Z"
              fill="#9CAEA4"
              stroke={isElemActive("borrower") ? "#71B29F" : "#0E1813"}
              strokeWidth={isElemActive("borrower") ? activeStrokeWidth : "2"}
            />
            <path
              d="M 50 100 H 350 V 160 A 60 60 0 0 0 290 220 H 50 Z"
              fill="url(#guilloche)"
            />
            <path
              d="M 50 100 H 350 V 160 A 60 60 0 0 0 290 220 H 50 Z"
              fill={
                activeNode === "borrower"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.02)"
              }
            />
            <text
              x="180"
              y="165"
              textAnchor="middle"
              fill="#0E1813"
              className="font-sans text-3xl font-semibold tracking-tight"
            >
              BORROWER
            </text>
          </g>

          <g
            onMouseEnter={() => setActiveNode("curator")}
            className={`cursor-pointer ${nodeTransitionClass}`}
            style={{
              transformOrigin: "1000px 160px",
              transform: nodeScale("curator"),
            }}
          >
            <path
              d="M 850 100 H 1150 V 220 H 910 A 60 60 0 0 0 850 160 Z"
              fill="#9CAEA4"
              stroke={isElemActive("curator") ? "#71B29F" : "#0E1813"}
              strokeWidth={isElemActive("curator") ? activeStrokeWidth : "2"}
            />
            <path
              d="M 850 100 H 1150 V 220 H 910 A 60 60 0 0 0 850 160 Z"
              fill="url(#guilloche)"
            />
            <path
              d="M 850 100 H 1150 V 220 H 910 A 60 60 0 0 0 850 160 Z"
              fill={
                activeNode === "curator"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.02)"
              }
            />
            <text
              x="1020"
              y="165"
              textAnchor="middle"
              fill="#0E1813"
              className="font-sans text-3xl font-semibold tracking-tight"
            >
              CURATOR
            </text>
          </g>

          <g
            onMouseEnter={() => setActiveNode("lenders")}
            className={`cursor-pointer ${nodeTransitionClass}`}
            style={{
              transformOrigin: "200px 640px",
              transform: nodeScale("lenders"),
            }}
          >
            <path
              d="M 50 580 H 290 A 60 60 0 0 0 350 640 V 700 H 50 Z"
              fill="#9CAEA4"
              stroke={isElemActive("lenders") ? "#71B29F" : "#0E1813"}
              strokeWidth={isElemActive("lenders") ? activeStrokeWidth : "2"}
            />
            <path
              d="M 50 580 H 290 A 60 60 0 0 0 350 640 V 700 H 50 Z"
              fill="url(#guilloche)"
            />
            <path
              d="M 50 580 H 290 A 60 60 0 0 0 350 640 V 700 H 50 Z"
              fill={
                activeNode === "lenders"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.02)"
              }
            />
            <text
              x="180"
              y="648"
              textAnchor="middle"
              fill="#0E1813"
              className="font-sans text-3xl font-semibold tracking-tight"
            >
              LENDERS
            </text>
          </g>

          <g
            onMouseEnter={() => setActiveNode("tranches")}
            className={`cursor-pointer ${nodeTransitionClass}`}
            style={{
              transformOrigin: "1000px 640px",
              transform: nodeScale("tranches"),
            }}
          >
            <path
              d="M 910 580 H 1150 V 700 H 850 V 640 A 60 60 0 0 0 910 580 Z"
              fill="#9CAEA4"
              stroke={isElemActive("tranches") ? "#71B29F" : "#0E1813"}
              strokeWidth={isElemActive("tranches") ? activeStrokeWidth : "2"}
            />
            <path
              d="M 910 580 H 1150 V 700 H 850 V 640 A 60 60 0 0 0 910 580 Z"
              fill="url(#guilloche)"
            />
            <path
              d="M 910 580 H 1150 V 700 H 850 V 640 A 60 60 0 0 0 910 580 Z"
              fill={
                activeNode === "tranches"
                  ? "rgba(255,255,255,0.4)"
                  : "rgba(0,0,0,0.02)"
              }
            />
            <text
              x="1020"
              y="648"
              textAnchor="middle"
              fill="#0E1813"
              className="font-sans text-3xl font-semibold tracking-tight"
            >
              TRANCHES
            </text>
          </g>

          <g
            onMouseEnter={() => setActiveNode("vault")}
            className={`cursor-pointer ${nodeTransitionClass}`}
            style={{
              transformOrigin: "600px 400px",
              transform: vaultScale,
            }}
          >
            <circle cx="600" cy="400" r="190" fill="#C9D6CE" />
            <circle
              cx="600"
              cy="400"
              r="190"
              fill="url(#guilloche-dense)"
              stroke={isElemActive("vault") ? "#71B29F" : "#0E1813"}
              strokeWidth={isElemActive("vault") ? activeStrokeWidth : "2"}
            />
            <circle
              cx="600"
              cy="400"
              r="170"
              fill="none"
              stroke={isElemActive("vault") ? "#71B29F" : "#0E1813"}
              strokeWidth="4"
              strokeDasharray="4 6"
            />
            <circle
              cx="600"
              cy="400"
              r="162"
              fill="none"
              stroke="#0E1813"
              strokeWidth="1"
            />
            <circle
              cx="600"
              cy="400"
              r="178"
              fill="none"
              stroke="#0E1813"
              strokeWidth="1"
            />
            <circle
              cx="600"
              cy="400"
              r="150"
              fill={isElemActive("vault") ? "#E8EBE6" : "#9CAEA4"}
              stroke="#0E1813"
              strokeWidth="2"
              className={
                reduceMotion
                  ? ""
                  : "transition-[fill,stroke] duration-200 ease-out"
              }
            />
            <circle
              cx="600"
              cy="400"
              r="140"
              fill="url(#guilloche)"
              stroke="none"
            />
            <text
              x="600"
              y="410"
              textAnchor="middle"
              fill="#0E1813"
              className="font-sans text-4xl font-bold tracking-tight"
            >
              Credit Vault
            </text>
          </g>

          <g className="fill-[#0E1813] font-mono text-[11px] font-semibold tracking-widest">
            <g
              onMouseEnter={() => setActiveNode("borrower")}
              className={labelTransitionClass}
            >
              <rect
                x="510"
                y="125"
                width="180"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={isElemActive("loanRequest") ? "#71B29F" : "#0E1813"}
                strokeWidth={
                  isElemActive("loanRequest") ? activeStrokeWidth : "2"
                }
              />
              <text x="600" y="145" textAnchor="middle">
                LOAN REQUEST
              </text>
            </g>

            <g
              onMouseEnter={() => setActiveNode("curator")}
              className={labelTransitionClass}
            >
              <rect
                x="510"
                y="165"
                width="180"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={
                  isElemActive("creditAssessment") ? "#71B29F" : "#0E1813"
                }
                strokeWidth={
                  isElemActive("creditAssessment") ? activeStrokeWidth : "2"
                }
              />
              <text x="600" y="185" textAnchor="middle">
                CREDIT ASSESSMENT
              </text>
            </g>

            <g
              onMouseEnter={() => setActiveNode("borrower")}
              className={labelTransitionClass}
            >
              <rect
                x="150"
                y="305"
                width="170"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={isElemActive("interestPayment") ? "#71B29F" : "#0E1813"}
                strokeWidth={
                  isElemActive("interestPayment") ? activeStrokeWidth : "2"
                }
              />
              <text x="235" y="325" textAnchor="middle">
                INTEREST PAYMENT
              </text>
            </g>

            <g
              onMouseEnter={() => setActiveNode("lenders")}
              className={labelTransitionClass}
            >
              <rect
                x="140"
                y="465"
                width="190"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={
                  isElemActive("liquidityProvision") ? "#71B29F" : "#0E1813"
                }
                strokeWidth={
                  isElemActive("liquidityProvision") ? activeStrokeWidth : "2"
                }
              />
              <text x="235" y="485" textAnchor="middle">
                LIQUIDITY PROVISION
              </text>
            </g>

            <g
              onMouseEnter={() => setActiveNode("curator")}
              className={labelTransitionClass}
            >
              <rect
                x="860"
                y="305"
                width="220"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={isElemActive("ratesManagement") ? "#71B29F" : "#0E1813"}
                strokeWidth={
                  isElemActive("ratesManagement") ? activeStrokeWidth : "2"
                }
              />
              <text x="970" y="325" textAnchor="middle">
                CYCLES, RATES MGMT
              </text>
            </g>

            <g
              onMouseEnter={() => setActiveNode("tranches")}
              className={labelTransitionClass}
            >
              <rect
                x="860"
                y="465"
                width="200"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={
                  isElemActive("riskDiversification") ? "#71B29F" : "#0E1813"
                }
                strokeWidth={
                  isElemActive("riskDiversification") ? activeStrokeWidth : "2"
                }
              />
              <text x="960" y="485" textAnchor="middle">
                RISK DIVERSIFICATION
              </text>
            </g>

            <g
              onMouseEnter={() => setActiveNode("lenders")}
              className={labelTransitionClass}
            >
              <rect
                x="510"
                y="625"
                width="180"
                height="30"
                rx="4"
                fill="#E8EBE6"
                stroke={
                  isElemActive("interestEarnings") ? "#71B29F" : "#0E1813"
                }
                strokeWidth={
                  isElemActive("interestEarnings") ? activeStrokeWidth : "2"
                }
              />
              <text x="600" y="645" textAnchor="middle">
                INTEREST EARNINGS
              </text>
            </g>
          </g>
        </svg>
      </div>

      <div className="flex w-full flex-col gap-4 lg:hidden">
        {Object.values(diagramNodes).map((node) => {
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              onClick={() => setActiveNode(isActive ? null : node.id)}
              className={`cursor-pointer rounded-[2rem] border p-6 transition-[background-color,border-color,box-shadow] duration-200 ease-out ${isActive ? "border-[#71B29F] bg-[#E8EBE6] shadow-lg" : "border-[#1A3326]/10 bg-[#C9D6CE]"}`}
            >
              <div className="flex items-center gap-4">
                <h4
                  className={`font-sans text-xl font-bold tracking-tight ${isActive ? "text-[#0E1813]" : "text-[#293B33]"}`}
                >
                  {node.label}
                </h4>
                <ChevronRight
                  size={20}
                  className={`ml-auto transition-transform ${isActive ? "rotate-90 text-[#71B29F]" : "text-[#1A3326]/50"}`}
                />
              </div>

              <AnimatePresence>
                {isActive ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 border-t border-[#1A3326]/10 pt-4">
                      <h5 className="mb-2 font-sans text-xs font-bold uppercase tracking-widest text-[#0E1813]">
                        {node.title}
                      </h5>
                      <p className="font-sans text-sm leading-relaxed text-[#293B33]">
                        {node.desc}
                      </p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const [activeNode, setActiveNode] = useState<DiagramNodeId | null>("vault");
  const reduceMotion = useReducedMotion();
  const activeData = activeNode ? diagramNodes[activeNode] : diagramNodes.vault;

  return (
    <section id="how-it-works" className="relative z-10 bg-[#E8EBE6] py-24">
      <SectionContainer>
        <div className="mb-16 text-center">
          <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-[#71B29F]">
            How It Works
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-[#0E1813] md:text-5xl">
            Where Roles Create Value.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#293B33]">
            An elegant, fully automated framework connecting capital allocators
            directly with vetted institutional demand.
          </p>
        </div>

        <InteractiveBanknote
          activeNode={activeNode}
          setActiveNode={setActiveNode}
        />
      </SectionContainer>

      <div className="pointer-events-none absolute inset-y-0 right-10 bottom-10 top-10 z-30 hidden lg:block">
        <div className="pointer-events-auto sticky top-[calc(100vh-15rem)] w-[280px]">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="mt-2 h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#71B29F]" />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeData.id}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full"
                >
                  <h4 className="mb-1 font-sans text-xl font-bold tracking-tight text-[#0E1813]">
                    {activeData.title}
                  </h4>
                  <p className="font-sans text-sm leading-relaxed text-[#293B33]">
                    {activeData.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
