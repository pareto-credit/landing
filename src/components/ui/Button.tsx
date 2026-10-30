import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { sharedBaseClass, sizeClass, variantClass, type ButtonSize, type ButtonVariant } from "./buttonStyles";

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
