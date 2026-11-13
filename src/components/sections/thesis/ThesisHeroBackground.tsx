import { useDashboardMotion } from "../../../hooks/useDashboardMotion";

const meshPath = (horizontal: boolean, offset: number) =>
  Array.from({ length: 33 }, (_, index) => {
    const x = horizontal ? index * 56 - 160 : offset;
    const y = horizontal ? offset : index * 40 - 160;
    const meshX = x + 12 * Math.sin(y / 150) * Math.sin(x / 320);
    const meshY = y + 24 * Math.sin(x / 260) * Math.cos(y / 280);
    return `${index === 0 ? "M" : "L"}${meshX.toFixed(1)} ${meshY.toFixed(1)}`;
  }).join(" ");

const mesh = [
  ...Array.from({ length: 20 }, (_, index) => meshPath(true, index * 64 - 160)),
  ...Array.from({ length: 28 }, (_, index) => meshPath(false, index * 64 - 160)),
];

/** A decorative grid that moves while the hero is visible. */
export default function ThesisHeroBackground() {
  const motion = useDashboardMotion<HTMLDivElement>();
  return (
    <div className="thesis-hero-mesh" aria-hidden="true" {...motion}>
      <svg className="thesis-hero-mesh__field" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
        <g className="thesis-hero-mesh__flow">
          {mesh.map((path, index) => <path key={index} d={path} stroke="currentColor" strokeWidth=".8" vectorEffect="non-scaling-stroke" />)}
        </g>
      </svg>
      <div className="thesis-hero-mesh__shade" />
    </div>
  );
}
