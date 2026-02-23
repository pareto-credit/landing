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
    WALLET_PERFORMANCE: function() {
        return WALLET_PERFORMANCE;
    },
    WALLET_PERFORMANCES_ROUTES_KEY: function() {
        return WALLET_PERFORMANCES_ROUTES_KEY;
    },
    WALLET_PORTFOLIO: function() {
        return WALLET_PORTFOLIO;
    },
    WALLET_POSITION: function() {
        return WALLET_POSITION;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const WALLET_PERFORMANCES_ROUTES_KEY = 'wallet-performances';
const WALLET_PERFORMANCE = {
    startBlock: {
        number: 0,
        timestamp: 0
    },
    endBlock: {
        number: 0,
        timestamp: 0
    },
    age: 0,
    earnings: {
        USD: '0',
        token: '0',
        percentage: 0,
        rewards: {
            USD: '0',
            percentage: 0
        }
    },
    fees: {
        USD: '0',
        token: '0'
    },
    realizedAPY: 0,
    rewardsRealizedAPY: 0,
    poolSharePercentage: 0,
    accruedRewards: [],
    collectedRewards: []
};
const WALLET_PORTFOLIO = _extends._({
    deposits: {
        USD: '0'
    },
    redeemable: {
        USD: '0'
    },
    pendingDeposits: {
        USD: '0'
    },
    pendingWithdraws: {
        USD: '0'
    },
    chains: [],
    tokens: [],
    vaultIds: [],
    operators: []
}, WALLET_PERFORMANCE);
const WALLET_POSITION = _extends._({
    block: {
        number: 0,
        timestamp: 0
    },
    walletId: '',
    walletAddress: '',
    tokenId: '',
    chainId: '',
    vaultId: '',
    vaultAddress: '',
    tokenAddress: '',
    avgPrice: '0',
    vaultPrice: '0',
    deposits: {
        USD: '0'
    },
    redeemable: {
        USD: '0'
    },
    pendingDeposits: {
        USD: '0'
    },
    pendingWithdraws: {
        USD: '0'
    },
    balances: []
}, WALLET_PERFORMANCE);

//# sourceMappingURL=wallet-performance.const.js.map