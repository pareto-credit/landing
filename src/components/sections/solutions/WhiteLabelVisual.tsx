import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { wlFeatures } from '../../../data/solutions'

interface WhiteLabelVisualProps {
  activeIndex: number
}

const WhiteLabelVisual = ({ activeIndex }: WhiteLabelVisualProps) => {
  return (
    <div className="relative flex h-[450px] items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#0A120E] shadow-2xl md:h-[550px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`wl-container-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col"
        >
          <div className="relative flex h-full w-full flex-1 items-center justify-center pt-8">
            {activeIndex === 0 && (
              <div className="flex gap-4">
                <motion.div
                  animate={{ height: [100, 150, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 rounded-full bg-[#70B19E] shadow-[0_0_20px_#70B19E50]"
                />
                <motion.div
                  animate={{ height: [150, 80, 150] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                />
                <motion.div
                  animate={{ height: [80, 120, 80] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-16 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>
            )}
            {activeIndex === 1 && (
              <div className="flex h-48 items-end gap-3">
                {[40, 60, 80, 50, 90, 70, 40].map((height, idx) => (
                  <motion.div
                    key={`liquidity-bar-${idx}`}
                    animate={{ height: [`${height}%`, `${height + 20}%`, `${height}%`] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
                    className="w-10 rounded-t-lg bg-gradient-to-t from-[#70B19E]/10 to-[#70B19E]/80 shadow-[0_0_15px_#70B19E40]"
                  />
                ))}
              </div>
            )}
            {activeIndex === 2 && (
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="relative z-10 h-32 w-32 text-[#70B19E]" />
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute h-32 w-32 rounded-full border-2 border-[#70B19E]"
                />
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  className="absolute h-32 w-32 rounded-full border border-[#70B19E]"
                />
              </div>
            )}
            {activeIndex === 3 && (
              <div className="w-full max-w-sm space-y-8">
                {[60, 30, 80].map((value, idx) => (
                  <div key={`slider-${idx}`} className="relative h-2 rounded-full bg-white/10">
                    <motion.div
                      animate={{ width: [`${value}%`, `${value + 20}%`, `${value}%`] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                      className="absolute left-0 top-0 h-full rounded-full bg-[#70B19E] shadow-[0_0_15px_#70B19E50]"
                    />
                    <motion.div
                      animate={{ left: [`${value}%`, `${value + 20}%`, `${value}%`] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                      className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-[0_0_15px_#70B19E]"
                    />
                  </div>
                ))}
              </div>
            )}
            {activeIndex === 4 && (
              <div className="relative h-48 w-full max-w-sm">
                <svg
                  viewBox="0 0 100 50"
                  className="h-full w-full overflow-visible fill-none stroke-[#70B19E]"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,50 Q10,40 20,45 T40,30 T60,20 T80,25 T100,5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="drop-shadow-[0_0_8px_#70B19E]"
                  />
                  <motion.path
                    d="M0,50 Q10,40 20,45 T40,30 T60,20 T80,25 T100,5 L100,50 L0,50 Z"
                    fill="url(#wl-grad)"
                    stroke="none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  />
                  <defs>
                    <linearGradient id="wl-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#70B19E" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
            {activeIndex === 5 && (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-b from-white to-[#70B19E] bg-clip-text text-6xl font-bold tracking-tighter text-transparent drop-shadow-[0_0_20px_rgba(112,177,158,0.4)] md:text-8xl">
                  99.99<span className="text-5xl">%</span>
                </div>
                <div className="mt-4 flex items-center gap-2 font-mono text-sm tracking-widest text-[#70B19E]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#70B19E] shadow-[0_0_10px_#70B19E]" />
                  GUARANTEED UPTIME
                </div>
              </div>
            )}
          </div>

          <div className="z-10 mt-auto bg-gradient-to-t from-[#0A120E] via-[#0A120E]/90 to-transparent p-8 pt-12 text-center">
            <h4 className="mb-2 text-xl font-bold text-white">{wlFeatures[activeIndex].name}</h4>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-400">
              {wlFeatures[activeIndex].desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default WhiteLabelVisual
