import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { thesisReasons } from "../../../data/thesis";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import ThesisDiagram from "./ThesisDiagram";

const ThesisReasons = () => {
  const ref = useRef<HTMLOListElement | null>(null);
  const inView = useInView(ref, { amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const pageVisible = usePageVisibility();

  return (
    <ol ref={ref} className="thesis-reasons" data-animate={inView && pageVisible && !reducedMotion || undefined}>
      {thesisReasons.map((reason) => (
        <li key={reason.title} className={`thesis-reason thesis-reason--${reason.title.toLowerCase()}`}>
          <div className="thesis-reason__visual"><ThesisDiagram kind={reason.diagram} /></div>
          <h3>{reason.title}</h3>
          <p>{reason.copy}</p>
        </li>
      ))}
    </ol>
  );
};

export default ThesisReasons;
