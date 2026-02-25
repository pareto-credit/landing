import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionContainer, SectionHeading } from '../ui/Section'

const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-[var(--color-bg-page)] py-32">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[color:rgb(112_177_158_/_0.10)] blur-[150px]" />
      <SectionContainer size="3xl" className="relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Request institutional access."
          className="mb-16 text-center"
          titleClassName="mb-6"
          descriptionClassName="mx-auto max-w-2xl text-base"
          description="Share your use case and team profile. We will follow up with onboarding steps and commercial details."
        />

        <div className="ui-radius-panel border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-02)] p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <form
            className="space-y-6"
            action="https://formspree.io/f/xkgjlnwg"
            method="POST"
          >
            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-muted)]">Full name *</label>
              <input
                type="text"
                name="fullName"
                required
                className="ui-form-field w-full p-3.5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-muted)]">Organization *</label>
              <input
                type="text"
                name="organization"
                required
                className="ui-form-field w-full p-3.5"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-muted)]">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="ui-form-field w-full p-3.5"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-[var(--color-text-muted)]">Role</label>
                <div className="relative">
                  <select
                    name="role"
                    className="ui-form-field w-full cursor-pointer appearance-none p-3.5"
                  >
                    <option>Lender</option>
                    <option>Borrower</option>
                    <option>Partner</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[var(--color-text-muted-soft)]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--color-text-muted)]">Inquiry type</label>
                <div className="relative">
                  <select
                    name="inquiryType"
                    className="ui-form-field w-full cursor-pointer appearance-none p-3.5"
                  >
                    <option>Borrower</option>
                    <option>Lender</option>
                    <option>Integration</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[var(--color-text-muted-soft)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-muted)]">Message *</label>
              <textarea
                required
                name="message"
                rows={5}
                className="ui-form-field w-full resize-y p-3.5"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                required
                name="consent"
                value="yes"
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-overlay-inverse-20)] bg-[var(--color-bg-panel-dark)] text-[var(--color-brand-alt)] focus:ring-[var(--color-brand-alt)]"
              />
              <span className="text-sm leading-tight text-[var(--color-text-muted)]">
                I consent to Pareto contacting me regarding this inquiry and processing personal data
                under applicable privacy rules.
              </span>
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-6 w-full font-semibold">
              Request Access
            </Button>
          </form>
        </div>
      </SectionContainer>
    </section>
  )
}

export default ContactSection
