import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import SegmentsSection from './components/sections/SegmentsSection'
import UnderwritingSection from './components/sections/UnderwritingSection'
import StudioShowcaseSection from './components/sections/StudioShowcaseSection'
import StructuresSection from './components/sections/StructuresSection'
import AgentsSection from './components/sections/AgentsSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import ProductsSection from './components/sections/ProductsSection'
import SyntheticDollarSection from './components/sections/SyntheticDollarSection'
import PlansSection from './components/sections/PlansSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import NewsSection from './components/sections/NewsSection'
import ContactSection from './components/sections/ContactSection'
import { useProductsData } from './hooks/useProductsData'
import { useSyntheticDollarData } from './hooks/useSyntheticDollarData'
import { consumeLegalPageReturnScroll } from './lib/legalPageScroll'
import { registerParetoWebMcp } from './lib/webMcp'
import { isQueryFlagEnabled } from './lib/queryFlags'
import './viewport-home.css'

const App = () => {
  const { metrics, vaults, isLoading: isProductsDataLoading } = useProductsData()
  const { data: syntheticDollarData, isLoading: isSyntheticDollarLoading } = useSyntheticDollarData()
  const showHowItWorksSection = isQueryFlagEnabled('showBanknote')
  const showIndexesSection = isQueryFlagEnabled('showIndexes')

  useEffect(() => {
    const scrollY = consumeLegalPageReturnScroll()

    if (scrollY === null) {
      return
    }

    const restoreScroll = () => {
      window.scrollTo({ top: scrollY, behavior: 'auto' })
    }

    restoreScroll()

    let nestedFrameId = 0
    const frameId = window.requestAnimationFrame(() => {
      restoreScroll()
      nestedFrameId = window.requestAnimationFrame(restoreScroll)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
      window.cancelAnimationFrame(nestedFrameId)
    }
  }, [])

  useEffect(() => registerParetoWebMcp(), [])

  return (
    <div className="landing-home min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)] selection:bg-[var(--color-brand-alt)] selection:text-[var(--color-bg-page)]">
      <Navbar />
      <main>
        <HeroSection metrics={metrics} isMetricsLoading={isProductsDataLoading} />
        <UnderwritingSection />
        <SegmentsSection />
        <StudioShowcaseSection />
        {showHowItWorksSection ? <HowItWorksSection /> : null}
        <StructuresSection />
        <AgentsSection />
        <ProductsSection vaults={vaults} isVaultsLoading={isProductsDataLoading} />
        {showIndexesSection ? (
          <SyntheticDollarSection data={syntheticDollarData} isLoading={isSyntheticDollarLoading} />
        ) : null}
        <PlansSection />
        <TestimonialsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
