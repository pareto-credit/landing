import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, Info } from "lucide-react";
import NorthBridgeMark from "../brand/NorthBridgeMark";
import { plans, type Plan, type PlanFeature } from "../../data/plans";
import { cn } from "../../lib/cn";
import { SectionContainer, SectionHeader } from "../ui/Section";
import OfferingArchitecture from "./offering/OfferingArchitecture";
import OfferingTooltip from "./offering/OfferingTooltip";
import OfferingOverview from "./offering/OfferingOverview";
import OfferingCta from "./offering/OfferingCta";
import "./offering/offering.css";

const FeatureLabel = ({ feature }: { feature: PlanFeature }) => {
  if (!feature.link) return <>{feature.label}</>;
  const [before, after] = feature.label.split(feature.link.text);
  return (
    <>
      {before}
      <a
        href={feature.link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="offering-partner-link"
      >
        {feature.link.text}
        <ArrowUpRight size={12} aria-hidden="true" />
      </a>
      {after}
    </>
  );
};

const TierHeading = ({
  plan,
  open,
  onOpenChange,
}: {
  plan: Plan;
  open: boolean;
  onOpenChange: (id: Plan["id"] | null) => void;
}) => (
  <div className="offering-card__title">
    <h3 id={`offering-name-${plan.id}`}>{plan.name}</h3>
    <div className="offering-card__caption">
      <span className="offering-card__subtitle">
        {plan.byline ? (
          <>
            <NorthBridgeMark size={16} />
            {plan.byline}
          </>
        ) : (
          plan.subtitle
        )}
      </span>
      <OfferingOverview plan={plan} open={open} onOpenChange={onOpenChange} />
    </div>
  </div>
);

interface PlansSectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
}

const PlansSection = ({
  id = "offering",
  eyebrow = "Offering",
  title,
  description,
}: PlansSectionProps) => {
  const [mobilePlan, setMobilePlan] = useState<Plan["id"]>("core");
  const [overviewPlan, setOverviewPlan] = useState<Plan["id"] | null>(null);
  const [hoveredPlan, setHoveredPlan] = useState<Plan["id"] | null>(null);
  const [focusedPlan, setFocusedPlan] = useState<Plan["id"] | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleTabKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % plans.length;
    else if (event.key === "ArrowLeft")
      next = (index + plans.length - 1) % plans.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = plans.length - 1;
    else return;
    event.preventDefault();
    setOverviewPlan(null);
    setMobilePlan(plans[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section
      id={id}
      className="offering-section"
      aria-labelledby="offering-title"
    >
      <SectionContainer className="ui-section-shell">
        <SectionHeader
          eyebrow={eyebrow}
          titleId="offering-title"
          title={
            title ?? (
              <>
                From self-serve{" "}
                <span className="text-[var(--color-text-muted)]">
                  to fully managed.
                </span>
              </>
            )
          }
          description={
            description ??
            "Run facilities yourself in Studio, launch with our team beside you, or hand the whole facility to NorthBridge."
          }
        />

        <div role="tablist" aria-label="Offering" className="offering-tabs">
          {plans.map((plan, index) => (
            <button
              ref={(element) => {
                tabs.current[index] = element;
              }}
              key={plan.id}
              type="button"
              role="tab"
              id={`offering-tab-${plan.id}`}
              aria-controls={`offering-panel-${plan.id}`}
              aria-selected={mobilePlan === plan.id}
              tabIndex={mobilePlan === plan.id ? 0 : -1}
              onClick={() => {
                setOverviewPlan(null);
                setMobilePlan(plan.id);
              }}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div data-testid="plans-grid" className="offering-grid">
          {plans.map((plan) => {
            const active = hoveredPlan === plan.id || focusedPlan === plan.id;
            return (
              <article
                key={plan.id}
                role="tabpanel"
                id={`offering-panel-${plan.id}`}
                aria-labelledby={`offering-tab-${plan.id}`}
                data-testid={`plan-${plan.id}`}
                data-active={active || undefined}
                data-overview-open={overviewPlan === plan.id || undefined}
                className={cn(
                  "offering-card flex-col lg:flex",
                  mobilePlan === plan.id ? "flex" : "hidden",
                  `offering-card--${plan.id}`
                )}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setHoveredPlan(plan.id);
                }}
                onPointerLeave={() => setHoveredPlan(null)}
                onFocusCapture={(event) => {
                  if (event.target.matches(":focus-visible"))
                    setFocusedPlan(plan.id);
                }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget))
                    setFocusedPlan(null);
                }}
              >
                <div className="offering-card__visual">
                  <OfferingArchitecture id={plan.id} active={active} />
                  <TierHeading
                    plan={plan}
                    open={overviewPlan === plan.id}
                    onOpenChange={setOverviewPlan}
                  />
                </div>

                <div
                  className="offering-card__body"
                  inert={overviewPlan === plan.id}
                  aria-hidden={overviewPlan === plan.id || undefined}
                >
                  <div className="offering-card__includes">
                    <span>
                      {plan.inheritsFrom ? (
                        <>Everything in {plan.inheritsFrom}, plus:</>
                      ) : (
                        "Included in Core"
                      )}
                    </span>
                  </div>
                  <ul className="offering-features">
                    {plan.features.map((feature) => (
                      <li key={feature.label}>
                        <Check size={14} strokeWidth={1.7} aria-hidden="true" />
                        <div className="offering-feature-content">
                          <FeatureLabel feature={feature} />
                          {feature.tag ? (
                            <span className="offering-feature-tag">
                              {feature.tag}
                            </span>
                          ) : null}
                          {feature.explanation ? (
                            <OfferingTooltip
                              label={`About ${feature.label}`}
                              heading={feature.label.replace(/ available$/, "")}
                              content={feature.explanation}
                              className="offering-note-trigger"
                            >
                              <Info size={13} aria-hidden="true" />
                            </OfferingTooltip>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="offering-card__action">
                    <OfferingCta plan={plan} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </SectionContainer>
    </section>
  );
};

export default PlansSection;
