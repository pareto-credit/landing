import type { ContactInterest } from "./brand";
import { collateralQuestion } from "./collateral";

export type PersonaPageId = "originators" | "capital-providers";
export type PersonaPath = "/originators" | "/capital-providers";
export interface FrameworkItem {
  id: string;
  /** Marks the opening and closing views that frame the numbered parts. */
  kind?: "intro" | "overview";
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
  heroCta: { label: string; to: "/" | "/studio"; hash?: "products" };
  benefits: {
    title: string;
    titleMuted?: string;
    intro: string;
    items: Array<{ label: string; title: string; copy: string }>;
  };
  framework: { title: string; titleMuted?: string; intro?: string; items: FrameworkItem[] };
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
    framework: {
      title: "Anatomy of a vault",
      titleMuted: "a vault",
      items: [
        {
          id: "vault",
          kind: "intro",
          title: "The vault",
          summary: "What sits behind a vault",
          detail:
            "Follow capital from lender deposit to borrower funding and back. Explore what the vault records onchain and what the credit agreements govern.",
          points: [],
        },
        {
          id: "deposit",
          title: "Deposits & shares",
          summary: "How capital enters the vault",
          detail:
            "Eligible lenders deposit the asset specified by the facility. When the deposit is processed, the vault issues share tokens at the applicable share price. Those tokens represent the lender’s position in the vault.",
          points: [
            ["Participation", "Facility eligibility and KYC/KYB"],
            ["Onchain record", "Asset deposited and shares issued"],
          ],
        },
        {
          id: "facility",
          title: "Credit facility",
          summary: "How the borrower receives funding",
          detail:
            "The vault makes capital available to the approved borrower under the facility’s terms. The agreed structure determines when the borrower can draw funds, how interest is calculated and when repayment is due.",
          points: [
            ["Facility design", "Asset, facility size, rate and repayment terms"],
            ["Funding", "Term cycles or revolving draws, where supported"],
          ],
        },
        {
          id: "oversight",
          title: "Credit oversight",
          summary: "Who assesses and monitors the credit",
          detail:
            "The appointed underwriter or curator assesses the borrower and monitors the exposure under the facility agreements. Those agreements set out any collateral, guarantees, covenants and reporting duties that apply.",
          points: [
            ["Responsible party", "The originator’s team or an appointed curator"],
            ["Credit support", "Collateral or other support, where agreed"],
          ],
        },
        {
          id: "value",
          title: "Share value",
          summary: "What changes the value of a share",
          detail:
            "Interest accrues under the credit agreement and is reflected in the vault’s share price. Applicable fees and credit losses can reduce what a lender receives. The share price tracks the value of the position, while available liquidity governs what can settle.",
          points: [
            ["Accounting", "Accrued interest, applicable fees and losses"],
            ["Lender position", "Number of shares and applicable share price"],
          ],
        },
        {
          id: "settlement",
          title: "Repayment & exit",
          summary: "How funds return to lenders",
          detail:
            "The borrower repays principal and interest according to the agreement. Lenders request a withdrawal under the vault’s rules and can claim funds once the request settles. Timing depends on notice periods, repayment and available liquidity.",
          points: [
            ["Borrower obligation", "Repayment on the agreed schedule"],
            ["Lender exit", "Request, settlement and claim"],
          ],
        },
        {
          id: "reporting",
          title: "Records & reporting",
          summary: "What you can verify",
          detail:
            "Vault contracts record activity such as share issuance, draws and repayments onchain. Borrower financials, collateral held offchain and covenant monitoring are covered by the reporting and access arrangements agreed for each facility.",
          points: [
            ["Onchain", "Vault contract activity and balances"],
            ["Offchain", "Credit agreements and required disclosures"],
          ],
        },
        {
          id: "anatomy",
          kind: "overview",
          title: "Full anatomy",
          summary: "Six parts, one vault",
          detail:
            "Each layer connects what the vault records onchain with what the credit agreements govern. Select a layer to look at it again.",
          points: [],
        },
      ],
    },
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
    framework: {
      title: "Understand every layer",
      titleMuted: "every layer",
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
