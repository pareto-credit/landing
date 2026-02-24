import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import SegmentsSection from './components/sections/SegmentsSection'
import ClientsServicesSection from './components/sections/ClientsServicesSection'
import NarrativeScrollSection from './components/sections/NarrativeScrollSection'
import ProductsSection from './components/sections/ProductsSection'
import SolutionsSection from './components/sections/SolutionsSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import NewsSection from './components/sections/NewsSection'
import ContactSection from './components/sections/ContactSection'
import { useProductsData } from './hooks/useProductsData'

const App = () => {
  const { metrics, vaults, isLoading: isProductsDataLoading } = useProductsData()

  return (
    <div className="min-h-screen overflow-x-clip bg-[#081912] font-sans text-white selection:bg-[#70B19E] selection:text-[#081912]">
      <Navbar />
      <main>
        <HeroSection metrics={metrics} isMetricsLoading={isProductsDataLoading} />
        <SegmentsSection />
        <ClientsServicesSection />
        <NarrativeScrollSection />
        <ProductsSection vaults={vaults} isVaultsLoading={isProductsDataLoading} />
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
