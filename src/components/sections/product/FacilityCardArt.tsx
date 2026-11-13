"use client";

import { memo, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import usdcLogo from "../../../assets/images/tokens/usdc.png";
import usdtLogo from "../../../assets/images/tokens/usdt.png";
import ethLogo from "../../../assets/images/tokens/eth.png";
import btcLogo from "../../../assets/images/tokens/btc.png";
import "./facility-card-art.css";

export type FacilityArtKind =
  | "term"
  | "revolving"
  | "collateral"
  | "custody"
  | "accounts"
  | "balance"
  | "receivables"
  | "assets";

const LedgerLines = () => (
  <div className="cv-facility-art__ledger">
    {[0, 1, 2].map((row) => (
      <span className="cv-facility-art__ledger-row" key={row}>
        <span />
        <span />
      </span>
    ))}
  </div>
);

const TermArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Lending cycle</span>
      <span>Scheduled windows</span>
    </div>
    <div className="cv-facility-art__term-stages">
      <div className="cv-facility-art__term-stage">
        <span>Subscribe</span>
        <div className="cv-facility-art__capital-stack">
          {[0, 1, 2].map((unit) => (
            <span className="cv-facility-art__motion" key={unit} />
          ))}
        </div>
      </div>
      <div className="cv-facility-art__term-stage">
        <span>Lend</span>
        <div className="cv-facility-art__term-period">
          {[0, 1, 2, 3].map((period) => (
            <span className="cv-facility-art__motion" key={period} />
          ))}
        </div>
      </div>
      <div className="cv-facility-art__term-stage">
        <span>Settle</span>
        <div className="cv-facility-art__term-statement cv-facility-art__motion">
          <LedgerLines />
        </div>
      </div>
    </div>
    <div className="cv-facility-art__term-route">
      <span />
      <span />
      <span />
      <div className="cv-facility-art__term-cursor cv-facility-art__motion">
        <i />
      </div>
    </div>
  </>
);

const RevolvingArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Borrowing capacity</span>
    </div>
    <div className="cv-facility-art__capacity-labels">
      <span>Drawn</span>
      <span>Available</span>
    </div>
    <div className="cv-facility-art__capacity">
      <span className="cv-facility-art__capacity-fill cv-facility-art__motion" />
      <div className="cv-facility-art__capacity-ticks">
        {[0, 1, 2, 3, 4, 5, 6].map((tick) => (
          <span key={tick} />
        ))}
      </div>
    </div>
    <div className="cv-facility-art__revolving-cycle">
      <span>Draw</span>
      <div className="cv-facility-art__revolving-flow">
        <svg
          viewBox="0 0 180 34"
          preserveAspectRatio="none"
          fill="none"
          focusable="false"
        >
          <path d="M2 11H174M168 6L175 11L168 16M178 25H6M12 20L5 25L12 30" />
        </svg>
        <span className="cv-facility-art__draw-packet cv-facility-art__motion" />
        <span className="cv-facility-art__repay-packet cv-facility-art__motion" />
      </div>
      <span>Repay</span>
    </div>
  </>
);

const CollateralArt = () => (
  <div className="cv-facility-art__coverage">
    <div className="cv-facility-art__coverage-side">
      <span>Collateral</span>
      <div className="cv-facility-art__collateral-stack">
        {[0, 1, 2].map((asset) => (
          <div
            className="cv-facility-art__collateral-tile cv-facility-art__motion"
            key={asset}
          >
            <span />
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
    <div className="cv-facility-art__coverage-divider">
      <span />
      <span />
    </div>
    <div className="cv-facility-art__coverage-side">
      <span>Credit</span>
      <div className="cv-facility-art__credit-block">
        <span />
        <span />
      </div>
    </div>
    <div className="cv-facility-art__coverage-baseline" />
  </div>
);

const CustodyArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Custody</span>
      <span>Evidence</span>
    </div>
    <div className="cv-facility-art__custody">
      <div className="cv-facility-art__vault">
        <div className="cv-facility-art__vault-door">
          <div className="cv-facility-art__vault-dial">
            <span />
            <span />
          </div>
          <div className="cv-facility-art__vault-assets">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="cv-facility-art__custody-link">
        <span className="cv-facility-art__motion" />
      </div>
      <div className="cv-facility-art__evidence">
        {[0, 1, 2].map((record) => (
          <div className="cv-facility-art__evidence-row" key={record}>
            <span className="cv-facility-art__evidence-mark cv-facility-art__motion" />
            <span />
            <span />
          </div>
        ))}
      </div>
    </div>
  </>
);

const AccountsArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Account visibility</span>
    </div>
    <div className="cv-facility-art__accounts">
      {["Exchange", "Prime", "Bank"].map((account) => (
        <div className="cv-facility-art__account" key={account}>
          <span className="cv-facility-art__account-focus cv-facility-art__motion" />
          <span className="cv-facility-art__account-title">{account}</span>
          <LedgerLines />
          <span className="cv-facility-art__account-foot" />
        </div>
      ))}
    </div>
    <div className="cv-facility-art__account-rail">
      <span />
      <span />
      <span />
    </div>
  </>
);

const BalanceArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Financials</span>
      <span>Cash flows</span>
    </div>
    <div className="cv-facility-art__balance">
      <div className="cv-facility-art__financials">
        <div className="cv-facility-art__financials-heading">
          <span />
          <span />
        </div>
        <LedgerLines />
        <span className="cv-facility-art__financials-total cv-facility-art__motion" />
      </div>
      <div className="cv-facility-art__cash-flows">
        {[0, 1, 2, 3, 4].map((flow) => (
          <span
            className="cv-facility-art__cash-flow cv-facility-art__motion"
            key={flow}
          />
        ))}
      </div>
    </div>
  </>
);

const ReceivablesArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Receivables</span>
      <span>Asset pool</span>
    </div>
    <div className="cv-facility-art__receivables">
      <div className="cv-facility-art__invoice-stack">
        <div className="cv-facility-art__invoice-back" />
        <div className="cv-facility-art__invoice cv-facility-art__motion">
          <span>Invoice</span>
          <LedgerLines />
          <span className="cv-facility-art__invoice-foot" />
        </div>
      </div>
      <div className="cv-facility-art__pool-link">
        <span className="cv-facility-art__pool-packet cv-facility-art__motion" />
      </div>
      <div className="cv-facility-art__invoice-pool">
        {[0, 1, 2, 3, 4, 5].map((invoice) => (
          <span
            className="cv-facility-art__pool-item cv-facility-art__motion"
            key={invoice}
          >
            <i />
            <i />
          </span>
        ))}
      </div>
    </div>
  </>
);

const AssetsArt = () => (
  <>
    <div className="cv-facility-art__caption">
      <span>Isolated asset accounting</span>
    </div>
    <div className="cv-facility-art__asset-vaults">
      {[
        { name: "USDC / USDT", logos: [usdcLogo, usdtLogo] },
        { name: "ETH", logos: [ethLogo] },
        { name: "BTC", logos: [btcLogo] },
      ].map((asset) => (
        <div className="cv-facility-art__asset-vault" key={asset.name}>
          <span className="cv-facility-art__asset-name">{asset.name}</span>
          <div className="cv-facility-art__asset-logos">
            {asset.logos.map((src) => <img key={src} src={src} alt="" width="28" height="28" loading="lazy" decoding="async" />)}
          </div>
          <div className="cv-facility-art__asset-ledger cv-facility-art__motion">
            <LedgerLines />
          </div>
          <span className="cv-facility-art__asset-network">EVM vault</span>
        </div>
      ))}
    </div>
  </>
);

const illustrations = {
  term: <TermArt />,
  revolving: <RevolvingArt />,
  collateral: <CollateralArt />,
  custody: <CustodyArt />,
  accounts: <AccountsArt />,
  balance: <BalanceArt />,
  receivables: <ReceivablesArt />,
  assets: <AssetsArt />,
};

/** Illustrative mechanics, with no depicted amounts or live facility data. */
const FacilityCardArt = memo(function FacilityCardArt({
  kind,
}: {
  kind: FacilityArtKind;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const pageVisible = usePageVisibility();
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className={`cv-facility-art cv-facility-art--${kind}`}
      data-running={inView && pageVisible && !reduced}
      data-reduced={Boolean(reduced)}
      aria-hidden="true"
    >
      {illustrations[kind]}
    </div>
  );
});

export default FacilityCardArt;
