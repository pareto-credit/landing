export interface VaultAnatomyItem {
  id: string;
  /** Marks the opening and closing views that frame the numbered parts. */
  kind?: "intro" | "overview";
  title: string;
  summary: string;
  detail: string;
  points: Array<[string, string]>;
}

export interface VaultAnatomyContent {
  title: string;
  titleMuted?: string;
  items: VaultAnatomyItem[];
}

export const vaultAnatomy: VaultAnatomyContent = {
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
};

/** Reuses the vault layers and customizes copy for each page. */
function withVaultAnatomyCopy(
  copy: Partial<Record<string, Partial<Pick<VaultAnatomyItem, "summary" | "detail" | "points">>>>
): VaultAnatomyContent {
  return {
    ...vaultAnatomy,
    items: vaultAnatomy.items.map((item) => ({ ...item, ...copy[item.id] })),
  };
}

export const capitalAllocatorVaultAnatomy = withVaultAnatomyCopy({
  facility: {
    detail:
      "The vault makes capital available to the approved borrower under the facility’s terms. Before allocating, review the borrower, the intended use of proceeds, the rate, fees and repayment schedule.",
    points: [
      ["Borrower & use of proceeds", "Who borrows and what the funds finance"],
      ["Economics", "Rate, fees and repayment terms"],
    ],
  },
  oversight: {
    detail:
      "Identify who underwrites the facility and what they are responsible for monitoring. Review the facility agreements for any collateral, guarantees, covenants and reporting duties that apply.",
    points: [
      ["Oversight", "Underwriter or curator and their monitoring responsibilities"],
      ["Credit support", "Collateral, guarantees or other support, where agreed"],
    ],
  },
  settlement: {
    detail:
      "The borrower repays according to the credit agreement. Before allocating, check the notice period, the withdrawal request window and when you can claim funds. Settlement depends on the vault’s terms, borrower repayment and available liquidity.",
    points: [
      ["Withdrawal timing", "Notice period and request window"],
      ["Settlement", "Repayment, available liquidity and claim conditions"],
    ],
  },
});

export const creditVaultAnatomy = withVaultAnatomyCopy({
  vault: {
    summary: "How a Pareto Credit Vault works",
    detail:
      "A Pareto Credit Vault connects lender capital to a credit facility through smart contracts. Follow a deposit as it becomes a vault share, funds a borrower and returns to lenders under the facility’s terms.",
  },
  facility: {
    detail:
      "The vault makes funding available to the approved borrower under the credit agreement. Term facilities operate in defined lending cycles, and supported revolving lines allow draws and repayments within an agreed limit.",
    points: [
      ["Term facilities", "Defined lending cycles and repayment terms"],
      ["Revolving lines", "Draws and repayments within an agreed limit"],
    ],
  },
  oversight: {
    points: [
      ["Oversight", "Appointed underwriter or curator"],
      ["Credit support", "Collateral, guarantees or other support, where agreed"],
    ],
  },
  anatomy: {
    detail:
      "The vault’s contracts record share issuance, funding and settlement onchain. The credit agreements define the terms and responsibilities that govern the facility. Select a layer to revisit it.",
  },
});
