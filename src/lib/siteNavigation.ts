import type { ContactInterest } from "../data/brand";
import { scrollToSection } from "./scrollToSection";

export const CONTACT_INTEREST_EVENT = "pareto:contact-interest";

/** Interest chosen on another page, consumed by the contact form on mount. */
let pendingContactInterest: ContactInterest | null = null;

export const isHomePath = () =>
  typeof window !== "undefined" &&
  (window.location.pathname === "/" || window.location.pathname === "/index.html");

export const setPendingContactInterest = (interest: ContactInterest | null) => {
  pendingContactInterest = interest;
};

export const consumePendingContactInterest = (): ContactInterest | null => {
  const interest = pendingContactInterest;
  pendingContactInterest = null;
  return interest;
};

/**
 * Pre-selects an interest in the contact form and scrolls to it. Only works on
 * the homepage; other pages navigate to `/#contact` after calling
 * `setPendingContactInterest`.
 */
export const requestContact = (interest?: ContactInterest) => {
  if (interest && typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<ContactInterest>(CONTACT_INTEREST_EVENT, { detail: interest }),
    );
  }

  scrollToSection("contact");
};

/**
 * After a cross-page navigation to `/#section`, scroll once the section has
 * rendered, then correct once more after async content settles.
 */
export const scrollToHashSection = () => {
  if (typeof window === "undefined") return () => {};

  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!id) return () => {};

  const timers = [80, 600].map((delay) =>
    window.setTimeout(() => {
      if (document.getElementById(id)) scrollToSection(id);
    }, delay),
  );

  return () => timers.forEach((timer) => window.clearTimeout(timer));
};
