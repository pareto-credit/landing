import { collateralQuestion } from "./collateral";

export type ProductPageId = "credit-vaults" | "studio";

export const productQuestions: Record<
  ProductPageId,
  Array<{ question: string; answer: string }>
> = {
  "credit-vaults": [
    collateralQuestion,
    {
      question: "What is a Credit Vault?",
      answer:
        "A configurable onchain facility that brings a borrower, lenders and the agreed credit terms into one operating framework. Each facility has its own asset, accounting, eligibility requirements and documentation.",
    },
    {
      question: "Which credit structures can I build?",
      answer:
        "Term facilities and revolving lines provide the starting mechanics. Collateral arrangements, account controls, receivables, guarantees and reporting are selected around the underlying credit use case. The final setup depends on underwriting, integrations and the facility’s agreements.",
    },
    {
      question: "Can I combine different modules?",
      answer:
        "The facility can be configured with eligibility, rate and cycle settings, liquidity features, and optional risk or servicing arrangements. Compatibility is reviewed during setup; the diagram illustrates design choices rather than a promise that every combination is available.",
    },
    {
      question: "Who makes the credit decisions?",
      answer:
        "The appointed underwriter or facility team assesses the borrower and sets the terms. Pareto supplies the infrastructure; Cura AI is an assessment companion, and neither software nor curation guarantees repayment.",
    },
    {
      question: "Can I query a vault through an AI agent?",
      answer:
        "Pareto MCP provides read-only access to supported vault, performance and activity data. Operational execution is a future extension. Access and data coverage depend on the facilities and permissions available to you.",
    },
    {
      question: "How are pricing and lender withdrawals determined?",
      answer:
        "Core, Pro and White-Glove offer different levels of infrastructure and support. Commercial terms are quoted for your setup. Lender exits follow each facility’s notice, cycle and settlement conditions; a withdrawal request does not imply immediate liquidity.",
    },
  ],
  studio: [
    collateralQuestion,
    {
      question: "Who is Pareto Studio for?",
      answer:
        "Studio is designed for credit teams structuring and operating facilities, with dedicated views for underwriters, borrowers and lenders. Access is approved for the relevant organizations and roles.",
    },
    {
      question: "How does Studio relate to Credit Vaults?",
      answer:
        "Credit Vaults provide the onchain facility framework. Studio is the shared operating environment used to configure, launch and follow those facilities across the credit lifecycle.",
    },
    {
      question: "Can our team retain control of the facility?",
      answer:
        "Yes. Core is designed for teams running their own facilities. Pro adds launch guidance and support. White-Glove by NorthBridge provides a separately engaged curator to underwrite and run the facility under its own agreements.",
    },
    {
      question: "How do AI agents fit into Studio?",
      answer:
        "Pareto MCP connects supported data to your existing agent workflows. The roadmap adds prepared operational actions for review and approval. Cura AI supports credit assessment; the appointed team remains responsible for credit decisions.",
    },
    {
      question: "Can the lender experience use our brand?",
      answer:
        "A white-label lender app is available with Pro and White-Glove. Scope, supported integrations and deployment requirements are agreed during setup.",
    },
    {
      question: "How do we get started, and what does it cost?",
      answer:
        "Start with a conversation about your facility, team and operating requirements. We will help you select Core, Pro or White-Glove and provide the commercial terms for your setup.",
    },
  ],
};
