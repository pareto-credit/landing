import { useEffect, useRef, useState } from "react";
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
const mixColors = ["#72f4c9", "#38bdf8", "#2dd4bf", "#3f7a68"];
const LIVE_FEED_INTERVAL_MS = 2600;

/**
 * Animates the numeric part of a formatted value such as "$48.2M" or "9.4%"
 * once, when it mounts. Desks remount per persona, so each switch replays it.
 */
const CountUpValue = ({ value, animate }: { value: string; animate: boolean }) => {
  const [progress, setProgress] = useState(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) return;

    const duration = 900;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / duration);
      setProgress(1 - Math.pow(1 - elapsed, 3));
      if (elapsed < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [animate]);

  const match = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!match || progress >= 1) return <>{value}</>;

  const [, prefix, numeric, suffix] = match;
  const target = Number.parseFloat(numeric.replace(/,/g, ""));
  const decimals = numeric.includes(".") ? numeric.split(".")[1].length : 0;

  return <>{`${prefix}${(target * progress).toFixed(decimals)}${suffix}`}</>;
};

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

const Sparkline = ({ series, animate }: { series: number[]; animate: boolean }) => {
  const { line, area, lastX, lastY } = buildSparkline(series);
  return (
    <svg viewBox="0 0 100 36" preserveAspectRatio="none" className="h-24 w-full md:h-28" aria-hidden="true">
      <defs>
        <linearGradient id="studio-desk-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#72f4c9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#72f4c9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="studio-desk-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#72f4c9" />
        </linearGradient>
      </defs>
      {[9, 18, 27].map((y) => (
        <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="rgb(255 255 255 / 0.05)" strokeWidth="0.3" />
      ))}
      <motion.path
        d={area}
        fill="url(#studio-desk-area)"
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="url(#studio-desk-line)"
        strokeWidth="0.9"
        vectorEffect="non-scaling-stroke"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
      <motion.circle
        cx={lastX}
        cy={lastY}
        r="1.4"
        fill="#72f4c9"
        initial={animate ? { scale: 0 } : false}
        animate={animate ? { scale: [0, 1.5, 1] } : { scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />
    </svg>
  );
};

const SideCard = ({ card, animate }: { card: DeskSideCard; animate: boolean }) => {
  if (card.kind === "mix") {
    return (
      <div className={cn(panelClass, "flex w-full flex-col p-4")}>
        <div className="flex items-center justify-between">
          <span className={labelClass}>{card.title}</span>
          <span className="font-mono text-[9.5px] text-[color:rgb(196_214_206_/_0.62)]">{card.note}</span>
        </div>
        <div className="mt-4 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
          {card.items.map(([label, share], index) => (
            <motion.span
              key={label}
              initial={animate ? { width: 0 } : false}
              animate={{ width: `${share}%` }}
              transition={{ duration: 0.7, delay: 0.15 + index * 0.12, ease: "easeOut" }}
              style={{ backgroundColor: mixColors[index] }}
              className="h-full rounded-sm"
            />
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
        <CountUpValue value={`${card.current}%`} animate={animate} />
      </div>
      <div className="relative mt-5 h-2.5 rounded-full bg-[color:rgb(255_255_255_/_0.06)]">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#2dd4bf,#72f4c9)]"
          initial={animate ? { width: 0 } : false}
          animate={{ width: pct(card.current) }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <span className="absolute -top-1.5 h-5 w-px bg-[var(--color-accent-yellow)]" style={{ left: pct(card.marginCall) }} />
        <span className="absolute -top-1.5 h-5 w-px bg-[var(--color-accent-red)]" style={{ left: pct(card.liquidation) }} />
      </div>
      <ul className="mt-5 space-y-2.5 text-[12px] text-[color:rgb(255_255_255_/_0.82)]">
        {[
          ["Margin call", `${card.marginCall}%`, "bg-[var(--color-accent-yellow)]"],
          ["Liquidation", `${card.liquidation}%`, "bg-[var(--color-accent-red)]"],
          ["Headroom", `${card.marginCall - card.current} pts`, "bg-[#72f4c9]"],
        ].map(([label, value, dot]) => (
          <li key={label} className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className={cn("h-2 w-2 rounded-full", dot)} /> {label}
            </span>
            <span className="font-mono text-[11px] text-[color:rgb(196_214_206_/_0.75)]">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ListPanel = ({ list, animate }: { list: DeskList; animate: boolean }) => (
  <div className={cn(panelClass, "p-4")}>
    <div className="mb-3 flex items-center justify-between">
      <span className={labelClass}>{list.title}</span>
      <span className="font-mono text-[9.5px] text-[color:rgb(196_214_206_/_0.62)]">{list.note}</span>
    </div>

    {list.kind === "pipeline" ? (
      <ul className="divide-y divide-[color:rgb(255_255_255_/_0.06)]">
        {list.rows.map((row, rowIndex) => (
          <li key={row.name} className="py-3">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <div className="text-[13px] text-[var(--color-text-inverse)]">{row.name}</div>
                <div className="text-[11px] text-[color:rgb(196_214_206_/_0.62)]">{row.meta}</div>
              </div>
              <span
                className={cn(
                  "font-mono text-[9.5px] uppercase tracking-[0.16em]",
                  row.stage === list.stages.length - 1 ? "text-[#72f4c9]" : "text-[#7dd3fc]",
                )}
              >
                {list.stages[row.stage]}
              </span>
            </div>
            <div className="relative mt-2.5 flex items-center">
              <span className="absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-[color:rgb(255_255_255_/_0.1)]" />
              <motion.span
                className="absolute left-1 top-1/2 h-px -translate-y-1/2 bg-[linear-gradient(90deg,#2dd4bf,#72f4c9)]"
                initial={animate ? { width: 0 } : false}
                animate={{ width: `calc(${(row.stage / (list.stages.length - 1)) * 100}% - 0.5rem)` }}
                transition={{ duration: 0.8, delay: 0.2 + rowIndex * 0.12, ease: "easeOut" }}
              />
              <div className="relative flex w-full justify-between">
                {list.stages.map((stage, index) => (
                  <span
                    key={stage}
                    className={cn(
                      "relative h-2 w-2 rounded-full",
                      index <= row.stage ? "bg-[#72f4c9]" : "bg-[color:rgb(255_255_255_/_0.16)]",
                    )}
                  >
                    {index === row.stage && animate ? (
                      <span className="absolute -inset-1 animate-ping rounded-full bg-[color:rgb(114_244_201_/_0.35)] motion-reduce:animate-none" />
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr>
            {list.columns.map((column, index) => (
              <th key={column} className={cn(labelClass, "pb-2 font-normal", index >= 2 && "text-right")}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:rgb(255_255_255_/_0.06)]">
          {list.rows.map((row, rowIndex) => (
            <motion.tr
              key={row.join("-")}
              initial={animate ? { opacity: 0, x: -8 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + rowIndex * 0.08 }}
            >
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
            </motion.tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

const activityDotClass: Record<DeskActivity["kind"], string> = {
  ok: "bg-[#72f4c9]",
  agent: "bg-[#a78bfa]",
  doc: "bg-[#38bdf8]",
  pending: "bg-[var(--color-accent-yellow)]",
};

const addMinutes = (time: string, minutes: number) => {
  const [hours, mins] = time.split(":").map(Number);
  const total = (hours * 60 + mins + minutes) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

const ActivityPanel = ({ desk, live }: { desk: PersonaDesk; live: boolean }) => {
  const [items, setItems] = useState<Array<DeskActivity & { id: string }>>(() =>
    desk.activity.map((item, index) => ({ ...item, id: `${desk.id}-base-${index}` })),
  );
  const feedIndex = useRef(0);

  useEffect(() => {
    if (!live) return;

    const intervalId = window.setInterval(() => {
      setItems((current) => {
        const next = desk.liveFeed[feedIndex.current % desk.liveFeed.length];
        feedIndex.current += 1;
        const time = addMinutes(current[0]?.time ?? "09:00", 1 + (feedIndex.current % 3));
        return [{ ...next, time, id: `${desk.id}-live-${feedIndex.current}` }, ...current].slice(0, 5);
      });
    }, LIVE_FEED_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [desk, live]);

  return (
    <div className={cn(panelClass, "p-4")}>
      <div className="mb-3 flex items-center justify-between">
        <span className={labelClass}>Activity · onchain tape</span>
        <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#72f4c9]">
          <span className="h-1.5 w-1.5 animate-pulse motion-reduce:animate-none rounded-full bg-[#72f4c9]" /> Live
        </span>
      </div>
      <ul className="relative overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item) => (
            <motion.li
              key={item.id}
              layout="position"
              initial={{ opacity: 0, y: -14, backgroundColor: "rgba(114,244,201,0.12)" }}
              animate={{ opacity: 1, y: 0, backgroundColor: "rgba(114,244,201,0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, backgroundColor: { duration: 1.6 } }}
              className="flex items-center gap-3 border-b border-[color:rgb(255_255_255_/_0.06)] px-1 py-2.5 text-[12px] last:border-b-0"
            >
              <span className="w-10 shrink-0 font-mono text-[11px] text-[color:rgb(196_214_206_/_0.62)]">{item.time}</span>
              <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", activityDotClass[item.kind])} />
              <span className="min-w-0 truncate text-[color:rgb(255_255_255_/_0.85)]">{item.label}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

interface StudioDeskProps {
  desk: PersonaDesk;
  /** True while the desk is on screen; drives the live tape. */
  isLive?: boolean;
}

const StudioDesk = ({ desk, isLive = false }: StudioDeskProps) => {
  const shouldReduceMotion = useReducedMotion();
  const animate = !shouldReduceMotion;

  return (
    <div
      data-testid="studio-desk"
      className="overflow-hidden rounded-[7px] bg-[#0b1511] text-left"
    >
      <div className="flex items-center justify-between gap-3 border-b border-[color:rgb(255_255_255_/_0.07)] bg-[linear-gradient(90deg,rgb(114_244_201_/_0.06),transparent_40%,rgb(56_189_248_/_0.05))] px-4 py-3">
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
                    ? "bg-[color:rgb(114_244_201_/_0.14)] text-[#72f4c9]"
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
                        "relative flex items-center justify-between rounded px-2 py-1.5 text-[12px] transition-colors duration-300",
                        isActive ? "text-[#72f4c9]" : "text-[color:rgb(255_255_255_/_0.6)]",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId={animate ? "studio-desk-nav-active" : undefined}
                          className="absolute inset-0 rounded bg-[linear-gradient(90deg,rgb(114_244_201_/_0.16),rgb(56_189_248_/_0.08))]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative">{item.label}</span>
                      {item.badge ? (
                        <span className="relative rounded-full bg-[color:rgb(167_139_250_/_0.2)] px-1.5 font-mono text-[9.5px] text-[#c4b5fd]">
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
            initial={animate ? { opacity: 0, y: 10 } : { opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            exit={animate ? { opacity: 0, y: -8 } : { opacity: 0 }}
            transition={{ duration: animate ? 0.3 : 0, ease: "easeOut" }}
            className="grid gap-3 p-3 sm:p-4"
          >
            <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
              <div
                className={cn(
                  panelClass,
                  "relative overflow-hidden p-4 bg-[radial-gradient(120%_120%_at_100%_0%,rgb(56_189_248_/_0.10),transparent_55%),radial-gradient(90%_90%_at_0%_100%,rgb(114_244_201_/_0.08),transparent_60%)]",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={labelClass}>{desk.hero.label}</span>
                  <span className="rounded-full bg-[color:rgb(114_244_201_/_0.12)] px-2 py-0.5 font-mono text-[10.5px] text-[#72f4c9]">
                    {desk.hero.delta}
                  </span>
                </div>
                <div className="mt-2 text-[2.6rem] font-light leading-none tracking-tight text-[var(--color-text-inverse)] md:text-[3.2rem]">
                  <CountUpValue value={desk.hero.value} animate={animate} />
                </div>
                <div className="mt-3">
                  <Sparkline series={desk.hero.series} animate={animate} />
                </div>
              </div>
              <div className="hidden md:flex">
                <SideCard card={desk.side} animate={animate} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {desk.kpis.map((kpi, index) => (
                <motion.div
                  key={kpi.label}
                  initial={animate ? { opacity: 0, y: 8 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + index * 0.06 }}
                  className={cn(panelClass, "p-3.5")}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(labelClass, "truncate")}>{kpi.label}</span>
                    {kpi.note ? (
                      <span className="shrink-0 font-mono text-[9.5px] text-[#7dd3fc]">{kpi.note}</span>
                    ) : null}
                  </div>
                  <div className="mt-2 text-xl font-light tracking-tight text-[var(--color-text-inverse)] md:text-2xl">
                    <CountUpValue value={kpi.value} animate={animate} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-[1.25fr_1fr]">
              <ListPanel list={desk.list} animate={animate} />
              <div className="hidden md:block">
                <ActivityPanel key={desk.id} desk={desk} live={isLive && animate} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudioDesk;
