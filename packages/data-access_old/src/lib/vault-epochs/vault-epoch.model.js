import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sBlock, sClientEntity, sDateString, sPageSearchQuery, sStringId } from '../core';
import { sVaultTvl } from '../vault-blocks';
import { VAULT_EPOCHS_ROUTES_KEY } from './vault-epoch.const';
export function sVaultEpoch(isPartial) {
    return S.object().id('#vaultEpoch').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sVaultEpochData(isPartial));
}
export function sVaultEpochData(isPartial) {
    return S.object().additionalProperties(false).prop('vaultId', sStringId()).prop('vaultAddress', sBCAddress()).prop('block', sBlock()).required(isPartial ? [] : [
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sVaultEpochBody(isPartial));
}
export function sVaultEpochBody(isPartial) {
    return S.object().prop('APRs', sVaultEpochAPRs()).prop('APYs', sVaultEpochAPYs()).prop('totalSupply', sBigInt()).prop('price', sBigInt()).prop('TVL', sVaultTvl()).prop('creditExtended', sVaultCreditExtended()).prop('expectedInterest', sBigInt()).prop('unclaimedFees', sBigInt()).prop('deposits', sBigInt()).prop('duration', S.number()).prop('status', sVaultEpochStatus()).prop('withdrawType', sVaultEpochWithdrawType()).prop('count', S.number()).prop('bufferDuration', S.number()).prop('startDate', S.string()).prop('endDate', S.string()).prop('withdraws', sVaultEpochWithdraws()).prop('depositQueue', sVaultEpochQueue()).prop('withdrawQueue', sVaultEpochQueue()).prop('instantWithdraws', sVaultEpochInstantWithdraws()).required(isPartial ? [] : [
        'APRs',
        'totalSupply',
        'price',
        'TVL',
        'expectedInterest',
        'unclaimedFees',
        'deposits',
        'duration',
        'status',
        'withdrawType',
        'count',
        'bufferDuration'
    ]);
}
export function sVaultCreditExtended() {
    return S.object().additionalProperties(false).prop('token', sBigInt()).required().prop('USD', sBigInt()).required();
}
export function sVaultEpochWithdrawType() {
    return S.string().enum([
        'INSTANT',
        'STANDARD'
    ]);
}
export function sVaultEpochAPYs() {
    return S.object().additionalProperties(false).prop('GROSS', S.number()).required().prop('NET', S.number()).required().prop('FEE', S.number()).required();
}
export function sVaultEpochAPRs() {
    return S.object().additionalProperties(false).prop('EPOCH', S.number()).required().prop('BUFFER', S.number()).required().prop('CURE', S.number()).prop('GROSS', S.number()).required().prop('NET', S.number()).required().prop('DELTA', S.number()).required();
}
export function sVaultEpochStatus() {
    return S.string().enum([
        'WAITING',
        'RUNNING',
        'DEFAULTED',
        'FINISHED',
        'CURE'
    ]);
}
export function sVaultEpochQueue() {
    return S.object().additionalProperties(false).prop('amount', sBigInt()).required().prop('status', sVaultEpochQueueStatus()).required();
}
export function sVaultEpochQueueStatus() {
    return S.string().enum([
        'PENDING',
        'PROCESSED'
    ]);
}
export function sVaultEpochWithdraws() {
    return S.object().additionalProperties(false).prop('amount', sBigInt()).required().prop('fees', sBigInt()).required();
}
export function sVaultEpochInstantWithdraws() {
    return S.object().additionalProperties(false).prop('amount', sBigInt()).required().prop('delay', S.number()).required().prop('aprDelta', S.number()).required().prop('allowed', S.boolean()).required().prop('deadline', S.string());
}
export const VAULT_EPOCH_FIELDS = [
    '_id',
    'block',
    'APRs',
    'TVL',
    'totalSupply',
    'price',
    'deposits',
    'duration',
    'bufferDuration',
    'unclaimedFees',
    'expectedInterest',
    'startDate',
    'endDate',
    'count',
    'status',
    'withdrawType',
    'depositQueue',
    'withdrawQueue',
    'withdraws',
    'instantWithdraws',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const VAULT_EPOCH_SORT_FIELDS = [
    '_id',
    'count',
    'timestamp'
];
export function sVaultEpochsSearchQuery() {
    return S.object().additionalProperties(false).prop('vaultId', S.array().minItems(1).maxItems(200).items(sStringId())).description('The vault IDentifier').prop('vaultAddress', S.array().minItems(1).maxItems(200).items(sBCAddress())).description('The vault blockchain address').prop('count', S.number()).description('The epoch number that must match').prop('count:lt', S.number()).description('The epoch number less then').prop('count:lte', S.number()).description('The epoch number less or equal than').prop('count:gt', S.number()).description('The epoch number greater than').prop('count:gte', S.number()).description('The epoch number greater or equal than').prop('timestamp:gte', S.number()).description('The epoch block timestamp greater or equal than').prop('timestamp:lte', S.number()).description('The epoch block timestamp less or equal than').prop('startDate', sDateString()).description('The epoch start date equal than').prop('startDate:lt', sDateString()).description('The epoch start date less than').prop('startDate:lte', sDateString()).description('The epoch start date less or equal than').prop('startDate:gt', sDateString()).description('The epoch start date greater than').prop('startDate:gte', sDateString()).description('The epoch start date greater or equal than').prop('endDate', sDateString()).description('The epoch end date equal than').prop('endDate:lt', sDateString()).description('The epoch start date equal than').prop('endDate:lte', sDateString()).description('The epoch start date equal than').prop('endDate:gt', sDateString()).description('The epoch start date equal than').prop('endDate:gte', sDateString()).description('The epoch start date equal than').prop('status', sVaultEpochStatus()).description('The status that must match').extend(sPageSearchQuery(VAULT_EPOCH_FIELDS, VAULT_EPOCH_SORT_FIELDS));
}
export var VaultEpochRoutes;
(function(VaultEpochRoutes) {
    VaultEpochRoutes[VaultEpochRoutes["v1Create"] = `v1/${VAULT_EPOCHS_ROUTES_KEY}`] = "v1Create";
    VaultEpochRoutes[VaultEpochRoutes["v1Delete"] = `v1/${VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId`] = "v1Delete";
    VaultEpochRoutes[VaultEpochRoutes["v1Read"] = `v1/${VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId`] = "v1Read";
    VaultEpochRoutes[VaultEpochRoutes["v1Update"] = `v1/${VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId`] = "v1Update";
    VaultEpochRoutes[VaultEpochRoutes["v1Search"] = `v1/${VAULT_EPOCHS_ROUTES_KEY}`] = "v1Search";
})(VaultEpochRoutes || (VaultEpochRoutes = {}));

//# sourceMappingURL=vault-epoch.model.js.map