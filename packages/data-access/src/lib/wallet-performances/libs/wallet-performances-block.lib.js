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
    calculateWalletPerformanceAge: function() {
        return calculateWalletPerformanceAge;
    },
    getPendleWalletPositionTokens: function() {
        return getPendleWalletPositionTokens;
    },
    getWalletAccruedRewards: function() {
        return getWalletAccruedRewards;
    },
    getWalletAggregatedPerformance: function() {
        return getWalletAggregatedPerformance;
    },
    getWalletEarnings: function() {
        return getWalletEarnings;
    },
    getWalletPerformance: function() {
        return getWalletPerformance;
    },
    getWalletPoolsTokens: function() {
        return getWalletPoolsTokens;
    },
    getWalletRewardsEarnings: function() {
        return getWalletRewardsEarnings;
    },
    initWalletBlockAmounts: function() {
        return initWalletBlockAmounts;
    },
    initWalletEarnings: function() {
        return initWalletEarnings;
    },
    initWalletPerformance: function() {
        return initWalletPerformance;
    },
    initWalletPortfolio: function() {
        return initWalletPortfolio;
    },
    initWalletPosition: function() {
        return initWalletPosition;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _bignumber = /*#__PURE__*/ _interop_require_default._(require("bignumber.js"));
const _tokens = require("../../tokens");
const _core = require("../../core");
const _lodash = require("lodash");
const _walletperformanceconst = require("../wallet-performance.const");
const _walletblocks = require("../../wallet-blocks");
function initWalletPerformance(performance = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(performance), _walletperformanceconst.WALLET_PERFORMANCE);
}
function initWalletPortfolio(position = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(position), _walletperformanceconst.WALLET_PORTFOLIO);
}
function initWalletPosition(position = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(position), _walletperformanceconst.WALLET_POSITION);
}
function initWalletEarnings(earnings = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(earnings), _walletperformanceconst.WALLET_PERFORMANCE.earnings);
}
const WALLET_BLOCK_AMOUNTS = {
    USD: '0'
};
function initWalletBlockAmounts(amounts = {}) {
    return (0, _lodash.defaultsDeep)((0, _lodash.cloneDeep)(amounts), WALLET_BLOCK_AMOUNTS);
}
function getWalletEarnings(token, tokenBalance, earningsPercentage, { price }) {
    // Calculate earnings
    const earningsToken = (0, _core.BNify)(tokenBalance).times(earningsPercentage).div(100);
    const earningsUSD = earningsToken.times(price).div((0, _tokens.getTokenAmount)(token));
    return initWalletEarnings({
        percentage: earningsPercentage,
        token: (0, _core.BNFixed)(earningsToken),
        USD: (0, _core.BNFixed)(earningsUSD)
    });
}
function getWalletRewardsEarnings(distributedRewards) {
    return distributedRewards.reduce((acc, r)=>{
        const USD = (0, _core.BNFixed)((0, _core.BNify)(acc.USD).plus(r.amountUSD));
        const percentage = (0, _core.BNify)(acc.percentage).plus(r.percentage).toNumber();
        return {
            USD,
            percentage
        };
    }, initWalletEarnings());
}
function calculateWalletPerformanceAge(block, lastWalletBlock, lastWalletPerformance) {
    // First wallet performance block
    if (!lastWalletPerformance) {
        return block.timestamp - lastWalletBlock.block.timestamp;
    }
    // Get max timestamp between walletBlock and walletPerformance
    const latestTimestamp = (0, _core.BNgt)(lastWalletPerformance.age) ? _bignumber.default.maximum((0, _core.BNify)(lastWalletPerformance == null ? void 0 : lastWalletPerformance.block.timestamp), lastWalletBlock.block.timestamp).toNumber() : lastWalletBlock.block.timestamp;
    // Calculate age from last wallet performance or from wallet block
    return block.timestamp - latestTimestamp;
}
function getWalletPerformance(vault, token, lastWalletBlock, lastWalletPerformance, { current: currentVault, last: lastVault }, vaultPerformance, tokenPrice, distributedRewards) {
    const { feePercentage, pools } = vault;
    const balance = (0, _walletblocks.getWalletBlockBalance)(lastWalletBlock, 'poolTokenBalance', {
        token,
        vaultPools: pools,
        startBalance: lastWalletBlock.balance,
        timestamp: currentVault.block.timestamp
    });
    // Exit if last wallet tokenBalance <= 0
    if ((0, _core.BNlte)(balance)) {
        return initWalletPerformance();
    }
    // Get performance age
    const age = calculateWalletPerformanceAge(currentVault.block, lastWalletBlock, lastWalletPerformance);
    // If age <= 0 return empty performance
    if ((0, _core.BNlte)(age)) {
        return initWalletPerformance();
    }
    const tokenBalance = (0, _core.BNFixed)((0, _core.BNify)(balance).times((lastVault == null ? void 0 : lastVault.price) || (0, _tokens.getTokenAmount)(token, 1)).div(1e18));
    // Calculate earnings
    const earnings = getWalletEarnings(token, tokenBalance, vaultPerformance.earnings.percentage, tokenPrice);
    // Fees
    const fees = {
        USD: (0, _core.BNFixed)((0, _core.BNify)(earnings.USD).times((0, _tokens.fixAmount)(feePercentage, 5))),
        token: (0, _core.BNFixed)((0, _core.BNify)(earnings.token).times((0, _tokens.fixAmount)(feePercentage, 5)))
    };
    const rewards = (distributedRewards == null ? void 0 : distributedRewards.length) ? getWalletRewardsEarnings(distributedRewards) : initWalletEarnings();
    // Realized APY and share percentage
    const realizedAPY = (0, _core.BNify)(vaultPerformance.realizedAPY);
    // Calculate pool share using latest vault block totalSupply
    const poolSharePercentage = (0, _core.BNgt)(lastVault == null ? void 0 : lastVault.totalSupply) ? (0, _core.BNify)(balance).div((0, _core.BNify)(lastVault == null ? void 0 : lastVault.totalSupply)) : (0, _core.BNify)();
    return initWalletPerformance({
        startBlock: (lastVault == null ? void 0 : lastVault.block) || lastWalletBlock.block,
        endBlock: currentVault.block,
        age,
        fees,
        balance: (0, _core.BNFixed)((0, _tokens.fixAmount)(balance, 18)),
        tokenBalance: (0, _core.BNFixed)(tokenBalance),
        earnings: _extends._({}, earnings, {
            rewards
        }),
        realizedAPY: realizedAPY.toNumber(),
        poolSharePercentage: poolSharePercentage.times(100).toNumber()
    });
}
function getWalletAccruedRewards(rewards) {
    return rewards.reduce((acc, reward)=>{
        const foundReward = acc.find((r)=>r.tokenId === reward.tokenId);
        return foundReward ? acc.map((r)=>r.tokenId === reward.tokenId ? {
                tokenId: reward.tokenId,
                amount: (0, _core.BNFixed)((0, _core.BNify)(r.amount).plus((0, _core.BNify)(reward.amount))),
                amountUSD: (0, _core.BNFixed)((0, _core.BNify)(r.amountUSD).plus((0, _core.BNify)(reward.amountUSD))),
                APR: (0, _core.BNify)(r.APR).plus(reward.APR).div(2).toNumber(),
                percentage: (0, _core.BNify)(r.percentage).plus(reward.percentage).toNumber()
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
function getWalletAggregatedPerformance(currentPerformance, lastPerformance) {
    if (!lastPerformance || (0, _core.BNlte)(currentPerformance.age) || (0, _core.BNlte)(currentPerformance.poolSharePercentage)) {
        return initWalletPerformance(currentPerformance);
    }
    // Current age of the wallet
    const age = lastPerformance.age + currentPerformance.age;
    // Calculated earnings
    const earningsToken = (0, _core.BNify)(lastPerformance.earnings.token).plus(currentPerformance.earnings.token || 0);
    const earningsUSD = (0, _core.BNify)(lastPerformance.earnings.USD).plus(currentPerformance.earnings.USD);
    const earningsPercentage = (0, _core.BNify)(lastPerformance.earnings.percentage).plus(currentPerformance.earnings.percentage).toNumber();
    const earnings = {
        token: (0, _core.BNFixed)(earningsToken),
        USD: (0, _core.BNFixed)(earningsUSD),
        percentage: earningsPercentage
    };
    const realizedAPY = (0, _core.BNify)(lastPerformance.realizedAPY).times(lastPerformance.age).plus((0, _core.BNify)(currentPerformance.realizedAPY).times(currentPerformance.age)).div(age).toNumber();
    const poolSharePercentage = (lastPerformance == null ? void 0 : lastPerformance.poolSharePercentage) ? (0, _core.BNify)(lastPerformance.poolSharePercentage).times(lastPerformance.age).plus((0, _core.BNify)(currentPerformance.poolSharePercentage).times(currentPerformance.age)).div(age) : (0, _core.BNify)(currentPerformance.poolSharePercentage);
    return initWalletPerformance({
        age,
        earnings,
        realizedAPY,
        poolSharePercentage: poolSharePercentage ? poolSharePercentage.toNumber() : 0
    });
}
function getWalletPoolsTokens(vault, token, walletBlock, vaultBlock) {
    const positionTokens = (walletBlock.pools || []).reduce((acc, walletPool)=>{
        var _vault_pools, _vaultBlock_pools, _walletPool_tokens, _walletPool_tokens1;
        const vaultPool = (_vault_pools = vault.pools) == null ? void 0 : _vault_pools.find((p)=>(0, _core.compLower)(p.address, walletPool.address));
        const vaultBlockPool = (_vaultBlock_pools = vaultBlock.pools) == null ? void 0 : _vaultBlock_pools.find((p)=>(0, _core.compLower)(p.address, walletPool.address));
        if (!vaultPool || !vaultBlockPool) {
            return acc;
        }
        const tokenAddress = ((_walletPool_tokens = walletPool.tokens) == null ? void 0 : _walletPool_tokens[0].tokenAddress) || token.address;
        const tokenId = ((_walletPool_tokens1 = walletPool.tokens) == null ? void 0 : _walletPool_tokens1[0].tokenId) || token._id;
        const tokens = (0, _walletblocks.makeWalletPoolTokensData)(vaultPool, vaultBlockPool, walletPool, vaultBlock.pools || [], walletBlock.pools || []);
        const amount = (0, _core.BNFixed)(tokens.filter((t)=>t.tokenId === tokenId).reduce((sum, t)=>sum.plus(t.balance), (0, _core.BNify)(0)));
        if ((0, _core.BNlte)(amount)) {
            return acc;
        }
        const USD = (0, _walletblocks.getWalletBlockPoolTokenBalanceUSD)(vault, token, vaultBlock, tokenId, amount);
        return [
            ...acc,
            {
                pool: vaultPool.ref,
                protocol: walletPool.protocol,
                endDate: vaultPool.endDate,
                walletId: walletBlock.walletId,
                operatorId: walletPool.operatorId,
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
        const amount = (0, _core.BNFixed)((_walletBlock_paretoDollar = walletBlock.paretoDollar) == null ? void 0 : _walletBlock_paretoDollar.uspBalance);
        const USD = (0, _core.BNFixed)((0, _tokens.fixAmount)(amount, 18).times(1e6));
        positionTokens.push({
            walletId: walletBlock.walletId,
            tokenId: vault.tokenId,
            tokenAddress: token.address,
            amount,
            USD,
            percentage: 0
        });
    }
    return positionTokens.filter((t)=>(0, _core.BNgt)(t.amount));
}
function getPendleWalletPositionTokens(vault, token, walletBlock, timestamp) {
    const { byRef } = (0, _walletblocks.getPendleWalletBalanceByRef)(vault.pools || [], walletBlock.pools || [], token._id, timestamp || walletBlock.block.timestamp, {
        includeYT: false,
        activeOnly: false
    });
    const positionTokens = [];
    byRef.forEach((balance, ref)=>{
        var _vault_pools;
        if ((0, _core.BNlte)(balance)) {
            return;
        }
        // Find the pool group for this ref
        const refPools = ((_vault_pools = vault.pools) == null ? void 0 : _vault_pools.filter((p)=>p.ref === ref)) || [];
        const lpPool = refPools.find((p)=>p.protocol === 'PendleLP');
        if (!lpPool) {
            return;
        }
        const amount = (0, _core.BNFixed)(balance);
        // Note: For USD calculation, we need vaultBlock but it's not available here
        // This function should be called with vaultBlock available in the calling context
        const USD = '0' // Will be calculated in the calling context
        ;
        positionTokens.push({
            pool: ref,
            protocol: 'PendleLP',
            endDate: lpPool.endDate,
            walletId: walletBlock.walletId,
            operatorId: lpPool.operatorId,
            tokenId: token._id,
            tokenAddress: token.address,
            amount,
            USD,
            percentage: 0
        });
    });
    return positionTokens;
}

//# sourceMappingURL=wallet-performances-block.lib.js.map