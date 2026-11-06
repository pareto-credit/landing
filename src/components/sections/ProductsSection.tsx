import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  getOperatorBackground,
  getOperatorSquareLogo,
} from "../../data/operatorLogos";
import { useMinWidth } from "../../hooks/useMinWidth";
import type { ProductVaultCard } from "../../types/products";
import { ButtonLink } from "../ui/Button";
import { SectionContainer, SectionHeader } from "../ui/Section";
import "./vault-cards.css";

interface ProductsSectionProps {
  vaults: ProductVaultCard[];
  isVaultsLoading: boolean;
}

const PRODUCTS_SKELETON_COUNT = 4;

const PRODUCTS_MARQUEE_SPEED = 50;
const PRODUCTS_MARQUEE_SETS = 2;
const DRAG_THRESHOLD_PX = 4;
const NATIVE_SCROLL_SYNC_THRESHOLD_PX = 2;

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
      "a, button, input, select, textarea, summary, [role='button'], [role='link']"
    )
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
  const pointerStartYRef = useRef(0);
  const pointerStartScrollRef = useRef(0);
  const scrollPositionRef = useRef(0);
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
      const nextScrollPosition = normalizeMarqueeScroll(
        viewport.scrollLeft,
        nextWidth
      );
      scrollPositionRef.current = nextScrollPosition;
      viewport.scrollLeft = nextScrollPosition;
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
        if (
          Math.abs(viewport.scrollLeft - scrollPositionRef.current) >
          NATIVE_SCROLL_SYNC_THRESHOLD_PX
        ) {
          scrollPositionRef.current = viewport.scrollLeft;
        }

        const deltaPx = (PRODUCTS_MARQUEE_SPEED * delta) / 1000;
        const next = scrollPositionRef.current + deltaPx;
        const nextScrollPosition = normalizeMarqueeScroll(next, singleSetWidth);
        scrollPositionRef.current = nextScrollPosition;
        viewport.scrollLeft = nextScrollPosition;
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
    const nextScrollPosition = normalizeMarqueeScroll(
      viewport.scrollLeft,
      singleSetWidth
    );
    scrollPositionRef.current = nextScrollPosition;
    viewport.scrollLeft = nextScrollPosition;
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
        <SectionContainer>
          <SectionHeader
            variant="collection"
            eyebrow="Live Vaults"
            title={
              <>
                Tokenized credit,{" "}
                <span className="text-[var(--color-text-muted)]">
                  built for scale
                </span>
              </>
            }
            description="Access onchain credit with institutional oversight and controls."
            action={
              showHeaderCta ? (
                <div data-testid="products-header-actions">
                  <ButtonLink
                    href="https://app.pareto.credit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="md"
                    className="text-[var(--color-text-primary)]"
                  >
                    Explore Vaults
                  </ButtonLink>
                </div>
              ) : undefined
            }
          />
        </SectionContainer>

        {isVaultsLoading ? (
          <div className="mx-auto flex w-full max-w-7xl gap-6 overflow-hidden px-6">
            {Array.from({ length: PRODUCTS_SKELETON_COUNT }).map((_, index) => (
              <div
                key={`product-skeleton-${index}`}
                role="status"
                className="vault-card animate-pulse motion-reduce:animate-none"
              >
                <div className="vault-card__header">
                  <div className="vault-card__identity">
                    <div className="ui-radius-control h-10 w-10 shrink-0 bg-[var(--color-bg-light)]" />
                    <div className="vault-card__heading space-y-2">
                      <div className="h-6 w-3/4 rounded bg-[var(--color-bg-light)]" />
                      <div className="h-3 w-1/3 rounded bg-[var(--color-bg-light)]" />
                    </div>
                  </div>
                </div>
                <div className="vault-card__body">
                  <div className="vault-card__summary space-y-2">
                    <div className="h-3 w-full rounded bg-[var(--color-bg-light)]" />
                    <div className="h-3 w-full rounded bg-[var(--color-bg-light)]" />
                    <div className="h-3 w-4/5 rounded bg-[var(--color-bg-light)]" />
                  </div>
                  <div className="vault-card__metrics" aria-hidden="true">
                    {[0, 1, 2, 3].map((row) => (
                      <div key={row}>
                        <div className="h-3 w-20 rounded bg-[var(--color-bg-light)]" />
                        <div className="h-5 w-20 rounded bg-[var(--color-bg-light)]" />
                      </div>
                    ))}
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
                pointerStartYRef.current = event.clientY;
                pointerStartScrollRef.current = viewport.scrollLeft;
                scrollPositionRef.current = viewport.scrollLeft;
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
                const deltaY = event.clientY - pointerStartYRef.current;
                const absX = Math.abs(deltaX);
                const absY = Math.abs(deltaY);
                if (
                  !didDragRef.current &&
                  absX <= DRAG_THRESHOLD_PX &&
                  absY <= DRAG_THRESHOLD_PX
                ) {
                  return;
                }

                if (!didDragRef.current) {
                  if (absY > absX) {
                    pointerIdRef.current = null;
                    pointerStartedOnInteractiveRef.current = false;
                    setIsDragging(false);
                    return;
                  }

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
                const nextScrollPosition = normalizeMarqueeScroll(
                  next,
                  singleSetWidth
                );
                scrollPositionRef.current = nextScrollPosition;
                viewport.scrollLeft = nextScrollPosition;
              }}
              onPointerUp={finishDragging}
              onPointerCancel={finishDragging}
              onLostPointerCapture={finishDragging}
              onPointerEnter={() => setIsTrackHovered(true)}
              onPointerLeave={() => setIsTrackHovered(false)}
              className="home-section-track marquee-scroll flex w-full cursor-grab overflow-x-auto overflow-y-hidden py-4 select-none active:cursor-grabbing xl:py-10"
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
                      const operatorLogo = getOperatorSquareLogo(
                        vault.operatorCode,
                        vault.operatorName
                      );
                      const operatorBackground = getOperatorBackground(
                        vault.operatorCode,
                        vault.operatorName
                      );
                      const curatorLogo = getOperatorSquareLogo(
                        vault.curatorCode,
                        vault.curatorName
                      );
                      const assets = vault.assets?.length
                        ? vault.assets
                        : [vault.asset];
                      const vaultLink = `https://app.pareto.credit/vault/${vault.address}`;

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
                          className="vault-card"
                        >
                          <header className="vault-card__header">
                            {operatorBackground ? (
                              <img
                                src={operatorBackground}
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                className="vault-card__art"
                              />
                            ) : null}
                            <div
                              className="vault-card__glass"
                              aria-hidden="true"
                            />
                            <div className="vault-card__identity">
                              <div className="vault-card__operator">
                                {operatorLogo ? (
                                  <img
                                    src={operatorLogo}
                                    alt={vault.operatorName ?? "Vault operator"}
                                    draggable={false}
                                  />
                                ) : (
                                  <span>
                                    {(vault.operatorName || vault.name)
                                      .charAt(0)
                                      .toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="vault-card__heading">
                                <h3 className="vault-card__title leading-[1.2]">
                                  {vault.name}
                                </h3>
                                {vault.subtitle || vault.curatorName ? (
                                  <div className="vault-card__caption-row">
                                    {vault.subtitle ? (
                                      <p className="vault-card__subtitle">
                                        {vault.subtitle}
                                      </p>
                                    ) : null}
                                    {vault.curatorName ? (
                                      <span
                                        className="vault-card__curator"
                                        title={`Curated by ${vault.curatorName}`}
                                      >
                                        <span>Curated by</span>
                                        <span className="vault-card__curator-logo">
                                          {curatorLogo ? (
                                            <img
                                              src={curatorLogo}
                                              alt={vault.curatorName}
                                              draggable={false}
                                            />
                                          ) : (
                                            <span
                                              role="img"
                                              aria-label={vault.curatorName}
                                            >
                                              {vault.curatorName
                                                .charAt(0)
                                                .toUpperCase()}
                                            </span>
                                          )}
                                        </span>
                                      </span>
                                    ) : null}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </header>

                          <div className="vault-card__body">
                            <div className="vault-card__summary">
                              {vault.description ? (
                                <p className="vault-card__description">
                                  {vault.description}
                                </p>
                              ) : null}
                            </div>

                            <dl className="vault-card__metrics">
                              <div>
                                <dt>
                                  {assets.length > 1 ? "Assets" : "Asset"}
                                </dt>
                                <dd>{assets.join(" · ")}</dd>
                              </div>
                              <div>
                                <dt>TVL</dt>
                                <dd>{vault.tvl}</dd>
                              </div>
                              <div>
                                <dt>Net APY</dt>
                                <dd>
                                  {vault.apyIsMaximum ? (
                                    <span className="vault-card__apy-prefix">
                                      up to
                                    </span>
                                  ) : null}
                                  {vault.apy}
                                </dd>
                              </div>
                              <div>
                                <dt>Redemptions</dt>
                                <dd>{vault.redemptions ?? "—"}</dd>
                              </div>
                            </dl>
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
                size="md"
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
