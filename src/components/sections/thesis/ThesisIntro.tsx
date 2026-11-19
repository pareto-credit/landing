import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";
import bridge from "../../../assets/images/thesis/thesis-bridge-1536.jpg";
import bridgeSmall from "../../../assets/images/thesis/thesis-bridge-900.jpg";

/** The statement reads as two phrases of equal weight; each ends on an accented pair of words. */
let wordCount = 0;
const phrases = [
  "Pareto is building the infrastructure to bring that credit onchain,",
  "connecting origination, servicing and distribution in one facility.",
].map((phrase) => {
  const words = phrase.split(" ");
  const start = wordCount;
  wordCount += words.length;
  return { words, start };
});

const ACCENT_WORDS = 2;

/**
 * Three overlapping windows onto one photograph, as fractions of its settled frame.
 * `zoom` lifts the nearer panels off the picture and `layer` stacks them.
 */
const PANELS = [
  { x: 0, y: 0.17, w: 0.46, h: 0.75, zoom: 1, layer: 1 },
  { x: 0.35, y: 0.36, w: 0.35, h: 0.64, zoom: 1.12, layer: 3 },
  { x: 0.61, y: 0, w: 0.39, h: 0.6, zoom: 1.05, layer: 2 },
];

/** Returns how far `progress` has travelled through the `from`–`to` slice, as 0–1. */
const slice = (progress: number, from: number, to: number) =>
  Math.min(1, Math.max(0, (progress - from) / (to - from)));

/** Eases a 0–1 value so the panels leave and arrive gently. */
const easeInOut = (value: number) =>
  value < 0.5 ? 4 * value ** 3 : 1 - (-2 * value + 2) ** 3 / 2;

/**
 * Pinned statement: the photograph fills the screen, then splits into three
 * overlapping panels while the sentence lights up word by word. With reduced
 * motion the settled composition is shown without pinning.
 */
const ThesisIntro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [litWords, setLitWords] = useState(wordCount);
  const visibleWords = reducedMotion ? wordCount : litWords;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage || reducedMotion) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, height } = section.getBoundingClientRect();
      const distance = height - window.innerHeight;
      const progress = distance > 0 ? slice(-top, 0, distance) : 1;
      stage.style.setProperty("--settle", easeInOut(slice(progress, 0.06, 0.6)).toFixed(4));
      stage.style.setProperty("--copy", slice(progress, 0.36, 0.54).toFixed(4));
      setLitWords(Math.round(slice(progress, 0.46, 0.9) * wordCount));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      stage.style.removeProperty("--settle");
      stage.style.removeProperty("--copy");
    };
  }, [reducedMotion]);

  return (
    <div id="thesis-intro" ref={sectionRef} className="thesis-chapter thesis-intro">
      <div ref={stageRef} className="thesis-intro__stage">
        <div className="thesis-intro__panels" aria-hidden="true">
          {PANELS.map(({ x, y, w, h, zoom, layer }, column) => (
            <span
              key={layer}
              className="thesis-intro__panel"
              style={{ "--column": column, "--x": x, "--y": y, "--w": w, "--h": h, "--zoom": zoom, zIndex: layer } as CSSProperties}
            >
              <img
                src={bridge}
                srcSet={`${bridgeSmall} 900w, ${bridge} 1536w`}
                sizes="100vw"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </span>
          ))}
        </div>
        <div className="thesis-intro__content">
          <p id="thesis-intro-copy" tabIndex={-1}>
            {phrases.map(({ words, start }) => (
              <span key={start} className="thesis-intro__phrase">
                {words.map((word, index) => (
                  <span
                    key={index}
                    data-word=""
                    data-accent={index >= words.length - ACCENT_WORDS || undefined}
                    data-highlighted={start + index < visibleWords || undefined}
                  >
                    {word}{start + index < wordCount - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThesisIntro;
