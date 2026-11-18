import { ArrowRight, CircleDot, Layers } from "lucide-react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { FrameworkItem } from "../../../data/personas";
import { useFrameworkTabs } from "./useFrameworkTabs";
import "./vault-anatomy.css";

/** Draws a small arrow whose shaft animates while its layer is open. */
function Flow({ d, tip }: { d: string; tip: string }) {
  return (
    <>
      <path className="vault-stage__flow" d={d} />
      <path className="vault-stage__accent" d="M-6 -4 0 0-6 4" transform={tip} />
    </>
  );
}

/** Schematic drawn on each layer's surface, keyed by the framework item id. */
const diagrams: Record<string, { heading: string; art: ReactNode }> = {
  deposit: {
    heading: "Issuance",
    art: (
      <>
        <rect className="vault-stage__cell" x="-128" y="-42" width="104" height="66" rx="6" />
        <rect className="vault-stage__cell" x="24" y="-42" width="104" height="66" rx="6" />
        <text className="vault-stage__text" x="-76" y="-24">Asset in</text>
        <circle className="vault-stage__ink" cx="-76" cy="2" r="11" />
        <circle className="vault-stage__dot" cx="-76" cy="2" r="4" />
        <text className="vault-stage__text" x="76" y="-24">Shares out</text>
        <rect
          className="vault-stage__ink"
          x="67"
          y="-7"
          width="18"
          height="18"
          rx="4"
          transform="rotate(45 76 2)"
        />
        <circle className="vault-stage__dot" cx="76" cy="2" r="3" />
        <Flow d="M-17 -8H15" tip="translate(17 -8)" />
        <text className="vault-stage__text vault-stage__text--muted" y="48">
          At the applicable share price
        </text>
      </>
    ),
  },
  facility: {
    heading: "Credit facility",
    art: (
      <>
        <rect className="vault-stage__cell" x="-128" y="-40" width="56" height="56" rx="8" />
        <circle className="vault-stage__ink" cx="-100" cy="-12" r="12" />
        <path className="vault-stage__ink" d="M-100 -24v24M-112 -12h24" />
        <circle className="vault-stage__dot" cx="-100" cy="-12" r="3.5" />
        <rect className="vault-stage__cell" x="72" y="-40" width="56" height="56" rx="8" />
        <path className="vault-stage__bars" d="M88 2v-14M100 2v-26M112 2v-9" />
        <Flow d="M-62 -12H60" tip="translate(62 -12)" />
        <text className="vault-stage__text" y="-22">Draw</text>
        <text className="vault-stage__text vault-stage__text--muted" y="8">
          Rate · size · term
        </text>
        <text className="vault-stage__text" x="-100" y="36">Vault</text>
        <text className="vault-stage__text" x="100" y="36">Borrower</text>
      </>
    ),
  },
  oversight: {
    heading: "Oversight",
    art: (
      <>
        <path
          className="vault-stage__cell"
          d="M-84 -42l28 9v20c0 17-12 29-28 35-16-6-28-18-28-35v-20Z"
        />
        <path className="vault-stage__accent" d="M-96 -10l9 9 15-17" />
        {["Collateral", "Covenants", "Reporting"].map((label, row) => (
          <g key={label} transform={`translate(0 ${row * 24 - 28})`}>
            <rect className="vault-stage__cell" x="-22" y="-8" width="15" height="15" rx="3" />
            <path className="vault-stage__accent" d="M-18.5 -.5l3 3 5.5-6" />
            <text className="vault-stage__text vault-stage__text--start" x="4" y="4">
              {label}
            </text>
          </g>
        ))}
      </>
    ),
  },
  value: {
    heading: "Share price",
    art: (
      <>
        <path className="vault-stage__grid" d="M-108 -22H110M-108 4H110" />
        <path className="vault-stage__ink" d="M-108 -46V30H110" />
        <path
          className="vault-stage__area"
          d="M-104 20C-62 16-38 2-2 -6S62 -30 104 -38V30H-104Z"
        />
        <path className="vault-stage__flow" d="M-104 20C-62 16-38 2-2 -6S62 -30 104 -38" />
        <circle className="vault-stage__dot" cx="-104" cy="20" r="3.5" />
        <circle className="vault-stage__dot" cx="104" cy="-38" r="3.5" />
        <text className="vault-stage__text vault-stage__text--muted" y="50">
          Illustrative · interest accrues
        </text>
      </>
    ),
  },
  settlement: {
    heading: "Settlement",
    art: (
      <>
        {[-96, 0, 96].map((x) => (
          <circle className="vault-stage__cell" cx={x} cy="-10" r="21" key={x} />
        ))}
        <path className="vault-stage__ink" d="M-104 -16h16M-104 -10h16M-104 -4h9" />
        <circle className="vault-stage__ink" cx="0" cy="-10" r="10" />
        <path className="vault-stage__accent" d="M0 -16v6l4 3" />
        <circle className="vault-stage__ink" cx="96" cy="-10" r="10" />
        <circle className="vault-stage__dot" cx="96" cy="-10" r="4" />
        <Flow d="M-69 -10H-29" tip="translate(-27 -10)" />
        <Flow d="M27 -10H67" tip="translate(69 -10)" />
        <text className="vault-stage__text" x="-96" y="32">Request</text>
        <text className="vault-stage__text" y="32">Settle</text>
        <text className="vault-stage__text" x="96" y="32">Claim</text>
      </>
    ),
  },
  reporting: {
    heading: "Records",
    art: (
      <>
        <path className="vault-stage__grid" d="M0 -48V44" />
        <text className="vault-stage__text" x="-68" y="-34">Onchain</text>
        <text className="vault-stage__text" x="68" y="-34">Offchain</text>
        {[-14, 6, 26].map((y) => (
          <g key={y}>
            <circle className="vault-stage__dot" cx="-116" cy={y} r="3" />
            <path className="vault-stage__ink" d={`M-104 ${y}H${y === 26 ? -52 : -24}`} />
            <rect className="vault-stage__ink" x="20" y={y - 6} width="9" height="12" rx="1.5" />
            <path className="vault-stage__ink" d={`M38 ${y}H${y === 6 ? 92 : 114}`} />
          </g>
        ))}
      </>
    ),
  },
};

type StageView = "intro" | "layer" | "overview";

/** Glyph from `assets/svgs/pareto-mark.svg`, centred on the coin by its transform. */
const PARETO_MARK =
  "M73.9193 100.014C75.3933 108.749 70.5263 117.582 61.9213 120.803C52.1633 124.455 41.2913 119.504 37.6393 109.745C33.9873 99.987 38.9383 89.115 48.6963 85.463C48.8723 85.397 49.0483 85.334 49.2243 85.274L54.4403 98.886C54.2223 98.931 54.0053 98.993 53.7903 99.074C51.5483 99.9129 50.4113 102.41 51.2503 104.652C52.0893 106.894 54.5863 108.031 56.8283 107.192C59.0703 106.353 60.2073 103.856 59.3683 101.614C59.3463 101.555 59.3233 101.496 59.2983 101.439L50.6303 78.809L50.5803 78.834L49.8423 76.804C43.3203 59.255 52.2313 39.729 69.7753 33.164C87.3433 26.589 106.914 35.5009 113.489 53.0689L113.829 53.979C120.172 70.928 112.066 89.868 95.4263 96.981C89.9593 99.318 84.0603 100.444 78.1343 100.293L72.3683 85.308L77.0243 85.6859C81.3593 86.0379 85.7153 85.328 89.7143 83.618C99.2123 79.558 103.839 68.747 100.218 59.072L99.8783 58.163C96.1173 48.112 84.9193 43.013 74.8683 46.774C64.8173 50.536 59.7183 61.733 63.4803 71.784L65.2373 76.618L65.2253 76.611L65.5383 77.446L68.2743 84.976L73.9193 100.014Z";

/** Places each layer for the current view: hidden in the coin, stacked, open or spread. */
function layerState(view: StageView, index: number, open: number) {
  if (view === "intro") return "closed";
  if (view === "overview") return "spread";
  if (index < open) return "stowed";
  if (index === open) return "open";
  return index === open + 1 ? "preview" : "waiting";
}

/**
 * Tells the vault's story in three views: a closed coin, one layer open with the
 * next one previewed beneath it, and every layer spread out and labelled.
 */
function VaultStage({
  layers,
  view,
  open,
  onSelect,
  onOpen,
}: {
  layers: FrameworkItem[];
  view: StageView;
  open: number;
  onSelect: (layer: number) => void;
  onOpen: () => void;
}) {
  return (
    <figure className="vault-anatomy__figure" aria-hidden="true">
      <svg viewBox="0 0 600 620" fill="none" focusable="false" data-view={view}>
        <defs>
          <radialGradient id="vault-stage-shadow">
            <stop offset="0" stopColor="#000" stopOpacity="0.5" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vault-stage-lid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2a5e4a" />
            <stop offset="1" stopColor="#143427" />
          </linearGradient>
          <path id="vault-stage-rim" d="M-76 0A76 76 0 0 1 76 0" />
        </defs>

        <ellipse className="vault-stage__shadow" rx="186" ry="22" fill="url(#vault-stage-shadow)" />
        <path className="vault-stage__guide" d="M178 92V250M422 92V250" />

        {layers
          .map((item, index) => {
            const state = layerState(view, index, open);
            const diagram = diagrams[item.id];
            const side = index % 2 ? -1 : 1;
            return (
              <g
                className="vault-stage__layer"
                data-part={item.id}
                data-state={state}
                data-active={state === "open"}
                style={{ "--i": index } as CSSProperties}
                onClick={() => onSelect(index)}
                key={item.id}
              >
                <circle className="vault-stage__rim" r="100" />
                <circle className="vault-stage__face" r="100" />
                <circle className="vault-stage__face vault-stage__face--inset" r="92" />
                {diagram && (
                  <g className="vault-stage__diagram">
                    <g transform="matrix(1.2 -0.036 -0.095 1.2 0 0)">
                      <text className="vault-stage__heading" y="-70">
                        {diagram.heading}
                      </text>
                      {diagram.art}
                    </g>
                  </g>
                )}
                <g className="vault-stage__note vault-stage__note--open">
                  <path className="vault-stage__leader" d="M-284 -128H-206L-153 -71" />
                  <circle className="vault-stage__dot" cx="-151" cy="-69" r="3" />
                  <circle className="vault-stage__key" cx="-273" cy="-146" r="10.5" />
                  <text className="vault-stage__key-text" x="-273" y="-142">
                    {index + 1}
                  </text>
                  <text className="vault-stage__label" x="-255" y="-142">
                    {item.title}
                  </text>
                </g>
                <g className="vault-stage__note vault-stage__note--preview">
                  <path className="vault-stage__leader" d="M-176 8H-136" />
                  <circle className="vault-stage__dot" cx="-134" cy="8" r="3" />
                  <text className="vault-stage__label vault-stage__label--end" x="-184" y="12">
                    {item.title}
                  </text>
                </g>
                <g className="vault-stage__note vault-stage__note--spread">
                  <path className="vault-stage__leader" d={`M${side * 112} 8H${side * 150}`} />
                  <circle className="vault-stage__dot" cx={side * 110} cy="8" r="3" />
                  <text
                    className={`vault-stage__label${side < 0 ? " vault-stage__label--end" : ""}`}
                    x={side * 158}
                    y="12"
                  >
                    {item.title}
                  </text>
                </g>
              </g>
            );
          })
          .reverse()}

        <g className="vault-stage__lid" onClick={view === "intro" ? onOpen : undefined}>
          <g className="vault-stage__lid-float">
            <rect className="vault-stage__lid-wall" x="-100" width="200" height="1" />
            <circle className="vault-stage__lid-base" r="100" />
            <g className="vault-stage__lid-face">
              <circle className="vault-stage__lid-top" r="100" />
              <circle className="vault-stage__lid-ticks" r="91" />
              <text className="vault-stage__lid-text">
                <textPath href="#vault-stage-rim" startOffset="50%">
                  Credit vault
                </textPath>
              </text>
              <path className="vault-stage__lid-stud" d="M-83 0l4-4 4 4-4 4ZM75 0l4-4 4 4-4 4Z" />
              <circle className="vault-stage__lid-well" r="62" />
              <circle className="vault-stage__lid-ring" r="62" />
              <path
                className="vault-stage__lid-mark"
                d={PARETO_MARK}
                transform="scale(0.86) translate(-76 -76.5)"
              />
            </g>
          </g>
        </g>
      </svg>
    </figure>
  );
}

/** Pairs the Originators vault animation with its index and explanations. */
export default function VaultAnatomy({
  title,
  items,
  action,
}: {
  title: string;
  items: FrameworkItem[];
  action: ReactNode;
}) {
  const { active, select, focus, tabProps, panelProps, panelAreaRef } =
    useFrameworkTabs(items.length);
  const layers = items.filter((item) => !item.kind);
  const current = items[active];
  const next = items[active + 1];
  const view: StageView = current.kind ?? "layer";
  const total = String(layers.length).padStart(2, "0");
  const nextRef = useRef<HTMLButtonElement>(null);
  const stepped = useRef(false);
  const nextLabel =
    current.kind === "intro"
      ? "Open the vault"
      : next?.kind === "overview"
        ? "See the full anatomy"
        : `Next: ${next?.title}`;

  // The step link is redrawn with each explanation, so focus is handed to the new
  // link, or to the final view's tab once there is no further step.
  useEffect(() => {
    if (!stepped.current) return;
    stepped.current = false;
    if (nextRef.current) nextRef.current.focus({ preventScroll: true });
    else focus(active);
  }, [active, focus]);

  return (
    <div className="vault-anatomy">
      <VaultStage
        layers={layers}
        view={view}
        open={layers.indexOf(current)}
        onSelect={(layer) => select(items.indexOf(layers[layer]))}
        onOpen={() => select(items.indexOf(layers[0]))}
      />
      <div
        className="vault-anatomy__index"
        role="tablist"
        aria-label={title}
        aria-orientation="vertical"
      >
        {items.map((item, index) => (
          <button className="vault-anatomy__tab" key={item.id} {...tabProps(item.id, index)}>
            <span className="vault-anatomy__number" aria-hidden="true">
              {item.kind === "intro" ? (
                <CircleDot size={13} />
              ) : item.kind === "overview" ? (
                <Layers size={13} />
              ) : (
                layers.indexOf(item) + 1
              )}
            </span>
            {item.title}
          </button>
        ))}
      </div>
      <div className="vault-anatomy__explanations" ref={panelAreaRef}>
        <div className="vault-anatomy__panels">
          {items.map((item, index) => (
            <div className="vault-anatomy__panel" key={item.id} {...panelProps(item.id, index)}>
              <p className="vault-anatomy__step" aria-hidden="true">
                {item.kind
                  ? item.title
                  : `${String(layers.indexOf(item) + 1).padStart(2, "0")} / ${total}`}
              </p>
              <h3>{item.summary}</h3>
              <p>{item.detail}</p>
              {item.points.length > 0 && (
                <dl className="vault-anatomy__facts">
                  {item.points.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {/* The walkthrough ends on the enquiry; until then it offers the next step. */}
              {index === active && (
                <div className="vault-anatomy__action">
                  {next ? (
                    <button
                      type="button"
                      className="vault-anatomy__next"
                      ref={nextRef}
                      // A mouse click leaves focus where it was, so hovering the
                      // index keeps previewing; keyboard focus follows the steps.
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={(event) => {
                        stepped.current = document.activeElement === event.currentTarget;
                        select(active + 1);
                      }}
                    >
                      {nextLabel}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  ) : (
                    action
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
