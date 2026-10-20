import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { STUDIO_PRODUCT_NAME } from "../../data/brand";
import { requestContact } from "../../lib/siteNavigation";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { PageLink } from "../ui/PageLink";
import { SectionContainer } from "../ui/Section";
import StudioDesk from "./studio/StudioDesk";
import { personaDesks, type PersonaId } from "./studio/studioDeskData";

const lifecycle = [
  {
    step: "Structure",
    copy: "Terms, collateral rules, rate model, and cycles or a revolving limit.",
  },
  {
    step: "Launch",
    copy: "Deploy a dedicated Credit Vault, onboard KYC'd lenders, set permissions.",
  },
  {
    step: "Operate",
    copy: "Draws, repayments, margin calls and lender reporting, run onchain.",
  },
  {
    step: "Distribute",
    copy: "List on Pareto, extend to Morpho and Pendle, or under your own brand.",
  },
];

const StudioShowcaseSection = () => {
  const [activePersona, setActivePersona] = useState<PersonaId>("underwrite");
  const desk = personaDesks.find((item) => item.id === activePersona) ?? personaDesks[0];

  return (
    <section
      id="studio"
      className="relative overflow-hidden border-y border-[var(--color-border-inverse-subtle)] bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)]"
    >
      <div className="pointer-events-none absolute left-1/2 top-[30%] h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-[color:rgb(112_177_158_/_0.10)] blur-[160px]" />

      <SectionContainer className="ui-section-shell relative z-10">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-brand-alt)]">
              {STUDIO_PRODUCT_NAME}
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.5rem]">
              Every facility,
              <span className="text-[color:rgb(255_255_255_/_0.45)]"> one desk.</span>
            </h2>
          </div>
          <div className="md:justify-self-end">
            <p className="max-w-md text-base leading-relaxed text-[color:rgb(255_255_255_/_0.62)]">
              Structure, launch and run credit facilities from one place:
              terms, lenders, cycles, collateral and reporting, with the onchain
              record underneath.
            </p>
            <Button
              variant="primary"
              size="md"
              className="mt-5"
              onClick={() => requestContact("Pareto Studio (Core)")}
            >
              Request Studio access
            </Button>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Studio desks"
          className="mt-10 grid grid-cols-3 border-t border-[color:rgb(255_255_255_/_0.1)] md:mt-12"
        >
          {personaDesks.map((item, index) => {
            const isActive = item.id === activePersona;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`studio-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="studio-desk-panel"
                onClick={() => setActivePersona(item.id)}
                className={cn(
                  "-mt-px border-t-2 px-1 pb-5 pt-4 text-left transition-colors sm:px-4",
                  isActive
                    ? "border-[var(--color-brand-bright)]"
                    : "border-transparent hover:border-[color:rgb(255_255_255_/_0.25)]",
                )}
              >
                <div
                  className={cn(
                    "font-mono text-[10.5px] uppercase tracking-[0.18em] sm:text-[11px]",
                    isActive ? "text-[var(--color-text-inverse)]" : "text-[color:rgb(255_255_255_/_0.5)]",
                  )}
                >
                  0{index + 1} · {item.tab}
                </div>
                <div
                  className={cn(
                    "mt-1 hidden text-sm sm:block",
                    isActive ? "text-[color:rgb(255_255_255_/_0.72)]" : "text-[color:rgb(255_255_255_/_0.4)]",
                  )}
                >
                  {item.audience}
                </div>
              </button>
            );
          })}
        </div>

        <div id="studio-desk-panel" role="tabpanel" aria-labelledby={`studio-tab-${desk.id}`}>
          <StudioDesk desk={desk} />
        </div>

        <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 lg:mt-12 lg:grid-cols-4 lg:gap-8">
          {lifecycle.map((item, index) => (
            <li key={item.step} className="border-t border-[color:rgb(255_255_255_/_0.12)] pt-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand-alt)]">
                0{index + 1} · {item.step}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.68)]">{item.copy}</p>
            </li>
          ))}
        </ol>

        <PageLink
          to="/ecosystem"
          className="group mt-10 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[color:rgb(255_255_255_/_0.7)] transition-colors hover:text-[var(--color-text-inverse)]"
        >
          Built for credit funds, trading firms, fintech lenders and the
          underwriters behind them.
          <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[var(--color-brand-alt)]">
            See the ecosystem
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </PageLink>
      </SectionContainer>
    </section>
  );
};

export default StudioShowcaseSection;
