import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import type { EcosystemRole } from "../../../data/ecosystem";
import { setPendingContactInterest } from "../../../lib/siteNavigation";
import { PageLink } from "../../ui/PageLink";
import EcosystemRoleDiagram from "./EcosystemRoleDiagram";

interface EcosystemRoleCardProps {
  role: EcosystemRole;
  index: number;
  /** h2 on the Ecosystem overview; h3 when the card sits inside another section. */
  headingLevel?: "h2" | "h3";
  /** Hide the link to the persona page when the card is already on it. */
  showPageLink?: boolean;
}

const EcosystemRoleCard = ({ role, index, headingLevel = "h2", showPageLink = true }: EcosystemRoleCardProps) => {
  const Heading = headingLevel;
  return (
    <article className={`eco-role-card eco-role-card--${role.tone}`} aria-labelledby={`eco-role-${role.id}`}>
      <div className="eco-role-card__heading">
        <span className="eco-role-card__number" aria-hidden="true">0{index + 1}</span>
        <Heading id={`eco-role-${role.id}`} className="eco-role-card__title">{role.title}</Heading>
        <p className="eco-role-card__who">{role.who}</p>
      </div>
      <p className="eco-role-card__copy">{role.copy}</p>
      <EcosystemRoleDiagram role={role.id} />
      <ul className="eco-role-card__features">
        {role.gets.map((item) => (
          <li key={item}><Check size={13} aria-hidden="true" /><span>{item}</span></li>
        ))}
      </ul>
      <div className="eco-role-card__actions">
        <PageLink
          to="/"
          hash="contact"
          onClick={() => setPendingContactInterest(role.interest)}
          className="eco-role-card__cta"
        >
          {role.cta}<ArrowUpRight size={16} aria-hidden="true" />
        </PageLink>
        {showPageLink && role.page ? (
          <PageLink to={role.page.path} hash="hero" className="eco-role-card__page-link">
            {role.page.label}<ArrowRight size={14} aria-hidden="true" />
          </PageLink>
        ) : null}
      </div>
    </article>
  );
};

export default EcosystemRoleCard;
