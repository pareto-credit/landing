import type { PersonaId } from "../components/sections/studio/studioDeskData";
import type { ContactInterest } from "./brand";

export type PersonaPageId = "originators" | "capital-providers";
export type PersonaPath = "/ecosystem/originators" | "/ecosystem/capital-providers";

export interface PersonaProblem {
  /** Short mono label naming the area the friction sits in. */
  signal: string;
  title: string;
  copy: string;
}

export interface PersonaComparisonRow {
  topic: string;
  traditional: string;
  pareto: string;
}

export interface PersonaStep {
  title: string;
  copy: string;
}

export interface PersonaPageContent {
  id: PersonaPageId;
  path: PersonaPath;
  /** Label and one-liner used in the Ecosystem menu. */
  navLabel: string;
  navDescription: string;
  eyebrow: string;
  title: string;
  titleMuted: string;
  intro: string;
  audience: string[];
  primaryCta: { label: string; interest: ContactInterest };
  secondaryCta: { label: string; interest?: ContactInterest; hash?: string };
  desk: PersonaId;
  problem: { title: string; titleMuted: string; description: string; items: PersonaProblem[] };
  comparison: { title: string; titleMuted: string; description: string; rows: PersonaComparisonRow[] };
  steps: { title: string; titleMuted: string; description: string; items: PersonaStep[] };
  /** Testimonial author names from `testimonialList`, in display order. */
  testimonials: string[];
  closing: { title: string; titleMuted: string; copy: string };
  disclaimer?: string;
}

export const personaPages: PersonaPageContent[] = [
  {
    id: "originators",
    path: "/ecosystem/originators",
    navLabel: "Originators",
    navDescription: "Borrowers and underwriters raising and running credit facilities.",
    eyebrow: "Originators",
    title: "Raise a facility.",
    titleMuted: "Run it from one desk.",
    intro:
      "Structure terms in Pareto Studio, reach institutional and DeFi lenders, and service every draw and repayment onchain, whether you borrow for your own book or underwrite for others.",
    audience: ["Credit funds", "Trading firms", "Fintech lenders", "Underwriters & curators"],
    primaryCta: { label: "Raise a facility", interest: "Borrowing" },
    secondaryCta: { label: "Curate on Pareto", interest: "Underwriting" },
    desk: "borrow",
    problem: {
      title: "Credit facilities still run",
      titleMuted: "on email and spreadsheets.",
      description:
        "Raising and servicing a facility means weeks of back-and-forth with a short list of lenders, then every cycle reconciled by hand.",
      items: [
        {
          signal: "Distribution",
          title: "A short list of lenders",
          copy: "Your lender base is whoever your arranger can call. Every new facility starts the outreach again.",
        },
        {
          signal: "Operations",
          title: "Servicing by hand",
          copy: "Draws, interest, borrowing-base updates and repayments are reconciled across email, PDFs and spreadsheets.",
        },
        {
          signal: "Reporting",
          title: "Reports lenders can't verify",
          copy: "Lenders get monthly packs they have to take on trust, so the diligence questions never stop.",
        },
        {
          signal: "Compliance",
          title: "Compliance bolted on",
          copy: "KYC, lender permissions and legal terms sit in systems separate from the money they govern.",
        },
      ],
    },
    comparison: {
      title: "Same credit discipline.",
      titleMuted: "Less operational drag.",
      description: "The legal agreement and the curator stay. The manual work around them moves into Studio and onchain.",
      rows: [
        {
          topic: "Lender access",
          traditional: "Your arranger's network",
          pareto: "Institutional and DeFi lenders, plus distribution on Morpho and Pendle",
        },
        {
          topic: "Facility setup",
          traditional: "Bespoke documents and accounts per deal",
          pareto: "A dedicated Credit Vault per facility, governed by the loan agreement, with standard legal templates",
        },
        {
          topic: "Lender onboarding",
          traditional: "Manual KYC, lender by lender",
          pareto: "Built-in KYC/KYB with permissioned access",
        },
        {
          topic: "Draws and repayments",
          traditional: "Wires and manual reconciliation",
          pareto: "Executed and recorded onchain, visible to every lender",
        },
        {
          topic: "Interest and cycles",
          traditional: "Calculated in spreadsheets",
          pareto: "Programmatic cycles or a revolving limit, set in Studio",
        },
        {
          topic: "Lender reporting",
          traditional: "Monthly PDFs",
          pareto: "Live positions and onchain lender dashboards",
        },
      ],
    },
    steps: {
      title: "From diligence",
      titleMuted: "to distribution.",
      description: "Five stages, one workflow in Pareto Studio.",
      items: [
        { title: "Diligence", copy: "Borrower review and KYB by the facility's curator: your team, or NorthBridge." },
        { title: "Structure", copy: "Terms, collateral rules, rate model, and cycles or a revolving limit." },
        { title: "Launch", copy: "A dedicated Credit Vault goes live with permissioned, KYC'd lenders." },
        { title: "Operate", copy: "Draws, repayments, margin calls and lender reporting, run onchain." },
        { title: "Distribute", copy: "List on Pareto, extend to Morpho and Pendle, or run it under your own brand." },
      ],
    },
    testimonials: ["Bob Rutherford", "Thibault Labidi", "Han Chang"],
    closing: {
      title: "Bring us",
      titleMuted: "a facility.",
      copy: "Tell us what you're raising or underwriting. We'll suggest the structure and the plan that fit.",
    },
  },
  {
    id: "capital-providers",
    path: "/ecosystem/capital-providers",
    navLabel: "Capital providers",
    navDescription: "Funds, treasuries and DeFi allocators lending to permissioned facilities.",
    eyebrow: "Capital providers",
    title: "Lend to real credit.",
    titleMuted: "See every position onchain.",
    intro:
      "Allocate to permissioned credit facilities with a named curator, terms governed by a loan agreement, and positions you can verify as they move.",
    audience: ["Funds & asset managers", "Treasuries", "DeFi allocators", "Vault curators"],
    primaryCta: { label: "Start lending", interest: "Lending" },
    secondaryCta: { label: "See live vaults", hash: "products" },
    desk: "allocate",
    problem: {
      title: "Private credit asks lenders",
      titleMuted: "to trust a monthly PDF.",
      description: "The yield is there. Visibility, isolation and liquidity usually aren't.",
      items: [
        {
          signal: "Visibility",
          title: "Yesterday's picture",
          copy: "Positions arrive in monthly reports, after the fact, in documents you can't verify independently.",
        },
        {
          signal: "Isolation",
          title: "Shared exposure",
          copy: "Pooled vehicles mean one borrower's problem can reach every lender in the pool.",
        },
        {
          signal: "Liquidity",
          title: "Capital locked in",
          copy: "Long lockups and no secondary market make it hard to rebalance when strategies change.",
        },
        {
          signal: "Onboarding",
          title: "Paperwork per facility",
          copy: "Every new facility brings new documents, new checks and a new reporting format.",
        },
      ],
    },
    comparison: {
      title: "Institutional credit.",
      titleMuted: "Onchain transparency.",
      description: "The safeguards credit committees expect, with positions you can check yourself.",
      rows: [
        {
          topic: "Visibility",
          traditional: "Monthly or quarterly reports",
          pareto: "Live positions, draws and repayments onchain",
        },
        {
          topic: "Risk isolation",
          traditional: "Pooled vehicles",
          pareto: "One Credit Vault per facility, with isolated accounting",
        },
        {
          topic: "Oversight",
          traditional: "Manager discretion",
          pareto: "A named curator accountable for each facility",
        },
        {
          topic: "Legal terms",
          traditional: "Fund documents and side letters",
          pareto: "A loan agreement per facility; code enforces its terms",
        },
        {
          topic: "Liquidity",
          traditional: "Lockups, no secondary market",
          pareto: "Cycle-based entry and exit; positions can extend into Morpho and Pendle",
        },
        {
          topic: "Onboarding",
          traditional: "Separate paperwork per facility",
          pareto: "Built-in KYC/KYB and permissioned access in the Pareto app",
        },
      ],
    },
    steps: {
      title: "From verified",
      titleMuted: "to allocated.",
      description: "How lending on Pareto works.",
      items: [
        { title: "Get verified", copy: "Complete KYC/KYB in the Pareto app to access permissioned facilities." },
        { title: "Review", copy: "Check each facility's terms, curator, borrower profile and live performance." },
        { title: "Allocate", copy: "Deposit into the facility's Credit Vault during an open cycle." },
        { title: "Track", copy: "Interest accrues each cycle; positions and repayments are visible as they happen." },
        { title: "Exit or extend", copy: "Withdraw at the end of a cycle, or use the position in DeFi venues such as Morpho and Pendle." },
      ],
    },
    testimonials: ["Adam Bilko", "Carson Brown"],
    closing: {
      title: "Put capital",
      titleMuted: "to work in real credit.",
      copy: "Tell us what you allocate and how. We'll walk you through the live facilities and onboarding.",
    },
    disclaimer:
      "Lending involves credit risk, including the risk of losing principal. Curation does not guarantee repayment. Nothing on this page is an offer or solicitation to lend or invest.",
  },
];

export const getPersonaPage = (id: PersonaPageId) => {
  const page = personaPages.find((item) => item.id === id);
  if (!page) throw new Error(`Unknown persona page: ${id}`);
  return page;
};
