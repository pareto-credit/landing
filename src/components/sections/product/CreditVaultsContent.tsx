import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarRange,
  Coins,
  FileBarChart,
  Gauge,
  Receipt,
  RefreshCcw,
  Vault,
  type LucideIcon,
} from "lucide-react";
import { creditStructures } from "../../../data/structures";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import { requestContact } from "../../../lib/siteNavigation";
import AgentsSection from "../AgentsSection";
import ScrollHighlight from "./ScrollHighlight";
import FacilityModules from "./FacilityModules";
import FacilityCardArt, { type FacilityArtKind } from "./FacilityCardArt";
import "./credit-vaults-product.css";

interface FacilityStory {
  icon: LucideIcon;
  art: FacilityArtKind;
  className?: string;
  description: string;
  useCase: string;
  configuration: string;
}

/**
 * The eight facility families follow the homepage collection. These are design
 * options, not representations of a particular deployment or signed agreement.
 * Contract mechanics were checked at idle-tranches commit
 * 539dba671797ece04f98e698de04124d175fcdd0; custody and covenants remain
 * facility-specific arrangements rather than inferred contract features.
 */
const facilityStories: FacilityStory[] = [
  {
    icon: CalendarRange,
    art: "term",
    className: "cv-facility-card--term",
    description:
      "Align capital with a defined lending cycle. Set the rate and cycle length, with subscriptions and withdrawal requests following the facility’s schedule.",
    useCase: "Working capital for trading firms and funds",
    configuration: "Cycle length · rate · request windows",
  },
  {
    icon: RefreshCcw,
    art: "revolving",
    className: "cv-facility-card--revolving",
    description:
      "Draw and repay as funding needs change. Available borrowing capacity accounts for pending withdrawals, with borrower interest linked to the drawn balance.",
    useCase: "Redemption liquidity, payments and receivables",
    configuration: "Draws · repayments · borrowable capacity",
  },
  {
    icon: Gauge,
    art: "collateral",
    description:
      "Build credit around crypto or tokenized collateral. Agree the asset mix, coverage thresholds and response to a margin shortfall.",
    useCase: "BTC-backed credit and market makers",
    configuration: "Collateral mix · coverage · cure periods",
  },
  {
    icon: Vault,
    art: "custody",
    description:
      "Structure lending around assets held with a custodian. Define custody evidence, responsibilities and the servicing process in the facility arrangements.",
    useCase: "Institutions with dedicated custody arrangements",
    configuration: "Custody evidence · monitoring · servicing",
  },
  {
    icon: Building2,
    art: "accounts",
    description:
      "Finance strategies operating through exchange, prime broker or bank accounts. Set visibility, account controls and reporting responsibilities upfront.",
    useCase: "Trading strategies and OTC desks",
    configuration: "Account controls · visibility · reporting",
  },
  {
    icon: FileBarChart,
    art: "balance",
    className: "cv-facility-card--balance",
    description:
      "Use financial statements and recurring cash flows as the underwriting foundation. Add guarantees and covenants where the credit agreement requires them.",
    useCase: "Established operating companies",
    configuration: "Cash flows · guarantees · covenants",
  },
  {
    icon: Receipt,
    art: "receivables",
    className: "cv-facility-card--receivables",
    description:
      "Finance pools of receivables, invoices or loans. Define eligible assets, the borrowing-base methodology and the reporting needed to follow the pool.",
    useCase: "Fintech lenders and trade finance",
    configuration: "Eligibility · borrowing base · pool reporting",
  },
  {
    icon: Coins,
    art: "assets",
    className: "cv-facility-card--assets",
    description:
      "Create separate vaults for the funding assets your business uses. Keep accounting isolated per vault and underlying asset across supported EVM networks.",
    useCase: "Stablecoin funding, BTC and ETH variants",
    configuration: "Asset choice · network · isolated accounting",
  },
];

function CreditVaultHeroAccent() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const visible = usePageVisibility();
  const reduced = useReducedMotion();

  return (
    <span
      ref={ref}
      className="cv-product-hero__accent"
      data-ambient-running={inView && visible && !reduced}
    >
      your business.
      <span className="cv-product-hero__accent-sheen" aria-hidden="true">
        your business.
      </span>
    </span>
  );
}

const CreditVaultsContent = () => {
  const facilitiesRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const browseFacilities = (direction: number) => {
    const rail = facilitiesRef.current;
    if (rail) rail.scrollBy({
      left: direction * (rail.clientWidth + 16),
      behavior: reduced ? "auto" : "smooth",
    });
  };
  return (
  <>
    <section
      id="hero"
      className="product-hero cv-product-hero"
      aria-labelledby="cv-hero-title"
    >
      <div className="cv-product-shell">
        <div className="cv-product-hero__topline">
          <p className="product-kicker cv-product-kicker">
            Pareto / Credit Vaults
          </p>
          <span className="cv-product-hero__index" aria-hidden="true">
            A framework for credit
          </span>
        </div>
        <h1 id="cv-hero-title">
          Credit, structured
          <br />
          around <CreditVaultHeroAccent />
        </h1>
        <div className="cv-product-hero__bottom">
          <div className="cv-product-hero__intro">
            <p>
              Bring borrowers, capital and facility operations together. Define
              the structure and terms around the way you lend.
            </p>
            <div className="cv-product-actions">
              <a
                href="#contact"
                className="cv-product-button"
                onClick={(event) => {
                  event.preventDefault();
                  requestContact("Borrowing");
                }}
              >
                Discuss your facility{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href="#facilities" className="cv-product-text-link">
                Explore the structures{" "}
                <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div
            className="cv-product-hero__principles"
            aria-label="Credit Vault design principles"
          >
            <p>
              <span>01</span> Your business objectives
            </p>
            <p>
              <span>02</span> Facility-specific terms
            </p>
            <p>
              <span>03</span> A shared onchain foundation
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="product-section cv-facility-intro" aria-label="Facilities built around your business">
      <div className="cv-product-shell">
        <div className="cv-editorial-intro">
          <p className="product-kicker cv-product-kicker">
            01 / Facility structures
          </p>
          <ScrollHighlight
            className="cv-editorial-statement"
            offset={["start 0.75", "end 0.35"]}
            text="Different businesses need different kinds of credit. Start with the cash flow, the collateral and the operating model. Build the facility around them."
          />
        </div>

      </div>
    </section>

    <section
      id="facilities"
      className="product-section cv-facilities"
      aria-labelledby="cv-facilities-title"
    >
      <div className="cv-product-shell">
        <div className="cv-facilities__heading">
          <h2 id="cv-facilities-title">One framework. Many forms of credit.</h2>
          <p>
            From a straightforward term facility to a revolving line or an
            asset-backed structure. Choose the approach, then define the details
            with your team.
          </p>
        </div>

        <div className="cv-facility-navigation" role="group" aria-label="Browse credit structures">
          <span>{creditStructures.length} facility structures</span>
          <button type="button" aria-label="Previous credit structures" aria-controls="credit-facility-collection" onClick={() => browseFacilities(-1)}><ArrowLeft size={17} aria-hidden="true" /></button>
          <button type="button" aria-label="Next credit structures" aria-controls="credit-facility-collection" onClick={() => browseFacilities(1)}><ArrowRight size={17} aria-hidden="true" /></button>
        </div>
        <div ref={facilitiesRef} id="credit-facility-collection" className="cv-facility-grid" role="region" aria-label="Credit facility structures" tabIndex={0}>
          {creditStructures.map((facility, index) => {
            const story = facilityStories[index];
            const Icon = story.icon;
            return (
              <article
                className={`cv-facility-card ${story.className ?? ""}`}
                key={facility.name}
                tabIndex={0}
              >
                <div className="cv-facility-card__top">
                  <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
                  <span className="cv-facility-card__number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="cv-facility-card__copy">
                  <h3>{facility.name}</h3>
                  <p>{story.description}</p>
                </div>
                <FacilityCardArt kind={story.art} />
                <div className="cv-facility-card__footer">
                  <p className="cv-facility-card__use">
                    <span>Built around</span>
                    {story.useCase}
                  </p>
                  <p className="cv-facility-card__configuration">
                    {story.configuration}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <p className="cv-facilities__note">
          Structure, asset availability, collateral controls and legal
          arrangements are defined for each facility.
        </p>
      </div>
    </section>

    <FacilityModules />
    <AgentsSection variant="credit-vaults" />
  </>
  );
};

export default CreditVaultsContent;
