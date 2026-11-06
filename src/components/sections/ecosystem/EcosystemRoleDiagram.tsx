import { useId } from "react";
import type { EcosystemRole } from "../../../data/ecosystem";

const EcosystemRoleDiagram = ({ role }: { role: EcosystemRole["id"] }) => {
  const dotsId = useId();
  return (
    <div className="eco-role-diagram" aria-hidden="true">
      <svg viewBox="0 0 240 112" fill="none" focusable="false">
        <defs>
          <pattern id={dotsId} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".65" fill="currentColor" opacity=".2" />
          </pattern>
        </defs>
        <rect width="240" height="112" fill={`url(#${dotsId})`} />
        <g stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
          {role === "borrowers" ? <>
            <path d="M94 34 154 18 190 38 130 54Z M94 34v42l36 20 60-16V38 M130 54v42 M94 48l36 20 60-16 M94 62l36 20 60-16" fill="currentColor" fillOpacity=".045" />
            <path d="M22 48h30l22 12h33 M22 78h30l22-12h33" opacity=".4" />
            <path className="eco-role-signal" d="M22 48h30l22 12h33" />
            <path d="m102 56 6 4-6 4 M149 77v12l21-6V71Z" />
            <rect x="15" y="45" width="6" height="6" fill="currentColor" stroke="none" />
            <rect x="15" y="75" width="6" height="6" fill="currentColor" stroke="none" />
          </> : null}
          {role === "underwriters" ? <>
            <path d="m68 30 16-8 92 20v54L84 76l-16 8Z" opacity=".3" />
            <path d="m82 21 16-8 92 20v54L98 67l-16 8Z" opacity=".5" />
            <path d="m98 13 92 20v54L98 67Z" fill="currentColor" fillOpacity=".045" />
            <path d="m111 32 42 9 m-42 3 56 12 m-56 0 31 7" opacity=".5" />
            <path d="m155 66 7 9 17-12" strokeWidth="1.8" />
            <path className="eco-role-signal" d="M22 59h29l18-11h17" />
            <circle cx="22" cy="59" r="3" fill="currentColor" stroke="none" />
          </> : null}
          {role === "lenders" ? <>
            <path d="M61 56h37 M98 30v52 M98 30h38 M98 56h38 M98 82h38" opacity=".4" />
            <path className="eco-role-signal" d="M61 56h37V30h38 M98 56h38 M98 56v26h38" />
            <path d="m23 45 22-8 18 11-22 8Z M23 45v16l18 11 22-8V48 M41 56v16" fill="currentColor" fillOpacity=".045" />
            {[18, 44, 70].map((y) => <g key={y}>
              <path d={`M138 ${y}h51v18h-51Z`} fill="currentColor" fillOpacity=".045" />
              <path d={`m145 ${y + 9} 4 3 7-7 M166 ${y + 8}h15`} opacity=".6" />
            </g>)}
          </> : null}
          {role === "distribution" ? <>
            <path d="M92 56H60V25H34 M60 56v31H34 M140 56h27V25h28 M167 56v31h28" opacity=".4" />
            <path className="eco-role-signal" d="M92 56H60V25H34 M140 56h27V25h28 M167 56v31h28" />
            <path d="m92 44 26-9 23 12-26 10Z M92 44v22l23 12 26-10V47 M115 57v21" fill="currentColor" fillOpacity=".045" />
            {[[20, 16], [20, 78], [196, 16], [196, 78]].map(([x, y]) => <g key={`${x}-${y}`}>
              <rect x={x} y={y} width="14" height="18" rx="1" fill="currentColor" fillOpacity=".06" />
              <path d={`M${x + 4} ${y + 6}h6 m-6 5h6`} opacity=".5" />
            </g>)}
          </> : null}
        </g>
      </svg>
    </div>
  );
};

export default EcosystemRoleDiagram;
