import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME } from "./brand";

export interface ThesisStat {
  value: string;
  label: string;
  source: string;
  url: string;
}

/** Third-party market figures. Update values and dates together. */
export const thesisStats: ThesisStat[] = [
  {
    value: ">$2T",
    label: "Private credit assets under management expected in 2026, approaching $4T by 2030.",
    source: "Moody's, Private credit 2026 outlook",
    url: "https://www.moodys.com/web/en/us/insights/credit-risk/outlooks/private-credit-2026.html",
  },
  {
    value: "$301B",
    label: "Stablecoins in circulation: onchain dollars looking for real-economy yield.",
    source: "DefiLlama, as of Oct 20, 2026",
    url: "https://defillama.com/stablecoins",
  },
  {
    value: "$38B",
    label: "Tokenized credit represented onchain, still a small fraction of the private credit market.",
    source: "rwa.xyz, as of Oct 20, 2026",
    url: "https://app.rwa.xyz/credit",
  },
];

export const thesisConstraints = [
  {
    title: "Underwriting doesn't scale",
    copy: "Every facility needs diligence, terms and ongoing oversight. Good underwriters run out of bandwidth long before lenders run out of capital.",
  },
  {
    title: "Operations are manual",
    copy: "Drawdowns, interest, covenants and lender reporting are reconciled by hand across email, PDFs and spreadsheets.",
  },
  {
    title: "Reporting arrives late",
    copy: "Lenders see their positions monthly, after the fact, in documents they cannot verify independently.",
  },
  {
    title: "Compliance is bolted on",
    copy: "KYC, lender permissions and legal terms live in systems that are separate from the money they govern.",
  },
  {
    title: "Distribution is siloed",
    copy: "A facility's lenders are whoever the arranger can call. There is no shared market for the paper once it exists.",
  },
];

export const thesisSafeguards = [
  {
    title: "Legal agreement first",
    copy: "Every facility is governed by a loan agreement. Code enforces what the contract says; it doesn't replace it.",
  },
  {
    title: "Permissioned lenders",
    copy: "Only KYC'd, approved lenders can deposit, and the borrower can decide who it accepts.",
  },
  {
    title: "Isolated facilities",
    copy: "Each facility is its own vault with its own accounting, so one borrower's problems stay in one place.",
  },
  {
    title: "Programmatic servicing",
    copy: "Cycles, interest, draws, repayments and withdrawals run onchain on a schedule everyone can see.",
  },
  {
    title: "Real-time transparency",
    copy: "Positions and repayments are visible as they happen, not reconstructed in a monthly report.",
  },
  {
    title: "Composable distribution",
    copy: "Facility positions can extend into DeFi venues such as Morpho and Pendle, widening the lender base.",
  },
];

export const thesisStages = [
  { title: "Originate", copy: "Borrower diligence, KYB and data-room review, with AI assistance." },
  { title: "Structure", copy: "Terms, collateral rules and cycles or a revolving limit, set in Studio." },
  { title: "Launch", copy: "A dedicated Credit Vault, with permissioned lenders onboarded." },
  { title: "Operate", copy: "Draws, repayments, margin calls and reporting, onchain." },
  { title: "Distribute", copy: "Listed on Pareto, then extended to DeFi venues." },
];

export const thesisRoadmap = [
  {
    name: MCP_PRODUCT_NAME,
    status: "Early access",
    copy: "Agents in Claude, Codex or any MCP client read facility data directly, with no CSV exports.",
  },
  {
    name: "Signed agent actions",
    status: "Next",
    copy: "Agents prepare lender reports and covenant attestations; people sign them in Studio.",
  },
  {
    name: AI_PRODUCT_NAME,
    status: "Coming soon",
    copy: "Pareto's own assessment agent for document review, credit memos and ongoing monitoring.",
  },
];
