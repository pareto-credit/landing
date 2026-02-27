import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { SectionContainer, SectionHeading } from '../ui/Section'

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative border-b border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] py-32 text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[color:rgb(112_177_158_/_0.08)] blur-[150px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-[color:rgb(59_130_246_/_0.06)] blur-[120px]" />
      <SectionContainer size="3xl" className="relative z-10">
        <SectionHeading
          eyebrow="Contact"
          title="Request institutional access."
          className="mb-16 text-center"
          titleClassName="mb-6 text-[var(--color-text-primary)]"
          descriptionClassName="mx-auto max-w-2xl text-base text-[var(--color-text-secondary)]"
          description="Share your use case and team profile. We will follow up with onboarding steps and commercial details."
        />

        <div className="ui-radius-panel border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-8 shadow-[0_20px_42px_rgb(14_24_19_/_0.08)] md:p-10">
          <form
            className="space-y-6"
            action="https://formspree.io/f/xkgjlnwg"
            method="POST"
          >
            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">Full name *</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full rounded-[0.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">Organization *</label>
              <input
                type="text"
                name="organization"
                required
                className="w-full rounded-[0.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-[0.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">Role</label>
                <div className="relative">
                  <select
                    name="role"
                    className="w-full cursor-pointer appearance-none rounded-[0.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none"
                  >
                    <option>Lender</option>
                    <option>Borrower</option>
                    <option>Partner</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">Inquiry type</label>
                <div className="relative">
                  <select
                    name="inquiryType"
                    className="w-full cursor-pointer appearance-none rounded-[0.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none"
                  >
                    <option>Borrower</option>
                    <option>Lender</option>
                    <option>Integration</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-[var(--color-text-muted)]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-[var(--color-text-secondary)]">Message *</label>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y rounded-[0.5rem] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-3.5 text-[var(--color-text-primary)] transition-colors focus:border-[var(--color-brand-alt)] focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                required
                name="consent"
                value="yes"
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-border-soft-strong)] bg-[var(--color-surface)] text-[var(--color-brand-alt)] focus:ring-[var(--color-brand-alt)]"
              />
              <span className="text-sm leading-tight text-[var(--color-text-secondary)]">
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
