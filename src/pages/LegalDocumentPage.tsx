import { Link } from '@tanstack/react-router'
import { LEGAL_DOCUMENTS, type LegalDocumentType } from '../data/legalDocuments'
import { useLegalDocument } from '../hooks/useLegalDocument'

interface LegalDocumentPageProps {
  documentType: LegalDocumentType
}

const LegalDocumentPage = ({ documentType }: LegalDocumentPageProps) => {
  const config = LEGAL_DOCUMENTS[documentType]
  const { content, isLoading, hasError } = useLegalDocument(config)

  return (
    <main className="mx-auto w-[min(1024px,calc(100vw-2rem))] py-8 pb-16">
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-[#70B19E]"
        >
          Back to Home
        </Link>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
        {isLoading ? (
          <p className="text-sm text-gray-400">{config.loadingLabel}</p>
        ) : null}

        {hasError ? (
          <div className="space-y-3 text-sm text-gray-300">
            <p>Unable to load this document right now.</p>
            <a
              href={config.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.12em] text-[#70B19E] hover:underline"
            >
              Open original {config.title}
            </a>
          </div>
        ) : null}

        {!isLoading && !hasError && content ? (
          <article className="legal-content" dangerouslySetInnerHTML={{ __html: content }} />
        ) : null}
      </section>
    </main>
  )
}

export default LegalDocumentPage
