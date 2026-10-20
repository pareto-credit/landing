import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import paretoMark from "../../../assets/svgs/pareto-mark-white.svg";
import { cn } from "../../../lib/cn";
import {
  deskNavigation,
  type DeskActivity,
  type DeskList,
  type DeskSideCard,
  type PersonaDesk,
} from "./studioDeskData";

const panelClass =
  "rounded-md border border-[color:rgb(255_255_255_/_0.07)] bg-[color:rgb(255_255_255_/_0.025)]";
const labelClass =
  "font-mono text-[9.5px] uppercase tracking-[0.16em] text-[color:rgb(196_214_206_/_0.62)]";
const mixColors = ["#72f4c9", "#70b19e", "#3f7a68", "#2b5546"];

const buildSparkline = (series: number[], width = 100, height = 36) => {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = max - min || 1;
  const points = series.map((value, index) => {
    const x = (index / (series.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const [lastX, lastY] = points[points.length - 1];
  return { line, area, lastX, lastY };
};

const Sparkline = ({ series }: { series: number[] }) => {
  const { line, area, lastX, lastY } = buildSparkline(series);
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="h-24 w-full md:h-28" aria-hidden="true">
      <defs>
        <linearGradient id="studio-desk-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#72f4c9" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#72f4c9" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[9, 18, 27].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(255 255 255 / 0.05)" strokeWidth="0.3" />
      ))}
      <path d={area} fill="url(#studio-desk-area)" />
      <path d={line} fill="none" stroke="#72f4c9" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
      <circle cx={lastX} cy={lastY} r="1.3" fill="#72f4c9" />
    </svg>
  );
};

const SideCard = ({ card }: { card: DeskSideCard }) => {
  if (card.kind === "mix") {
    return (
      <div className={cn(panelClass, "flex w-full flex-col p-4")}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>{card.title}</span>
          <span className="font-mono text-[9.5px] text-[color:rgb(196_214_206_/_0.62)]">{card.note}</span>
        </div>
        <div className="mt-4 flex h-2.5 overflow-hidden rounded-full">
          {card.items.map(([label, share], index) => (
            <span key={label} style={{ width: `${share}%`, backgroundColor: mixColors[index] }} />
          ))}
        </div>
        <ul className="mt-4 space-y-2.5">
          {card.items.map(([label, share], index) => (
            <li key={label} className="flex items-center justify-between text-[12px] text-[color:rgb(255_255_255_/_0.82)]">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: mixColors[index] }} />
                {label}
              </span>
              <span className="font-mono text-[11px] text-[color:rgb(196_214_206_/_0.75)]">{share}%</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const scaleMax = 90;
  const pct = (value: number) => `${(value / scaleMax) * 100}%`;

  return (
    <div className={cn(panelClass, "flex w-full flex-col p-4")}>
      <div className="flex items-center justify-between">
        <span className={labelClass}>{card.title}</span>
        <span className="font-mono text-[9.5px] text-[color:rgb(196_214_206_/_0.62)]">{card.note}</span>
      </div>
      <div className="mt-3 text-[2rem] font-light leading-none tracking-tight text-[var(--color-text-inverse)]">
        {card.current}%
      </div>
      <div className="relative mt-5 h-2.5 rounded-full bg-[color:rgb(255_255_255_/_0.06)]">
        <span className="absolute inset-y-0 left-0 rounded-full bg-[#72f4c9]" style={{ width: pct(card.current) }} />
        <span className="absolute -top-1.5 h-5 w-px bg-[var(--color-accent-yellow)]" style={{ left: pct(card.marginCall) }} />
        <span className="absolute -top-1.5 h-5 w-px bg-[var(--color-accent-red)]" style={{ left: pct(card.liquidation) }} />
      </div>
      <ul className="mt-5 space-y-2.5 text-[12px] text-[color:rgb(255_255_255_/_0.82)]">
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent-yellow)]" /> Margin call
          </span>
          <span className="font-mono text-[11px] text-[color:rgb(196_214_206_/_0.75)]">{card.marginCall}%</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent-red)]" /> Liquidation
          </span>
          <span className="font-mono text-[11px] text-[color:rgb(196_214_206_/_0.75)]">{card.liquidation}%</span>
        </li>
        <li className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#72f4c9]" /> Headroom
          </span>
          <span className="font-mono text-[11px] text-[color:rgb(196_214_206_/_0.75)]">
            {card.marginCall - card.current} pts
          </span>
        </li>
      </ul>
    </div>
  );
};

const ListPanel = ({ list }: { list: DeskList }) => (
  <div className={cn(panelClass, "p-4")}>
    <div className="mb-3 flex items-center justify-between">
      <span className={labelClass}>{list.title}</span>
      <span className="font-mono text-[9.5px] text-[color:rgb(196_214_206_/_0.62)]">{list.note}</span>
    </div>

    {list.kind === "pipeline" ? (
      <ul className="divide-y divide-[color:rgb(255_255_255_/_0.06)]">
        {list.rows.map((row) => (
          <li key={row.name} className="py-3">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="text-[13px] text-[var(--color-text-inverse)]">{row.name}</div>
                <div className="text-[11px] text-[color:rgb(196_214_206_/_0.62)]">{row.meta}</div>
              </div>
              <span
                className={cn(
                  "font-mono text-[9.5px] uppercase tracking-[0.16em]",
                  row.stage === list.stages.length - 1 ? "text-[#72f4c9]" : "text-[color:rgb(196_214_206_/_0.7)]",
                )}
              >
                {list.stages[row.stage]}
              </span>
            </div>
            <div className="mt-2.5 flex items-center">
              {list.stages.map((stage, index) => (
                <div key={stage} className="flex flex-1 items-center last:flex-none">
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      index <= row.stage ? "bg-[#72f4c9]" : "bg-[color:rgb(255_255_255_/_0.14)]",
                      index === row.stage && "ring-4 ring-[color:rgb(114_244_201_/_0.15)]",
                    )}
                  />
                  {index < list.stages.length - 1 ? (
                    <span
                      className={cn(
                        "h-px flex-1",
                        index < row.stage ? "bg-[#72f4c9]" : "bg-[color:rgb(255_255_255_/_0.1)]",
                      )}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr>
            {list.columns.map((column, index) => (
              <th
                key={column}
                className={cn(labelClass, "pb-2 font-normal", index >= 2 && "text-right")}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:rgb(255_255_255_/_0.06)]">
          {list.rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td
                  key={`${cell}-${index}`}
                  className={cn(
                    "py-2.5",
                    index === 0 ? "text-[var(--color-text-inverse)]" : "text-[color:rgb(196_214_206_/_0.78)]",
                    index >= 2 && "text-right font-mono text-[11.5px]",
                    index === 2 && "text-[#72f4c9]",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const activityDotClass: Record<DeskActivity["kind"], string> = {
  ok: "bg-[#72f4c9]",
  agent: "bg-[var(--color-state-info)]",
  doc: "bg-[color:rgb(255_255_255_/_0.55)]",
  pending: "bg-[var(--color-accent-yellow)]",
};

const ActivityPanel = ({ items }: { items: DeskActivity[] }) => (
  <div className={cn(panelClass, "p-4")}>
    <div className="mb-3 flex items-center justify-between">
      <span className={labelClass}>Activity · onchain tape</span>
      <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#72f4c9]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#72f4c9]" /> Live
      </span>
    </div>
    <ul className="divide-y divide-[color:rgb(255_255_255_/_0.06)]">
      {items.map((item) => (
        <li key={`${item.time}-${item.label}`} className="flex items-center gap-3 py-2.5 text-[12px]">
          <span className="w-10 shrink-0 font-mono text-[11px] text-[color:rgb(196_214_206_/_0.62)]">{item.time}</span>
          <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", activityDotClass[item.kind])} />
          <span className="min-w-0 truncate text-[color:rgb(255_255_255_/_0.85)]">{item.label}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface StudioDeskProps {
  desk: PersonaDesk;
}

const StudioDesk = ({ desk }: StudioDeskProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      data-testid="studio-desk"
      className="overflow-hidden rounded-lg border border-[color:rgb(255_255_255_/_0.1)] bg-[#0b1511] text-left shadow-[0_40px_90px_rgb(0_0_0_/_0.45)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[color:rgb(255_255_255_/_0.07)] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <img src={paretoMark} alt="" className="h-5 w-5 shrink-0" />
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-[color:rgb(196_214_206_/_0.7)]">
            Studio <span className="text-[color:rgb(255_255_255_/_0.25)]">/</span> {desk.crumb}{" "}
            <span className="text-[color:rgb(255_255_255_/_0.25)]">/</span>{" "}
            <span className="text-[var(--color-text-inverse)]">{desk.activeNav}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]">
          <span className="hidden items-center gap-1 sm:flex">
            {["7D", "30D", "All"].map((range) => (
              <span
                key={range}
                className={cn(
                  "rounded px-1.5 py-0.5",
                  range === "30D"
                    ? "bg-[color:rgb(114_244_201_/_0.12)] text-[#72f4c9]"
                    : "text-[color:rgb(196_214_206_/_0.55)]",
                )}
              >
                {range}
              </span>
            ))}
          </span>
          <span className="flex items-center gap-1.5 text-[color:rgb(196_214_206_/_0.62)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:rgb(196_214_206_/_0.62)]" />
            Illustrative
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[176px_1fr]">
        <aside className="hidden border-r border-[color:rgb(255_255_255_/_0.07)] px-3 py-4 lg:block">
          {deskNavigation.map((group) => (
            <div key={group.group} className="mb-4">
              <div className={cn(labelClass, "mb-1.5 px-2 text-[9px]")}>{group.group}</div>
              <ul>
                {group.items.map((item) => {
                  const isActive = item.label === desk.activeNav;
                  return (
                    <li
                      key={item.label}
                      className={cn(
                        "flex items-center justify-between rounded px-2 py-1.5 text-[12px]",
                        isActive
                          ? "bg-[color:rgb(114_244_201_/_0.1)] text-[#72f4c9]"
                          : "text-[color:rgb(255_255_255_/_0.6)]",
                      )}
                    >
                      {item.label}
                      {item.badge ? (
                        <span className="rounded-full bg-[color:rgb(147_197_253_/_0.18)] px-1.5 font-mono text-[9.5px] text-[var(--color-state-info)]">
                          {item.badge}
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </aside>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={desk.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="grid gap-3 p-3 sm:p-4"
          >
            <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
              <div className={cn(panelClass, "p-4")}>
                <div className="flex items-start justify-between gap-3">
                  <span className={labelClass}>{desk.hero.label}</span>
                  <span className="font-mono text-[10.5px] text-[#72f4c9]">{desk.hero.delta}</span>
                </div>
                <div className="mt-2 text-[2.6rem] font-light leading-none tracking-tight text-[var(--color-text-inverse)] md:text-[3.2rem]">
                  {desk.hero.value}
                </div>
                <div className="mt-3">
                  <Sparkline series={desk.hero.series} />
                </div>
              </div>
              <div className="hidden md:flex">
                <div className="flex w-full">
                  <SideCard card={desk.side} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {desk.kpis.map((kpi) => (
                <div key={kpi.label} className={cn(panelClass, "p-3.5")}>
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(labelClass, "truncate")}>{kpi.label}</span>
                    {kpi.note ? (
                      <span className="shrink-0 font-mono text-[9.5px] text-[color:rgb(196_214_206_/_0.62)]">
                        {kpi.note}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-xl font-light tracking-tight text-[var(--color-text-inverse)] md:text-2xl">
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-[1.25fr_1fr]">
              <ListPanel list={desk.list} />
              <div className="hidden md:block">
                <ActivityPanel items={desk.activity} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudioDesk;
