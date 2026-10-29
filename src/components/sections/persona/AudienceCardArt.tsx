import { useId } from "react";

export type AudienceArtKind =
  | "structure"
  | "network"
  | "activity"
  | "distribution"
  | "selection"
  | "terms";

function Document({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <rect width="148" height="100" rx="7" className="audience-card-art__paper" />
      <rect x="15" y="15" width="21" height="21" rx="5" className="audience-card-art__accent" />
      <path d="M21 22h9m-9 6h6" className="audience-card-art__ink" />
      <path d="M49 21h63m-63 8h42" className="audience-card-art__rule" />
      {compact ? (
        <>
          <path d="M15 55h118M15 68h88M15 81h102" className="audience-card-art__rule" />
          <circle cx="124" cy="79" r="5" className="audience-card-art__accent" />
        </>
      ) : (
        [15, 58, 101].map((x) => (
          <g key={x}>
            <rect x={x} y="51" width="32" height="31" rx="4" className="audience-card-art__field" />
            <path d={`M${x + 7} 62h18m-18 8h11`} className="audience-card-art__rule" />
          </g>
        ))
      )}
    </>
  );
}

function Structure() {
  return (
    <>
      <g transform="translate(102 91) rotate(-11 74 50)">
        <g className="audience-card-art__back"><Document /></g>
      </g>
      <g transform="translate(135 67) rotate(7 74 50)">
        <g className="audience-card-art__middle"><Document /></g>
      </g>
      <g transform="translate(125 76)">
        <g className="audience-card-art__front"><Document /></g>
      </g>
    </>
  );
}

function Network({ distributed = false }: { distributed?: boolean }) {
  const positions = distributed
    ? [[96, 80], [302, 77], [96, 178], [302, 176]]
    : [[200, 53], [94, 155], [306, 155]];
  return (
    <>
      <g className="audience-card-art__connections">
        {positions.map(([x, y]) => <path key={x + y} d={`M200 124L${x} ${y}`} />)}
      </g>
      <circle cx="200" cy="124" r="46" className="audience-card-art__halo" />
      <g transform="translate(173 97)">
        <g className="audience-card-art__front">
          <rect width="54" height="54" rx="12" className="audience-card-art__paper" />
          <path d="m13 22 14-8 14 8-14 8-14-8Zm0 7 14 8 14-8m-28 7 14 8 14-8" className="audience-card-art__ink" />
        </g>
      </g>
      {positions.map(([x, y], index) => (
        <g key={x + y} transform={`translate(${x - 21} ${y - 21})`}>
          <g className={index % 2 ? "audience-card-art__middle" : "audience-card-art__back"}>
            <rect width="42" height="42" rx={distributed ? 9 : 21} className="audience-card-art__paper" />
            {distributed ? (
              <path d="M13 14h16v14H13zm5 0v-4m6 4v-4m-6 18v-4m6 4v-4" className="audience-card-art__ink" />
            ) : (
              <>
                <circle cx="21" cy="16" r="5" className="audience-card-art__accent" />
                <path d="M11 31c0-9 20-9 20 0" className="audience-card-art__ink" />
              </>
            )}
          </g>
        </g>
      ))}
    </>
  );
}

function Activity() {
  return (
    <>
      <path d="M103 57v139" className="audience-card-art__connections" />
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${91 + index * 12} ${58 + index * 47})`}>
          <g className={["audience-card-art__back", "audience-card-art__middle", "audience-card-art__front"][index]}>
            <rect width="190" height="40" rx="7" className="audience-card-art__paper" />
            <circle cx="23" cy="20" r="10" className="audience-card-art__field" />
            <path d={index === 1 ? "m19 20 3 3 6-6" : "M19 20h8m-4-4 4 4-4 4"} className="audience-card-art__ink" />
            <path d="M45 16h79m-79 8h48" className="audience-card-art__rule" />
            <rect x="149" y="16" width="24" height="8" rx="4" className="audience-card-art__accent" />
          </g>
        </g>
      ))}
    </>
  );
}

function Selection() {
  return (
    <>
      {[-1, 0, 1].map((index) => (
        <g key={index} transform={`translate(${158 + index * 71} ${index ? 77 : 59}) rotate(${index * 10} 42 61)`}>
          <g className={index ? "audience-card-art__back" : "audience-card-art__front"}>
            <rect width="84" height="122" rx="7" className="audience-card-art__paper" />
            <rect x="14" y="15" width="27" height="27" rx="6" className="audience-card-art__field" />
            <path d="m21 29 7-5 7 5-7 5-7-5Zm0 6 7 5 7-5" className="audience-card-art__ink" />
            <path d="M14 59h53m-53 10h40m-40 16h53" className="audience-card-art__rule" />
            <rect x="14" y="99" width="56" height="9" rx="3" className="audience-card-art__accent" />
          </g>
        </g>
      ))}
    </>
  );
}

function Terms() {
  return (
    <>
      <g transform="translate(107 81) rotate(-8 74 50)">
        <g className="audience-card-art__back"><Document compact /></g>
      </g>
      <g transform="translate(144 63) rotate(5 74 50)">
        <g className="audience-card-art__front"><Document compact /></g>
      </g>
      <path d="M139 192h122" className="audience-card-art__connections" />
    </>
  );
}

/** Decorative interface-inspired artwork, with no facility data or quoted terms. */
export default function AudienceCardArt({ kind }: { kind: AudienceArtKind }) {
  const gradient = useId().replace(/:/g, "");
  return (
    <div className={`audience-card-art audience-card-art--${kind}`} aria-hidden="true">
      <svg viewBox="0 0 400 250" fill="none" focusable="false">
        <defs>
          <radialGradient id={gradient}>
            <stop stopColor="#dce8d2" stopOpacity=".85" />
            <stop offset="1" stopColor="#eaf0e5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="200" cy="133" rx="182" ry="120" fill={`url(#${gradient})`} />
        <ellipse cx="200" cy="198" rx="104" ry="10" fill="#9eb791" opacity=".09" />
        {kind === "structure" && <Structure />}
        {kind === "network" && <Network />}
        {kind === "distribution" && <Network distributed />}
        {kind === "activity" && <Activity />}
        {kind === "selection" && <Selection />}
        {kind === "terms" && <Terms />}
      </svg>
    </div>
  );
}
