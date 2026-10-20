import { ArrowRight, Banknote, Building, Landmark, Network } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import EcosystemSection from "../components/sections/EcosystemSection";
import ProductsSection from "../components/sections/ProductsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import { PageLink } from "../components/ui/PageLink";
import { SectionContainer } from "../components/ui/Section";
import { PARETO_BLOG_URL, type ContactInterest } from "../data/brand";
import { partners, type PartnerGroup } from "../data/partners";
import { useProductsData } from "../hooks/useProductsData";
import { setPendingContactInterest } from "../lib/siteNavigation";

interface Role {
  icon: LucideIcon;
  title: string;
  who: string;
  copy: string;
  gets: string[];
  cta: string;
  interest: ContactInterest;
}

const roles: Role[] = [
  {
    icon: Building,
    title: "Borrowers",
    who: "Trading firms, credit funds, fintech lenders",
    copy: "Raise a facility from institutional and DeFi lenders, with terms enforced onchain instead of reconciled by hand.",
    gets: ["Term or revolving facilities", "Draws and repayments in Studio", "Access to a wider lender base"],
    cta: "Raise a facility",
    interest: "Borrowing",
  },
  {
    icon: Landmark,
    title: "Underwriters & curators",
    who: "Credit specialists and asset managers",
    copy: "Diligence borrowers, set terms and oversee facilities with Studio and your own agents. Or let NorthBridge curate for you.",
    gets: ["Curator desk in Studio", "Pareto MCP for your agents", "Earn fees on the facilities you run"],
    cta: "Curate on Pareto",
    interest: "Underwriting",
  },
  {
    icon: Banknote,
    title: "Lenders",
    who: "Funds, treasuries, DeFi allocators",
    copy: "Allocate to permissioned credit with a named curator, live positions and reporting you can verify onchain.",
    gets: ["KYC'd, permissioned access", "Real-time positions", "Cycle-based liquidity"],
    cta: "Start lending",
    interest: "Lending",
  },
  {
    icon: Network,
    title: "Distribution partners",
    who: "DeFi protocols, vault curators, platforms",
    copy: "Bring facility positions into lending markets and yield products, or embed Pareto credit under your own brand.",
    gets: ["Morpho and Pendle integrations", "Leverage and exit liquidity", "White-label lender app"],
    cta: "Integrate",
    interest: "Integration",
  },
];

const partnerGroups: Array<{ id: PartnerGroup; title: string; copy: string }> = [
  {
    id: "credit",
    title: "Credit partners",
    copy: "Borrowers, underwriters and curators running facilities on Pareto.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure & distribution",
    copy: "Compliance, oracle and DeFi partners the facilities plug into.",
  },
];

const EcosystemPage = () => {
  const { vaults, isLoading } = useProductsData();

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main>
        <section
          id="hero"
          className="relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-[720px] rounded-full bg-[color:rgb(114_244_201_/_0.12)] blur-[140px]" />
          <SectionContainer className="relative z-10 pb-14 pt-36 md:pb-16 md:pt-44">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-brand-alt)]">Ecosystem</div>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-tight text-[var(--color-brand-dark)]">
              Who builds on Pareto.
              <span className="block text-[var(--color-text-muted)]">One credit stack, four roles.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)]">
              Credit funds, trading firms and fintech lenders raise facilities
              on Pareto. Underwriters structure and oversee them. Institutional
              and DeFi lenders fund them, and partners carry them further.
            </p>
          </SectionContainer>

          <SectionContainer className="relative z-10 pb-20 md:pb-24">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {roles.map((role) => (
                <article
                  key={role.title}
                  className="flex flex-col rounded-md border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-brand-deep)] text-[var(--color-text-inverse)]">
                    <role.icon size={18} />
                  </span>
                  <h2 className="mt-5 text-xl font-bold tracking-tight text-[var(--color-brand-dark)]">{role.title}</h2>
                  <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-brand-alt)]">
                    {role.who}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{role.copy}</p>
                  <ul className="mt-5 flex-1 space-y-2 border-t border-[var(--color-border-soft)] pt-4">
                    {role.gets.map((item) => (
                      <li key={item} className="text-sm text-[var(--color-text-secondary)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <PageLink
                    to="/"
                    hash="contact"
                    onClick={() => setPendingContactInterest(role.interest)}
                    className="group mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-deep)]"
                  >
                    {role.cta}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </PageLink>
                </article>
              ))}
            </div>
          </SectionContainer>
        </section>

        <section id="partners" className="relative overflow-hidden bg-[var(--color-brand-mid)]">
          <SectionContainer className="py-16 md:py-20">
            <div className="grid gap-12 lg:grid-cols-2">
              {partnerGroups.map((group) => (
                <div key={group.id}>
                  <div className="border-b border-[var(--color-border-inverse-soft)] pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
                    <p className="mt-1 text-sm text-[color:rgb(255_255_255_/_0.55)]">{group.copy}</p>
                  </div>
                  <ul className="grid grid-cols-2 sm:grid-cols-3">
                    {partners
                      .filter((partner) => partner.group === group.id)
                      .map((partner) => (
                        <li key={partner.name} className="border-b border-[var(--color-border-inverse-subtle)]">
                          <a
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${partner.name}`}
                            className="group/logo flex h-24 items-center justify-center px-4 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                          >
                            <img
                              src={partner.src}
                              alt={partner.name}
                              style={{ transform: `scale(${partner.visualScale * 0.82})` }}
                              className={`h-10 w-full object-contain ${partner.imageClassName ?? ""} ${partner.hoverImageClassName ?? ""}`}
                            />
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
            <a
              href={PARETO_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-brand-alt)]"
            >
              Read partner case studies on our blog
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </SectionContainer>
        </section>

        <EcosystemSection />
        <ProductsSection vaults={vaults} isVaultsLoading={isLoading} />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default EcosystemPage;
