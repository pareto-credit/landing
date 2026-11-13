import { useId, type ReactNode } from "react";

export type ThesisDiagramKind = "records" | "terms" | "vault" | "servicing" | "network" | "signature" | "code";
type Point3 = readonly [x: number, y: number, z: number];
type Origin = readonly [x: number, y: number];

// Every solid uses the same isometric projection; opaque faces occlude rear edges.
const project = ([x, y, z]: Point3, [ox, oy]: Origin): [number, number] => [ox + (x - y) * .866, oy + (x + y) * .5 - z];
const polygon = (points: Point3[], origin: Origin) => points.map((point) => project(point, origin).join(",")).join(" ");
const strokePath = (points: Point3[], origin: Origin) => points.map((point, index) => `${index === 0 ? "M" : "L"}${project(point, origin).join(" ")}`).join(" ");

const IsometricBlock = ({ origin, width, depth, height, children }: { origin: Origin; width: number; depth: number; height: number; children?: ReactNode }) => {
  const a: Point3 = [0, 0, height];
  const b: Point3 = [width, 0, height];
  const c: Point3 = [width, depth, height];
  const d: Point3 = [0, depth, height];
  return <g>
    <polygon points={polygon([d, c, [width, depth, 0], [0, depth, 0]], origin)} className="thesis-svg-face" />
    <polygon points={polygon([b, [width, 0, 0], [width, depth, 0], c], origin)} className="thesis-svg-face" />
    <polygon points={polygon([b, [width, 0, 0], [width, depth, 0], c], origin)} fill="currentColor" fillOpacity=".06" stroke="none" />
    <polygon points={polygon([a, b, c, d], origin)} className="thesis-svg-face" />
    <polygon points={polygon([a, b, c, d], origin)} fill="currentColor" fillOpacity=".025" stroke="none" />
    {children}
  </g>;
};

const Paper = ({ x = 104, y = 30, children }: { x?: number; y?: number; children?: ReactNode }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M0 0h91l25 25v129H0Z" className="thesis-svg-face" />
    <path d="M91 0v25h25" className="thesis-svg-secondary" />
    {children}
  </g>
);

/** Decorative vector artwork. HTML beside each illustration carries its meaning. */
const ThesisDiagram = ({ kind }: { kind: ThesisDiagramKind }) => {
  const dots = useId();
  const blockOrigin: Origin = [154, 121];
  const networkNodes: Origin[] = [[54, 57], [259, 57], [54, 155], [259, 155]];
  return (
    <div className="thesis-diagram" aria-hidden="true">
      <svg viewBox="0 0 320 220" fill="none" focusable="false">
        <defs>
          <pattern id={dots} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r=".7" fill="currentColor" opacity=".14" />
          </pattern>
        </defs>
        <rect width="320" height="220" fill={`url(#${dots})`} className="thesis-diagram__dots" />
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {kind === "records" ? <>
            <Paper x={72} y={55}><path d="M17 49h63m-63 18h44" className="thesis-svg-secondary" /></Paper>
            <Paper x={94} y={41}><path d="M17 49h63m-63 18h44" className="thesis-svg-secondary" /></Paper>
            <Paper x={116} y={27}>
              <path d="M18 47h53M18 64h76M18 81h76M18 98h48" className="thesis-svg-secondary" />
              <path d="M18 125h25m13 0h38" className="thesis-svg-detail" />
            </Paper>
          </> : null}
          {kind === "terms" ? <Paper>
            <path d="M17 46h52" strokeWidth="2" />
            <path d="M17 64h81v61H17Z M17 84h81M17 104h81M49 64v61" className="thesis-svg-secondary" />
            <path d="M24 74h15m18 0h32m-65 20h15m18 0h32m-65 20h15m18 0h22" className="thesis-svg-detail" />
            <path d="M17 139h49" className="thesis-svg-secondary" />
          </Paper> : null}
          {kind === "signature" ? <>
            <Paper x={92} y={28}>
              <path d="M18 47h53M18 64h76M18 81h55" className="thesis-svg-secondary" />
              <path d="M18 120c8-13 10-22 12-18s-7 31 0 24 11-16 14-10-3 11 5 7l13-7" />
              <path d="M18 135h43" className="thesis-svg-detail" />
            </Paper>
            <circle cx="219" cy="153" r="27" className="thesis-svg-face" />
            <path d="m206 153 9 9 17-20" strokeWidth="2.1" />
          </> : null}
          {kind === "vault" ? <IsometricBlock origin={blockOrigin} width={104} depth={86} height={83}>
            <path d={strokePath([[12, 86, 12], [91, 86, 12], [91, 86, 71], [12, 86, 71], [12, 86, 12]], blockOrigin)} />
            <g transform={`matrix(.866 .5 0 -1 ${project([52, 86, 42], blockOrigin).join(" ")})`}>
              <circle r="13" /><circle r="3" fill="currentColor" stroke="none" />
              <path d="M0-12v9m0 6v9M-12 0h9m6 0h9" />
            </g>
            <path d={strokePath([[86, 86, 34], [86, 86, 49]], blockOrigin)} strokeWidth="2.4" />
            <path d={strokePath([[104, 13, 12], [104, 73, 12]], blockOrigin)} className="thesis-svg-detail" />
          </IsometricBlock> : null}
          {kind === "servicing" ? <>
            <path d="M91 62C61 72 45 97 53 124m-8-10 8 10 9-10 M231 163c31-10 45-38 36-65m8 10-8-10-9 10" className="thesis-svg-secondary" />
            <path className="thesis-diagram__signal" d="M91 62C61 72 45 97 53 124 M231 163c31-10 45-38 36-65" />
            <Paper x={104} y={31}>
              <path d="M17 46h50" strokeWidth="2" />
              {[70, 95, 120].map((y) => <g key={y}><path d={`m17 ${y} 4 4 8-9`} /><path d={`M42 ${y}h54`} className="thesis-svg-secondary" /></g>)}
            </Paper>
          </> : null}
          {kind === "code" ? <IsometricBlock origin={blockOrigin} width={104} depth={86} height={83}>
            <path d={strokePath([[0, 86, 27], [104, 86, 27], [104, 0, 27]], blockOrigin)} className="thesis-svg-secondary" />
            <path d={strokePath([[0, 86, 56], [104, 86, 56], [104, 0, 56]], blockOrigin)} className="thesis-svg-secondary" />
            <path d={strokePath([[35, 86, 33], [25, 86, 42], [35, 86, 51]], blockOrigin)} />
            <path d={strokePath([[69, 86, 33], [79, 86, 42], [69, 86, 51]], blockOrigin)} />
            <path d={strokePath([[48, 86, 33], [58, 86, 51]], blockOrigin)} />
          </IsometricBlock> : null}
          {kind === "network" ? <>
            <path d="M136 110H91V68H66M91 110v55H66 M184 110h45V68h20M229 110v55h20" className="thesis-svg-secondary" />
            <path d="M136 110H91V68H66M91 110v55H66 M184 110h45V68h20M229 110v55h20" className="thesis-diagram__signal" />
            <IsometricBlock origin={[160, 108]} width={31} depth={31} height={39} />
            {networkNodes.map((origin, index) => <IsometricBlock key={index} origin={origin} width={20} depth={20} height={23} />)}
            <circle cx="91" cy="110" r="2.5" fill="currentColor" stroke="none" />
            <circle cx="229" cy="110" r="2.5" fill="currentColor" stroke="none" />
          </> : null}
        </g>
      </svg>
    </div>
  );
};

export default ThesisDiagram;
