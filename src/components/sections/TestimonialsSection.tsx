import { Fragment } from 'react'
import { testimonialList } from '../../data/testimonials'
import { SectionContainer } from '../ui/Section'

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-b border-[var(--color-border-inverse-subtle)] bg-[var(--color-bg-dark-alt)] py-24"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[color:rgb(113_178_159_/_0.05)] blur-[120px]" />

      <SectionContainer className="relative z-10 mb-16 text-center">
        <div className="ui-eyebrow mb-4">
          Trusted By Leaders
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-inverse)] md:text-5xl">
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
                  className="ui-radius-card flex min-w-[450px] max-w-[450px] flex-shrink-0 flex-col justify-between border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-03)] p-8 shadow-lg transition-all duration-300 hover:border-[color:rgb(113_178_159_/_0.30)] hover:bg-[var(--color-overlay-surface-05)]"
                >
                  <div>
                    <div className="mb-6 text-[var(--color-brand)] opacity-60">
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

                    <p className="mb-10 whitespace-normal text-lg font-medium leading-relaxed text-[var(--color-bg-light)]">
                      &quot;{testimonial.quote}&quot;
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-4 border-t border-[var(--color-border-inverse-subtle)] pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border-inverse-soft)] bg-[var(--color-bg-dark)] text-lg font-bold font-sans text-[var(--color-brand)] shadow-inner">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div className="flex flex-col">
                      <span className="text-base font-semibold tracking-tight text-[var(--color-text-inverse)]">
                        {testimonial.name}
                      </span>
                      <span className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-brand)]">
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
