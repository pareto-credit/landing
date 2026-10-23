import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { useRouter } from "@tanstack/react-router";

export type SitePagePath =
  | "/"
  | "/thesis"
  | "/ecosystem"
  | "/ecosystem/originators"
  | "/ecosystem/capital-providers";

interface PageLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: SitePagePath;
  hash?: string;
}

/**
 * Internal link that uses client-side routing when a router is mounted and
 * falls back to a normal link otherwise (e.g. in isolated component tests).
 */
export const PageLink = ({ to, hash, onClick, children, ...props }: PageLinkProps) => {
  const router = useRouter({ warn: false });
  const href = hash ? `${to}#${hash}` : to;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      !router ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (props.target && props.target !== "_self") ||
      props.download !== undefined
    ) {
      return;
    }

    event.preventDefault();
    void router.navigate({
      to,
      hash,
      hashScrollIntoView: hash ? {
        block: "start",
        behavior: router.state.location.pathname === to &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant",
      } : undefined,
    });
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
