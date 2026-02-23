"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CycleReportDefault", {
    enumerable: true,
    get: function() {
        return CycleReportDefault;
    }
});
const CycleReportDefault = {
    name: 'Cycle Report',
    requiredFields: [
        'vaultName',
        'borrowerName',
        'curatorName',
        'cycleNumber',
        'reportDate',
        'periodRange',
        'principalCurrency',
        'performanceFee'
    ],
    unsafeFields: [
        'cycleStatsTable',
        'principalBreakdownTable',
        'holdersTable',
        'inflowsOutflowsTable',
        'interestBreakdownTable'
    ],
    content: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>%{vaultName} - Cycle Report</title>
    <style>
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        font-size: 13px;
        color: #111;
        margin: 0;
      }
      h1 {
        font-size: 22px;
        margin: 0 0 4px;
      }
      h2 {
        font-size: 16px;
        margin: 24px 0 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      p {
        margin: 4px 0;
      }
      table {
        border-collapse: collapse;
        width: 100%;
        margin-top: 12px;
      }
      th,
      td {
        border: 1px solid #d5d9dc;
        padding: 8px 10px;
        text-align: left;
        font-variant-numeric: tabular-nums;
      }
      th {
        background-color: #f5f7f9;
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 0.5px;
      }
      th.value,
      td.value {
        text-align: right;
        font-weight: 600;
      }
      tr.total td {
        font-weight: 700;
        background-color: #eef2f5;
      }
      .movements-wrapper {
        margin-top: 24px;
      }
      .movements-table {
        width: 100%;
      }
      .movements-table .section-header th {
        text-align: left;
        background-color: #eef2f5;
        font-size: 12px;
      }
      .movements-table td.label {
        font-weight: 600;
      }
      .movements-table td.value.negative {
        color: #b52828;
      }
      .holders-wrapper {
        margin-top: 24px;
      }
      .holders-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 12px;
      }
      .holders-table th,
      .holders-table td {
        border: 1px solid #d5d9dc;
        padding: 8px 10px;
        text-align: left;
        font-variant-numeric: tabular-nums;
      }
      .holders-table th {
        background-color: #f5f7f9;
        text-transform: uppercase;
        font-size: 11px;
        letter-spacing: 0.5px;
      }
      .holders-table td.value {
        text-align: right;
      }
      .holders-table td.empty {
        text-align: center;
        font-style: italic;
        color: #666;
      }
      .note {
        margin-top: 20px;
        font-size: 12px;
        color: #444;
      }
    </style>
  </head>
  <body>
    <h1>%{vaultName}</h1>
    <p><strong>%{cycleNumber}</strong></p>
    <p>Report date: %{reportDate}</p>
    <p>Cycle period: %{periodRange}</p>
    <p>Asset: %{principalCurrency}</p>

    <div>
      <h2>Cycle performance</h2>
      %{cycleStatsTable}
    </div>

    <div>
      <h2>Interest breakdown</h2>
      %{interestBreakdownTable}
    </div>

    <div>
      <h2>Month-over-Month Cash Flow BREAKDOWN</h2>
      %{principalBreakdownTable}
    </div>

    <div>
      <h2>LP positions</h2>
      %{holdersTable}
    </div>

    <div>
      %{inflowsOutflowsTable}
    </div>
  </body>
</html>`
};

//# sourceMappingURL=CYCLE_REPORT-default.js.map