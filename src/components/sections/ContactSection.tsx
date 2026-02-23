import { ChevronRight } from 'lucide-react'

const ContactSection = () => {
  return (
    <section id="contact" className="relative bg-[#081912] py-32">
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#70B19E]/10 blur-[150px]" />
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#70B19E]">Contact</div>
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">Request institutional access.</h2>
          <p className="text-gray-400">
            Share your use case and team profile. We will follow up with onboarding steps and
            commercial details.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-sm md:p-10">
          <form
            className="space-y-6"
            action="https://formspree.io/f/xkgjlnwg"
            method="POST"
          >
            <div>
              <label className="mb-2 block text-sm text-gray-400">Full name *</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A120E] p-3.5 text-white transition-colors focus:border-[#70B19E] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Organization *</label>
              <input
                type="text"
                name="organization"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A120E] p-3.5 text-white transition-colors focus:border-[#70B19E] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Email *</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-white/10 bg-[#0A120E] p-3.5 text-white transition-colors focus:border-[#70B19E] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Role</label>
                <div className="relative">
                  <select
                    name="role"
                    className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#0A120E] p-3.5 text-white transition-colors focus:border-[#70B19E] focus:outline-none"
                  >
                    <option>Lender</option>
                    <option>Borrower</option>
                    <option>Partner</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Inquiry type</label>
                <div className="relative">
                  <select
                    name="inquiryType"
                    className="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-[#0A120E] p-3.5 text-white transition-colors focus:border-[#70B19E] focus:outline-none"
                  >
                    <option>Borrower</option>
                    <option>Lender</option>
                    <option>Integration</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">Message *</label>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full resize-y rounded-lg border border-white/10 bg-[#0A120E] p-3.5 text-white transition-colors focus:border-[#70B19E] focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                required
                name="consent"
                value="yes"
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-white/20 bg-[#0A120E] text-[#70B19E] focus:ring-[#70B19E]"
              />
              <span className="text-sm leading-tight text-gray-400">
                I consent to Pareto contacting me regarding this inquiry and processing personal data
                under applicable privacy rules.
              </span>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-[#85C4A7] py-4 font-semibold text-[#081912] transition-colors hover:bg-white"
            >
              Request Access
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
