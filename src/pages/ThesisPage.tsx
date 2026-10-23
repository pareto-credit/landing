import ThesisIndex from "../components/sections/thesis/ThesisIndex";
import ThesisSections from "../components/sections/thesis/ThesisSections";
import "../components/sections/thesis/thesis.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { SectionContainer } from "../components/ui/Section";
import { useProductsData } from "../hooks/useProductsData";

const ThesisPage = () => {
  const { metrics, isLoading } = useProductsData();

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main className="thesis-main">
        <section
          id="hero"
          className="relative overflow-hidden bg-[var(--color-bg-light-alt)] text-[var(--color-text-primary)]"
        >
          <SectionContainer className="thesis-hero">
            <div className="thesis-hero__eyebrow">Thesis</div>
            <div className="thesis-hero__layout">
              <h1 id="hero-title" tabIndex={-1}>
                Credit is moving onchain.
                <span>Underwriting decides how fast.</span>
              </h1>
              <div className="thesis-hero__intro">
                <p>
                  Private credit still runs on PDFs, email threads and spreadsheets.
                  Onchain rails improve settlement and transparency, but underwriting
                  needs someone to diligence the borrower, set the terms and stand
                  behind the facility. Pareto is built around that job.
                </p>
              </div>
            </div>
            <ThesisIndex />
          </SectionContainer>
        </section>

        <ThesisSections
          creditServiced={metrics.creditExtended}
          activeLoans={metrics.outstandingLoans}
          isLoading={isLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ThesisPage;
