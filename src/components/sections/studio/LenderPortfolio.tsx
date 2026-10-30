import { useId } from "react";
import { lenderPositions, type PreviewEvent } from "./studioDeskData";
import "./lender-portfolio.css";

const usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/** Fictional portfolio following the supplied Lender App overview. */
export default function LenderPortfolio({
  events,
}: {
  events: PreviewEvent[];
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
    accrual;

  return (
    <div className="lender-portfolio">
      <span className="sr-only">Lender desk</span>
      <div className="lender-portfolio__heading">
        <div>
          <p className="product-preview__micro">Your capital, connected</p>
          <h3>Portfolio</h3>
          <p>Track and manage your credit portfolio.</p>
        </div>
        <span className="lender-portfolio__network">
          <span aria-hidden="true">◇</span> Ethereum
        </span>
      </div>

      <div className="lender-portfolio__summary">
        <section
          className="lender-portfolio__funds preview-enter"
          aria-label="Portfolio funds"
        >
          <span className="lender-portfolio__label">Total funds</span>
          <p
            className="lender-portfolio__total product-preview__value"
            key={totalFunds}
          >
            {usd(totalFunds)}
          </p>
          <div className="lender-portfolio__capital-bar" aria-hidden="true">
            {lenderPositions.map((position) => (
              <span key={position.name} style={{ flex: position.share }} />
            ))}
          </div>
          <dl className="lender-portfolio__pending">
            <div>
              <dt>
                <span aria-hidden="true">↗</span> Pending deposits
              </dt>
              <dd>$0.00</dd>
            </div>
            <div>
              <dt>
                <span aria-hidden="true">↙</span> Pending withdrawals
              </dt>
              <dd
                key={String(withdrawalAvailable)}
                className="product-preview__value"
              >
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
        >
          <h4 id={`${prefix}-allocation`}>Allocation</h4>
          <div className="lender-portfolio__allocation-body">
            <div className="lender-portfolio__donut">
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  fill="none"
                  stroke="#23453d"
                  strokeWidth="10"
                />
                <g className="lender-portfolio__ring-segments">
                  {lenderPositions.map((position, index) => (
                    <circle
                      key={position.name}
                      className={`lender-portfolio__ring lender-portfolio__ring--${index}`}
                      cx="60"
                      cy="60"
                      r="48"
                      pathLength="100"
                      fill="none"
                      strokeWidth="10"
                      strokeLinecap="butt"
                      strokeDasharray={`${position.share - 1.5} ${
                        101.5 - position.share
                      }`}
                      transform={`rotate(${
                        -90 + [0, 180, 295.2][index]
                      } 60 60)`}
                    />
                  ))}
                </g>
              </svg>
              <span>
                <strong>3</strong>
                <small>Credit vaults</small>
              </span>
            </div>
            <ul className="lender-portfolio__legend">
              {lenderPositions.map((position) => (
                <li key={position.name}>
                  <i aria-hidden="true" />
                  <span>{position.name}</span>
                  <strong>{position.share}%</strong>
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
        <div className="lender-portfolio__earnings preview-enter">
          <dl>
            <dt>Earnings</dt>
            <dd key={accrual} className="product-preview__value">
              {usd(1109824.93 + accrual)}
            </dd>
          </dl>
          <div
            className="lender-portfolio__earnings-chart preview-spark-bars"
            aria-hidden="true"
          >
            {[21, 30, 27, 42, 51, 48, 68, 77, 90, 100].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <dl className="lender-portfolio__stat preview-enter">
          <dt>Realized APY</dt>
          <dd>
            7.66<span>%</span>
          </dd>
          <small>Across your portfolio</small>
        </dl>
        <dl className="lender-portfolio__stat preview-enter">
          <dt>Active vaults</dt>
          <dd>3</dd>
          <small>2 USDC · 1 USDT</small>
        </dl>
      </section>

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
    </div>
  );
}
