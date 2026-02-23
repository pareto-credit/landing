export type LegalDocumentType = 'terms' | 'privacy'

export interface LegalDocumentConfig {
  title: string
  sourceUrl: string
  sectionSelector: string
  loadingLabel: string
}

export const LEGAL_DOCUMENTS: Record<LegalDocumentType, LegalDocumentConfig> = {
  terms: {
    title: 'Terms of Service',
    sourceUrl: 'https://pareto.credit/terms-of-service/',
    sectionSelector: '.tos-section',
    loadingLabel: 'Loading terms...',
  },
  privacy: {
    title: 'Privacy Policy',
    sourceUrl: 'https://pareto.credit/privacy-policy/',
    sectionSelector: '.privacy-policy',
    loadingLabel: 'Loading privacy policy...',
  },
}
