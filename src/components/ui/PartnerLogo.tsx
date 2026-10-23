import type { Partner } from "../../data/partners";
import "./partner-logo.css";

interface PartnerLogoProps {
  partner: Partner;
  tone: "light" | "dark";
  presentation: "grid" | "marquee";
  duplicate?: boolean;
}

const PartnerLogo = ({ partner, tone, presentation, duplicate = false }: PartnerLogoProps) => (
  <a
    href={partner.link}
    target="_blank"
    rel="noopener noreferrer"
    tabIndex={duplicate ? -1 : undefined}
    aria-label={`Visit ${partner.name}`}
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
        transform: `translateY(${presentation === "marquee" ? partner.verticalOffset ?? 0 : 0}px) scale(${partner.visualScale * (presentation === "grid" ? 0.82 : 1)})`,
      }}
    />
  </a>
);

export default PartnerLogo;
