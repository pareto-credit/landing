import S from 'fluent-json-schema';
import { VAULT_TYPES_ROUTES_KEY } from './vault-type.const';
import { sClientEntity, sLocales, sPageSearchQuery } from '../core';
export function sVaultType(isPartial) {
    return S.object().id('#vaultType').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sVaultTypeData(isPartial));
}
export function sVaultTypeData(isPartial) {
    return S.object().additionalProperties(false).prop('code', S.string()).prop('name', sLocales()).prop('description', sLocales()).required(isPartial ? [] : [
        'code',
        'name'
    ]);
}
export var VaultTypeErrorCodes;
(function(VaultTypeErrorCodes) {
    VaultTypeErrorCodes["collision"] = "VAULT_TYPE_COLLISION";
    VaultTypeErrorCodes["notFound"] = "VAULT_TYPE_NOT_FOUND";
    VaultTypeErrorCodes["notDeletable"] = "VAULT_TYPE_NOT_DELETABLE";
    VaultTypeErrorCodes["alreadyExists"] = "VAULT_TYPE_ALREADY_EXISTS";
})(VaultTypeErrorCodes || (VaultTypeErrorCodes = {}));
export const VAULT_TYPE_FIELDS = [
    '_id',
    'code',
    'name',
    'description',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const VAULT_TYPE_SORT_FIELDS = [
    'code'
];
// Route schema
export function sVaultTypesSearchSchema() {
    return S.object().additionalProperties(false).description('List of vault type IDs.').prop('code', S.string()).description('Code of the vault type that must match.').prop('code:ct', S.string()).description('Code of the vault type that must be contained.').extend(sPageSearchQuery(VAULT_TYPE_FIELDS, VAULT_TYPE_SORT_FIELDS));
}
export var VaultTypeRoutes;
(function(VaultTypeRoutes) {
    VaultTypeRoutes[VaultTypeRoutes["v1Create"] = `v1/${VAULT_TYPES_ROUTES_KEY}`] = "v1Create";
    VaultTypeRoutes[VaultTypeRoutes["v1Delete"] = `v1/${VAULT_TYPES_ROUTES_KEY}/:typeId`] = "v1Delete";
    VaultTypeRoutes[VaultTypeRoutes["v1Read"] = `v1/${VAULT_TYPES_ROUTES_KEY}/:typeId`] = "v1Read";
    VaultTypeRoutes[VaultTypeRoutes["v1Update"] = `v1/${VAULT_TYPES_ROUTES_KEY}/:typeId`] = "v1Update";
    VaultTypeRoutes[VaultTypeRoutes["v1Search"] = `v1/${VAULT_TYPES_ROUTES_KEY}`] = "v1Search";
})(VaultTypeRoutes || (VaultTypeRoutes = {}));

//# sourceMappingURL=vault-type.model.js.map