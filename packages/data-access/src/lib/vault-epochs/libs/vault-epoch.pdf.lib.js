"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    buildEpochHoldersTable: function() {
        return buildEpochHoldersTable;
    },
    buildEpochInterestBreakdownTable: function() {
        return buildEpochInterestBreakdownTable;
    },
    buildEpochMovementsTable: function() {
        return buildEpochMovementsTable;
    },
    buildEpochPrincipalBreakdownTable: function() {
        return buildEpochPrincipalBreakdownTable;
    },
    buildEpochStatsTable: function() {
        return buildEpochStatsTable;
    },
    buildInflowsOutflowsTable: function() {
        return buildInflowsOutflowsTable;
    },
    formatDate: function() {
        return formatDate;
    },
    formatNegativeAmount: function() {
        return formatNegativeAmount;
    },
    formatPeriodRange: function() {
        return formatPeriodRange;
    },
    formatTokenAmount: function() {
        return formatTokenAmount;
    },
    getLPLabel: function() {
        return getLPLabel;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _vaults = require("../../vaults");
const _core = require("../../core");
const _tokens = require("../../tokens");
const _vaultepochlib = require("./vault-epoch.lib");
function getLPLabel(name, address, chainHex) {
    const hashLabel = `(${(0, _core.shortHash)(address || '')})`;
    const hashLink = chainHex ? `<a href="${(0, _core.makeHashLink)('address', address, chainHex)}" target="_blank">${hashLabel}</a>` : hashLabel;
    return `${name ? name : 'Unknown'} ${hashLink}`;
}
function buildEpochMovementsTable(deposits, withdraws) {
    const rows = [];
    if (deposits.length) {
        rows.push('<tr class="section-header"><th colspan="2">Deposits</th></tr>');
        deposits.forEach((row)=>{
            const safeLabel = (0, _vaults.sanitizeHtml)(row.label);
            const safeAmount = (0, _vaults.sanitizeHtml)(row.amount);
            rows.push(`<tr><td>${safeLabel}</td><td class="value">${safeAmount}</td></tr>`);
        });
    }
    if (withdraws.length) {
        rows.push('<tr class="section-header"><th colspan="2">Withdraws</th></tr>');
        withdraws.forEach((row)=>{
            const valueClass = row.variant === 'negative' ? 'value negative' : 'value';
            const safeLabel = (0, _vaults.sanitizeHtml)(row.label);
            const safeAmount = (0, _vaults.sanitizeHtml)(row.amount);
            rows.push(`<tr><td>${safeLabel}</td><td class="${valueClass}">${safeAmount}</td></tr>`);
        });
    }
    return `<table class="movements-table"><tbody>${rows.join('')}</tbody></table>`;
}
function formatPeriodRange(startDate, endDate) {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
function formatDate(value, format = 'MMMM Do, YYYY') {
    if (!value) {
        return '-';
    }
    return (0, _moment.default)(value).format(format);
}
function buildEpochStatsTable({ bufferDuration, duration, APRs, APYs, interest }) {
    const { duration: cycleDuration, unit: cycleUnit } = (0, _core.secondsToPeriod)(duration);
    const { duration: bufferDurationValue, unit: bufferUnit } = (0, _core.secondsToPeriod)(bufferDuration);
    const grossAPR = (0, _core.numberFormat)(Number(APRs.GROSS) / 100, {
        style: 'percent',
        maximumFractionDigits: 2
    });
    const netAPY = (0, _core.numberFormat)(Number((APYs == null ? void 0 : APYs.NET) || 0) / 100, {
        style: 'percent',
        maximumFractionDigits: 2
    });
    const rows = [
        {
            label: 'Buffer Duration',
            value: `${bufferDurationValue} ${bufferUnit}`
        },
        {
            label: 'Duration',
            value: `${cycleDuration} ${cycleUnit}`
        },
        {
            label: 'Gross APR',
            value: grossAPR
        },
        {
            label: 'Net APY',
            value: netAPY
        }
    ].map((row)=>`<tr><td>${(0, _vaults.sanitizeHtml)(row.label)}</td><td class="value">${(0, _vaults.sanitizeHtml)(row.value)}</td></tr>`).join('');
    return `<table class="cycle-stats-table"><tbody>${rows}</tbody></table>`;
}
function buildInflowsOutflowsTable(chainHex, transactions, epoch, walletNames, vaultToken, underlyingToken) {
    const renderRow = (tx)=>{
        const walletId = tx.walletId || '';
        const label = getLPLabel(walletNames[walletId], tx.walletAddress, chainHex);
        const timestamp = new Date(tx.block.timestamp * 1000).toISOString();
        const date = formatDate(timestamp, 'LLL');
        const underlyingAmount = formatTokenAmount(tx.tokenAmount, underlyingToken.decimals);
        return `
    <tr>
      <td><a href="${(0, _core.makeHashLink)('tx', tx.hash, chainHex)}" target="_blank">${date}</a></td>
      <td>${label}</td>
      <td class="value">${underlyingAmount}</td>
    </tr>`;
    };
    const header = `
  <thead>
    <tr>
      <th width="180">Date</th>
      <th>LP</th>
      <th class="value">Amount</th>
    </tr>
  </thead>`;
    /**
   * PARSE TRANSACTIONS TO APPLY THE CORRECT AMOUNT
   */ const stopTx = transactions.find((t)=>t.type === 'STOP_EPOCH');
    transactions = transactions.map((tx)=>{
        if (!stopTx || tx.type !== 'REQUEST_WITHDRAW') {
            return tx;
        }
        // Get correct token final amount
        const { NET: tokenAmount } = (0, _vaultepochlib.getVaultEpochWithdrawalTxBreakdown)(epoch, tx, stopTx.price);
        return _extends._({}, tx, {
            tokenAmount
        });
    });
    /**
   * END PARSING
   */ const inflowsRows = transactions.filter((tx)=>[
            'DEPOSIT',
            'REQUEST_DEPOSIT'
        ].includes(tx.type)).map(renderRow);
    const inflowsTotals = transactions.filter((tx)=>[
            'DEPOSIT',
            'REQUEST_DEPOSIT'
        ].includes(tx.type)).reduce((acc, tx)=>({
            lpAmount: acc.lpAmount.plus(tx.amount),
            underlyingAmount: acc.underlyingAmount.plus(tx.tokenAmount)
        }), {
        lpAmount: (0, _core.BNify)(0),
        underlyingAmount: (0, _core.BNify)(0)
    });
    const outflowsRows = transactions.filter((tx)=>[
            'REDEEM',
            'REQUEST_WITHDRAW'
        ].includes(tx.type)).map(renderRow);
    const outflowsTotals = transactions.filter((tx)=>[
            'REDEEM',
            'REQUEST_WITHDRAW'
        ].includes(tx.type)).reduce((acc, tx)=>({
            lpAmount: acc.lpAmount.plus(tx.amount),
            underlyingAmount: acc.underlyingAmount.plus(tx.tokenAmount)
        }), {
        lpAmount: (0, _core.BNify)(0),
        underlyingAmount: (0, _core.BNify)(0)
    });
    const inflowsTotalRows = `
    <tr class="total">
      <td colspan="2">Total inflows</td>
      <td class="value">${formatTokenAmount(inflowsTotals.underlyingAmount, underlyingToken.decimals)}</td>
    </tr>`;
    const outflowsTotalRows = `
    <tr class="total">
      <td colspan="2">Total outflows</td>
      <td class="value">${formatTokenAmount(outflowsTotals.underlyingAmount, underlyingToken.decimals)}</td>
    </tr>`;
    const inflowsTable = `<table class="inflows-outflows-table">${header}<tbody>${inflowsRows.length ? inflowsRows.join('') + inflowsTotalRows : '<tr><td colspan="3">No inflows during this cycle</td></tr>'}</tbody></table>`;
    const outflowsTable = `<table class="inflows-outflows-table">${header}<tbody>${outflowsRows.length ? outflowsRows.join('') + outflowsTotalRows : '<tr><td colspan="3">No outflows during this cycle</td></tr>'}</tbody></table>`;
    return `
  <h2>Inflows</h2>
  ${inflowsTable}
  <h2>Outflows</h2>
  ${outflowsTable}
  `;
}
function buildEpochPrincipalBreakdownTable(epochs, decimals) {
    const { current: currentEpoch, previous: previousEpoch } = epochs;
    const { PREVIOUS, INTEREST, WITHDRAWALS, DEPOSITS, PRINCIPAL, DELTA } = (0, _vaultepochlib.getVaultEpochsPrincipalAmounts)(currentEpoch, previousEpoch);
    const withdrawals = formatTokenAmount(WITHDRAWALS, decimals);
    const deposits = formatTokenAmount(DEPOSITS, decimals);
    const previous = formatTokenAmount(PREVIOUS, decimals);
    const current = formatTokenAmount(PRINCIPAL, decimals);
    const delta = formatTokenAmount(DELTA, decimals);
    const interest = formatTokenAmount(INTEREST, decimals);
    return `<table>
      <tbody>
        <tr class="total">
          <td>Beginning Principal Amount</td>
          <td class="value">${previous}</td>
        </tr>
        <tr>
          <td>Reinvested Interest from Lenders</td>
          <td class="value">${interest}</td>
        </tr>
        <tr>
          <td>Withdrawals Processed</td>
          <td class="value">${withdrawals}</td>
        </tr>
        <tr>
          <td>Deposits Processed</td>
          <td class="value">${deposits}</td>
        </tr>
        <tr class="total">
          <td>New Principal Amount (Loan Notice Amount)</td>
          <td class="value">${current}</td>
        </tr>
        <tr class="total">
          <td>Total %{borrowerName} Receiving/Returning</td>
          <td class="value">${delta}</td>
        </tr>
      </tbody>
    </table>`;
}
function formatTokenAmount(value, decimals) {
    const parsed = (0, _tokens.fixAmount)(value, decimals).toNumber();
    return (0, _core.numberFormat)(parsed, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function formatNegativeAmount(value, decimals) {
    const parsed = (0, _tokens.fixAmount)(value, decimals).toNumber();
    if (parsed === 0) {
        return formatTokenAmount(0, decimals);
    }
    const formatted = (0, _core.numberFormat)(Math.abs(parsed), {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return `-${formatted}`;
}
function buildEpochInterestBreakdownTable(vaultEpoch, token, options) {
    var _vaultEpoch_withdraws, _vaultEpoch_interest, _vaultEpoch_withdraws1, _vaultEpoch_interest1, _vaultEpoch_interest2;
    const { curator } = options;
    const withdrawsFees = formatNegativeAmount((0, _core.BNify)(((_vaultEpoch_withdraws = vaultEpoch.withdraws) == null ? void 0 : _vaultEpoch_withdraws.fees) || '0'), token.decimals);
    const cycleFees = formatNegativeAmount((0, _core.BNify)((_vaultEpoch_interest = vaultEpoch.interest) == null ? void 0 : _vaultEpoch_interest.FEE).minus((0, _core.BNify)(((_vaultEpoch_withdraws1 = vaultEpoch.withdraws) == null ? void 0 : _vaultEpoch_withdraws1.fees) || '0')), token.decimals);
    const gross = formatTokenAmount(((_vaultEpoch_interest1 = vaultEpoch.interest) == null ? void 0 : _vaultEpoch_interest1.GROSS) || '0', token.decimals);
    const net = formatTokenAmount(((_vaultEpoch_interest2 = vaultEpoch.interest) == null ? void 0 : _vaultEpoch_interest2.NET) || '0', token.decimals);
    return `<table>
      <tbody>
        <tr>
          <td>Gross Interest Due from %{borrowerName}</td>
          <td class="value">${gross}</td>
        </tr>
        <tr>
          <td>Withdrawals fees</td>
          <td class="value">${withdrawsFees}</td>
        </tr>
        <tr>
          <td>%{performanceFee}% Performance Fee Paid to Pareto${curator && !(0, _core.compLower)(curator.name, 'pareto') ? `/${(0, _vaults.sanitizeHtml)(curator.name)}` : ''}</td>
          <td class="value">${cycleFees}</td>
        </tr>
        <tr class="total">
          <td>Net interest to Lenders</td>
          <td class="value">${net}</td>
        </tr>
      </tbody>
    </table>`;
}
function buildEpochHoldersTable(currEpochHolders, walletNames, tokenMeta, chainHex) {
    const holderRows = currEpochHolders.filter((holder)=>holder.endBalance && (0, _core.BNify)(holder.endBalance).gt(0)).map((currentHolder)=>{
        var _currentHolder_earnings, _currentHolder_earnings1;
        const walletId = currentHolder.walletBlock.walletId;
        const referenceBlock = currentHolder.walletBlock;
        const label = getLPLabel(walletNames[walletId], referenceBlock == null ? void 0 : referenceBlock.walletAddress, chainHex);
        const startBalanceValue = (0, _core.BNFixed)((currentHolder == null ? void 0 : currentHolder.startBalance) || '0');
        const startBalance = formatTokenAmount(startBalanceValue, tokenMeta.decimals);
        const endBalanceRaw = currentHolder.endBalance;
        const endBalanceValue = (0, _core.BNFixed)(endBalanceRaw);
        const endBalance = formatTokenAmount(endBalanceValue, tokenMeta.decimals);
        const interestValue = (0, _core.BNFixed)((currentHolder == null ? void 0 : (_currentHolder_earnings = currentHolder.earnings) == null ? void 0 : _currentHolder_earnings.NET) || '0');
        const interest = formatTokenAmount(interestValue, tokenMeta.decimals);
        const feeValue = (0, _core.BNFixed)((currentHolder == null ? void 0 : (_currentHolder_earnings1 = currentHolder.earnings) == null ? void 0 : _currentHolder_earnings1.FEE) || '0');
        const fee = formatTokenAmount(feeValue, tokenMeta.decimals);
        return {
            label,
            startBalance,
            endBalance,
            interest,
            fee,
            balanceSortValue: (0, _core.BNify)(endBalanceRaw)
        };
    }).sort((a, b)=>{
        const diff = b.balanceSortValue.comparedTo(a.balanceSortValue);
        if (diff !== null) {
            return diff;
        }
        return a.label.localeCompare(b.label);
    });
    const header = `
    <tr>
      <th>LP</th>
      <th class="value">Start balance</th>
      <th class="value">End balance</th>
      <th class="value">Interest</th>
      <th class="value">Fee</th>
    </tr>`;
    const body = holderRows.length ? holderRows.map((row)=>`
    <tr>
      <td>${row.label}</td>
      <td class="value">${row.startBalance}</td>
      <td class="value">${row.endBalance}</td>
      <td class="value">${row.interest}</td>
      <td class="value">${row.fee}</td>
    </tr>`).join('') : '<tr><td colspan="5" class="empty">No LP data available</td></tr>';
    return `<table class="holders-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
}

//# sourceMappingURL=vault-epoch.pdf.lib.js.map