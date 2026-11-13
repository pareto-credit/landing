import towerDesktop from "../../../assets/images/credit-vaults/tower-1920.jpg";
import towerLarge from "../../../assets/images/credit-vaults/tower-3840.jpg";
import towerImage from "../../../assets/images/ecosystem/market-makers-card.jpg";
import towerImageAvif from "../../../assets/images/ecosystem/market-makers-card.avif";
import AgentsSection from "../AgentsSection";
import {
  CreditStructureCards,
  type StructureDetailContent,
} from "../StructuresSection";
import { SectionContainer, SectionHeader } from "../../ui/Section";
import FacilityCardArt from "./FacilityCardArt";
import SubpageHeader from "../SubpageHeader";

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
    <SubpageHeader
      category="Solutions"
      pageName="Credit Vaults"
      titleId="cv-hero-title"
      title={
        <>
          Credit, structured around{" "}
          <span className="text-[var(--color-text-muted)]">your business</span>
        </>
      }
      description="Bring borrowers, capital and facility operations together. Define the structure and terms around the way you lend."
      image={{
        mobile: towerImage,
        mobileAvif: towerImageAvif,
        desktop: towerDesktop,
        large: towerLarge,
        largeWidth: 3840,
      }}
    />

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
                Many forms of credit
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
