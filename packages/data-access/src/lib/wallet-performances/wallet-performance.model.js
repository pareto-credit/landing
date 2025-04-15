import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sBlock, sClientEntity, sPageSearchQuery, sPercentage, sReward, sStringId } from '../core';
import { WALLET_PERFORMANCES_ROUTES_KEY } from './wallet-performance.const';
import { sWalletBlockDistributedRewards } from '../wallet-blocks';
export function sWalletPerformance(isPartial) {
    return S.object().id('#walletPerformance').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sWalletPerformanceData(isPartial));
}
export function sWalletPerformanceData(isPartial) {
    return S.object().additionalProperties(false).prop('walletId', sStringId()).prop('walletBlockId', sStringId()).prop('vaultId', sStringId()).prop('block', sBlock()).required(isPartial ? [] : [
        'walletId',
        'walletBlockId',
        'vaultId',
        'block'
    ]).extend(sWalletBlockPerformance(isPartial));
}
export function sWalletPositionAggregated() {
    return S.object().additionalProperties(false).prop('vaultIds', S.array().items(sStringId())).required().prop('operators', S.array().items(sWalletPositionOperator())).required().prop('chains', S.array().items(sWalletPositionChain())).required().prop('tokens', S.array().items(sWalletPositionToken())).required().prop('deposits', sWalletBlockAmounts()).description("The user's deposits.").required().prop('redeemable', sWalletBlockAmounts()).description("The user's redeemable amounts.").required().extend(sWalletBlockPerformance());
}
export function sWalletPositionToken() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).required().prop('tokenAddress', sBCAddress()).required().prop('amount', sBigInt()).required().prop('USD', sBigInt()).required().prop('percentage', S.number()).required();
}
export function sWalletPositionChain() {
    return S.object().additionalProperties(false).prop('chainId', sStringId()).required().prop('USD', sBigInt()).required().prop('percentage', S.number()).required();
}
export function sWalletPositionOperator() {
    return S.object().additionalProperties(false).prop('operatorId', sStringId()).required().prop('USD', sBigInt()).required().prop('percentage', S.number()).required();
}
export function sWalletDistributedRewards() {
    return S.object().additionalProperties(false).prop('block', sBlock()).required().prop('APR', S.number()).required().prop('percentage', S.number()).required().extend(sWalletBlockDistributedRewards());
}
export function sWalletVaultBalance() {
    return S.object().additionalProperties(false).prop('block', sBlock()).required().prop('balance', sBigInt()).description('The balance of the wallet in the vault.').required().prop('tokenBalance', sBigInt()).description('The current token balance of the wallet.').required();
}
export function sWalletPosition() {
    return S.object().additionalProperties(false).prop('vaultId', sStringId()).required().prop('chainId', sStringId()).required().prop('tokenId', sStringId()).required().prop('vaultAddress', sBCAddress()).required().prop('tokenAddress', sBCAddress()).required().prop('vaultPrice', sBigInt()).description('The current vault price').required().prop('avgPrice', sBigInt()).description("The user's avg buy price.").required().prop('deposits', sWalletBlockAmounts()).description("The user's deposits.").required().prop('redeemable', sWalletBlockAmounts()).description("The user's redeemable amounts.").required().prop('balances', S.array().items(sWalletVaultBalance())).description("The user's redeemable amounts.").extend(sWalletBlockPerformance());
}
export function sWalletBlockPerformance(isPartial) {
    return S.object().additionalProperties(false).prop('age', S.number()).prop('earnings', sWalletBlockEarnings()).description("The user's earnings.").prop('realizedAPY', S.number()).description("The user's APY realized.").prop('poolSharePercentage', sPercentage()).description('The pool share percentage of the user.').prop('accruedRewards', S.array().items(sReward())).description('The accrued rewards of the user.').prop('collectedRewards', S.array().items(sReward())).description('The collected rewards of the user.')// Backward-compatible
    .prop('balance', sBigInt()).description('The balance of the wallet in the vault.').prop('tokenBalance', sBigInt()).description('The current token balance of the wallet.').required(isPartial ? [] : [
        'age',
        'earnings',
        'realizedAPY',
        'poolSharePercentage'
    ]);
}
export function sWalletBlockAmounts() {
    return S.object().additionalProperties(false).prop('USD', sBigInt()).description("The wallet's earnings in USD.").required().prop('token', sBigInt()).description("The wallet's earnings in underlying tokens.").prop('vault', sBigInt()).description("The wallet's earnings in vault tokens.");
}
export function sWalletBlockEarnings() {
    return S.object().additionalProperties(false).prop('percentage', S.number()).description("The wallet's percentage earnings.").required().prop('rewards', sWalletBlockEarningsRewards()).description("The user's rewards earnings.").extend(sWalletBlockAmounts());
}
export function sWalletBlockEarningsRewards() {
    return S.object().additionalProperties(false).prop('USD', sBigInt()).description("The wallet's rewards USD earnings.").required().prop('percentage', S.number()).description("The wallet's rewards percentage earnings.").required();
}
export var WalletPerformanceErrorCodes;
(function(WalletPerformanceErrorCodes) {
    WalletPerformanceErrorCodes["alreadyExists"] = "WALLET_PERFORMANCE_ALREADY_EXISTS";
    WalletPerformanceErrorCodes["rewardProgramNotFound"] = "WALLET_PERFORMANCE_REWARD_PROGRAM_NOT_FOUND";
})(WalletPerformanceErrorCodes || (WalletPerformanceErrorCodes = {}));
export const WALLET_PERFORMANCE_FIELDS = [
    '_id',
    'walletId',
    'walletBlockId',
    'vaultId',
    'block',
    'age',
    'earnings',
    'realizedAPY',
    'poolSharePercentage',
    'accruedRewards',
    'collectedRewards',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const WALLET_PERFORMANCE_SORT_FIELDS = [
    'block',
    'timestamp'
];
export function sWalletPerformancesSearchQuery() {
    return S.object().additionalProperties(false).prop('walletId', S.array().minItems(1).maxItems(200).items(sStringId())).description('Wallet IDs of the performance that must match.').prop('vaultId', S.array().minItems(1).maxItems(200).items(sStringId())).description('Vault IDs of the performance that must match.').prop('walletBlockId', S.array().minItems(1).maxItems(200).items(sStringId())).description('Wallet block IDs of the performance that must match.').prop('timestamp:gte', S.number()).description('Start timestamp of the performance.').prop('timestamp:lte', S.number()).description('End timestamp of the performance.').extend(sPageSearchQuery(WALLET_PERFORMANCE_FIELDS, WALLET_PERFORMANCE_SORT_FIELDS));
}
export var WalletPerformanceRoutes;
(function(WalletPerformanceRoutes) {
    WalletPerformanceRoutes[WalletPerformanceRoutes["v1Create"] = `v1/${WALLET_PERFORMANCES_ROUTES_KEY}`] = "v1Create";
    WalletPerformanceRoutes[WalletPerformanceRoutes["v1Delete"] = `v1/${WALLET_PERFORMANCES_ROUTES_KEY}/:walletPerformanceId`] = "v1Delete";
    WalletPerformanceRoutes[WalletPerformanceRoutes["v1Read"] = `v1/${WALLET_PERFORMANCES_ROUTES_KEY}/:walletPerformanceId`] = "v1Read";
    WalletPerformanceRoutes[WalletPerformanceRoutes["v1Update"] = `v1/${WALLET_PERFORMANCES_ROUTES_KEY}/:walletPerformanceId`] = "v1Update";
    WalletPerformanceRoutes[WalletPerformanceRoutes["v1Search"] = `v1/${WALLET_PERFORMANCES_ROUTES_KEY}`] = "v1Search";
})(WalletPerformanceRoutes || (WalletPerformanceRoutes = {}));

//# sourceMappingURL=wallet-performance.model.js.map