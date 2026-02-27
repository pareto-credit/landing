import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Lock, PieChart } from 'lucide-react'
import { studioFeatures } from '../../../data/solutions'
import paretoLogoLight from '../../../assets/svgs/pareto-logo-light.svg'
import { VisualFrame } from './VisualFrame'

interface StudioVisualProps {
  activeIndex: number
}

const StudioVisual = ({ activeIndex }: StudioVisualProps) => {
  return (
    <VisualFrame>
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
              <div className="w-full max-w-[430px] rounded-2xl border border-[var(--color-overlay-inverse-20)] bg-[color:rgb(8_18_14_/_0.92)] p-4 shadow-[0_24px_50px_rgba(0,0,0,0.45)]">
                <div className="flex items-center justify-between border-b border-[var(--color-border-inverse-subtle)] pb-3">
                  <img
                    src={paretoLogoLight}
                    alt="Pareto"
                    className="h-6 w-auto object-contain opacity-95"
                  />
                  <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgb(112_177_158_/_0.40)] bg-[color:rgb(112_177_158_/_0.12)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-brand-alt)]">
                    <motion.span
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-alt)]"
                    />
                    Studio
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-[1.3fr_0.7fr] gap-3">
                  <div className="rounded-xl border border-[var(--color-border-inverse-soft)] bg-[color:rgb(255_255_255_/_0.02)] p-3">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-text-muted)]">
                      Vault Configuration
                    </div>
                    <div className="flex h-20 items-end gap-1.5">
                      {[42, 62, 51, 70, 58, 76, 66].map((height, idx) => (
                        <motion.div
                          key={`studio-bar-${idx}`}
                          animate={{ height: [`${height}%`, `${height + 10}%`, `${height}%`] }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: idx * 0.08,
                          }}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-[color:rgb(112_177_158_/_0.20)] to-[color:rgb(112_177_158_/_0.80)]"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-xl border border-[var(--color-border-inverse-soft)] bg-[color:rgb(255_255_255_/_0.02)] p-3">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                        LTV cap
                      </div>
                      <div className="mt-1 text-xl font-semibold text-[var(--color-text-inverse)]">65%</div>
                    </div>
                    <div className="rounded-xl border border-[var(--color-border-inverse-soft)] bg-[color:rgb(255_255_255_/_0.02)] p-3">
                      <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                        Trigger
                      </div>
                      <div className="mt-1 text-xl font-semibold text-[var(--color-text-inverse)]">2.4σ</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    ['Collateral', 'USDC / USDT'],
                    ['Rate model', 'Dynamic'],
                    ['Status', 'Draft'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[var(--color-border-inverse-soft)] bg-[color:rgb(255_255_255_/_0.02)] p-2.5"
                    >
                      <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                        {label}
                      </div>
                      <div className="mt-1 truncate text-[11px] font-medium text-[var(--color-text-inverse)]">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeIndex === 1 && (
              <div className="flex w-full max-w-sm flex-col items-center justify-center">
                <motion.div
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="mb-6 h-16 w-full rounded-full bg-gradient-to-r from-[var(--color-brand-alt)] via-[var(--color-text-inverse)] to-[var(--color-brand-alt)] bg-[length:200%_auto] p-[2px] shadow-[0_0_20px_rgba(112,177,158,0.5)]"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[var(--color-bg-page-alt)] font-mono text-sm font-bold tracking-widest text-[var(--color-brand-alt)]">
                    Deploying to Mainnet...
                  </div>
                </motion.div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-[var(--color-border-inverse-soft)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-[var(--color-brand-alt)] shadow-[0_0_10px_var(--color-brand-alt)]"
                  />
                </div>
              </div>
            )}
            {activeIndex === 2 && (
              <div className="relative flex items-center justify-center">
                <Activity className="relative z-10 h-20 w-20 text-[var(--color-brand-alt)] drop-shadow-[0_0_15px_var(--color-brand-alt)]" />
                <svg className="absolute h-64 w-64 animate-[spin_10s_linear_infinite] opacity-30" viewBox="0 0 100 100">
                  <polygon
                    points="50,5 95,25 95,75 50,95 5,75 5,25"
                    fill="none"
                    stroke="var(--color-brand-alt)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="50,20 80,35 80,65 50,80 20,65 20,35"
                    fill="none"
                    stroke="var(--color-brand-alt)"
                    strokeWidth="1"
                  />
                  <line x1="50" y1="5" x2="50" y2="95" stroke="var(--color-brand-alt)" strokeWidth="0.5" />
                  <line x1="5" y1="25" x2="95" y2="75" stroke="var(--color-brand-alt)" strokeWidth="0.5" />
                  <line x1="5" y1="75" x2="95" y2="25" stroke="var(--color-brand-alt)" strokeWidth="0.5" />
                </svg>
              </div>
            )}
            {activeIndex === 3 && (
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[16px] border-[color:rgb(112_177_158_/_0.20)]">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-r-[var(--color-accent-blue)] border-t-[var(--color-brand-alt)] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                />
                <PieChart className="h-12 w-12 text-[var(--color-text-inverse)] opacity-50" />
              </div>
            )}
            {activeIndex === 4 && (
              <div className="relative flex items-center justify-center">
                <Lock className="absolute z-10 h-16 w-16 text-[var(--color-brand-alt)]" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                  className="h-40 w-40 rounded-full border-2 border-dashed border-[color:rgb(112_177_158_/_0.50)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute flex h-52 w-52 items-center justify-center rounded-full border border-[var(--color-overlay-inverse-20)]"
                >
                  <div className="absolute -top-1.5 h-3 w-3 rounded-full bg-[var(--color-brand-alt)] shadow-[0_0_10px_var(--color-brand-alt)]" />
                </motion.div>
              </div>
            )}
            {activeIndex === 5 && (
              <div className="w-full max-w-sm overflow-hidden rounded-xl border border-[var(--color-border-inverse-soft)] bg-black/60 p-6 font-mono text-left text-sm text-[var(--color-brand-alt)] shadow-2xl">
                <div className="mb-4 flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[var(--color-accent-red-soft)]" />
                  <div className="h-3 w-3 rounded-full bg-[var(--color-accent-yellow-soft)]" />
                  <div className="h-3 w-3 rounded-full bg-[var(--color-accent-green-soft)]" />
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
                  className="mt-3 text-[var(--color-text-inverse)]"
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
                  className="text-[var(--color-text-inverse)]"
                >
                  {'}'}
                </motion.div>
              </div>
            )}
          </div>

          <div className="z-10 mt-auto bg-gradient-to-t from-[var(--color-bg-panel-dark)] via-[color:rgb(10_18_14_/_0.90)] to-transparent p-8 pt-12 text-center">
            <h4 className="mb-2 text-xl font-bold text-[var(--color-text-inverse)]">{studioFeatures[activeIndex].name}</h4>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-[var(--color-text-muted)]">
              {studioFeatures[activeIndex].desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </VisualFrame>
  )
}

export default StudioVisual
