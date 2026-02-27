import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const sharedBaseClass =
  "inline-flex items-center justify-center gap-2 uppercase whitespace-nowrap font-mono font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(112_177_158_/_0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const variantClass = {
  primary:
    "ui-radius-control border border-[var(--color-button-primary-border)] bg-[var(--color-button-primary-bg)] text-[var(--color-text-primary)] shadow-sm backdrop-blur-md hover:border-[var(--color-button-primary-hover-border)] hover:bg-[var(--color-button-primary-hover-bg)] hover:text-[var(--color-text-primary)] hover:shadow-md",
  secondary:
    "ui-radius-control border border-[var(--color-overlay-inverse-20)] bg-[var(--color-overlay-surface-50)] text-[var(--color-text-primary)] shadow-sm backdrop-blur-sm hover:bg-[var(--color-overlay-surface-75)] hover:shadow-md",
  outline:
    "ui-radius-control border-2 border-[var(--color-button-primary-border)] bg-white color-black text-black shadow-sm backdrop-blur-sm hover:border-[var(--color-button-primary-hover-border)] hover:bg-[var(--color-button-primary-hover-bg)] hover:shadow-md",
  ghost:
    "ui-radius-control border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-02)] text-[var(--color-text-inverse)] hover:border-[var(--color-overlay-inverse-20)] hover:bg-[var(--color-border-inverse-subtle)]",
  underline:
    "rounded-none border-b border-current/85 px-0 py-0 pb-1 text-current hover:border-[var(--color-brand-alt)] hover:text-[var(--color-brand-alt)]",
} as const;

const sizeClass = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
} as const;

type ButtonVariant = keyof typeof variantClass;
type ButtonSize = keyof typeof sizeClass;

interface BaseProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export interface ButtonProps
  extends BaseProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      sharedBaseClass,
      sizeClass[size],
      variantClass[variant],
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

export interface ButtonLinkProps
  extends BaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ButtonLink = ({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonLinkProps) => (
  <a
    className={cn(
      sharedBaseClass,
      sizeClass[size],
      variantClass[variant],
      className,
    )}
    {...props}
  >
    {children}
  </a>
);
