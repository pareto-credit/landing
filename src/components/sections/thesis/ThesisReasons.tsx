import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { thesisReasons } from "../../../data/thesis";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import FeatureCard from "../../ui/FeatureCard";
import ThesisDiagram from "./ThesisDiagram";

const ThesisReasons = () => {
  const ref = useRef<HTMLOListElement | null>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();

  return (
    <ol ref={ref} role="list" className="feature-card-grid thesis-reasons" data-animate={inView && pageVisible && !reducedMotion || undefined}>
      {thesisReasons.map((reason, index) => (
        <li key={reason.title}>
          <FeatureCard
            id={`thesis-reason-${reason.diagram}`}
            className="thesis-reason"
            index={String(index + 1).padStart(2, "0")}
            label={reason.label}
            title={reason.title}
            description={reason.copy}
          >
            <ThesisDiagram kind={reason.diagram} />
          </FeatureCard>
        </li>
      ))}
    </ol>
  );
};

export default ThesisReasons;
