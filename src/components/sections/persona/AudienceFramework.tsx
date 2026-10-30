import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { FrameworkItem } from "../../../data/personas";

export default function AudienceFramework({
  title,
  items,
}: {
  title: string;
  items: FrameworkItem[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const panelAreaRef = useRef<HTMLDivElement>(null);
  const prefix = useId();
  const preview = (index: number) => {
    // Keep a selected summary in place while it has keyboard focus.
    if (!panelAreaRef.current?.contains(document.activeElement)) setActive(index);
  };
  const select = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = (index + 1) % items.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = (index - 1 + items.length) % items.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = items.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    refs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="audience-framework">
      <div className="audience-framework__graph">
        <div className="audience-framework__backdrop" aria-hidden="true" />
        <div className="audience-framework__rows" role="tablist" aria-label={title} aria-orientation="vertical">
          {items.map((layer, index) => (
            <button
              key={layer.id}
              className="audience-framework__row"
              style={{ "--layer-index": index, "--layer-depth": items.length - index } as CSSProperties}
              type="button"
              role="tab"
              id={`${prefix}-tab-${layer.id}`}
              aria-label={layer.title}
              aria-describedby={`${prefix}-summary-${layer.id}`}
              aria-controls={`${prefix}-panel-${layer.id}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              ref={(node) => { refs.current[index] = node; }}
              onMouseEnter={() => preview(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              onKeyDown={(event) => select(event, index)}
            >
              <svg className="audience-framework__plate" viewBox="0 0 280 174" fill="none" aria-hidden="true" focusable="false">
                <path className="audience-framework__plate-edge" d="M6 83 140 160 274 83V91L140 168 6 91Z" />
                <path className="audience-framework__plate-top" d="M140 6 274 83 140 160 6 83Z" />
                <path className="audience-framework__plate-grid" d="M50.7 57.3 184.7 134.3M95.3 31.7 229.3 108.7M50.7 108.7 184.7 31.7M95.3 134.3 229.3 57.3" />
                <path className="audience-framework__plate-seam" d="M6 83 140 160 274 83M140 160V168" />
              </svg>
              <span className="audience-framework__leader" aria-hidden="true" />
              <span className="audience-framework__text">
                <span className="audience-framework__label">{layer.title}</span>
                <span className="audience-framework__summary" id={`${prefix}-summary-${layer.id}`}>{layer.summary}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="audience-framework__summary-area" ref={panelAreaRef}>
        {items.map((layer, index) => (
          <div
            key={layer.id}
            role="tabpanel"
            id={`${prefix}-panel-${layer.id}`}
            aria-labelledby={`${prefix}-tab-${layer.id}`}
            hidden={active !== index}
            tabIndex={0}
            className="audience-framework__panel"
          >
            <p>{layer.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
