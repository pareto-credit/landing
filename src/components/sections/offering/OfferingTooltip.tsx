import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Position = { left: number; top: number; placement: "top" | "bottom" };

const OPEN_EVENT = "offering:explanation-open";

const OfferingTooltip = ({ label, heading, children, content, className }: {
  label: string;
  heading?: string;
  children: ReactNode;
  content: string;
  className: string;
}) => {
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const id = useId();

  const cancelClose = () => window.clearTimeout(timer.current);
  const reveal = () => {
    cancelClose();
    // A pinned note yields to the next explanation, keeping one reading context.
    document.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: id }));
    setOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    if (pinned || trigger.current?.matches(":focus-visible")) return;
    // Let the pointer cross the small gap between the trigger and its explanation.
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    const onOtherExplanation = (event: Event) => {
      if ((event as CustomEvent<string>).detail === id) return;
      window.clearTimeout(timer.current);
      setOpen(false);
      setPinned(false);
    };
    document.addEventListener(OPEN_EVENT, onOtherExplanation);
    return () => {
      window.clearTimeout(timer.current);
      document.removeEventListener(OPEN_EVENT, onOtherExplanation);
    };
  }, [id]);

  useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      if (!trigger.current || !panel.current) return;
      const rect = trigger.current.getBoundingClientRect();
      const card = trigger.current.closest(".offering-card");
      if ((card && getComputedStyle(card).display === "none") || rect.bottom < 0 || rect.top > window.innerHeight) {
        setOpen(false);
        setPinned(false);
        return;
      }
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const cardRect = card?.getBoundingClientRect();
      const inset = viewportWidth < 640 ? 22 : 24;
      const width = Math.min(360, viewportWidth - 24, cardRect?.width ? cardRect.width - inset * 2 : 290);
      panel.current.style.width = `${width}px`;
      const { height } = panel.current.getBoundingClientRect();
      const preferredLeft = cardRect?.width
        ? Math.max(cardRect.left + inset, Math.min(rect.right - width + 16, cardRect.right - inset - width))
        : rect.right - width;
      const left = Math.max(12, Math.min(preferredLeft, viewportWidth - width - 12));
      const above = rect.top - height - 12;
      const below = rect.bottom + 12;
      const features = card?.querySelector(".offering-features")?.getBoundingClientRect();
      const action = card?.querySelector(".offering-card__action")?.getBoundingClientRect();
      let placement: Position["placement"];
      let top: number;
      if (features && above >= Math.max(80, features.top)) {
        placement = "top";
        top = above;
      } else if (action && below + height <= Math.min(window.innerHeight - 12, action.top - 12)) {
        // Notes near the first feature open downwards, preserving the tier heading.
        placement = "bottom";
        top = below;
      } else if (above >= 80) {
        placement = "top";
        top = above;
      } else {
        placement = "bottom";
        top = Math.min(rect.bottom + 12, window.innerHeight - height - 12);
        top = Math.max(12, top);
      }
      setPosition({ left, top, placement });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = () => { cancelClose(); setOpen(false); setPinned(false); };
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !trigger.current?.contains(event.target) && !panel.current?.contains(event.target)) close();
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return <>
    <button
      ref={trigger}
      type="button"
      className={className}
      aria-label={label}
      aria-expanded={open}
      aria-controls={id}
      aria-describedby={open ? id : undefined}
      onPointerEnter={(event) => { if (event.pointerType !== "touch") reveal(); }}
      onPointerLeave={scheduleClose}
      onFocus={reveal}
      onBlur={() => { if (!pinned) { cancelClose(); setOpen(false); } }}
      onClick={() => { cancelClose(); if (pinned) { setOpen(false); setPinned(false); } else { reveal(); setPinned(true); } }}
    >{children}</button>
    {createPortal(<div
      ref={panel}
      id={id}
      role="tooltip"
      hidden={!open}
      className="offering-tooltip"
      data-placement={position?.placement}
      style={{ left: position?.left ?? 0, top: position?.top ?? 0, visibility: position ? "visible" : "hidden" }}
      onPointerEnter={cancelClose}
      onPointerLeave={scheduleClose}
    >
      {heading ? <span className="offering-tooltip__heading">{heading}</span> : null}
      <p>{content}</p>
    </div>, document.body)}
  </>;
};

export default OfferingTooltip;
