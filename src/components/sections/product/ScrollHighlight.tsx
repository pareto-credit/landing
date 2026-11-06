import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "framer-motion";

function HighlightWord({
  word,
  index,
  count,
  progress,
}: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / count, (index + 1) / count],
    [0.25, 1]
  );
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

/** Scroll-linked emphasis without per-frame React renders; one accessible text copy. */
export default function ScrollHighlight({
  text,
  className = "",
  as: Tag = "p",
  id,
  offset = ["start 0.9", "end 0.5"],
}: {
  text: string;
  className?: string;
  as?: "p" | "h2";
  id?: string;
  offset?: UseScrollOptions["offset"];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  const words = text.split(/\s+/);
  return (
    <Tag ref={ref} id={id} className={`product-scroll-highlight ${className}`}>
      {reduced ? (
        text
      ) : (
        <>
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((word, index) => (
              <HighlightWord
                key={`${index}-${word}`}
                word={word}
                index={index}
                count={words.length}
                progress={scrollYProgress}
              />
            ))}
          </span>
        </>
      )}
    </Tag>
  );
}
