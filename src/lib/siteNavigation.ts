import type { ContactInterest } from "../data/brand";
import { scrollToSection } from "./scrollToSection";

export const CONTACT_INTEREST_EVENT = "pareto:contact-interest";

/** Interest chosen on another page, consumed by the contact form on mount. */
let pendingContactInterest: ContactInterest | null = null;

export const setPendingContactInterest = (interest: ContactInterest | null) => {
  pendingContactInterest = interest;
};

export const consumePendingContactInterest = (): ContactInterest | null => {
  const interest = pendingContactInterest;
  pendingContactInterest = null;
  return interest;
};

/**
 * Pre-selects an interest in the contact form mounted on the current page and
 * scrolls to it. Pages without a form navigate to `/#contact` after calling
 * `setPendingContactInterest`.
 */
export const requestContact = (interest?: ContactInterest) => {
  if (interest && typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<ContactInterest>(CONTACT_INTEREST_EVENT, {
        detail: interest,
      })
    );
  }

  scrollToSection("contact");
  // Wait for a closing dialog to release its inert background before focusing.
  window.requestAnimationFrame(() => {
    document
      .getElementById("contact-interested-in")
      ?.focus({ preventScroll: true });
  });
};
