import { useEffect, useState } from "react";

export const useMinWidth = (minWidth: number): boolean => {
  const readMatches = () =>
    typeof window !== "undefined" && window.innerWidth >= minWidth;

  const [matches, setMatches] = useState(readMatches);

  useEffect(() => {
    const updateMatches = () => {
      setMatches(readMatches());
    };

    updateMatches();
    window.addEventListener("resize", updateMatches);

    return () => window.removeEventListener("resize", updateMatches);
  }, [minWidth]);

  return matches;
};
