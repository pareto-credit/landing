"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import paretoMark from "../../../assets/svgs/pareto-mark-white.svg";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import {
  borrowerFacility,
  initialRequests,
  initialTransactions,
  productScenarios,
  type ActivityRow,
  type PersonaDesk,
} from "./studioDeskData";
import StudioOverview from "./StudioOverview";
import LenderPortfolio from "./LenderPortfolio";
import StudioWorkspaceScreens, {
  type StudioWorkspaceView,
} from "./StudioWorkspaceScreens";
import "./studio-preview.css";
import "./studio-motion.css";

const EVENT_INTERVAL_MS = 2600;
const FINAL_HOLD_MS = 3200;
interface StudioDeskProps {
  desk: PersonaDesk;
  isLive?: boolean;
  pauseEvents?: boolean;
  onComplete?: () => void;
  workspaceView?: StudioWorkspaceView | "overview";
  animateWorkspace?: boolean;
}

/** Each role gets its own sequence; completion is emitted after the last event settles. */
export default function StudioDesk(props: StudioDeskProps) {
  return <ProductSession key={props.desk.id} {...props} />;
}

function ProductSession({
  desk,
  isLive = false,
  pauseEvents = false,
  onComplete,
  workspaceView,
  animateWorkspace = true,
}: StudioDeskProps) {
  const reduced = Boolean(useReducedMotion());
  const visible = usePageVisibility();
  const [eventCount, setEventCount] = useState(0);
  const completed = useRef(false);
  const scenario = productScenarios[desk.id];
  const motionRunning = isLive && visible && !reduced;
  const lender = desk.id === "allocate";
  const screenView =
    !lender && workspaceView !== "overview" ? workspaceView : undefined;
  const playing =
    motionRunning &&
    !pauseEvents &&
    (!screenView || screenView === "operations");
  const screenLabels = {
    structuring: {
      title: "Create vault",
      section: "Management / Vaults",
      navigation: "Vaults",
    },
    operations: {
      title: "Requests",
      section: "Management / Requests",
      navigation: "Requests",
    },
    participants: {
      title: "Users",
      section: "Admin / Users",
      navigation: "Users",
    },
    reporting: {
      title: "Reports",
      section: "Management / Reports",
      navigation: "Reports",
    },
  };
  const screen = screenView ? screenLabels[screenView] : undefined;
  const tourTargets: Record<string, StudioWorkspaceView> = {
    Vaults: "structuring",
    Requests: "operations",
    Users: "participants",
    Reports: "reporting",
  };
  const navSymbols: Record<string, string> = {
    Vaults: "◇",
    Orchestrators: "⌘",
    Requests: "⇄",
    Transactions: "↗",
    Reports: "▤",
    Operators: "⌖",
    Lenders: "◌",
  };
  const received = scenario.events.slice(0, eventCount);
  const latest = received.at(-1);
  const requestEvents = received.filter((event) => event.kind === "request");
  const transactionEvents = received.filter(
    (event) => event.kind === "transaction"
  );
  const prependRows = (kind: "request" | "transaction", base: ActivityRow[]) =>
    [
      ...received
        .filter((event) => event.kind === kind && event.row)
        .map((event) => event.row!)
        .reverse(),
      ...base,
    ].slice(0, 4);
  const requests = prependRows("request", initialRequests);
  const transactions = prependRows("transaction", initialTransactions);
  const outstanding =
    borrowerFacility.openingOutstanding +
    received.reduce((total, event) => total + (event.outstandingDelta ?? 0), 0);

  useEffect(() => {
    if (!playing || completed.current) return;
    const finished = eventCount === scenario.events.length;
    const timer = window.setTimeout(
      () => {
        if (!finished) setEventCount((current) => current + 1);
        else if (onComplete) {
          completed.current = true;
          onComplete();
        } else setEventCount(0);
      },
      finished ? FINAL_HOLD_MS : EVENT_INTERVAL_MS
    );
    return () => window.clearTimeout(timer);
  }, [eventCount, onComplete, playing, scenario.events.length]);

  return (
    <div
      data-testid="studio-desk"
      data-persona={desk.id}
      data-playing={playing}
      data-motion-running={motionRunning}
      data-reduced-motion={reduced}
      data-workspace-view={screenView}
      className={`product-preview ${lender ? "product-preview--lender" : ""}`}
    >
      <div className="product-preview__chrome">
        <span>{lender ? "app.pareto.credit" : "studio.pareto.credit"}</span>
        <span className="product-preview__demo">Illustrative</span>
      </div>
      <div className="product-preview__app">
        {!lender && (
          <aside
            className="product-preview__sidebar"
            aria-label="Preview workspace"
          >
            <div className="product-preview__brand">
              <img src={paretoMark} alt="Pareto" />
              <span>
                Pareto<small>STUDIO</small>
              </span>
            </div>
            <span className="product-preview__nav-group">Analytics</span>
            <span
              className={!screenView ? "is-selected" : undefined}
              aria-current={!screenView ? "page" : undefined}
            >
              <span aria-hidden="true">◉</span> Overview
            </span>
            <span>
              <span aria-hidden="true">▥</span> Platform
            </span>
            <span className="product-preview__nav-group">Management</span>
            {[
              "Vaults",
              "Orchestrators",
              "Requests",
              "Transactions",
              ...(workspaceView ? ["Reports"] : []),
              "Operators",
              "Lenders",
            ].map((label) => (
              <span
                key={label}
                data-tour-target={
                  workspaceView ? tourTargets[label] : undefined
                }
                aria-current={screen?.navigation === label ? "page" : undefined}
                className={
                  screen?.navigation === label
                    ? "is-selected"
                    : (!screenView || screenView === "operations") &&
                      ((latest?.kind === "request" && label === "Requests") ||
                        (latest?.kind === "transaction" &&
                          label === "Transactions"))
                    ? "product-preview__nav-notified"
                    : ""
                }
              >
                <span
                  className="product-preview__nav-symbol"
                  aria-hidden="true"
                >
                  {navSymbols[label]}
                </span>
                {label}
                {label === "Requests" && requestEvents.length > 0 && (
                  <b>{requestEvents.length}</b>
                )}
              </span>
            ))}
            <span className="product-preview__nav-group">Admin</span>
            {["Settings", "Profile", "Users", "Agents"].map((label) => (
              <span
                key={label}
                data-tour-target={
                  workspaceView ? tourTargets[label] : undefined
                }
                aria-current={screen?.navigation === label ? "page" : undefined}
                className={
                  screen?.navigation === label ? "is-selected" : undefined
                }
              >
                <span aria-hidden="true">·</span>
                {label}
              </span>
            ))}
            <small className="product-preview__sidebar-foot">
              {desk.crumb}
            </small>
          </aside>
        )}
        <div className="product-preview__main">
          <div className="product-preview__header">
            {lender ? (
              <>
                <div className="product-preview__brand">
                  <img src={paretoMark} alt="Pareto" />
                  <span>Pareto</span>
                </div>
                <div className="product-preview__nav" aria-hidden="true">
                  <span>Home</span>
                  <span>Earn</span>
                  <span className="is-selected">Portfolio</span>
                </div>
              </>
            ) : (
              <span className="product-preview__micro">
                {screen?.section ?? "Analytics"}
              </span>
            )}
            <div className="product-preview__account">
              <span
                className="product-preview__notification-dot"
                data-active={Boolean(latest)}
                aria-hidden="true"
              />
              <span>{lender ? "Demo wallet" : "Originator workspace"}</span>
              <span className="product-preview__avatar" aria-hidden="true">
                P
              </span>
            </div>
          </div>
          <div className="product-preview__content">
            {!lender && (
              <div className="product-preview__heading">
                <div>
                  <p className="product-preview__micro">
                    {screen?.section ?? "Analytics"}
                  </p>
                  <h3>{screen?.title ?? scenario.title}</h3>
                </div>
                <span className="product-preview__pill">USDC · Ethereum</span>
              </div>
            )}
            {lender ? (
              <LenderPortfolio events={received} />
            ) : screenView ? (
              <StudioWorkspaceScreens
                view={screenView}
                requests={requests}
                transactions={transactions}
                requestCount={requestEvents.length}
                newRequestId={requestEvents.at(-1)?.row?.id}
                newTransactionId={transactionEvents.at(-1)?.row?.id}
                isLive={motionRunning && !pauseEvents}
                reduced={reduced}
                animateEntrance={animateWorkspace}
              />
            ) : (
              <StudioOverview
                role={desk.id}
                requests={requests}
                transactions={transactions}
                requestCount={requestEvents.length}
                outstanding={outstanding}
                newRequestId={requestEvents.at(-1)?.row?.id}
                newTransactionId={transactionEvents.at(-1)?.row?.id}
                reduced={reduced}
              />
            )}
          </div>
        </div>
        <div className="product-preview__notifications" aria-hidden="true">
          <AnimatePresence initial={false} mode="wait">
            {latest && (!screenView || screenView === "operations") && (
              <motion.div
                key={latest.title + eventCount}
                className="product-preview__notification"
                data-kind={latest.kind}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="product-preview__notification-icon">
                  {latest.kind === "report" ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M11.5 2.5H4.5v15h11V6.5Zm0 0v4h4M7 10h6M7 13h4" />
                    </svg>
                  ) : latest.kind === "request" ||
                    latest.kind === "withdrawal" ? (
                    "↙"
                  ) : (
                    "✓"
                  )}
                </span>
                <div>
                  <strong>{latest.title}</strong>
                  <p>{latest.detail}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="product-preview__notice">
        Demo data and simulated activity.
      </p>
    </div>
  );
}
