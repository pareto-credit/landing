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
        "Run facilities in Pareto Studio and give eligible lenders a dedicated app. White-label options are available for some programs.",
    },
    {
      id: "eligibility",
      title: "Eligibility",
      description:
        "Set facility-specific KYC/KYB and onboarding requirements. Configure supported wallet permissions for approved participants.",
    },
    {
      id: "underwriting",
      title: "Underwriting",
      description:
        "Bring your own underwriting team or discuss curation with NorthBridge. Define who assesses the borrower and monitors the credit.",
    },
    {
      id: "terms",
      title: "Credit terms",
      description:
        "Set facility size, rates and repayment mechanics. Document any agreed collateral, guarantees or other credit support.",
    },
    {
      id: "servicing",
      title: "Servicing",
      description:
        "Coordinate draws, repayments and lender requests. Follow onchain activity alongside the reporting required for the facility.",
    },
    {
      id: "distribution",
      title: "Distribution",
      description:
        "Reach eligible lenders through supported Morpho and Pendle integrations. Availability depends on each facility and venue.",
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
        "Use the Pareto Lender App to compare available vaults, track positions and review transaction history.",
    },
    {
      id: "eligibility",
      title: "Eligibility",
      description:
        "Review each facility’s access, KYC/KYB and onboarding requirements. Eligibility depends on the facility and jurisdiction.",
    },
    {
      id: "underwriting",
      title: "Underwriting",
      description:
        "Identify the borrower and curator. Review who assesses the credit, what they monitor and what information is available.",
    },
    {
      id: "terms",
      title: "Credit terms",
      description:
        "Compare rates, fees and credit support against your mandate. The facility agreements define lender rights and borrower obligations.",
    },
    {
      id: "servicing",
      title: "Servicing",
      description:
        "Track deposits, repayments and withdrawal requests. Review facility-specific notice periods, request windows and settlement terms.",
    },
    {
      id: "distribution",
      title: "Integrations",
      description:
        "Check whether a vault supports Morpho or Pendle. Review venue eligibility, market depth and liquidity risk.",
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
