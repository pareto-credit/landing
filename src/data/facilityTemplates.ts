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
  | "custody"
  | "asset-pool"
  | "financial-covenants"
  | "breach-cure"
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
    x: 24,
    y: 16,
    connector: "M320 98H332Q340 98 340 106V232Q340 240 348 240H360",
    modules: [
      {
        id: "term",
        name: "Term facility",
        sublabel: "Defined lending cycles"
      },
      {
        id: "revolving",
        name: "Revolving facility",
        sublabel: "Draw · repay · redraw"
      },
      {
        id: "tranches",
        name: "Senior / junior",
        sublabel: "Separate lending classes"
      }
    ]
  },
  {
    name: "Returns & liquidity",
    x: 640,
    y: 16,
    connector: "M640 98H628Q620 98 620 106V232Q620 240 612 240H600",
    modules: [
      {
        id: "nav",
        name: "NAV-based pricing",
        sublabel: "Returns reflected in vault value"
      },
      {
        id: "cycle-interest",
        name: "Interest paid each cycle",
        sublabel: "Scheduled cash settlement"
      },
      {
        id: "callback",
        name: "Callback module",
        sublabel: "Notice · request · settlement"
      }
    ]
  },
  {
    name: "Access & compliance",
    x: 24,
    y: 196,
    connector: "M320 278H336Q344 278 344 288H360",
    modules: [
      {
        id: "eligibility",
        name: "Lender eligibility",
        sublabel: "Credentials & access policy"
      },
      {
        id: "otc",
        name: "OTC desk",
        sublabel: "Execution & settlement integration"
      },
      {
        id: "legal-compliance",
        name: "Legal & compliance",
        sublabel: "Agreements · KYC / AML"
      }
    ]
  },
  {
    name: "Portfolio & operations",
    x: 640,
    y: 196,
    connector: "M640 278H624Q616 278 616 288H600",
    modules: [
      {
        id: "defi-adapters",
        name: "DeFi adapters",
        sublabel: "Morpho · Aave · Pendle"
      },
      {
        id: "reporting",
        name: "Portfolio reporting",
        sublabel: "Facility & underlying asset data"
      },
      {
        id: "servicing",
        name: "Servicing & recovery",
        sublabel: "Roles & exception handling"
      }
    ]
  },
  {
    name: "Collateral & custody",
    x: 24,
    y: 376,
    connector: "M320 458H332Q340 458 340 450V344Q340 336 348 336H360",
    modules: [
      {
        id: "collateral",
        name: "Onchain collateral",
        sublabel: "LTV · margin calls · top-ups"
      },
      {
        id: "custody",
        name: "Custodian-held collateral",
        sublabel: "Custodians · banks · off-exchange"
      },
      {
        id: "asset-pool",
        name: "Asset pools",
        sublabel: "Receivables · loan portfolios"
      }
    ]
  },
  {
    name: "Covenant monitoring",
    x: 640,
    y: 376,
    connector: "M640 458H628Q620 458 620 450V344Q620 336 612 336H600",
    modules: [
      {
        id: "borrowing-base",
        name: "Borrowing base",
        sublabel: "Eligible assets & advance rates"
      },
      {
        id: "financial-covenants",
        name: "Financial covenants",
        sublabel: "Leverage · liquidity · coverage"
      },
      {
        id: "breach-cure",
        name: "Breach & cure tracking",
        sublabel: "Alerts · grace periods · remediation"
      }
    ]
  }
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
      "custody",
      "otc",
      "borrowing-base",
      "asset-pool",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
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
      "financial-covenants",
      "breach-cure",
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
      "custody",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
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
      "custody",
      "otc",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
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
      "asset-pool",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
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
      "asset-pool",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
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
      "asset-pool",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
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
      "asset-pool",
      "reporting",
      "servicing",
      "financial-covenants",
      "breach-cure",
    ],
  },
];
