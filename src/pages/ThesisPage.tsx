import { ArrowDown } from "lucide-react";
import ThesisSections from "../components/sections/thesis/ThesisSections";
import "../components/sections/thesis/thesis.css";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import { SectionContainer } from "../components/ui/Section";
import { PageLink } from "../components/ui/PageLink";
import ThesisHeroBackground from "../components/sections/thesis/ThesisHeroBackground";

const ThesisPage = () => {
  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--color-bg-page)] font-sans text-[var(--color-text-inverse)]">
      <Navbar />
      <main className="thesis-main">
        <section
          id="hero"
          className="thesis-hero-shell"
          aria-labelledby="hero-title"
        >
          <SectionContainer className="thesis-hero">
            <h1 id="hero-title" tabIndex={-1}>Credit is moving onchain.</h1>
            <PageLink
              to="/thesis"
              hash="structured-credit"
              className="thesis-hero__read"
              onClick={(event) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                window.requestAnimationFrame(() => document.getElementById("structured-credit-title")?.focus({ preventScroll: true }));
              }}
            >
              Read the thesis<ArrowDown size={18} aria-hidden="true" />
            </PageLink>
          </SectionContainer>
          <ThesisHeroBackground />
        </section>

        <ThesisSections />
      </main>
      <Footer />
    </div>
  );
};

export default ThesisPage;
