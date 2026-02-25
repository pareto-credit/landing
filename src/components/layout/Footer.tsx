import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import paretoLogo from "../../assets/svgs/pareto-logo.svg";
import paretoSignature from "../../assets/svgs/pareto-signature.svg";
import { SectionContainer } from "../ui/Section";

const platformLinks = [
  "Live Vaults",
  "Risk Framework",
  "Compliance",
  "Smart Contracts",
];
const ecosystemLinks = [
  "Pareto Studio",
  "White Label",
  "API Documentation",
  "Partners",
];
const companyLinks = ["Insights", "Security Audits", "Careers", "Media Kit"];

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
                href="mailto:access@pareto.credit"
                className="inline-flex items-center gap-2 border-b border-[color:rgb(112_177_158_/_0.30)] pb-1 font-mono text-sm text-[var(--color-brand-alt)] transition-colors hover:border-[var(--color-text-inverse)] hover:text-[var(--color-text-inverse)]"
              >
                access@pareto.credit <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-12">
              <div className="space-y-6">
                <h4 className="mb-6 border-b border-[var(--color-border-inverse-soft)] pb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-inverse)]">
                  Platform
                </h4>
                {platformLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="group flex items-center text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-inverse)]"
                  >
                    <span className="w-0 overflow-hidden text-[var(--color-brand-alt)] opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100">
                      ›
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                ))}
              </div>

              <div className="space-y-6">
                <h4 className="mb-6 border-b border-[var(--color-border-inverse-soft)] pb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-inverse)]">
                  Ecosystem
                </h4>
                {ecosystemLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="group flex items-center text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-inverse)]"
                  >
                    <span className="w-0 overflow-hidden text-[var(--color-brand-alt)] opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100">
                      ›
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                ))}
              </div>

              <div className="col-span-2 space-y-6 md:col-span-1">
                <h4 className="mb-6 border-b border-[var(--color-border-inverse-soft)] pb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-text-inverse)]">
                  Company
                </h4>
                {companyLinks.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="group flex items-center text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-inverse)]"
                  >
                    <span className="w-0 overflow-hidden text-[var(--color-brand-alt)] opacity-0 transition-all duration-300 ease-out group-hover:w-4 group-hover:opacity-100">
                      ›
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 lg:hidden">
              <a
                href="mailto:access@pareto.credit"
                className="inline-flex items-center gap-2 border-b border-[color:rgb(112_177_158_/_0.30)] pb-1 font-mono text-sm text-[var(--color-brand-alt)] transition-colors hover:border-[var(--color-text-inverse)] hover:text-[var(--color-text-inverse)]"
              >
                access@pareto.credit <ArrowRight size={14} />
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

      <SectionContainer className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border-inverse-subtle)] pt-6 font-mono text-xs text-[var(--color-text-muted-soft)] md:flex-row">
        <p>©2026 Pareto Credit. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="transition-colors hover:text-[var(--color-text-inverse)]">
            Twitter
          </a>
          <a href="#" className="transition-colors hover:text-[var(--color-text-inverse)]">
            LinkedIn
          </a>
          <Link to="/privacy-policy" className="transition-colors hover:text-[var(--color-text-inverse)]">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="transition-colors hover:text-[var(--color-text-inverse)]">
            Terms of Service
          </Link>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
