import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { SectionContainer } from "../../ui/Section";

const words = "Pareto is building the infrastructure to bring that credit onchain, connecting origination, servicing and distribution in one facility.".split(" ");

const ThesisIntro = () => {
  const copyRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: ["start 0.88", "center 0.48"],
  });
  const [visibleWords, setVisibleWords] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (Number.isFinite(progress)) setVisibleWords(Math.round(progress * words.length));
  });

  return (
    <div id="thesis-intro" className="thesis-chapter thesis-intro">
      <SectionContainer size="5xl" className="thesis-intro__content">
        <p id="thesis-intro-copy" ref={copyRef} tabIndex={-1}>
          {words.map((word, index) => (
            <span key={index} data-highlighted={index < visibleWords || undefined}>
              {word}{index < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </SectionContainer>
    </div>
  );
};

export default ThesisIntro;
