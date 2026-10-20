import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { STUDIO_PRODUCT_NAME } from "../../data/brand";
import { requestContact } from "../../lib/siteNavigation";
import { cn } from "../../lib/cn";
import { Button } from "../ui/Button";
import { PageLink } from "../ui/PageLink";
import { SectionContainer } from "../ui/Section";
import StudioDesk from "./studio/StudioDesk";
import { personaDesks, type PersonaId } from "./studio/studioDeskData";

const AUTOPLAY_MS = 9000;

const lifecycle = [
  {
    step: "Structure",
    copy: "Terms, collateral rules, rate model, and cycles or a revolving limit.",
  },
  {
    step: "Launch",
    copy: "Deploy a dedicated Credit Vault, onboard KYC'd lenders, set permissions.",
  },
  {
    step: "Operate",
    copy: "Draws, repayments, margin calls and lender reporting, run onchain.",
  },
  {
    step: "Distribute",
    copy: "List on Pareto, extend to Morpho and Pendle, or under your own brand.",
  },
];

const auroraBlobs = [
  {
    className: "left-[-10%] top-[8%] h-[520px] w-[620px] bg-[color:rgb(114_244_201_/_0.20)]",
    animate: { x: [0, 120, 40, 0], y: [0, 60, 140, 0] },
    duration: 22,
  },
  {
    className: "right-[-8%] top-[22%] h-[560px] w-[560px] bg-[color:rgb(56_189_248_/_0.16)]",
    animate: { x: [0, -140, -60, 0], y: [0, 90, -40, 0] },
    duration: 26,
  },
  {
    className: "bottom-[-10%] left-[30%] h-[460px] w-[680px] bg-[color:rgb(167_139_250_/_0.10)]",
    animate: { x: [0, 80, -100, 0], y: [0, -60, 20, 0] },
    duration: 30,
  },
];

const StudioShowcaseSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const [activePersona, setActivePersona] = useState<PersonaId>("underwrite");
  const [isAutoplay, setIsAutoplay] = useState(true);
  const desk = personaDesks.find((item) => item.id === activePersona) ?? personaDesks[0];
  const canAutoplay = isAutoplay && isInView && !shouldReduceMotion;

  useEffect(() => {
    if (!canAutoplay) return;

    const timeoutId = window.setTimeout(() => {
      const currentIndex = personaDesks.findIndex((item) => item.id === activePersona);
      setActivePersona(personaDesks[(currentIndex + 1) % personaDesks.length].id);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activePersona, canAutoplay]);

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="relative overflow-hidden border-y border-[var(--color-border-inverse-subtle)] bg-[#06140e] text-[var(--color-text-inverse)]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {auroraBlobs.map((blob) => (
          <motion.div
            key={blob.className}
            className={cn("absolute rounded-full blur-[130px]", blob.className)}
            animate={shouldReduceMotion ? undefined : blob.animate}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255_/_0.5)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_0.5)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      </div>

      <SectionContainer className="ui-section-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgb(114_244_201_/_0.3)] bg-[color:rgb(114_244_201_/_0.08)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand-bright)]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-brand-bright)] opacity-70 motion-reduce:animate-none" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[var(--color-brand-bright)]" />
            </span>
            {STUDIO_PRODUCT_NAME}
          </div>
          <h2 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Every facility, <span className="ui-text-shimmer">one desk.</span>
          </h2>
        </div>

        <div
          role="tablist"
          aria-label="Studio desks"
          className="mt-10 grid grid-cols-3 border-t border-[color:rgb(255_255_255_/_0.1)] md:mt-12"
        >
          {personaDesks.map((item, index) => {
            const isActive = item.id === activePersona;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`studio-tab-${item.id}`}
                aria-selected={isActive}
                aria-controls="studio-desk-panel"
                onClick={() => {
                  setIsAutoplay(false);
                  setActivePersona(item.id);
                }}
                className="group relative -mt-px px-1 pb-5 pt-4 text-left sm:px-4"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-transparent transition-colors group-hover:bg-[color:rgb(255_255_255_/_0.2)]" />
                {isActive ? (
                  <motion.span
                    key={`${item.id}-${canAutoplay ? "auto" : "manual"}`}
                    className="absolute left-0 top-0 h-0.5 bg-[linear-gradient(90deg,#2dd4bf,#72f4c9,#38bdf8)]"
                    initial={{ width: canAutoplay ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: canAutoplay ? AUTOPLAY_MS / 1000 : 0, ease: "linear" }}
                  />
                ) : null}
                <div
                  className={cn(
                    "font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors sm:text-[11px]",
                    isActive ? "text-[var(--color-brand-bright)]" : "text-[color:rgb(255_255_255_/_0.5)]",
                  )}
                >
                  0{index + 1} · {item.tab}
                </div>
                <div
                  className={cn(
                    "mt-1 hidden text-sm transition-colors sm:block",
                    isActive ? "text-[color:rgb(255_255_255_/_0.8)]" : "text-[color:rgb(255_255_255_/_0.4)]",
                  )}
                >
                  {item.audience}
                </div>
              </button>
            );
          })}
        </div>

        <div className="relative rounded-lg p-px shadow-[0_40px_120px_rgb(0_0_0_/_0.5),0_0_80px_rgb(114_244_201_/_0.12)]">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="absolute left-1/2 top-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_9s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,#2dd4bf_290deg,#72f4c9_320deg,#38bdf8_345deg,transparent_360deg)] motion-reduce:animate-none" />
            <div className="absolute inset-0 rounded-lg border border-[color:rgb(255_255_255_/_0.1)]" />
          </div>
          <div id="studio-desk-panel" role="tabpanel" aria-labelledby={`studio-tab-${desk.id}`} className="relative">
            <StudioDesk desk={desk} isLive={isInView} />
          </div>
        </div>

        <div
          data-testid="studio-overview"
          className="mt-8 overflow-hidden rounded-lg border border-[color:rgb(255_255_255_/_0.09)] bg-[color:rgb(255_255_255_/_0.03)] backdrop-blur-sm"
        >
          <div className="flex flex-col gap-5 border-b border-[color:rgb(255_255_255_/_0.08)] p-6 md:flex-row md:items-center md:justify-between md:gap-10 lg:p-7">
            <p className="max-w-2xl text-lg leading-relaxed text-[color:rgb(255_255_255_/_0.85)] md:text-xl">
              Structure, launch and run credit facilities from one place:
              terms, lenders, cycles, collateral and reporting, with the onchain
              record underneath.
            </p>
            <Button
              variant="primary"
              size="md"
              className="shrink-0 self-start md:self-center"
              onClick={() => requestContact("Pareto Studio (Core)")}
            >
              Request Studio access
            </Button>
          </div>
          <ol className="grid grid-cols-2 lg:grid-cols-4">
            {lifecycle.map((item, index) => (
              <li
                key={item.step}
                className={cn(
                  "p-5 lg:p-6",
                  index % 2 === 1 && "border-l border-[color:rgb(255_255_255_/_0.08)]",
                  index >= 2 && "border-t border-[color:rgb(255_255_255_/_0.08)] lg:border-t-0",
                  index === 2 && "lg:border-l",
                )}
              >
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[linear-gradient(135deg,#72f4c9,#38bdf8)] text-[10px] font-semibold text-[#06140e]">
                    {index + 1}
                  </span>
                  <span className="text-[var(--color-brand-bright)]">{item.step}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[color:rgb(255_255_255_/_0.68)]">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <PageLink
          to="/ecosystem"
          className="group mt-8 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[color:rgb(255_255_255_/_0.7)] transition-colors hover:text-[var(--color-text-inverse)]"
        >
          Built for credit funds, trading firms, fintech lenders and the
          underwriters behind them.
          <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[var(--color-brand-alt)]">
            See the ecosystem
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </PageLink>
      </SectionContainer>
    </section>
  );
};

export default StudioShowcaseSection;
