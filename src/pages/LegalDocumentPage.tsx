import { useNavigate } from "@tanstack/react-router";
import { getLegalPageReturnScroll } from "../lib/legalPageScroll";

interface LegalDocumentPageProps {
  content: string;
}

const LegalDocumentPage = ({ content }: LegalDocumentPageProps) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    if (getLegalPageReturnScroll() !== null) {
      void navigate({ to: "/", resetScroll: false });
      return;
    }

    void navigate({ to: "/" });
  };

  return (
    <main className="mx-auto w-[min(1024px,calc(100vw-2rem))] py-8 pb-16">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={handleBackToHome}
          className="border-0 bg-transparent p-0 font-mono text-xs uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-[#70B19E]"
        >
          Back to Home
        </button>
      </div>

      <section className="ui-radius-panel border border-white/10 bg-white/[0.02] p-6 md:p-8">
        <article
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
    </main>
  );
};

export default LegalDocumentPage;
