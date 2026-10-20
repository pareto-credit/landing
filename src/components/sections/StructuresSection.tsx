import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import {
  Building2,
  CalendarRange,
  Coins,
  FileBarChart,
  Gauge,
  Plus,
  Receipt,
  RefreshCcw,
  Vault,
  X,
  type LucideIcon,
} from "lucide-react";
import { creditStructures } from "../../data/structures";
import { requestContact } from "../../lib/siteNavigation";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { SectionContainer } from "../ui/Section";

type Tone = "dark" | "mint" | "light";

interface BentoTile {
  icon: LucideIcon;
  tone: Tone;
  /** Grid placement on large screens (4-column bento). */
  placement: string;
  visual?: "cycles" | "revolver" | "receivables" | "assets";
}

/** Same order as `creditStructures`. */
const tiles: BentoTile[] = [
  { icon: CalendarRange, tone: "dark", placement: "col-span-2 lg:row-span-2", visual: "cycles" },
  { icon: RefreshCcw, tone: "mint", placement: "col-span-2", visual: "revolver" },
  { icon: Gauge, tone: "light", placement: "" },
  { icon: Vault, tone: "light", placement: "" },
  { icon: Building2, tone: "light", placement: "" },
  { icon: FileBarChart, tone: "light", placement: "" },
  { icon: Receipt, tone: "dark", placement: "col-span-2 lg:row-span-2", visual: "receivables" },
  { icon: Coins, tone: "mint", placement: "col-span-2", visual: "assets" },
];

const toneClass: Record<Tone, { card: string; muted: string; icon: string; accent: string }> = {
  dark: {
    card: "bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)] border-[color:rgb(255_255_255_/_0.06)]",
    muted: "text-[color:rgb(255_255_255_/_0.62)]",
    icon: "bg-[color:rgb(114_244_201_/_0.12)] text-[var(--color-brand-bright)]",
    accent: "text-[var(--color-brand-bright)]",
  },
  mint: {
    card: "bg-[linear-gradient(140deg,#e3f4ec,#cdebdd)] text-[var(--color-brand-dark)] border-[color:rgb(37_72_57_/_0.12)]",
    muted: "text-[var(--color-text-secondary)]",
    icon: "bg-[var(--color-brand-deep)] text-[var(--color-text-inverse)]",
    accent: "text-[var(--color-brand-deep)]",
  },
  light: {
    card: "bg-[var(--color-surface)] text-[var(--color-brand-dark)] border-[var(--color-border-soft)]",
    muted: "text-[var(--color-text-muted)]",
    icon: "bg-[color:rgb(112_177_158_/_0.16)] text-[var(--color-brand-deep)]",
    accent: "text-[var(--color-brand-alt)]",
  },
};

const TileVisual = ({ kind, tone }: { kind: NonNullable<BentoTile["visual"]>; tone: Tone }) => {
  const stroke = tone === "dark" ? "#72f4c9" : "#254839";

  if (kind === "cycles") {
    return (
      <div aria-hidden="true" className="flex h-32 items-end gap-2">
        {[52, 64, 58, 72, 66, 84, 76].map((height, index) => (
          <div key={index} className="flex flex-1 flex-col items-center justify-end gap-1.5">
            <div
              className="w-full rounded-t-sm bg-[linear-gradient(180deg,rgb(114_244_201_/_0.85),rgb(114_244_201_/_0.15))]"
              style={{ height: `${height}px` }}
            />
            <span className="font-mono text-[9px] text-[color:rgb(255_255_255_/_0.45)]">C{index + 9}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "revolver") {
    return (
      <svg aria-hidden="true" viewBox="0 0 200 50" className="h-14 w-full" preserveAspectRatio="none">
        <line x1="0" x2="200" y1="8" y2="8" stroke={stroke} strokeOpacity="0.35" strokeDasharray="3 3" />
        <path
          d="M0,44 C20,40 30,20 50,22 C70,24 80,38 100,36 C120,34 130,14 150,16 C170,18 180,30 200,26"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
        />
        <text x="196" y="6" textAnchor="end" fontSize="6" fill={stroke} fillOpacity="0.6" fontFamily="monospace">
          LIMIT
        </text>
      </svg>
    );
  }

  if (kind === "receivables") {
    return (
      <ul aria-hidden="true" className="space-y-1.5 font-mono text-[10px]">
        {[
          ["INV-2041", "$84,200", "Eligible"],
          ["INV-2042", "$51,900", "Eligible"],
          ["INV-2043", "$12,400", "Aged"],
          ["INV-2044", "$63,750", "Eligible"],
        ].map(([id, amount, status]) => (
          <li
            key={id}
            className="flex items-center justify-between rounded border border-[color:rgb(255_255_255_/_0.07)] bg-[color:rgb(255_255_255_/_0.03)] px-2.5 py-1.5 text-[color:rgb(255_255_255_/_0.75)]"
          >
            <span>{id}</span>
            <span>{amount}</span>
            <span className={status === "Eligible" ? "text-[var(--color-brand-bright)]" : "text-[var(--color-accent-yellow)]"}>
              {status}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div aria-hidden="true" className="flex flex-wrap gap-2">
      {["USDC", "USDT", "WBTC", "WETH", "EVM chains"].map((asset) => (
        <span
          key={asset}
          className="rounded-full border border-[color:rgb(37_72_57_/_0.2)] bg-[color:rgb(255_255_255_/_0.55)] px-3 py-1 font-mono text-[10.5px] tracking-wide text-[var(--color-brand-deep)]"
        >
          {asset}
        </span>
      ))}
    </div>
  );
};

const StructureDetail = ({
  index,
  onClose,
}: {
  index: number;
  onClose: () => void;
}) => {
  const structure = creditStructures[index];
  const tile = tiles[index];
  const tone = toneClass[tile.tone];
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[color:rgb(5_12_9_/_0.55)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`structure-detail-title-${number}`}
        layoutId={shouldReduceMotion ? undefined : `structure-card-${index}`}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={cn(
          "relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border p-6 shadow-[0_40px_120px_rgb(0_0_0_/_0.35)] sm:p-8",
          tone.card,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <motion.div layout="position" className="flex items-center gap-3">
            <span className={cn("flex h-11 w-11 items-center justify-center rounded-md", tone.icon)}>
              <tile.icon size={20} />
            </span>
          </motion.div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              tile.tone === "dark"
                ? "border-[color:rgb(255_255_255_/_0.15)] hover:bg-[color:rgb(255_255_255_/_0.08)]"
                : "border-[var(--color-border-soft-strong)] hover:bg-[color:rgb(14_24_19_/_0.05)]",
            )}
          >
            <X size={16} />
          </button>
        </div>

        <motion.h3
          layout="position"
          id={`structure-detail-title-${number}`}
          className="mt-6 text-3xl font-bold tracking-tight"
        >
          {structure.name}
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: shouldReduceMotion ? 0 : 0.18 }}
        >
          <p className={cn("mt-3 text-base leading-relaxed", tone.muted)}>{structure.lede}</p>
          {tile.visual ? (
            <div className="mt-6">
              <TileVisual kind={tile.visual} tone={tile.tone} />
            </div>
          ) : null}
          <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
            {structure.specs.map(([label, value]) => (
              <div
                key={label}
                className={cn(
                  "flex items-baseline justify-between gap-6 border-t py-3",
                  tile.tone === "dark" ? "border-[color:rgb(255_255_255_/_0.1)]" : "border-[var(--color-border-soft-strong)]",
                )}
              >
                <dt className={cn("font-mono text-[10.5px] uppercase tracking-[0.14em]", tone.muted)}>{label}</dt>
                <dd className="text-right text-sm">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className={cn("text-xs", tone.muted)}>Terms, size and pricing are set per facility.</span>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                onClose();
                requestContact("Borrowing");
              }}
            >
              Discuss this structure
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const StructuresSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (openIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openIndex]);

  const renderTile = (index: number): ReactNode => {
    const structure = creditStructures[index];
    const tile = tiles[index];
    const tone = toneClass[tile.tone];
    const isLarge = tile.placement.includes("row-span-2");

    return (
      <motion.button
        key={structure.name}
        type="button"
        layoutId={shouldReduceMotion ? undefined : `structure-card-${index}`}
        onClick={() => setOpenIndex(index)}
        aria-haspopup="dialog"
        aria-label={`${structure.name}: show details`}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        className={cn(
          "group relative flex min-h-[10rem] flex-col overflow-hidden rounded-xl border p-4 text-left sm:p-5 lg:min-h-[13rem] shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)] sm:p-6",
          tone.card,
          tile.placement,
          openIndex === index && "invisible",
        )}
      >
        <div className="flex items-start justify-between">
          <span className={cn("flex h-10 w-10 items-center justify-center rounded-md", tone.icon)}>
            <tile.icon size={18} />
          </span>
        </div>

        {tile.visual && isLarge ? (
          <div className="mt-6 flex-1 lg:mt-8">
            <TileVisual kind={tile.visual} tone={tile.tone} />
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className={cn("mt-6", tile.visual && !isLarge && "grid gap-5 sm:grid-cols-[1fr_1.1fr] sm:items-end")}>
          <div>
            <h3 className={cn("font-bold tracking-tight", isLarge ? "text-2xl md:text-[1.75rem]" : "text-base sm:text-lg md:text-xl")}>
              {structure.name}
            </h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                tone.muted,
                !isLarge && (tile.visual ? "line-clamp-2" : "hidden sm:line-clamp-2"),
              )}
            >
              {structure.lede}
            </p>
          </div>
          {tile.visual && !isLarge ? (
            <div className="hidden sm:block">
              <TileVisual kind={tile.visual} tone={tile.tone} />
            </div>
          ) : null}
        </div>

        <span
          className={cn(
            "mt-4 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-transform group-hover:translate-x-0.5",
            tone.accent,
          )}
        >
          <Plus size={13} /> Details
        </span>
      </motion.button>
    );
  };

  return (
    <section
      id="structures"
      className="relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <SectionContainer className="ui-section-shell relative z-10">
        <div className="grid gap-6 pb-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12 md:pb-10">
          <div>
            <div className="ui-frost-chip mb-5 inline-flex px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              Credit facilities
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-brand-dark)] md:text-5xl">
              One platform.
              <span className="text-[var(--color-text-muted)]"> Infinite credit opportunities.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-text-muted)] md:justify-self-end md:text-[0.95rem]">
            If it can be underwritten, it can run on Pareto. Term loans,
            revolving lines, receivables and beyond, each shaped around the
            deal, with its own collateral, controls and reporting. Open any
            card to explore.
          </p>
        </div>

        <LayoutGroup>
          <div
            data-testid="structures-list"
            className="grid auto-rows-[minmax(10rem,auto)] grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(13rem,auto)] lg:grid-cols-4"
          >
            {creditStructures.map((_, index) => renderTile(index))}
          </div>

          <AnimatePresence>
            {openIndex !== null ? (
              <StructureDetail key={openIndex} index={openIndex} onClose={() => setOpenIndex(null)} />
            ) : null}
          </AnimatePresence>
        </LayoutGroup>

        <div className="mt-5 flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          <span>{creditStructures.length} facility types and counting</span>
          <span>Illustrative · not an offer of credit</span>
        </div>
      </SectionContainer>
    </section>
  );
};

export default StructuresSection;
