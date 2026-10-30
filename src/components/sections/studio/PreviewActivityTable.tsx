import { motion } from "framer-motion";
import type { ActivityRow } from "./studioDeskData";

interface PreviewActivityTableProps {
  title: "Transactions" | "Requests";
  rows: ActivityRow[];
  newId?: string;
  reduced: boolean;
}

export default function PreviewActivityTable({
  title,
  rows,
  newId,
  reduced,
}: PreviewActivityTableProps) {
  const transactions = title === "Transactions";
  return (
    <div
      className="product-preview__activity preview-enter"
      data-kind={transactions ? "transaction" : "request"}
    >
      <div className="product-preview__table-heading">
        <h4>{title}</h4>
        <span aria-hidden="true">↗</span>
      </div>
      <div
        className="product-preview__table-scroll"
        role="region"
        aria-label={`Preview ${title.toLowerCase()}`}
        tabIndex={-1}
      >
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Vault</th>
              <th>Type</th>
              <th>Amount</th>
              {transactions && <th>Hash</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <motion.tr
                key={row.id}
                layout={reduced ? false : "position"}
                data-new={row.id === newId}
                initial={
                  row.id === newId && !reduced ? { opacity: 0, y: -12 } : false
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <td>{row.date}</td>
                <td>{row.vault}</td>
                <td>
                  <span
                    className="product-preview__type-dot"
                    aria-hidden="true"
                  />
                  {row.type}
                </td>
                <td>
                  {row.amount}
                  {row.id === newId && (
                    <span className="product-preview__new-tag">New</span>
                  )}
                </td>
                {transactions && (
                  <td className="product-preview__hash">{row.hash}</td>
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="product-preview__table-footer">
        <span aria-hidden="true">
          ‹ <b>1</b> ›
        </span>
        <span>
          Showing {rows.length} recent {title.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
