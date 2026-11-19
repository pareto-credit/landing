import type { ContactInterest } from "./brand";
import { collateralQuestion } from "./collateral";
import {
  capitalAllocatorVaultAnatomy,
  vaultAnatomy,
  type VaultAnatomyContent,
} from "./vaultAnatomy";

export type PersonaPageId = "originators" | "capital-providers";
export type PersonaPath = "/originators" | "/capital-providers";
export interface PersonaPageContent {
  id: PersonaPageId;
  path: PersonaPath;
  navLabel: string;
  navDescription: string;
  title: string;
  titleMuted: string;
  intro: string;
  heroCta: { label: string; to: "/" | "/studio"; hash?: "products" };
  benefits: {
    title: string;
    titleMuted?: string;
    intro: string;
    items: Array<{ label: string; title: string; copy: string }>;
  };
  framework: VaultAnatomyContent;
  frameworkCta: { label: string; interest: ContactInterest };
  questions: Array<{ question: string; answer: string }>;
  closing: {
    title: string;
    titleMuted?: string;
    copy: string;
    cta: string;
    interest: ContactInterest;
  };
  disclaimer?: string;
}

export const personaPages: PersonaPageContent[] = [
  {
    id: "originators",
    path: "/originators",
    navLabel: "Originators",
    navDescription: "Establish, operate and grow credit facilities.",
    title: "Financing built around",
    titleMuted: "your business",
    intro:
      "Connect with institutional and onchain capital through credit infrastructure built around your business.",
    heroCta: { label: "Explore Pareto Studio", to: "/studio" },
    benefits: {
      title: "A foundation for growth",
      titleMuted: "for growth",
      intro:
        "The infrastructure to establish your credit program and help it grow.",
      items: [
        {
          label: "Facility design",
          title: "Flexible structuring",
          copy: "Shape facility mechanics, participation and reporting around your financing needs.",
        },
        {
          label: "Funding",
          title: "Broader capital access",
          copy: "Connect with institutional and onchain lenders, subject to facility eligibility.",
        },
        {
          label: "Servicing",
          title: "Coordinated operations",
          copy: "Connect facility setup, lender onboarding and onchain servicing.",
        },
        {
          label: "Market reach",
          title: "Distribution opportunities",
          copy: "Explore branded access and supported DeFi integrations.",
        },
      ],
    },
    framework: vaultAnatomy,
    frameworkCta: {
      label: "Discuss your facility",
      interest: "Borrowing",
    },
    questions: [
      {
        question: "Who provides the financing?",
        answer:
          "Participating lenders provide the capital. Pareto supplies the infrastructure; access to financing depends on lender interest, eligibility and the terms of the facility.",
      },
      {
        question: "Who is responsible for underwriting?",
        answer:
          "The appointed underwriter or curator assesses the borrower and carries out the responsibilities agreed for the facility. Your team may take this role, or you can discuss curation support through NorthBridge.",
      },
      {
        question: "What can be configured?",
        answer:
          "Supported options include facility mechanics, participation permissions, servicing parameters and reporting. The configuration must reflect the agreed terms and the capabilities of the selected implementation.",
      },
      {
        question: "What support does Pareto provide?",
        answer:
          "Depending on the engagement, support can include Studio access, facility setup, launch guidance, distribution integrations and a branded lender application. Curation is a distinct service with its own scope.",
      },
      {
        question: "How are fees determined?",
        answer:
          "Fees depend on the infrastructure, support and curation services required. Our team can provide a proposal after discussing the facility and the intended operating model.",
      },
      {
        question: "What is recorded onchain?",
        answer:
          "The vault records its onchain operations and positions. Borrower financials, offchain assets and legal enforcement require separate information and processes.",
      },
      collateralQuestion,
    ],
    closing: {
      title: "Let’s build around your business",
      titleMuted: "around your business",
      copy: "Tell us about your financing needs and the credit program you want to develop.",
      cta: "Talk to us",
      interest: "Borrowing",
    },
  },
  {
    id: "capital-providers",
    path: "/capital-providers",
    navLabel: "Capital Allocators",
    navDescription: "Assess, access and oversee credit exposure.",
    title: "A broader perspective",
    titleMuted: "on credit",
    intro:
      "Explore credit opportunities, review facility terms and follow onchain activity in one connected experience.",
    heroCta: { label: "Explore live vaults", to: "/", hash: "products" },
    benefits: {
      title: "A clearer view of credit",
      titleMuted: "of credit",
      intro:
        "From your first review to ongoing oversight.",
      items: [
        {
          label: "Mandate fit",
          title: "Facility selection",
          copy: "Find opportunities that fit your mandate, eligibility and liquidity needs.",
        },
        {
          label: "Accountability",
          title: "Named participants",
          copy: "Know the borrower, curator and each party’s documented responsibilities.",
        },
        {
          label: "Due diligence",
          title: "Documented terms",
          copy: "Review pricing, credit support and withdrawal terms in each facility’s agreements.",
        },
        {
          label: "Monitoring",
          title: "Onchain activity",
          copy: "Follow positions and transactions alongside borrower and curator reporting.",
        },
      ],
    },
    framework: capitalAllocatorVaultAnatomy,
    frameworkCta: { label: "Discuss your allocation", interest: "Lending" },
    questions: [
      {
        question: "Who can participate?",
        answer:
          "Eligibility is determined per facility and jurisdiction. Participation may require professional or accredited investor status, KYC/KYB, documentation and approval by the relevant parties.",
      },
      {
        question: "What should I review before allocating?",
        answer:
          "Review the facility documents, borrower information, curator responsibilities, applicable credit support, fees, return basis and withdrawal terms. The public overview is a starting point for this assessment.",
      },
      {
        question: "When can I withdraw?",
        answer:
          "Notice periods, request windows and settlement conditions differ by facility. A monthly or weekly cycle is not a promise of payment on that schedule. Review the relevant documents and current facility information.",
      },
      {
        question: "What happens if a borrower fails to repay?",
        answer:
          "The applicable agreements and facility mechanics determine the default and recovery process. Recovery may take time and may not cover the full amount owed; investors can lose principal.",
      },
      {
        question: "What information is visible onchain?",
        answer:
          "Onchain records show vault positions and transactions. Borrower financials, offchain collateral and other underlying exposures depend on separate reporting and verification.",
      },
      {
        question: "Can positions be used in other applications?",
        answer:
          "Some facilities support integrations with venues such as Morpho or Pendle. Availability, eligibility, market depth and risks depend on the position and venue; these integrations do not guarantee liquidity.",
      },
      collateralQuestion,
    ],
    closing: {
      title: "Find the right starting point",
      titleMuted: "starting point",
      copy: "Discuss your allocation requirements or explore the facilities available on Pareto.",
      cta: "Talk to us",
      interest: "Lending",
    },
    disclaimer:
      "Lending involves credit risk, including the risk of losing principal. Curation does not guarantee repayment. Information on this page is not an offer or solicitation to lend or invest.",
  },
];

export const getPersonaPage = (id: PersonaPageId): PersonaPageContent => {
  const page = personaPages.find((item) => item.id === id);
  if (!page) throw new Error(`Unknown persona page: ${id}`);
  return page;
};
