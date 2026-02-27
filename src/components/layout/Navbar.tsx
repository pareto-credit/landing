import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import paretoLogo from "../../assets/svgs/pareto-logo.svg";
import { ButtonLink } from "../ui/Button";
import { SectionContainer } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinkClass =
    "inline-flex items-center transition-colors hover:text-[var(--color-brand-alt)] focus-visible:text-[var(--color-brand-alt)] focus-visible:outline-none";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionScroll = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      data-site-navbar
      className={`fixed z-50 w-full border-b transition-[background-color,border-color,padding,backdrop-filter,box-shadow] duration-300 ${
        isScrolled
          ? "border-[color:rgb(14_24_19_/_0.05)] bg-[var(--color-overlay-surface-80)] py-4 text-[var(--color-text-primary)] shadow-sm backdrop-blur-xl"
          : "border-black/0 bg-transparent py-6 text-[var(--color-text-primary)]"
      }`}
    >
      <SectionContainer className="flex items-center justify-between">
        <button
          onClick={() => handleSectionScroll("hero")}
          className="ui-radius-control flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-alt)]"
          aria-label="Scroll to top"
        >
          <img src={paretoLogo} alt="Pareto logo" className="h-8 w-auto" />
        </button>

        <div
          className={`hidden items-center gap-8 font-mono text-sm md:flex ${
            isScrolled
              ? "text-[var(--color-text-muted)]"
              : "text-[var(--color-text-secondary)]"
          }`}
        >
          <button
            onClick={() => handleSectionScroll("products")}
            className={navLinkClass}
          >
            Products
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
          <a
            href="https://docs.pareto.credit/"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
          >
            Docs
          </a>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <ButtonLink
            href="https://app.pareto.credit/"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="sm"
            className="font-mono text-[var(--color-text-primary)]"
          >
            Enter App
          </ButtonLink>
        </div>

        <button
          className="text-current md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </SectionContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-[var(--color-border-inverse-soft)] bg-[var(--color-bg-dark)] p-6 font-mono text-sm text-[var(--color-text-inverse)]"
          >
            <button
              onClick={() => handleSectionScroll("products")}
              className="border-b border-[var(--color-border-inverse-subtle)] py-2 text-left text-[var(--color-text-muted-softer)]"
            >
              Products
            </button>
            <button
              onClick={() => handleSectionScroll("solutions")}
              className="border-b border-[var(--color-border-inverse-subtle)] py-2 text-left text-[var(--color-text-muted-softer)]"
            >
              Solutions
            </button>
            <button
              onClick={() => handleSectionScroll("news")}
              className="border-b border-[var(--color-border-inverse-subtle)] py-2 text-left text-[var(--color-text-muted-softer)]"
            >
              News
            </button>
            <a
              href="https://docs.pareto.credit/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block border-b border-[var(--color-border-inverse-subtle)] py-2 text-left text-[var(--color-text-muted-softer)]"
            >
              Docs
            </a>
            <ButtonLink
              href="https://app.pareto.credit/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              variant="primary"
              size="md"
              className="mt-4 w-full text-center"
            >
              Enter App
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
