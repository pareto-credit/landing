import { ArrowUpRight } from "lucide-react";
import type { Plan } from "../../../data/plans";
import { requestContact } from "../../../lib/siteNavigation";

const OfferingCta = ({ plan, onActivate }: { plan: Plan; onActivate?: () => void }) => (
  <button
    type="button"
    className="offering-cta"
    onPointerMove={(event) => {
      if (event.pointerType === "touch") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--button-x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--button-y", `${event.clientY - bounds.top}px`);
    }}
    onClick={() => { onActivate?.(); requestContact(plan.contactInterest); }}
  >
    {plan.cta}<ArrowUpRight size={17} aria-hidden="true" />
  </button>
);

export default OfferingCta;
