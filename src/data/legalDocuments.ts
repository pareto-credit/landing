import privacyPolicyContent from "../content/legal/privacy-policy.html?raw";
import termsOfServiceContent from "../content/legal/terms-of-service.html?raw";

export type LegalDocumentType = "terms" | "privacy";

export interface LegalDocumentConfig {
  content: string;
  sourceUrl: string;
  title: string;
}

export interface LoadedLegalDocument extends LegalDocumentConfig {
  documentType: LegalDocumentType;
}

export const LEGAL_DOCUMENTS: Record<LegalDocumentType, LegalDocumentConfig> = {
  terms: {
    title: "Terms of Service",
    sourceUrl: "https://idle.finance/terms-of-service",
    content: termsOfServiceContent,
  },
  privacy: {
    title: "Privacy Policy",
    sourceUrl: "https://www.iubenda.com/privacy-policy/61211749",
    content: privacyPolicyContent,
  },
};

export const loadLegalDocument = (
  documentType: LegalDocumentType,
): LoadedLegalDocument => ({
  documentType,
  ...LEGAL_DOCUMENTS[documentType],
});
