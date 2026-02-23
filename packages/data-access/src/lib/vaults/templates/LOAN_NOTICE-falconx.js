"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoanNoticeFalconX", {
    enumerable: true,
    get: function() {
        return LoanNoticeFalconX;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _vaulttemplatelib = require("../libs/vault-template.lib");
const LoanNoticeFalconX = {
    name: 'FalconX Loan Notice',
    filename: 'falconx-loan-notice.pdf',
    requiredFields: [
        'noticeDate',
        'startDate',
        'endDate',
        'interestRate',
        'principal'
    ],
    parser: (params)=>{
        const roundedStart = (0, _vaulttemplatelib.roundStart)((0, _moment.default)(params['startDate']));
        const roundedEnd = (0, _vaulttemplatelib.roundEnd)((0, _moment.default)(params['endDate']));
        return _extends._({}, params, {
            startDate: roundedStart,
            endDate: roundedEnd
        });
    },
    content: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>FalconX - Loan Notice</title>
    <style>
      body {
        font-family: 'Times New Roman', serif;
        padding: 0;
        line-height: 1.3;
        color: #000;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        margin-bottom: 32px;
      }
      .execution {
        width: 100%;
        text-align: right;
        font-weight: bold;
        font-style: italic;
      }
      .company {
        text-align: center;
        margin: 0 auto;
      }
      .date {
        width: 100%;
        text-align: right;
        margin-top: 16px;
      }
      .address {
        margin-bottom: 24px;
      }
      h1 {
        font-size: 22px;
        margin-bottom: 8px;
      }
      ol {
        padding-left: 18px;
      }
      .principal-card {
        margin-top: 36px;
        padding: 20px;
        border: 1px solid #111;
        border-radius: 6px;
        background: #0f1a15;
        color: #e5f5ee;
        font-family: 'Helvetica Neue', Arial, sans-serif;
      }
      .principal-card h2 {
        margin: 0 0 12px;
        font-size: 18px;
      }
      .section-title {
        margin: 16px 0 8px;
        font-weight: 700;
      }
      .hint {
        background: #1c2a23;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 12px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
      }
      .table td {
        padding: 8px 4px;
        border-bottom: 1px solid #2d3d34;
        font-size: 14px;
      }
      .table .label {
        text-align: left;
      }
      .table .value {
        text-align: right;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .table tfoot td {
        font-weight: bold;
        border-top: 1px solid #2d3d34;
      }
      .signature-page {
        margin-top: 80px;
        display: flex;
        justify-content: flex-end;
      }
      .signature-content {
        max-width: 320px;
        text-align: left;
        font-size: 16px;
      }
      .signature-line {
        display: inline-block;
        width: 260px;
        border-bottom: 1px solid #000;
        margin-left: 8px;
        transform: translateY(-6px);
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="execution">Execution Version</div>
      <div class="company">
        <strong>Falcon Labs Ltd</strong><br />
        9th MAIN, 7th Sector<br />
        HSR Layout Bangalore, Karnataka, 560102 India
      </div>
      <div class="date">%{noticeDate}</div>
    </div>

    <div class="address">
      M11 Credit<br />
      Herengracht 136<br />
      1015 BV Amsterdam<br />
      The Netherlands<br />
      Attn: Joost van der Plas<br />
      Email: operations@m11credit.com
    </div>

    <p>Ladies and Gentlemen:</p>
    <p style="text-align: justify;">
      Reference is made to that certain Credit Agreement, dated as of January 6,
      2025, by and among OspreyX 2024-A Limited, as borrower, M11 Credit, as
      Administrative Agent, Falcon Labs Ltd, as Collateral Manager, M11 Credit,
      as Collateral Agent, Idle DAO LLC, as Technology Services Provider, and
      the Lenders from time to time party thereto (as amended, restated, amended
      and restated, extended, supplemented or otherwise modified in writing from
      time to time, the "<u>Agreement</u>"). Capitalized terms used but not otherwise
      defined herein shall have the meaning given to such terms in the
      Agreement.
    </p>
    <p>
      This notice is a Loan Notice contemplated by <u>Section 2(c)</u> of the Agreement
      and sets forth the following terms and conditions applicable to the Loan
      for the duration of the next succeeding Loan Period (the "<u>Upcoming Loan
      Period</u>"). With respect to the Upcoming Loan Period:
    </p>
    <ol style="padding-left: 64px;">
      <li>
        <u>Interest Rate</u>. Interest on the Loan during the Upcoming
        Loan Period shall accrue at a rate equal to %{interestRate}% per annum.
      </li>
      <li>
        <u>Duration</u>. The Upcoming Loan Period shall commence on
        %{startDate} and shall terminate on %{endDate}.
      </li>
      <li>
        <u>Aggregate Amount</u>. The aggregate principal amount of the
        Loan during the Upcoming Loan Period shall be %{principal}.
      </li>
    </ol>
    <p style="text-align: center; margin-top: 28px; font-style: italic;">[Signature Page Follows]</p>
    <div style="page-break-after: always"></div>

    <div class="signature-page">
      <div class="signature-content">
        <p>Sincerely,</p>
        <p>Falcon Labs Ltd,<br />as Collateral Manager</p>
        <p style="display: flex"><br /><br />By:<span class="signature-line"></span></p>
        <p>Name: Matthew Whaley<br />Title: Authorized Signatory</p>
      </div>
    </div>
  </body>
</html>
`
};

//# sourceMappingURL=LOAN_NOTICE-falconx.js.map