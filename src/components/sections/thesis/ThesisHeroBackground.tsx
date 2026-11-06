import { useId, useState } from "react";
import { Pause, Play } from "lucide-react";
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

/** A quiet, gently warped grid; all motion is decorative and can be paused. */
export default function ThesisHeroBackground() {
  const motion = useDashboardMotion<HTMLDivElement>();
  const id = useId();
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div id={id} className="thesis-hero-mesh" aria-hidden="true" data-paused={paused} {...motion}>
        <svg className="thesis-hero-mesh__field" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" focusable="false">
          <g className="thesis-hero-mesh__flow">
            {mesh.map((path, index) => <path key={index} d={path} stroke="currentColor" strokeWidth=".8" vectorEffect="non-scaling-stroke" />)}
          </g>
        </svg>
        <div className="thesis-hero-mesh__shade" />
      </div>
      {!motion["data-reduced"] ? (
        <button
          type="button"
          className="thesis-hero-motion-toggle"
          aria-label={paused ? "Resume background motion" : "Pause background motion"}
          aria-controls={id}
          onClick={() => setPaused(current => !current)}
        >
          {paused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
        </button>
      ) : null}
    </>
  );
}
