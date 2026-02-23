import { useState } from 'react'
import { studioFeatures, wlFeatures } from '../../data/solutions'
import FeatureList from './solutions/FeatureList'
import StudioVisual from './solutions/StudioVisual'
import WhiteLabelVisual from './solutions/WhiteLabelVisual'

const SolutionsSection = () => {
  const [activeWhiteLabel, setActiveWhiteLabel] = useState(0)
  const [activeStudio, setActiveStudio] = useState(0)

  return (
    <section
      id="solutions"
      className="relative z-10 overflow-hidden border-b border-white/5 bg-[#050B08] py-32"
    >
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-[#70B19E]/5 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-24 max-w-4xl text-center">
          <div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#70B19E]">Solutions</div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Launch your own credit facility in minutes.
          </h2>
        </div>

        <div className="space-y-32">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <h3 className="mb-4 text-3xl font-bold">Pareto White Label</h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                Pareto enables fintechs, prime brokers, and institutions to deploy fully white-labeled
                credit infrastructure.
              </p>
              <FeatureList
                features={wlFeatures}
                activeIndex={activeWhiteLabel}
                onHover={setActiveWhiteLabel}
              />
            </div>
            <div className="order-1 lg:order-2">
              <WhiteLabelVisual activeIndex={activeWhiteLabel} />
            </div>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="order-2 lg:order-1">
              <StudioVisual activeIndex={activeStudio} />
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="mb-4 text-3xl font-bold">Pareto Studio</h3>
              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                Streamline the entire debt lifecycle, from origination and issuance to reporting and
                capital flows.
              </p>
              <FeatureList
                features={studioFeatures}
                activeIndex={activeStudio}
                onHover={setActiveStudio}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection
