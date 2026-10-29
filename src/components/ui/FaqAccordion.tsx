import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  const groupName = useId();
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div>
      {items.map(({ question, answer }) => (
        <details key={question} name={groupName} open={openQuestion === question}>
          <summary
            onClick={(event) => {
              event.preventDefault();
              setOpenQuestion((current) => current === question ? null : question);
            }}
          >
            {question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
