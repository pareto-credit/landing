import ThesisDiagram, { type ThesisDiagramKind } from "./ThesisDiagram";

const stages: Array<{ id: string; label: string; diagram: ThesisDiagramKind }> = [
  { id: "fragmented", label: "Fragmented workflows", diagram: "records" },
  { id: "underwriting", label: "Accountable underwriting", diagram: "signature" },
  { id: "markets", label: "Connected markets", diagram: "network" },
];

const ThesisPathGraphic = () => (
  <figure className="thesis-path" aria-label="The path from fragmented workflows to connected credit markets">
    {[0, 1].map((index) => (
      <div key={index} className={`thesis-path__connection thesis-path__connection--${index + 1}`} aria-hidden="true">
        <svg viewBox="0 0 200 4" preserveAspectRatio="none" fill="none">
          <path d="M0 2H200" stroke="currentColor" strokeOpacity=".25" vectorEffect="non-scaling-stroke" />
          <path className="thesis-path__signal" d="M0 2H200" stroke="currentColor" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    ))}
    <ol className="thesis-path__stages">
      {stages.map(({ id, label, diagram }) => (
        <li key={id}>
          <div className="thesis-path__art"><ThesisDiagram kind={diagram} /></div>
          <span>{label}</span>
        </li>
      ))}
    </ol>
  </figure>
);

export default ThesisPathGraphic;
