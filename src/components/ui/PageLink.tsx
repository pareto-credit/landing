import type { AnchorHTMLAttributes } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { useReducedMotion } from "framer-motion";

export type SitePagePath =
  | "/"
  | "/thesis"
  | "/ecosystem"
  | "/originators"
  | "/capital-providers"
  | "/credit-vaults"
  | "/studio"
  | "/data";

interface PageLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: SitePagePath;
  hash?: string;
}

/**
 * Internal link that uses client-side routing when a router is mounted and
 * falls back to a normal link otherwise (e.g. in isolated component tests).
 */
export const PageLink = ({
  to,
  hash,
  onClick,
  children,
  ...props
}: PageLinkProps) => {
  const router = useRouter({ warn: false });
  const reducedMotion = useReducedMotion();
  const href = hash ? `${to}#${hash}` : to;

  if (router) {
    return (
      <Link
        to={to}
        hash={hash}
        onClick={onClick}
        hashScrollIntoView={
          hash
            ? {
                block: "start",
                behavior:
                  router.state.location.pathname.replace(/\/$/, "") ===
                    to.replace(/\/$/, "") &&
                  !reducedMotion
                    ? "smooth"
                    : "instant",
              }
            : undefined
        }
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a href={href} onClick={onClick} {...props}>
      {children}
    </a>
  );
};
