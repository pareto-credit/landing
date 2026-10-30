/** Shared explanation of facility-specific collateral arrangements. */
export const collateralQuestion = {
  question: "Does Pareto only support unsecured lending?",
  answer:
    "No. Pareto supports secured and unsecured credit across the collateral spectrum: onchain crypto and tokenized assets; offchain collateral held with qualified custodians, in off-exchange accounts or at banks; and receivables and loan portfolios. Facilities can be structured for asset-backed lending, warehouse financing and revenue-based financing. Onchain collateral arrangements can include LTV thresholds, margin calls, collateral top-ups and grace periods. Offchain collateral is linked to the onchain facility through its agreements, custody or account arrangements, monitoring and reporting. The collateral, controls and repayment terms are defined for each facility.",
};

export const collateralOptions = [
  { label: "Onchain collateral", detail: "LTV · margin calls · top-ups" },
  { label: "Custodian-held collateral", detail: "Custodians · banks · off-exchange" },
  { label: "Asset pools", detail: "Receivables · loan portfolios" },
] as const;
