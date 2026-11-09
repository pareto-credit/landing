import { requestContact } from "../../../lib/siteNavigation";
import AgentsSection from "../AgentsSection";
import {
  CreditStructureCards,
  type StructureDetailContent,
} from "../StructuresSection";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import { buttonClassName } from "../../ui/buttonStyles";
import AudienceReveal from "../persona/AudienceReveal";
import CreditVaultHeroVisual from "./CreditVaultHeroVisual";
import FacilityCardArt from "./FacilityCardArt";

/**
 * The eight facility families follow the homepage collection. These are design
 * options, not representations of a particular deployment or signed agreement.
 * Contract mechanics were checked at idle-tranches commit
 * 539dba671797ece04f98e698de04124d175fcdd0; custody and covenants remain
 * facility-specific arrangements rather than inferred contract features.
 */
const facilityDetails: StructureDetailContent[] = [
  {
    visual: <FacilityCardArt kind="term" />,
    description:
      "Align capital with a defined lending cycle. Set the rate and cycle length, with subscriptions and withdrawal requests following the facility’s schedule.",
    specs: [
      ["Built around", "Working capital for trading firms and funds"],
      ["Configuration", "Cycle length · rate · request windows"],
    ],
  },
  {
    visual: <FacilityCardArt kind="revolving" />,
    description:
      "Draw and repay as funding needs change. Available borrowing capacity accounts for pending withdrawals, with borrower interest linked to the drawn balance.",
    specs: [
      ["Built around", "Redemption liquidity, payments and receivables"],
      ["Configuration", "Draws · repayments · borrowable capacity"],
    ],
  },
  {
    visual: <FacilityCardArt kind="collateral" />,
    description:
      "Build credit around crypto or tokenized collateral. Agree the asset mix, coverage thresholds and response to a margin shortfall.",
    specs: [
      ["Built around", "BTC-backed credit and market makers"],
      ["Configuration", "Collateral mix · coverage · cure periods"],
    ],
  },
  {
    visual: <FacilityCardArt kind="custody" />,
    description:
      "Structure lending around assets held with a custodian. Define custody evidence, responsibilities and the servicing process in the facility arrangements.",
    specs: [
      ["Built around", "Institutions with dedicated custody arrangements"],
      ["Configuration", "Custody evidence · monitoring · servicing"],
    ],
  },
  {
    visual: <FacilityCardArt kind="accounts" />,
    description:
      "Finance strategies operating through exchange, prime broker or bank accounts. Set visibility, account controls and reporting responsibilities upfront.",
    specs: [
      ["Built around", "Trading strategies and OTC desks"],
      ["Configuration", "Account controls · visibility · reporting"],
    ],
  },
  {
    visual: <FacilityCardArt kind="balance" />,
    description:
      "Use financial statements and recurring cash flows as the underwriting foundation. Add guarantees and covenants where the credit agreement requires them.",
    specs: [
      ["Built around", "Established operating companies"],
      ["Configuration", "Cash flows · guarantees · covenants"],
    ],
  },
  {
    visual: <FacilityCardArt kind="receivables" />,
    description:
      "Finance pools of receivables, invoices or loans. Define eligible assets, the borrowing-base methodology and the reporting needed to follow the pool.",
    specs: [
      ["Built around", "Fintech lenders and trade finance"],
      ["Configuration", "Eligibility · borrowing base · pool reporting"],
    ],
  },
  {
    visual: <FacilityCardArt kind="assets" />,
    description:
      "Create separate vaults for the funding assets your business uses. Keep accounting isolated per vault and underlying asset across supported EVM networks.",
    specs: [
      ["Built around", "Stablecoin funding, BTC and ETH variants"],
      ["Configuration", "Asset choice · network · isolated accounting"],
    ],
  },
];

const CreditVaultsContent = () => (
  <>
    <section
      id="hero"
      className="audience-hero"
      aria-labelledby="cv-hero-title"
    >
      <SectionContainer className="audience-hero__inner">
        <div className="audience-hero__layout">
          <AudienceReveal className="audience-hero__copy">
            <h1 id="cv-hero-title" tabIndex={-1}>
              Credit vaults, <span>on your terms.</span>
            </h1>
            <p className="audience-hero__intro">
              Set funding assets, repayment terms and collateral requirements
              for term facilities, revolving credit lines and other onchain
              lending structures.
            </p>
            <div className="audience-hero__actions">
              <a
                href="#contact"
                className={buttonClassName("primary", "md")}
                onClick={(event) => {
                  if (
                    event.button === 0 &&
                    !event.metaKey &&
                    !event.ctrlKey &&
                    !event.shiftKey &&
                    !event.altKey
                  ) {
                    event.preventDefault();
                    requestContact("Borrowing");
                  }
                }}
              >
                Discuss your facility
              </a>
              <a href="#facilities" className={buttonClassName("white", "md")}>
                Explore structures
              </a>
            </div>
          </AudienceReveal>
          <AudienceReveal delay={0.1} className="audience-hero__art">
            <CreditVaultHeroVisual />
          </AudienceReveal>
        </div>
      </SectionContainer>
    </section>

    <section
      id="facilities"
      className="product-section"
      aria-labelledby="cv-facilities-title"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="Facility structures"
          titleId="cv-facilities-title"
          title={
            <>
              One framework.{" "}
              <span className="text-[var(--color-text-muted)]">
                Many forms of credit.
              </span>
            </>
          }
          description="From a straightforward term facility to a revolving line or an asset-backed structure. Choose the approach, then define the details with your team."
        />

        <CreditStructureCards details={facilityDetails} />
      </SectionContainer>
    </section>

    <AgentsSection variant="credit-vaults" />
  </>
);

export default CreditVaultsContent;
