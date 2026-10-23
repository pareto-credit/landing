import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME, NORTHBRIDGE_URL, type ContactInterest } from "./brand";

export interface PlanFeature {
  label: string;
  tag?: string;
  explanation?: string;
  /** Part of the label to render as an external link. */
  link?: { text: string; href: string };
}

export interface Plan {
  id: "core" | "pro" | "white-glove";
  name: string;
  byline?: string;
  subtitle?: string;
  description: string;
  overviewContext: string;
  cta: string;
  contactInterest: ContactInterest;
  inheritsFrom?: string;
  features: PlanFeature[];
}

const CURATOR_EXPLANATION =
  "NorthBridge acts as curator under its own agreements. Curation does not guarantee repayment; credit risk remains with lenders.";

const WHITE_LABEL_EXPLANATION =
  "Need it under your own brand? A white-label lender app is available on Pro and White-Glove.";

export const plans: Plan[] = [
  {
    id: "core",
    name: "Core",
    subtitle: "Self-serve",
    description:
      "Self-serve access to Pareto Studio to structure, launch and run credit facilities.",
    overviewContext: "Your team sets the terms and runs the facility, with standard legal templates and built-in lender KYC/KYB.",
    cta: "Request access",
    contactInterest: "Pareto Studio (Core)",
    features: [
      { label: "Pareto Studio access" },
      { label: "Credit Vault deployment, term or revolving" },
      { label: `${MCP_PRODUCT_NAME} read access`, tag: "Early access" },
      { label: "Built-in lender KYC/KYB" },
      { label: "Onchain reporting and lender dashboards" },
      { label: "Standard legal templates" },
      { label: "Listing on the Pareto app, after review" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "Guided launch",
    description:
      "A guided launch with AI credit assessment, priority support and distribution across DeFi, for teams scaling a credit program.",
    overviewContext: "Get structuring and launch guidance, a dedicated support channel, and distribution on Morpho and Pendle.",
    cta: "Talk to us",
    contactInterest: "Pro plan",
    inheritsFrom: "Core",
    features: [
      { label: `${AI_PRODUCT_NAME} credit assessment`, tag: "Beta" },
      { label: "Priority support, dedicated channel" },
      { label: "Structuring and launch guidance" },
      { label: "DeFi distribution on Morpho and Pendle" },
      { label: "Leverage and exit-liquidity partners" },
      { label: "Multichain deployment" },
      { label: "Co-marketing at launch" },
      { label: "White-label lender app available", explanation: WHITE_LABEL_EXPLANATION },
    ],
  },
  {
    id: "white-glove",
    name: "White-Glove",
    byline: "by NorthBridge",
    description:
      "NorthBridge underwrites and runs the facility end to end, as its named, accountable curator.",
    overviewContext: CURATOR_EXPLANATION,
    cta: "Talk to NorthBridge",
    contactInterest: "White-Glove by NorthBridge",
    inheritsFrom: "Pro",
    features: [
      {
        label: "NorthBridge as named curator",
        link: { text: "NorthBridge", href: NORTHBRIDGE_URL },
        explanation: CURATOR_EXPLANATION,
      },
      { label: "Borrower due diligence and KYB" },
      { label: "Facility terms and legal documentation" },
      { label: "Cycle operations and repayment monitoring" },
      { label: "Collateral and covenant monitoring" },
      { label: "Acts for lenders on events of default" },
      { label: "White-label lender app available", explanation: WHITE_LABEL_EXPLANATION },
    ],
  },
];
