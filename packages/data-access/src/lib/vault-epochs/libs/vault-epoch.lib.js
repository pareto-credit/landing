import { _ as _extends } from "@swc/helpers/_/_extends";
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { orderBy } from 'lodash';
import { BNeq, BNgt, BNify, BNint, BNlt, BNlte, periodToSeconds, SECONDS_IN_YEAR, secondsToPeriod } from '../../core';
import { normalizeTokenAmount } from '../../tokens';
/**
 * Initialize vault epoch APRs object
 * @param options APRs
 * @returns initialized APRs object
 */ export function initVaultEpochAPRs(options) {
    return {
        DELTA: (options == null ? void 0 : options.DELTA) || 0,
        EPOCH: (options == null ? void 0 : options.EPOCH) || 0,
        BUFFER: (options == null ? void 0 : options.BUFFER) || 0,
        CURE: (options == null ? void 0 : options.CURE) || 0,
        GROSS: (options == null ? void 0 : options.GROSS) || 0,
        NET: (options == null ? void 0 : options.NET) || 0
    };
}
/**
 * Get vault epoch client status
 * @param epoch - the vault epoch
 * @param date - the date to use
 * @returns the epoch client status
 */ export function getVaultEpochStatus(epoch, date) {
    const { status, endDate } = epoch;
    // Check finished status
    if (status === 'RUNNING' && moment(date).isAfter(endDate)) {
        return 'FINISHED';
    }
    // Running
    return status;
}
/**
 * Get vault epoch duration
 * @param block - the vault block
 * @returns the duration of the epoch
 */ export function getVaultEpochDurationByBlock(block) {
    var _block_cdoEpoch;
    const duration = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.duration) || 0;
    return secondsToPeriod(duration);
}
/**
 * Get vault epoch progression data
 * @param epoch - the vault epoch
 * @param date - the date to use
 * @returns the progression data
 */ export function getVaultEpochProgression(epoch, date) {
    const duration = BNify(epoch.duration);
    // Current end date and next start date
    const startDate = moment(epoch.startDate).toISOString();
    const endDate = moment(epoch.endDate).toISOString();
    const progression = BNify(moment(date).diff(startDate, 'second')).div(duration).times(100);
    const progress = BigNumber.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
/**
 * Get vault epoch waiting progression data
 * @param epoch - the vault epoch
 * @param date - the date to use
 * @returns the progression data
 */ export function getVaultEpochWaitingProgression(epoch, date) {
    const waitingPeriod = epoch.bufferDuration;
    // Current end date and next start date
    const endDate = moment(epoch.endDate).toISOString();
    const startDate = moment(endDate).add(waitingPeriod, 'second').toISOString();
    const progression = BNify(moment(date).diff(endDate, 'second')).div(waitingPeriod).times(100).toNumber();
    const progress = BigNumber.minimum(100, progression).toNumber();
    return {
        startDate,
        endDate,
        progress
    };
}
/**
 * Get epoch standard withdraws payment deadline
 * @param epoch - the vault epoch
 * @returns the date of the standards withdraws payment deadline
 */ export function getVaultEpochStandardDeadline(epoch) {
    const { status, endDate, duration, bufferDuration } = epoch;
    // If WAITING returns the previous epoch end date + buffer period + epoch duration
    if (status === 'WAITING') {
        return moment(endDate).add(bufferDuration, 'second').add(duration, 'second').toDate();
    }
    // Otherwise returns the current endDate
    return moment(endDate).toDate();
}
/**
 * Get epoch instant withdraw deadline depending on epoch status
 * @param epoch - the vault epoch
 * @returns the date of the instant withdraws payment deadline
 */ export function getVaultEpochInstantDeadline(epoch) {
    const { status, endDate, bufferDuration, instantWithdraws } = epoch;
    // If WAITING returns the prev epoch end date + buffer period + epoch duration
    if (status === 'WAITING') {
        return moment(endDate).add(bufferDuration, 'second').add(instantWithdraws == null ? void 0 : instantWithdraws.delay, 'second').toDate();
    }
    // Otherwise returns the endDate
    return moment(instantWithdraws == null ? void 0 : instantWithdraws.deadline).toDate();
}
/**
 * Get vault epoch withdraws amount
 * @param epoch - the vault epoch
 * @returns the withdraws amount to get
 */ export function getVaultEpochWithdrawsAmount(epoch) {
    var _epoch_withdraws, _epoch_instantWithdraws;
    return BNify(epoch.withdrawType === 'STANDARD' ? (_epoch_withdraws = epoch.withdraws) == null ? void 0 : _epoch_withdraws.amount : (_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount);
}
/**
 * Get vault epoch deadline
 * @param epoch - the vault epoch
 * @returns the vault epoch deadline
 */ export function getVaultEpochDeadline(epoch) {
    const instantWithdrawed = isVaultEpochWithdrawed(epoch);
    return epoch.withdrawType === 'INSTANT' && !instantWithdrawed ? getVaultEpochInstantDeadline(epoch) : getVaultEpochStandardDeadline(epoch);
}
/**
 * Get vault epoch to withdraw
 * @param epoch - the vault epoch
 * @returns the amount to withdraw
 */ export function getVaultEpochToWithdraw(epoch, customInterests) {
    const instantWithdrawed = isVaultEpochWithdrawed(epoch);
    return epoch.withdrawType === 'INSTANT' && !instantWithdrawed ? getVaultEpochInstantWithdraws(epoch) : getVaultEpochStandardAmount(epoch, customInterests);
}
/**
 * Check if epoch is payable
 * @param epoch - the vault epoch
 * @returns true if is payable
 */ export function checkVaultEpochPayable(epoch, date) {
    var _epoch_instantWithdraws;
    return epoch.withdrawType === 'INSTANT' && BNgt(epoch == null ? void 0 : (_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount) ? checkInstantWithdrawsPayable(epoch, date) : checkStandardWithdrawsPayable(epoch, date);
}
/**
 * Check if the instant withdraws deadline is passed
 * @param epoch - the vault epoch
 * @returns true | false
 */ export function checkInstantWithdrawsPayable(epoch, date) {
    var _epoch_instantWithdraws;
    return (epoch.status === 'RUNNING' || epoch.status === 'CURE') && moment((_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.deadline).isBefore(moment(date));
}
/**
 * Check wether an epoch is finished and ready to be paid
 * @param epoch - the vault epoch
 * @returns true | false
 */ export function checkStandardWithdrawsPayable(epoch, date) {
    return (epoch.status === 'RUNNING' || epoch.status === 'CURE') && moment(epoch.endDate).isBefore(moment(date));
}
/**
 * Get balance and allowance check from wallet based on amount to be withdrawn
 * @param amount amount requested
 * @param options borrower's balance and allowance
 * @returns balance and allowance check
 */ export function getEpochWithdrawsChecks(amount, options) {
    const { balance, allowance } = options;
    return {
        balance: BNify(balance).gte(amount),
        allowance: BNify(allowance).gte(amount)
    };
}
/**
 * Calculate next epoch expected interests based on current TVL
 * @param epoch - the vault epoch
 * @returns next epoch expected interests
 */ export function getVaultEpochExpectedInterests(epoch) {
    var _epoch_TVL;
    return BNify(((_epoch_TVL = epoch.TVL) == null ? void 0 : _epoch_TVL.token) || 0).times(epoch.APRs.GROSS).div(100).times(epoch.duration + epoch.bufferDuration).div(SECONDS_IN_YEAR);
}
/**
 * Get Vault epoch net interest
 * @param grossInterest - the gross interest
 * @param feePercentage - the fee percentage
 * @returns the net interest
 */ export function getVaultEpochNetInterest(grossInterest, feePercentage) {
    if (BNlte(grossInterest, 0)) {
        return '0';
    }
    return BNify(1).minus(BNify(feePercentage).div(`1e5`)).times(grossInterest).toString();
}
/**
 * Get Vault epoch gross interest
 * @param netInterest - the net interest
 * @param feePercentage - the fee percentage
 * @returns the net interest
 */ export function getVaultEpochGrossInterest(netInterest, feePercentage) {
    if (BNlte(netInterest, 0)) {
        return '0';
    }
    return BNify(netInterest).times(BNify(1).plus(BNify(feePercentage).div(`1e5`))).toString();
}
/**
 * Get vault epoch APR scaled
 * @param epoch - the vault epoch
 * @param epochApr - the epoch apr to scale
 * @returns the apr scaled
 */ export function getVaultEpochAPRScaled(epoch, epochApr, duration) {
    const apr = epochApr || epoch.APRs.NET;
    const totalDuration = duration || BNify(epoch.duration).plus(epoch.bufferDuration);
    return BNify(apr).times(totalDuration).div(epoch.duration).toFixed(18);
}
/**
 * Return the cdo epoch vault withdraw type
 * @param epoch - the VaultEpoch,
 * @returns the epoch withdraw type
 */ export function getVaultEpochNextWithdrawType(epoch, nextAPR) {
    const { instantWithdraws, APRs } = epoch;
    const aprType = 'GROSS';
    const currentAPR = BNify(APRs[aprType]).toFixed(4);
    // Instant withdraws disabled
    if (!instantWithdraws) {
        return 'STANDARD';
    }
    return BNlt(BNify(nextAPR).minus(currentAPR), -instantWithdraws.aprDelta) ? 'INSTANT' : 'STANDARD';
}
/**
 * Calculate the next epoch end date
 * @param epoch - the vault epoch
 * @param options - the
 */ export function getVaultEpochNextEndDate(epoch, options = {}) {
    const { date, newEpochDuration = epoch.duration } = options;
    return moment(date).add(newEpochDuration, 'seconds').add(epoch.bufferDuration, 'seconds').toDate();
}
/**
 * Return true if the epoch has been withdrawed
 * @param epoch - the vault epoch
 * @returns true if withdrawed
 */ export function isVaultEpochWithdrawed(epoch) {
    var _epoch_instantWithdraws;
    return epoch.withdrawType !== 'INSTANT' ? true : BNlte((_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount);
}
/**
 * Return true if epoch is startable
 * @param epoch - the VaultEpoch,
 * @returns the boolean that indicates if the epoch is startable
 */ export function isVaultEpochStartable(epoch, date) {
    const { bufferDuration, endDate } = epoch;
    // If not finished the next one cannot start
    if (!endDate) {
        return false;
    }
    const nextStartDate = moment(endDate).add(bufferDuration, 'second');
    return moment(date).isSameOrAfter(nextStartDate);
}
/**
 * Make vault epoch durations
 * @param startDate - the start date of the epoch
 * @param epochDuration - the epoch duration in seconds
 * @param bufferDuration - the buffer duration in seconds
 * @param prevEndDate - the previous epoch end date
 * @returns the epoch durations in seconds
 */ export function makeVaultEpochDurations(startDate, epochDuration, bufferDuration, prevEndDate, isUnderCure) {
    // Calculate cure period
    const cureDuration = prevEndDate && isUnderCure ? moment.duration(moment(startDate).diff(prevEndDate)).asSeconds() : 0;
    return {
        EPOCH: epochDuration,
        BUFFER: bufferDuration,
        CURE: cureDuration,
        TOTAL: epochDuration + bufferDuration + cureDuration
    };
}
/**
 * Make vault epoch APRs from amounts and timing
 * @param amounts - the epoch amounts
 * @param timing - the timing data about epoch
 * @returns the vault epoch APRs
 */ export function makeVaultEpochAPRs(amounts, timings, isUnderCure) {
    const { tvl, netInterest, grossInterest, totalAPR, epochBufferAPR, lastAPR } = amounts;
    const { startDate, epochDuration, bufferDuration, lastEndDate } = timings;
    const durations = makeVaultEpochDurations(startDate, epochDuration, bufferDuration, lastEndDate, isUnderCure);
    /**
   * APRs calculation
   */ const GROSS = makeVaultEpochAprGross(tvl, durations, {
        totalAPR,
        epochBufferAPR,
        grossInterest
    });
    if (BNlte(GROSS)) {
        return initVaultEpochAPRs();
    }
    const DELTA = BNgt(lastAPR) ? BNify(GROSS).minus(BNify(lastAPR)).toNumber() : 0;
    const NET = makeVaultEpochAprFromInterests(tvl, netInterest, durations.TOTAL).toNumber();
    const CURE = BNgt(durations.CURE) ? BNify(durations.CURE).times(GROSS).div(durations.TOTAL).toNumber() : 0;
    const EPOCH = makeVaultEpochApr(BNify(GROSS).minus(CURE).toNumber(), durations.EPOCH, durations.BUFFER).toNumber();
    const BUFFER = BNify(GROSS).minus(CURE).minus(EPOCH).toNumber();
    return initVaultEpochAPRs({
        NET,
        DELTA,
        GROSS,
        EPOCH,
        BUFFER,
        CURE
    });
}
/**
 * Calculate epoch APR from total APR
 * @param totalApr total APR
 * @param epochDuration epoch duration
 * @param bufferPeriod buffer period duration
 * @returns epoch apr
 */ export function makeVaultEpochApr(totalApr, epochDuration, bufferDuration) {
    if (BNlte(epochDuration)) {
        return BNify();
    }
    return BNify(totalApr).times(epochDuration).div(BNify(epochDuration).plus(BNify(bufferDuration)));
}
/**
 * GROSS Apr calculation
 * Case 1 -> from TOTAL APR
 * Case 2 -> from EPOCH+BUFFER APR
 * Case 3 -> from interests
 * @param tvl
 * @param durations
 * @param options
 */ export function makeVaultEpochAprGross(tvl, durations, options = {}) {
    const { totalAPR, epochBufferAPR, grossInterest } = options;
    let GROSS = 0;
    if (grossInterest !== undefined && BNgt(grossInterest)) {
        GROSS = makeVaultEpochAprFromInterests(tvl, grossInterest, durations.TOTAL).toNumber();
    } else if (BNgt(totalAPR)) {
        GROSS = BNify(totalAPR).toNumber();
    } else if (BNgt(epochBufferAPR)) {
        GROSS = BNify(epochBufferAPR).times(durations.TOTAL).div(BNify(durations.EPOCH).plus(BNify(durations.BUFFER))).toNumber();
    }
    return GROSS;
}
/**
 * Calculate vault epoch APR based on generated interests
 * @param tvl total TVL in undering tokens
 * @param interests interests generated in underlying tokens
 * @param epochDuration epoch duration
 * @returns APR based on interests generated on TVL
 */ export function makeVaultEpochAprFromInterests(tvl, interest, duration) {
    if (BNlte(tvl)) {
        return BNify();
    }
    return BNify(interest).div(tvl).times(SECONDS_IN_YEAR).div(duration).times(100);
}
/**
 * Parse a list of vault epochs into a dictionary
 * @param epochs - the epochs list
 * @returns the dictionary of the epochs
 */ export function parseVaultEpochs(epochs) {
    // Sort by block number
    const [epoch, lastEpoch] = orderBy(epochs, 'block.number', 'desc');
    return {
        epoch,
        lastEpoch
    };
}
/**
 * Get amount required to be withdrawn from the borrower to stop an epoch
 * @param epoch - the vault epoch
 * @param customInterests - the custom interests to use for the calculation
 * @returns total standard amount
 * @deprecated
 */ export function getVaultEpochStandardAmount(epoch, customInterests) {
    const interests = customInterests !== undefined ? customInterests : BNify(epoch.expectedInterest);
    return getVaultEpochStandardWithdraws(epoch).plus(interests);
}
/**
 * Get cdo epoch standard withdraws
 * @param epoch - the vault epoch
 * @returns standard withdraws amount
 * @deprecated
 */ export function getVaultEpochStandardWithdraws(epoch) {
    var _epoch_withdraws;
    return BNify((_epoch_withdraws = epoch.withdraws) == null ? void 0 : _epoch_withdraws.amount);
}
/**
 * Get cdo epoch instant withdraws
 * @param epoch - the vault epoch
 * @returns instant withdraws amount
 * @deprecated
 */ export function getVaultEpochInstantWithdraws(epoch) {
    var _epoch_instantWithdraws;
    return BNify((_epoch_instantWithdraws = epoch.instantWithdraws) == null ? void 0 : _epoch_instantWithdraws.amount);
}
/**
 * Get total withdraws amount for a cdo epoch
 * @param epoch - the vault epoch
 * @returns epoch total withdraws
 * @deprecated
 */ export function getVaultEpochTotalWithdraws(epoch) {
    return getVaultEpochStandardWithdraws(epoch).plus(getVaultEpochInstantWithdraws(epoch));
}
/**
 * Get vault epoch data
 * @param vault - the vault entity
 * @param token - the token entity
 * @param epochs - the last 2 epochs of the vault
 * @returns the vault epoch data
 */ export function getVaultEpochData(vault, token, epochs = []) {
    if (vault.contractType !== 'CDO_EPOCH' || !vault.cdoEpoch) {
        return;
    }
    const { epoch, lastEpoch } = parseVaultEpochs(epochs);
    if (!epoch) {
        return;
    }
    // Withdraws && Interests data
    const { duration, unit } = secondsToPeriod(epoch.duration);
    const durationSeconds = epoch.duration;
    const instantWithdrawed = isVaultEpochWithdrawed(epoch);
    const withdrawAmount = getVaultEpochWithdrawsAmount(epoch).toFixed(token.decimals);
    const withdrawDeadline = getVaultEpochDeadline(epoch);
    const interests = BNint(epoch.expectedInterest);
    const toWithdraw = BNint(getVaultEpochToWithdraw(epoch));
    const isDefaultable = false;
    const feePercentage = vault.feePercentage;
    // APRs
    const totalAPR = vault.cdoEpoch.mode === 'CREDIT' && epoch.status !== 'CURE' ? epoch.APRs.GROSS : undefined;
    const epochBufferAPR = vault.cdoEpoch.mode === 'CREDIT' && epoch.status === 'CURE' ? BNify(epoch.APRs.EPOCH).plus(epoch.APRs.BUFFER).toNumber() : undefined;
    const APRs = makeVaultEpochAPRs({
        netInterest: epoch.expectedInterest,
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
/**
 * Set vault epoch data APR Gross
 * @param epochData - the vault epoch data
 * @param token - the token entity
 * @param aprGross - the apr gross to set
 * @returns the vault epoch data
 */ export function setVaultEpochDataApr(epochData, aprGross) {
    const { epoch, lastEpoch } = epochData;
    if (aprGross === '') {
        return epochData;
    }
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        epochBufferAPR: BNify(aprGross).toNumber(),
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: epoch.duration,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends({}, epochData, {
        APRs
    });
}
/**
 * Set vault epoch data duration
 * @param epochData - the vault epoch data
 * @param newDuration - the new duration to set
 * @returns the vault epoch data
 */ export function setVaultEpochDataDuration(epochData, newDuration) {
    if (newDuration === undefined || newDuration === '') {
        return epochData;
    }
    const { epoch, lastEpoch, APRs: newAPRs } = epochData;
    // Durations
    const duration = BNify(newDuration).toNumber();
    const durationSeconds = periodToSeconds(duration, epochData.unit);
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
    return _extends({}, epochData, {
        duration,
        durationSeconds,
        APRs
    });
}
/**
 * Set vault epoch data end date
 * @param epochData - the vault epoch data
 * @param endDate - the new end date
 * @returns the vault epoch data
 */ export function setVaultEpochDataEndDate(epochData, options) {
    if (!options.endDate) {
        return epochData;
    }
    const { startDate, endDate } = options;
    const { epoch, lastEpoch } = epochData;
    // Durations
    const duration = moment(endDate).diff(startDate, epochData.unit);
    const durationSeconds = periodToSeconds(duration, epochData.unit);
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        totalAPR: epoch.APRs.GROSS,
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: durationSeconds,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends({}, epochData, {
        APRs,
        duration,
        durationSeconds
    });
}
/**
 * Set vault epoch data unit
 * @param epochData - the vault epoch data
 * @param unit - the new unit time
 * @returns the vault epoch data
 */ export function setVaultEpochDataUnit(epochData, unit) {
    const { epoch, lastEpoch } = epochData;
    // Durations
    const duration = epochData.duration;
    const durationSeconds = periodToSeconds(duration, unit);
    // APRs
    const APRs = makeVaultEpochAPRs({
        tvl: epoch.TVL.token,
        netInterest: epoch.expectedInterest,
        totalAPR: epoch.APRs.GROSS,
        lastAPR: lastEpoch == null ? void 0 : lastEpoch.APRs.GROSS
    }, {
        startDate: epoch.startDate || new Date(),
        epochDuration: durationSeconds,
        bufferDuration: epoch.bufferDuration,
        lastEndDate: lastEpoch == null ? void 0 : lastEpoch.endDate
    }, epoch.status === 'CURE');
    return _extends({}, epochData, {
        APRs,
        unit,
        durationSeconds
    });
}
/**
 * Set vault epoch data interests
 * @param epochData - the vault epoch data
 * @param token - the token entity
 * @param newInterests - the new interests amount
 * @returns the vault epoch data
 */ export function setVaultEpochDataInterests(epochData, token, newInterests) {
    const { epoch, lastEpoch, feePercentage, APRs } = epochData;
    if (newInterests === undefined || newInterests === '') {
        return epochData;
    }
    const normalizedInterests = normalizeTokenAmount(token, BNify(newInterests));
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
    const isDefaultable = BNeq(newInterests, BNify(1).div(10 ** token.decimals));
    return _extends({}, epochData, {
        APRs: newAPRs,
        lastAPRs,
        interests: normalizedInterests.toString(),
        toWithdraw: toWithdraw.toFixed(token.decimals),
        isDefaultable
    });
}

//# sourceMappingURL=vault-epoch.lib.js.map