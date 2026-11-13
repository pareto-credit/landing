export type PersonaId = "underwrite" | "borrow" | "allocate";
export interface PersonaDesk {
  id: PersonaId;
  tab: string;
  audience: string;
  crumb: string;
}
export const personaDesks: PersonaDesk[] = [
  {
    id: "underwrite",
    tab: "Underwriters",
    audience: "Review requests & oversee facilities",
    crumb: "Curator desk",
  },
  {
    id: "borrow",
    tab: "Borrowers",
    audience: "Manage funding & repayments",
    crumb: "Borrower desk",
  },
  {
    id: "allocate",
    tab: "Lenders",
    audience: "Follow positions & activity",
    crumb: "Lender desk",
  },
];

export interface ActivityRow {
  id: string;
  date: string;
  vault: string;
  type: string;
  amount: string;
  hash?: string;
}
export interface PreviewEvent {
  title: string;
  detail: string;
  kind: "request" | "transaction" | "position" | "report" | "withdrawal";
  row?: ActivityRow;
  outstandingDelta?: number;
  earningsDelta?: number;
}
export interface ProductScenario {
  title: string;
  events: PreviewEvent[];
}

export const borrowerFacility = {
  capacity: 300_000_000,
  openingOutstanding: 248_600_000,
};

/** All amounts and events are illustrative. The Studio layout follows the screen supplied on 27 October 2026. */
export const productScenarios: Record<PersonaId, ProductScenario> = {
  underwrite: {
    title: "Overview",
    events: [
      {
        title: "New withdrawal request",
        detail: "Aster USDC – 12,500,000 USDC awaiting review.",
        kind: "request",
        row: {
          id: "uw-request-1",
          date: "Just now",
          vault: "Aster USDC",
          type: "Withdraw",
          amount: "12,500,000 USDC",
        },
      },
      {
        title: "New redemption request",
        detail: "Meridian USDC – a new request has joined your queue.",
        kind: "request",
        row: {
          id: "uw-request-2",
          date: "Just now",
          vault: "Meridian USDC",
          type: "Redeem",
          amount: "8,500,000 USDC",
        },
      },
      {
        title: "New withdrawal request",
        detail: "Harbour USDT – 16,000,000 USDT awaiting review.",
        kind: "request",
        row: {
          id: "uw-request-3",
          date: "Just now",
          vault: "Harbour USDT",
          type: "Withdraw",
          amount: "16,000,000 USDT",
        },
      },
    ],
  },
  borrow: {
    title: "Overview",
    events: [
      {
        title: "Drawdown recorded",
        detail:
          "Aster USDC – 12,500,000 USDC added to your transaction history.",
        kind: "transaction",
        outstandingDelta: 12_500_000,
        row: {
          id: "br-transaction-1",
          date: "Just now",
          vault: "Aster USDC",
          type: "Drawdown",
          amount: "12,500,000 USDC",
          hash: "0x4a91…c76e",
        },
      },
      {
        title: "Interest payment recorded",
        detail: "Aster USDC – 1,672,240 USDC payment recorded.",
        kind: "transaction",
        row: {
          id: "br-transaction-2",
          date: "Just now",
          vault: "Aster USDC",
          type: "Interest payment",
          amount: "1,672,240 USDC",
          hash: "0x8f32…d941",
        },
      },
      {
        title: "Repayment recorded",
        detail: "Aster USDC – 6,250,000 USDC principal repayment recorded.",
        kind: "transaction",
        outstandingDelta: -6_250_000,
        row: {
          id: "br-transaction-3",
          date: "Just now",
          vault: "Aster USDC",
          type: "Repayment",
          amount: "6,250,000 USDC",
          hash: "0x6c74…ab83",
        },
      },
    ],
  },
  allocate: {
    title: "Portfolio",
    events: [
      {
        title: "Borrower report available",
        detail: "Aster USDC – your October borrower report is ready to review.",
        kind: "report",
      },
      {
        title: "Earnings updated",
        detail:
          "Aster USDC – 2,180 USDC in accrued interest added to your portfolio value.",
        kind: "position",
        earningsDelta: 2180,
      },
      {
        title: "Withdrawal available",
        detail:
          "Meridian USDC – 25,000 USDC is ready to claim from your settled request.",
        kind: "withdrawal",
      },
    ],
  },
};

export const lenderPositions = [
  {
    name: "Aster USDC",
    category: "Prime brokerage",
    asset: "USDC",
    apy: "8.08%",
    balance: 15508108.19,
    share: 50,
  },
  {
    name: "Meridian USDC",
    category: "Institutional credit",
    asset: "USDC",
    apy: "7.64%",
    balance: 9925189.24,
    share: 32,
  },
  {
    name: "Harbour USDT",
    category: "Working capital",
    asset: "USDT",
    apy: "7.42%",
    balance: 5582918.95,
    share: 18,
  },
];

export const initialTransactions: ActivityRow[] = [
  {
    id: "tx-base-1",
    date: "Today",
    vault: "Aster USDC",
    type: "Deposit",
    amount: "24,159,360 USDC",
    hash: "0x2891…d3f2",
  },
  {
    id: "tx-base-2",
    date: "Today",
    vault: "Meridian USDC",
    type: "Transfer out",
    amount: "18,420,720 USDC",
    hash: "0xa432…fb27",
  },
  {
    id: "tx-base-3",
    date: "Yesterday",
    vault: "Aster USDC",
    type: "Deposit",
    amount: "7,485,000 USDC",
    hash: "0x714f…e16a",
  },
  {
    id: "tx-base-4",
    date: "Yesterday",
    vault: "Harbour USDT",
    type: "Transfer in",
    amount: "9,618,000 USDT",
    hash: "0x90c8…af19",
  },
];
export const initialRequests: ActivityRow[] = [
  {
    id: "req-base-1",
    date: "Today",
    vault: "Aster USDC",
    type: "Withdraw",
    amount: "10,528,600 USDC",
  },
  {
    id: "req-base-2",
    date: "Yesterday",
    vault: "Meridian USDC",
    type: "Redeem",
    amount: "8,851,300 USDC",
  },
  {
    id: "req-base-3",
    date: "Yesterday",
    vault: "Aster USDC",
    type: "Withdraw",
    amount: "7,642,500 USDC",
  },
  {
    id: "req-base-4",
    date: "Yesterday",
    vault: "Harbour USDT",
    type: "Redeem",
    amount: "5,189,000 USDT",
  },
];
export const previewVaults = [
  {
    name: "Aster USDC",
    category: "Prime brokerage",
    status: "Running",
    apr: "8.08%",
    tvl: borrowerFacility.openingOutstanding,
    duration: "31.5d",
    progress: 0.72,
    note: "Ending in 5d 18h",
  },
  {
    name: "Meridian USDC",
    category: "Institutional credit",
    status: "Running",
    apr: "7.64%",
    tvl: 176_400_000,
    duration: "30d",
    progress: 0.46,
    note: "Ending in 16d 4h",
  },
  {
    name: "Harbour USDT",
    category: "Working capital",
    status: "Waiting",
    apr: "8.35%",
    tvl: 125_000_000,
    duration: "30d",
    progress: 0,
    note: "Ready to start",
  },
  {
    name: "Cedar USDC",
    category: "Term financing",
    status: "Finished",
    apr: "7.42%",
    tvl: 0,
    duration: "20d",
    progress: 1,
    note: "Cycle completed",
  },
];
