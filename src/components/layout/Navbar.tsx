import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import paretoLogo from "../../assets/svgs/pareto-logo-dark.svg";
import { ButtonLink } from "../ui/Button";
import { SectionContainer } from "../ui/Section";
import { scrollToSection } from "../../lib/scrollToSection";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navLinkClass =
    "inline-flex items-center transition-colors hover:text-[#70B19E] focus-visible:text-[#70B19E] focus-visible:outline-none";

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
          ? "border-white/1 bg-white/75 py-4 text-[#0E1813] shadow-sm backdrop-blur-xl"
          : "border-black/0 bg-transparent py-6 text-[#0E1813]"
      }`}
    >
      <SectionContainer className="flex items-center justify-between">
        <button
          onClick={() => handleSectionScroll("hero")}
          className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70B19E]"
          aria-label="Scroll to top"
        >
          <img src={paretoLogo} alt="Pareto logo" className="h-8 w-auto" />
        </button>

        <div
          className={`hidden items-center gap-8 font-mono text-sm md:flex ${
            isScrolled ? "text-gray-600" : "text-[#293B33]"
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
            variant="primary"
            size="sm"
            className="font-mono"
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
            className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-white/10 bg-[#0E1813] p-6 font-mono text-sm text-white"
          >
            <button
              onClick={() => handleSectionScroll("products")}
              className="border-b border-white/5 py-2 text-left text-gray-300"
            >
              Products
            </button>
            <button
              onClick={() => handleSectionScroll("solutions")}
              className="border-b border-white/5 py-2 text-left text-gray-300"
            >
              Solutions
            </button>
            <button
              onClick={() => handleSectionScroll("news")}
              className="border-b border-white/5 py-2 text-left text-gray-300"
            >
              News
            </button>
            <a
              href="https://docs.pareto.credit/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block border-b border-white/5 py-2 text-left text-gray-300"
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
