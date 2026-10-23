import { AI_PRODUCT_NAME, MCP_PRODUCT_NAME, STUDIO_PRODUCT_NAME } from "./brand";

export const thesisChapters = [
  {
    id: "structured-credit",
    group: "The case",
    label: "Structured credit",
    summary: "What it is, and how a facility is built onchain.",
    tag: "Definition",
  },
  {
    id: "constraints",
    group: "The case",
    label: "The constraints",
    summary: "Why private credit still runs on PDFs and phone calls.",
    tag: "Problem",
  },
  {
    id: "opportunity",
    group: "The case",
    label: "The opportunity",
    summary: "A market of more than $2T, with less than 2% onchain.",
    tag: "Market",
  },
  {
    id: "why-pareto",
    group: "Pareto",
    label: "Why Pareto",
    summary: "Familiar safeguards, enforced by code.",
    tag: "Solution",
  },
  {
    id: "roadmap",
    group: "Pareto",
    label: "Roadmap",
    summary: "From live facilities to agents in the loop.",
    tag: "What's next",
  },
] as const;

export type ThesisChapterId = (typeof thesisChapters)[number]["id"];

export interface ThesisStat {
  value: string;
  /** Lower-bound size in billions of USD, used to draw the scale bars. */
  amountBillions: number;
  kicker: string;
  label: string;
  source: string;
  url: string;
}

/** Third-party market figures. Update values, amounts and dates together. */
export const thesisStats: ThesisStat[] = [
  {
    value: ">$2T",
    amountBillions: 2000,
    kicker: "Private credit",
    label: "Private credit assets under management expected in 2026, approaching $4T by 2030.",
    source: "Moody's, Private credit 2026 outlook",
    url: "https://www.moodys.com/web/en/us/insights/credit-risk/outlooks/private-credit-2026.html",
  },
  {
    value: "$301B",
    amountBillions: 301,
    kicker: "Onchain dollars",
    label: "Stablecoins in circulation: onchain dollars looking for real-economy yield.",
    source: "DefiLlama, as of Oct 20, 2026",
    url: "https://defillama.com/stablecoins",
  },
  {
    value: "$38B",
    amountBillions: 38,
    kicker: "Tokenized credit",
    label: "Tokenized credit represented onchain today.",
    source: "rwa.xyz, as of Oct 20, 2026",
    url: "https://app.rwa.xyz/credit",
  },
];

/** The parties around one facility, drawn in chapter 01. */
export const thesisAnatomy = {
  curator: { title: "Curator", copy: "Diligence, terms and ongoing oversight" },
  borrower: { title: "Borrower", copy: "Credit fund, trading firm or fintech lender" },
  vault: { title: "Credit Vault", copy: "One per facility, governed by the loan agreement" },
  lenders: { title: "Lenders", copy: "KYC'd institutions and DeFi allocators" },
  distribution: { title: "DeFi distribution", copy: "Positions extend to Morpho and Pendle" },
  flows: {
    curator: "Approves and oversees",
    borrower: "Draws · repays",
    lenders: "Deposit · earn interest",
    distribution: "Composable positions",
  },
} as const;

/** How the parts of a traditional facility map onto Pareto. */
export const thesisMapping = [
  {
    traditional: "Loan agreement",
    pareto: "Legal agreement first",
    copy: "Every facility is governed by a loan agreement. Code enforces what the contract says; it doesn't replace it.",
  },
  {
    traditional: "Ring-fenced facility",
    pareto: "One Credit Vault per facility",
    copy: "Each facility has its own vault and accounting, so one borrower's problems stay in one place.",
  },
  {
    traditional: "Lender register",
    pareto: "Permissioned lenders",
    copy: "Only KYC'd, approved lenders can deposit, and the borrower can decide who it accepts.",
  },
  {
    traditional: "Payment schedule",
    pareto: "Programmatic servicing",
    copy: "Cycles, interest, draws and repayments run onchain on a schedule everyone can see.",
  },
  {
    traditional: "Servicer reports",
    pareto: "Real-time transparency",
    copy: "Positions and repayments are visible as they happen, not reconstructed in a monthly report.",
  },
  {
    traditional: "Arranger's network",
    pareto: "Composable distribution",
    copy: "Facility positions can extend into DeFi venues such as Morpho and Pendle, widening the lender base.",
  },
] as const;

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
] as const;

export type ThesisProblemVideo = "market" | "desk" | "documents";

/** The three problem chapters told over the existing narrative videos. */
export const thesisProblems: Array<{
  video: ThesisProblemVideo;
  label: string;
  title: string;
  frictions: Array<(typeof thesisConstraints)[number]["title"]>;
}> = [
  {
    video: "market",
    label: "Legacy systems",
    title: "Credit markets run on a stack of legacy systems, patched together over decades.",
    frictions: ["Operations are manual", "Compliance is bolted on"],
  },
  {
    video: "desk",
    label: "Spreadsheets and phone calls",
    title: "Trillions deployed. Still managed on spreadsheets and phone calls.",
    frictions: ["Underwriting doesn't scale", "Distribution is siloed"],
  },
  {
    video: "documents",
    label: "Risk in the gaps",
    title: "Opacity is the norm, and risk hides in the gaps between systems.",
    frictions: ["Reporting arrives late"],
  },
];

export const thesisReasons = [
  {
    label: "Familiar",
    title: "Built the way credit committees think",
    copy: "A loan agreement per facility and a named curator accountable for the credit. Nothing a committee has to unlearn.",
  },
  {
    label: "Verifiable",
    title: "Lenders check, not trust",
    copy: "Positions, draws and repayments are visible onchain as they happen, not in a report weeks later.",
  },
  {
    label: "Efficient",
    title: "Servicing runs itself",
    copy: "Cycles, interest and repayments follow the facility's terms on schedule, so originators stop reconciling by hand.",
  },
  {
    label: "Composable",
    title: "Distribution beyond one network",
    copy: "Facility positions plug into DeFi venues such as Morpho and Pendle, reaching lenders an arranger could never call.",
  },
] as const;

export const thesisStages = [
  { title: "Originate", copy: "Borrower diligence, KYB and data-room review, with AI assistance.", detail: "Start with the borrower and the credit information. Agents can assist with the review; the curator remains accountable for the credit decision." },
  { title: "Structure", copy: "Terms, collateral rules and cycles or a revolving limit, set in Studio.", detail: "Translate the credit decision into facility terms. The legal agreement comes first; the vault is configured around those rules." },
  { title: "Launch", copy: "A dedicated Credit Vault, with permissioned lenders onboarded.", detail: "Each facility has its own vault and accounting. Approved, KYC’d lenders participate within the permissions set for that facility." },
  { title: "Operate", copy: "Draws, repayments, margin calls and reporting, onchain.", detail: "Servicing follows the facility’s terms. Curators oversee the credit while onchain records make positions and repayments visible as they happen." },
  { title: "Distribute", copy: "Listed on Pareto, then extended to DeFi venues.", detail: "Facility positions can connect to venues such as Morpho and Pendle, extending distribution beyond the arranger’s own network." },
];

export type ThesisRoadmapStatus = "live" | "early-access" | "next" | "coming-soon";

export const thesisRoadmap: Array<{
  status: ThesisRoadmapStatus;
  statusLabel: string;
  items: Array<{ name: string; copy: string }>;
}> = [
  {
    status: "live",
    statusLabel: "Live",
    items: [
      { name: STUDIO_PRODUCT_NAME, copy: "Structure, launch and run credit facilities from one desk." },
      { name: "Credit Vaults", copy: "Term, revolving, collateralized and asset-backed facilities, one vault each." },
      { name: "DeFi distribution", copy: "Facility positions on Morpho and Pendle." },
    ],
  },
  {
    status: "early-access",
    statusLabel: "Early access",
    items: [
      { name: MCP_PRODUCT_NAME, copy: "Agents in Claude, Codex or any MCP client read facility data directly, with no CSV exports." },
    ],
  },
  {
    status: "next",
    statusLabel: "Next",
    items: [
      { name: "Signed agent actions", copy: "Agents prepare lender reports and covenant attestations; people sign them in Studio." },
    ],
  },
  {
    status: "coming-soon",
    statusLabel: "Coming soon",
    items: [
      { name: AI_PRODUCT_NAME, copy: "Pareto's own assessment agent for document review, credit memos and ongoing monitoring." },
    ],
  },
];
