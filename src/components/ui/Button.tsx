import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

const sharedBaseClass =
  "inline-flex items-center justify-center gap-2 uppercase whitespace-nowrap font-mono font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:translate-y-px disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70B19E]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

const variantClass = {
  primary:
    "rounded-md border border-[#70B19E]/45 bg-[#70B19E]/86 text-[#0E1813] shadow-[0_8px_24px_rgba(112,177,158,0.28)] backdrop-blur-md hover:border-[#8AC7AE]/65 hover:bg-[#8AC7AE]/82 hover:text-[#0E1813] hover:shadow-[0_12px_30px_rgba(112,177,158,0.34)]",
  secondary:
    "rounded-md border border-white/20 bg-white/50 text-[#0E1813] shadow-sm backdrop-blur-sm hover:bg-white/75",
  outline:
    "rounded-md border border-white/20 bg-transparent text-white hover:border-white/30 hover:bg-white/10",
  ghost:
    "rounded-md border border-white/10 bg-white/[0.02] text-white hover:border-white/20 hover:bg-white/[0.05]",
  underline:
    "rounded-none border-b border-current/85 px-0 py-0 pb-1 text-current hover:border-[#70B19E] hover:text-[#70B19E]",
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
