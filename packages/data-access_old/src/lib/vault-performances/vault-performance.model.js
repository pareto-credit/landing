import S from 'fluent-json-schema';
import { sBigInt, sBlock, sClientEntity, sPageSearchQuery, sReward, sStringId } from '../core';
import { VAULT_PERFORMANCES_ROUTES_KEY } from './vault-performance.const';
export function sVaultPerformance(isPartial) {
    return S.object().id('#vaultPerformance').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sVaultPerformanceData(isPartial));
}
export function sVaultPerformanceData(isPartial) {
    return S.object().additionalProperties(false).prop('vaultId', sStringId()).prop('vaultBlockId', sStringId()).prop('block', sBlock()).required(isPartial ? [] : [
        'vaultId',
        'vaultBlockId',
        'block'
    ]).extend(sVaultBlockPerformance(isPartial));
}
export function sVaultBlockPerformance(isPartial) {
    return S.object().additionalProperties(false).prop('age', S.number()).description('The age of the block performance in seconds.').prop('holders', S.number()).description("The vault's holders number.").prop('realizedAPY', S.number()).description("The vault's realized APY.").prop('accruedRewards', S.array().items(sReward())).description('The accrued rewards of the vault.').prop('earnings', sVaultBlockPerformanceEarnings()).description("The vault's earnings.").required(isPartial ? [] : [
        'age',
        'holders',
        'realizedAPY',
        'accruedRewards',
        'earnings'
    ]);
}
export function sVaultBlockPerformanceEarnings() {
    return S.object().additionalProperties(false).prop('USD', sBigInt()).required().prop('token', sBigInt()).required().prop('percentage', S.number()).required();
}
export var VaultPerformanceErrorCodes;
(function(VaultPerformanceErrorCodes) {
    VaultPerformanceErrorCodes["alreadyExists"] = "VAULT_PERFORMANCE_ALREADY_EXISTS";
})(VaultPerformanceErrorCodes || (VaultPerformanceErrorCodes = {}));
export const VAULT_PERFORMANCE_FIELDS = [
    '_id',
    'vaultId',
    'vaultBlockId',
    'block',
    'age',
    'holders',
    'realizedAPY',
    'accruedRewards',
    'earnings',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const VAULT_PERFORMANCE_SORT_FIELDS = [
    '_id'
];
export function sVaultPerformancesSearchQuery() {
    return S.object().additionalProperties(false).prop('vaultId', S.array().minItems(1).maxItems(200).items(sStringId())).description('Vault IDs of the performance that must match.').prop('vaultBlockId', S.array().minItems(1).maxItems(200).items(sStringId())).description('Vault block IDs of the performance that must match.').extend(sPageSearchQuery(VAULT_PERFORMANCE_FIELDS, VAULT_PERFORMANCE_SORT_FIELDS));
}
export var VaultPerformanceRoutes;
(function(VaultPerformanceRoutes) {
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Create"] = `v1/${VAULT_PERFORMANCES_ROUTES_KEY}`] = "v1Create";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Delete"] = `v1/${VAULT_PERFORMANCES_ROUTES_KEY}/:vaultPerformanceId`] = "v1Delete";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Read"] = `v1/${VAULT_PERFORMANCES_ROUTES_KEY}/:vaultPerformanceId`] = "v1Read";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Update"] = `v1/${VAULT_PERFORMANCES_ROUTES_KEY}/:vaultPerformanceId`] = "v1Update";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Search"] = `v1/${VAULT_PERFORMANCES_ROUTES_KEY}`] = "v1Search";
})(VaultPerformanceRoutes || (VaultPerformanceRoutes = {}));

//# sourceMappingURL=vault-performance.model.js.map