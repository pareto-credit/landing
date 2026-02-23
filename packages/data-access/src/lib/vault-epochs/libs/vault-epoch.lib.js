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
    checkInstantWithdrawsPayable: function() {
        return checkInstantWithdrawsPayable;
    },
    checkStandardWithdrawsPayable: function() {
        return checkStandardWithdrawsPayable;
    },
    checkVaultEpochPayable: function() {
        return checkVaultEpochPayable;
    },
    getEpochWithdrawsChecks: function() {
        return getEpochWithdrawsChecks;
    },
    getNextEpochPrice: function() {
        return getNextEpochPrice;
    },
    getVaultEpochAPRScaled: function() {
        return getVaultEpochAPRScaled;
    },
    getVaultEpochAvgRate: function() {
        return getVaultEpochAvgRate;
    },
    getVaultEpochBufferDuration: function() {
        return getVaultEpochBufferDuration;
    },
    getVaultEpochData: function() {
        return getVaultEpochData;
    },
    getVaultEpochDates: function() {
        return getVaultEpochDates;
    },
    getVaultEpochDeadline: function() {
        return getVaultEpochDeadline;
    },
    getVaultEpochDurationByBlock: function() {
        return getVaultEpochDurationByBlock;
    },
    getVaultEpochExpectedInterests: function() {
        return getVaultEpochExpectedInterests;
    },
    getVaultEpochFEE: function() {
        return getVaultEpochFEE;
    },
    getVaultEpochGrossInterest: function() {
        return getVaultEpochGrossInterest;
    },
    getVaultEpochInstantDeadline: function() {
        return getVaultEpochInstantDeadline;
    },
    getVaultEpochInstantWithdraws: function() {
        return getVaultEpochInstantWithdraws;
    },
    getVaultEpochInterest: function() {
        return getVaultEpochInterest;
    },
    getVaultEpochInterestBreakdown: function() {
        return getVaultEpochInterestBreakdown;
    },
    getVaultEpochNetInterest: function() {
        return getVaultEpochNetInterest;
    },
    getVaultEpochNextEndDate: function() {
        return getVaultEpochNextEndDate;
    },
    getVaultEpochNextWithdrawType: function() {
        return getVaultEpochNextWithdrawType;
    },
    getVaultEpochProgression: function() {
        return getVaultEpochProgression;
    },
    getVaultEpochStandardAmount: function() {
        return getVaultEpochStandardAmount;
    },
    getVaultEpochStandardDeadline: function() {
        return getVaultEpochStandardDeadline;
    },
    getVaultEpochStandardWithdraws: function() {
        return getVaultEpochStandardWithdraws;
    },
    getVaultEpochStatus: function() {
        return getVaultEpochStatus;
    },
    getVaultEpochTVLPrincipal: function() {
        return getVaultEpochTVLPrincipal;
    },
    getVaultEpochToWithdraw: function() {
        return getVaultEpochToWithdraw;
    },
    getVaultEpochTotalDuration: function() {
        return getVaultEpochTotalDuration;
    },
    getVaultEpochTotalWithdraws: function() {
        return getVaultEpochTotalWithdraws;
    },
    getVaultEpochWaitingProgression: function() {
        return getVaultEpochWaitingProgression;
    },
    getVaultEpochWithdrawalTxBreakdown: function() {
        return getVaultEpochWithdrawalTxBreakdown;
    },
    getVaultEpochWithdrawalsBreakdown: function() {
        return getVaultEpochWithdrawalsBreakdown;
    },
    getVaultEpochWithdrawsAmount: function() {
        return getVaultEpochWithdrawsAmount;
    },
    getVaultEpochsPrincipalAmounts: function() {
        return getVaultEpochsPrincipalAmounts;
    },
    initVaultEpochAPRs: function() {
        return initVaultEpochAPRs;
    },
    isVaultEpochStartable: function() {
        return isVaultEpochStartable;
    },
    isVaultEpochWithdrawed: function() {
        return isVaultEpochWithdrawed;
    },
    makeVaultEpochAPRs: function() {
        return makeVaultEpochAPRs;
    },
    makeVaultEpochApr: function() {
        return makeVaultEpochApr;
    },
    makeVaultEpochAprFromInterests: function() {
        return makeVaultEpochAprFromInterests;
    },
    makeVaultEpochAprGross: function() {
        return makeVaultEpochAprGross;
    },
    makeVaultEpochAprNet: function() {
        return makeVaultEpochAprNet;
    },
    makeVaultEpochDurations: function() {
        return makeVaultEpochDurations;
    },
    parseVaultEpochs: function() {
        return parseVaultEpochs;
    },
    setVaultEpochDataApr: function() {
        return setVaultEpochDataApr;
    },
    setVaultEpochDataDuration: function() {
        return setVaultEpochDataDuration;
    },
    setVaultEpochDataEndDate: function() {
        return setVaultEpochDataEndDate;
    },
    setVaultEpochDataInterests: function() {
        return setVaultEpochDataInterests;
    },
    setVaultEpochDataUnit: function() {
        return setVaultEpochDataUnit;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _moment = /*#__PURE__*/ _interop_require_default._(require("moment"));
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _lodash = require("lodash");
const _core = require("../../core");
const _tokens = require("../../tokens");
function initVaultEpochAPRs(options) {
    return {
        DELTA: (options == null ? void 0 : options.DELTA) || 0,
        EPOCH: (options == null ? void 0 : options.EPOCH) || 0,
        BUFFER: (options == null ? void 0 : options.BUFFER) || 0,
        CURE: (options == null ? void 0 : options.CURE) || 0,
        GROSS: (options == null ? void 0 : options.GROSS) || 0,
        NET: (options == null ? void 0 : options.NET) || 0
    };
}
function getVaultEpochStatus(epoch, date) {
    const { status, endDate } = epoch;
    // Check finished status
    if (status === 'RUNNING' && (0, _moment.default)(date).isAfter(endDate)) {
        return 'FINISHED';
    }
    // Running
    return status;
}
function getNextEpochPrice(current, options = {}) {
    const { fee, expectedInterest } = options;
    const expectedInterestToUse = expectedInterest || current.expectedInterest;
    if ((0, _core.BNlte)(expectedInterestToUse)) {
        return current.price;
    }
    const netInterest = (0, _core.BNify)(expectedInterestToUse).times((0, _core.BNify)(1).minus((0, _core.BNify)(fee || 0).div(1e5)));
    const nextTVL = (0, _core.BNify)(current.TVL.token).plus(netInterest || 0);
    return (0, _core.BNFixed)(nextTVL.times(current.price).div(current.TVL.token));
}
function getVaultEpochDurationByBlock(block) {
    var _block_cdoEpoch;
    const duration = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.duration) || 0;
    return (0, _core.secondsToPeriod)(duration);
}
function getVaultEpochProgression(epoch, date) {
    const duration = (0, _core.BNify)(epoch.duration);
    // Current end date and next start date
    const startDate = (0, _moment.default)(epoch.startDate).toISOString();
    const endDate = (0, _moment.default)(epoch.endDate).toISOString();
    const progression = (0, _core.BNify)((0, _moment.default)(date).diff(startDate, 'second')).div(duration).times(100);
    const progress = _bignumber.default.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
function getVaultEpochBufferDuration(cdoEpoch, bufferDuration) {
    return ((0, _core.BNgt)(cdoEpoch == null ? void 0 : cdoEpoch.waitingPeriod) ? cdoEpoch == null ? void 0 : cdoEpoch.waitingPeriod : bufferDuration) || 0;
}
function getVaultEpochTotalDuration(vaultCdoEpoch, blockCdoEpoch) {
    const epochDuration = blockCdoEpoch == null ? void 0 : blockCdoEpoch.duration;
    const bufferDuration = getVaultEpochBufferDuration(vaultCdoEpoch, blockCdoEpoch == null ? void 0 : blockCdoEpoch.bufferDuration);
    return (0, _core.BNify)(epochDuration).plus(bufferDuration).toNumber();
}
function getVaultEpochWaitingProgression(epoch, date) {
    const waitingPeriod = epoch.bufferDuration;
    // Current end date and next start date
    const endDate = (0, _moment.default)(epoch.endDate).toISOString();
    // Check start date
    const minStartDate = (0, _moment.default)(epoch.endDate).add(waitingPeriod, 's').toISOString();
    const startDate = (0, _moment.default)().isBefore(minStartDate) ? minStartDate : (0, _moment.default)().toISOString();
    const progression = (0, _core.BNify)((0, _moment.default)(date).diff(endDate, 'second')).div(waitingPeriod).times(100).toNumber();
    const progress = _bignumber.default.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
function getVaultEpochStandardDeadline(epoch) {
    const { status, endDate, duration, bufferDuration } = epoch;
    // If WAITING returns the previous epoch end date + buffer period + epoch duration
    if (status === 'WAITING') {
        return (0, _moment.default)(endDate).add(bufferDuration, 'second').add(duration, 'second').toDate();
    }
    // Otherwise returns the current endDate
    return (0, _moment.default)(endDate).toDate();
}
function getVaultEpochInstantDeadline(epoch) {
    const { status, endDate, bufferDuration, instantWithdraws } = epoch;
    // If WAITING returns the prev epoch end date + buffer period + epoch duration
    if (status === 'WAITING') {
        return (0, _moment.default)(endDate).add(bufferDuration, 'second').add(instantWithdraws == null ? void 0 : instantWithdraws.delay, 'second').toDate();
    }
    // Otherwise returns the endDate
    return (0, _moment.default)(instantWithdraws == null ? void 0 : instantWithdraws.deadline).toDate();
}
function getVaultEpochWithdrawsAmount(epoch) {
    var _epoch_withdraws, _epoch_instantWithdraws;
    return (0, _core.BNify)(epoch.withdrawType === 'STANDARD' ? (_epoch_withdraws = epoch.withdraws) == null ? void 0 : _epoch_withdraws.amount : (_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount);
}
function getVaultEpochDeadline(epoch) {
    const instantWithdrawed = isVaultEpochWithdrawed(epoch);
    return epoch.withdrawType === 'INSTANT' && !instantWithdrawed ? getVaultEpochInstantDeadline(epoch) : getVaultEpochStandardDeadline(epoch);
}
function getVaultEpochToWithdraw(epoch, customInterests) {
    const instantWithdrawed = isVaultEpochWithdrawed(epoch);
    return epoch.withdrawType === 'INSTANT' && !instantWithdrawed ? getVaultEpochInstantWithdraws(epoch) : getVaultEpochStandardAmount(epoch, customInterests);
}
function checkVaultEpochPayable(epoch, date) {
    var _epoch_instantWithdraws;
    return epoch.withdrawType === 'INSTANT' && (0, _core.BNgt)(epoch == null ? void 0 : (_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount) ? checkInstantWithdrawsPayable(epoch, date) : checkStandardWithdrawsPayable(epoch, date);
}
function checkInstantWithdrawsPayable(epoch, date) {
    var _epoch_instantWithdraws;
    return (epoch.status === 'RUNNING' || epoch.status === 'CURE') && (0, _moment.default)((_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.deadline).isBefore((0, _moment.default)(date));
}
function checkStandardWithdrawsPayable(epoch, date) {
    return (epoch.status === 'RUNNING' || epoch.status === 'CURE') && (0, _moment.default)(epoch.endDate).isBefore((0, _moment.default)(date));
}
function getEpochWithdrawsChecks(amount, options) {
    const { balance, allowance } = options;
    return {
        balance: (0, _core.BNify)(balance).gte(amount),
        allowance: (0, _core.BNify)(allowance).gte(amount)
    };
}
function getVaultEpochExpectedInterests(epoch) {
    var _epoch_TVL;
    return (0, _core.BNify)(((_epoch_TVL = epoch.TVL) == null ? void 0 : _epoch_TVL.token) || 0).times(epoch.APRs.GROSS).div(100).times(epoch.duration + epoch.bufferDuration).div(_core.SECONDS_IN_YEAR);
}
function getVaultEpochNetInterest(grossInterest, feePercentage) {
    if ((0, _core.BNlte)(grossInterest, 0)) {
        return '0';
    }
    return (0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage).div(`1e5`)).times(grossInterest).toString();
}
function getVaultEpochGrossInterest(netInterest, feePercentage) {
    if ((0, _core.BNlte)(netInterest, 0)) {
        return '0';
    }
    return (0, _core.BNify)(netInterest).times((0, _core.BNify)(1).plus((0, _core.BNify)(feePercentage).div(`1e5`))).toString();
}
function getVaultEpochAPRScaled(epoch, epochApr, duration) {
    const apr = epochApr || epoch.APRs.NET;
    const totalDuration = duration || (0, _core.BNify)(epoch.duration).plus(epoch.bufferDuration);
    return (0, _core.BNify)(apr).times(totalDuration).div(epoch.duration).toFixed(18);
}
function getVaultEpochNextWithdrawType(epoch, nextAPR) {
    const { instantWithdraws, APRs } = epoch;
    const aprType = 'GROSS';
    const currentAPR = (0, _core.BNify)(APRs[aprType]).toFixed(4);
    // Instant withdraws disabled
    if (!instantWithdraws) {
        return 'STANDARD';
    }
    return (0, _core.BNlt)((0, _core.BNify)(nextAPR).minus(currentAPR), -instantWithdraws.aprDelta) ? 'INSTANT' : 'STANDARD';
}
function getVaultEpochNextEndDate(epoch, options = {}) {
    const { date, newEpochDuration = epoch.duration } = options;
    return (0, _moment.default)(date).add(newEpochDuration, 'seconds').add(epoch.bufferDuration, 'seconds').toDate();
}
function isVaultEpochWithdrawed(epoch) {
    var _epoch_instantWithdraws;
    return epoch.withdrawType !== 'INSTANT' ? true : (0, _core.BNlte)((_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount);
}
function isVaultEpochStartable(epoch, date) {
    const { bufferDuration, endDate } = epoch;
    // If not finished the next one cannot start
    if (!endDate) {
        return false;
    }
    const nextStartDate = (0, _moment.default)(endDate).add(bufferDuration, 'second');
    return (0, _moment.default)(date).isSameOrAfter(nextStartDate);
}
function makeVaultEpochDurations(startDate, epochDuration, bufferDuration, prevEndDate, isUnderCure) {
    // Calculate cure period
    const cureDuration = prevEndDate && isUnderCure ? _moment.default.duration((0, _moment.default)(startDate).diff(prevEndDate)).asSeconds() : 0;
    return {
        EPOCH: epochDuration,
        BUFFER: bufferDuration,
        CURE: cureDuration,
        TOTAL: epochDuration + bufferDuration + cureDuration
    };
}
function makeVaultEpochAPRs(amounts, timings, isUnderCure) {
    const { tvl, netInterest, grossInterest, totalAPR, epochBufferAPR, lastAPR, feePercentage } = amounts;
    const { startDate, epochDuration, bufferDuration, lastEndDate } = timings;
    const durations = makeVaultEpochDurations(startDate, epochDuration, bufferDuration, lastEndDate, isUnderCure);
    /**
   * APRs calculation
   */ const GROSS = makeVaultEpochAprGross(tvl, durations, {
        totalAPR,
        epochBufferAPR,
        grossInterest
    });
    if ((0, _core.BNlte)(GROSS)) {
        return initVaultEpochAPRs();
    }
    const DELTA = (0, _core.BNgt)(lastAPR) ? (0, _core.BNify)(GROSS).minus((0, _core.BNify)(lastAPR)).toNumber() : 0;
    const NET = makeVaultEpochAprNet(tvl, durations, {
        grossApr: GROSS,
        netInterest,
        feePercentage
    });
    const CURE = (0, _core.BNgt)(durations.CURE) ? (0, _core.BNify)(durations.CURE).times(GROSS).div(durations.TOTAL).toNumber() : 0;
    const EPOCH = makeVaultEpochApr((0, _core.BNify)(GROSS).minus(CURE).toNumber(), durations.EPOCH, durations.BUFFER).toNumber();
    const BUFFER = (0, _core.BNify)(GROSS).minus(CURE).minus(EPOCH).toNumber();
    return initVaultEpochAPRs({
        NET,
        DELTA,
        GROSS,
        EPOCH,
        BUFFER,
        CURE
    });
}
function makeVaultEpochApr(totalApr, epochDuration, bufferDuration) {
    if ((0, _core.BNlte)(epochDuration)) {
        return (0, _core.BNify)();
    }
    return (0, _core.BNify)(totalApr).times(epochDuration).div((0, _core.BNify)(epochDuration).plus((0, _core.BNify)(bufferDuration)));
}
function makeVaultEpochAprGross(tvl, durations, options = {}) {
    const { totalAPR, epochBufferAPR, grossInterest } = options;
    let GROSS = 0;
    if ((0, _core.BNgt)(totalAPR)) {
        GROSS = (0, _core.BNify)(totalAPR).toNumber();
    } else if (grossInterest !== undefined && (0, _core.BNgt)(grossInterest)) {
        GROSS = makeVaultEpochAprFromInterests(tvl, grossInterest, durations.TOTAL).toNumber();
    } else if ((0, _core.BNgt)(epochBufferAPR)) {
        GROSS = (0, _core.BNify)(epochBufferAPR).times(durations.TOTAL).div((0, _core.BNify)(durations.EPOCH).plus((0, _core.BNify)(durations.BUFFER))).toNumber();
    }
    return GROSS;
}
function makeVaultEpochAprNet(tvl, durations, options) {
    const { grossApr, netInterest = 0, feePercentage } = options;
    if ((0, _core.BNgt)(netInterest)) {
        return makeVaultEpochAprFromInterests(tvl, netInterest, durations.TOTAL).toNumber();
    }
    return (0, _core.BNify)(grossApr).times((0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage).div(100000))).toNumber();
}
function makeVaultEpochAprFromInterests(tvl, interest, duration) {
    if ((0, _core.BNlte)(tvl)) {
        return (0, _core.BNify)();
    }
    return (0, _core.BNify)(interest).div(tvl).times(_core.SECONDS_IN_YEAR).div(duration).times(100);
}
function parseVaultEpochs(epochs) {
    // Sort by block number
    const [epoch, lastEpoch] = (0, _lodash.orderBy)(epochs, 'block.number', 'desc');
    return {
        epoch,
        lastEpoch
    };
}
function getVaultEpochStandardAmount(epoch, customInterests) {
    const interests = customInterests !== undefined ? customInterests : (0, _core.BNify)(epoch.expectedInterest);
    return getVaultEpochStandardWithdraws(epoch).plus(interests);
}
function getVaultEpochStandardWithdraws(epoch) {
    var _epoch_withdraws;
    return (0, _core.BNify)((_epoch_withdraws = epoch.withdraws) == null ? void 0 : _epoch_withdraws.amount);
}
function getVaultEpochInstantWithdraws(epoch) {
    var _epoch_instantWithdraws;
    return (0, _core.BNify)((_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount);
}
function getVaultEpochTotalWithdraws(epoch) {
    return getVaultEpochStandardWithdraws(epoch).plus(getVaultEpochInstantWithdraws(epoch));
}
function getVaultEpochData(vault, token, epochs = []) {
    var _epoch_APYs;
    if (vault.contractType !== 'CDO_EPOCH' || !vault.cdoEpoch) {
        return;
    }
    const { epoch, lastEpoch } = parseVaultEpochs(epochs);
    if (!epoch) {
        return;
    }
    // Withdraws && Interests data
    const { duration, unit } = (0, _core.secondsToPeriod)(epoch.duration);
    const durationSeconds = epoch.duration;
    const instantWithdrawed = isVaultEpochWithdrawed(epoch);
    const withdrawAmount = getVaultEpochWithdrawsAmount(epoch).toFixed(token.decimals);
    const withdrawDeadline = getVaultEpochDeadline(epoch);
    const interests = (0, _core.BNint)(epoch.expectedInterest);
    const toWithdraw = (0, _core.BNint)(getVaultEpochToWithdraw(epoch));
    const isDefaultable = false;
    const feePercentage = vault.feePercentage;
    // APRs
    const totalAPR = vault.cdoEpoch.mode === 'CREDIT' && epoch.status !== 'CURE' ? epoch.APRs.GROSS : undefined;
    const epochBufferAPR = vault.cdoEpoch.mode === 'CREDIT' && epoch.status === 'CURE' ? (0, _core.BNify)(epoch.APRs.EPOCH).plus(epoch.APRs.BUFFER).toNumber() : undefined;
    // TODO: This behaviour must be managed in a better way. Really bad thing
    const netInterest = vault.cdoEpoch.mode === 'STRATEGY' ? epoch.expectedInterest : (0, _core.BNify)(epoch.expectedInterest).times((0, _core.BNify)(1).minus(((_epoch_APYs = epoch.APYs) == null ? void 0 : _epoch_APYs.FEE) || 0).div(100)).toString();
    const APRs = makeVaultEpochAPRs({
        netInterest,
        tvl: epoch.TVL.token,
        epochBufferAPR,
        totalAPR,
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: epoch.duration,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    // Define last APRs
    // -> If current epoch is WAITING use last epoch APRs
    // -> Otherwise use current epoch APRs
    const lastAPRs = epoch.status === 'WAITING' && lastEpoch ? makeVaultEpochAPRs({
        netInterest: lastEpoch.expectedInterest,
        tvl: lastEpoch.TVL.token,
        epochBufferAPR: lastEpoch.APRs.BUFFER,
        totalAPR: lastEpoch.APRs.GROSS
    }, {
        startDate: lastEpoch.startDate || new Date(),
        epochDuration: lastEpoch.duration,
        bufferDuration: lastEpoch.bufferDuration
    }) : APRs;
    return {
        epoch,
        lastEpoch,
        instantWithdrawed,
        withdrawAmount,
        withdrawDeadline,
        durationSeconds,
        duration,
        unit,
        interests,
        APRs,
        lastAPRs,
        feePercentage,
        toWithdraw,
        isDefaultable
    };
}
function getVaultEpochAvgRate(rates, durations) {
    const { num, den } = rates.reduce((acc, rate, index)=>{
        const duration = durations[index];
        const num = acc.num.plus((0, _core.BNify)(rate).times(duration));
        const den = acc.den + duration;
        return {
            num,
            den
        };
    }, {
        num: (0, _core.BNify)(0),
        den: 0
    });
    return num.div(den).toNumber();
}
function setVaultEpochDataApr(epochData, aprGross) {
    const { epoch, lastEpoch } = epochData;
    if (aprGross === '') {
        return epochData;
    }
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        epochBufferAPR: (0, _core.BNify)(aprGross).toNumber(),
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: epoch.duration,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends._({}, epochData, {
        APRs
    });
}
function setVaultEpochDataDuration(epochData, newDuration) {
    if (newDuration === undefined || newDuration === '') {
        return epochData;
    }
    const { epoch, lastEpoch, APRs: newAPRs } = epochData;
    // Durations
    const duration = (0, _core.BNify)(newDuration).toNumber();
    const durationSeconds = (0, _core.periodToSeconds)(duration, epochData.unit);
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        totalAPR: newAPRs.GROSS,
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: durationSeconds,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends._({}, epochData, {
        duration,
        durationSeconds,
        APRs
    });
}
function setVaultEpochDataEndDate(epochData, options) {
    if (!options.endDate) {
        return epochData;
    }
    const { startDate, endDate } = options;
    const { epoch, lastEpoch } = epochData;
    // Durations
    const duration = (0, _moment.default)(endDate).diff(startDate, epochData.unit);
    const durationSeconds = (0, _core.periodToSeconds)(duration, epochData.unit);
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        totalAPR: epochData.APRs.GROSS,
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: durationSeconds,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends._({}, epochData, {
        APRs,
        duration,
        durationSeconds
    });
}
function setVaultEpochDataUnit(epochData, unit) {
    const { epoch, lastEpoch } = epochData;
    // Durations
    const duration = epochData.duration;
    const durationSeconds = (0, _core.periodToSeconds)(duration, unit);
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        totalAPR: epochData.APRs.GROSS,
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: durationSeconds,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends._({}, epochData, {
        APRs,
        unit,
        durationSeconds
    });
}
function setVaultEpochDataInterests(epochData, token, newInterests) {
    const { epoch, lastEpoch, feePercentage, APRs } = epochData;
    if (newInterests === undefined || newInterests === '') {
        return epochData;
    }
    const normalizedInterests = (0, _tokens.normalizeTokenAmount)(token, (0, _core.BNify)(newInterests));
    const grossInterest = normalizedInterests.toNumber();
    const netInterest = getVaultEpochNetInterest(grossInterest, feePercentage);
    // Update amounts
    const lastAPRs = lastEpoch ? makeVaultEpochAPRs({
        grossInterest,
        netInterest,
        tvl: lastEpoch.TVL.token
    }, {
        startDate: lastEpoch.startDate || new Date(),
        epochDuration: lastEpoch.duration,
        bufferDuration: lastEpoch.bufferDuration
    }, lastEpoch.status === 'CURE') : undefined;
    const newAPRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        totalAPR: APRs.GROSS,
        lastAPR: lastAPRs == null ? void 0 : lastAPRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: epoch.duration,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    const toWithdraw = getVaultEpochToWithdraw(epoch, normalizedInterests);
    // NOTE: Cheat code by Willow
    const isDefaultable = (0, _core.BNeq)(newInterests, (0, _core.BNify)(1).div(10 ** token.decimals));
    return _extends._({}, epochData, {
        APRs: newAPRs,
        lastAPRs,
        interests: normalizedInterests.toString(),
        toWithdraw: toWithdraw.toFixed(token.decimals),
        isDefaultable
    });
}
function getVaultEpochDates({ duration, bufferDuration, startDate, endDate }, lastEpoch) {
    // Case 1: Start/end dates already defined
    if (startDate && endDate) {
        return {
            startDate,
            endDate
        };
    }
    // Case 2: Not yet finished
    if (startDate && !endDate) {
        const shouldEndOn = (0, _moment.default)(startDate).add(duration, 's').toISOString();
        return {
            startDate,
            endDate: shouldEndOn
        };
    }
    // Case 3: Not yet started
    const minStartDate = (0, _moment.default)(lastEpoch == null ? void 0 : lastEpoch.endDate).add(bufferDuration, 's').toISOString();
    const shouldStartOn = (0, _moment.default)().isBefore(minStartDate) ? minStartDate : (0, _moment.default)().toISOString();
    const shouldEndOn = (0, _moment.default)(shouldStartOn).add(duration, 's').toISOString();
    return {
        startDate: shouldStartOn,
        endDate: shouldEndOn
    };
}
function getVaultEpochInterestBreakdown({ expectedInterest, APYs }, mode) {
    // mode CREDIT -> expectedInterest = GROSS INTEREST
    // mode STRATEGY -> extectedInterest = NET INTEREST
    const feePercentage = (0, _core.BNify)((APYs == null ? void 0 : APYs.FEE) || 0).div(100);
    const netPercentage = (0, _core.BNify)(1).minus(feePercentage);
    let NET = '0';
    let FEE = '0';
    let GROSS = '0';
    if (mode === 'CREDIT') {
        GROSS = (0, _core.BNify)(expectedInterest).toFixed(0);
        NET = (0, _core.BNify)(GROSS).times(netPercentage).toFixed(0);
        FEE = (0, _core.BNify)(GROSS).times(feePercentage).toFixed(0);
    } else {
        NET = (0, _core.BNify)(expectedInterest).toFixed(0);
        GROSS = (0, _core.BNify)(NET).div(netPercentage).toFixed(0);
        FEE = (0, _core.BNify)(GROSS).times(feePercentage).toFixed(0);
    }
    return {
        NET,
        FEE,
        GROSS
    };
}
function getVaultEpochWithdrawalsBreakdown({ withdraws, instantWithdraws, APYs }) {
    const { fees, amount } = withdraws || {};
    const { amount: instantAmount } = instantWithdraws || {};
    const { FEE: vaultFee } = APYs || {};
    const GROSS = (0, _core.BNify)(amount).toFixed(0);
    const FEE = (0, _core.BNify)(fees).toFixed(0);
    const INTEREST = (0, _core.BNify)(fees).times((0, _core.BNify)(vaultFee || 0).minus(1)).toFixed();
    const NET = (0, _core.BNify)(amount).plus((0, _core.BNify)(instantAmount)).minus((0, _core.BNify)(INTEREST)).minus((0, _core.BNify)(FEE)).toFixed(0);
    return {
        NET,
        FEE,
        INTEREST,
        GROSS
    };
}
function getVaultEpochTVLPrincipal(epoch) {
    const deposits = epoch.deposits;
    const { token: startTvl } = epoch.TVL;
    // Withdrawals amount
    const { NET: WITHDRAWALS } = getVaultEpochWithdrawalsBreakdown(epoch);
    const DEPOSITS = (0, _core.BNify)(deposits).toString();
    const PREVIOUS = (0, _core.BNify)(startTvl).minus(DEPOSITS).toString();
    const PRINCIPAL = (0, _core.BNify)(startTvl).plus(WITHDRAWALS).toString();
    const TOTAL_SUPPLY = (0, _core.BNify)(PRINCIPAL).div(epoch.price).toString();
    const DELTA = (0, _core.BNify)(PRINCIPAL).minus(PREVIOUS).toString();
    return {
        PREVIOUS,
        DEPOSITS,
        WITHDRAWALS,
        PRINCIPAL,
        TOTAL_SUPPLY,
        DELTA
    };
}
function getVaultEpochsPrincipalAmounts(epoch, prevEpoch) {
    const { WITHDRAWALS, DEPOSITS, PREVIOUS: startingPrincipal, PRINCIPAL } = getVaultEpochTVLPrincipal(epoch);
    const { NET: previousInterest } = (prevEpoch == null ? void 0 : prevEpoch.interest) || {};
    const PREVIOUS = (0, _core.BNify)(startingPrincipal).minus((0, _core.BNify)(previousInterest)).toFixed(0);
    const INTEREST = (0, _core.BNify)(previousInterest).toFixed(0);
    const DELTA = (0, _core.BNify)(PRINCIPAL).minus(PREVIOUS).toFixed(0);
    return {
        PREVIOUS,
        INTEREST,
        WITHDRAWALS,
        DEPOSITS,
        PRINCIPAL,
        DELTA
    };
}
function getVaultEpochFEE(epoch) {
    const { interest, withdraws } = epoch;
    const TOTAL = (0, _core.BNify)(interest == null ? void 0 : interest.FEE).toFixed();
    const WITHDRAWALS = (0, _core.BNify)(withdraws == null ? void 0 : withdraws.fees).toFixed();
    const CYCLE = (0, _core.BNify)(TOTAL).minus(WITHDRAWALS).toFixed();
    return {
        CYCLE,
        WITHDRAWALS,
        TOTAL
    };
}
function getVaultEpochInterest(epochMode, interest, options) {
    const { withdrawsFee = 0, feePercentage = 0 } = options || {};
    const feeMultiplier = (0, _core.BNify)(1).minus((0, _core.BNify)(feePercentage || 0).div(100000));
    switch(epochMode){
        // Use lastInterest as NET interest and calculate GROSS from it using vault fee
        case 'STRATEGY':
            {
                const netAmount = (0, _core.BNify)(interest);
                const grossAmount = netAmount.div(feeMultiplier);
                const feeAmount = grossAmount.minus(netAmount);
                const NET = (0, _core.BNFixed)(netAmount);
                const GROSS = (0, _core.BNFixed)(grossAmount);
                const FEE = (0, _core.BNFixed)(feeAmount);
                return {
                    GROSS,
                    NET,
                    FEE
                };
            }
        // Use expected interest (running period) or lastInterest (netting period) as gross interest
        case 'CREDIT':
            {
                const grossAmount = (0, _core.BNify)(interest);
                const feeAmount = grossAmount.minus(withdrawsFee).times((0, _core.BNify)(1).minus(feeMultiplier)).plus(withdrawsFee);
                const netAmount = grossAmount.minus(feeAmount);
                const GROSS = (0, _core.BNFixed)(grossAmount);
                const NET = (0, _core.BNFixed)(netAmount);
                const FEE = (0, _core.BNFixed)(feeAmount);
                return {
                    GROSS,
                    NET,
                    FEE
                };
            }
    }
}
function getVaultEpochWithdrawalTxBreakdown(epoch, { tokenAmount, price }, newPrice) {
    if (!epoch.withdraws) {
        return {
            NET: '0',
            FEE: '0',
            INTEREST: '0',
            GROSS: '0'
        };
    }
    // Withdrawals amount
    const { NET: totalNet, GROSS: totalGross, FEE: totalFees, INTEREST: totalInterest } = getVaultEpochWithdrawalsBreakdown(epoch);
    // Calculate proportion based on lp amount vs total gross amount
    const totalGrossWithdraw = (0, _core.BNify)(tokenAmount).times(newPrice).div(price).toFixed(0);
    const proportion = (0, _core.BNify)(totalGrossWithdraw).div(totalGross).toFixed(2);
    const NET = (0, _core.BNify)(totalNet).times(proportion).toFixed(0);
    const FEE = (0, _core.BNify)(totalFees).times(proportion).toFixed(0);
    const INTEREST = (0, _core.BNify)(totalInterest).times(proportion).toFixed(0);
    const GROSS = (0, _core.BNify)(totalGross).times(proportion).toFixed(0);
    return {
        NET,
        FEE,
        INTEREST,
        GROSS
    };
}

//# sourceMappingURL=vault-epoch.lib.js.map