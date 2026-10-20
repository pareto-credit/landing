import { useState } from "react";
import { Plus } from "lucide-react";
import { creditStructures } from "../../data/structures";
import { cn } from "../../lib/cn";
import { SectionContainer } from "../ui/Section";

const StructuresSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="structures"
      className="relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <SectionContainer className="ui-section-shell relative z-10">
        <div className="grid gap-6 border-b border-[var(--color-border-soft)] pb-8 md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12 md:pb-10">
          <div>
            <div className="ui-frost-chip mb-5 inline-flex px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
              {creditStructures.length} credit structures
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-[var(--color-brand-dark)] md:text-5xl">
              One platform.
              <span className="text-[var(--color-text-muted)]"> From term loans to revolving lines.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-text-muted)] md:justify-self-end md:text-[0.95rem]">
            Credit Vaults run cycle-based and revolving facilities, with
            collateral, controls and reporting set per deal. Size, tenor and
            pricing are agreed facility by facility.
          </p>
        </div>

        <div data-testid="structures-list">
          {creditStructures.map((structure, index) => {
            const isOpen = openIndex === index;
            const number = String(index + 1).padStart(2, "0");
            const panelId = `structure-panel-${number}`;

            return (
              <div key={structure.name} className="border-b border-[var(--color-border-soft)]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="group flex w-full items-center gap-5 py-4 text-left sm:py-5 transition-colors hover:bg-[color:rgb(14_24_19_/_0.02)] sm:gap-8 sm:py-6"
                >
                  <span
                    className={cn(
                      "w-9 shrink-0 text-2xl font-light tabular-nums transition-colors sm:w-14 sm:text-[2rem]",
                      isOpen ? "text-[var(--color-brand-alt)]" : "text-[var(--color-text-muted)]",
                    )}
                  >
                    {number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="hidden font-mono text-[10.5px] uppercase leading-normal tracking-[0.12em] text-[var(--color-text-muted)] sm:block">
                      {structure.lede}
                    </span>
                    <span className="block text-lg font-medium sm:mt-1.5 tracking-tight text-[var(--color-brand-dark)] transition-colors group-hover:text-[var(--color-brand-deep)] sm:text-[1.4rem]">
                      {structure.name}
                    </span>
                  </span>
                  <Plus
                    size={18}
                    strokeWidth={1.5}
                    className={cn(
                      "shrink-0 text-[var(--color-text-muted)] transition-transform duration-300",
                      isOpen && "rotate-45 text-[var(--color-brand-alt)]",
                    )}
                  />
                </button>
                <div
                  id={panelId}
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-3 pl-14 text-sm leading-relaxed text-[var(--color-text-muted)] sm:hidden">
                      {structure.lede}
                    </p>
                    <dl className="grid max-w-3xl gap-x-12 pb-6 sm:pl-[5.5rem] lg:grid-cols-2">
                      {structure.specs.map(([label, value]) => (
                        <div
                          key={label}
                          className="flex items-baseline justify-between gap-6 border-t border-[var(--color-border-soft)] py-2.5"
                        >
                          <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                            {label}
                          </dt>
                          <dd className="text-right text-[13px] text-[var(--color-text-secondary)]">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
          <span>{creditStructures.length} credit structures</span>
          <span>Illustrative · not an offer of credit</span>
        </div>
      </SectionContainer>
    </section>
  );
};

export default StructuresSection;
