import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "../../../lib/cn";

/** A schematic balance, not a rate curve: each vertical step is a credit event. */
const RevolvingCreditDiagram = ({ expanded = false }: { expanded?: boolean }) => (
  <div
    role={expanded ? "img" : undefined}
    aria-label={expanded ? "Illustrative revolving credit line: drawing increases the balance, repayment reduces it, and redrawing increases it again, always below the credit limit." : undefined}
    aria-hidden={!expanded || undefined}
    className="text-[var(--color-brand-deep)]"
    data-testid="revolving-credit-diagram"
  >
    <div className={cn("mb-2 flex items-center justify-between gap-3 leading-none", expanded ? "text-xs" : "text-[11px]")}>
      <span className="font-medium">Drawn balance</span>
      <span className="inline-flex items-center gap-1.5 text-[var(--color-text-muted-2)]">
        <span className="w-3.5 border-t border-dashed border-current" />Credit limit
      </span>
    </div>
    <svg
      aria-hidden="true"
      viewBox="0 0 320 80"
      preserveAspectRatio="none"
      className={cn("w-full overflow-visible", expanded ? "h-24 sm:h-28" : "h-16")}
      fill="none"
    >
      <path d="M8 8H312" stroke="currentColor" strokeOpacity=".4" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      <path d="M8 72H312" stroke="currentColor" strokeOpacity=".15" vectorEffect="non-scaling-stroke" />
      <path d="M8 72H54V28H160V52H266V18H312V72H8Z" fill="currentColor" fillOpacity=".07" />
      <path d="M8 72H54V28H160V52H266V18H312" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
    <div className={cn("mt-2 grid grid-cols-3 text-center font-medium leading-none", expanded ? "text-xs" : "text-[11px]")}>
      <span className="inline-flex items-center justify-center gap-1"><ArrowUp size={12} aria-hidden="true" />Draw</span>
      <span className="inline-flex items-center justify-center gap-1"><ArrowDown size={12} aria-hidden="true" />Repay</span>
      <span className="inline-flex items-center justify-center gap-1"><ArrowUp size={12} aria-hidden="true" />Redraw</span>
    </div>
  </div>
);

export default RevolvingCreditDiagram;
