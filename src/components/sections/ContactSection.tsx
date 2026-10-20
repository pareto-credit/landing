import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { CONTACT_INTERESTS, type ContactInterest } from "../../data/brand";
import {
  CONTACT_INTEREST_EVENT,
  consumePendingContactInterest,
} from "../../lib/siteNavigation";
import { Button } from "../ui/Button";
import { SectionContainer, SectionHeading } from "../ui/Section";

const fieldLabelClassName =
  "mb-2 block text-sm text-[var(--color-text-secondary)]";
const fieldInputClassName =
  "ui-radius-control w-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none";

const isContactInterest = (value: unknown): value is ContactInterest =>
  typeof value === "string" &&
  (CONTACT_INTERESTS as readonly string[]).includes(value);

const ContactSection = () => {
  const [interest, setInterest] = useState<ContactInterest>(
    () => consumePendingContactInterest() ?? CONTACT_INTERESTS[0],
  );

  useEffect(() => {
    const handleInterest = (event: Event) => {
      const detail = (event as CustomEvent<unknown>).detail;
      if (isContactInterest(detail)) setInterest(detail);
    };

    window.addEventListener(CONTACT_INTEREST_EVENT, handleInterest);
    return () => window.removeEventListener(CONTACT_INTEREST_EVENT, handleInterest);
  }, []);

  return (
    <section
      id="contact"
      className="ui-section-fit relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[color:rgb(112_177_158_/_0.08)] blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-[color:rgb(59_130_246_/_0.06)] blur-[120px]" />
      <SectionContainer size="5xl" className="ui-section-shell relative z-10">
        <SectionHeading
          eyebrow="GET IN TOUCH"
          title={
            <>
              The infrastructure is ready.
              <br />
              Are you?
            </>
          }
          className="mx-auto mb-10 text-center lg:mb-12"
          titleClassName="text-[var(--color-text-primary)]"
          descriptionClassName="mx-auto max-w-3xl text-base text-[var(--color-text-secondary)]"
          description="Tell us whether you're launching a facility, allocating capital or connecting your agents, and we'll help you pick the right plan and setup."
        />

        <div className="ui-radius-panel mx-auto border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_20px_42px_rgb(14_24_19_/_0.08)] md:p-8 lg:p-9">
          <form
            className="space-y-5"
            action="https://formspree.io/f/xkgjlnwg"
            method="POST"
          >
            <div
              data-testid="contact-primary-grid"
              className="grid gap-x-6 gap-y-5 lg:grid-cols-4"
            >
              <div data-testid="contact-full-name-field" className="lg:col-span-2">
                <label
                  htmlFor="contact-full-name"
                  className={fieldLabelClassName}
                >
                  Full name *
                </label>
                <input
                  id="contact-full-name"
                  type="text"
                  name="fullName"
                  required
                  className={fieldInputClassName}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className={fieldLabelClassName}>
                  Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  className={fieldInputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-tg-handle"
                  className={fieldLabelClassName}
                >
                  TG handle
                </label>
                <input
                  id="contact-tg-handle"
                  type="text"
                  name="tgHandle"
                  className={fieldInputClassName}
                />
              </div>
            </div>

            <div className="grid gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-organization"
                  className={fieldLabelClassName}
                >
                  Organization *
                </label>
                <input
                  id="contact-organization"
                  type="text"
                  name="organization"
                  required
                  className={fieldInputClassName}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-interested-in"
                  className={fieldLabelClassName}
                >
                  Interested in *
                </label>
                <div className="relative">
                  <select
                    id="contact-interested-in"
                    name="interestedIn"
                    value={interest}
                    onChange={(event) => {
                      if (isContactInterest(event.target.value)) {
                        setInterest(event.target.value);
                      }
                    }}
                    className={`${fieldInputClassName} cursor-pointer appearance-none pr-10`}
                  >
                    {CONTACT_INTERESTS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className={fieldLabelClassName}>
                How can we help you? *
              </label>
              <textarea
                id="contact-message"
                required
                name="message"
                rows={2}
                className={`${fieldInputClassName} resize-y`}
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                required
                name="consent"
                value="yes"
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-border-soft-strong)] bg-[var(--color-surface)] text-[var(--color-brand-alt)] focus:ring-[var(--color-brand-alt)]"
              />
              <span className="text-sm leading-tight text-[var(--color-text-secondary)]">
                I consent to Pareto contacting me regarding this inquiry and
                processing personal data under applicable privacy rules.
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-semibold"
            >
              Request Access
            </Button>
          </form>
        </div>
      </SectionContainer>
    </section>
  );
};

export default ContactSection;
