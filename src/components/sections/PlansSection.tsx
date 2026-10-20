import { useState } from "react";
import { Check, Compass, Layers, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { plans, type Plan } from "../../data/plans";
import { requestContact } from "../../lib/siteNavigation";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { SectionContainer } from "../ui/Section";

const planIcons: Record<Plan["id"], LucideIcon> = {
  core: Layers,
  pro: Compass,
  "white-glove": ShieldCheck,
};

const PlansSection = () => {
  const [mobilePlan, setMobilePlan] = useState<Plan["id"]>("core");

  return (
  <section
    id="plans"
    className="relative overflow-hidden bg-[var(--color-bg-light)] text-[var(--color-text-primary)]"
  >
    <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-[color:rgb(112_177_158_/_0.12)] blur-[140px]" />

    <SectionContainer className="ui-section-shell relative z-10">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[var(--color-brand-alt)]">
          Plans
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-brand-dark)] md:text-5xl">
          Start self-serve.
          <span className="text-[var(--color-text-muted)]"> Scale to White‑Glove.</span>
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-[var(--color-text-muted)]">
          Every plan runs on the same audited Credit Vault infrastructure.
          Pricing is set per facility.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Plans"
        className="mx-auto mt-10 grid max-w-md grid-cols-3 gap-1 rounded-md border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-1 lg:hidden"
      >
        {plans.map((plan) => (
          <button
            key={plan.id}
            type="button"
            role="tab"
            aria-selected={mobilePlan === plan.id}
            onClick={() => setMobilePlan(plan.id)}
            className={cn(
              "rounded px-2 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
              mobilePlan === plan.id
                ? "bg-[var(--color-brand-deep)] text-[var(--color-text-inverse)]"
                : "text-[var(--color-text-muted)]",
            )}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div
        data-testid="plans-grid"
        className="ui-radius-panel mt-4 grid lg:mt-12 overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-[0_24px_60px_rgb(14_24_19_/_0.08)] lg:grid-cols-3"
      >
        {plans.map((plan, index) => {
          const Icon = planIcons[plan.id];
          const isDark = plan.id === "white-glove";

          return (
            <article
              key={plan.id}
              data-testid={`plan-${plan.id}`}
              className={cn(
                "flex-col lg:flex",
                mobilePlan === plan.id ? "flex" : "hidden",
                index > 0 && "lg:border-l lg:border-[var(--color-border-soft)]",
                isDark
                  ? "bg-[var(--color-brand-mid)] text-[var(--color-text-inverse)]"
                  : "bg-[var(--color-surface)]",
              )}
            >
              <div className="p-6 lg:min-h-[17.5rem] lg:p-7">
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-md",
                    isDark
                      ? "bg-[color:rgb(114_244_201_/_0.12)] text-[var(--color-brand-bright)]"
                      : "bg-[var(--color-brand-deep)] text-[var(--color-text-inverse)]",
                  )}
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-6 flex flex-wrap items-baseline gap-x-2 text-2xl font-bold tracking-tight">
                  {plan.name}
                  {plan.byline ? (
                    <span
                      className={cn(
                        "font-mono text-[11px] font-medium uppercase tracking-[0.16em]",
                        isDark ? "text-[var(--color-brand-bright)]" : "text-[var(--color-brand-alt)]",
                      )}
                    >
                      {plan.byline}
                    </span>
                  ) : null}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm leading-relaxed",
                    isDark ? "text-[color:rgb(255_255_255_/_0.65)]" : "text-[var(--color-text-muted)]",
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <div
                className={cn(
                  "border-y px-6 py-5 lg:px-7",
                  isDark ? "border-[color:rgb(255_255_255_/_0.08)]" : "border-[var(--color-border-soft)]",
                )}
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => requestContact(plan.contactInterest)}
                >
                  {plan.cta}
                </Button>
              </div>

              <div className="flex-1 p-6 lg:p-7">
                <div className="mb-3 text-sm font-semibold">Includes</div>
                <ul
                  className={cn(
                    "divide-y border-t",
                    isDark
                      ? "divide-[color:rgb(255_255_255_/_0.08)] border-[color:rgb(255_255_255_/_0.08)]"
                      : "divide-[var(--color-border-soft)] border-[var(--color-border-soft)]",
                  )}
                >
                  {plan.inheritsFrom ? (
                    <li
                      className={cn(
                        "py-3 text-sm font-medium",
                        isDark ? "text-[var(--color-brand-bright)]" : "text-[var(--color-brand-deep)]",
                      )}
                    >
                      Everything in {plan.inheritsFrom}, plus:
                    </li>
                  ) : null}
                  {plan.features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-3 py-3 text-[0.93rem]">
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded",
                          isDark
                            ? "bg-[color:rgb(114_244_201_/_0.12)] text-[var(--color-brand-bright)]"
                            : "bg-[color:rgb(112_177_158_/_0.16)] text-[var(--color-brand-deep)]",
                        )}
                      >
                        <Check size={13} strokeWidth={2.5} />
                      </span>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        {feature.label}
                        {feature.tag ? (
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]",
                              isDark
                                ? "border-[color:rgb(255_255_255_/_0.2)] text-[color:rgb(255_255_255_/_0.7)]"
                                : "border-[var(--color-border-soft-strong)] text-[var(--color-text-muted)]",
                            )}
                          >
                            {feature.tag}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-2 text-xs leading-relaxed text-[var(--color-text-muted)] md:flex-row md:justify-between md:gap-8">
        <p>Need it under your own brand? A white-label lender app is available on Pro and White-Glove.</p>
        <p className="md:max-w-md md:text-right">
          NorthBridge acts as curator under its own agreements. Curation does
          not guarantee repayment; credit risk remains with lenders.
        </p>
      </div>
    </SectionContainer>
  </section>
  );
};

export default PlansSection;
