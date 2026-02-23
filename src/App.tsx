import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import SegmentsSection from './components/sections/SegmentsSection'
import ClientsServicesSection from './components/sections/ClientsServicesSection'
import NarrativeScrollSection from './components/sections/NarrativeScrollSection'
import ProductsSection from './components/sections/ProductsSection'
import SolutionsSection from './components/sections/SolutionsSection'
import NewsSection from './components/sections/NewsSection'
import ContactSection from './components/sections/ContactSection'

const App = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#081912] font-sans text-white selection:bg-[#70B19E] selection:text-[#081912]">
      <Navbar />
      <main>
        <HeroSection />
        <SegmentsSection />
        <ClientsServicesSection />
        <NarrativeScrollSection />
        <ProductsSection />
        <SolutionsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
