import type { CSSProperties } from "react";
import type { Plan } from "../../../data/plans";

type Point = [number, number, number];
type Building = { x: number; z: number; width: number; depth: number; height: number; base?: number; floors: number; bays: number; roofRise?: number; glass?: boolean };

// Project a small architectural model into an isometric drawing. SVG keeps the
// fine lines sharp and avoids three extra WebGL contexts for decorative content.
const project = ([x, y, z]: Point) => [200 + (x - z) * .76, 164 + (x + z) * .28 - y * .95];
const path = (points: Point[], close = false) => points.map((point, i) => `${i ? "L" : "M"}${project(point).join(",")}`).join(" ") + (close ? " Z" : "");

// The architecture illustrates the service scale; it does not change tier eligibility.
const models: Record<Exclude<Plan["id"], "white-glove">, Building[]> = {
  core: [
    { x: 0, z: 0, width: 158, depth: 98, height: 12, floors: 1, bays: 1 },
    { x: 0, z: -5, width: 138, depth: 76, height: 56, base: 12, floors: 3, bays: 7 },
    { x: 0, z: -5, width: 146, depth: 84, height: 4, base: 68, floors: 1, bays: 1 },
    { x: -10, z: -12, width: 102, depth: 56, height: 7, base: 72, floors: 1, bays: 1 },
  ],
  pro: [
    { x: -60, z: -3, width: 32, depth: 38, height: 76, floors: 9, bays: 4, roofRise: 8, glass: true },
    { x: -4, z: -24, width: 42, depth: 46, height: 111, floors: 13, bays: 5, roofRise: 19, glass: true },
    { x: 62, z: 10, width: 30, depth: 42, height: 98, floors: 12, bays: 4, glass: true },
  ],
};

const BuildingFrame = ({ building, index }: { building: Building; index: number }) => {
  const { x, z, width, depth, height, base = 0, floors, bays, roofRise = 0, glass } = building;
  const left = x - width / 2, right = x + width / 2;
  const back = z - depth / 2, front = z + depth / 2;
  const roof = (column: number) => base + height + roofRise * (column - left) / width;
  const roofPerimeter: Point[] = [[left, roof(left), back], [right, roof(right), back], [right, roof(right), front], [left, roof(left), front]];
  return <g className={`offering-building${glass ? " offering-building--glass" : ""}`} style={{ "--building-index": index } as CSSProperties}>
    <path className="offering-building__face offering-building__face--side" d={path([[right, base, back], [right, base, front], [right, roof(right), front], [right, roof(right), back]], true)} />
    <path className="offering-building__face" d={path([[left, base, front], [right, base, front], [right, roof(right), front], [left, roof(left), front]], true)} />
    <path className="offering-building__roof" d={path(roofPerimeter, true)} />
    <g className="offering-building__grid">
      {Array.from({ length: bays - 1 }, (_, i) => {
        const column = left + width * (i + 1) / bays;
        return <path key={`front-${i}`} d={path([[column, base, front], [column, roof(column), front]])} />;
      })}
      {Array.from({ length: Math.max(1, Math.round(depth / 16)) - 1 }, (_, i) => {
        const column = back + depth * (i + 1) / Math.max(1, Math.round(depth / 16));
        return <path key={`side-${i}`} d={path([[right, base, column], [right, roof(right), column]])} />;
      })}
      {Array.from({ length: floors - 1 }, (_, i) => {
        const y = base + height * (i + 1) / floors;
        return <path className="offering-building__floor" key={i} style={{ "--floor-index": i + index * 2 } as CSSProperties} d={path([[left, y, front], [right, y, front], [right, y, back]])} />;
      })}
    </g>
    <g className="offering-building__outline">
      <path d={path(roofPerimeter, true)} />
      <path d={path([[left, roof(left), front], [left, base, front], [right, base, front], [right, roof(right), front]])} />
      <path d={path([[right, base, front], [right, base, back], [right, roof(right), back]])} />
    </g>
    {roofPerimeter.map((point, i) => {
      const [cx, cy] = project(point);
      return <circle className="offering-building__node" key={i} cx={cx} cy={cy} r="1.4" />;
    })}
  </g>;
};

const Column = ({ x, z, bottom, top, radius = 3 }: { x: number; z: number; bottom: number; top: number; radius?: number }) => {
  const ring = (y: number): Point[] => Array.from({ length: 8 }, (_, i) => [x + Math.cos(i * Math.PI / 4) * radius, y, z + Math.sin(i * Math.PI / 4) * radius]);
  return <g className="offering-building__columns">
    <path d={path(ring(bottom), true)} />
    <path d={path(ring(top), true)} />
    {[0, 2, 4, 6].map(i => <path key={i} d={path([ring(bottom)[i], ring(top)[i]])} />)}
  </g>;
};

const Entrance = ({ width = 48, z = 56, top = 38 }: { width?: number; z?: number; top?: number }) => <g>
  {[0, 1, 2].map(i => <BuildingFrame key={i} index={0} building={{ x: 0, z: z + 4 + i * 5, width: width + 16 - i * 5, depth: 10, height: 3, base: 9 - i * 3, floors: 1, bays: 1 }} />)}
  <path className="offering-building__entrance" d={path([[-width / 2 + 7, 12, z - 8], [-width / 2 + 7, top - 4, z - 8], [width / 2 - 7, top - 4, z - 8], [width / 2 - 7, 12, z - 8]], true)} />
  <path className="offering-building__columns" d={path([[0, 12, z - 8], [0, top - 4, z - 8]])} />
  {[-1, 1].map(i => <Column key={i} x={i * (width / 2 - 3)} z={z} bottom={12} top={top} />)}
  <BuildingFrame index={0} building={{ x: 0, z: z - 4, width: width + 8, depth: 20, height: 4, base: top, floors: 1, bays: 1 }} />
</g>;

const BankBuilding = () => <g>
  {[0, 1, 2].map(i => <BuildingFrame key={i} index={0} building={{ x: 0, z: 0, width: 184 - i * 10, depth: 110 - i * 8, height: 4, base: i * 4, floors: 1, bays: 1 }} />)}
  <BuildingFrame index={0} building={{ x: 0, z: -16, width: 140, depth: 54, height: 66, base: 12, floors: 3, bays: 8 }} />
  <path className="offering-building__entrance" d={path([[-10, 12, 12], [-10, 48, 12], [10, 48, 12], [10, 12, 12]], true)} />
  {[-60, -36, -12, 12, 36, 60].map(x => <g key={x}>
    <Column x={x} z={39} bottom={16} top={77} radius={3.4} />
    <BuildingFrame index={0} building={{ x, z: 39, width: 10, depth: 10, height: 4, base: 12, floors: 1, bays: 1 }} />
    <BuildingFrame index={0} building={{ x, z: 39, width: 10, depth: 10, height: 4, base: 77, floors: 1, bays: 1 }} />
  </g>)}
  <BuildingFrame index={0} building={{ x: 0, z: 0, width: 166, depth: 96, height: 7, base: 81, floors: 1, bays: 1 }} />
  <g className="offering-building__pediment">
    <path className="offering-building__roof" d={path([[-83, 88, -48], [0, 116, -48], [0, 116, 48], [-83, 88, 48]], true)} />
    <path className="offering-building__roof" d={path([[83, 88, -48], [0, 116, -48], [0, 116, 48], [83, 88, 48]], true)} />
    <path className="offering-building__face" d={path([[-83, 88, 48], [83, 88, 48], [0, 116, 48]], true)} />
    <path className="offering-building__outline" d={`${path([[-83, 88, 48], [0, 116, 48], [83, 88, 48], [-83, 88, 48], [-83, 88, -48], [0, 116, -48], [0, 116, 48]])} ${path([[0, 116, -48], [83, 88, -48], [83, 88, 48]])}`} />
    <path className="offering-building__columns" d={path([[-56, 92, 48.2], [56, 92, 48.2], [0, 111, 48.2]], true)} />
  </g>
</g>;

/** Architectural wireframes over a flowing point field; motion is interaction-only. */
const OfferingArchitecture = ({ id, active }: { id: Plan["id"]; active: boolean }) => <div className="offering-illustration" data-active={active || undefined} aria-hidden="true">
  <svg className="offering-points" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" focusable="false">
    {Array.from({ length: 13 }, (_, row) => <g className="offering-points__row" key={row} style={{ "--row": row } as CSSProperties}>
      {Array.from({ length: 29 }, (_, col) => {
        const x = col * 15 - 10;
        const y = row * 17 + Math.sin(col * .24 + row * .17) * 18 - 12;
        const opacity = (.12 + .36 * Math.sin(col / 28 * Math.PI)) * (1 - row / 17);
        return <circle key={col} cx={x} cy={y} r={.7 + .25 * Math.sin(col * .6 + row)} fillOpacity={opacity} />;
      })}
    </g>)}
  </svg>
  <svg className="offering-illustration__surface" viewBox="0 0 400 220" focusable="false">
    <g className="offering-site">
      <path d={path([[-112, 0, -76], [112, 0, -76], [112, 0, 76], [-112, 0, 76]], true)} />
      {[-76, -38, 0, 38, 76].map((n) => <path key={n} d={`${path([[-112, 0, n], [112, 0, n]])} ${path([[n, 0, -76], [n, 0, 76]])}`} />)}
    </g>
    <g className="offering-architecture">
      {id === "white-glove" ? <BankBuilding /> : <>
        {models[id].map((building, index) => <BuildingFrame key={index} building={building} index={index} />)}
        {id === "core" ? <Entrance width={44} z={48} top={30} /> : <g className="offering-building__entrance">
          {[[-60, 16], [-4, -1], [62, 31]].map(([x, z]) => <path key={x} d={path([[x - 4, 0, z + .2], [x - 4, 13, z + .2], [x + 4, 13, z + .2], [x + 4, 0, z + .2]], true)} />)}
        </g>}
      </>}
    </g>
  </svg>
</div>;

export default OfferingArchitecture;
