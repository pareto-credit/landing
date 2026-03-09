import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import SegmentsSection from './components/sections/SegmentsSection'
import EcosystemSection from './components/sections/EcosystemSection'
import NarrativeScrollSection from './components/sections/NarrativeScrollSection'
import HowItWorksSection from './components/sections/HowItWorksSection'
import InfrastructureSection from './components/sections/InfrastructureSection'
import ProductsSection from './components/sections/ProductsSection'
import SyntheticDollarSection from './components/sections/SyntheticDollarSection'
import SolutionsSection from './components/sections/SolutionsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import NewsSection from './components/sections/NewsSection'
import ContactSection from './components/sections/ContactSection'
import { useProductsData } from './hooks/useProductsData'
import { useSyntheticDollarData } from './hooks/useSyntheticDollarData'

const shouldShowBanknoteSection = (): boolean => {
  if (typeof window === 'undefined') return false

  const value = new URLSearchParams(window.location.search).get('showBanknote')
  if (value === null) return false

  return !['0', 'false', 'no', 'off'].includes(value.trim().toLowerCase())
}

const App = () => {
  const { metrics, vaults, isLoading: isProductsDataLoading } = useProductsData()
  const { data: syntheticDollarData, isLoading: isSyntheticDollarLoading } = useSyntheticDollarData()
  const showHowItWorksSection = shouldShowBanknoteSection()

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)] selection:bg-[var(--color-brand-alt)] selection:text-[var(--color-bg-page)]">
      <Navbar />
      <main>
        <HeroSection metrics={metrics} isMetricsLoading={isProductsDataLoading} />
        <SegmentsSection />
        <EcosystemSection />
        <NarrativeScrollSection />
        {showHowItWorksSection ? <HowItWorksSection /> : null}
        <InfrastructureSection />
        <ProductsSection vaults={vaults} isVaultsLoading={isProductsDataLoading} />
        <SyntheticDollarSection data={syntheticDollarData} isLoading={isSyntheticDollarLoading} />
        <SolutionsSection />
        <TestimonialsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
