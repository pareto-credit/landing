import { motion } from 'framer-motion'
import Earth3D from '../three/Earth3D'

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-white/5 pb-20 pt-40 lg:pb-32 lg:pt-56"
    >
      <Earth3D />
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#70B19E]/20 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">
        <div className="flex max-w-3xl flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 rounded border border-[#70B19E]/30 bg-[#70B19E]/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#70B19E]"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#70B19E]" />
            onchain fixed income product operating system
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 text-5xl font-semibold leading-[1.05] tracking-tight lg:text-7xl"
          >
            It&apos;s time to update the <br />
            <span className="bg-gradient-to-r from-white to-[#70B19E] bg-clip-text text-transparent">
              credit operating system.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-gray-400 md:text-xl"
          >
            Programmable institutional credit. Enterprise-grade compliance. Built for the way capital
            flows today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <button className="flex items-center gap-2 rounded bg-[#70B19E] px-8 py-4 font-semibold text-[#081912] transition-colors hover:bg-white">
              Build a Credit Line
            </button>
            <button className="flex items-center rounded border border-white/20 bg-white/5 px-8 py-4 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
              Explore Vaults
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex w-full flex-wrap items-center justify-center gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-widest text-gray-500">
                Outstanding Loans
              </div>
              <div className="font-mono text-3xl tracking-tight text-white">$155,052,275</div>
            </div>
            <div className="hidden h-12 w-px bg-white/10 md:block" />
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-widest text-gray-500">
                Credit Extended
              </div>
              <div className="font-mono text-3xl tracking-tight text-[#70B19E]">$1,438,869,142</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
