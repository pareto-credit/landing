import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Bot, Check, FileSignature, LoaderCircle, PlugZap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME } from "../../data/brand";
import { requestContact } from "../../lib/siteNavigation";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { SectionContainer, SectionHeader } from "../ui/Section";

interface AgentStep {
  icon: LucideIcon;
  name: string;
  status: string;
  statusTone: "live" | "next" | "soon";
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
    status: "Next",
    statusTone: "next",
    description:
      "Agents draft lender reports, borrowing-base updates and covenant attestations. Your team reviews and signs in Studio before anything reaches the vault.",
    points: ["Drafts land in a Studio signing inbox", "Wallet or multisig approval for every change"],
  },
  {
    icon: Bot,
    name: AI_PRODUCT_NAME,
    status: "Coming soon",
    statusTone: "soon",
    description:
      "Pareto's own credit assessment agent: it reviews borrower documents, drafts the credit memo and keeps watching the facility after launch.",
    points: ["Document review and risk flags", "Credit memo drafts", "Ongoing monitoring alerts"],
  },
];

const statusClass: Record<AgentStep["statusTone"], string> = {
  live: "border-[color:rgb(114_244_201_/_0.4)] bg-[color:rgb(114_244_201_/_0.1)] text-[var(--color-brand-bright)]",
  next: "border-[color:rgb(147_197_253_/_0.35)] bg-[color:rgb(147_197_253_/_0.08)] text-[var(--color-state-info)]",
  soon: "border-[color:rgb(255_255_255_/_0.18)] bg-[color:rgb(255_255_255_/_0.04)] text-[color:rgb(255_255_255_/_0.7)]",
};

const toolCalls = [
  { name: "list_facilities", result: "6 facilities" },
  { name: "get_repayment_schedule", result: "3 due this week" },
  { name: "get_vault_state", result: "LTV and headroom" },
];

const answerRows: Array<[string, string, string, string]> = [
  ["Trade Finance II", "$412k", "Fri", "Borrowing base OK"],
  ["Market Maker Line", "$96k", "Wed", "$3.2M undrawn"],
  ["BTC Credit I", "$230k", "Thu", "LTV 54% / 65%"],
];

const PROMPT =
  "Which of my facilities have payments due this week, and how much headroom do they have?";

/** Demo timeline in milliseconds; the session loops while on screen. */
const TIMELINE = {
  typeStart: 400,
  typeEnd: 2200,
  toolStart: 2500,
  toolStep: 750,
  answer: 4900,
  rowStart: 5200,
  rowStep: 280,
  followUp: 6200,
  total: 11000,
};
const TICK_MS = 50;

const useSessionClock = (isRunning: boolean) => {
  const [elapsed, setElapsed] = useState(isRunning ? 0 : TIMELINE.total);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setElapsed((current) => (current + TICK_MS >= TIMELINE.total ? 0 : current + TICK_MS));
    }, TICK_MS);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  return isRunning ? elapsed : TIMELINE.total;
};

const reveal = (isVisible: boolean) =>
  cn("transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none", isVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0");

const AgentSession = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();
  const elapsed = useSessionClock(isInView && !shouldReduceMotion);

  const typedLength = Math.round(
    Math.min(1, Math.max(0, (elapsed - TIMELINE.typeStart) / (TIMELINE.typeEnd - TIMELINE.typeStart))) * PROMPT.length,
  );
  const isTyping = elapsed >= TIMELINE.typeStart && elapsed < TIMELINE.typeEnd;
  const toolState = (index: number) => {
    const start = TIMELINE.toolStart + index * TIMELINE.toolStep;
    if (elapsed < start) return "idle";
    if (elapsed < start + TIMELINE.toolStep) return "running";
    return "done";
  };
  const isThinking = elapsed >= TIMELINE.typeEnd && elapsed < TIMELINE.answer;

  return (
    <div
      ref={ref}
      data-testid="agent-session"
      className="relative flex h-full flex-col overflow-hidden ui-radius-panel border border-[color:rgb(255_255_255_/_0.1)] bg-[#0b1511] shadow-[0_40px_90px_rgb(0_0_0_/_0.4),0_0_60px_rgb(114_244_201_/_0.08)]"
    >
      <div className="flex items-center justify-between border-b border-[color:rgb(255_255_255_/_0.07)] bg-[linear-gradient(90deg,rgb(114_244_201_/_0.06),transparent_50%,rgb(167_139_250_/_0.06))] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(255_255_255_/_0.14)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(255_255_255_/_0.14)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:rgb(255_255_255_/_0.14)]" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[color:rgb(196_214_206_/_0.7)]">
            Your agent · Claude
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-brand-bright)]">
          <span className="h-1.5 w-1.5 animate-pulse motion-reduce:animate-none rounded-full bg-[var(--color-brand-bright)]" />
          {MCP_PRODUCT_NAME} connected
        </span>
      </div>

      <div className="flex-1 space-y-4 p-4 sm:p-5">
        <div
          className={cn(
            "relative ml-auto max-w-[85%] ui-radius-card bg-[color:rgb(255_255_255_/_0.06)] px-4 py-3 text-[13px] leading-relaxed text-[var(--color-text-inverse)]",
            reveal(elapsed >= TIMELINE.typeStart),
          )}
        >
          <span className="invisible" aria-hidden="true">
            {PROMPT}
          </span>
          <span className="absolute inset-0 px-4 py-3">
            {PROMPT.slice(0, typedLength)}
            {isTyping ? (
              <span className="ml-px inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-[var(--color-brand-bright)]" />
            ) : null}
          </span>
        </div>

        <ul className="space-y-1.5">
          {toolCalls.map((call, index) => {
            const state = toolState(index);
            return (
              <li
                key={call.name}
                className={cn(
                  "flex items-center justify-between gap-3 ui-radius-control border px-3 py-2 font-mono text-[11px]",
                  state === "running"
                    ? "border-[color:rgb(56_189_248_/_0.35)] bg-[color:rgb(56_189_248_/_0.06)]"
                    : "border-[color:rgb(255_255_255_/_0.06)] bg-[color:rgb(255_255_255_/_0.02)]",
                  reveal(state !== "idle"),
                )}
              >
                <span className="truncate text-[color:rgb(196_214_206_/_0.8)]">
                  <span className="text-[var(--color-brand-bright)]">pareto</span> · {call.name}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-[color:rgb(196_214_206_/_0.6)]">
                  {state === "running" ? (
                    <>
                      <LoaderCircle size={12} className="animate-spin text-[#38bdf8]" />
                      running
                    </>
                  ) : (
                    <>
                      <Check size={12} className="text-[var(--color-brand-bright)]" />
                      {call.result}
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="relative text-[13px] leading-relaxed text-[color:rgb(255_255_255_/_0.85)]">
          <div
            className={cn(
              "absolute left-0 top-0 flex items-center gap-1.5 font-mono text-[11px] text-[color:rgb(196_214_206_/_0.6)]",
              reveal(isThinking),
            )}
            aria-hidden="true"
          >
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-brand-bright)]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-brand-bright)] [animation-delay:120ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--color-brand-bright)] [animation-delay:240ms]" />
          </div>
          <p className={reveal(elapsed >= TIMELINE.answer)}>Three facilities have payments due by Friday:</p>
          <table className="mt-3 w-full text-left text-[12px]">
            <thead className={reveal(elapsed >= TIMELINE.answer)}>
              <tr className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[color:rgb(196_214_206_/_0.6)]">
                <th className="pb-2 font-normal">Facility</th>
                <th className="pb-2 text-right font-normal">Due</th>
                <th className="hidden pb-2 text-right font-normal sm:table-cell">Day</th>
                <th className="pb-2 text-right font-normal">Headroom</th>
              </tr>
            </thead>
            <tbody>
              {answerRows.map(([facility, due, day, headroom], index) => (
                <tr
                  key={facility}
                  className={cn(
                    "border-t border-[color:rgb(255_255_255_/_0.06)]",
                    reveal(elapsed >= TIMELINE.rowStart + index * TIMELINE.rowStep),
                  )}
                >
                  <td className="py-2 text-[var(--color-text-inverse)]">{facility}</td>
                  <td className="py-2 text-right font-mono text-[11.5px] text-[var(--color-brand-bright)]">{due}</td>
                  <td className="hidden py-2 text-right text-[color:rgb(196_214_206_/_0.75)] sm:table-cell">{day}</td>
                  <td className="py-2 text-right text-[color:rgb(196_214_206_/_0.75)]">{headroom}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={cn("mt-3 text-[color:rgb(255_255_255_/_0.6)]", reveal(elapsed >= TIMELINE.followUp))}>
            Want me to draft the lender notices? I'll queue them for your
            signature in Studio.
          </p>
        </div>
      </div>

      <div className="border-t border-[color:rgb(255_255_255_/_0.07)] px-4 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[color:rgb(196_214_206_/_0.5)]">
        Illustrative session · read-only tools
      </div>
    </div>
  );
};

const AgentsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="agents"
      className="relative overflow-hidden bg-[var(--color-bg-page)] text-[var(--color-text-inverse)]"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[color:rgb(112_177_158_/_0.12)] blur-[150px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[color:rgb(59_130_246_/_0.07)] blur-[130px]" />

      <SectionContainer className="ui-section-shell relative z-10">
        <SectionHeader
          eyebrow="Agentic credit underwriting"
          title={<>Agents draft. <span className="text-[color:rgb(255_255_255_/_0.65)]">Humans sign.</span></>}
          description="Underwriters already work in Claude and Codex. Pareto brings facility data, and soon facility actions, into those workflows, so agents take on the back office while a named curator stays accountable for the credit."
          tone="dark"
        />

        <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <ol className="relative flex flex-col gap-3 sm:gap-4">
            {steps.map((step, index) => (
              <motion.li
                key={step.name}
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "flex flex-1 flex-col ui-radius-card border p-5 sm:p-6",
                  index === 0
                    ? "border-[color:rgb(114_244_201_/_0.28)] bg-[color:rgb(114_244_201_/_0.05)]"
                    : "border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.025)]",
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
                      <h3 className="text-lg font-semibold tracking-tight">{step.name}</h3>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em]",
                      statusClass[step.statusTone],
                    )}
                  >
                    {step.status}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.68)]">{step.description}</p>
                <ul className="mt-auto hidden flex-wrap gap-x-5 gap-y-2 pt-4 sm:flex">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-[12.5px] text-[color:rgb(255_255_255_/_0.8)]">
                      <Check size={13} className="text-[var(--color-brand-alt)]" />
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
                onClick={() => requestContact(`${MCP_PRODUCT_NAME} early access`)}
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
