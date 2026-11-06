import { useId, type CSSProperties } from "react";
import PreviewNumber from "./PreviewNumber";
import { lenderPositions, type PreviewEvent } from "./studioDeskData";
import portfolioArt from "../../../assets/lender-preview/money-grow.png";
import earningsIcon from "../../../assets/lender-preview/earnings.svg";
import roiIcon from "../../../assets/lender-preview/roi.svg";
import apyIcon from "../../../assets/lender-preview/apy.svg";
import vaultsIcon from "../../../assets/lender-preview/vaults.svg";
import uspIcon from "../../../assets/lender-preview/USP.svg";
import suspIcon from "../../../assets/lender-preview/sUSP.svg";
import usdcIcon from "../../../assets/lender-preview/USDC.svg";
import usdtIcon from "../../../assets/lender-preview/USDT.svg";
import balancerIcon from "../../../assets/lender-preview/balancer.svg";
import eulerIcon from "../../../assets/lender-preview/euler.svg";
import "./lender-portfolio.css";

const usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const stakedAssetBalance = 4_000_000;
const stakedAssetEarnings = 180_000;
// Fictional holdings, included in the portfolio total and token allocation.
const previewAssets = [
  {
    symbol: "USP",
    caption: "Synthetic Dollar",
    icon: uspIcon,
    balance: 0,
    metrics: [
      ["Balance", "$0.00"],
      ["Price", "$1.00"],
      ["Collateral", "100.5%"],
    ],
    pool: "Balancer Pool",
    poolIcon: balancerIcon,
  },
  {
    symbol: "sUSP",
    caption: "Staked USP",
    icon: suspIcon,
    balance: stakedAssetBalance,
    metrics: [
      ["Balance", usd(stakedAssetBalance)],
      ["Earnings", usd(stakedAssetEarnings)],
      ["APY", "7.58%"],
    ],
    pool: "Euler Pool",
    poolIcon: eulerIcon,
  },
];

/** A bounded, illustrative version of the actual Lender App portfolio. */
export default function LenderPortfolio({
  events,
  running,
  reduced,
  showAssets = false,
}: {
  events: PreviewEvent[];
  running: boolean;
  reduced: boolean;
  showAssets?: boolean;
}) {
  const prefix = useId();
  const reportAvailable = events.some((event) => event.kind === "report");
  const withdrawalAvailable = events.some(
    (event) => event.kind === "withdrawal"
  );
  const accrual = events.reduce(
    (total, event) => total + (event.earningsDelta ?? 0),
    0
  );
  const totalFunds =
    lenderPositions.reduce((total, position) => total + position.balance, 0) +
    previewAssets.reduce((total, asset) => total + asset.balance, 0) +
    accrual;
  const totalEarnings = 1109824.93 + stakedAssetEarnings + accrual;
  const roi = (totalEarnings / (totalFunds - totalEarnings)) * 100;
  const tokenAllocations = [
    {
      symbol: "USDC",
      icon: usdcIcon,
      balance:
        lenderPositions
          .filter((position) => position.asset === "USDC")
          .reduce((total, position) => total + position.balance, 0) + accrual,
    },
    {
      symbol: "USDT",
      icon: usdtIcon,
      balance: lenderPositions
        .filter((position) => position.asset === "USDT")
        .reduce((total, position) => total + position.balance, 0),
    },
    { symbol: "sUSP", icon: suspIcon, balance: previewAssets[1].balance },
  ];
  const metrics = [
    {
      label: "Earnings",
      value: usd(totalEarnings),
      icon: earningsIcon,
      animated: true,
    },
    { label: "ROI", value: `${roi.toFixed(2)}%`, icon: roiIcon },
    { label: "Realized APY", value: "7.66%", icon: apyIcon },
    {
      label: "Vaults",
      value: String(
        lenderPositions.length +
          previewAssets.filter((asset) => asset.balance > 0).length
      ),
      icon: vaultsIcon,
    },
  ];

  return (
    <div className="lender-portfolio">
      <span className="sr-only">Lender desk</span>
      <div className="lender-portfolio__heading">
        <span className="lender-portfolio__hero-art" aria-hidden="true">
          <img src={portfolioArt} alt="" />
        </span>
        <div>
          <h3>Portfolio</h3>
          <p>Track and manage your yield portfolio</p>
        </div>
      </div>

      <div className="lender-portfolio__summary">
        <section
          className="lender-portfolio__funds preview-enter"
          aria-label="Portfolio funds"
        >
          <h4 className="lender-portfolio__label">Total funds</h4>
          <p className="lender-portfolio__total">
            <PreviewNumber
              value={usd(totalFunds)}
              running={running}
              reduced={reduced}
            />
          </p>
          <dl className="lender-portfolio__pending">
            <div>
              <dt>Pending deposits</dt>
              <dd>
                <span aria-hidden="true">+</span> $0.00
              </dd>
            </div>
            <div>
              <dt>Pending withdrawals</dt>
              <dd className="product-preview__value">
                <span className="lender-portfolio__minus" aria-hidden="true">
                  −
                </span>{" "}
                {usd(withdrawalAvailable ? 0 : 25000)}
              </dd>
            </div>
          </dl>
          <p
            className="lender-portfolio__fund-note"
            data-available={withdrawalAvailable}
          >
            <span aria-hidden="true">{withdrawalAvailable ? "✓" : "◷"}</span>
            {withdrawalAvailable
              ? "25,000 USDC ready to claim · included in total funds"
              : "Your withdrawal is processing for the next settlement."}
          </p>
        </section>

        <section
          className="lender-portfolio__allocation preview-enter"
          aria-labelledby={`${prefix}-allocation`}
          tabIndex={-1}
        >
          <div className="lender-portfolio__allocation-heading">
            <h4 id={`${prefix}-allocation`}>Allocation</h4>
            <span
              className="lender-portfolio__allocation-tabs"
              aria-hidden="true"
            >
              <span className="is-selected">Tokens</span>
              <span>Chains</span>
            </span>
          </div>
          <div className="lender-portfolio__allocation-body">
            <div className="lender-portfolio__donut">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="var(--portfolio-track)"
                  strokeWidth="10"
                />
                <g className="lender-portfolio__ring-segments">
                  {tokenAllocations.map((token, index) => {
                    const share = (token.balance / totalFunds) * 100;
                    const start = tokenAllocations
                      .slice(0, index)
                      .reduce(
                        (total, item) =>
                          total + (item.balance / totalFunds) * 360,
                        -90
                      );
                    return (
                      <circle
                        key={token.symbol}
                        className={`lender-portfolio__ring lender-portfolio__ring--${index}`}
                        style={
                          {
                            "--ring-share": share - 0.6,
                            "--ring-gap": 100.6 - share,
                            "--ring-delay": `${220 + index * 120}ms`,
                          } as CSSProperties
                        }
                        cx="60"
                        cy="60"
                        r="48"
                        pathLength="100"
                        fill="none"
                        strokeWidth="10"
                        strokeDasharray={`${share - 0.6} ${100.6 - share}`}
                        transform={`rotate(${start} 60 60)`}
                      />
                    );
                  })}
                </g>
              </svg>
              <span>
                <strong>3</strong>
                <small>Tokens</small>
              </span>
            </div>
            <ul
              className="lender-portfolio__token-chips"
              aria-label="Token allocation"
            >
              {tokenAllocations.map((token) => (
                <li key={token.symbol}>
                  <img src={token.icon} alt={token.symbol} />
                  <span>{usd(token.balance)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section
        className="lender-portfolio__performance"
        aria-label="Portfolio performance"
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`lender-portfolio__stat ${
              metric.animated ? "lender-portfolio__earnings" : ""
            }`}
          >
            <img src={metric.icon} alt="" aria-hidden="true" />
            <dl>
              <dt>{metric.label}</dt>
              <dd>
                {metric.animated ? (
                  <PreviewNumber
                    value={metric.value}
                    running={running}
                    reduced={reduced}
                  />
                ) : (
                  metric.value
                )}
              </dd>
            </dl>
          </div>
        ))}
      </section>

      {showAssets && (
        <section
          className="lender-portfolio__assets"
          aria-labelledby={`${prefix}-assets`}
        >
          <h4 id={`${prefix}-assets`}>Assets</h4>
          <div className="lender-portfolio__asset-grid">
            {previewAssets.map((asset) => (
              <article
                key={asset.symbol}
                className="lender-portfolio__asset-card"
                aria-label={`${asset.symbol} asset`}
              >
                <div className="lender-portfolio__asset-heading">
                  <img src={asset.icon} alt="" />
                  <div>
                    <h5>{asset.symbol}</h5>
                    <p>{asset.caption}</p>
                  </div>
                  <span className="lender-portfolio__view" aria-hidden="true">
                    View
                  </span>
                </div>
                <dl className="lender-portfolio__asset-metrics">
                  {asset.metrics.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="lender-portfolio__pool-label">Pools</p>
                <div className="lender-portfolio__pool">
                  <img src={asset.poolIcon} alt="" />
                  <div>
                    <strong>{asset.pool}</strong>
                    <small>Liquidity pool</small>
                  </div>
                  <span>0.00 {asset.symbol}</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!showAssets && (
        <section
          className="lender-portfolio__vaults preview-enter"
          aria-labelledby={`${prefix}-vaults`}
        >
          <div className="lender-portfolio__table-heading">
            <h4 id={`${prefix}-vaults`}>Vaults</h4>
            <span>
              All positions <span aria-hidden="true">↗</span>
            </span>
          </div>
          <div
            className="lender-portfolio__table-scroll product-preview__table-scroll"
            role="region"
            aria-label="Lending vaults"
            tabIndex={-1}
          >
            <table>
              <thead>
                <tr>
                  <th>Vault</th>
                  <th>Status</th>
                  <th>Asset</th>
                  <th>Realized APY</th>
                  <th>Balance</th>
                  <th>Updates</th>
                </tr>
              </thead>
              <tbody>
                {lenderPositions.map((position, index) => (
                  <tr key={position.name}>
                    <td>
                      <div className="lender-portfolio__vault-name">
                        <span
                          className={`lender-portfolio__monogram lender-portfolio__monogram--${index}`}
                          aria-hidden="true"
                        >
                          {position.name[0]}
                        </span>
                        <div>
                          <strong>{position.name}</strong>
                          <small>{position.category}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="lender-portfolio__status">
                        <i /> Running
                      </span>
                    </td>
                    <td>
                      <span className="lender-portfolio__asset">
                        {position.asset}
                      </span>
                    </td>
                    <td>{position.apy}</td>
                    <td>
                      <span
                        key={index === 0 ? accrual : position.balance}
                        className="product-preview__value"
                      >
                        {usd(position.balance + (index === 0 ? accrual : 0))}
                      </span>
                    </td>
                    <td>
                      {index === 0 ? (
                        <span
                          className="lender-portfolio__update"
                          data-new={reportAvailable}
                          key={String(reportAvailable)}
                        >
                          {reportAvailable
                            ? "October report"
                            : "Monthly reporting"}
                          {reportAvailable && <b>New</b>}
                        </span>
                      ) : index === 1 ? (
                        <span
                          className="lender-portfolio__update"
                          data-available={withdrawalAvailable}
                          key={String(withdrawalAvailable)}
                        >
                          {withdrawalAvailable
                            ? "25,000 USDC available"
                            : "Withdrawal pending"}
                        </span>
                      ) : (
                        <span className="lender-portfolio__muted">
                          Up to date
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="lender-portfolio__table-note">
            Balances include funds pending settlement or available to claim.
          </p>
        </section>
      )}
    </div>
  );
}
