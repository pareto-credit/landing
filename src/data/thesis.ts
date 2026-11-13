import { getPersonaPage } from "./personas";

export const thesisChapters = [
  {
    id: "structured-credit",
    group: "The case",
    label: "Structured credit",
    summary: "One infrastructure layer for different credit structures.",
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
    summary: "More than $2T in private credit, alongside $38B in tokenized credit.",
    tag: "Market",
  },
  {
    id: "why-pareto",
    group: "Pareto",
    label: "Why Pareto",
    summary: "Familiar, verifiable, efficient and composable.",
    tag: "Solution",
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
    value: "+$2T",
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
    label: "The value of stablecoins in circulation, a potential funding source for onchain credit.",
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
  vault: { title: "Credit Vault", copy: "Dedicated on-chain structure" },
  lenders: { title: "Lenders", copy: "Eligible institutional and onchain participants" },
  distribution: { title: "Distribution", copy: "Supported onchain venues" },
  flows: {
    curator: "Approves and oversees",
    borrower: "Draws · repays",
    lenders: "Deposits · requests",
    distribution: "Supported integrations",
  },
} as const;

/** Facility layers shown in the Thesis diagram. */
export const thesisFacilityLayers = getPersonaPage("originators").framework.items.map(layer =>
  layer.id === "application"
    ? {
        id: "legal",
        title: "Legal framework",
        detail: "A facility-specific loan agreement is linked to the Credit Vault. The vault executes configured terms onchain, and the agreement sets the governing law and remedies available offchain.",
      }
    : layer,
);

export type ThesisProblemVideo = "market" | "desk" | "documents";

/** The three problem chapters told over the existing narrative videos. */
export const thesisProblems: Array<{
  video: ThesisProblemVideo;
  title: string;
}> = [
  {
    video: "market",
    title: "Credit markets run on a stack of legacy systems, patched together over decades",
  },
  {
    video: "desk",
    title: "Trillions deployed. Still managed on spreadsheets and phone calls",
  },
  {
    video: "documents",
    title: "Opacity is the norm, and risk hides in the gaps between systems",
  },
];

export const thesisReasons = [
  {
    title: "Familiar",
    label: "Facility terms",
    diagram: "terms",
    copy: "Facility-specific agreements and defined roles let institutions bring familiar credit structures onchain.",
  },
  {
    title: "Verifiable",
    label: "Onchain records",
    diagram: "records",
    copy: "Onchain records give lenders a shared view of positions and transactions alongside borrower and curator reporting.",
  },
  {
    title: "Efficient",
    label: "Servicing",
    diagram: "servicing",
    copy: "Reusable vault modules and a shared servicing workflow can reduce the work of launching and operating each new facility.",
  },
  {
    title: "Composable",
    label: "Integrations",
    diagram: "network",
    copy: "Eligible vault positions can reach lenders through supported DeFi venues, extending distribution beyond an originator’s own network.",
  },
] as const;

export const thesisStages = [
  { title: "Originate", copy: "Borrower diligence, KYB and data-room review, with AI assistance.", detail: "Start with the borrower and the credit information. Agents can assist with the review; the curator remains accountable for the credit decision." },
  { title: "Structure", copy: "Terms, collateral rules and cycles or a revolving limit, set in Studio.", detail: "Translate the credit decision into facility terms. The legal agreement comes first; the vault is configured around those rules." },
  { title: "Launch", copy: "A dedicated Credit Vault, with permissioned lenders onboarded.", detail: "Each facility has its own vault and accounting. Approved, KYC’d lenders participate within the permissions set for that facility." },
  { title: "Operate", copy: "Draws, repayments, margin calls and reporting, onchain.", detail: "Servicing follows the facility’s terms. Curators oversee the credit while onchain records make positions and repayments visible as they happen." },
  { title: "Distribute", copy: "Listed on Pareto, then extended to DeFi venues.", detail: "Facility positions can connect to venues such as Morpho and Pendle, extending distribution beyond the arranger’s own network." },
];
