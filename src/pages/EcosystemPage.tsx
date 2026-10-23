import { ArrowRight } from "lucide-react";
import PartnerLogo from "../components/ui/PartnerLogo";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import EcosystemSection from "../components/sections/EcosystemSection";
import ProductsSection from "../components/sections/ProductsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import { SectionContainer } from "../components/ui/Section";
import { PARETO_BLOG_URL } from "../data/brand";
import { partners, type PartnerGroup } from "../data/partners";
import { useProductsData } from "../hooks/useProductsData";
import { ecosystemRoles } from "../data/ecosystem";
import EcosystemRoleCard from "../components/sections/ecosystem/EcosystemRoleCard";
import "../components/sections/ecosystem/ecosystem.css";

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
          <SectionContainer className="eco-intro">
            <div className="eco-intro__eyebrow">Ecosystem</div>
            <div className="eco-intro__heading">
              <h1>
                Who builds on Pareto.
                <span>One credit stack, four roles.</span>
              </h1>
              <p>
                Credit funds, trading firms and fintech lenders raise facilities
                on Pareto. Underwriters structure and oversee them. Institutional
                and DeFi lenders fund them, and partners carry them further.
              </p>
            </div>
          </SectionContainer>

          <SectionContainer className="eco-roles-shell">
            <div className="eco-roles" aria-label="Roles in the Pareto ecosystem">
              {ecosystemRoles.map((role, index) => (
                <EcosystemRoleCard key={role.id} role={role} index={index} />
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
                          <PartnerLogo partner={partner} tone="dark" presentation="grid" />
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
