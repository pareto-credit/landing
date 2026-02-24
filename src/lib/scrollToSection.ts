const DEFAULT_NAV_OFFSET = 72;
const NAVBAR_SELECTOR = "[data-site-navbar]";

const getNavOffset = (customOffset?: number) => {
  if (typeof customOffset === "number") return customOffset;

  const navbar = document.querySelector<HTMLElement>(NAVBAR_SELECTOR);
  if (!navbar) return DEFAULT_NAV_OFFSET;

  const styles = window.getComputedStyle(navbar);
  const borderBottomWidth = Number.parseFloat(styles.borderBottomWidth || "0");

  return Math.ceil(navbar.getBoundingClientRect().height + borderBottomWidth);
};

export const scrollToSection = (id: string, navOffset?: number) => {
  const target = document.getElementById(id);
  if (!target) return;
  const offset = getNavOffset(navOffset);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const top =
    id === "hero"
      ? 0
      : target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
};

export { DEFAULT_NAV_OFFSET };
