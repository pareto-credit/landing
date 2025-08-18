import { BlockMock, RewardMock } from '../core';
import { WEB3_DEFAULT_ADDR } from '../web3-client';
/**
 * Wallet Performance Mock
 */ export function WalletPerformanceMock(options) {
    var _options_accruedRewards, _options_collectedRewards;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'WALLET_PERFORMANCE_ID',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || WEB3_DEFAULT_ADDR,
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        walletAddress: (options == null ? void 0 : options.walletAddress) || WEB3_DEFAULT_ADDR,
        block: BlockMock(options == null ? void 0 : options.block),
        age: (options == null ? void 0 : options.age) || 0,
        earnings: WalletBlockEarningsMock(options == null ? void 0 : options.earnings),
        fees: WalletBlockAmountsMock(options == null ? void 0 : options.fees),
        realizedAPY: (options == null ? void 0 : options.realizedAPY) || 0,
        rewardsRealizedAPY: (options == null ? void 0 : options.rewardsRealizedAPY) || 0,
        poolSharePercentage: (options == null ? void 0 : options.poolSharePercentage) || 0,
        accruedRewards: options == null ? void 0 : (_options_accruedRewards = options.accruedRewards) == null ? void 0 : _options_accruedRewards.map((a)=>RewardMock(a)),
        collectedRewards: options == null ? void 0 : (_options_collectedRewards = options.collectedRewards) == null ? void 0 : _options_collectedRewards.map((c)=>RewardMock(c)),
        deposits: WalletBlockAmountsMock(options == null ? void 0 : options.deposits),
        redeemable: WalletBlockAmountsMock(options == null ? void 0 : options.redeemable),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
export function WalletBlockPerformanceMock(options) {
    var _options_accruedRewards, _options_collectedRewards;
    return {
        age: (options == null ? void 0 : options.age) || 0,
        earnings: WalletBlockEarningsMock(options == null ? void 0 : options.earnings),
        fees: WalletBlockAmountsMock(options == null ? void 0 : options.fees),
        realizedAPY: (options == null ? void 0 : options.realizedAPY) || 0,
        rewardsRealizedAPY: (options == null ? void 0 : options.rewardsRealizedAPY) || 0,
        poolSharePercentage: (options == null ? void 0 : options.poolSharePercentage) || 0,
        accruedRewards: options == null ? void 0 : (_options_accruedRewards = options.accruedRewards) == null ? void 0 : _options_accruedRewards.map((a)=>RewardMock(a)),
        collectedRewards: options == null ? void 0 : (_options_collectedRewards = options.collectedRewards) == null ? void 0 : _options_collectedRewards.map((c)=>RewardMock(c))
    };
}
export function WalletBlockAmountsMock(options) {
    return {
        token: (options == null ? void 0 : options.token) || '0',
        USD: (options == null ? void 0 : options.USD) || '0'
    };
}
export function WalletBlockEarningsMock(options) {
    return {
        token: (options == null ? void 0 : options.token) || '0',
        USD: (options == null ? void 0 : options.USD) || '0',
        percentage: (options == null ? void 0 : options.percentage) || 0,
        rewards: WalletBlockEarningsRewardsMock(options == null ? void 0 : options.rewards)
    };
}
export function WalletBlockEarningsRewardsMock(options) {
    return {
        USD: (options == null ? void 0 : options.USD) || '0',
        percentage: (options == null ? void 0 : options.percentage) || 0
    };
}

//# sourceMappingURL=wallet-performance.mock.js.map