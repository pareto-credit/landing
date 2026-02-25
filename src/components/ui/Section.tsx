import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  size?: "3xl" | "5xl" | "7xl" | "full";
}

const containerSizeClass = {
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
  full: "max-w-none",
} as const;

export const SectionContainer = ({
  children,
  className,
  size = "7xl",
}: SectionContainerProps) => (
  <div className={cn("mx-auto w-full px-6", containerSizeClass[size], className)}>
    {children}
  </div>
);

interface SectionHeadingProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  size?: "2xl" | "3xl" | "4xl" | "full";
}

const headingSizeClass = {
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  full: "max-w-none",
} as const;

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  size = "3xl",
}: SectionHeadingProps) => (
  <div className={cn(headingSizeClass[size], className)}>
    <div
      className={cn(
        "mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-brand-alt)]",
        eyebrowClassName,
      )}
    >
      {eyebrow}
    </div>
    <h2 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
      {title}
    </h2>
    {description ? (
      <p className={cn("mt-4 text-lg leading-relaxed text-[var(--color-text-muted)]", descriptionClassName)}>
        {description}
      </p>
    ) : null}
  </div>
);
