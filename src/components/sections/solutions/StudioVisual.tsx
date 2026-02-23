import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Lock, PieChart } from 'lucide-react'
import { studioFeatures } from '../../../data/solutions'

interface StudioVisualProps {
  activeIndex: number
}

const StudioVisual = ({ activeIndex }: StudioVisualProps) => {
  return (
    <div className="relative flex h-[450px] items-center justify-center overflow-hidden rounded-3xl border border-white/5 bg-[#0A120E] shadow-2xl md:h-[550px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={`st-container-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col"
        >
          <div className="relative flex h-full w-full flex-1 items-center justify-center pt-8">
            {activeIndex === 0 && (
              <div className="grid w-full max-w-sm grid-cols-3 gap-6 p-8">
                {[...Array(6)].map((_, idx) => (
                  <motion.div
                    key={`grid-cell-${idx}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="h-20 rounded-xl border border-white/20 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                  />
                ))}
              </div>
            )}
            {activeIndex === 1 && (
              <div className="flex w-full max-w-sm flex-col items-center justify-center">
                <motion.div
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="mb-6 h-16 w-full rounded-full bg-gradient-to-r from-[#70B19E] via-white to-[#70B19E] bg-[length:200%_auto] p-[2px] shadow-[0_0_20px_#70B19E50]"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#050B08] font-mono text-sm font-bold tracking-widest text-[#70B19E]">
                    Deploying to Mainnet...
                  </div>
                </motion.div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-[#70B19E] shadow-[0_0_10px_#70B19E]"
                  />
                </div>
              </div>
            )}
            {activeIndex === 2 && (
              <div className="relative flex items-center justify-center">
                <Activity className="relative z-10 h-20 w-20 text-[#70B19E] drop-shadow-[0_0_15px_#70B19E]" />
                <svg className="absolute h-64 w-64 animate-[spin_10s_linear_infinite] opacity-30" viewBox="0 0 100 100">
                  <polygon
                    points="50,5 95,25 95,75 50,95 5,75 5,25"
                    fill="none"
                    stroke="#70B19E"
                    strokeWidth="1"
                  />
                  <polygon
                    points="50,20 80,35 80,65 50,80 20,65 20,35"
                    fill="none"
                    stroke="#70B19E"
                    strokeWidth="1"
                  />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="#70B19E" strokeWidth="0.5" />
                  <line x1="5" y1="25" x2="95" y2="75" stroke="#70B19E" strokeWidth="0.5" />
                  <line x1="5" y1="75" x2="95" y2="25" stroke="#70B19E" strokeWidth="0.5" />
                </svg>
              </div>
            )}
            {activeIndex === 3 && (
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-[#70B19E]/20">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-r-blue-500 border-t-[#70B19E] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                />
                <PieChart className="h-12 w-12 text-white opacity-50" />
              </div>
            )}
            {activeIndex === 4 && (
              <div className="relative flex items-center justify-center">
                <Lock className="absolute z-10 h-16 w-16 text-[#70B19E]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="h-40 w-40 rounded-full border-2 border-dashed border-[#70B19E]/50"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute flex h-52 w-52 items-center justify-center rounded-full border border-white/20"
                >
                  <div className="absolute -top-1.5 h-3 w-3 rounded-full bg-[#70B19E] shadow-[0_0_10px_#70B19E]" />
                </motion.div>
              </div>
            )}
            {activeIndex === 5 && (
              <div className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-black/60 p-6 font-mono text-left text-sm text-[#70B19E] shadow-2xl">
                <div className="mb-4 flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  {'>'} Initializing Pareto API...
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                  {'>'} Connecting to vault endpoints
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                  {'>'} Auth success (OAuth2)
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                  {'>'} Fetching risk parameters
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="mt-3 text-white"
                >
                  {'{'}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="pl-6"
                >
                  "status": 200,
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                  className="pl-6"
                >
                  "facility": "ready"
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.9 }}
                  className="text-white"
                >
                  {'}'}
                </motion.div>
              </div>
            )}
          </div>

          <div className="z-10 mt-auto bg-gradient-to-t from-[#0A120E] via-[#0A120E]/90 to-transparent p-8 pt-12 text-center">
            <h4 className="mb-2 text-xl font-bold text-white">{studioFeatures[activeIndex].name}</h4>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-400">
              {studioFeatures[activeIndex].desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default StudioVisual
