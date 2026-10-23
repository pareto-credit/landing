import { ArrowUpRight, Check } from "lucide-react";
import type { EcosystemRole } from "../../../data/ecosystem";
import { setPendingContactInterest } from "../../../lib/siteNavigation";
import { PageLink } from "../../ui/PageLink";
import EcosystemRoleDiagram from "./EcosystemRoleDiagram";

const EcosystemRoleCard = ({ role, index }: { role: EcosystemRole; index: number }) => (
  <article className={`eco-role-card eco-role-card--${role.tone}`} aria-labelledby={`eco-role-${role.id}`}>
    <div className="eco-role-card__heading">
      <span className="eco-role-card__number" aria-hidden="true">0{index + 1}</span>
      <h2 id={`eco-role-${role.id}`}>{role.title}</h2>
      <p className="eco-role-card__who">{role.who}</p>
    </div>
    <p className="eco-role-card__copy">{role.copy}</p>
    <EcosystemRoleDiagram role={role.id} />
    <ul className="eco-role-card__features">
      {role.gets.map((item) => (
        <li key={item}><Check size={13} aria-hidden="true" /><span>{item}</span></li>
      ))}
    </ul>
    <PageLink
      to="/"
      hash="contact"
      onClick={() => setPendingContactInterest(role.interest)}
      className="eco-role-card__cta"
    >
      {role.cta}<ArrowUpRight size={16} aria-hidden="true" />
    </PageLink>
  </article>
);

export default EcosystemRoleCard;
