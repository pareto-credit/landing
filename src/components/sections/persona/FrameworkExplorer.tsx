import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { FrameworkItem } from "../../../data/personas";

interface FrameworkExplorerProps {
  title: string;
  items: FrameworkItem[];
}

export default function FrameworkExplorer({
  title,
  items,
}: FrameworkExplorerProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefix = useId();
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
      <div
        className="audience-framework__tabs"
        role="tablist"
        aria-label={title}
        aria-orientation="vertical"
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`${prefix}-tab-${item.id}`}
            aria-controls={`${prefix}-panel-${item.id}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            ref={(node) => {
              refs.current[index] = node;
            }}
            onClick={() => setActive(index)}
            onKeyDown={(event) => select(event, index)}
          >
            <span className="audience-framework__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${prefix}-panel-${item.id}`}
          aria-labelledby={`${prefix}-tab-${item.id}`}
          hidden={active !== index}
          tabIndex={0}
          className="audience-framework__panel"
        >
          <div className="audience-framework__panel-top">
            <span className="audience-kicker">{item.title}</span>
            <span aria-hidden="true">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </div>
          <h3>{item.summary}</h3>
          <p>{item.detail}</p>
          <dl>
            {item.points.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
