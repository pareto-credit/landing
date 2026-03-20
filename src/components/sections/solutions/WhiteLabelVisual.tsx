import { AnimatePresence, motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import { wlFeatures } from '../../../data/solutions'
import { VisualFrame } from './VisualFrame'

interface WhiteLabelVisualProps {
  activeIndex: number
}

const WhiteLabelBrandMark = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill="none"
  >
    <rect x="3" y="3" width="8" height="18" rx="3" fill="var(--color-brand-alt)" />
    <rect x="13" y="3" width="8" height="8" rx="3" fill="var(--color-accent-blue)" />
    <rect x="13" y="13" width="8" height="8" rx="3" fill="white" fillOpacity="0.92" />
  </svg>
)

const WhiteLabelVisual = ({ activeIndex }: WhiteLabelVisualProps) => {
  const activeFeature = wlFeatures[Math.min(activeIndex, wlFeatures.length - 1)] ?? wlFeatures[0]

  return (
    <VisualFrame className="h-[410px] md:h-[490px] xl:h-[530px]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`wl-container-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 flex flex-col"
        >
          <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-center px-2 pt-4 md:px-0 md:pt-8">
            <div
              data-testid="white-label-stage"
              className="w-full max-w-[360px] origin-center scale-[0.78] sm:max-w-[430px] sm:scale-[0.86] md:scale-100"
            >
            {activeIndex === 0 && (
              <div className="relative h-[320px] w-full max-w-[430px] overflow-hidden">
                <div className="absolute left-0 top-7 w-28 space-y-3">
                  {[
                    { label: 'Logo', height: 'h-12' },
                    { label: 'Hero', height: 'h-16' },
                    { label: 'Metrics', height: 'h-24' },
                  ].map((module) => (
                    <div
                      key={module.label}
                      className={`rounded-2xl border border-[var(--color-border-inverse-soft)] bg-[var(--color-overlay-surface-03)] p-3 ${module.height}`}
                    >
                      <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-muted)]">
                        {module.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ui-radius-card absolute right-0 top-0 w-[292px] border border-[var(--color-border-inverse-soft)] bg-[color:rgb(7_15_12_/_0.96)] p-3.5 shadow-[0_24px_50px_rgba(0,0,0,0.42)]">
                  <div className="flex items-center justify-between rounded-2xl border border-[var(--color-overlay-inverse-20)] bg-[var(--color-overlay-surface-03)] p-2.5">
                    <motion.div
                      animate={{
                        borderColor: [
                          'rgba(255,255,255,0.16)',
                          'rgba(112,177,158,0.55)',
                          'rgba(255,255,255,0.16)',
                        ],
                        backgroundColor: [
                          'rgba(255,255,255,0.03)',
                          'rgba(112,177,158,0.12)',
                          'rgba(255,255,255,0.03)',
                        ],
                      }}
                      transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex h-9 w-22 items-center justify-center rounded-xl border border-dashed"
                    >
                      <WhiteLabelBrandMark className="h-5 w-5 opacity-90" />
                    </motion.div>
                    <div className="h-7 w-14 rounded-full bg-[var(--color-overlay-surface-05)]" />
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2.5">
                    <motion.div
                      animate={{
                        borderColor: [
                          'rgba(255,255,255,0.14)',
                          'rgba(59,130,246,0.55)',
                          'rgba(255,255,255,0.14)',
                        ],
                        backgroundColor: [
                          'rgba(255,255,255,0.02)',
                          'rgba(59,130,246,0.10)',
                          'rgba(255,255,255,0.02)',
                        ],
                      }}
                      transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                      className="h-20 rounded-2xl border border-dashed"
                    />
                    <div className="space-y-2.5">
                      <div className="h-9 rounded-2xl border border-[var(--color-overlay-inverse-20)] bg-[var(--color-overlay-surface-03)]" />
                      <div className="h-10 rounded-2xl border border-[var(--color-overlay-inverse-20)] bg-[var(--color-overlay-surface-03)]" />
                    </div>
                  </div>

                  <motion.div
                    animate={{
                      borderColor: [
                        'rgba(255,255,255,0.14)',
                        'rgba(112,177,158,0.50)',
                        'rgba(255,255,255,0.14)',
                      ],
                      backgroundColor: [
                        'rgba(255,255,255,0.02)',
                        'rgba(112,177,158,0.08)',
                        'rgba(255,255,255,0.02)',
                      ],
                    }}
                    transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    className="ui-radius-card mt-2.5 h-24 border border-dashed"
                  />

                  <div className="mt-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[var(--color-brand-alt)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-alt)] shadow-[0_0_10px_var(--color-brand-alt)]" />
                    Composable dashboard
                  </div>
                </div>

                <motion.div
                  animate={{
                    x: [0, 170, 170, 0],
                    y: [0, -24, -24, 0],
                    rotate: [-6, 0, 0, -6],
                    scale: [1, 1.03, 1, 1],
                  }}
                  transition={{
                    duration: 5.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.24, 0.72, 1],
                  }}
                  className="absolute left-2 top-10 z-20 flex h-12 w-[92px] items-center gap-2 rounded-2xl border border-[var(--color-overlay-inverse-30)] bg-[color:rgb(18_38_30_/_0.92)] px-3 shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--color-overlay-surface-10)]">
                    <WhiteLabelBrandMark className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--color-text-inverse)]">
                    Logo
                  </span>
                </motion.div>

                <motion.div
                  animate={{
                    x: [0, 156, 156, 0],
                    y: [0, -18, -18, 0],
                    rotate: [-4, 0, 0, -4],
                    scale: [1, 1.02, 1, 1],
                  }}
                  transition={{
                    duration: 6.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    times: [0, 0.28, 0.76, 1],
                    delay: 0.25,
                  }}
                  className="ui-radius-panel absolute left-0 top-[145px] z-20 w-[136px] border border-[color:rgb(59_130_246_/_0.30)] bg-[color:rgb(11_24_40_/_0.92)] p-3 shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="h-2 w-14 rounded-full bg-[color:rgb(59_130_246_/_0.35)]" />
                    <div className="h-2 w-2 rounded-full bg-[var(--color-accent-blue)]" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-[color:rgb(59_130_246_/_0.18)]" />
                    <div className="h-2 w-4/5 rounded-full bg-[color:rgb(59_130_246_/_0.18)]" />
                    <div className="h-14 rounded-2xl bg-[linear-gradient(180deg,rgba(59,130,246,0.22),rgba(59,130,246,0.06))]" />
                  </div>
                </motion.div>
              </div>
            )}
            {activeIndex === 1 && (
              <div
                data-testid="white-label-liquidity-visual"
                className="flex h-48 w-full items-end justify-center gap-3"
              >
                {[40, 60, 80, 50, 90, 70, 40].map((height, idx) => (
                  <motion.div
                    key={`liquidity-bar-${idx}`}
                    animate={{ height: [`${height}%`, `${height + 20}%`, `${height}%`] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
                    className="w-10 rounded-t-lg bg-gradient-to-t from-[color:rgb(112_177_158_/_0.10)] to-[color:rgb(112_177_158_/_0.80)] shadow-[0_0_15px_rgba(112,177,158,0.4)]"
                  />
                ))}
              </div>
            )}
            {activeIndex === 2 && (
              <div className="relative flex items-center justify-center">
                <ShieldCheck className="relative z-10 h-32 w-32 text-[var(--color-brand-alt)]" />
                <motion.div
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute h-32 w-32 rounded-full border-2 border-[var(--color-brand-alt)]"
                />
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
                  className="absolute h-32 w-32 rounded-full border border-[var(--color-brand-alt)]"
                />
              </div>
            )}
            {activeIndex === 3 && (
              <div className="relative h-48 w-full max-w-sm">
                <svg
                  viewBox="0 0 100 50"
                  className="h-full w-full overflow-visible fill-none stroke-[var(--color-brand-alt)]"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,50 Q10,40 20,45 T40,30 T60,20 T80,25 T100,5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    className="drop-shadow-[0_0_8px_var(--color-brand-alt)]"
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
                      <stop offset="0%" stopColor="var(--color-brand-alt)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}
            {activeIndex === 4 && (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-gradient-to-b from-[var(--color-text-inverse)] to-[var(--color-brand-alt)] bg-clip-text text-6xl font-bold tracking-tighter text-transparent drop-shadow-[0_0_20px_rgba(112,177,158,0.4)] md:text-8xl">
                  99.99<span className="text-5xl">%</span>
                </div>
                <div className="mt-4 flex items-center gap-2 font-mono text-sm tracking-widest text-[var(--color-brand-alt)]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand-alt)] shadow-[0_0_10px_var(--color-brand-alt)]" />
                  GUARANTEED UPTIME
                </div>
              </div>
            )}
            </div>
          </div>

          <div className="z-10 mt-auto bg-gradient-to-t from-[var(--color-bg-panel-dark)] via-[color:rgb(10_18_14_/_0.90)] to-transparent p-4 pt-6 text-center md:p-8 md:pt-12">
            <h4 className="mb-1 text-lg font-bold text-[var(--color-text-inverse)] md:mb-2 md:text-xl">{activeFeature.name}</h4>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-[var(--color-text-muted)] md:text-sm">
              {activeFeature.desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </VisualFrame>
  )
}

export default WhiteLabelVisual
