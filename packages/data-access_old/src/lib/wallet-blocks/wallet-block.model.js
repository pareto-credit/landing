import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sBlock, sClientEntity, sPageSearchQuery, sStringId } from '../core';
import { WALLET_BLOCKS_ROUTES_KEY } from './wallet-block.const';
export function sWalletBlock(isPartial) {
    return S.object().id('#walletBlock').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sWalletBlockData(isPartial));
}
export function sWalletBlockData(isPartial) {
    return S.object().additionalProperties(false).prop('walletId', sStringId()).description('The IDentifier of the wallet.').prop('walletAddress', sBCAddress()).description('The blockchain address of the wallet.').prop('vaultId', sStringId()).description('The IDentifier of the vault.').prop('vaultAddress', sBCAddress()).description('The blockchain address vault.').prop('block', sBlock()).description('The block number.').required(isPartial ? [] : [
        'walletId',
        'walletAddress',
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sWalletBlockBody(isPartial));
}
export function sWalletBlockBody(isPartial) {
    return S.object().additionalProperties(false).prop('balance', sBigInt()).description('The balance of the wallet in the vault.').prop('tokenBalance', sBigInt()).description('The current token balance of the wallet.').prop('distributedRewards', S.array().items(sWalletBlockDistributedRewards())).description('List of distributed rewards for the wallet')// Deprecated
    .prop('current', S.object().additionalProperties(true)).prop('aggregated', S.object().additionalProperties(true)).required(isPartial ? [] : [
        'balance',
        'tokenBalance'
    ]);
}
export function sWalletBlockDistributedRewards() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).required().prop('tokenAddress', sBCAddress()).required().prop('amount', S.string()).required().prop('amountUSD', S.string()).required();
}
export var WalletBlockErrorCodes;
(function(WalletBlockErrorCodes) {
    WalletBlockErrorCodes["alreadyExists"] = "WALLET_BLOCK_ALREADY_EXISTS";
})(WalletBlockErrorCodes || (WalletBlockErrorCodes = {}));
export var WalletBlockRoutes;
(function(WalletBlockRoutes) {
    WalletBlockRoutes[WalletBlockRoutes["v1Create"] = `v1/${WALLET_BLOCKS_ROUTES_KEY}`] = "v1Create";
    WalletBlockRoutes[WalletBlockRoutes["v1Delete"] = `v1/${WALLET_BLOCKS_ROUTES_KEY}/:walletBlockId`] = "v1Delete";
    WalletBlockRoutes[WalletBlockRoutes["v1Read"] = `v1/${WALLET_BLOCKS_ROUTES_KEY}/:walletBlockId`] = "v1Read";
    WalletBlockRoutes[WalletBlockRoutes["v1Update"] = `v1/${WALLET_BLOCKS_ROUTES_KEY}/:walletBlockId`] = "v1Update";
    WalletBlockRoutes[WalletBlockRoutes["v1Search"] = `v1/${WALLET_BLOCKS_ROUTES_KEY}`] = "v1Search";
})(WalletBlockRoutes || (WalletBlockRoutes = {}));
export const WALLET_BLOCK_FIELDS = [
    '_id',
    'walletId',
    'walletAddress',
    'vaultId',
    'vaultAddress',
    'block',
    'balance',
    'tokenBalance'
];
export const WALLET_BLOCK_SORT_FIELDS = [
    'balance',
    'timestamp'
];
export function sWalletBlocksSearchQuery() {
    return S.object().additionalProperties(false).prop('walletId', sStringId()).description('The wallet IDentifier').prop('walletAddress', sBCAddress()).description('The wallet blockchain address').prop('vaultId', sStringId()).description('The vault IDentifier').prop('vaultAddress', sBCAddress()).description('The vault blockchain address').prop('balance:gt', S.string()).description('The wallet minimum balance').prop('timestamp:gte', S.number()).description('Start timestamp of the wallet block.').prop('timestamp:lte', S.number()).description('End timestamp of the wallet block.').extend(sPageSearchQuery(WALLET_BLOCK_FIELDS, WALLET_BLOCK_SORT_FIELDS));
}

//# sourceMappingURL=wallet-block.model.js.map