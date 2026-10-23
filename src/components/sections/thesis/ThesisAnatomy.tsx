import { ArrowRight } from "lucide-react";
import { thesisAnatomy, thesisMapping } from "../../../data/thesis";
import ThesisDiagram from "./ThesisDiagram";

type AnatomyNode = keyof Omit<typeof thesisAnatomy, "flows">;

const Node = ({ id }: { id: Exclude<AnatomyNode, "vault"> }) => (
  <div className={`thesis-anatomy__node thesis-anatomy__node--${id}`}>
    <strong>{thesisAnatomy[id].title}</strong>
    <span>{thesisAnatomy[id].copy}</span>
  </div>
);

const Flow = ({ id, direction }: { id: keyof typeof thesisAnatomy.flows; direction: "horizontal" | "vertical" }) => (
  <div className={`thesis-anatomy__flow thesis-anatomy__flow--${direction} thesis-anatomy__flow--${id}`} aria-hidden="true">
    <span className="thesis-anatomy__line"><span className="thesis-anatomy__pulse" /></span>
    <span className="thesis-anatomy__flow-label">{thesisAnatomy.flows[id]}</span>
  </div>
);

/** One facility on Pareto: the parties around a Credit Vault. */
export const ThesisAnatomy = () => (
  <figure className="thesis-anatomy">
    <div className="thesis-anatomy__grid">
      <Node id="curator" />
      <Flow id="curator" direction="vertical" />
      <Node id="borrower" />
      <Flow id="borrower" direction="horizontal" />
      <div className="thesis-anatomy__vault">
        <span className="thesis-kicker">One facility</span>
        <ThesisDiagram kind="vault" />
        <strong>{thesisAnatomy.vault.title}</strong>
        <span>{thesisAnatomy.vault.copy}</span>
      </div>
      <Flow id="lenders" direction="horizontal" />
      <Node id="lenders" />
      <Flow id="distribution" direction="vertical" />
      <Node id="distribution" />
    </div>
    <figcaption className="sr-only">
      A curator approves and oversees the facility. The borrower draws and repays through a dedicated Credit Vault
      governed by the loan agreement. KYC&apos;d lenders deposit into the vault and earn interest, and positions can
      extend to DeFi venues such as Morpho and Pendle.
    </figcaption>
  </figure>
);

/** What each part of a traditional facility becomes on Pareto. */
export const ThesisMapping = () => (
  <div className="thesis-mapping">
    <div className="thesis-mapping__header" aria-hidden="true">
      <span>In a traditional facility</span>
      <span />
      <span>On Pareto</span>
    </div>
    <ol>
      {thesisMapping.map((row) => (
        <li key={row.pareto}>
          <span className="thesis-mapping__from">{row.traditional}<span className="sr-only"> becomes</span></span>
          <ArrowRight size={16} aria-hidden="true" className="thesis-mapping__arrow" />
          <h3 className="thesis-mapping__to">{row.pareto}</h3>
          <p>{row.copy}</p>
        </li>
      ))}
    </ol>
  </div>
);
