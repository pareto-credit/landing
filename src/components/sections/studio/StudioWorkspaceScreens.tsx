import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  Check,
  ChevronDown,
  FileText,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import PreviewActivityTable from "./PreviewActivityTable";
import type { ActivityRow } from "./studioDeskData";
import "./studio-workspace-screens.css";

export type StudioWorkspaceView =
  | "structuring"
  | "operations"
  | "participants"
  | "reporting";

interface StudioWorkspaceScreensProps {
  view: StudioWorkspaceView;
  requests: ActivityRow[];
  transactions: ActivityRow[];
  requestCount: number;
  newRequestId?: string;
  newTransactionId?: string;
  isLive: boolean;
  reduced: boolean;
  animateEntrance?: boolean;
}

type Phase = 0 | 1 | 2;
type WorkspaceMetric = [label: string, value: string, detail: string];

/** View changes start a new workflow inside the existing Studio workspace. */
export default function StudioWorkspaceScreens(
  props: StudioWorkspaceScreensProps
) {
  return <WorkspaceScreen key={props.view} {...props} />;
}

function WorkspaceScreen({
  view,
  requests,
  transactions,
  requestCount,
  newRequestId,
  newTransactionId,
  isLive,
  reduced,
  animateEntrance = true,
}: StudioWorkspaceScreensProps) {
  const visible = usePageVisibility();
  const [phase, setPhase] = useState<Phase>(0);
  const running = isLive && visible && !reduced;
  const currentPhase = reduced ? 2 : phase;

  useEffect(() => {
    if (!running || view === "operations") return;
    const timer = window.setTimeout(
      () =>
        setPhase((current) => (current === 2 ? 0 : ((current + 1) as Phase))),
      phase === 2 ? 5000 : 2200
    );
    return () => window.clearTimeout(timer);
  }, [phase, running, view]);

  return (
    <motion.div
      className={`studio-workspace-screen studio-workspace-screen--${view}`}
      data-view={view}
      data-phase={currentPhase}
      data-motion-running={running}
      data-reduced-motion={reduced}
      initial={animateEntrance && running ? { opacity: 0, y: 7 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {view === "structuring" && (
        <StructuringScreen phase={currentPhase} running={running} />
      )}
      {view === "operations" && (
        <>
          <WorkspaceMetrics
            metrics={[
              ["Pending requests", String(9 + requestCount), "Awaiting review"],
              ["Facilities", "4", "Across your workspace"],
              [
                "Recent transactions",
                String(transactions.length),
                "Latest recorded activity",
              ],
            ]}
          />
          <div className="studio-workspace__operations-tables">
            <PreviewActivityTable
              title="Requests"
              rows={requests}
              newId={newRequestId}
              reduced={!running}
            />
            <PreviewActivityTable
              title="Transactions"
              rows={transactions}
              newId={newTransactionId}
              reduced={!running}
            />
          </div>
        </>
      )}
      {view === "participants" && (
        <ParticipantsScreen phase={currentPhase} running={running} />
      )}
      {view === "reporting" && (
        <ReportingScreen phase={currentPhase} running={running} />
      )}
    </motion.div>
  );
}

function WorkspaceMetrics({ metrics }: { metrics: WorkspaceMetric[] }) {
  return (
    <dl className="product-preview__metrics studio-workspace__metrics">
      {metrics.map(([label, value, detail]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
          <small>{detail}</small>
        </div>
      ))}
    </dl>
  );
}

function WorkflowStatus({
  status,
  complete = false,
  running,
}: {
  status: string;
  complete?: boolean;
  running: boolean;
}) {
  return (
    <span
      className="studio-workspace__status"
      data-complete={complete}
      aria-live="polite"
    >
      <span className="studio-workspace__status-dot" aria-hidden="true" />
      <motion.span
        key={status}
        initial={running ? { opacity: 0, y: 3 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: running ? 0.2 : 0 }}
      >
        {status}
      </motion.span>
    </span>
  );
}

const facilityFields = [
  ["Facility name", "Aster Revolving Credit"],
  ["Facility size", "$300,000,000"],
  ["Asset", "USDC"],
  ["Structure", "Revolving credit"],
  ["Network", "Ethereum"],
];

function StructuringScreen({
  phase,
  running,
}: {
  phase: Phase;
  running: boolean;
}) {
  const checks = [
    ["Facility details", "5 required fields completed"],
    ["Credit structure", "Revolving terms validated"],
    ["Review package", "Configuration ready to share"],
  ];

  return (
    <>
      <div className="studio-workspace__toolbar">
        <span className="product-preview__micro">Vault configuration</span>
        <WorkflowStatus
          status={["Draft", "Terms saved", "Ready for review"][phase]}
          complete={phase === 2}
          running={running}
        />
      </div>
      <div className="studio-workspace__structure-grid">
        <form
          className="studio-workspace__form"
          aria-label="Facility configuration"
        >
          <div className="studio-workspace__fields">
            {facilityFields.map(([label, value], index) => (
              <label
                key={label}
                className={index === 0 ? "studio-workspace__field--wide" : ""}
              >
                <span>{label}</span>
                <span className="studio-workspace__input-wrap">
                  <input value={value} readOnly tabIndex={-1} />
                  {index > 1 && <ChevronDown aria-hidden="true" />}
                </span>
              </label>
            ))}
          </div>
          <div className="studio-workspace__form-footer">
            <span data-complete={phase === 2}>
              <ShieldCheck aria-hidden="true" />
              {
                [
                  "All required fields completed",
                  "Validating facility configuration",
                  "All configuration checks passed",
                ][phase]
              }
            </span>
            <button type="button" tabIndex={-1}>
              {phase === 2 && <Check aria-hidden="true" />}
              {["Save terms", "Prepare review", "Review ready"][phase]}
            </button>
          </div>
        </form>
        <aside
          className="studio-workspace__validation"
          aria-label="Configuration checks"
        >
          <h4>Configuration checks</h4>
          <ol>
            {checks.map(([label, detail], index) => (
              <li key={label} data-complete={index <= phase}>
                <span className="studio-workspace__check" aria-hidden="true">
                  {index <= phase ? <Check /> : index + 1}
                </span>
                <div>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </div>
              </li>
            ))}
          </ol>
          <div className="studio-workspace__validation-note">
            <span className="product-preview__micro">Facility owner</span>
            <strong>Aster Credit</strong>
            <span>Originator workspace</span>
          </div>
        </aside>
      </div>
    </>
  );
}

const organizations = [
  {
    name: "Aster Credit",
    role: "Underwriter",
    access: "Vault management",
    initials: "AC",
  },
  {
    name: "Meridian Borrowing",
    role: "Borrower",
    access: "Requests & payments",
    initials: "MB",
  },
  {
    name: "Harbour Capital",
    role: "Lender",
    access: "Reports & positions",
    initials: "HC",
  },
];

function ParticipantsScreen({
  phase,
  running,
}: {
  phase: Phase;
  running: boolean;
}) {
  return (
    <>
      <WorkspaceMetrics
        metrics={[
          ["Organizations", "3", "Connected to this workspace"],
          ["Active access", phase === 2 ? "3" : "2", "Role-based permissions"],
          [
            "Pending review",
            phase === 2 ? "0" : "1",
            "Organization onboarding",
          ],
        ]}
      />
      <div className="studio-workspace__toolbar">
        <span className="studio-workspace__filter">All organizations</span>
        <button
          className="studio-workspace__quiet-button"
          type="button"
          tabIndex={-1}
        >
          <Plus aria-hidden="true" /> Invite organization
        </button>
      </div>
      <table className="studio-workspace__organizations">
        <thead>
          <tr>
            <th>Organization</th>
            <th>Role</th>
            <th>Access</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization, index) => (
            <tr key={organization.name} data-updated={index === 2 && phase > 0}>
              <td>
                <div className="studio-workspace__organization">
                  <span
                    className="studio-workspace__organization-mark"
                    aria-hidden="true"
                  >
                    {organization.initials}
                  </span>
                  <div>
                    <strong>{organization.name}</strong>
                    <small className="studio-workspace__mobile-role">
                      {organization.role}
                    </small>
                  </div>
                </div>
              </td>
              <td>{organization.role}</td>
              <td>{organization.access}</td>
              <td>
                <WorkflowStatus
                  status={
                    index === 2
                      ? ["Invited", "Review complete", "Active"][phase]
                      : "Active"
                  }
                  complete={index < 2 || phase === 2}
                  running={running && index === 2}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="studio-workspace__access-log">
        <div className="product-preview__table-heading">
          <h4>Access activity</h4>
          <span>Harbour Capital</span>
        </div>
        <ol>
          {[
            "Invitation sent",
            "Organization verified",
            "Permissions enabled",
          ].map((label, index) => (
            <li key={label} data-complete={index <= phase}>
              <span className="studio-workspace__check" aria-hidden="true">
                {index <= phase ? <Check /> : index + 1}
              </span>
              <span>{label}</span>
              <small>{index <= phase ? "Complete" : "Pending"}</small>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

const reports = [
  ["Borrower report", "Aster Credit", "PDF"],
  ["Facility summary", "Meridian Borrowing", "PDF"],
  ["Transaction export", "All facilities", "CSV"],
];

function ReportingScreen({
  phase,
  running,
}: {
  phase: Phase;
  running: boolean;
}) {
  return (
    <>
      <WorkspaceMetrics
        metrics={[
          [
            "Available reports",
            phase === 2 ? "3" : "2",
            "Current reporting period",
          ],
          ["Reporting period", "Oct 2026", "Monthly reporting"],
          ["Report types", "3", "Borrower, facility and transactions"],
        ]}
      />
      <div className="studio-workspace__report-chart">
        <div className="studio-workspace__chart-heading">
          <div>
            <h4>Capital outstanding</h4>
            <strong>$248.6M</strong>
          </div>
          <span>
            <i aria-hidden="true" /> Aster USDC
          </span>
        </div>
        <div className="studio-workspace__plot">
          <div className="studio-workspace__chart-axis" aria-hidden="true">
            <span>$300M</span>
            <span>$150M</span>
            <span>$0</span>
          </div>
          <svg
            viewBox="0 0 600 100"
            preserveAspectRatio="none"
            role="img"
            aria-label="Illustrative Aster USDC capital outstanding from July to October"
          >
            <path
              className="studio-workspace__chart-grid"
              d="M0 4H600M0 49H600M0 94H600"
            />
            <path
              className="studio-workspace__chart-area"
              d="M0 72L60 69L120 54L180 57L240 42L300 46L360 32L420 36L480 25L540 29L600 20V94H0Z"
            />
            <path
              className="studio-workspace__chart-line"
              d="M0 72L60 69L120 54L180 57L240 42L300 46L360 32L420 36L480 25L540 29L600 20"
            />
          </svg>
          <div className="studio-workspace__chart-months" aria-hidden="true">
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
          </div>
        </div>
      </div>
      <div className="product-preview__table-heading studio-workspace__document-heading">
        <h4>Documents</h4>
        <span>October 2026</span>
      </div>
      <table className="studio-workspace__documents">
        <thead>
          <tr>
            <th>Report</th>
            <th>Format</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Download</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map(([name, organization, format], index) => {
            const available = index > 0 || phase === 2;
            return (
              <tr key={name} data-updated={index === 0 && phase > 0}>
                <td>
                  <div className="studio-workspace__document-name">
                    <FileText aria-hidden="true" />
                    <div>
                      <strong>{name}</strong>
                      <small>{organization}</small>
                    </div>
                  </div>
                </td>
                <td>{format}</td>
                <td>
                  <WorkflowStatus
                    status={
                      index === 0
                        ? ["Requested", "Received", "Available"][phase]
                        : "Available"
                    }
                    complete={available}
                    running={running && index === 0}
                  />
                </td>
                <td>
                  <span
                    className="studio-workspace__download"
                    data-available={available}
                  >
                    <ArrowDownToLine aria-hidden="true" />
                    <span>{available ? "Download" : "Processing"}</span>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
