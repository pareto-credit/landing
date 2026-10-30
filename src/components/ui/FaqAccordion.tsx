import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./faq-accordion.css";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const groupName = useId();
  const reduced = useReducedMotion();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="faq-accordion">
      {items.map(({ question, answer }, index) => {
        const open = openQuestion === question;
        const triggerId = `${groupName}-question-${index}`;
        const answerId = `${groupName}-answer-${index}`;
        return (
          <div key={question} className="faq-accordion__item">
            <h3>
              <button
                id={triggerId}
                type="button"
                className="faq-accordion__trigger"
                aria-expanded={open}
                aria-controls={answerId}
                onClick={() => setOpenQuestion((current) => current === question ? null : question)}
              >
                {question}
                <span aria-hidden="true">+</span>
              </button>
            </h3>
            <motion.div
              id={answerId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              inert={!open}
              className="faq-accordion__content"
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{
                height: { duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: reduced ? 0 : 0.18 },
              }}
            >
              <p className="faq-accordion__answer">{answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
