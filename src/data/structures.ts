export interface CreditStructure {
  name: string;
  lede: string;
  specs: Array<[label: string, value: string]>;
}

/**
 * Facility structures Pareto Credit Vaults support. Keep this list to what the
 * contracts and live facilities support; terms are always set per facility.
 */
export const creditStructures: CreditStructure[] = [
  {
    name: "Term facilities",
    lede: "Fixed lending cycles with a set rate, scheduled interest and lender entry and exit at each cycle.",
    specs: [
      ["Mechanics", "Cycle-based (epochs)"],
      ["Rate", "Fixed per cycle"],
      ["Lender liquidity", "At cycle boundaries"],
      ["Typical use", "Working capital for trading firms and funds"],
    ],
  },
  {
    name: "Revolving credit lines",
    lede: "Draw, repay and redraw within a committed limit, paying interest only on what is drawn.",
    specs: [
      ["Mechanics", "Draws and repayments within a limit"],
      ["Undrawn capital", "Can sit in a yield-bearing vault"],
      ["Controls", "Borrowable limit net of pending withdrawals"],
      ["Typical use", "Redemption liquidity, payments, receivables"],
    ],
  },
  {
    name: "Overcollateralized lending",
    lede: "Loans against crypto or tokenized collateral, with LTV limits, margin calls and cure periods.",
    specs: [
      ["Collateral", "BTC, ETH, stablecoins, tokenized assets"],
      ["Controls", "LTV caps, margin calls, grace periods"],
      ["Monitoring", "Continuous, onchain"],
      ["Typical use", "Market makers, BTC-backed credit"],
    ],
  },
  {
    name: "Custodial facilities",
    lede: "Collateral held with qualified custodians and tied into facility monitoring and servicing.",
    specs: [
      ["Collateral", "Held at a qualified custodian"],
      ["Controls", "Custody evidence feeds monitoring"],
      ["Servicing", "Linked to the facility's cycles"],
      ["Typical use", "Institutions keeping assets off-exchange"],
    ],
  },
  {
    name: "Managed-account facilities",
    lede: "Capital deployed to controlled exchange, prime broker or bank accounts with agreed visibility.",
    specs: [
      ["Accounts", "Exchange, prime broker or bank"],
      ["Controls", "Account controls agreed upfront"],
      ["Reporting", "Position visibility for the curator"],
      ["Typical use", "Trading strategies and OTC desks"],
    ],
  },
  {
    name: "Balance-sheet credit",
    lede: "Underwritten on the borrower's balance sheet and cash flows, optionally backed by a parent guarantee.",
    specs: [
      ["Basis", "Financials and cash flows"],
      ["Credit support", "Parent-company guarantees"],
      ["Covenants", "Set per facility"],
      ["Typical use", "Established operating companies"],
    ],
  },
  {
    name: "Asset-backed & receivables",
    lede: "Financing against pools of invoices, receivables or loans, with eligibility rules and borrowing-base tests.",
    specs: [
      ["Collateral", "Receivables, invoices, loan pools"],
      ["Controls", "Eligibility criteria, borrowing base"],
      ["Reporting", "Tape and covenant reporting per cycle"],
      ["Typical use", "Fintech lenders, trade finance"],
    ],
  },
  {
    name: "Multi-asset facilities",
    lede: "Lend in stablecoins, BTC or ETH under one facility framework, across EVM networks.",
    specs: [
      ["Assets", "Stablecoins, BTC and ETH variants"],
      ["Networks", "Ethereum and other EVM chains"],
      ["Accounting", "Isolated per vault and asset"],
      ["Typical use", "Borrowers funding in more than one asset"],
    ],
  },
];
