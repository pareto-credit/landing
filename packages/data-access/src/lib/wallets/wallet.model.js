import S from 'fluent-json-schema';
import { WALLETS_ROUTES_KEY } from './wallet.const';
import { sBCAddress, sClientEntity, sStringId, sHexString, sPageSearchQuery, sEmail, sDateString } from '../core';
import { sVaultsSearchQuery } from '../vaults';
export function sWallet(isPartial) {
    return S.object().id('#wallet').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sWalletData(isPartial));
}
export function sWalletData(isPartial) {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).required(isPartial ? [] : [
        'address'
    ]).extend(sWalletBody());
}
export function sWalletBody() {
    return S.object().additionalProperties(false).prop('userId', sStringId()).prop('ens', S.string()).prop('referralCode', S.string().minLength(6).maxLength(12)).prop('signatures', S.array().items(sWalletSignature())).prop('campaigns', S.array().items(sWalletCampaign())).prop('affiliates', S.array().items(sWalletAffiliate())).prop('referred', S.array().items(sWalletReferred()));
}
export function sWalletUserBody() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('User name').prop('email', sEmail()).description('User email').prop('telegram', S.string()).description('User telegram profile');
}
export function sWalletSignature() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().prop('hash', sHexString()).required().prop('signedOn', sDateString()).required();
}
export function sWalletCampaign() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().prop('referralCode', S.string()).required().prop('activatedOn', sDateString()).required();
}
export function sWalletAffiliate() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().prop('address', sBCAddress()).required().prop('activatedOn', sDateString()).required();
}
export function sWalletReferred() {
    return S.object().additionalProperties(false).prop('referralCode', S.string().minLength(6).maxLength(12)).required().extend(sWalletAffiliate());
}
export function sWalletPortfolioQuery() {
    S.object().additionalProperties(false).extend(sVaultsSearchQuery()).extend(sWalletPortfolioFilters());
}
export function sWalletPortfolioFilters() {
    return S.object().additionalProperties(false).prop('vaultId', S.array().minItems(1).maxItems(200).items(sStringId())).description('VaultID that must match').prop('block:gte', S.number()).description('Start block').prop('block:lte', S.number()).description('End Block').prop('timestamp:hte', S.number()).description('Start timestamp').prop('timestamp:lte', S.number()).description('End timestamp');
}
export var WalletErrorCodes;
(function(WalletErrorCodes) {
    WalletErrorCodes["vaultsMissing"] = "VAULT_IDS_MISSING";
    WalletErrorCodes["alreadyExists"] = "WALLET_ALREADY_EXISTS";
    WalletErrorCodes["notDeletable"] = "WALLET_NOT_DELETABLE";
    WalletErrorCodes["malformed"] = "WALLET_ADDRESS_MALFORMED";
    WalletErrorCodes["notFound"] = "WALLET_NOT_FOUND";
})(WalletErrorCodes || (WalletErrorCodes = {}));
export var WalletRoutes;
(function(WalletRoutes) {
    WalletRoutes[WalletRoutes["v1Create"] = `v1/${WALLETS_ROUTES_KEY}`] = "v1Create";
    WalletRoutes[WalletRoutes["v1Delete"] = `v1/${WALLETS_ROUTES_KEY}/:walletId`] = "v1Delete";
    WalletRoutes[WalletRoutes["v1Ensure"] = `v1/${WALLETS_ROUTES_KEY}/ensure`] = "v1Ensure";
    WalletRoutes[WalletRoutes["v1Perform"] = `v1/${WALLETS_ROUTES_KEY}/:walletId/perform`] = "v1Perform";
    WalletRoutes[WalletRoutes["v1Portfolio"] = `v1/${WALLETS_ROUTES_KEY}/:walletId/portfolio`] = "v1Portfolio";
    WalletRoutes[WalletRoutes["v1Read"] = `v1/${WALLETS_ROUTES_KEY}/:walletId`] = "v1Read";
    WalletRoutes[WalletRoutes["v1Referral"] = `v1/${WALLETS_ROUTES_KEY}/:walletId/referral`] = "v1Referral";
    WalletRoutes[WalletRoutes["v1Search"] = `v1/${WALLETS_ROUTES_KEY}`] = "v1Search";
    WalletRoutes[WalletRoutes["v1Update"] = `v1/${WALLETS_ROUTES_KEY}/:walletId`] = "v1Update";
    WalletRoutes[WalletRoutes["v1User"] = `v1/${WALLETS_ROUTES_KEY}/:walletId/user`] = "v1User";
    WalletRoutes[WalletRoutes["v1Vaults"] = `v1/${WALLETS_ROUTES_KEY}/:walletId/vaults`] = "v1Vaults";
})(WalletRoutes || (WalletRoutes = {}));
export const WALLET_FIELDS = [
    '_id',
    'address',
    'userId',
    'ens',
    'signatures',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const WALLET_SORT_FIELDS = [
    'address'
];
export function sWalletsSearchQuery() {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).description('Wallet blockchain address').extend(sPageSearchQuery(WALLET_FIELDS, WALLET_SORT_FIELDS));
}
export var WalletsRoutingKey;
(function(WalletsRoutingKey) {
    WalletsRoutingKey["idleEvents"] = "idle.wallet.*";
    WalletsRoutingKey["idlePerform"] = "idle.wallet.perform";
})(WalletsRoutingKey || (WalletsRoutingKey = {}));

//# sourceMappingURL=wallet.model.js.map