import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  getOperatorBackground,
  getOperatorLogo,
} from "../../data/operatorLogos";
import { useMinWidth } from "../../hooks/useMinWidth";
import type { ProductVaultCard } from "../../types/products";
import { ButtonLink } from "../ui/Button";
import { SectionContainer, SectionHeading } from "../ui/Section";

interface ProductsSectionProps {
  vaults: ProductVaultCard[];
  isVaultsLoading: boolean;
}

const PRODUCTS_SKELETON_COUNT = 4;

const getStatusClassName = (status: string) => {
  const normalized = status.toLowerCase();
  if (normalized.includes("run") || normalized.includes("ready")) {
    return "border border-[color:rgb(113_178_159_/_0.35)] bg-[color:rgb(113_178_159_/_0.15)] text-[var(--color-brand-deep)]";
  }
  if (
    normalized.includes("stop") ||
    normalized.includes("close") ||
    normalized.includes("pause") ||
    normalized.includes("disable")
  ) {
    return "border border-[var(--color-state-danger-border)] bg-[var(--color-state-danger-bg)] text-[var(--color-state-danger-text)]";
  }
  return "border border-[var(--color-border-soft-strong)] bg-[var(--color-surface-soft)] text-[var(--color-text-muted-soft)]";
};

const formatStatusLabel = (status: string) => status.replace(/_/g, " ");

const truncateDescription = (description?: string) =>
  description && description.length > 190
    ? `${description.slice(0, 187).trimEnd()}...`
    : description;

const metricLabelClassName =
  "font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]";
const metricValueClassName =
  "mt-2 whitespace-nowrap text-2xl font-bold tracking-tight text-[var(--color-text-primary)]";
const PRODUCTS_MARQUEE_SPEED = 50;
const PRODUCTS_MARQUEE_SETS = 2;
const DRAG_THRESHOLD_PX = 4;

const normalizeMarqueeScroll = (value: number, singleSetWidth: number) => {
  if (singleSetWidth <= 0) return 0;

  let normalized = value;
  while (normalized >= singleSetWidth) normalized -= singleSetWidth;
  while (normalized < 0) normalized += singleSetWidth;

  return normalized;
};

const isInteractiveMarqueeTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(
    target.closest(
      "a, button, input, select, textarea, summary, [role='button'], [role='link']",
    ),
  );

const ProductsSection = ({ vaults, isVaultsLoading }: ProductsSectionProps) => {
  const shouldReduceMotion = useReducedMotion();
  const showHeaderCta = useMinWidth(768);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const singleSetRef = useRef<HTMLDivElement | null>(null);
  const didDragRef = useRef(false);
  const pointerStartedOnInteractiveRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const pointerStartScrollRef = useRef(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTrackHovered, setIsTrackHovered] = useState(false);

  useEffect(() => {
    if (isVaultsLoading || vaults.length === 0) return;
    const viewport = viewportRef.current;
    const setNode = singleSetRef.current;
    if (!viewport || !setNode) return;

    const syncWidth = () => {
      const nextWidth = setNode.scrollWidth;
      setSingleSetWidth(nextWidth);
      viewport.scrollLeft = normalizeMarqueeScroll(
        viewport.scrollLeft,
        nextWidth,
      );
    };

    syncWidth();

    const resizeObserver = new ResizeObserver(syncWidth);
    resizeObserver.observe(setNode);
    window.addEventListener("resize", syncWidth);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", syncWidth);
    };
  }, [isVaultsLoading, vaults.length]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (
      !viewport ||
      shouldReduceMotion ||
      isVaultsLoading ||
      vaults.length === 0 ||
      singleSetWidth <= 0
    ) {
      return;
    }

    const step = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const delta = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;

      if (!isDragging && !isTrackHovered) {
        const deltaPx = (PRODUCTS_MARQUEE_SPEED * delta) / 1000;
        const next = viewport.scrollLeft + deltaPx;
        viewport.scrollLeft = normalizeMarqueeScroll(next, singleSetWidth);
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastFrameTimeRef.current = null;
    };
  }, [
    shouldReduceMotion,
    isVaultsLoading,
    vaults.length,
    singleSetWidth,
    isDragging,
    isTrackHovered,
  ]);

  const finishDragging = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (
      pointerIdRef.current !== null &&
      viewport.hasPointerCapture(pointerIdRef.current)
    ) {
      viewport.releasePointerCapture(pointerIdRef.current);
    }

    pointerIdRef.current = null;
    pointerStartedOnInteractiveRef.current = false;
    setIsDragging(false);
    viewport.scrollLeft = normalizeMarqueeScroll(
      viewport.scrollLeft,
      singleSetWidth,
    );
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  };

  return (
    <section
      id="products"
      className="ui-section-fit relative overflow-x-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full ui-section-shell">
        <SectionContainer className="mb-10 flex flex-col items-end justify-between gap-4 md:flex-row xl:mb-12">
          <SectionHeading
            eyebrow="Live Vaults"
            title="Tokenized credit, built for scale"
            description="A modern fixed-income stack with the oversight, compliance, and reliability institutions expect."
            className="max-w-3xl"
          />

          {showHeaderCta ? (
            <div data-testid="products-header-actions">
              <ButtonLink
                href="https://app.pareto.credit/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="text-[var(--color-text-primary)]"
              >
                Explore Vaults
              </ButtonLink>
            </div>
          ) : null}
        </SectionContainer>

        {isVaultsLoading ? (
          <div className="mx-auto flex w-full max-w-7xl gap-6 overflow-hidden px-6">
            {Array.from({ length: PRODUCTS_SKELETON_COUNT }).map((_, index) => (
              <div
                key={`product-skeleton-${index}`}
                role="status"
                className="ui-card-surface min-w-[390px] max-w-[390px] flex-shrink-0 animate-pulse p-8 xl:min-w-[400px] xl:max-w-[400px]"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div className="h-11 w-48 rounded-full bg-[var(--color-bg-light)]" />
                  <div className="h-6 w-20 rounded-full bg-[var(--color-bg-light)]" />
                </div>

                <div className="mb-4 h-8 w-48 rounded bg-[var(--color-bg-light)]" />
                <div className="mb-5 flex gap-2">
                  <div className="h-6 w-16 rounded bg-[var(--color-bg-light)]" />
                  <div className="h-6 w-24 rounded bg-[var(--color-bg-light)]" />
                </div>

                <div className="mb-6 space-y-2">
                  <div className="h-3 w-full rounded bg-[var(--color-bg-light)]" />
                  <div className="h-3 w-full rounded bg-[var(--color-bg-light)]" />
                  <div className="h-3 w-4/5 rounded bg-[var(--color-bg-light)]" />
                </div>

                <div className="grid grid-cols-3 gap-6 border-y border-[var(--color-border-soft)] py-5">
                  <div className="space-y-2">
                    <div className="h-2.5 w-10 rounded bg-[var(--color-bg-light)]" />
                    <div className="h-7 w-20 rounded bg-[var(--color-bg-light)]" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 w-14 rounded bg-[var(--color-bg-light)]" />
                    <div className="h-7 w-24 rounded bg-[var(--color-bg-light)]" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2.5 w-20 rounded bg-[var(--color-bg-light)]" />
                    <div className="h-7 w-24 rounded bg-[var(--color-bg-light)]" />
                  </div>
                </div>
                <span className="sr-only">Loading vault cards...</span>
              </div>
            ))}
          </div>
        ) : vaults.length === 0 ? (
          <SectionContainer className="py-6">
            <div className="ui-radius-panel border border-[color:rgb(14_24_19_/_0.15)] bg-[var(--color-overlay-surface-70)] p-8 text-center backdrop-blur-sm">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                Live data unavailable
              </p>
              <p className="ui-copy-muted mt-3 text-lg">
                Vault cards are temporarily unavailable. Refresh the page in a
                few seconds.
              </p>
            </div>
          </SectionContainer>
        ) : (
          <div className="w-full">
            <div
              ref={viewportRef}
              onPointerDown={(event) => {
                const viewport = viewportRef.current;
                if (!viewport) return;

                pointerIdRef.current = event.pointerId;
                pointerStartXRef.current = event.clientX;
                pointerStartScrollRef.current = viewport.scrollLeft;
                pointerStartedOnInteractiveRef.current =
                  isInteractiveMarqueeTarget(event.target);
                didDragRef.current = false;
                setIsDragging(false);
              }}
              onPointerMove={(event) => {
                if (pointerIdRef.current !== event.pointerId) return;
                const viewport = viewportRef.current;
                if (!viewport) return;

                const deltaX = event.clientX - pointerStartXRef.current;
                if (
                  !didDragRef.current &&
                  Math.abs(deltaX) <= DRAG_THRESHOLD_PX
                ) {
                  return;
                }

                if (!didDragRef.current) {
                  didDragRef.current = true;
                  setIsDragging(true);

                  const hasPointerCapture =
                    typeof viewport.hasPointerCapture === "function" &&
                    viewport.hasPointerCapture(event.pointerId);

                  if (!hasPointerCapture) {
                    viewport.setPointerCapture(event.pointerId);
                  }

                  if (pointerStartedOnInteractiveRef.current) {
                    event.preventDefault();
                  }
                }

                const next = pointerStartScrollRef.current - deltaX;
                viewport.scrollLeft = normalizeMarqueeScroll(
                  next,
                  singleSetWidth,
                );
              }}
              onPointerUp={finishDragging}
              onPointerCancel={finishDragging}
              onLostPointerCapture={finishDragging}
              onPointerEnter={() => setIsTrackHovered(true)}
              onPointerLeave={() => setIsTrackHovered(false)}
              className="marquee-scroll flex w-full cursor-grab overflow-x-auto py-4 touch-pan-x select-none active:cursor-grabbing md:touch-pan-y xl:py-10"
            >
              <div className="flex w-max px-8 md:px-10">
                {[...Array(PRODUCTS_MARQUEE_SETS)].map((_, loopIndex) => (
                  <div
                    key={`vault-loop-${loopIndex}`}
                    ref={loopIndex === 0 ? singleSetRef : undefined}
                    aria-hidden={loopIndex > 0}
                    className="flex shrink-0 gap-6 pr-6"
                  >
                    {vaults.map((vault) => {
                      const operatorLogo = getOperatorLogo(
                        vault.operatorCode,
                        vault.operatorName,
                      );
                      const operatorBackground = getOperatorBackground(
                        vault.operatorCode,
                        vault.operatorName,
                      );
                      const curatorLogo = getOperatorLogo(
                        vault.curatorCode,
                        vault.curatorName,
                      );
                      const statusClassName = getStatusClassName(vault.status);
                      const description = truncateDescription(
                        vault.description,
                      );
                      const vaultLink = `https://app.pareto.credit/vault#${vault.address}`;

                      return (
                        <a
                          key={`${loopIndex}-${vault.id}`}
                          href={vaultLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={loopIndex > 0 ? -1 : undefined}
                          draggable={false}
                          onClickCapture={(event) => {
                            if (didDragRef.current) {
                              event.preventDefault();
                              event.stopPropagation();
                            }
                          }}
                          aria-label={`Open ${vault.name} vault`}
                          className="ui-card-surface group relative flex min-w-[390px] max-w-[390px] flex-shrink-0 flex-col overflow-hidden p-6 no-underline shadow-[0_8px_30px_rgb(0,0,0,0.04)] whitespace-normal transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.10)] xl:min-w-[400px] xl:max-w-[400px] xl:p-7"
                        >
                          {operatorBackground ? (
                            <img
                              src={operatorBackground}
                              alt=""
                              aria-hidden="true"
                              draggable={false}
                              className="pointer-events-none absolute bottom-0 right-0 z-0 h-[62%] w-[72%] select-none object-contain object-right-bottom opacity-[0.15]"
                            />
                          ) : null}

                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[color:rgb(113_178_159_/_0.05)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                          <div className="relative z-10 flex h-full flex-col">
                            <div className="mb-5 flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                {vault.operatorName ? (
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full">
                                      {operatorLogo ? (
                                        <img
                                          src={operatorLogo}
                                          alt={vault.operatorName}
                                          draggable={false}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <span className="font-sans text-base font-bold text-[var(--color-brand)]">
                                          {vault.operatorName
                                            .charAt(0)
                                            .toUpperCase()}
                                        </span>
                                      )}
                                    </div>
                                    <div className="min-w-0 pt-0.5">
                                      <p className="truncate whitespace-nowrap text-[1.55rem] font-semibold leading-[1.2] tracking-tight text-[var(--color-text-primary)] xl:text-[1.65rem]">
                                        {vault.name}
                                      </p>
                                      {vault.subtitle ? (
                                        <p className="mt-0 truncate whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
                                          {vault.subtitle}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                ) : (
                                  <p className="truncate whitespace-nowrap text-[1.55rem] font-semibold leading-[1.2] tracking-tight text-[var(--color-text-primary)] xl:text-[1.65rem]">
                                    {vault.name}
                                  </p>
                                )}
                              </div>

                              <span
                                className={`inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-lg px-3 font-mono text-[9px] font-bold uppercase tracking-widest leading-none shadow-sm ${statusClassName}`}
                              >
                                {formatStatusLabel(vault.status)}
                              </span>
                            </div>

                            <div className="mb-5 flex flex-wrap gap-2">
                              {vault.curatorName ? (
                                <span className="inline-flex h-7 items-center gap-2 rounded-lg border border-[var(--color-border-soft)] bg-white px-3 font-mono text-[10px] font-semibold uppercase tracking-widest leading-none text-[var(--color-chip-text)]">
                                  <span className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-soft)]">
                                    {curatorLogo ? (
                                      <img
                                        src={curatorLogo}
                                        alt={vault.curatorName}
                                        draggable={false}
                                        className="h-5 w-5 object-contain"
                                      />
                                    ) : (
                                      <span className="text-[10px] text-[var(--color-brand-soft)]">
                                        {vault.curatorName
                                          .charAt(0)
                                          .toUpperCase()}
                                      </span>
                                    )}
                                  </span>
                                  {vault.curatorName}
                                </span>
                              ) : null}

                              <span className="inline-flex h-7 items-center rounded-lg border border-[var(--color-border-soft)] bg-white px-3 font-mono text-[10px] font-semibold uppercase tracking-widest leading-none text-[var(--color-chip-text)]">
                                {vault.asset}
                              </span>

                              {vault.type ? (
                                <span className="inline-flex h-7 items-center rounded-lg border border-[var(--color-border-soft)] bg-white px-3 font-mono text-[10px] font-semibold uppercase tracking-widest leading-none text-[var(--color-chip-text)]">
                                  {vault.type}
                                </span>
                              ) : null}
                            </div>

                            {description ? (
                              <p className="mb-6 flex-1 break-words whitespace-normal font-mono text-[12px] leading-[1.65] text-[var(--color-text-secondary)] xl:mb-7 xl:text-[13px]">
                                {description}
                              </p>
                            ) : null}

                            <div className="mt-auto grid grid-cols-3 gap-6 border-t border-[var(--color-border-soft)] pt-5">
                              <div>
                                <p className={metricLabelClassName}>TVL</p>
                                <p className={metricValueClassName}>
                                  {vault.tvl}
                                </p>
                              </div>
                              <div>
                                <p className={metricLabelClassName}>Net APY</p>
                                <p className={metricValueClassName}>
                                  {vault.apy}
                                </p>
                              </div>
                              <div>
                                <p className={metricLabelClassName}>
                                  Redemptions
                                </p>
                                <p className={metricValueClassName}>
                                  {vault.redemptions ?? "—"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!showHeaderCta ? (
          <div data-testid="products-footer-actions">
            <SectionContainer className="mt-10 flex justify-center md:mt-12 md:justify-end">
              <ButtonLink
                href="https://app.pareto.credit/"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="text-[var(--color-text-primary)]"
              >
                Explore Vaults
              </ButtonLink>
            </SectionContainer>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ProductsSection;
