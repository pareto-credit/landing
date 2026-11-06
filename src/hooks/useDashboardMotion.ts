import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { usePageVisibility } from "./usePageVisibility";

/** Keep final content readable; only decorative motion depends on visibility. */
export function useDashboardMotion<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);
  const reduced = useReducedMotion();
  const pageVisible = usePageVisibility();

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setEntered(true);
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    "data-entered": entered || Boolean(reduced),
    "data-running": inView && pageVisible && !reduced,
    "data-reduced": Boolean(reduced),
  };
}
