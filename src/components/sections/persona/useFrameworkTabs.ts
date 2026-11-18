import { useId, useRef, useState, type KeyboardEvent } from "react";

/** Keeps the diagram, roving tab focus and selected explanation in sync. */
export function useFrameworkTabs(count: number) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelAreaRef = useRef<HTMLDivElement>(null);
  const prefix = useId();

  const select = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % count;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;

    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus({ preventScroll: true });
  };

  /** Selects on pointer hover unless that would hide an explanation or CTA with focus. */
  const preview = (index: number) => {
    if (!panelAreaRef.current?.contains(document.activeElement)) setActive(index);
  };

  return {
    active,
    panelAreaRef,
    select: setActive,
    /** Selects a tab and moves keyboard focus to it. */
    focus: (index: number) => {
      setActive(index);
      refs.current[index]?.focus({ preventScroll: true });
    },
    tabProps: (id: string, index: number) => ({
      type: "button" as const,
      role: "tab",
      id: `${prefix}-tab-${id}`,
      "aria-controls": `${prefix}-panel-${id}`,
      "aria-selected": active === index,
      tabIndex: active === index ? 0 : -1,
      ref: (node: HTMLButtonElement | null) => {
        refs.current[index] = node;
      },
      onMouseEnter: () => preview(index),
      onFocus: () => setActive(index),
      onClick: () => setActive(index),
      onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => select(event, index),
    }),
    panelProps: (id: string, index: number) => ({
      role: "tabpanel",
      id: `${prefix}-panel-${id}`,
      "aria-labelledby": `${prefix}-tab-${id}`,
      "aria-hidden": active !== index,
      inert: active !== index,
      tabIndex: 0,
    }),
  };
}
