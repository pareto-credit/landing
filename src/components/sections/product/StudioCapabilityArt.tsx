import {
  ArrowDownLeft,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  FileText,
  Landmark,
  Layers3,
} from "lucide-react";
import "./studio-capability-art.css";

type StudioCapabilityKind =
  | "structuring"
  | "operations"
  | "participants"
  | "reporting";

function StructuringArt() {
  return (
    <div className="studio-art-structure">
      <div className="studio-art-structure__back studio-art-motion" />
      <div className="studio-art-structure__sheet studio-art-motion">
        <div className="studio-art-structure__heading">
          <span className="studio-art-structure__icon">
            <Layers3 size={14} strokeWidth={1.5} />
          </span>
          <div>
            <span className="studio-art-eyebrow">FAC-024</span>
            <strong>Facility setup</strong>
          </div>
          <span className="studio-art-structure__draft">Draft</span>
        </div>
        <div className="studio-art-structure__fields">
          <div className="studio-art-structure__field--wide">
            <span>Structure</span>
            <strong>Revolving credit</strong>
            <Layers3 size={11} strokeWidth={1.5} />
          </div>
          <div>
            <span>Term</span>
            <strong>12 months</strong>
          </div>
          <div>
            <span>Asset</span>
            <strong>USDC</strong>
          </div>
        </div>
        <div className="studio-art-structure__steps">
          <span className="is-complete" />
          <span className="is-complete" />
          <span />
          <span className="studio-art-eyebrow">02 / 03</span>
        </div>
      </div>
      <div className="studio-art-structure__note studio-art-motion">
        <span>
          <Check size={12} strokeWidth={1.7} />
        </span>
        Terms defined
      </div>
    </div>
  );
}

function OperationsArt() {
  return (
    <div className="studio-art-operations">
      <div className="studio-art-operations__heading">
        <span>Activity queue</span>
        <span className="studio-art-eyebrow">03 EVENTS</span>
      </div>
      <div className="studio-art-operations__rail" />
      <div className="studio-art-operations__queue">
        {[
          {
            title: "Funding request",
            detail: "FAC-024 · In review",
            amount: "$250k",
            Icon: ArrowDownLeft,
            state: "request",
          },
          {
            title: "Interest payment",
            detail: "FAC-024 · Recorded",
            amount: "$12.5k",
            Icon: Check,
            state: "payment",
          },
          {
            title: "Principal repaid",
            detail: "FAC-024 · Recorded",
            amount: "$100k",
            Icon: ArrowUpRight,
            state: "repayment",
          },
        ].map(({ title, detail, amount, Icon, state }) => (
          <div
            key={state}
            className={`studio-art-operations__event studio-art-operations__event--${state} studio-art-motion`}
          >
            <span className="studio-art-operations__icon">
              <Icon size={13} strokeWidth={1.6} />
            </span>
            <div className="studio-art-operations__detail">
              <strong>{title}</strong>
              <span>{detail}</span>
            </div>
            <span className="studio-art-operations__amount">{amount}</span>
          </div>
        ))}
      </div>
      <div className="studio-art-operations__footer">
        <span /> One facility. Every event.
      </div>
    </div>
  );
}

function ParticipantsArt() {
  return (
    <div className="studio-art-participants">
      <svg
        className="studio-art-participants__connections"
        viewBox="0 0 236 196"
        fill="none"
        focusable="false"
      >
        <path d="M118 54V83M118 127V143M50 150V143H186V150" />
        <circle
          className="studio-art-participants__signal studio-art-participants__signal--top studio-art-motion"
          cx="118"
          cy="66"
          r="2.5"
        />
        <circle
          className="studio-art-participants__signal studio-art-participants__signal--left studio-art-motion"
          cx="79"
          cy="143"
          r="2.5"
        />
        <circle
          className="studio-art-participants__signal studio-art-participants__signal--right studio-art-motion"
          cx="157"
          cy="143"
          r="2.5"
        />
      </svg>
      <div className="studio-art-participants__facility studio-art-motion">
        <Layers3 size={17} strokeWidth={1.5} />
        <div>
          <strong>Facility</strong>
          <span>FAC-024</span>
        </div>
      </div>
      {[
        {
          role: "Underwriter",
          detail: "Review & oversee",
          Icon: BadgeCheck,
          position: "top",
        },
        {
          role: "Borrower",
          detail: "Request & repay",
          Icon: Building2,
          position: "left",
        },
        {
          role: "Lender",
          detail: "Positions & reports",
          Icon: Landmark,
          position: "right",
        },
      ].map(({ role, detail, Icon, position }) => (
        <div
          key={role}
          className={`studio-art-participants__person studio-art-participants__person--${position} studio-art-motion`}
        >
          <span className="studio-art-participants__icon">
            <Icon size={13} strokeWidth={1.5} />
          </span>
          <div>
            <strong>{role}</strong>
            <span>{detail}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportingArt() {
  return (
    <div className="studio-art-reporting">
      <div className="studio-art-reporting__back studio-art-motion" />
      <div className="studio-art-reporting__sheet studio-art-motion">
        <div className="studio-art-reporting__heading">
          <FileText size={13} strokeWidth={1.5} />
          <strong>Facility report</strong>
          <span>Q3</span>
        </div>
        <div className="studio-art-reporting__chart-title">
          <span>Payment activity</span>
          <span className="studio-art-eyebrow">FAC-024</span>
        </div>
        <div className="studio-art-reporting__chart">
          {[
            [38, 27],
            [62, 41],
            [51, 34],
            [79, 53],
            [68, 47],
            [95, 67],
          ].map(([payments, requests], index) => (
            <span key={index}>
              <i
                className="studio-art-motion"
                style={{ height: `${payments}%` }}
              />
              <i
                className="studio-art-motion"
                style={{ height: `${requests}%` }}
              />
            </span>
          ))}
        </div>
        <div className="studio-art-reporting__legend">
          <span>
            <i /> Payments
          </span>
          <span>
            <i /> Requests
          </span>
        </div>
        <div className="studio-art-reporting__row">
          <span>Participant activity</span>
          <Check size={10} />
        </div>
        <div className="studio-art-reporting__row">
          <span>Transaction history</span>
          <Check size={10} />
        </div>
      </div>
      <span className="studio-art-reporting__seal studio-art-motion">
        <FileText size={17} strokeWidth={1.4} />
      </span>
    </div>
  );
}

const illustrations = {
  structuring: StructuringArt,
  operations: OperationsArt,
  participants: ParticipantsArt,
  reporting: ReportingArt,
};

export default function StudioCapabilityArt({
  kind,
}: {
  kind: StudioCapabilityKind;
}) {
  const Illustration = illustrations[kind];

  return (
    <div
      className={`studio-capability-art studio-capability-art--${kind}`}
      aria-hidden="true"
    >
      <Illustration />
    </div>
  );
}
