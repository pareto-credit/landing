import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { SectionContainer } from "../../ui/Section";

const sentences = [
  "Asset-backed finance turns the cash flows from existing assets into capital businesses can use today.",
  "Pareto is building the infrastructure to bring that credit onchain, connecting origination, servicing and distribution in one facility.",
];
const [firstSentence, secondSentence] = sentences.map(sentence => sentence.split(" "));
const wordCount = firstSentence.length + secondSentence.length;

const ThesisIntro = () => {
  const copyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: copyRef,
    offset: ["start 0.88", "center 0.48"],
  });
  const [visibleWords, setVisibleWords] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (Number.isFinite(progress)) setVisibleWords(Math.round(progress * wordCount));
  });

  return (
    <div id="thesis-intro" className="thesis-chapter thesis-intro">
      <SectionContainer size="5xl" className="thesis-intro__content">
        <div id="thesis-intro-copy" ref={copyRef} tabIndex={-1}>
          {[firstSentence, secondSentence].map((words, sentenceIndex) => (
            <p key={sentences[sentenceIndex]}>
              {words.map((word, index) => (
                <span key={index} data-highlighted={index + sentenceIndex * firstSentence.length < visibleWords || undefined}>
                  {word}{index < words.length - 1 ? " " : ""}
                </span>
              ))}
            </p>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};

export default ThesisIntro;
