import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import paretoLogo from "../../assets/svgs/pareto-logo.svg";
import paretoLogoLight from "../../assets/svgs/pareto-logo-light.svg";
import { ButtonLink } from "../ui/Button";
import { SectionContainer } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";

const mobileNavigationItems = [
  { id: "ecosystem", label: "Ecosystem", index: "01" },
  { id: "products", label: "Product", index: "02" },
  { id: "solutions", label: "Solutions", index: "03" },
  { id: "news", label: "News", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
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
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  const handleSectionScroll = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

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
            className={`hidden items-center gap-8 font-mono text-sm md:flex ${
              isScrolled
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            <button
              onClick={() => handleSectionScroll("ecosystem")}
              className={navLinkClass}
            >
              Ecosystem
            </button>
            <button
              onClick={() => handleSectionScroll("products")}
              className={navLinkClass}
            >
              Product
            </button>
            <button
              onClick={() => handleSectionScroll("solutions")}
              className={navLinkClass}
            >
              Solutions
            </button>
            <button
              onClick={() => handleSectionScroll("news")}
              className={navLinkClass}
            >
              News
            </button>
          </div>

          <div className="hidden items-center gap-4 md:flex">
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
            className={`ui-radius-control relative z-[60] flex h-11 w-11 items-center justify-center border backdrop-blur-md transition-[border-color,background-color,color,box-shadow] duration-300 md:hidden ${mobileToggleButtonClass}`}
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
            className="fixed inset-0 z-[55] overflow-y-auto bg-[linear-gradient(180deg,rgb(5_12_9),rgb(8_18_14))] md:hidden"
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
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: shouldReduceMotion ? 0.2 : 0.32,
                ease: "easeOut",
              }}
              className="relative z-10 flex min-h-full flex-col px-6 pb-8 pt-28"
            >
              <div className="mb-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-brand-alt)]">
                  Navigate the credit stack
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted-softer)]">
                  Explore the platform, products, and research without losing the
                  thread.
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-6">
                {mobileNavigationItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, x: -20 }
                    }
                    animate={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, x: 0 }
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
                    onClick={() => handleSectionScroll(item.id)}
                    className="group flex min-h-14 items-center justify-between rounded-[1.6rem] border border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.035)] px-5 py-4 text-left shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)] backdrop-blur-sm transition-colors hover:border-[color:rgb(113_178_159_/_0.35)] hover:bg-[color:rgb(255_255_255_/_0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)]"
                  >
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-text-muted-soft)]">
                        {item.index}
                      </div>
                      <div className="mt-1 text-[1.9rem] font-semibold leading-none tracking-[-0.04em] text-[var(--color-text-inverse)]">
                        {item.label}
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.04)] text-[var(--color-brand-alt)] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowUpRight size={18} />
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: shouldReduceMotion ? 0.16 : 0.28,
                  ease: "easeOut",
                  delay: shouldReduceMotion ? 0 : 0.18,
                }}
                className="mt-4 rounded-[1.75rem] border border-[color:rgb(255_255_255_/_0.09)] bg-[linear-gradient(180deg,rgb(255_255_255_/_0.05),rgb(255_255_255_/_0.02))] p-4 shadow-[0_24px_60px_rgb(0_0_0_/_0.22)] backdrop-blur-xl"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-brand-alt)]">
                      Continue
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted-softer)]">
                      Open the app or review the docs before you dive deeper.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
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
