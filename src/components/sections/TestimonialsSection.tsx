import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { getOperatorLogo } from '../../data/operatorLogos'
import { testimonialList } from '../../data/testimonials'
import { SectionContainer, SectionHeading } from '../ui/Section'

const TESTIMONIALS_MARQUEE_SPEED = 38
const TESTIMONIALS_MARQUEE_SETS = 2
const DRAG_THRESHOLD_PX = 4

const normalizeMarqueeScroll = (value: number, singleSetWidth: number) => {
  if (singleSetWidth <= 0) return 0

  let normalized = value
  while (normalized >= singleSetWidth) normalized -= singleSetWidth
  while (normalized < 0) normalized += singleSetWidth

  return normalized
}

const TestimonialsSection = () => {
  const shouldReduceMotion = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const singleSetRef = useRef<HTMLDivElement | null>(null)
  const didDragRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number | null>(null)
  const pointerIdRef = useRef<number | null>(null)
  const pointerStartXRef = useRef(0)
  const pointerStartScrollRef = useRef(0)
  const [singleSetWidth, setSingleSetWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isTrackHovered, setIsTrackHovered] = useState(false)

  useEffect(() => {
    if (testimonialList.length === 0) return
    const viewport = viewportRef.current
    const setNode = singleSetRef.current
    if (!viewport || !setNode) return

    const syncWidth = () => {
      const nextWidth = setNode.scrollWidth
      setSingleSetWidth(nextWidth)
      viewport.scrollLeft = normalizeMarqueeScroll(viewport.scrollLeft, nextWidth)
    }

    syncWidth()

    const resizeObserver = new ResizeObserver(syncWidth)
    resizeObserver.observe(setNode)
    window.addEventListener("resize", syncWidth)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", syncWidth)
    }
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current
    if (
      !viewport ||
      shouldReduceMotion ||
      testimonialList.length === 0 ||
      singleSetWidth <= 0
    ) {
      return
    }

    const step = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp
      }

      const delta = timestamp - lastFrameTimeRef.current
      lastFrameTimeRef.current = timestamp

      if (!isDragging && !isTrackHovered) {
        const deltaPx = (TESTIMONIALS_MARQUEE_SPEED * delta) / 1000
        const next = viewport.scrollLeft + deltaPx
        viewport.scrollLeft = normalizeMarqueeScroll(next, singleSetWidth)
      }

      rafRef.current = window.requestAnimationFrame(step)
    }

    rafRef.current = window.requestAnimationFrame(step)

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      lastFrameTimeRef.current = null
    }
  }, [shouldReduceMotion, singleSetWidth, isDragging, isTrackHovered])

  const finishDragging = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    if (
      pointerIdRef.current !== null &&
      viewport.hasPointerCapture(pointerIdRef.current)
    ) {
      viewport.releasePointerCapture(pointerIdRef.current)
    }

    pointerIdRef.current = null
    setIsDragging(false)
    viewport.scrollLeft = normalizeMarqueeScroll(viewport.scrollLeft, singleSetWidth)
    window.setTimeout(() => {
      didDragRef.current = false
    }, 0)
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-x-hidden border-b border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] py-24 text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[color:rgb(113_178_159_/_0.08)] blur-[120px]" />

      <SectionContainer className="relative z-10 mb-16 text-center">
        <SectionHeading
          eyebrow="Trusted By Leaders"
          title="What our partners say."
          className="mx-auto text-center"
          titleClassName="text-[var(--color-text-primary)]"
          eyebrowClassName="text-[var(--color-brand-alt)]"
        />
      </SectionContainer>

      <div className="relative z-10 w-full">
        <div
          ref={viewportRef}
          onPointerDown={(event) => {
            const viewport = viewportRef.current
            if (!viewport) return

            pointerIdRef.current = event.pointerId
            viewport.setPointerCapture(event.pointerId)
            pointerStartXRef.current = event.clientX
            pointerStartScrollRef.current = viewport.scrollLeft
            didDragRef.current = false
            setIsDragging(true)
          }}
          onPointerMove={(event) => {
            if (pointerIdRef.current !== event.pointerId) return
            const viewport = viewportRef.current
            if (!viewport) return

            const deltaX = event.clientX - pointerStartXRef.current
            if (Math.abs(deltaX) > DRAG_THRESHOLD_PX) {
              didDragRef.current = true
            }

            const next = pointerStartScrollRef.current - deltaX
            viewport.scrollLeft = normalizeMarqueeScroll(next, singleSetWidth)
          }}
          onPointerUp={finishDragging}
          onPointerCancel={finishDragging}
          onLostPointerCapture={finishDragging}
          onPointerEnter={() => setIsTrackHovered(true)}
          onPointerLeave={() => setIsTrackHovered(false)}
          className="marquee-scroll flex w-full cursor-grab overflow-x-auto py-6 touch-pan-y select-none active:cursor-grabbing"
        >
          <div className="flex w-max px-10 md:px-12">
            {[...Array(TESTIMONIALS_MARQUEE_SETS)].map((_, arrayIndex) => (
              <div
                key={`testimonial-loop-${arrayIndex}`}
                ref={arrayIndex === 0 ? singleSetRef : undefined}
                aria-hidden={arrayIndex > 0}
                className="flex shrink-0 gap-6 pr-6"
              >
              {testimonialList.map((testimonial, index) => {
                const operatorLogo = getOperatorLogo(undefined, testimonial.company)

                return (
                  <article
                    key={`testimonial-${arrayIndex}-${index}`}
                    className="ui-radius-card flex min-w-[450px] max-w-[450px] flex-shrink-0 flex-col justify-between border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-8 shadow-[0_10px_30px_rgb(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[color:rgb(113_178_159_/_0.40)] hover:shadow-[0_18px_36px_rgb(0,0,0,0.08)]"
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

                      <p className="mb-10 whitespace-normal text-lg font-medium leading-relaxed text-[var(--color-text-secondary)]">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center gap-4 border-t border-[var(--color-border-soft)] pt-6">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-soft)] bg-[var(--color-bg-light)] shadow-inner">
                        {operatorLogo ? (
                          <img
                            src={operatorLogo}
                            alt={testimonial.company}
                            className="h-full w-full object-cover"
                            draggable={false}
                          />
                        ) : (
                          <span className="text-lg font-bold font-sans text-[var(--color-brand)]">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-base font-semibold tracking-tight text-[var(--color-text-primary)]">
                          {testimonial.name}
                        </span>
                        <span className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-brand-alt)]">
                          {testimonial.role} @ {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
