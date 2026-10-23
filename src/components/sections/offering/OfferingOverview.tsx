import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import type { Plan } from "../../../data/plans";
import OfferingCta from "./OfferingCta";

const OPEN_EVENT = "offering:explanation-open";

/** An in-place card detail view. The original header stays above the frosted layer. */
const OfferingOverview = ({ plan, open, onOpenChange }: {
  plan: Plan;
  open: boolean;
  onOpenChange: (id: Plan["id"] | null) => void;
}) => {
  const id = useId();
  const trigger = useRef<HTMLButtonElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const pinned = useRef(false);
  const [card, setCard] = useState<HTMLElement | null>(null);
  const attachTrigger = useCallback((element: HTMLButtonElement | null) => {
    trigger.current = element;
    setCard(element?.closest<HTMLElement>(".offering-card") ?? null);
  }, []);

  const reveal = () => {
    window.clearTimeout(timer.current);
    document.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    onOpenChange(plan.id);
  };
  const close = () => {
    window.clearTimeout(timer.current);
    pinned.current = false;
    onOpenChange(null);
  };
  const scheduleClose = () => {
    window.clearTimeout(timer.current);
    if (pinned.current || card?.querySelector(":focus-visible")) return;
    timer.current = window.setTimeout(() => onOpenChange(null), 140);
  };

  useEffect(() => {
    if (!open) pinned.current = false;
    const onOtherExplanation = (event: Event) => {
      if (!open || (event as CustomEvent<string>).detail === id) return;
      window.clearTimeout(timer.current);
      pinned.current = false;
      onOpenChange(null);
    };
    document.addEventListener(OPEN_EVENT, onOtherExplanation);
    return () => {
      window.clearTimeout(timer.current);
      document.removeEventListener(OPEN_EVENT, onOtherExplanation);
    };
  }, [id, open, onOpenChange]);

  useLayoutEffect(() => {
    if (!card || !open) return;
    const visual = card.querySelector<HTMLElement>(".offering-card__visual");
    if (!visual) return;
    const divider = card.querySelector<HTMLElement>(".offering-card__includes");
    const measure = () => {
      if (getComputedStyle(card).display === "none") {
        onOpenChange(null);
        return;
      }
      const start = divider
        ? divider.getBoundingClientRect().top - card.getBoundingClientRect().top - card.clientTop
        : visual.offsetHeight;
      panel.current?.style.setProperty("--overview-start", `${start}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(visual);
    observer.observe(card);
    if (divider) observer.observe(divider);
    return () => observer.disconnect();
  }, [card, open, onOpenChange]);

  useEffect(() => {
    if (!open || !card) return;
    const dismiss = () => {
      window.clearTimeout(timer.current);
      pinned.current = false;
      onOpenChange(null);
    };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !card.contains(event.target)) dismiss();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (panel.current?.contains(document.activeElement)) trigger.current?.focus({ preventScroll: true });
      dismiss();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [card, open, onOpenChange]);

  return <>
    <button
      ref={attachTrigger}
      type="button"
      className="offering-tier-trigger"
      aria-label={`How ${plan.name} works`}
      aria-expanded={open}
      aria-controls={id}
      aria-describedby={open ? `${id}-description` : undefined}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") reveal(); }}
      onPointerLeave={scheduleClose}
      onFocus={reveal}
      onBlur={(event) => {
        if (!pinned.current && !panel.current?.contains(event.relatedTarget)) close();
      }}
      onClick={() => {
        if (pinned.current) close();
        else { reveal(); pinned.current = true; }
      }}
    >How it works<ChevronDown size={12} aria-hidden="true" /></button>
    {createPortal(<div
      ref={panel}
      id={id}
      role="region"
      aria-label={`${plan.name} overview`}
      hidden={!open}
      className="offering-overview"
      onPointerEnter={() => window.clearTimeout(timer.current)}
      onPointerLeave={scheduleClose}
      onBlurCapture={(event) => { if (!card?.contains(event.relatedTarget)) close(); }}
    >
      <div className="offering-overview__copy">
        <p id={`${id}-description`} className="offering-overview__lead">{plan.description}</p>
        <p className="offering-overview__context">{plan.overviewContext}</p>
      </div>
      <div className="offering-overview__action">
        <OfferingCta plan={plan} onActivate={close} />
      </div>
    </div>, card ?? document.body)}
  </>;
};

export default OfferingOverview;
