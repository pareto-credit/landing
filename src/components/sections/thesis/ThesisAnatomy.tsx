import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AppWindow, Check, FileCheck2, Fingerprint, GitBranch, Plus, SlidersHorizontal, Workflow } from "lucide-react";
import { thesisAnatomy, thesisFacilityLayers, thesisFacilityOptions } from "../../../data/thesis";
import ThesisDiagram from "./ThesisDiagram";

const moduleArt = {
  application: AppWindow,
  eligibility: Fingerprint,
  underwriting: FileCheck2,
  terms: SlidersHorizontal,
  servicing: Workflow,
  distribution: GitBranch,
};
const desktopWires = [
  "M280 56H308Q328 56 328 76V160Q328 180 348 180H360",
  "M720 56H692Q672 56 672 76V160Q672 180 652 180H640",
  "M280 204H360",
  "M720 204H640",
  "M280 352H308Q328 352 328 332V248Q328 228 348 228H360",
  "M720 352H692Q672 352 672 332V248Q672 228 652 228H640",
];
const mobileWires = [
  "M500 308H460", "M500 308H540",
  "M500 436H460", "M500 436H540",
  "M500 564H460", "M500 564H540",
];

/** Six independently connectable modules, all wired to the same facility. */
export const ThesisAnatomy = () => {
  const [active, setActive] = useState(0);
  const [connected, setConnected] = useState(() => new Set(thesisFacilityLayers.map(layer => layer.id)));
  const instanceId = useId();
  const controls = useRef<Array<HTMLButtonElement | null>>([]);
  const selected = thesisFacilityLayers[active];
  const controlId = (id: string) => `${instanceId}-module-${id}`;
  const panelId = `${instanceId}-module-details`;

  const toggle = (index: number) => {
    setActive(index);
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
    setActive(next);
    controls.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="thesis-facility">
      <figure className="thesis-anatomy">
        <div className="thesis-facility__heading">
          <div>
            <p className="thesis-kicker">Built around your business</p>
            <h3>One vault. Your combination.</h3>
          </div>
          <p id={`${instanceId}-hint`}>Choose the modules that connect to your Credit Vault.</p>
        </div>
        <div className="thesis-facility__canvas" role="group" aria-label="Connect modules to Credit Vault" aria-describedby={`${instanceId}-hint`}>
          {(["desktop", "mobile"] as const).map(layout => (
            <svg key={layout} className={`thesis-facility__wires thesis-facility__wires--${layout}`} viewBox={layout === "desktop" ? "0 0 1000 408" : "0 0 1000 640"} preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
              {layout === "mobile" ? <path className="thesis-facility__trunk" d="M500 236V564" vectorEffect="non-scaling-stroke" /> : null}
              {thesisFacilityLayers.map((layer, index) => (
                <path key={layer.id} d={(layout === "desktop" ? desktopWires : mobileWires)[index]} data-connected={connected.has(layer.id)} data-active={active === index} vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
          ))}
          <div className="thesis-facility__hub">
            <span className="thesis-kicker">Your facility</span>
            <ThesisDiagram kind="vault" />
            <strong>{thesisAnatomy.vault.title}</strong>
            <span>{thesisAnatomy.vault.copy}</span>
            <span className="thesis-facility__count" role="status" aria-live="polite">{connected.size} {connected.size === 1 ? "module" : "modules"} connected</span>
            {thesisFacilityLayers.map((layer, index) => (
              <i key={layer.id} className={`thesis-facility__socket thesis-facility__socket--${index % 2 ? "right" : "left"}`} data-connected={connected.has(layer.id)} style={{ top: `calc(50% + ${Math.floor(index / 2) * 24 - 24}px)` }} aria-hidden="true" />
            ))}
          </div>
          {thesisFacilityLayers.map((layer, index) => {
            const Icon = moduleArt[layer.id as keyof typeof moduleArt];
            const isConnected = connected.has(layer.id);
            return (
              <button
                key={layer.id}
                ref={node => { controls.current[index] = node; }}
                type="button"
                role="checkbox"
                aria-label={`${layer.title} module`}
                aria-checked={isConnected}
                aria-controls={panelId}
                id={controlId(layer.id)}
                className="thesis-facility__module"
                data-module={layer.id}
                data-connected={isConnected}
                data-active={active === index}
                style={{ gridArea: layer.id }}
                onFocus={() => setActive(index)}
                onClick={() => toggle(index)}
                onKeyDown={event => keyboard(event, index)}
              >
                <span className="thesis-facility__module-top"><Icon size={18} strokeWidth={1.5} aria-hidden="true" /><span className="thesis-facility__switch">{isConnected ? <Check size={12} aria-hidden="true" /> : <Plus size={12} aria-hidden="true" />}</span></span>
                <strong>{layer.title}</strong>
                <span className="thesis-facility__module-state">{isConnected ? "Connected" : "Connect module"}</span>
                <i className="thesis-facility__module-port" aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <figcaption>Different modules. One connected Credit Vault.</figcaption>
      </figure>
      <section id={panelId} role="region" aria-labelledby={controlId(selected.id)} tabIndex={0} className="thesis-facility__panel">
        <div className="thesis-facility__description">
          <h3>{selected.summary}</h3>
          <p>{selected.detail}</p>
          {selected.id === "terms" ? (
            <ul className="thesis-facility__options" aria-label="Facility options">
              {thesisFacilityOptions.map(option => <li key={option}>{option}</li>)}
            </ul>
          ) : null}
        </div>
        <details className="thesis-facility__details">
          <summary>Module details</summary>
          <dl>{selected.points.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </details>
      </section>
    </div>
  );
};
