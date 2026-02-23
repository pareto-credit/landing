import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import paretoLogo from '../../assets/svgs/pareto-logo.svg'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navOffset = 96
  const navLinkClass =
    'inline-flex items-center !text-gray-400 transition-colors hover:!text-white focus-visible:!text-white focus-visible:outline-none'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top =
      id === 'hero'
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - navOffset

    window.scrollTo({
      top: Math.max(0, top),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    })

    setMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'border-b border-white/10 bg-[#081912]/80 py-4 backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#70B19E]"
          aria-label="Scroll to top"
        >
          <img src={paretoLogo} alt="Pareto logo" className="h-8 w-auto" />
        </button>

        <div className="hidden items-center gap-8 font-mono text-sm md:flex">
          <button onClick={() => scrollToSection('products')} className={navLinkClass}>
            Products
          </button>
          <button onClick={() => scrollToSection('solutions')} className={navLinkClass}>
            Solutions
          </button>
          <button onClick={() => scrollToSection('news')} className={navLinkClass}>
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
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative overflow-hidden rounded border border-[#70B19E]/30 bg-[#70B19E]/10 px-6 py-2.5 font-mono text-sm font-medium text-[#70B19E] transition-all hover:bg-[#70B19E] hover:text-[#081912]"
          >
            <span className="relative z-10">Request Access</span>
            <div className="absolute inset-0 bg-[#70B19E] opacity-0 blur-lg transition-opacity group-hover:opacity-100" />
          </button>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-white/10 bg-[#081912] p-6 font-mono text-sm"
          >
            <button
              onClick={() => scrollToSection('products')}
              className="border-b border-white/5 py-2 text-left text-gray-300"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('solutions')}
              className="border-b border-white/5 py-2 text-left text-gray-300"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection('news')}
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
            <button
              onClick={() => scrollToSection('contact')}
              className="mt-4 w-full rounded bg-[#70B19E] px-6 py-3 font-bold text-[#081912]"
            >
              Request Access
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
