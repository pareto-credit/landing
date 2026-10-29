import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { UseCreditHistoryResult } from "../../../hooks/useCreditHistory";
import { useDashboardMotion } from "../../../hooks/useDashboardMotion";
import { carryForwardCreditHistory } from "../../../lib/creditHistory";
import "./credit-history-chart.css";

const series = [
  { key: "creditExtendedUsd", label: "Credit Extended", color: "#3479da" },
  { key: "tvlUsd", label: "Outstanding Loans", color: "#15835f" },
] as const;
type SeriesKey = (typeof series)[number]["key"];
const ranges = ["1M", "3M", "1Y", "All"] as const;
type Range = (typeof ranges)[number];
const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const exactDollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const fullDate = (date: string) =>
  new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
const day = (date: string) => Date.parse(date + "T00:00:00Z");

export default function CreditHistoryChart({
  points,
  source,
  asOf,
  isLoading,
  error,
}: UseCreditHistoryResult) {
  const id = useId();
  const motion = useDashboardMotion<HTMLElement>();
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);
  const [selected, setSelected] = useState<Record<SeriesKey, boolean>>({
    creditExtendedUsd: true,
    tvlUsd: true,
  });
  const [range, setRange] = useState<Range>("All");
  const [inspection, setInspection] = useState<number | null>(null);
  const continuousPoints = useMemo(() => carryForwardCreditHistory(points), [points]);
  useEffect(() => {
    if (!container.current || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0)
        setWidth(Math.max(280, Math.round(entry.contentRect.width)));
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  const visible = useMemo(() => {
    const last = continuousPoints.at(-1);
    if (!last || range === "All") return continuousPoints;
    const days = range === "1M" ? 30 : range === "3M" ? 92 : 366;
    const cutoff = day(last.date) - days * 86_400_000;
    const filtered = continuousPoints.filter(point => day(point.date) >= cutoff);
    const previous = continuousPoints.filter(point => day(point.date) < cutoff).at(-1);
    if (previous && filtered[0] && day(filtered[0].date) > cutoff) {
      return [{ ...previous, date: new Date(cutoff).toISOString().slice(0, 10) }, ...filtered];
    }
    return filtered;
  }, [continuousPoints, range]);
  const enabled = series.filter((item) => selected[item.key]);
  const hasData = visible.some((point) =>
    enabled.some((item) => point[item.key] !== null)
  );
  const height = 310;
  const margin = {
    left: width < 560 ? 48 : 64,
    right: 18,
    top: 22,
    bottom: 42,
  };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;
  const start = visible[0] ? day(visible[0].date) : 0;
  const finish = visible.at(-1) ? day(visible.at(-1)!.date) : 1;
  const maxValue = Math.max(
    1,
    ...visible.flatMap((point) => enabled.map((item) => point[item.key] ?? 0))
  );
  const scale = 10 ** Math.floor(Math.log10(maxValue));
  const max = Math.ceil((maxValue * 1.12) / scale) * scale;
  const x = (date: string) =>
    margin.left +
    (finish === start
      ? plotWidth / 2
      : ((day(date) - start) / (finish - start)) * plotWidth);
  const y = (value: number) => margin.top + plotHeight * (1 - value / max);
  const active =
    inspection === null
      ? null
      : visible[Math.min(inspection, visible.length - 1)];
  const line = (key: SeriesKey) => {
    let path = "";
    let connected = false;
    for (const point of visible) {
      const value = point[key];
      if (value === null) {
        connected = false;
        continue;
      }
      path += connected
        ? `H${x(point.date).toFixed(2)}V${y(value).toFixed(2)} `
        : `M${x(point.date).toFixed(2)},${y(value).toFixed(2)} `;
      connected = true;
    }
    return path.trim();
  };
  const rangeDescription = visible.length
    ? `${fullDate(visible[0].date)} to ${fullDate(visible.at(-1)!.date)}.`
    : "No historical observations available.";

  return (
    <figure
      className="credit-history"
      {...motion}
      aria-labelledby={`${id}-title`}
      aria-busy={isLoading}
    >
      <div className="credit-history-heading">
        <div>
          <p className="data-dashboard-eyebrow">Public facility activity</p>
          <h2 id={`${id}-title`}>Credit over time.</h2>
        </div>
        <div
          className="credit-history-ranges"
          role="group"
          aria-label="History range"
        >
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={range === item}
              onClick={() => {
                setRange(item);
                setInspection(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div
        className="credit-history-legend"
        role="group"
        aria-label="Visible credit metrics"
      >
        {series.map((item) => (
          <button
            key={item.key}
            data-series={item.key}
            type="button"
            aria-pressed={selected[item.key]}
            onClick={() => {
              setSelected((state) => ({
                ...state,
                [item.key]: !state[item.key],
              }));
              setInspection(null);
            }}
          >
            <span style={{ background: item.color }} aria-hidden="true" />
            {item.label}
            <span className="credit-history-legend__check" aria-hidden="true">
              {selected[item.key] ? "✓" : ""}
            </span>
          </button>
        ))}
      </div>
      <div className="credit-history-inspection" aria-live="polite">
        {active ? (
          <>
            <time dateTime={active.date}>{fullDate(active.date)}</time>
            {enabled.map((item) => (
              <span key={item.key}>
                <span className="credit-history-inspection__name">
                  {item.label}
                </span>{" "}
                <strong>
                  {active[item.key] === null
                    ? "—"
                    : exactDollars.format(active[item.key]!)}
                </strong>
              </span>
            ))}
          </>
        ) : (
          <span>
            {hasData
              ? "Explore the chart to inspect dated observations."
              : "USD · Protocol history"}
          </span>
        )}
      </div>
      <div ref={container} className="credit-history-canvas">
        {isLoading ? (
          <div
            className="credit-history-placeholder"
            aria-label="Loading credit history"
          >
            <span className="data-dashboard-skeleton" />
            Loading history…
          </div>
        ) : enabled.length === 0 ? (
          <div className="credit-history-placeholder">
            Select a metric to view its history.
          </div>
        ) : !hasData ? (
          <div className="credit-history-placeholder">
            <span>Historical data is currently unavailable.</span>
            <p>Current protocol totals are shown above.</p>
            {error ? (
              <span className="sr-only">
                The history source could not be reached.
              </span>
            ) : null}
          </div>
        ) : (
          <svg
            className="credit-history-plot"
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label="Credit activity over time"
            aria-describedby={`${id}-description`}
            tabIndex={0}
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              if (!bounds.width || !visible.length) return;
              const px = ((event.clientX - bounds.left) / bounds.width) * width;
              const target =
                start +
                Math.max(0, Math.min(1, (px - margin.left) / plotWidth)) *
                  (finish - start);
              let held = 0;
              for (let index = 0; index < visible.length; index++) {
                if (day(visible[index].date) > target) break;
                held = index;
              }
              setInspection((current) =>
                current === held ? current : held
              );
            }}
            onPointerLeave={() => setInspection(null)}
            onKeyDown={(event) => {
              if (!visible.length) return;
              const current = inspection ?? visible.length - 1;
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                setInspection(
                  Math.max(
                    0,
                    Math.min(
                      visible.length - 1,
                      current + (event.key === "ArrowRight" ? 1 : -1)
                    )
                  )
                );
              }
              if (event.key === "Home") {
                event.preventDefault();
                setInspection(0);
              }
              if (event.key === "End") {
                event.preventDefault();
                setInspection(visible.length - 1);
              }
              if (event.key === "Escape") setInspection(null);
            }}
          >
            <title>Credit activity over time</title>
            <desc id={`${id}-description`}>
              {enabled.map((item) => item.label).join(" and ")} in USD.{" "}
              {rangeDescription} Use left and right arrow keys to inspect
              observations. Missing values carry forward the last known value;
              values before the first report remain unavailable.
            </desc>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
              <g key={ratio} aria-hidden="true">
                <line
                  x1={margin.left}
                  x2={width - margin.right}
                  y1={y(max * ratio)}
                  y2={y(max * ratio)}
                  className="credit-history-grid"
                />
                <text
                  x={margin.left - 12}
                  y={y(max * ratio) + 4}
                  textAnchor="end"
                  className="credit-history-axis"
                >
                  {dollars.format(max * ratio)}
                </text>
              </g>
            ))}
            {(width < 560 ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1]).map(
              (ratio, index, ticks) => {
                const date = new Date(start + ratio * (finish - start));
                return (
                  <text
                    key={ratio}
                    x={margin.left + ratio * plotWidth}
                    y={height - 12}
                    textAnchor={
                      index === 0
                        ? "start"
                        : index === ticks.length - 1
                        ? "end"
                        : "middle"
                    }
                    className="credit-history-axis"
                    aria-hidden="true"
                  >
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "2-digit",
                      timeZone: "UTC",
                    })}
                  </text>
                );
              }
            )}
            {enabled.map((item) => (
              <path
                key={`${item.key}-${range}`}
                className="credit-history-series"
                pathLength={1}
                data-series={item.key}
                d={line(item.key)}
                fill="none"
                stroke={item.color}
                strokeWidth="3"
                strokeLinejoin="round"
                strokeLinecap="round"
                aria-hidden="true"
              />
            ))}
            {active ? (
              <line
                x1={x(active.date)}
                x2={x(active.date)}
                y1={margin.top}
                y2={height - margin.bottom}
                className="credit-history-guide"
                aria-hidden="true"
              />
            ) : null}
            {enabled.flatMap((item) =>
              visible.map((point, index) => {
                const isolated =
                  visible[index - 1]?.[item.key] == null &&
                  visible[index + 1]?.[item.key] == null;
                return point[item.key] !== null &&
                  (isolated || active?.date === point.date) ? (
                  <circle
                    key={`${item.key}-${point.date}`}
                    data-series={item.key}
                    cx={x(point.date)}
                    cy={y(point[item.key]!)}
                    r="4"
                    fill={item.color}
                    stroke="#f8faf7"
                    strokeWidth="2"
                    aria-hidden="true"
                  />
                ) : null;
              })
            )}
          </svg>
        )}
      </div>
      <figcaption className="credit-history-caption">
        <span>
          {source && hasData ? source : "Pareto protocol data"}
          {asOf && hasData ? ` · Through ${asOf}` : ""}
        </span>
        <span>
          Outstanding Loans uses vault TVL · Gaps use the last reported value
        </span>
      </figcaption>
    </figure>
  );
}
