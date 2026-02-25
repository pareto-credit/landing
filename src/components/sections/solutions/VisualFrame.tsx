import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface VisualFrameProps {
  children: ReactNode;
  className?: string;
}

export const VisualFrame = ({ children, className }: VisualFrameProps) => (
  <div
    className={cn(
      "ui-radius-card relative flex h-[450px] items-center justify-center overflow-hidden border border-[var(--color-border-inverse-subtle)] bg-[var(--color-bg-panel-dark)] shadow-2xl md:h-[550px]",
      className,
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
    {children}
  </div>
);
