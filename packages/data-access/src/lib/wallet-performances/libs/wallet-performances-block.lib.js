import { _ as _extends } from "@swc/helpers/_/_extends";
import BigNumber from 'bignumber.js';
import { fixAmount, getTokenAmount } from '../../tokens';
import { BNFixed, BNgt, BNify, BNlte, compLower } from '../../core';
import { cloneDeep, defaultsDeep } from 'lodash';
import { WALLET_PERFORMANCE, WALLET_PORTFOLIO, WALLET_POSITION } from '../wallet-performance.const';
import { getWalletBlockPoolTokenBalance, getWalletBlockPoolTokenBalanceUSD } from '../../wallet-blocks';
/**
 * Init wallet performance object
 * @param options partial vault performance
 * @returns wallet performance object
 */ export function initWalletPerformance(performance = {}) {
    return defaultsDeep(cloneDeep(performance), WALLET_PERFORMANCE);
}
/**
 * Init wallet performance object
 * @param options partial vault performance
 * @returns wallet performance object
 */ export function initWalletPortfolio(position = {}) {
    return defaultsDeep(cloneDeep(position), WALLET_PORTFOLIO);
}
/**
 * Init wallet position object
 * @param options partial vault position
 * @returns wallet position object
 */ export function initWalletPosition(position = {}) {
    return defaultsDeep(cloneDeep(position), WALLET_POSITION);
}
/**
 * Init wallet earnings object
 * @param earnings partial earnings
 * @returns wallet earnings object
 */ export function initWalletEarnings(earnings = {}) {
    return defaultsDeep(cloneDeep(earnings), WALLET_PERFORMANCE.earnings);
}
const WALLET_BLOCK_AMOUNTS = {
    USD: '0'
};
/**
 * Init wallet block amounts object
 * @param options partial wallet block amounts
 * @returns wallet block amounts object
 */ export function initWalletBlockAmounts(amounts = {}) {
    return defaultsDeep(cloneDeep(amounts), WALLET_BLOCK_AMOUNTS);
}
/**
 * Calculate wallet earnings
 * @param token vault token entity
 * @param tokenBalance wallet balance in underlying tokens
 * @param earningsPercentage earnings percentage
 * @param tokenPriceData token USD conversion data
 * @returns the wallet earnings
 */ export function getWalletEarnings(token, tokenBalance, earningsPercentage, { price }) {
    // Calculate earnings
    const earningsToken = BNify(tokenBalance).times(earningsPercentage).div(100);
    const earningsUSD = earningsToken.times(price).div(getTokenAmount(token));
    return initWalletEarnings({
        percentage: earningsPercentage,
        token: BNFixed(earningsToken),
        USD: BNFixed(earningsUSD)
    });
}
/**
 * Calculate wallet rewards eranings
 * @param distributedRewards distributed rewards
 * @returns wallet rewards earnings
 */ export function getWalletRewardsEarnings(distributedRewards) {
    return distributedRewards.reduce((acc, r)=>{
        const USD = BNFixed(BNify(acc.USD).plus(r.amountUSD));
        const percentage = BNify(acc.percentage).plus(r.percentage).toNumber();
        return {
            USD,
            percentage
        };
    }, initWalletEarnings());
}
/**
 * Calculate age between current block and last wallet performance block
 * @param block current block
 * @param lastWalletBlock last wallet block
 * @param lastWalletPerformance last wallet performance block
 * @returns age in seconds
 */ export function calculateWalletPerformanceAge(block, lastWalletBlock, lastWalletPerformance) {
    // First wallet performance block
    if (!lastWalletPerformance) {
        return block.timestamp - lastWalletBlock.block.timestamp;
    }
    // Get max timestamp between walletBlock and walletPerformance
    const latestTimestamp = BNgt(lastWalletPerformance.age) ? BigNumber.maximum(BNify(lastWalletPerformance == null ? void 0 : lastWalletPerformance.block.timestamp), lastWalletBlock.block.timestamp).toNumber() : lastWalletBlock.block.timestamp;
    // Calculate age from last wallet performance or from wallet block
    return block.timestamp - latestTimestamp;
}
/**
 * Calculate wallet last performance
 * @param lastWalletBlock - the last wallet block
 * @param lastWalletPerformance - the last performance of the wallet
 * @param vaultBlocks - the current and last vault blocks
 * @param currentVaultPerformance - the current vault performance
 * @param tokenPriceData - the token price data
 * @returns the current wallet performance
 */ export function getWalletPerformance(feePercentage, token, lastWalletBlock, lastWalletPerformance, { current: currentVault, last: lastVault }, currentVaultPerformance, tokenPrice, distributedRewards) {
    // Exit if last wallet tokenBalance <= 0
    if (BNlte(lastWalletBlock.tokenBalance)) {
        return initWalletPerformance();
    }
    // Get performance age
    const age = calculateWalletPerformanceAge(currentVault.block, lastWalletBlock, lastWalletPerformance);
    // If age <= 0 return empty performance
    if (BNlte(age)) {
        return initWalletPerformance();
    }
    // Calculate earnings
    const earnings = getWalletEarnings(token, lastWalletBlock.tokenBalance, currentVaultPerformance.earnings.percentage, tokenPrice);
    // Fees
    const fees = {
        USD: BNFixed(BNify(earnings.USD).times(fixAmount(feePercentage, 5))),
        token: BNFixed(BNify(earnings.token).times(fixAmount(feePercentage, 5)))
    };
    const rewards = (distributedRewards == null ? void 0 : distributedRewards.length) ? getWalletRewardsEarnings(distributedRewards) : initWalletEarnings();
    // Realized APY and share percentage
    const realizedAPY = BNify(currentVaultPerformance.realizedAPY);
    // Calculate pool share using latest vault block totalSupply
    const poolSharePercentage = BNgt(lastVault == null ? void 0 : lastVault.totalSupply) ? BNify(lastWalletBlock.balance).div(BNify(lastVault == null ? void 0 : lastVault.totalSupply)) : BNify();
    return initWalletPerformance({
        age,
        fees,
        earnings: _extends({}, earnings, {
            rewards
        }),
        realizedAPY: realizedAPY.toNumber(),
        poolSharePercentage: poolSharePercentage.times(100).toNumber()
    });
}
/**
 * Aggregate rewards earnings by tokenId
 * @param rewards distributed rewards
 * @returns aggregated earnings
 */ export function getWalletAccruedRewards(rewards) {
    return rewards.reduce((acc, reward)=>{
        const foundReward = acc.find((r)=>r.tokenId === reward.tokenId);
        return foundReward ? acc.map((r)=>r.tokenId === reward.tokenId ? {
                tokenId: reward.tokenId,
                amount: BNFixed(BNify(r.amount).plus(BNify(reward.amount))),
                amountUSD: BNFixed(BNify(r.amountUSD).plus(BNify(reward.amountUSD))),
                APR: BNify(r.APR).plus(reward.APR).div(2).toNumber(),
                percentage: BNify(r.percentage).plus(reward.percentage).toNumber()
            } : r) : [
            ...acc,
            {
                tokenId: reward.tokenId,
                amount: reward.amount,
                amountUSD: reward.amountUSD,
                APR: reward.APR,
                percentage: reward.percentage
            }
        ];
    }, []);
}
/**
 * Calculate performance aggregation
 * @param currentPerformance - the performance of the current block
 * @param lastPerformance - the performance of the latest block
 * @returns the aggregation of the performances
 */ export function getWalletAggregatedPerformance(currentPerformance, lastPerformance) {
    if (!lastPerformance || BNlte(currentPerformance.age) || BNlte(currentPerformance.poolSharePercentage)) {
        return initWalletPerformance(currentPerformance);
    }
    // Current age of the wallet
    const age = lastPerformance.age + currentPerformance.age;
    // Calculated earnings
    const earningsToken = BNify(lastPerformance.earnings.token).plus(currentPerformance.earnings.token || 0);
    const earningsUSD = BNify(lastPerformance.earnings.USD).plus(currentPerformance.earnings.USD);
    const earningsPercentage = BNify(lastPerformance.earnings.percentage).plus(currentPerformance.earnings.percentage).toNumber();
    const earnings = {
        token: BNFixed(earningsToken),
        USD: BNFixed(earningsUSD),
        percentage: earningsPercentage
    };
    const realizedAPY = BNify(lastPerformance.realizedAPY).times(lastPerformance.age).plus(BNify(currentPerformance.realizedAPY).times(currentPerformance.age)).div(age).toNumber();
    const poolSharePercentage = (lastPerformance == null ? void 0 : lastPerformance.poolSharePercentage) ? BNify(lastPerformance.poolSharePercentage).times(lastPerformance.age).plus(BNify(currentPerformance.poolSharePercentage).times(currentPerformance.age)).div(age) : BNify(currentPerformance.poolSharePercentage);
    return initWalletPerformance({
        age,
        earnings,
        realizedAPY,
        poolSharePercentage: poolSharePercentage ? poolSharePercentage.toNumber() : 0
    });
}
/**
 * Get vault tokens staked in pools
 * @param vault vault entity
 * @param walletBlock wallet block entity
 * @param options mongodb options
 * @returns wallet pools tokens balances
 */ export function getWalletPoolsTokens(vault, token, walletBlock, vaultBlock) {
    const positionTokens = (walletBlock.pools || []).reduce((acc, pool)=>{
        var _vault_pools, _pool_tokens, _pool_tokens1;
        const vaultPool = (_vault_pools = vault.pools) == null ? void 0 : _vault_pools.find((p)=>compLower(p.address, pool.address));
        if (!vaultPool) {
            return acc;
        }
        const tokenAddress = ((_pool_tokens = pool.tokens) == null ? void 0 : _pool_tokens[0].tokenAddress) || token.address;
        const tokenId = ((_pool_tokens1 = pool.tokens) == null ? void 0 : _pool_tokens1[0].tokenId) || token._id;
        const amount = getWalletBlockPoolTokenBalance(tokenId, pool);
        if (BNlte(amount)) {
            return acc;
        }
        const USD = getWalletBlockPoolTokenBalanceUSD(vault, token, vaultBlock, tokenId, amount);
        return [
            ...acc,
            {
                pool: vaultPool.ref,
                walletId: walletBlock.walletId,
                operatorId: pool.operatorId,
                tokenId,
                tokenAddress,
                amount,
                USD,
                percentage: 0
            }
        ];
    }, []);
    if (vault.contractType === 'PARETO_DOLLAR') {
        var _walletBlock_paretoDollar;
        const amount = BNFixed((_walletBlock_paretoDollar = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar.uspBalance);
        const USD = BNFixed(fixAmount(amount, 18).times(1e6));
        positionTokens.push({
            walletId: walletBlock.walletId,
            tokenId: vault.tokenId,
            tokenAddress: token.address,
            amount,
            USD,
            percentage: 0
        });
    }
    return positionTokens.filter((t)=>BNgt(t.amount));
}

//# sourceMappingURL=wallet-performances-block.lib.js.map