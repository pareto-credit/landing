import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import StudioDesk from "./StudioDesk";
import { personaDesks } from "./studioDeskData";
import "./studio-showcase.css";

/** The same role-aware, bounded product preview is shared by the home and Studio pages. */
export default function StudioPreview({
  mode = "desks",
}: {
  mode?: "desks" | "guided";
}) {
  const guided = mode === "guided";
  const pageVisible = usePageVisibility();
  const previewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(previewRef, { amount: 0.15 });
  const [active, setActive] = useState(0);
  const [previewFocused, setPreviewFocused] = useState(false);
  const reduced = useReducedMotion();
  const advancePersona = useCallback(
    () => setActive((current) => (current + 1) % personaDesks.length),
    []
  );

  useEffect(() => {
    const frame = previewRef.current;
    if (!frame || typeof ResizeObserver === "undefined") return;
    const sizeBorder = (width: number, height: number) => {
      if (width > 0 && height > 0) {
        frame.style.setProperty(
          "--studio-border-size",
          `${Math.ceil(Math.hypot(width, height) * 1.1)}px`
        );
      }
    };
    const bounds = frame.getBoundingClientRect();
    sizeBorder(bounds.width, bounds.height);
    const observer = new ResizeObserver(([entry]) => {
      if (entry) sizeBorder(entry.contentRect.width, entry.contentRect.height);
    });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const prefix = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const select = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % 3
        : event.key === "ArrowLeft"
        ? (index + 2) % 3
        : event.key === "Home"
        ? 0
        : event.key === "End"
        ? 2
        : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      {!guided && (
        <div
          role="tablist"
          aria-label="Studio desks"
          className="mb-6 grid grid-cols-3 gap-2 border-b border-white/15 pb-3"
        >
          {personaDesks.map((item, index) => (
            <button
              key={item.id}
              type="button"
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              id={`${prefix}-tab-${item.id}`}
              aria-selected={active === index}
              aria-controls={`${prefix}-panel-${item.id}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => select(event, index)}
              className={`min-h-14 rounded-[4px] px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c1d9b1] ${
                active === index
                  ? "bg-white/10 text-[#d5e6c9]"
                  : "text-white/55 hover:bg-white/5"
              }`}
            >
              <span className="block font-mono text-[11px] uppercase tracking-wider">
                {item.tab}
              </span>
              <span className="mt-1 hidden text-xs sm:block">
                {item.audience}
              </span>
            </button>
          ))}
        </div>
      )}
      <div
        ref={previewRef}
        role={guided ? "img" : "region"}
        aria-label={
          guided
            ? "Animated Studio workspace showing underwriters, borrowers and lenders"
            : "Animated product preview"
        }
        className="studio-preview-frame"
        data-running={isInView && pageVisible && !reduced}
        onFocusCapture={() => setPreviewFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPreviewFocused(false);
          }
        }}
      >
        <div
          className="studio-preview-content"
          inert={guided || undefined}
          aria-hidden={guided || undefined}
        >
          {personaDesks.map((desk, index) => (
            <div
              key={desk.id}
              id={`${prefix}-panel-${desk.id}`}
              role={guided ? undefined : "tabpanel"}
              aria-labelledby={guided ? undefined : `${prefix}-tab-${desk.id}`}
              hidden={active !== index}
            >
              {active === index && (
                <motion.div
                  key={desk.id}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StudioDesk
                    desk={desk}
                    isLive={isInView}
                    pauseEvents={previewFocused}
                    onComplete={advancePersona}
                    workspaceView={guided ? "overview" : undefined}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
