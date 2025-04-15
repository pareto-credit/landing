import { _ as _extends } from "@swc/helpers/_/_extends";
export const WALLET_PERFORMANCES_ROUTES_KEY = 'wallet-performances';
/**
 * Wallet performance initial state
 */ export const WALLET_PERFORMANCE = {
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
    realizedAPY: 0,
    poolSharePercentage: 0,
    accruedRewards: [],
    collectedRewards: []
};
/**
 * Wallet position aggregated initial state
 */ export const WALLET_PORTFOLIO = _extends({
    deposits: {
        USD: '0'
    },
    redeemable: {
        USD: '0'
    },
    chains: [],
    tokens: [],
    vaultIds: [],
    operators: []
}, WALLET_PERFORMANCE);
export const WALLET_POSITION = _extends({
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
    balances: []
}, WALLET_PERFORMANCE);

//# sourceMappingURL=wallet-performance.const.js.map