export interface InfrastructureLayer {
  id: string;
  title: string;
  description: string;
}

export interface CreditInfrastructureContent {
  title: string;
  titleMuted: string;
  items: InfrastructureLayer[];
}

export const originatorInfrastructure: CreditInfrastructureContent = {
  title: "Build around every layer",
  titleMuted: "every layer",
  items: [
    {
      id: "application",
      title: "Application",
      description:
        "Manage facilities in Pareto Studio, with lender access and optional white-label interfaces.",
    },
    {
      id: "eligibility",
      title: "Eligibility",
      description:
        "Define facility-specific KYC/KYB requirements and configure wallet permissions for approved facility participants.",
    },
    {
      id: "underwriting",
      title: "Underwriting",
      description:
        "Appoint your underwriter or explore NorthBridge curation for credit assessment and monitoring.",
    },
    {
      id: "terms",
      title: "Credit terms",
      description:
        "Configure facility size, interest rates, repayment mechanics and any agreed credit support.",
    },
    {
      id: "servicing",
      title: "Servicing",
      description:
        "Coordinate drawdowns, repayments and lender requests with onchain records and facility reporting.",
    },
    {
      id: "distribution",
      title: "Distribution",
      description:
        "Reach eligible lenders through supported Morpho and Pendle integrations, where terms permit.",
    },
  ],
};

export const allocatorInfrastructure: CreditInfrastructureContent = {
  title: "Understand every layer",
  titleMuted: "every layer",
  items: [
    {
      id: "application",
      title: "Application",
      description:
        "Compare vaults, monitor positions and review transactions through the Pareto Lender App.",
    },
    {
      id: "eligibility",
      title: "Eligibility",
      description:
        "Review facility-specific KYC/KYB, onboarding and access requirements under the applicable jurisdiction.",
    },
    {
      id: "underwriting",
      title: "Underwriting",
      description:
        "Assess the borrower, underwriting responsibilities, credit monitoring and available disclosures.",
    },
    {
      id: "terms",
      title: "Credit terms",
      description:
        "Evaluate rates, fees, credit support and lender rights against your investment mandate.",
    },
    {
      id: "servicing",
      title: "Servicing",
      description:
        "Track deposits, repayments and withdrawals, including notice periods and settlement terms.",
    },
    {
      id: "distribution",
      title: "Integrations",
      description:
        "Review supported Morpho and Pendle integrations, including eligibility, market depth and liquidity risks.",
    },
  ],
};

export const creditVaultInfrastructure: CreditInfrastructureContent = {
  title: "How Credit Vaults are built",
  titleMuted: "are built",
  items: [
    {
      id: "application",
      title: "Application",
      description:
        "Configure and manage facilities in Pareto Studio. Eligible lenders can review vaults, track positions and manage requests in the Pareto Lender App.",
    },
    {
      id: "eligibility",
      title: "Eligibility & compliance",
      description:
        "Set facility-specific KYC/KYB, onboarding and documentation requirements. Supported wallet permissions limit participation to approved wallets.",
    },
    {
      id: "underwriting",
      title: "Underwriting",
      description:
        "Define who assesses the borrower and monitors credit exposure. The facility agreements set out oversight, reporting and any agreed credit support.",
    },
    {
      id: "terms",
      title: "Credit terms",
      description:
        "Set the asset, rate and repayment terms. Configure term cycles or revolving draws where supported, with any credit support documented in the agreement.",
    },
    {
      id: "servicing",
      title: "Servicing",
      description:
        "Track draws, repayments and lender requests onchain alongside borrower reporting. Withdrawals follow facility-specific notice and settlement terms.",
    },
    {
      id: "distribution",
      title: "Distribution",
      description:
        "Connect eligible vaults to supported integrations with Morpho and Pendle. Availability depends on each vault and venue.",
    },
  ],
};
