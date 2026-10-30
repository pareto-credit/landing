import type { ContactInterest } from "./brand";
import { collateralQuestion } from "./collateral";

export type PersonaPageId = "originators" | "capital-providers";
export type PersonaPath = "/originators" | "/capital-providers";
export interface FrameworkItem {
  id: string;
  title: string;
  summary: string;
  detail: string;
  points: Array<[string, string]>;
}
export interface PersonaPageContent {
  id: PersonaPageId;
  path: PersonaPath;
  navLabel: string;
  navDescription: string;
  title: string;
  titleMuted: string;
  intro: string;
  primaryCta: {
    label: string;
    interest?: ContactInterest;
    hash?: string;
    href?: string;
  };
  secondaryCta: {
    label: string;
    interest?: ContactInterest;
    hash?: string;
    home?: boolean;
  };
  benefits: {
    title: string;
    intro: string;
    items: Array<{ title: string; copy: string }>;
  };
  framework: { title: string; intro: string; items: FrameworkItem[] };
  frameworkCta: { label: string; interest: ContactInterest };
  questions: Array<{ question: string; answer: string }>;
  closing: {
    title: string;
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
    titleMuted: "your business.",
    intro:
      "Connect with institutional and onchain capital through credit infrastructure built around your business.",
    primaryCta: {
      label: "Discuss your financing needs",
      interest: "Borrowing",
    },
    secondaryCta: {
      label: "Explore Pareto Studio",
      hash: "studio",
      home: true,
    },
    benefits: {
      title: "A foundation for growth.",
      intro:
        "The infrastructure to establish your credit program and help it grow.",
      items: [
        {
          title: "Flexible structuring",
          copy: "Shape facility mechanics, participation and reporting around your financing needs.",
        },
        {
          title: "Broader capital access",
          copy: "Connect with institutional and onchain lenders, subject to facility eligibility.",
        },
        {
          title: "Coordinated operations",
          copy: "Connect facility setup, lender onboarding and onchain servicing.",
        },
        {
          title: "Distribution opportunities",
          copy: "Explore branded access and supported DeFi integrations.",
        },
      ],
    },
    framework: {
      title: "Build around every layer.",
      intro:
        "Connect the layers your financing program needs.",
      items: [
        {
          id: "application",
          title: "Application",
          summary: "Your credit offering. A connected experience.",
          detail:
            "Run facility operations in Pareto Studio and give eligible lenders access through the Pareto Lender App. Discuss a branded application as your program develops.",
          points: [
            ["Operations", "Pareto Studio"],
            ["Lender experience", "Pareto Lender App"],
            ["Brand", "White-label options where available"],
          ],
        },
        {
          id: "eligibility",
          title: "Eligibility",
          summary: "Bring the right participants together.",
          detail:
            "Establish facility-specific onboarding requirements and configure supported access permissions for approved participants.",
          points: [
            ["Participation", "Facility-specific eligibility"],
            ["Onboarding", "KYC/KYB and required documents"],
            ["Access", "Permissions for approved wallets"],
          ],
        },
        {
          id: "underwriting",
          title: "Underwriting",
          summary: "Credit expertise at the centre.",
          detail:
            "Bring your own underwriting team or discuss curation support through NorthBridge. Credit assessment, monitoring and responsibilities are agreed for each facility.",
          points: [
            ["Expertise", "Your team or an appointed curator"],
            ["Assessment", "Borrower, exposure and credit support"],
            ["Responsibilities", "Defined in the applicable agreements"],
          ],
        },
        {
          id: "terms",
          title: "Credit terms",
          summary: "A facility shaped around the financing need.",
          detail:
            "Agree commercial terms and choose supported facility mechanics in coordination with the borrower and underwriter. Legal rights and credit support are established in the relevant agreements.",
          points: [
            ["Economics", "Asset, rate model and facility size"],
            ["Mechanics", "Term cycles or revolving credit"],
            [
              "Credit support",
              "Collateral, guarantees or other arrangements, where applicable",
            ],
          ],
        },
        {
          id: "servicing",
          title: "Servicing",
          summary: "A connected operating foundation.",
          detail:
            "Coordinate draws, repayments and lender requests through the facility’s supported mechanics. Follow onchain activity alongside the reporting required by the underwriter.",
          points: [
            ["Operations", "Draws, repayments and lender requests"],
            ["Reporting", "Onchain records and separate borrower disclosures"],
            ["Liquidity", "Notice periods and withdrawal procedures"],
          ],
        },
        {
          id: "distribution",
          title: "Distribution",
          summary: "Connect your facility to a wider network.",
          detail:
            "Explore lender access and supported integrations with venues such as Morpho and Pendle. Availability depends on the facility, venue and relevant eligibility requirements.",
          points: [
            ["Access", "Institutional and onchain participants"],
            ["Integrations", "Supported DeFi venues"],
            ["Availability", "Subject to facility and venue requirements"],
          ],
        },
      ],
    },
    frameworkCta: {
      label: "Build your credit infrastructure",
      interest: "Underwriting",
    },
    questions: [
      collateralQuestion,
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
    ],
    closing: {
      title: "Let’s build around your business.",
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
    titleMuted: "on credit.",
    intro:
      "Explore credit opportunities, review facility terms and follow onchain activity in one connected experience.",
    primaryCta: {
      label: "Explore live facilities",
      href: "https://app.pareto.credit/",
    },
    secondaryCta: { label: "Speak with our team", interest: "Lending" },
    benefits: {
      title: "A clearer view of credit.",
      intro:
        "From your first review to ongoing oversight.",
      items: [
        {
          title: "Facility selection",
          copy: "Find opportunities that fit your mandate, eligibility and liquidity needs.",
        },
        {
          title: "Named participants",
          copy: "Know the borrower, curator and each party’s documented responsibilities.",
        },
        {
          title: "Documented terms",
          copy: "Review pricing, credit support and withdrawal terms in each facility’s agreements.",
        },
        {
          title: "Onchain activity",
          copy: "Follow positions and transactions alongside borrower and curator reporting.",
        },
      ],
    },
    framework: {
      title: "Understand every layer.",
      intro:
        "See how access, credit assessment and operations connect.",
      items: [
        {
          id: "application",
          title: "Application",
          summary: "One place to explore and follow credit.",
          detail:
            "Use Pareto’s Lender App to explore available Credit Vaults, review facility information and follow your positions and transaction history.",
          points: [
            ["Discovery", "Available Credit Vaults"],
            ["Portfolio", "Positions and pending requests"],
            ["Records", "Facility and transaction history"],
          ],
        },
        {
          id: "eligibility",
          title: "Eligibility",
          summary: "Access with clear participation requirements.",
          detail:
            "Understand the eligibility criteria for each facility and complete the required onboarding before participating. Access depends on the facility and jurisdiction.",
          points: [
            ["Eligibility", "Facility-specific investor requirements"],
            ["Onboarding", "KYC/KYB and documentation"],
            ["Participation", "Approval by the relevant parties"],
          ],
        },
        {
          id: "underwriting",
          title: "Underwriting",
          summary: "Know who assesses the credit.",
          detail:
            "Identify the borrower and appointed curator, review their responsibilities and understand the information supporting the assessment. Curation does not guarantee repayment.",
          points: [
            ["Counterparty", "Borrower and underlying activity"],
            ["Curator", "Assessment and oversight responsibilities"],
            ["Information", "Diligence and ongoing reporting"],
          ],
        },
        {
          id: "terms",
          title: "Credit terms",
          summary: "Assess the economics in their full context.",
          detail:
            "Evaluate the rate, fees, credit support and agreements for each opportunity. These terms are established by the facility; choose exposure that fits your mandate.",
          points: [
            ["Return basis", "Rates, fees and any temporary incentives"],
            [
              "Credit support",
              "Collateral or other protections, where applicable",
            ],
            ["Documentation", "Rights and responsibilities in the agreements"],
          ],
        },
        {
          id: "servicing",
          title: "Servicing",
          summary: "Follow your position through its lifecycle.",
          detail:
            "Monitor deposits, payments and withdrawal requests. Review notice periods, request windows and settlement conditions before allocating; cycle frequency alone is not a promise of liquidity.",
          points: [
            ["Activity", "Positions and onchain transactions"],
            ["Reporting", "Borrower and curator disclosures"],
            ["Withdrawals", "Facility-specific notice and settlement terms"],
          ],
        },
        {
          id: "distribution",
          title: "Integrations",
          summary: "Explore supported ways to participate.",
          detail:
            "Some positions connect with venues such as Morpho or Pendle. Review availability, eligibility, market depth and venue-specific risks. Integrations do not guarantee liquidity.",
          points: [
            ["Venues", "Supported onchain applications"],
            ["Access", "Position-specific requirements"],
            ["Assessment", "Venue and underlying credit risks"],
          ],
        },
      ],
    },
    frameworkCta: { label: "Discuss your allocation", interest: "Lending" },
    questions: [
      collateralQuestion,
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
    ],
    closing: {
      title: "Find the right starting point.",
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
