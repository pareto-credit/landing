import { useId, type CSSProperties, type ReactNode } from "react";
import type { FrameworkItem } from "../../../data/personas";
import { useFrameworkTabs } from "./useFrameworkTabs";

export default function AudienceFramework({
  title,
  items,
  action,
}: {
  title: string;
  items: FrameworkItem[];
  action?: ReactNode;
}) {
  const { tabProps, panelProps, panelAreaRef } = useFrameworkTabs(items.length);
  const prefix = useId();

  return (
    <div className="audience-framework">
      <div className="audience-framework__graph">
        <div className="audience-framework__backdrop" aria-hidden="true" />
        <div
          className="audience-framework__rows"
          role="tablist"
          aria-label={title}
          aria-orientation="vertical"
        >
          {items.map((layer, index) => (
            <button
              key={layer.id}
              className="audience-framework__row"
              style={
                {
                  "--layer-index": index,
                  "--layer-depth": items.length - index,
                } as CSSProperties
              }
              {...tabProps(layer.id, index)}
              aria-label={layer.title}
              aria-describedby={`${prefix}-summary-${layer.id}`}
            >
              <svg
                className="audience-framework__plate"
                viewBox="0 0 280 174"
                fill="none"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  className="audience-framework__plate-edge"
                  d="M6 83 140 160 274 83V91L140 168 6 91Z"
                />
                <path
                  className="audience-framework__plate-top"
                  d="M140 6 274 83 140 160 6 83Z"
                />
                <path
                  className="audience-framework__plate-grid"
                  d="M50.7 57.3 184.7 134.3M95.3 31.7 229.3 108.7M50.7 108.7 184.7 31.7M95.3 134.3 229.3 57.3"
                />
                <path
                  className="audience-framework__plate-seam"
                  d="M6 83 140 160 274 83M140 160V168"
                />
              </svg>
              <span className="audience-framework__leader" aria-hidden="true" />
              <span className="audience-framework__text">
                <span className="audience-framework__label">{layer.title}</span>
                <span
                  className="audience-framework__summary"
                  id={`${prefix}-summary-${layer.id}`}
                >
                  {layer.summary}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="audience-framework__summary-area" ref={panelAreaRef}>
        <div className="audience-framework__panels">
          {items.map((layer, index) => (
            <div
              key={layer.id}
              {...panelProps(layer.id, index)}
              className="audience-framework__panel"
            >
              <div className="audience-framework__panel-heading">
                <span className="audience-framework__step" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
                <h3>{layer.title}</h3>
              </div>
              <p>{layer.detail}</p>
            </div>
          ))}
        </div>
        {action && <div className="audience-framework__action">{action}</div>}
      </div>
    </div>
  );
}
