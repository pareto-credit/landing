import type { Partner } from "../../data/partners";
import "./partner-logo.css";

interface PartnerLogoProps {
  partner: Partner;
  tone: "light" | "dark";
  presentation: "grid" | "marquee";
  duplicate?: boolean;
  linked?: boolean;
}

const PartnerLogo = ({
  partner,
  tone,
  presentation,
  duplicate = false,
  linked = true,
}: PartnerLogoProps) => {
  const Element = linked ? "a" : "span";
  return (
    <Element
      href={linked ? partner.link : undefined}
      target={linked ? "_blank" : undefined}
      rel={linked ? "noopener noreferrer" : undefined}
      tabIndex={duplicate ? -1 : undefined}
      aria-label={linked ? `Visit ${partner.name}` : undefined}
      className={`partner-logo partner-logo--${presentation}`}
      data-tone={tone}
      data-color-surface={partner.colorSurface ?? "dark"}
    >
      <img
        src={partner.src}
        alt={partner.name}
        loading="lazy"
        decoding="async"
        style={{
          transform: `translateY(${
            presentation === "marquee" ? partner.verticalOffset ?? 0 : 0
          }px) scale(${
            partner.visualScale * (presentation === "grid" ? 0.82 : 1)
          })`,
        }}
      />
    </Element>
  );
};

export default PartnerLogo;
