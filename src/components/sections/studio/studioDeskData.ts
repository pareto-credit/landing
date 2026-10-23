export type PersonaId = "underwrite" | "borrow" | "allocate";

export interface DeskKpi {
  label: string;
  value: string;
  note?: string;
}

export interface DeskActivity {
  time: string;
  label: string;
  kind: "ok" | "agent" | "doc" | "pending";
}

export type DeskSideCard =
  | { kind: "mix"; title: string; note: string; items: Array<[label: string, share: number]> }
  | {
      kind: "ltv";
      title: string;
      note: string;
      current: number;
      marginCall: number;
      liquidation: number;
    };

export type DeskList =
  | {
      kind: "pipeline";
      title: string;
      note: string;
      stages: string[];
      rows: Array<{ name: string; meta: string; stage: number }>;
    }
  | {
      kind: "table";
      title: string;
      note: string;
      columns: [string, string, string, string];
      rows: Array<[string, string, string, string]>;
    };

export interface PersonaDesk {
  id: PersonaId;
  tab: string;
  audience: string;
  crumb: string;
  activeNav: string;
  hero: { label: string; value: string; delta: string; series: number[] };
  side: DeskSideCard;
  kpis: [DeskKpi, DeskKpi, DeskKpi, DeskKpi];
  list: DeskList;
  activity: DeskActivity[];
  /** Events appended to the tape while the desk is on screen. */
  liveFeed: Array<Pick<DeskActivity, "label" | "kind">>;
}

/** Illustrative figures only; they do not describe any real facility. */
export const personaDesks: PersonaDesk[] = [
  {
    id: "underwrite",
    tab: "Underwrite",
    audience: "Curators & underwriters",
    crumb: "Curator desk",
    activeNav: "Overview",
    hero: {
      label: "Outstanding · all facilities",
      value: "$48.2M",
      delta: "+$2.1M · 30d",
      series: [31, 32, 32.5, 34, 33.8, 36, 37.2, 38, 39.5, 41, 40.6, 43, 44.1, 46, 48.2],
    },
    side: {
      kind: "mix",
      title: "Book mix · by structure",
      note: "6 facilities",
      items: [
        ["Term", 46],
        ["Revolving", 22],
        ["Overcollateralized", 18],
        ["Receivables", 14],
      ],
    },
    kpis: [
      { label: "Facilities", value: "6", note: "+1" },
      { label: "Next cycle", value: "4d", note: "Nov 01" },
      { label: "Weighted APR", value: "9.4%", note: "+0.2" },
      { label: "Covenant breaches", value: "0", note: "clear" },
    ],
    list: {
      kind: "pipeline",
      title: "Facility pipeline",
      note: "4 in pipeline",
      stages: ["Draft", "Diligence", "Legal", "Live"],
      rows: [
        { name: "Borrower A", meta: "Term · 30d cycles", stage: 3 },
        { name: "Borrower B", meta: "Revolving · $15M limit", stage: 2 },
        { name: "Borrower C", meta: "Receivables · 45d", stage: 1 },
        { name: "Borrower D", meta: "Overcollateralized · BTC", stage: 0 },
      ],
    },
    activity: [
      { time: "09:14", label: "Cycle 14 closed · interest settled", kind: "ok" },
      { time: "08:52", label: "Lender onboarded · KYB passed", kind: "ok" },
      { time: "08:30", label: "Borrowing base refreshed · within limits", kind: "ok" },
      { time: "08:02", label: "Agent draft · lender report to sign", kind: "agent" },
      { time: "07:41", label: "Margin call cleared · LTV 58%", kind: "ok" },
    ],
    liveFeed: [
      { label: "Interest received · cycle 15", kind: "ok" },
      { label: "Agent draft · borrowing-base report", kind: "agent" },
      { label: "Covenant checks passed · 6/6", kind: "ok" },
      { label: "Lender approved · KYB passed", kind: "doc" },
      { label: "LTV refreshed · 57%", kind: "ok" },
    ],
  },
  {
    id: "borrow",
    tab: "Borrow",
    audience: "Borrowers & originators",
    crumb: "Borrower desk",
    activeNav: "Facilities",
    hero: {
      label: "Drawn · revolving line",
      value: "$18.4M",
      delta: "of $25.0M limit",
      series: [8, 9, 11, 10.5, 12, 14, 13.2, 15, 16.1, 15.5, 17, 18.4],
    },
    side: {
      kind: "ltv",
      title: "Collateral · LTV",
      note: "BTC · custodial",
      current: 58,
      marginCall: 65,
      liquidation: 75,
    },
    kpis: [
      { label: "Available", value: "$6.6M", note: "to draw" },
      { label: "Rate", value: "8.75%", note: "APR" },
      { label: "Next interest", value: "$132k", note: "in 6d" },
      { label: "Cycle", value: "30d", note: "#14" },
    ],
    list: {
      kind: "table",
      title: "Upcoming payments",
      note: "Next 90 days",
      columns: ["Date", "Type", "Amount", "Status"],
      rows: [
        ["Nov 01", "Interest", "$132,400", "Scheduled"],
        ["Dec 01", "Interest", "$134,100", "Scheduled"],
        ["Dec 15", "Principal", "$5,000,000", "Planned"],
        ["Jan 01", "Interest", "$97,900", "Scheduled"],
      ],
    },
    activity: [
      { time: "10:02", label: "Draw confirmed · $2.0M", kind: "ok" },
      { time: "09:40", label: "Collateral topped up · 12 BTC", kind: "ok" },
      { time: "09:11", label: "Interest paid · cycle 13", kind: "ok" },
      { time: "08:25", label: "Q3 financials uploaded", kind: "doc" },
      { time: "07:58", label: "Lender capacity added · $3.0M", kind: "ok" },
    ],
    liveFeed: [
      { label: "Draw request · $500k", kind: "pending" },
      { label: "Collateral price update · LTV 57%", kind: "ok" },
      { label: "Repayment scheduled · $1.0M", kind: "doc" },
      { label: "Lender capacity added · $1.5M", kind: "ok" },
    ],
  },
  {
    id: "allocate",
    tab: "Allocate",
    audience: "Lenders & allocators",
    crumb: "Lender desk",
    activeNav: "Performance",
    hero: {
      label: "Your positions",
      value: "$2.50M",
      delta: "+$19.6k earned · 30d",
      series: [2.0, 2.05, 2.1, 2.1, 2.2, 2.25, 2.3, 2.32, 2.4, 2.43, 2.47, 2.5],
    },
    side: {
      kind: "mix",
      title: "Allocation · by structure",
      note: "4 facilities",
      items: [
        ["Term", 45],
        ["Revolving", 25],
        ["Overcollateralized", 20],
        ["Receivables", 10],
      ],
    },
    kpis: [
      { label: "Net APY", value: "9.1%", note: "+0.3" },
      { label: "Facilities", value: "4", note: "active" },
      { label: "Next cycle", value: "4d", note: "Nov 01" },
      { label: "Withdrawal", value: "$250k", note: "queued" },
    ],
    list: {
      kind: "table",
      title: "Open facilities",
      note: "Permissioned",
      columns: ["Facility", "Structure", "APY", "Capacity"],
      rows: [
        ["Trade Finance II", "Receivables · 45d", "10.2%", "$3.1M"],
        ["Market Maker Line", "Revolving", "9.4%", "$5.0M"],
        ["BTC Credit I", "Overcollateralized", "7.8%", "$1.2M"],
        ["Working Capital III", "Term · 30d", "8.9%", "Full"],
      ],
    },
    activity: [
      { time: "09:30", label: "Interest received · $6,480", kind: "ok" },
      { time: "09:05", label: "Monthly lender report published", kind: "doc" },
      { time: "08:44", label: "Deposit confirmed · $500k", kind: "ok" },
      { time: "08:10", label: "Withdrawal queued · next cycle", kind: "pending" },
      { time: "07:52", label: "Covenant checks passed", kind: "ok" },
    ],
    liveFeed: [
      { label: "Interest accrued · $214", kind: "ok" },
      { label: "Cycle 15 rates published", kind: "doc" },
      { label: "Deposit window open · 3 facilities", kind: "pending" },
      { label: "Agent summary · weekly exposure", kind: "agent" },
    ],
  },
];

export const deskNavigation: Array<{ group: string; items: Array<{ label: string; badge?: string }> }> = [
  { group: "Analytics", items: [{ label: "Overview" }, { label: "Performance" }] },
  {
    group: "Management",
    items: [{ label: "Facilities" }, { label: "Lenders" }, { label: "Cycles" }, { label: "Documents" }],
  },
  { group: "Agents", items: [{ label: "Inbox", badge: "2" }, { label: "Connections" }] },
  { group: "Admin", items: [{ label: "Settings" }] },
];
