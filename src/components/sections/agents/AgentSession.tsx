import { useEffect, useId, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, LoaderCircle, Pause, Play } from "lucide-react";
import { MCP_PRODUCT_NAME } from "../../../data/brand";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import "./agent-session.css";

const PROMPT = "Summarise my vault balances and latest activity.";
const toolCalls = [
  { name: "list_vaults", result: "3 vaults" },
  { name: "get_vault_performance", result: "Performance loaded" },
  { name: "list_transactions", result: "Activity retrieved" },
];
const answerRows = [
  ["Aster USDC", "$248.6M", "Drawdown confirmed"],
  ["Meridian USDC", "$176.4M", "Interest received"],
  ["Harbour USDT", "$125.0M", "Repayment received"],
];
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

function useSessionClock(running: boolean, reduced: boolean) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setElapsed((current) => (current + TICK_MS) % TIMELINE.total);
    }, TICK_MS);
    return () => window.clearInterval(interval);
  }, [running]);
  return reduced ? TIMELINE.total : elapsed;
}

/** An illustrative read-only conversation, shared by the homepage and products. */
export default function AgentSession() {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const inView = useInView(ref, { amount: 0.25 });
  const reduced = Boolean(useReducedMotion());
  const visible = usePageVisibility();
  const [paused, setPaused] = useState(false);
  const running = inView && visible && !reduced && !paused;
  const elapsed = useSessionClock(running, reduced);
  const typedLength = Math.round(
    Math.min(
      1,
      Math.max(
        0,
        (elapsed - TIMELINE.typeStart) / (TIMELINE.typeEnd - TIMELINE.typeStart)
      )
    ) * PROMPT.length
  );
  const typing = elapsed >= TIMELINE.typeStart && elapsed < TIMELINE.typeEnd;
  const thinking = elapsed >= TIMELINE.typeEnd && elapsed < TIMELINE.answer;
  const reveal = (shown: boolean) =>
    `agent-session__reveal ${shown ? "is-visible" : ""}`;

  return (
    <div
      ref={ref}
      className="agent-session"
      data-testid="agent-session"
      data-running={running}
    >
      <div
        className="agent-session__content"
        role="img"
        aria-label="Illustrative Pareto MCP session"
        aria-describedby={`${id}-description`}
      >
        <p id={`${id}-description`} className="sr-only">
          An agent receives a prompt to summarise vault balances and latest
          activity. Pareto MCP retrieves vault data, performance and
          transactions, then returns a three-vault summary for the team to
          review. Illustrative read-only tools; no funds are moved.
        </p>
        <div className="agent-session__visual" aria-hidden="true">
          <div className="agent-session__header">
            <span className="agent-session__client">
              <span className="agent-session__window" />
              <span className="agent-session__window" />
              <span className="agent-session__window" />
              <span>Your LLM</span>
            </span>
            <span className="agent-session__connection">
              <span />
              {MCP_PRODUCT_NAME} connected
            </span>
          </div>
          <div className="agent-session__body">
            <p
              className={`agent-session__prompt ${reveal(
                elapsed >= TIMELINE.typeStart
              )}`}
            >
              <span className="agent-session__prompt-reserve">{PROMPT}</span>
              <span className="agent-session__prompt-text">
                {PROMPT.slice(0, typedLength)}
                {typing ? <span className="agent-session__caret" /> : null}
              </span>
            </p>
            <ul className="agent-session__tools">
              {toolCalls.map((call, index) => {
                const start = TIMELINE.toolStart + index * TIMELINE.toolStep;
                const state =
                  elapsed < start
                    ? "idle"
                    : elapsed < start + TIMELINE.toolStep
                    ? "running"
                    : "done";
                return (
                  <li
                    key={call.name}
                    data-state={state}
                    className={reveal(state !== "idle")}
                  >
                    <span className="agent-session__tool">
                      <span>pareto</span>
                      <span>·</span>
                      <span>{call.name}</span>
                    </span>
                    <span className="agent-session__tool-status">
                      {state === "running" ? (
                        <>
                          <LoaderCircle
                            size={12}
                            className="agent-session__spinner"
                          />
                          running
                        </>
                      ) : state === "done" ? (
                        <>
                          <Check size={12} />
                          {call.result}
                        </>
                      ) : null}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="agent-session__response">
              <div className="agent-session__response-heading">
                <p className={`agent-session__thinking ${reveal(thinking)}`}>
                  Reading facility data
                  <span />
                  <span />
                  <span />
                </p>
                <p className={reveal(elapsed >= TIMELINE.answer)}>
                  Here is the latest activity across your vaults:
                </p>
              </div>
              <table
                className={reveal(elapsed >= TIMELINE.answer)}
                style={{
                  visibility: elapsed >= TIMELINE.answer ? "visible" : "hidden",
                }}
              >
                <thead className={reveal(elapsed >= TIMELINE.answer)}>
                  <tr>
                    <th>Vault</th>
                    <th>Net assets</th>
                    <th>Latest activity</th>
                  </tr>
                </thead>
                <tbody>
                  {answerRows.map(([name, assets, activity], index) => {
                    const rowVisible =
                      elapsed >= TIMELINE.rowStart + index * TIMELINE.rowStep;
                    return (
                      <tr
                        key={name}
                        className={reveal(rowVisible)}
                        style={{
                          visibility: rowVisible ? "visible" : "hidden",
                        }}
                      >
                        <td>{name}</td>
                        <td>{assets}</td>
                        <td>{activity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p
                className={`agent-session__follow-up ${reveal(
                  elapsed >= TIMELINE.followUp
                )}`}
              >
                I can turn this into a reporting summary for your team to
                review.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="agent-session__footer">
        <span>Illustrative session · read-only tools</span>
        {!reduced ? (
          <button
            type="button"
            className="agent-session__motion-control"
            aria-label={
              paused ? "Resume agent animation" : "Pause agent animation"
            }
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? (
              <Play size={12} aria-hidden="true" />
            ) : (
              <Pause size={12} aria-hidden="true" />
            )}
            {paused ? "Resume" : "Pause"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
