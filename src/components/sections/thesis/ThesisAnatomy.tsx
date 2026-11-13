import { useId, useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { Check, FileCheck2, Fingerprint, GitBranch, Maximize2, Plus, Scale, SlidersHorizontal, Workflow, X } from "lucide-react";
import { thesisAnatomy, thesisFacilityLayers } from "../../../data/thesis";
import { buttonClassName } from "../../ui/buttonStyles";
import { PageLink } from "../../ui/PageLink";
import ThesisDiagram from "./ThesisDiagram";

const moduleCards = {
  legal: {
    icon: Scale,
    facts: ["Facility-specific agreements", "Offchain legal recourse"],
  },
  eligibility: {
    icon: Fingerprint,
    facts: ["KYC/KYB", "Wallet permissions"],
  },
  underwriting: {
    icon: FileCheck2,
    facts: ["Your team or a curator", "Agreed roles"],
  },
  terms: {
    icon: SlidersHorizontal,
    facts: ["Term or revolving", "Agreed credit support"],
  },
  servicing: {
    icon: Workflow,
    facts: ["Draws and repayments", "Lender requests"],
  },
  distribution: {
    icon: GitBranch,
    facts: ["Eligible lenders", "Supported DeFi venues"],
  },
} as const;
const desktopWires = [
  "M280 64H308Q328 64 328 84V168Q328 188 348 188H360",
  "M720 64H692Q672 64 672 84V168Q672 188 652 188H640",
  "M280 212H360",
  "M720 212H640",
  "M280 360H308Q328 360 328 340V256Q328 236 348 236H360",
  "M720 360H692Q672 360 672 340V256Q672 236 652 236H640",
];
// The mobile SVG starts below the hub. Its height scales with the module rows and gaps.
const mobileWires = [
  "M500 72H460", "M500 72H540",
  "M500 200H460", "M500 200H540",
  "M500 328H460", "M500 328H540",
];

/** Six independently connectable modules, all wired to the same facility. */
export const ThesisAnatomy = () => {
  const [connected, setConnected] = useState(() => new Set(thesisFacilityLayers.map(layer => layer.id)));
  const [expandedLayer, setExpandedLayer] = useState(thesisFacilityLayers[0]);
  const instanceId = useId();
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = `${instanceId}-module-dialog`;
  const expandedFacts = moduleCards[expandedLayer.id as keyof typeof moduleCards].facts;

  const toggle = (index: number) => {
    setConnected(current => {
      const next = new Set(current);
      const id = thesisFacilityLayers[index].id;
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const keyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) toggle(index);
      return;
    }
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % thesisFacilityLayers.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + thesisFacilityLayers.length) % thesisFacilityLayers.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = thesisFacilityLayers.length - 1;
    else return;
    event.preventDefault();
    controls.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="thesis-facility">
      <figure className="thesis-anatomy">
        <div className="thesis-facility__heading">
          <div>
            <p className="thesis-kicker">The Credit Vault model</p>
            <h3>One vault. <span className="text-[var(--color-text-muted)]">Different credit structures</span></h3>
          </div>
          <p id={`${instanceId}-hint`}>Explore how the modules fit together. Select one to toggle it or expand it to see what it does.</p>
        </div>
        <div className="thesis-facility__canvas" role="group" aria-label="Connect modules to Credit Vault" aria-describedby={`${instanceId}-hint`}>
          {(["desktop", "mobile"] as const).map(layout => (
            <svg key={layout} className={`thesis-facility__wires thesis-facility__wires--${layout}`} viewBox={layout === "desktop" ? "0 0 1000 424" : "0 0 1000 384"} preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
              {layout === "mobile" ? <path className="thesis-facility__trunk" d="M500 0V328" vectorEffect="non-scaling-stroke" /> : null}
              {thesisFacilityLayers.map((layer, index) => (
                <path key={layer.id} d={(layout === "desktop" ? desktopWires : mobileWires)[index]} data-connected={connected.has(layer.id)} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
          ))}
          <div className="thesis-facility__hub">
            <ThesisDiagram kind="vault" />
            <strong>{thesisAnatomy.vault.title}</strong>
            <span>{thesisAnatomy.vault.copy}</span>
            <span className="thesis-facility__count" role="status" aria-live="polite">{connected.size} {connected.size === 1 ? "module" : "modules"} connected</span>
            <PageLink
              to="/thesis"
              hash="why-pareto"
              className={buttonClassName("primary", "sm", "thesis-facility__hub-cta")}
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                window.requestAnimationFrame(() => document.getElementById("why-pareto-title")?.focus({ preventScroll: true }));
              }}
            >
              Learn more
            </PageLink>
            {thesisFacilityLayers.map((layer, index) => (
              <i key={layer.id} className={`thesis-facility__socket thesis-facility__socket--${index % 2 ? "right" : "left"}`} data-connected={connected.has(layer.id)} style={{ top: `calc(50% + ${Math.floor(index / 2) * 24 - 24}px)` }} aria-hidden="true" />
            ))}
          </div>
          {thesisFacilityLayers.map((layer, index) => {
            const { icon: Icon, facts } = moduleCards[layer.id as keyof typeof moduleCards];
            const isConnected = connected.has(layer.id);
            const factsId = `${instanceId}-facts-${layer.id}`;
            return (
              <div
                key={layer.id}
                className="thesis-facility__module"
                data-module={layer.id}
                data-connected={isConnected}
                style={{ gridArea: layer.id }}
              >
                <button
                  ref={node => { controls.current[index] = node; }}
                  type="button"
                  role="checkbox"
                  aria-label={`${layer.title} module`}
                  aria-checked={isConnected}
                  aria-describedby={facts.map((_, factIndex) => `${factsId}-${factIndex}`).join(" ")}
                  className="thesis-facility__module-toggle"
                  onClick={() => toggle(index)}
                  onKeyDown={event => keyboard(event, index)}
                >
                  <span className="thesis-facility__module-top">
                    <Icon className="thesis-facility__module-icon" size={16} strokeWidth={1.5} aria-hidden="true" />
                    <strong>{layer.title}</strong>
                    <span className="thesis-facility__switch">{isConnected ? <Check size={12} aria-hidden="true" /> : <Plus size={12} aria-hidden="true" />}</span>
                  </span>
                  <span className="thesis-facility__module-copy">
                    {facts.map((fact, factIndex) => (
                      <span id={`${factsId}-${factIndex}`} key={fact} className="thesis-facility__module-fact">{fact}</span>
                    ))}
                  </span>
                </button>
                <button
                  type="button"
                  className="thesis-facility__module-expand"
                  aria-label={`Details for ${layer.title}`}
                  aria-haspopup="dialog"
                  aria-controls={dialogId}
                  onClick={(event) => {
                    event.currentTarget.focus({ preventScroll: true });
                    flushSync(() => setExpandedLayer(layer));
                    dialogRef.current?.showModal();
                  }}
                >
                  <Maximize2 size={18} aria-hidden="true" />
                </button>
                <i className="thesis-facility__module-port" aria-hidden="true" />
              </div>
            );
          })}
        </div>
        <figcaption>The same infrastructure can support different facilities.</figcaption>
      </figure>
      <dialog
        ref={dialogRef}
        id={dialogId}
        className="thesis-facility__dialog"
        aria-labelledby={`${dialogId}-title`}
        aria-describedby={`${dialogId}-description`}
        onClick={(event) => {
          const dialog = event.currentTarget;
          if (event.target !== dialog) return;
          const { left, right, top, bottom } = dialog.getBoundingClientRect();
          if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
            dialog.close();
          }
        }}
      >
        <div className="thesis-facility__dialog-header">
          <div>
            <p className="thesis-kicker">Facility module</p>
            <h3 id={`${dialogId}-title`}>{expandedLayer.title}</h3>
          </div>
          <button
            type="button"
            className="thesis-facility__dialog-close"
            aria-label="Close module details"
            onClick={() => dialogRef.current?.close()}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <p id={`${dialogId}-description`} className="thesis-facility__dialog-description">{expandedLayer.detail}</p>
        <p className="thesis-facility__dialog-facts">{expandedFacts.join(" · ")}</p>
      </dialog>
    </div>
  );
};
