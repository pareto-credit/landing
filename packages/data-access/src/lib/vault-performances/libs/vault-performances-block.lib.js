import { BNFixed, BNgt, BNgte, BNify, BNlte, SECONDS_IN_YEAR } from '../../core';
import { getTokenAmount } from '../../tokens';
import { cloneDeep, defaultsDeep } from 'lodash';
import moment from 'moment';
/**
 * Vault performance initial state
 */ export const VAULT_PERFORMANCE = {
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
/**
 * Init vault performance object
 * @param options partial vault performance
 * @returns vault performance object
 */ export function initVaultPerformance(performance = {}) {
    return defaultsDeep(cloneDeep(performance), VAULT_PERFORMANCE);
}
export function initVaultEarnings(earnings = {}) {
    return defaultsDeep(cloneDeep(earnings), VAULT_PERFORMANCE.earnings);
}
/**
 * Calculate earnings percentage between two vault blocks
 * @param vaultBlocks current and last vault blocks
 * @returns earnings percentage
 */ export function getEarningsPercentage({ current, last }) {
    if (!last || BNlte(last.totalSupply)) {
        return BNify();
    }
    return BNgt(last.price) ? BNify(current.price).div(BNify(last.price)).minus(1) : BNify();
}
/**
 * Calculate wallet earnings using transaction price
 * @param earnings earnings accumulator
 * @param token underlying token
 * @param transaction transaction entity
 * @param lastVaultBlock last vault block entity
 * @returns earnings generated for the transaction
 */ export function calculateTransactionEarnings(earnings, token, transaction, lastVaultBlock) {
    const tokenDecimalsDiff = 18 - token.decimals;
    const transactionEarningsPercentage = BNify(transaction.price).div(BNify(lastVaultBlock.price)).minus(1);
    const transactionEarnings = BNify(transaction.amount).times(transactionEarningsPercentage).div(`1e${tokenDecimalsDiff}`);
    return earnings.plus(transactionEarnings);
}
/**
 * Calculate earnings using transactions price
 * @param token underlying token
 * @param lastVaultBlock last vault block
 * @param transactions transactions entities
 * @returns total earnings generated
 */ export function calculateTransactionsEarnings(token, lastVaultBlock, transactions) {
    if (!transactions) return BNify();
    return transactions.reduce((earnings, transaction)=>{
        return calculateTransactionEarnings(earnings, token, transaction, lastVaultBlock);
    }, BNify());
}
/**
 * Get vault earnings in underlying token
 * @param token token entity
 * @param vaultBlocks current and last vault blocks
 * @param redeemTransactions redeems transactions
 * @returns vault earnings in underlying tokens
 */ export function getVaultEarningsToken(token, { current, last }, redeemTransactions) {
    if (!last || BNlte(last.totalSupply)) {
        return BNify();
    }
    const earningsPercentage = getEarningsPercentage({
        current,
        last
    });
    // Calculate earnings using last totalSupply
    if (BNgte(current.totalSupply, last.totalSupply)) {
        const prevNAV = BNify(last.totalSupply).times(last.price).div(1e18);
        const currentNAV = BNify(last.totalSupply).times(current.price).div(1e18);
        return currentNAV.minus(prevNAV);
    }
    // Calculate earnings before redeem and for redeemed amounts using transaction price
    // Needed for token amount decimals
    const tokenDecimalsDiff = 18 - token.decimals;
    // Calculate earnings for remaining totalSupply (after redeem)
    const earningsToken = BNify(current.totalSupply).times(earningsPercentage).div(`1e${tokenDecimalsDiff}`);
    // Calculate redeems earnings
    const redeemEarnings = calculateTransactionsEarnings(token, last, redeemTransactions);
    // Return total earnings
    return earningsToken.plus(redeemEarnings);
}
/**
 * Calculate vault performance earnings
 * @param token vault token entity
 * @param vaultBlocks last and current vault block
 * @param tokenPriceData token USD conversion data
 * @param redeemTransactions transactions with type REDEEM for the current block
 * @returns the vault earnings
 */ export function getVaultEarnings(token, { current, last }, { price }, redeemTransactions) {
    if (!last || BNlte(last.totalSupply)) {
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
    const earningsUSD = earningsToken.times(price).div(getTokenAmount(token));
    return initVaultEarnings({
        percentage: earningsPercentage.times(100).toNumber(),
        token: BNFixed(earningsToken),
        USD: BNFixed(earningsUSD)
    });
}
/**
 * Get seconds between current and last vault block
 * @param block current block
 * @param lastVaultBlock last vault block data
 * @returns Seconds passed between two blocks
 */ export function getSecondsBetweenBlocks(block, lastVaultBlock) {
    return BNgt(lastVaultBlock.totalSupply) ? block.timestamp - lastVaultBlock.block.timestamp : 0;
}
export function getVaultPerformanceAge({ current, last }, epochsDuration) {
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
/**
 * Calculate realized APY
 * @param secondsBetweenBlocks seconds between last and current vault block
 * @param earningsPercentage earnings generated between blocks in percentage
 * @returns realized APY
 */ export function getVaultRealizedAPY(age, earningsPercentage) {
    return BNgt(age) ? BNify(earningsPercentage).times(SECONDS_IN_YEAR).div(age).toNumber() : 0;
}
/**
 * Get vault finished epochs between blocks
 * @param vaultEpochs vault epochs
 * @param currLastBlocks vault current and prev blocks
 * @param lastWalletBlock last wallet block with balance
 * @returns vault finished epochs
 */ export function getVaultFinishedEpochs(vaultEpochs, currLastBlocks, lastWalletBlock) {
    var _currLastBlocks_last;
    const minTimestamp = Math.max((lastWalletBlock == null ? void 0 : lastWalletBlock.block.timestamp) || 0, ((_currLastBlocks_last = currLastBlocks.last) == null ? void 0 : _currLastBlocks_last.block.timestamp) || 0);
    return vaultEpochs.filter((vaultEpoch)=>vaultEpoch.status === 'FINISHED' && moment(vaultEpoch.startDate).isSameOrAfter(moment.unix(minTimestamp)) && moment(vaultEpoch.endDate).isSameOrBefore(moment.unix(currLastBlocks.current.block.timestamp)));
}
/**
 * Calculate vault performances
 * @param block - the current block
 * @param vaultBlocks - the current and the latest blocks
 * @param tokenData - the token data
 * @returns the current vault performance
 */ export function getVaultPerformance({ current, last }, token, tokenPrice, walletBlocksHolders, lastPerformance, redeemTransactions, epochsDuration) {
    if (!last || BNlte(last.totalSupply)) {
        return initVaultPerformance();
    }
    // Update holders
    const holders = walletBlocksHolders.filter((b)=>BNgt(b.balance)).length;
    const newHolders = BNify(holders).minus(BNify(lastPerformance == null ? void 0 : lastPerformance.holders)).toNumber();
    // Calculate earnings
    const earnings = getVaultEarnings(token, {
        current,
        last
    }, tokenPrice, redeemTransactions);
    // Get vault performance age
    const age = getVaultPerformanceAge({
        current,
        last
    }, epochsDuration);
    // Realized APY
    const realizedAPY = getVaultRealizedAPY(age, earnings.percentage);
    return initVaultPerformance({
        age,
        earnings,
        holders: newHolders,
        realizedAPY: realizedAPY
    });
}
/**
 * Calculate performance aggregation
 * @param currentPerformance - the performance of the current block
 * @param vaultBlocks - the current and the latest blocks
 * @returns the aggregation of the performances
 */ export function getVaultAggregatedPerformance(currentPerformance, lastPerformance) {
    if (!lastPerformance) {
        return currentPerformance;
    }
    // Update holders
    const holders = BNify(lastPerformance.holders).plus(currentPerformance.holders);
    // Earnings
    const earnings = {
        token: BNify(lastPerformance.earnings.token).plus(currentPerformance.earnings.token).toFixed(0),
        USD: BNify(lastPerformance.earnings.USD).plus(currentPerformance.earnings.USD).toFixed(0),
        percentage: BNify(lastPerformance.earnings.percentage).plus(currentPerformance.earnings.percentage).toNumber()
    };
    // Age
    const age = BNify(lastPerformance.age).plus(currentPerformance.age).toNumber();
    const realizedAPY = BNgt(age) ? BNify(lastPerformance.realizedAPY).times(lastPerformance.age || 0).plus(BNify(currentPerformance.realizedAPY).times(currentPerformance.age)).div(age) : BNify();
    return initVaultPerformance({
        age,
        holders: holders.toNumber(),
        earnings,
        realizedAPY: realizedAPY.toNumber()
    });
}

//# sourceMappingURL=vault-performances-block.lib.js.map