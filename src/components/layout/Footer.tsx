import {
  ArrowRight,
  Linkedin,
  type LucideIcon,
  MessagesSquare,
  NotebookPen,
  Send,
  Twitter,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import paretoLogo from "../../assets/svgs/pareto-logo-light.svg";
import paretoSignature from "../../assets/svgs/pareto-signature.svg";
import { SectionContainer } from "../ui/Section";

interface FooterLink {
  label: string;
  href?: string;
  to?: string;
  external?: boolean;
}

interface FooterSocialLink extends FooterLink {
  icon: LucideIcon;
}

const platformLinks: FooterLink[] = [
  { label: "Web App", href: "https://app.pareto.credit", external: true },
  { label: "Manager App", href: "https://manager.pareto.credit", external: true },
  {
    label: "Smart Contracts",
    href: "https://docs.pareto.credit/developers/addresses/product/credit-vaults",
    external: true,
  },
];

const ecosystemLinks: FooterLink[] = [
  { label: "Documentation", href: "https://docs.pareto.credit/", external: true },
  { label: "Governance", href: "https://gov.pareto.credit/", external: true },
  { label: "Github", href: "https://github.com/pareto-credit/", external: true },
];

const companyLinks: FooterLink[] = [
  {
    label: "Security Audits",
    href: "https://docs.pareto.credit/developers/security/audits",
    external: true,
  },
  {
    label: "Media Kit",
    href: "https://docs.pareto.credit/resources/media-kit",
    external: true,
  },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
];

const socialLinks: FooterSocialLink[] = [
  { label: "X", href: "https://x.com/paretocredit", icon: Twitter },
  {
    label: "Discord",
    href: "https://discord.com/invite/mpySAJp",
    icon: MessagesSquare,
  },
  { label: "Telegram", href: "https://t.me/paretocredit", icon: Send },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/paretocredit/",
    icon: Linkedin,
  },
  {
    label: "Paragraph",
    href: "https://paragraph.com/refresh?redirect=%2F%40pareto",
    icon: NotebookPen,
  },
];

const footerLinkClassName =
  "group flex items-center text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-inverse)]";

const footerLinkLabelClassName =
  "transition-transform duration-300 group-hover:translate-x-1";

const renderFooterLink = (link: FooterLink) => {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="w-0 overflow-hidden text-[var(--color-brand-alt)] opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100"
      >
        ›
      </span>
      <span className={footerLinkLabelClassName}>{link.label}</span>
    </>
  );

  if (link.external && link.href) {
    return (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={footerLinkClassName}
      >
        {content}
      </a>
    );
  }

  if (link.to) {
    return (
      <Link key={link.label} to={link.to} className={footerLinkClassName}>
        {content}
      </Link>
    );
  }

  return null;
};

const Footer = () => {
  return (
    <footer className="relative flex flex-col justify-between overflow-hidden border-t border-[var(--color-border-inverse-subtle)] bg-[var(--color-bg-page-alt)] pb-8 pt-32">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-brand-alt)] to-transparent shadow-[0_0_52px_var(--color-brand-alt)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[8px] w-full max-w-5xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[color:rgb(112_177_158_/_0.50)] to-transparent blur-[6px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[14px] w-full max-w-6xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[color:rgb(141_248_224_/_0.28)] to-transparent blur-[16px]" />
      <div className="pointer-events-none absolute -bottom-[200px] left-1/2 h-[420px] w-[82vw] -translate-x-1/2 rounded-[100%] bg-[color:rgb(112_177_158_/_0.22)] blur-[130px]" />

      <SectionContainer className="relative z-10 flex-1">
        <div className="mb-20 grid gap-16 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <div className="mb-8 flex items-center">
                <img
                  src={paretoLogo}
                  alt="Pareto logo"
                  className="h-10 w-auto"
                />
              </div>
              <p className="max-w-sm text-lg leading-relaxed text-[var(--color-text-muted)]">
                Programmable institutional credit built for the way capital
                flows today.
              </p>
            </div>
            <div className="mt-12 hidden lg:block">
              <a
                href="mailto:info@pareto.credit"
                className="inline-flex items-center gap-2 border-b border-[color:rgb(112_177_158_/_0.30)] pb-1 font-mono text-sm text-[var(--color-brand-alt)] transition-colors hover:border-[var(--color-text-inverse)] hover:text-[var(--color-text-inverse)]"
              >
                info@pareto.credit <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
              <div className="space-y-6">
                <h4 className="mb-6 border-b border-[var(--color-border-inverse-soft)] pb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-inverse)]">
                  Platform
                </h4>
                {platformLinks.map(renderFooterLink)}
              </div>

              <div className="space-y-6">
                <h4 className="mb-6 border-b border-[var(--color-border-inverse-soft)] pb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-inverse)]">
                  Ecosystem
                </h4>
                {ecosystemLinks.map(renderFooterLink)}
              </div>

              <div
                data-testid="footer-company-links"
                className="col-span-2 space-y-6 md:col-span-1"
              >
                <h4 className="mb-6 border-b border-[var(--color-border-inverse-soft)] pb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-inverse)]">
                  Company
                </h4>
                {companyLinks.map(renderFooterLink)}
              </div>
            </div>

            <div className="mt-12 lg:hidden">
              <a
                href="mailto:info@pareto.credit"
                className="inline-flex items-center gap-2 border-b border-[color:rgb(112_177_158_/_0.30)] pb-1 font-mono text-sm text-[var(--color-brand-alt)] transition-colors hover:border-[var(--color-text-inverse)] hover:text-[var(--color-text-inverse)]"
              >
                info@pareto.credit <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </SectionContainer>

      <div className="relative z-0 mt-auto -mb-20 flex w-full select-none items-end justify-center overflow-hidden pointer-events-none">
        <img
          src={paretoSignature}
          alt=""
          aria-hidden
          className="h-auto w-[min(92vw,1250px)] mix-blend-screen"
          style={{
            opacity: 0.18,
            filter:
              "brightness(0.9) drop-shadow(0 0 16px rgba(112, 177, 158, 0.07))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.28) 58%, rgba(0, 0, 0, 0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.28) 58%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
      </div>

      <SectionContainer className="relative z-10 border-t border-[var(--color-border-inverse-subtle)] pt-6 font-mono text-xs text-[var(--color-text-muted-soft)]">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center gap-3 text-center md:text-left">
            <p className="leading-none">
              ©2026 Pareto Credit. All rights reserved.
            </p>
          </div>
          <div className="flex w-full items-center justify-center md:w-auto md:justify-end">
            <div
              data-testid="footer-social-links"
              className="flex flex-wrap items-center justify-center gap-2 md:justify-end"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-03)] text-[var(--color-text-muted-soft)] transition-colors hover:border-[color:rgb(112_177_158_/_0.35)] hover:text-[var(--color-text-inverse)]"
                  >
                    <Icon
                      className="h-4 w-4"
                      aria-hidden="true"
                      strokeWidth={1.9}
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
