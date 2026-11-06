import { motion, useReducedMotion } from "framer-motion";
import { Bot, Check, FileSignature, PlugZap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME } from "../../data/brand";
import { requestContact } from "../../lib/siteNavigation";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { SectionContainer, SectionHeader } from "../ui/Section";
import AgentSession from "./agents/AgentSession";
import "./product/agent-context.css";

interface AgentStep {
  icon: LucideIcon;
  name: string;
  status: string;
  statusTone: "live" | "upcoming" | "soon";
  description: string;
  points: string[];
}

const steps: AgentStep[] = [
  {
    icon: PlugZap,
    name: MCP_PRODUCT_NAME,
    status: "Early access",
    statusTone: "live",
    description:
      "Connect Claude, Codex or any MCP client to your Pareto facilities. Query vaults, cycles, lenders and performance without exporting a single CSV.",
    points: [
      "Read-only, scoped to your facilities",
      "Works inside the agent workflows you already run",
      "Your collateral data stays in your own stack",
    ],
  },
  {
    icon: FileSignature,
    name: "Agent-prepared actions",
    status: "Upcoming",
    statusTone: "upcoming",
    description:
      "Agents draft lender reports, borrowing-base updates and covenant attestations. Your team reviews and signs in Studio before anything reaches the vault.",
    points: [
      "Drafts land in a Studio signing inbox",
      "Wallet or multisig approval for every change",
    ],
  },
  {
    icon: Bot,
    name: AI_PRODUCT_NAME,
    status: "Beta",
    statusTone: "live",
    description:
      "An underwriting companion for borrower-document review and credit-memo drafts. Ongoing facility monitoring is planned.",
    points: [
      "Document review and risk flags",
      "Credit memo drafts",
      "Ongoing monitoring planned",
    ],
  },
];

const statusClass: Record<AgentStep["statusTone"], string> = {
  live: "border-[color:rgb(114_244_201_/_0.4)] bg-[color:rgb(114_244_201_/_0.1)] text-[var(--color-brand-bright)]",
  upcoming: "border-[color:rgb(147_197_253_/_0.35)] bg-[color:rgb(147_197_253_/_0.08)] text-[var(--color-state-info)]",
  soon: "border-[color:rgb(255_255_255_/_0.18)] bg-[color:rgb(255_255_255_/_0.04)] text-[color:rgb(255_255_255_/_0.7)]",
};

function BriefAgentsSection() {
  return (
    <section id="agents" className="agent-brief-section">
      <SectionContainer className="ui-section-shell">
        <div className="agent-brief-layout">
          <div className="agent-brief-copy">
            <p className="agent-context-kicker">Agentic Credit Operations</p>
            <h2>Credit infrastructure for the AI era.</h2>
            <p className="agent-brief-intro">
              Connect your data, your agents and your credit team.
            </p>
            <dl className="agent-brief-capabilities">
              <div>
                <dt>
                  <span>{MCP_PRODUCT_NAME}</span>{" "}
                  <span className="agent-status agent-status--access">
                    Early access
                  </span>
                </dt>
                <dd>Facility data, connected to your workflow.</dd>
              </div>
              <div>
                <dt>
                  <span>Pareto Agents</span>{" "}
                  <span className="agent-status agent-status--upcoming">
                    Upcoming
                  </span>
                </dt>
                <dd>Operational support, reviewed by your team.</dd>
              </div>
              <div>
                <dt>
                  <span>{AI_PRODUCT_NAME}</span>{" "}
                  <span className="agent-status agent-status--beta">Beta</span>
                </dt>
                <dd>Your AI underwriting companion.</dd>
              </div>
            </dl>
            <Button
              variant="primary"
              size="md"
              onClick={() => requestContact(`${MCP_PRODUCT_NAME} early access`)}
            >
              Join early access
            </Button>
          </div>
          <AgentSession />
        </div>
      </SectionContainer>
    </section>
  );
}

const AgentsSection = ({
  variant = "compact",
}: {
  variant?: "compact" | "studio" | "credit-vaults";
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (variant === "compact") return <BriefAgentsSection />;

  return (
    <section
      id="agents"
      className="relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-inverse)]"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[color:rgb(112_177_158_/_0.12)] blur-[150px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[color:rgb(59_130_246_/_0.07)] blur-[130px]" />

      <SectionContainer className="ui-section-shell relative z-10">
        <SectionHeader
          eyebrow="Agentic Credit Operations"
          title={
            <>
              Credit infrastructure{" "}
              <span className="text-[color:rgb(255_255_255_/_0.65)]">
                for the AI era.
              </span>
            </>
          }
          description="Bring AI agents, connected data and human expertise into one workflow – helping credit teams work more efficiently, make informed decisions and focus on what comes next."
          tone="dark"
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <ol className="relative flex flex-col gap-3 sm:gap-4">
            {steps.map((step, index) => (
              <motion.li
                key={step.name}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "flex flex-1 flex-col ui-radius-card border p-5 sm:p-6",
                  index === 0
                    ? "border-[color:rgb(114_244_201_/_0.28)] bg-[color:rgb(114_244_201_/_0.05)]"
                    : "border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.025)]"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center ui-radius-card border border-[color:rgb(255_255_255_/_0.1)] bg-[color:rgb(255_255_255_/_0.04)] text-[var(--color-brand-bright)]">
                      <step.icon size={18} />
                    </span>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:rgb(255_255_255_/_0.45)]">
                        Step 0{index + 1}
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {step.name}
                      </h3>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em]",
                      statusClass[step.statusTone]
                    )}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.68)]">
                  {step.description}
                </p>
                <ul className="mt-auto hidden flex-wrap gap-x-5 gap-y-2 pt-4 sm:flex">
                  {step.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-[12.5px] text-[color:rgb(255_255_255_/_0.8)]"
                    >
                      <Check
                        size={13}
                        className="text-[var(--color-brand-alt)]"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>

          <div className="flex flex-col">
            <div className="flex-1">
              <AgentSession />
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs leading-relaxed text-[color:rgb(255_255_255_/_0.5)]">
                Credit decisions stay with the facility's curator. Agents never
                move funds; every state change is signed by a person.
              </p>
              <Button
                variant="primary"
                size="md"
                className="shrink-0"
                onClick={() =>
                  requestContact(`${MCP_PRODUCT_NAME} early access`)
                }
              >
                Join early access
              </Button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default AgentsSection;
