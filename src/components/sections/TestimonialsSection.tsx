import { Fragment } from 'react'
import { testimonialList } from '../../data/testimonials'
import { SectionContainer } from '../ui/Section'

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-b border-white/5 bg-[#18241E] py-24"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#71B29F]/5 blur-[120px]" />

      <SectionContainer className="relative z-10 mb-16 text-center">
        <div className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-[#71B29F]">
          Trusted By Leaders
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          What our partners say.
        </h2>
      </SectionContainer>

      <div className="group relative z-10 marquee-container w-full cursor-grab active:cursor-grabbing">
        <div className="marquee-content gap-6 px-6" style={{ animationDuration: '60s' }}>
          {[...Array(2)].map((_, arrayIndex) => (
            <Fragment key={`testimonial-loop-${arrayIndex}`}>
              {testimonialList.map((testimonial, index) => (
                <article
                  key={`testimonial-${arrayIndex}-${index}`}
                  className="flex min-w-[450px] max-w-[450px] flex-shrink-0 flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-lg transition-all duration-300 hover:border-[#71B29F]/30 hover:bg-white/[0.05]"
                >
                  <div>
                    <div className="mb-6 text-[#71B29F] opacity-60">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>

                    <p className="mb-10 whitespace-normal text-lg font-medium leading-relaxed text-[#E8EBE6]">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-4 border-t border-white/5 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0E1813] text-lg font-bold font-sans text-[#71B29F] shadow-inner">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-base font-semibold tracking-tight text-white">
                        {testimonial.name}
                      </span>
                      <span className="mt-1 font-mono text-xs uppercase tracking-wider text-[#71B29F]">
                        {testimonial.role} @ {testimonial.company}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
