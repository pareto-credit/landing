import { useId, useState, type CSSProperties, type ReactNode } from "react";
import type { CreditInfrastructureContent, InfrastructureLayer } from "../../../data/creditInfrastructure";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import AudienceReveal from "./AudienceReveal";
import "./credit-infrastructure.css";

function InfrastructurePlate({ id }: { id: string }) {
  return (
    <svg className="credit-layers__plate" viewBox="0 0 320 134" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-top`} x2="100%" y2="100%">
          <stop className="credit-layers__plate-lit" />
          <stop offset="1" className="credit-layers__plate-base" />
        </linearGradient>
        <linearGradient id={`${id}-left`} x2="100%" y2="100%">
          <stop className="credit-layers__plate-base" />
          <stop offset="1" className="credit-layers__plate-shade" />
        </linearGradient>
        <linearGradient id={`${id}-right`} x2="100%" y2="0%">
          <stop className="credit-layers__plate-dark" />
          <stop offset="1" className="credit-layers__plate-shade" />
        </linearGradient>
      </defs>
      <g className="credit-layers__plate-faces">
        <path d="M6 48 160 89V125L6 84Z" fill={`url(#${id}-left)`} />
        <path d="M160 89 314 48V84L160 125Z" fill={`url(#${id}-right)`} />
        <path d="M160 7 314 48 160 89 6 48Z" fill={`url(#${id}-top)`} />
        <path className="credit-layers__plate-outline" d="M160 7 314 48V84L160 125 6 84V48Z M6 48 160 89 314 48 M160 89V125" />
        <path className="credit-layers__plate-highlight" d="M6 48 160 89 314 48" />
      </g>
      <path className="credit-layers__plate-hit" d="M160 7 314 48V84L160 125 6 84V48Z" fill="transparent" />
    </svg>
  );
}

/** Keeps the stack and its layer explanations aligned and highlighted together. */
function InfrastructureLayers({ items }: { items: InfrastructureLayer[] }) {
  const descriptionPrefix = useId();
  const [selected, setSelected] = useState(items[0]?.id);
  const [preview, setPreview] = useState<string>();
  const active = preview ?? selected;

  return (
    <ul className="credit-layers__list" role="list" style={{ "--layer-count": items.length } as CSSProperties}>
      {items.map((layer, index) => (
        <li
          key={layer.id}
          className="credit-layers__row"
          role="listitem"
          data-active={active === layer.id}
          style={{
            "--layer-row": index + 1,
            "--layer-depth": items.length - index,
          } as CSSProperties}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setPreview(layer.id);
          }}
          onPointerLeave={() => setPreview(undefined)}
        >
          <div className="credit-layers__visual" aria-hidden="true">
            <InfrastructurePlate id={`${descriptionPrefix}-${layer.id}-plate`} />
            <span className="credit-layers__leader" />
          </div>
          <div className="credit-layers__text">
            <h3>
              <button
                type="button"
                className="credit-layers__toggle"
                aria-pressed={selected === layer.id}
                aria-describedby={`${descriptionPrefix}-${layer.id}`}
                onFocus={() => {
                  setPreview(undefined);
                  setSelected(layer.id);
                }}
                onClick={() => setSelected(layer.id)}
              >
                {layer.title}
              </button>
            </h3>
            <p id={`${descriptionPrefix}-${layer.id}`}>{layer.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Explains the shared facility infrastructure through stacked layers. */
export default function CreditInfrastructure({
  id,
  content,
  action,
}: {
  id: string;
  content: CreditInfrastructureContent;
  action: ReactNode;
}) {
  const { title, titleMuted, items } = content;
  const titleId = `${id}-title`;

  return (
    <section id={id} className="credit-infrastructure" aria-labelledby={titleId}>
      <SectionContainer className="ui-section-shell">
        <AudienceReveal>
          <SectionHeader
            variant="collection"
            eyebrow="Credit infrastructure"
            titleId={titleId}
            title={
              <>
                {title.slice(0, -titleMuted.length)}
                <span className="text-[var(--color-text-muted-inverse)]">{titleMuted}</span>
              </>
            }
            action={<div className="credit-infrastructure__action">{action}</div>}
            tone="dark"
          />
        </AudienceReveal>
        <AudienceReveal className="credit-layers">
          <InfrastructureLayers items={items} />
        </AudienceReveal>
      </SectionContainer>
    </section>
  );
}
