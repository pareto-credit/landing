import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter, useRouterState } from "@tanstack/react-router";
import "./navbar.css";
import {
  ArrowUpRight,
  Bot,
  Building2,
  ChevronDown,
  ChevronRight,
  Landmark,
  Layers,
  LayoutDashboard,
  Menu,
  Network,
  Vault,
  X,
  type LucideIcon,
} from "lucide-react";
import paretoLogo from "../../assets/svgs/pareto-logo.svg";
import paretoLogoLight from "../../assets/svgs/pareto-logo-light.svg";
import { ButtonLink } from "../ui/Button";
import { SectionContainer } from "../ui/Section";
import { PageLink } from "../ui/PageLink";
import ThesisChapterNav from "../sections/thesis/ThesisChapterNav";
import { personaPages, type PersonaPath } from "../../data/personas";

type PagePath = "/thesis" | "/ecosystem" | PersonaPath;

type NavTarget =
  | { kind: "section"; id: string }
  | { kind: "page"; to: PagePath };

interface NavItem {
  label: string;
  target: NavTarget;
}

interface MenuItem extends NavItem {
  description: string;
  icon: LucideIcon;
}

type MenuId = "solutions" | "ecosystem";

interface MenuDefinition {
  id: MenuId;
  label: string;
  groups: Array<{ title: string; items: MenuItem[] }>;
  isActive: (pathname: string) => boolean;
}

const solutionGroups: MenuDefinition["groups"] = [
  {
    title: "Platform",
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
        label: "Vaults",
        description: "Live, permissioned credit facilities open to approved lenders.",
        icon: Vault,
        target: { kind: "section", id: "products" },
      },
    ],
  },
  {
    title: "Plans",
    items: [
      {
        label: "Offering",
        description: "Core, Pro and White-Glove by NorthBridge.",
        icon: Layers,
        target: { kind: "section", id: "offering" },
      },
    ],
  },
];

const personaIcons: Record<(typeof personaPages)[number]["id"], LucideIcon> = {
  originators: Building2,
  "capital-providers": Landmark,
};

const ecosystemGroups: MenuDefinition["groups"] = [
  {
    title: "Who we serve",
    items: personaPages.map((page) => ({
      label: page.navLabel,
      description: page.navDescription,
      icon: personaIcons[page.id],
      target: { kind: "page", to: page.path },
    })),
  },
  {
    title: "Network",
    items: [
      {
        label: "Roles & partners",
        description: "The four roles on Pareto and the partners behind them.",
        icon: Network,
        target: { kind: "page", to: "/ecosystem" },
      },
    ],
  },
];

const menus: MenuDefinition[] = [
  { id: "solutions", label: "Solutions", groups: solutionGroups, isActive: (pathname) => pathname === "/" },
  {
    id: "ecosystem",
    label: "Ecosystem",
    groups: ecosystemGroups,
    isActive: (pathname) => pathname.replace(/\/$/, "").startsWith("/ecosystem"),
  },
];

const mobileNavigationItems: NavItem[] = [
  { label: "Studio", target: { kind: "section", id: "studio" } },
  { label: "Agents", target: { kind: "section", id: "agents" } },
  { label: "Offering", target: { kind: "section", id: "offering" } },
  { label: "Vaults", target: { kind: "section", id: "products" } },
  ...personaPages.map((page): NavItem => ({ label: page.navLabel, target: { kind: "page", to: page.path } })),
  { label: "Ecosystem", target: { kind: "page", to: "/ecosystem" } },
  { label: "Thesis", target: { kind: "page", to: "/thesis" } },
  { label: "Contact", target: { kind: "section", id: "contact" } },
];

const pageDestination = (target: NavTarget) => target.kind === "section"
  ? { to: "/" as const, hash: target.id }
  : { to: target.to };

const MENU_CLOSE_DELAY_MS = 140;

interface NavLocation { pathname: string; hash: string }

const isCurrentTarget = (target: NavTarget, location: NavLocation) => target.kind === "page"
  ? location.pathname.replace(/\/$/, "") === target.to
  : location.pathname === "/" && location.hash.replace(/^#/, "") === target.id;

const NavbarContent = ({ location }: { location: NavLocation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const isThesisPage = location.pathname.replace(/\/$/, "") === "/thesis";
  const changeChapterMenu = (open: boolean) => {
    setChaptersOpen(open);
    if (open) setOpenMenu(null);
  };
  const menuRefs = useRef<Partial<Record<MenuId, HTMLDivElement | null>>>({});
  const menuCloseTimer = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const cancelMenuClose = () => {
    if (menuCloseTimer.current !== null) {
      window.clearTimeout(menuCloseTimer.current);
      menuCloseTimer.current = null;
    }
  };

  const scheduleMenuClose = () => {
    cancelMenuClose();
    menuCloseTimer.current = window.setTimeout(
      () => setOpenMenu(null),
      MENU_CLOSE_DELAY_MS,
    );
  };

  useEffect(() => {
    if (!openMenu) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRefs.current[openMenu]?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    const closeOnScroll = () => setOpenMenu(null);
    window.addEventListener("scroll", closeOnScroll, { passive: true });
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  useEffect(() => () => cancelMenuClose(), []);
  const navLinkClass =
    "site-nav-link inline-flex items-center transition-colors hover:text-[var(--color-brand-alt)] focus-visible:text-[var(--color-brand-alt)] focus-visible:outline-none";
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

  return (
    <>
      <nav
        data-site-navbar
        className={`fixed inset-x-0 top-0 z-[60] w-full border-b transition-[background-color,border-color,padding,backdrop-filter,box-shadow,color] duration-300 ${
          mobileMenuOpen
            ? "border-transparent bg-transparent py-6 text-[var(--color-text-inverse)] shadow-none backdrop-blur-0"
            : isScrolled
              ? "border-[color:rgb(14_24_19_/_0.05)] bg-[var(--color-overlay-surface-80)] py-4 text-[var(--color-text-primary)] shadow-sm backdrop-blur-xl"
              : "border-black/0 bg-transparent py-6 text-[var(--color-text-primary)]"
        }`}
      >
        <SectionContainer className="relative z-[60] flex items-center justify-between">
          <PageLink
            to="/"
            hash="hero"
            onClick={() => setMobileMenuOpen(false)}
            className="ui-radius-control flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)]"
            aria-label="Scroll to top"
          >
            <img
              src={mobileMenuOpen ? paretoLogoLight : paretoLogo}
              alt="Pareto logo"
              className="h-8 w-auto"
            />
          </PageLink>

          <div
            className={`contents items-center gap-8 font-mono text-sm lg:flex ${
              isScrolled
                ? "text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {menus.map((menu) => {
              const isOpen = openMenu === menu.id;
              return (
                <div
                  key={menu.id}
                  ref={(node) => {
                    menuRefs.current[menu.id] = node;
                  }}
                  className="relative hidden lg:block"
                  onMouseEnter={() => {
                    setChaptersOpen(false);
                    cancelMenuClose();
                    setOpenMenu(menu.id);
                  }}
                  onMouseLeave={scheduleMenuClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    data-active={menu.isActive(location.pathname) || undefined}
                    aria-controls={`${menu.id}-menu`}
                    onClick={(event) => {
                      setChaptersOpen(false);
                      // Pointer users already opened it on hover; keyboard users toggle.
                      if (event.detail === 0) {
                        setOpenMenu((current) => current === menu.id ? null : menu.id);
                      } else {
                        cancelMenuClose();
                        setOpenMenu(menu.id);
                      }
                    }}
                    className={`${navLinkClass} gap-1`}
                  >
                    {menu.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen ? (
                      <motion.div
                        id={`${menu.id}-menu`}
                        data-testid={`${menu.id}-menu`}
                        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-1/2 top-full z-[61] w-[44rem] -translate-x-1/2 pt-5 font-sans"
                      >
                        <div className="overflow-hidden ui-radius-panel border border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[0_24px_60px_rgb(14_24_19_/_0.16)]">
                          <div className="grid grid-cols-[1.35fr_1fr]">
                            {menu.groups.map((group, groupIndex) => (
                              <div
                                key={group.title}
                                className={`p-5 ${groupIndex > 0 ? "border-l border-[var(--color-border-soft)]" : ""}`}
                              >
                                <div className="mb-2 px-3 text-sm text-[var(--color-text-muted)]">{group.title}</div>
                                <ul>
                                  {group.items.map((item) => (
                                    <li key={item.label}>
                                      <PageLink
                                        {...pageDestination(item.target)}
                                        onClick={() => setOpenMenu(null)}
                                        aria-current={isCurrentTarget(item.target, location) ? item.target.kind === "page" ? "page" : "location" : undefined}
                                        className="site-nav-destination group flex w-full items-start gap-3 ui-radius-control px-3 py-3 text-left transition-colors hover:bg-[var(--color-surface-muted)] focus-visible:bg-[var(--color-surface-muted)] focus-visible:outline-none"
                                      >
                                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center ui-radius-control bg-[var(--color-brand-deep)] text-[var(--color-brand-bright)]">
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
                                      </PageLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between border-t border-[var(--color-border-soft)] bg-[var(--color-bg-light-alt)] px-8 py-4 text-sm">
                            <span className="text-[var(--color-text-secondary)]">
                              Not sure which fits?{" "}
                              <PageLink
                                to="/"
                                hash="contact"
                                onClick={() => setOpenMenu(null)}
                                className="inline-flex items-center font-medium text-[var(--color-brand-deep)] underline-offset-4 hover:underline"
                              >
                                Contact us to discuss
                                <ChevronRight size={14} />
                              </PageLink>
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
              );
            })}

            <ThesisChapterNav isCurrentPage={isThesisPage} open={chaptersOpen} onOpenChange={changeChapterMenu} hidden={mobileMenuOpen} />
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
            onClick={() => {
              setChaptersOpen(false);
              setMobileMenuOpen((open) => !open);
            }}
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
              className="relative z-10 flex h-[100svh] flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-24 sm:px-6 sm:pb-8 sm:pt-28"
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
                  <motion.div
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
                  >
                    <PageLink
                      {...pageDestination(item.target)}
                      onClick={() => setMobileMenuOpen(false)}
                      aria-current={isCurrentTarget(item.target, location) ? item.target.kind === "page" ? "page" : "location" : undefined}
                      className="site-nav-mobile-link group flex min-h-12 items-center justify-between ui-radius-control border border-[color:rgb(255_255_255_/_0.08)] bg-[color:rgb(255_255_255_/_0.035)] px-4 py-3 text-left shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)] backdrop-blur-sm transition-colors hover:border-[color:rgb(113_178_159_/_0.35)] hover:bg-[color:rgb(255_255_255_/_0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)] sm:min-h-14 sm:px-5 sm:py-4"
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
                    </PageLink>
                  </motion.div>
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
                className="shrink-0 ui-radius-control border border-[color:rgb(255_255_255_/_0.09)] bg-[linear-gradient(180deg,rgb(255_255_255_/_0.05),rgb(255_255_255_/_0.02))] p-3.5 shadow-[0_24px_60px_rgb(0_0_0_/_0.22)] backdrop-blur-xl sm:p-4"
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

const RoutedNavbar = () => {
  const location = useRouterState({ select: (state) => state.location });
  return <NavbarContent location={location} />;
};

const Navbar = () => {
  const router = useRouter({ warn: false });
  return router ? <RoutedNavbar /> : <NavbarContent location={{ pathname: window.location.pathname, hash: window.location.hash }} />;
};

export default Navbar;
