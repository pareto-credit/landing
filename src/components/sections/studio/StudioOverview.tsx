import type { ActivityRow, PersonaId } from "./studioDeskData";
import { borrowerFacility, previewVaults } from "./studioDeskData";
import PreviewActivityTable from "./PreviewActivityTable";

const usd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
const compactUsd = (value: number) =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  });
interface StudioOverviewProps {
  role: PersonaId;
  requests: ActivityRow[];
  transactions: ActivityRow[];
  requestCount: number;
  outstanding: number;
  newRequestId?: string;
  newTransactionId?: string;
  reduced: boolean;
}

export default function StudioOverview({
  role,
  requests,
  transactions,
  requestCount,
  outstanding,
  newRequestId,
  newTransactionId,
  reduced,
}: StudioOverviewProps) {
  const borrower = role === "borrow";
  const metrics = borrower
    ? [
        ["Outstanding", usd(outstanding), "Across your active facility"],
        [
          "Available capacity",
          usd(borrowerFacility.capacity - outstanding),
          "Subject to facility terms",
        ],
        ["Facility size", usd(borrowerFacility.capacity), "USDC · Ethereum"],
        ["Pending requests", "2", "Awaiting processing"],
      ]
    : [
        [
          "Total value locked",
          compactUsd(
            previewVaults.reduce((total, vault) => total + vault.tvl, 0)
          ),
          "Across active vaults",
        ],
        ["Total accrued yield", "$3.68M", "Current facility cycles"],
        ["Facilities", "4", "2 running · 1 waiting · 1 finished"],
        ["Pending requests", String(9 + requestCount), "Awaiting review"],
      ];

  return (
    <>
      <dl className="product-preview__metrics product-preview__metrics--overview">
        {metrics.map(([label, value, note], index) => (
          <div key={label} className="preview-enter">
            <dt>
              {label}
              <span aria-hidden="true">↗</span>
            </dt>
            <dd key={value} className="product-preview__value">
              {value}
            </dd>
            <small>{note}</small>
            {index < 2 && (
              <span className="preview-spark-bars" aria-hidden="true">
                {(borrower
                  ? [38, 54, 46, 68, 58, 77, 70, 90]
                  : [22, 37, 31, 49, 61, 58, 78, 94]
                ).map((height, bar) => (
                  <i key={bar} style={{ height: `${height}%` }} />
                ))}
              </span>
            )}
          </div>
        ))}
      </dl>
      <div className="product-preview__overview-grid">
        <div className="product-preview__vaults">
          <div className="product-preview__table-heading">
            <h4>Vaults</h4>
            <span className="product-preview__view-tabs">
              Live <b>Drafts 2</b>
            </span>
          </div>
          <div className="product-preview__vault-grid">
            {previewVaults.map((vault, index) => (
              <article
                className="product-preview__vault preview-enter"
                key={vault.name}
              >
                <div className="product-preview__vault-top">
                  <span
                    className="product-preview__vault-monogram"
                    aria-hidden="true"
                  >
                    {vault.name[0]}
                  </span>
                  <div>
                    <h5>{vault.name}</h5>
                    <p>{vault.category}</p>
                  </div>
                  <span
                    className="product-preview__vault-status"
                    data-status={vault.status}
                  >
                    {vault.status}
                  </span>
                </div>
                <dl>
                  <div>
                    <dt>APR</dt>
                    <dd>{vault.apr}</dd>
                  </div>
                  <div>
                    <dt>TVL</dt>
                    <dd>
                      {compactUsd(
                        borrower && index === 0 ? outstanding : vault.tvl
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>{vault.duration}</dd>
                  </div>
                </dl>
                <div className="product-preview__cycle">
                  <span>Progress</span>
                  <span>{vault.note}</span>
                </div>
                <div className="product-preview__progress">
                  <span style={{ transform: `scaleX(${vault.progress})` }} />
                </div>
                <span className="product-preview__manage">
                  Manage vault <span aria-hidden="true">↗</span>
                </span>
                <span className="sr-only">
                  Illustrative facility {index + 1}
                </span>
              </article>
            ))}
          </div>
        </div>
        <div className="product-preview__activity-stack">
          <PreviewActivityTable
            title="Transactions"
            rows={transactions}
            newId={newTransactionId}
            reduced={reduced}
          />
          <PreviewActivityTable
            title="Requests"
            rows={requests}
            newId={newRequestId}
            reduced={reduced}
          />
        </div>
      </div>
    </>
  );
}
