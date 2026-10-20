import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  ChevronRight,
  Layers,
  LayoutDashboard,
  Menu,
  Vault,
  X,
  type LucideIcon,
} from "lucide-react";
import paretoLogo from "../../assets/svgs/pareto-logo.svg";
import paretoLogoLight from "../../assets/svgs/pareto-logo-light.svg";
import { useRouter } from "@tanstack/react-router";
import { ButtonLink } from "../ui/Button";
import { SectionContainer } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";
import { isHomePath } from "../../lib/siteNavigation";

type NavTarget =
  | { kind: "section"; id: string }
  | { kind: "page"; to: "/thesis" | "/ecosystem" };

interface NavItem {
  label: string;
  target: NavTarget;
}

interface SolutionItem extends NavItem {
  description: string;
  icon: LucideIcon;
}

const solutionGroups: Array<{ title: string; items: SolutionItem[] }> = [
  {
    title: "For issuers and underwriters",
    items: [
      {
        label: "Pareto Studio",
        description: "Structure, launch and run credit facilities from one desk.",
        icon: LayoutDashboard,
        target: { kind: "section", id: "studio" },
      },
      {
        label: "Agents",
        description: "Pareto MCP for Claude, Codex and your own agents. Early access.",
        icon: Bot,
        target: { kind: "section", id: "agents" },
      },
      {
        label: "Offering",
        description: "Core, Pro and White-Glove by NorthBridge.",
        icon: Layers,
        target: { kind: "section", id: "offering" },
      },
    ],
  },
  {
    title: "For lenders",
    items: [
      {
        label: "Vaults",
        description: "Allocate to permissioned onchain credit facilities with live reporting.",
        icon: Vault,
        target: { kind: "section", id: "products" },
      },
    ],
  },
];

const pageItems: NavItem[] = [
  { label: "Ecosystem", target: { kind: "page", to: "/ecosystem" } },
  { label: "Thesis", target: { kind: "page", to: "/thesis" } },
];

const mobileNavigationItems: NavItem[] = [
  { label: "Studio", target: { kind: "section", id: "studio" } },
  { label: "Agents", target: { kind: "section", id: "agents" } },
  { label: "Offering", target: { kind: "section", id: "offering" } },
  { label: "Vaults", target: { kind: "section", id: "products" } },
  ...pageItems,
  { label: "Contact", target: { kind: "section", id: "contact" } },
];

const SOLUTIONS_CLOSE_DELAY_MS = 140;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pendingTarget, setPendingTarget] = useState<NavTarget | null>(null);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement | null>(null);
  const solutionsCloseTimer = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter({ warn: false });

  const cancelSolutionsClose = () => {
    if (solutionsCloseTimer.current !== null) {
      window.clearTimeout(solutionsCloseTimer.current);
      solutionsCloseTimer.current = null;
    }
  };

  const scheduleSolutionsClose = () => {
    cancelSolutionsClose();
    solutionsCloseTimer.current = window.setTimeout(
      () => setSolutionsOpen(false),
      SOLUTIONS_CLOSE_DELAY_MS,
    );
  };

  useEffect(() => {
    if (!solutionsOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!solutionsRef.current?.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSolutionsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [solutionsOpen]);

  useEffect(() => () => cancelSolutionsClose(), []);
  const navLinkClass =
    "inline-flex items-center transition-colors hover:text-[var(--color-brand-alt)] focus-visible:text-[var(--color-brand-alt)] focus-visible:outline-none";
  const mobileToggleButtonClass = mobileMenuOpen
    ? "border-[color:rgb(255_255_255_/_0.16)] bg-[color:rgb(255_255_255_/_0.04)] text-[var(--color-text-inverse)] shadow-[0_10px_30px_rgb(0,0,0,0.18)]"
    : isScrolled
      ? "border-[color:rgb(14_24_19_/_0.08)] bg-transparent text-[var(--color-text-primary)] shadow-none"
      : "border-[color:rgb(255_255_255_/_0.12)] bg-transparent text-[var(--color-text-primary)] shadow-none";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const goTo = (target: NavTarget) => {
    if (target.kind === "section" && isHomePath()) {
      scrollToSection(target.id);
      return;
    }

    const destination =
      target.kind === "section" ? { to: "/" as const, hash: target.id } : { to: target.to };

    if (router) {
      void router.navigate(destination);
      return;
    }

    window.location.assign(
      target.kind === "section" ? `/#${target.id}` : target.to,
    );
  };

  useEffect(() => {
    if (mobileMenuOpen || !pendingTarget) return;

    const timeoutId = window.setTimeout(() => {
      goTo(pendingTarget);
      setPendingTarget(null);
    }, 40);

    return () => window.clearTimeout(timeoutId);
    // goTo only depends on the router instance, which is stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenuOpen, pendingTarget]);

  const handleNavigate = (target: NavTarget) => {
    if (mobileMenuOpen) {
      setPendingTarget(target);
      setMobileMenuOpen(false);
      return;
    }

    goTo(target);
  };

  const handleSectionScroll = (id: string) =>
    handleNavigate({ kind: "section", id });

  return (
    <>
      <nav
        data-site-navbar
        className={`fixed z-[60] w-full border-b transition-[background-color,border-color,padding,backdrop-filter,box-shadow,color] duration-300 ${
          mobileMenuOpen
            ? "border-transparent bg-transparent py-6 text-[var(--color-text-inverse)] shadow-none backdrop-blur-0"
            : isScrolled
              ? "border-[color:rgb(14_24_19_/_0.05)] bg-[var(--color-overlay-surface-80)] py-4 text-[var(--color-text-primary)] shadow-sm backdrop-blur-xl"
              : "border-black/0 bg-transparent py-6 text-[var(--color-text-primary)]"
        }`}
      >
        <SectionContainer className="relative z-[60] flex items-center justify-between">
          <button
            onClick={() => handleSectionScroll("hero")}
            className="ui-radius-control flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)]"
            aria-label="Scroll to top"
          >
            <img
              src={mobileMenuOpen ? paretoLogoLight : paretoLogo}
              alt="Pareto logo"
              className="h-8 w-auto"
            />
          </button>

          <div
            className={`hidden items-center gap-8 font-mono text-sm lg:flex ${
              isScrolled
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <div
              ref={solutionsRef}
              className="relative"
              onMouseEnter={() => {
                cancelSolutionsClose();
                setSolutionsOpen(true);
              }}
              onMouseLeave={scheduleSolutionsClose}
            >
              <button
                type="button"
                aria-expanded={solutionsOpen}
                aria-controls="solutions-menu"
                onClick={(event) => {
                  // Pointer users already opened it on hover; keyboard users toggle.
                  if (event.detail === 0) {
                    setSolutionsOpen((open) => !open);
                  } else {
                    cancelSolutionsClose();
                    setSolutionsOpen(true);
                  }
                }}
                className={`${navLinkClass} gap-1`}
              >
                Solutions
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {solutionsOpen ? (
                  <motion.div
                    id="solutions-menu"
                    data-testid="solutions-menu"
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-1/2 top-full z-[61] w-[44rem] -translate-x-1/2 pt-5 font-sans"
                  >
                    <div className="overflow-hidden rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[0_24px_60px_rgb(14_24_19_/_0.16)]">
                      <div className="grid grid-cols-[1.35fr_1fr]">
                        {solutionGroups.map((group, groupIndex) => (
                          <div
                            key={group.title}
                            className={`p-5 ${groupIndex > 0 ? "border-l border-[var(--color-border-soft)]" : ""}`}
                          >
                            <div className="mb-2 px-3 text-sm text-[var(--color-text-muted)]">{group.title}</div>
                            <ul>
                              {group.items.map((item) => (
                                <li key={item.label}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSolutionsOpen(false);
                                      handleNavigate(item.target);
                                    }}
                                    className="group flex w-full items-start gap-3 rounded-md px-3 py-3 text-left transition-colors hover:bg-[var(--color-surface-muted)] focus-visible:bg-[var(--color-surface-muted)] focus-visible:outline-none"
                                  >
                                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-brand-deep)] text-[var(--color-brand-bright)]">
                                      <item.icon size={16} />
                                    </span>
                                    <span>
                                      <span className="block text-[15px] font-semibold text-[var(--color-brand-dark)] group-hover:text-[var(--color-brand-deep)]">
                                        {item.label}
                                      </span>
                                      <span className="mt-0.5 block text-[13px] leading-snug text-[var(--color-text-muted)]">
                                        {item.description}
                                      </span>
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between border-t border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] px-8 py-4 text-sm">
                        <span className="text-[var(--color-text-secondary)]">
                          Not sure which fits?{" "}
                          <button
                            type="button"
                            onClick={() => {
                              setSolutionsOpen(false);
                              handleNavigate({ kind: "section", id: "contact" });
                            }}
                            className="inline-flex items-center font-medium text-[var(--color-brand-deep)] underline-offset-4 hover:underline"
                          >
                            Contact us to discuss
                            <ChevronRight size={14} />
                          </button>
                        </span>
                        <a
                          href="https://docs.pareto.credit/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-text-muted)] hover:text-[var(--color-brand-deep)]"
                        >
                          Docs <ArrowUpRight size={13} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {pageItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.target)}
                className={navLinkClass}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:ml-auto md:mr-3 md:flex lg:ml-0 lg:mr-0">
            <ButtonLink
              href="https://app.pareto.credit/"
              target="_blank"
              rel="noopener noreferrer"
              variant={isScrolled ? "primary" : "outline"}
              size="sm"
              className="font-mono text-[var(--color-text-primary)]"
            >
              Enter App
            </ButtonLink>
          </div>

          <button
            className={`ui-radius-control relative z-[60] flex h-11 w-11 items-center justify-center border backdrop-blur-md transition-[border-color,background-color,color,box-shadow] duration-300 lg:hidden ${mobileToggleButtonClass}`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-dialog"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </SectionContainer>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setMobileMenuOpen(false);
              }
            }}
            className="fixed inset-0 z-[55] overflow-hidden bg-[linear-gradient(180deg,rgb(5_12_9),rgb(8_18_14))] lg:hidden"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 0.7 }
                    : { opacity: 0, scale: 0.9 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 0.7 }
                    : { opacity: 0.7, scale: 1 }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 1.08 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.35,
                  ease: "easeOut",
                }}
                className="absolute left-[-18%] top-[12%] h-64 w-64 rounded-full bg-[color:rgb(113_178_159_/_0.14)] blur-[90px]"
              />
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 0.8 }
                    : { opacity: 0, scale: 1.1 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 0.8 }
                    : { opacity: 0.8, scale: 1 }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.92 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.4,
                  ease: "easeOut",
                  delay: shouldReduceMotion ? 0 : 0.05,
                }}
                className="absolute bottom-[14%] right-[-16%] h-72 w-72 rounded-full bg-[color:rgb(59_130_246_/_0.1)] blur-[110px]"
              />
              <div className="absolute inset-x-6 top-[calc(5.5rem)] h-px bg-gradient-to-r from-transparent via-[color:rgb(113_178_159_/_0.45)] to-transparent" />
            </div>

            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
              }
              animate={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
              }
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.32,
                ease: "easeOut",
              }}
              data-testid="mobile-menu-content"
              className="relative z-10 flex h-[100svh] flex-col px-5 pb-5 pt-24 sm:px-6 sm:pb-8 sm:pt-28"
            >
              <div className="shrink-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand-alt)]">
                  Navigate the credit stack
                </p>
                <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-[var(--color-text-muted-softer)] sm:mt-3 sm:text-sm">
                  Explore the platform, products, and research without losing
                  the thread.
                </p>
              </div>

              <div
                data-testid="mobile-menu-nav"
                className="flex flex-1 flex-col justify-center gap-2.5 py-5 sm:gap-3 sm:py-6"
              >
                {mobileNavigationItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, x: -20 }
                    }
                    animate={
                      shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
                    }
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -16 }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0.16 : 0.28,
                      ease: "easeOut",
                      delay: shouldReduceMotion ? 0 : 0.04 * index,
                    }}
                    onClick={() => handleNavigate(item.target)}
                    className="group flex min-h-12 items-center justify-between rounded-md border border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.035)] px-4 py-3 text-left shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)] backdrop-blur-sm transition-colors hover:border-[color:rgb(113_178_159_/_0.35)] hover:bg-[color:rgb(255_255_255_/_0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)] sm:min-h-14 sm:px-5 sm:py-4"
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted-soft)]">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-[1.55rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-text-inverse)] sm:text-[1.9rem]">
                        {item.label}
                      </div>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.04)] text-[var(--color-brand-alt)] transition-transform duration-300 group-hover:translate-x-1 sm:h-10 sm:w-10">
                      <ArrowUpRight size={17} />
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }
                }
                animate={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                }
                exit={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.16 : 0.28,
                  ease: "easeOut",
                  delay: shouldReduceMotion ? 0 : 0.18,
                }}
                className="shrink-0 rounded-md border border-[color:rgb(255_255_255_/_0.09)] bg-[linear-gradient(180deg,rgb(255_255_255_/_0.05),rgb(255_255_255_/_0.02))] p-3.5 shadow-[0_24px_60px_rgb(0_0_0_/_0.22)] backdrop-blur-xl sm:p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-4 sm:mb-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand-alt)]">
                      Continue
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-muted-softer)] sm:mt-2 sm:text-sm">
                      Open the app or review the docs before you dive deeper.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <ButtonLink
                    href="https://docs.pareto.credit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    variant="ghost"
                    size="md"
                    className="border-[color:rgb(255_255_255_/_0.12)] text-[var(--color-text-inverse)]"
                  >
                    Docs
                  </ButtonLink>
                  <ButtonLink
                    href="https://app.pareto.credit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    variant="primary"
                    size="md"
                    className="text-center"
                  >
                    Enter app
                  </ButtonLink>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
