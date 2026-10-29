export type FacilityModuleId =
  | "term"
  | "revolving"
  | "tranches"
  | "nav"
  | "cycle-interest"
  | "callback"
  | "defi-adapters"
  | "eligibility"
  | "collateral"
  | "otc"
  | "legal-compliance"
  | "borrowing-base"
  | "reporting"
  | "servicing";

interface FacilityModule {
  id: FacilityModuleId;
  name: string;
  sublabel: string;
}

export interface FacilityModuleGroup {
  name: string;
  x: number;
  y: number;
  connector: string;
  modules: FacilityModule[];
}

/**
 * Illustrative facility arrangements, not a catalogue of deployed contracts.
 * OTC, custody, DeFi connectivity, legal/compliance, portfolio data and
 * borrowing-base controls include integrations and facility agreements.
 * Named protocols are illustrative adapter endpoints, not a claim that each
 * template is deployed with every integration. Reviewed contract reference:
 * idle-tranches 539dba671797ece04f98e698de04124d175fcdd0.
 */
export const facilityModuleGroups: FacilityModuleGroup[] = [
  {
    name: "Structure & capital",
    x: 32,
    y: 32,
    connector: "M360 248 H348 Q340 248 340 240 V160 Q340 152 332 152 H320",
    modules: [
      { id: "term", name: "Term facility", sublabel: "Defined lending cycles" },
      {
        id: "revolving",
        name: "Revolving facility",
        sublabel: "Draw · repay · redraw",
      },
      {
        id: "tranches",
        name: "Senior / junior",
        sublabel: "Separate lending classes",
      },
    ],
  },
  {
    name: "Returns & liquidity",
    x: 640,
    y: 32,
    connector: "M600 248 H612 Q620 248 620 240 V160 Q620 152 628 152 H640",
    modules: [
      {
        id: "nav",
        name: "NAV-based pricing",
        sublabel: "Returns reflected in vault value",
      },
      {
        id: "cycle-interest",
        name: "Interest paid each cycle",
        sublabel: "Scheduled cash settlement",
      },
      {
        id: "callback",
        name: "Callback module",
        sublabel: "Notice · request · settlement",
      },
      {
        id: "defi-adapters",
        name: "DeFi adapters",
        sublabel: "Morpho · Aave · Pendle",
      },
    ],
  },
  {
    name: "Access & compliance",
    x: 32,
    y: 304,
    connector: "M360 344 H348 Q340 344 340 352 V416 Q340 424 332 424 H320",
    modules: [
      {
        id: "eligibility",
        name: "Lender eligibility",
        sublabel: "Credentials & access policy",
      },
      {
        id: "collateral",
        name: "Collateral & custody",
        sublabel: "Coverage & account arrangements",
      },
      {
        id: "otc",
        name: "OTC desk",
        sublabel: "Execution & settlement integration",
      },
      {
        id: "legal-compliance",
        name: "Legal & compliance",
        sublabel: "Agreements · KYC / AML",
      },
    ],
  },
  {
    name: "Portfolio & operations",
    x: 640,
    y: 304,
    connector: "M600 344 H612 Q620 344 620 352 V416 Q620 424 628 424 H640",
    modules: [
      {
        id: "borrowing-base",
        name: "Borrowing base",
        sublabel: "Eligible assets & advance rates",
      },
      {
        id: "reporting",
        name: "Portfolio reporting",
        sublabel: "Facility & underlying asset data",
      },
      {
        id: "servicing",
        name: "Servicing & recovery",
        sublabel: "Roles & exception handling",
      },
    ],
  },
];

interface FacilityTemplate {
  id: string;
  name: string;
  modules: FacilityModuleId[];
}

export const facilityTemplates: FacilityTemplate[] = [
  {
    id: "prime-brokerage",
    name: "Prime brokerage",
    modules: [
      "revolving",
      "nav",
      "defi-adapters",
      "callback",
      "eligibility",
      "legal-compliance",
      "collateral",
      "otc",
      "borrowing-base",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "working-capital",
    name: "Working capital",
    modules: [
      "term",
      "cycle-interest",
      "callback",
      "eligibility",
      "legal-compliance",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "market-maker",
    name: "Market maker",
    modules: [
      "revolving",
      "nav",
      "defi-adapters",
      "callback",
      "eligibility",
      "legal-compliance",
      "collateral",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "trading-note",
    name: "Trading note",
    modules: [
      "term",
      "nav",
      "defi-adapters",
      "callback",
      "eligibility",
      "legal-compliance",
      "collateral",
      "otc",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "receivables",
    name: "Receivables financing",
    modules: [
      "revolving",
      "tranches",
      "nav",
      "defi-adapters",
      "callback",
      "eligibility",
      "legal-compliance",
      "borrowing-base",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "payfi",
    name: "PayFi financing",
    modules: [
      "revolving",
      "nav",
      "defi-adapters",
      "callback",
      "eligibility",
      "legal-compliance",
      "borrowing-base",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "payday",
    name: "Payday loans",
    modules: [
      "term",
      "cycle-interest",
      "eligibility",
      "legal-compliance",
      "borrowing-base",
      "reporting",
      "servicing",
    ],
  },
  {
    id: "bnpl",
    name: "BNPL providers",
    modules: [
      "revolving",
      "tranches",
      "nav",
      "defi-adapters",
      "eligibility",
      "legal-compliance",
      "borrowing-base",
      "reporting",
      "servicing",
    ],
  },
];
