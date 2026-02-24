import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface VisualFrameProps {
  children: ReactNode;
  className?: string;
}

export const VisualFrame = ({ children, className }: VisualFrameProps) => (
  <div
    className={cn(
      "relative flex h-[450px] items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#0A120E] shadow-2xl md:h-[550px]",
      className,
    )}
  >
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />
    {children}
  </div>
);
