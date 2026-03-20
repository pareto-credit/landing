import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Activity, Building2, Network, type LucideIcon } from "lucide-react";
import brokersImage from "../../assets/images/ecosystem/brokers-card.jpg";
import fintechImage from "../../assets/images/ecosystem/fintech-card.jpg";
import marketMakersImage from "../../assets/images/ecosystem/market-makers-card.jpg";
import { useMinWidth } from "../../hooks/useMinWidth";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface EcosystemSegment {
  title: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  imageClassName: string;
  desc: string;
  services: string[];
}

const ecosystemSegments: EcosystemSegment[] = [
  {
    title: "Institutional Funds<br />& Asset Managers",
    icon: Building2,
    image: brokersImage,
    imageAlt: "Skyscrapers viewed from below through heavy fog.",
    imageClassName: "object-center brightness-[0.8] saturate-[0.82]",
    desc: "Secure, isolated environments for large-scale capital deployment and origination.",
    services: [
      "Smart contract escrow",
      "KYC/AML engines",
      "Portfolio reporting",
      "Risk isolation models",
    ],
  },
  {
    title: "Prime Brokers<br />& Market Makers",
    icon: Activity,
    image: marketMakersImage,
    imageAlt: "Glass trading tower rising into a foggy sky.",
    imageClassName: "object-[60%_22%] brightness-[0.8] saturate-[0.82]",
    desc: "High-velocity infrastructure designed for programmable execution and liquidity.",
    services: [
      "Onchain settlement",
      "Customizable facilities",
      "Automated liquidations",
      "WebSocket APIs",
    ],
  },
  {
    title: "Neobanks<br />& Fintechs",
    icon: Network,
    image: fintechImage,
    imageAlt: "Lit office tower at night seen from above street level.",
    imageClassName: "object-[52%_40%] brightness-[1.05] saturate-[0.94]",
    desc: "Modular building blocks to launch proprietary, branded credit products.",
    services: [
      "White-label UI",
      "Modular credit vaults",
      "Compliance orchestration",
      "Workflow automation",
    ],
  },
];

const MOBILE_ECOSYSTEM_BREAKPOINT = 768;

const EcosystemSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMinWidth(MOBILE_ECOSYSTEM_BREAKPOINT);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartYRef = useRef(0);
  const pointerStartScrollRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const DRAG_THRESHOLD_PX = 4;
  const mediaMotionClass = shouldReduceMotion
    ? ""
    : "transition-transform duration-700 ease-out group-hover:scale-105";
  const isMobileCarousel = !isDesktop;

  useEffect(() => {
    if (isDesktop) {
      setActiveIndex(0);
    }
  }, [isDesktop]);

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  const syncActiveIndex = () => {
    const viewport = viewportRef.current;
    if (!viewport || !isMobileCarousel) return;

    const nearestIndex = cardRefs.current.reduce(
      (closestIndex, card, index) => {
        if (!card) return closestIndex;

        const currentCard = cardRefs.current[closestIndex];
        if (!currentCard) return index;

        const currentDistance = Math.abs(
          currentCard.offsetLeft - viewport.scrollLeft,
        );
        const nextDistance = Math.abs(card.offsetLeft - viewport.scrollLeft);

        return nextDistance < currentDistance ? index : closestIndex;
      },
      0,
    );

    setActiveIndex(nearestIndex);
  };

  const finishDragging = () => {
    if (!isMobileCarousel) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    if (
      pointerIdRef.current !== null &&
      viewport.hasPointerCapture(pointerIdRef.current)
    ) {
      viewport.releasePointerCapture(pointerIdRef.current);
    }

    pointerIdRef.current = null;
    setIsDragging(false);
    syncActiveIndex();
  };

  return (
    <section
      id="ecosystem"
      className="ui-section-fit relative z-20 overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[var(--color-glow-brand)] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-[var(--color-glow-blue)] blur-[100px]" />

      <SectionContainer className="ui-section-shell relative z-10">
        <SectionHeading
          eyebrow="Ecosystem"
          title="Engineered for global scale"
          description="The modern credit infrastructure the market deserves — rebuilt for a transparent, programmable era."
          className="mx-auto mb-12 text-center xl:mb-14"
          size="3xl"
        />

        <div
          ref={viewportRef}
          data-testid="ecosystem-track"
          onPointerDown={(event) => {
            if (!isMobileCarousel) return;

            const viewport = viewportRef.current;
            if (!viewport) return;

            pointerIdRef.current = event.pointerId;
            pointerStartXRef.current = event.clientX;
            pointerStartYRef.current = event.clientY;
            pointerStartScrollRef.current = viewport.scrollLeft;
            setIsDragging(false);
          }}
          onPointerMove={(event) => {
            if (!isMobileCarousel || pointerIdRef.current !== event.pointerId) {
              return;
            }

            const viewport = viewportRef.current;
            if (!viewport) return;

            const deltaX = event.clientX - pointerStartXRef.current;
            const deltaY = event.clientY - pointerStartYRef.current;
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            if (!isDragging) {
              if (absX <= DRAG_THRESHOLD_PX && absY <= DRAG_THRESHOLD_PX) {
                return;
              }

              if (absY > absX) {
                pointerIdRef.current = null;
                setIsDragging(false);
                return;
              }

              const hasPointerCapture =
                typeof viewport.hasPointerCapture === "function" &&
                viewport.hasPointerCapture(event.pointerId);

              if (!hasPointerCapture) {
                viewport.setPointerCapture(event.pointerId);
              }

              setIsDragging(true);
            }

            viewport.scrollLeft = pointerStartScrollRef.current - deltaX;
          }}
          onScroll={() => {
            if (!isMobileCarousel) return;

            if (scrollFrameRef.current !== null) {
              window.cancelAnimationFrame(scrollFrameRef.current);
            }

            scrollFrameRef.current = window.requestAnimationFrame(() => {
              syncActiveIndex();
              scrollFrameRef.current = null;
            });
          }}
          onPointerUp={finishDragging}
          onPointerCancel={finishDragging}
          onLostPointerCapture={finishDragging}
          className={
            isMobileCarousel
              ? `marquee-scroll -mx-6 flex gap-4 overflow-x-auto overflow-y-hidden px-6 pb-2 pt-1 select-none snap-x snap-mandatory ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`
              : "grid grid-cols-3 gap-6 xl:gap-7"
          }
        >
          {ecosystemSegments.map((segment, idx) => (
            <motion.article
              key={segment.title}
              ref={(node) => {
                cardRefs.current[idx] = node;
              }}
              data-testid={`ecosystem-card-${idx}`}
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
              }}
              className="ui-radius-card group relative flex min-w-[84%] max-w-[25rem] shrink-0 snap-center snap-always flex-col overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(14,24,19,0.06)] md:min-w-0 md:max-w-none md:flex-1 md:shrink md:snap-none"
            >
              <div
                data-testid={`ecosystem-card-media-${idx}`}
                className="relative h-[9rem] w-full overflow-hidden bg-[var(--color-bg-dark)] md:h-[13rem] xl:h-[14rem]"
              >
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgb(255_255_255_/_0.24)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.24)_1px,transparent_1px)] [background-size:34px_34px]" />
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[color:rgb(112_177_158_/_0.18)] blur-3xl" />
                <div className="absolute -bottom-14 left-[-8%] h-36 w-36 rounded-full bg-[color:rgb(59_130_246_/_0.16)] blur-3xl" />
                <img
                  src={segment.image}
                  alt={segment.imageAlt}
                  fetchPriority="low"
                  decoding="async"
                  className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${segment.imageClassName} ${mediaMotionClass}`}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[color:rgb(8_25_18_/_0.96)] via-[color:rgb(8_25_18_/_0.34)] to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 z-20 md:bottom-6 md:left-6 md:right-6 xl:bottom-7 xl:left-7 xl:right-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-overlay-inverse-30)] bg-[color:rgb(255_255_255_/_0.20)] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors duration-500 group-hover:bg-[color:rgb(255_255_255_/_0.28)] xl:h-14 xl:w-14">
                    <segment.icon
                      className="text-[var(--color-text-inverse)] drop-shadow-md"
                      size={24}
                    />
                  </div>
                  <div className="mt-2 flex min-h-[2.9rem] items-end md:mt-3 md:min-h-[3.4rem] xl:mt-4 xl:min-h-[3.75rem]">
                    <h3
                      className="text-balance text-[1.4rem] font-bold leading-[1.05] tracking-tight text-[var(--color-text-inverse)] drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] md:text-[1.62rem] xl:text-[1.74rem]"
                      dangerouslySetInnerHTML={{ __html: segment.title }}
                    ></h3>
                  </div>
                </div>
              </div>

              <div
                data-testid={`ecosystem-card-copy-${idx}`}
                className="flex flex-1 flex-col bg-[var(--color-bg-light-alt)] p-5 md:p-6 xl:p-7"
              >
                <p className="mb-5 min-h-[56px] text-sm leading-relaxed text-[color:rgb(41_59_51_/_0.90)] xl:mb-7">
                  {segment.desc}
                </p>

                <div className="mt-auto">
                  <div className="mb-3 border-b border-[var(--color-border-soft)] pb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] xl:mb-4">
                    Core Capabilities
                  </div>
                  <ul className="space-y-2.5 xl:space-y-3">
                    {segment.services.map((service) => (
                      <li key={service} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-xs border border-[color:rgb(113_178_159_/_0.50)] bg-[var(--color-surface)] transition-all duration-300 group-hover:border-[var(--color-brand-alt)] group-hover:bg-[var(--color-brand-alt)]" />
                        <span className="text-sm font-medium text-[var(--color-text-primary)]">
                          {service}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {isMobileCarousel ? (
          <div
            data-testid="ecosystem-pagination"
            className="mt-5 flex items-center justify-center gap-2 md:hidden"
          >
            {ecosystemSegments.map((segment, idx) => {
              const isActive = idx === activeIndex;

              return (
                <button
                  key={segment.title}
                  type="button"
                  aria-label={`Go to ecosystem card ${idx + 1}`}
                  aria-current={isActive ? "true" : "false"}
                  onClick={() => {
                    const viewport = viewportRef.current;
                    const card = cardRefs.current[idx];
                    if (!viewport || !card) return;

                    const nextLeft = card.offsetLeft;
                    setActiveIndex(idx);

                    if (typeof viewport.scrollTo === "function") {
                      viewport.scrollTo({ left: nextLeft, behavior: "smooth" });
                    } else {
                      viewport.scrollLeft = nextLeft;
                    }
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-10 bg-[var(--color-text-primary)]"
                      : "w-6 bg-[color:rgb(14_24_19_/_0.16)]"
                  }`}
                >
                  <span className="sr-only">
                    {segment.title.replace(/<br \/>/g, " ")}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
      </SectionContainer>
    </section>
  );
};

export default EcosystemSection;
