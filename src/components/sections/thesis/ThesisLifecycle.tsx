import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { thesisStages } from "../../../data/thesis";
import ThesisDiagram, { type ThesisDiagramKind } from "./ThesisDiagram";

const diagrams: ThesisDiagramKind[] = ["records", "terms", "vault", "servicing", "network"];

const ThesisLifecycle = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % thesisStages.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + thesisStages.length) % thesisStages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = thesisStages.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div className="thesis-lifecycle">
      <div role="tablist" aria-label="Facility lifecycle" className="thesis-lifecycle__tabs">
        {thesisStages.map((item, index) => (
          <button
            key={item.title}
            ref={(node) => { tabs.current[index] = node; }}
            type="button"
            role="tab"
            id={`lifecycle-tab-${index}`}
            aria-controls={`lifecycle-panel-${index}`}
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{item.title}
          </button>
        ))}
      </div>
      {thesisStages.map((item, index) => (
        <div
          key={item.title}
          role="tabpanel"
          id={`lifecycle-panel-${index}`}
          aria-labelledby={`lifecycle-tab-${index}`}
          hidden={active !== index}
          tabIndex={0}
          className="thesis-lifecycle__panel"
        >
          {active === index ? <>
            <div className="thesis-lifecycle__visual"><ThesisDiagram kind={diagrams[active]} /></div>
            <div className="thesis-lifecycle__copy">
              <span className="thesis-kicker">The facility lifecycle</span>
              <h3>{item.title}</h3>
              <p className="thesis-lifecycle__lead">{item.copy}</p>
              <p>{item.detail}</p>
              {active < thesisStages.length - 1 ? (
                <button className="thesis-text-link" type="button" onClick={() => { setActive(active + 1); tabs.current[active + 1]?.focus({ preventScroll: true }); }}>
                  Next: {thesisStages[active + 1].title}<ArrowRight size={16} aria-hidden="true" />
                </button>
              ) : <span className="thesis-lifecycle__end">One facility, from origination to distribution.</span>}
            </div>
          </> : null}
        </div>
      ))}
    </div>
  );
};

export default ThesisLifecycle;
