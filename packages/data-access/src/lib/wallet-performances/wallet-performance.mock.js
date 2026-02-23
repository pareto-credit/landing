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
    WalletBlockAmountsMock: function() {
        return WalletBlockAmountsMock;
    },
    WalletBlockEarningsMock: function() {
        return WalletBlockEarningsMock;
    },
    WalletBlockEarningsRewardsMock: function() {
        return WalletBlockEarningsRewardsMock;
    },
    WalletBlockPerformanceMock: function() {
        return WalletBlockPerformanceMock;
    },
    WalletPerformanceMock: function() {
        return WalletPerformanceMock;
    }
});
const _core = require("../core");
const _web3client = require("../web3-client");
function WalletPerformanceMock(options) {
    var _options_accruedRewards, _options_collectedRewards;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'WALLET_PERFORMANCE_ID',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || _web3client.WEB3_DEFAULT_ADDR,
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        walletAddress: (options == null ? void 0 : options.walletAddress) || _web3client.WEB3_DEFAULT_ADDR,
        block: (0, _core.BlockMock)(options == null ? void 0 : options.block),
        startBlock: (0, _core.BlockMock)(options == null ? void 0 : options.startBlock),
        endBlock: (0, _core.BlockMock)(options == null ? void 0 : options.endBlock),
        age: (options == null ? void 0 : options.age) || 0,
        earnings: WalletBlockEarningsMock(options == null ? void 0 : options.earnings),
        fees: WalletBlockAmountsMock(options == null ? void 0 : options.fees),
        realizedAPY: (options == null ? void 0 : options.realizedAPY) || 0,
        rewardsRealizedAPY: (options == null ? void 0 : options.rewardsRealizedAPY) || 0,
        poolSharePercentage: (options == null ? void 0 : options.poolSharePercentage) || 0,
        accruedRewards: options == null ? void 0 : (_options_accruedRewards = options.accruedRewards) == null ? void 0 : _options_accruedRewards.map((a)=>(0, _core.RewardMock)(a)),
        collectedRewards: options == null ? void 0 : (_options_collectedRewards = options.collectedRewards) == null ? void 0 : _options_collectedRewards.map((c)=>(0, _core.RewardMock)(c)),
        deposits: WalletBlockAmountsMock(options == null ? void 0 : options.deposits),
        redeemable: WalletBlockAmountsMock(options == null ? void 0 : options.redeemable),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
function WalletBlockPerformanceMock(options) {
    var _options_accruedRewards, _options_collectedRewards;
    return {
        age: (options == null ? void 0 : options.age) || 0,
        startBlock: (0, _core.BlockMock)(options == null ? void 0 : options.startBlock),
        endBlock: (0, _core.BlockMock)(options == null ? void 0 : options.endBlock),
        earnings: WalletBlockEarningsMock(options == null ? void 0 : options.earnings),
        fees: WalletBlockAmountsMock(options == null ? void 0 : options.fees),
        realizedAPY: (options == null ? void 0 : options.realizedAPY) || 0,
        rewardsRealizedAPY: (options == null ? void 0 : options.rewardsRealizedAPY) || 0,
        poolSharePercentage: (options == null ? void 0 : options.poolSharePercentage) || 0,
        accruedRewards: options == null ? void 0 : (_options_accruedRewards = options.accruedRewards) == null ? void 0 : _options_accruedRewards.map((a)=>(0, _core.RewardMock)(a)),
        collectedRewards: options == null ? void 0 : (_options_collectedRewards = options.collectedRewards) == null ? void 0 : _options_collectedRewards.map((c)=>(0, _core.RewardMock)(c))
    };
}
function WalletBlockAmountsMock(options) {
    return {
        token: (options == null ? void 0 : options.token) || '0',
        USD: (options == null ? void 0 : options.USD) || '0'
    };
}
function WalletBlockEarningsMock(options) {
    return {
        token: (options == null ? void 0 : options.token) || '0',
        USD: (options == null ? void 0 : options.USD) || '0',
        percentage: (options == null ? void 0 : options.percentage) || 0,
        rewards: WalletBlockEarningsRewardsMock(options == null ? void 0 : options.rewards)
    };
}
function WalletBlockEarningsRewardsMock(options) {
    return {
        USD: (options == null ? void 0 : options.USD) || '0',
        percentage: (options == null ? void 0 : options.percentage) || 0
    };
}

//# sourceMappingURL=wallet-performance.mock.js.map