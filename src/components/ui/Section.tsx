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
  <div
    className={cn("mx-auto w-full px-6", containerSizeClass[size], className)}
  >
    {children}
  </div>
);

interface SectionHeadingProps {
  titleId?: string;
  titleTabIndex?: number;
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
  titleId,
  titleTabIndex,
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
    <h2
      id={titleId}
      tabIndex={titleTabIndex}
      className={cn(
        "text-4xl text-[var(--color-brand-dark)] font-bold tracking-tight md:text-5xl",
        titleClassName,
      )}
    >
      {title}
    </h2>
    {description ? (
      <p
        className={cn(
          "mt-4 text-lg leading-relaxed text-[var(--color-text-muted)]",
          descriptionClassName,
        )}
      >
        {description}
      </p>
    ) : null}
  </div>
);

interface SectionHeaderProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  variant?: "explanatory" | "collection" | "centered";
  tone?: "light" | "dark";
  titleId?: string;
  titleTabIndex?: number;
}

/** Section intent determines composition; typography and spacing stay shared. */
export const SectionHeader = ({
  eyebrow, title, description, action, variant = "explanatory", tone = "light", titleId, titleTabIndex,
}: SectionHeaderProps) => {
  const centered = variant === "centered";
  const collection = variant === "collection";
  const descriptionColor = tone === "dark"
    ? "text-[color:rgb(255_255_255_/_0.65)]"
    : "text-[var(--color-text-muted)]";

  return (
    <div
      data-section-header
      data-header-layout={variant}
      className={cn(
        "mb-8 md:mb-10",
        !centered && "grid gap-6 md:items-end md:gap-12",
        !centered && (collection
          ? action ? "md:grid-cols-[minmax(0,1fr)_auto]" : undefined
          : "md:grid-cols-[1.4fr_1fr]"),
      )}
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        titleId={titleId}
        titleTabIndex={titleTabIndex}
        size={centered ? "3xl" : "full"}
        className={centered ? "mx-auto text-center" : collection ? "max-w-3xl" : undefined}
        titleClassName={tone === "dark" ? "text-[var(--color-text-inverse)]" : undefined}
        description={centered || collection ? description : undefined}
        descriptionClassName={cn("text-base md:text-[0.95rem]", descriptionColor)}
      />
      {!centered && (collection ? action : description || action) ? (
        <div className={cn("w-full md:justify-self-end", !collection && "max-w-md")}>
          {!collection && description ? (
            <p className={cn("text-base leading-relaxed md:text-[0.95rem]", descriptionColor)}>{description}</p>
          ) : null}
          {action ? <div className={cn("flex justify-end", !collection && description ? "mt-4" : undefined)}>{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
};
