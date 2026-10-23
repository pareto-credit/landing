import type { ContactInterest } from "./brand";

export interface EcosystemRole {
  id: "borrowers" | "underwriters" | "lenders" | "distribution";
  tone: "dark" | "mint" | "light";
  title: string;
  who: string;
  copy: string;
  gets: string[];
  cta: string;
  interest: ContactInterest;
}

export const ecosystemRoles: EcosystemRole[] = [
  {
    id: "borrowers",
    tone: "dark",
    title: "Borrowers",
    who: "Trading firms, credit funds, fintech lenders",
    copy: "Raise a facility from institutional and DeFi lenders, with terms enforced onchain instead of reconciled by hand.",
    gets: ["Term or revolving facilities", "Draws and repayments in Studio", "Access to a wider lender base"],
    cta: "Raise a facility",
    interest: "Borrowing",
  },
  {
    id: "underwriters",
    tone: "mint",
    title: "Underwriters & curators",
    who: "Credit specialists and asset managers",
    copy: "Diligence borrowers, set terms and oversee facilities with Studio and your own agents. Or let NorthBridge curate for you.",
    gets: ["Curator desk in Studio", "Pareto MCP for your agents", "Earn fees on the facilities you run"],
    cta: "Curate on Pareto",
    interest: "Underwriting",
  },
  {
    id: "lenders",
    tone: "light",
    title: "Lenders",
    who: "Funds, treasuries, DeFi allocators",
    copy: "Allocate to permissioned credit with a named curator, live positions and reporting you can verify onchain.",
    gets: ["KYC'd, permissioned access", "Real-time positions", "Cycle-based liquidity"],
    cta: "Start lending",
    interest: "Lending",
  },
  {
    id: "distribution",
    tone: "dark",
    title: "Distribution partners",
    who: "DeFi protocols, vault curators, platforms",
    copy: "Bring facility positions into lending markets and yield products, or embed Pareto credit under your own brand.",
    gets: ["Morpho and Pendle integrations", "Leverage and exit liquidity", "White-label lender app"],
    cta: "Integrate",
    interest: "Integration",
  },
];

