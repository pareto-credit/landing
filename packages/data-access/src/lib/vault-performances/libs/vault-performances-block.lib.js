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
    VAULT_PERFORMANCE: function() {
        return VAULT_PERFORMANCE;
    },
    calculateTransactionEarnings: function() {
        return calculateTransactionEarnings;
    },
    calculateTransactionsEarnings: function() {
        return calculateTransactionsEarnings;
    },
    getEarningsPercentage: function() {
        return getEarningsPercentage;
    },
    getSecondsBetweenBlocks: function() {
        return getSecondsBetweenBlocks;
    },
    getVaultAggregatedPerformance: function() {
        return getVaultAggregatedPerformance;
    },
    getVaultEarnings: function() {
        return getVaultEarnings;
    },
    getVaultEarningsToken: function() {
        return getVaultEarningsToken;
    },
    getVaultEpochPerformance: function() {
        return getVaultEpochPerformance;
    },
    getVaultFinishedEpochs: function() {
        return getVaultFinishedEpochs;
    },
    getVaultPerformance: function() {
        return getVaultPerformance;
    },
    getVaultPerformanceAge: function() {
        return getVaultPerformanceAge;
    },
    getVaultPerformanceOptions: function() {
        return getVaultPerformanceOptions;
    },
    getVaultRealizedAPR: function() {
        return getVaultRealizedAPR;
    },
    getVaultRealizedAPY: function() {
        return getVaultRealizedAPY;
    },
    initVaultEarnings: function() {
        return initVaultEarnings;
    },
    initVaultPerformance: function() {
        return initVaultPerformance;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _core = require("../../core");
const _tokens = require("../../tokens");
const _lodash = require("lodash");
const _vaultepochs = require("../../vault-epochs");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const VAULT_PERFORMANCE = {
    age: 0,
    holders: 0,
    earnings: {
        USD: '0',
        token: '0',
        percentage: 0
    },
    realizedAPY: 0,
    accruedRewards: []
};
function initVaultPerformance(performance = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(performance), VAULT_PERFORMANCE);
}
function initVaultEarnings(earnings = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(earnings), VAULT_PERFORMANCE.earnings);
}
function getEarningsPercentage({ current, last }) {
    if (!last || (0, _core.BNlte)(last.totalSupply)) {
        return (0, _core.BNify)();
    }
    return (0, _core.BNgt)(last.price) ? (0, _core.BNify)(current.price).div((0, _core.BNify)(last.price)).minus(1) : (0, _core.BNify)();
}
function calculateTransactionEarnings(earnings, token, transaction, lastVaultBlock) {
    const tokenDecimalsDiff = 18 - token.decimals;
    const transactionEarningsPercentage = (0, _core.BNify)(transaction.price).div((0, _core.BNify)(lastVaultBlock.price)).minus(1);
    const transactionEarnings = (0, _core.BNify)(transaction.amount).times(transactionEarningsPercentage).div(`1e${tokenDecimalsDiff}`);
    return earnings.plus(transactionEarnings);
}
function calculateTransactionsEarnings(token, lastVaultBlock, transactions) {
    if (!transactions) return (0, _core.BNify)();
    return transactions.reduce((earnings, transaction)=>{
        return calculateTransactionEarnings(earnings, token, transaction, lastVaultBlock);
    }, (0, _core.BNify)());
}
function getVaultEarningsToken(token, { current, last }, redeemTransactions) {
    if (!last || (0, _core.BNlte)(last.totalSupply)) {
        return (0, _core.BNify)();
    }
    const earningsPercentage = getEarningsPercentage({
        current,
        last
    });
    // Calculate earnings using last totalSupply
    if ((0, _core.BNgte)(current.totalSupply, last.totalSupply)) {
        const prevNAV = (0, _core.BNify)(last.totalSupply).times(last.price).div(1e18);
        const currentNAV = (0, _core.BNify)(last.totalSupply).times(current.price).div(1e18);
        return currentNAV.minus(prevNAV);
    }
    // Calculate earnings before redeem and for redeemed amounts using transaction price
    // Needed for token amount decimals
    const tokenDecimalsDiff = 18 - token.decimals;
    // Calculate earnings for remaining totalSupply (after redeem)
    const earningsToken = (0, _core.BNify)(current.totalSupply).times(earningsPercentage).div(`1e${tokenDecimalsDiff}`);
    // Calculate redeems earnings
    const redeemEarnings = calculateTransactionsEarnings(token, last, redeemTransactions);
    // Return total earnings
    return earningsToken.plus(redeemEarnings);
}
function getVaultEarnings(token, { current, last }, { price }, redeemTransactions) {
    if (!last || (0, _core.BNlte)(last.totalSupply)) {
        return initVaultEarnings();
    }
    const earningsPercentage = getEarningsPercentage({
        current,
        last
    });
    const earningsToken = getVaultEarningsToken(token, {
        current,
        last
    }, redeemTransactions);
    const earningsUSD = earningsToken.times(price).div((0, _tokens.getTokenAmount)(token));
    return initVaultEarnings({
        percentage: earningsPercentage.times(100).toNumber(),
        token: (0, _core.BNFixed)(earningsToken),
        USD: (0, _core.BNFixed)(earningsUSD)
    });
}
function getSecondsBetweenBlocks(block, lastVaultBlock) {
    return (0, _core.BNgt)(lastVaultBlock.totalSupply) ? block.timestamp - lastVaultBlock.block.timestamp : 0;
}
function getVaultPerformanceAge({ current, last }, epochsDuration) {
    var _last_cdoEpoch;
    // Seconds between blocks
    const totalAge = last ? getSecondsBetweenBlocks(current.block, last) : 0;
    // For CDO_EPOCH use the age of en epoch duration to calculate the vault performances
    if (last == null ? void 0 : (_last_cdoEpoch = last.cdoEpoch) == null ? void 0 : _last_cdoEpoch.duration) {
        if (epochsDuration) {
            return epochsDuration;
        }
        const totalDuration = last.cdoEpoch.duration + (last.cdoEpoch.bufferDuration || 0);
        return Math.max(1, Math.floor(totalAge / totalDuration)) * totalDuration;
    }
    return totalAge;
}
function getVaultRealizedAPR(age, earningsPercentage) {
    if ((0, _core.BNlte)(age) || (0, _core.BNlte)(earningsPercentage)) {
        return 0;
    }
    return (0, _core.BNify)(earningsPercentage).times(_core.SECONDS_IN_YEAR).div(age).toNumber();
}
function getVaultRealizedAPY(age, earningsPercentage, compoundingPeriod = 365) {
    const APR = getVaultRealizedAPR(age, earningsPercentage);
    if ((0, _core.BNlte)(APR)) {
        return 0;
    }
    return (0, _core.apr2apy)((0, _core.BNify)(APR).div(100), compoundingPeriod).times(100).toNumber();
}
function getVaultFinishedEpochs(vaultEpochs, currLastBlocks, lastWalletBlock) {
    const { current, last } = currLastBlocks;
    const minTimestamp = Math.max((lastWalletBlock == null ? void 0 : lastWalletBlock.block.timestamp) || 0, (last == null ? void 0 : last.block.timestamp) || 0);
    return vaultEpochs.filter((vaultEpoch)=>vaultEpoch.status === 'FINISHED' && (0, _moment.default)(vaultEpoch.startDate).isSameOrAfter(_moment.default.unix(minTimestamp)) && (0, _moment.default)(vaultEpoch.endDate).isSameOrBefore(_moment.default.unix(current.block.timestamp)));
}
function getVaultEpochPerformance(vaultEpochs, { current, last }, latestWalletBlockWithBalance, token, tokenPrice, walletBlocksHolders, lastPerformance, redeemTransactions) {
    if (!last || (0, _core.BNlte)(last.totalSupply)) {
        return initVaultPerformance();
    }
    const finishedEpochs = getVaultFinishedEpochs(vaultEpochs, {
        current,
        last
    }, latestWalletBlockWithBalance);
    if (!finishedEpochs.length) {
        return initVaultPerformance();
    }
    const epochsDuration = finishedEpochs.reduce((duration, epoch)=>duration + epoch.duration + epoch.bufferDuration, 0);
    const avgEpochDurationDays = epochsDuration / finishedEpochs.length / 86400;
    const compoundingPeriod = Math.ceil(_bignumber.default.maximum(1, (0, _core.BNify)(365).div(avgEpochDurationDays)).toNumber());
    // Update holders
    const holders = (walletBlocksHolders || []).filter((b)=>(0, _core.BNgt)(b.balance)).length;
    const newHolders = (0, _core.BNify)(holders).minus((0, _core.BNify)(lastPerformance == null ? void 0 : lastPerformance.holders)).toNumber();
    // Calculate earnings
    const earnings = getVaultEarnings(token, {
        current,
        last
    }, tokenPrice, redeemTransactions);
    // Set age as finished epochs duration
    const age = epochsDuration;
    // Realized APY
    // TODO: this is APR, need to be converted into APY
    const realizedAPY = getVaultRealizedAPY(age, earnings.percentage, compoundingPeriod);
    return initVaultPerformance({
        age,
        earnings,
        holders: newHolders,
        realizedAPY: realizedAPY
    });
}
function getVaultPerformanceOptions(vault, vaultEpochs, vaultBlocks, latestWalletBlockWithBalance) {
    switch(vault.contractType){
        case 'CDO_EPOCH':
            {
                const finishedEpochs = getVaultFinishedEpochs(vaultEpochs, vaultBlocks, latestWalletBlockWithBalance);
                const totalDuration = finishedEpochs.reduce((duration, epoch)=>duration + epoch.duration + (0, _vaultepochs.getVaultEpochBufferDuration)(vault.cdoEpoch, epoch.bufferDuration), 0);
                if ((0, _core.BNlte)(totalDuration)) {
                    return {
                        age: 0,
                        compoundingPeriod: 365,
                        epochs: finishedEpochs.length
                    };
                }
                const avgEpochDurationDays = totalDuration / finishedEpochs.length / 86400;
                const compoundingPeriod = Math.ceil(_bignumber.default.maximum(1, (0, _core.BNify)(365).div(avgEpochDurationDays)).toNumber());
                const finishedEpochsDurations = finishedEpochs.map((e)=>e.duration + (0, _vaultepochs.getVaultEpochBufferDuration)(vault.cdoEpoch, e.bufferDuration));
                const avgAPY = (0, _vaultepochs.getVaultEpochAvgRate)(finishedEpochs.map((e)=>{
                    var _e_APYs;
                    return ((_e_APYs = e.APYs) == null ? void 0 : _e_APYs.NET) || 0;
                }), finishedEpochsDurations);
                const avgAPR = (0, _vaultepochs.getVaultEpochAvgRate)(finishedEpochs.map((e)=>{
                    var _e_APRs;
                    return ((_e_APRs = e.APRs) == null ? void 0 : _e_APRs.NET) || 0;
                }), finishedEpochsDurations);
                return {
                    avgAPY,
                    avgAPR,
                    age: totalDuration,
                    compoundingPeriod,
                    epochs: finishedEpochs.length
                };
            }
        default:
            {
                return {
                    age: getVaultPerformanceAge(vaultBlocks),
                    compoundingPeriod: 365
                };
            }
    }
}
function getVaultPerformance({ current, last }, token, tokenPrice, options) {
    if (!last || (0, _core.BNlte)(last.totalSupply)) {
        return initVaultPerformance();
    }
    const { compoundingPeriod = 365, walletBlocksHolders, lastPerformance, redeemTransactions } = options;
    // Update holders
    const holders = (walletBlocksHolders || []).filter((b)=>(0, _core.BNgt)(b.balance)).length;
    const newHolders = (0, _core.BNify)(holders).minus((0, _core.BNify)(lastPerformance == null ? void 0 : lastPerformance.holders)).toNumber();
    // Calculate earnings
    const earnings = getVaultEarnings(token, {
        current,
        last
    }, tokenPrice, redeemTransactions);
    // Get vault performance age
    const age = options.age || getVaultPerformanceAge({
        current,
        last
    });
    // Realized APY
    const realizedAPY = options.avgAPY || getVaultRealizedAPY(age, earnings.percentage, compoundingPeriod);
    return initVaultPerformance({
        age,
        earnings,
        holders: newHolders,
        realizedAPY: realizedAPY
    });
}
function getVaultAggregatedPerformance(currentPerformance, lastPerformance) {
    if (!lastPerformance) {
        return currentPerformance;
    }
    // Update holders
    const holders = (0, _core.BNify)(lastPerformance.holders).plus(currentPerformance.holders);
    // Earnings
    const earnings = {
        token: (0, _core.BNify)(lastPerformance.earnings.token).plus(currentPerformance.earnings.token).toFixed(0),
        USD: (0, _core.BNify)(lastPerformance.earnings.USD).plus(currentPerformance.earnings.USD).toFixed(0),
        percentage: (0, _core.BNify)(lastPerformance.earnings.percentage).plus(currentPerformance.earnings.percentage).toNumber()
    };
    // Age
    const age = (0, _core.BNify)(lastPerformance.age).plus(currentPerformance.age).toNumber();
    const realizedAPY = (0, _core.BNgt)(age) ? (0, _core.BNify)(lastPerformance.realizedAPY).times(lastPerformance.age || 0).plus((0, _core.BNify)(currentPerformance.realizedAPY).times(currentPerformance.age)).div(age) : (0, _core.BNify)();
    return initVaultPerformance({
        age,
        holders: holders.toNumber(),
        earnings,
        realizedAPY: realizedAPY.toNumber()
    });
}

//# sourceMappingURL=vault-performances-block.lib.js.map