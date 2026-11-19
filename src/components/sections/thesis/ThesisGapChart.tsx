import { useRef, useState, type CSSProperties, type PointerEvent } from "react";
import type { ThesisStat } from "../../../data/thesis";

type CreditKind = "private" | "tokenized";

interface ThesisGapChartProps {
  privateCredit: ThesisStat;
  tokenizedCredit: ThesisStat;
  tokenizedShare: number;
}

const ThesisGapChart = ({ privateCredit, tokenizedCredit, tokenizedShare }: ThesisGapChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<{ kind: CreditKind; visible: boolean }>({ kind: "private", visible: false });
  const activeStat = label.kind === "private" ? privateCredit : tokenizedCredit;

  const hideLabel = () => setLabel(current => current.visible ? { ...current, visible: false } : current);

  const showLabel = (kind: CreditKind, clientX: number, clientY: number) => {
    const chart = chartRef.current;
    const tooltip = tooltipRef.current;
    if (!chart || !tooltip) return;

    const bounds = chart.getBoundingClientRect();
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const x = Math.max(8, Math.min(clientX + 14, document.documentElement.clientWidth - width - 8));
    const above = clientY - height - 12;
    const y = above >= 8 ? above : Math.max(8, Math.min(clientY + 16, document.documentElement.clientHeight - height - 8));
    tooltip.style.setProperty("--tooltip-x", `${x - bounds.left}px`);
    tooltip.style.setProperty("--tooltip-y", `${y - bounds.top}px`);
    setLabel(current => current.kind === kind && current.visible ? current : { kind, visible: true });
  };

  const followPointer = (kind: CreditKind, event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "touch") showLabel(kind, event.clientX, event.clientY);
  };

  const showAtCircle = (kind: CreditKind, circle: HTMLButtonElement) => {
    const bounds = circle.getBoundingClientRect();
    showLabel(kind, bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
  };

  return (
    <div ref={chartRef} className="thesis-scale__gap-chart" role="group" aria-label="Private and tokenized credit">
      {(["private", "tokenized"] as const).map(kind => {
        const stat = kind === "private" ? privateCredit : tokenizedCredit;
        return (
          <button
            key={kind}
            type="button"
            className={`thesis-scale__gap-circle thesis-scale__gap-circle--${kind}`}
            aria-label={`${stat.kicker}: ${stat.value}`}
            style={kind === "tokenized" ? { "--circle-share": `${Math.sqrt(tokenizedShare) * 100}%` } as CSSProperties : undefined}
            onPointerEnter={event => followPointer(kind, event)}
            onPointerMove={event => followPointer(kind, event)}
            onPointerLeave={hideLabel}
            onFocus={event => {
              if (event.currentTarget.matches(":focus-visible")) showAtCircle(kind, event.currentTarget);
            }}
            onBlur={hideLabel}
            onClick={event => {
              if (event.detail === 0 || !label.visible) showAtCircle(kind, event.currentTarget);
            }}
            onKeyDown={event => {
              if (event.key === "Escape") hideLabel();
            }}
          />
        );
      })}
      <div ref={tooltipRef} className="thesis-scale__gap-tooltip" data-visible={label.visible} aria-hidden="true">
        <div key={label.kind} className="thesis-scale__gap-tooltip-copy">
          <b>{activeStat.value}</b>
          {activeStat.kicker}
        </div>
      </div>
    </div>
  );
};

export default ThesisGapChart;
