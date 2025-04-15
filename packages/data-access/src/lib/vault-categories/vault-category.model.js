import S from 'fluent-json-schema';
import { sClientEntity, sLocales, sPageSearchQuery } from '../core';
import { VAULT_CATEGORIES_ROUTES_KEY } from './vault-category.const';
export function sVaultCategory(isPartial) {
    return S.object().id('#vaultCategory').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sVaultCategoryData(isPartial));
}
export function sVaultCategoryData(isPartial) {
    return S.object().additionalProperties(false).prop('code', S.string()).prop('name', sLocales()).prop('description', sLocales()).required(isPartial ? [] : [
        'code',
        'name'
    ]);
}
export var VaultCategoryErrorCodes;
(function(VaultCategoryErrorCodes) {
    VaultCategoryErrorCodes["collision"] = "VAULT_CATEGORY_COLLISION";
    VaultCategoryErrorCodes["notFound"] = "VAULT_CATEGORY_NOT_FOUND";
    VaultCategoryErrorCodes["notDeletable"] = "VAULT_CATEGORY_NOT_DELETABLE";
    VaultCategoryErrorCodes["alreadyExists"] = "VAULT_CATEGORY_ALREADY_EXISTS";
})(VaultCategoryErrorCodes || (VaultCategoryErrorCodes = {}));
export const VAULT_CATEGORY_FIELDS = [
    '_id',
    'code',
    'name',
    'description',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const VAULT_CATEGORY_SORT_FIELDS = [
    '_id',
    'code'
];
export function sVaultCategoriesSearchSchema() {
    return S.object().additionalProperties(false).description('List of vault type IDs.').prop('code', S.string()).description('Code of the vault type that must match.').prop('code:ct', S.string()).description('Code of the vault type that must be contained.').extend(sPageSearchQuery(VAULT_CATEGORY_FIELDS, VAULT_CATEGORY_SORT_FIELDS));
}
export var VaultCategoryRoutes;
(function(VaultCategoryRoutes) {
    VaultCategoryRoutes[VaultCategoryRoutes["v1Create"] = `v1/${VAULT_CATEGORIES_ROUTES_KEY}`] = "v1Create";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Delete"] = `v1/${VAULT_CATEGORIES_ROUTES_KEY}/:typeId`] = "v1Delete";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Read"] = `v1/${VAULT_CATEGORIES_ROUTES_KEY}/:typeId`] = "v1Read";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Update"] = `v1/${VAULT_CATEGORIES_ROUTES_KEY}/:typeId`] = "v1Update";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Search"] = `v1/${VAULT_CATEGORIES_ROUTES_KEY}`] = "v1Search";
})(VaultCategoryRoutes || (VaultCategoryRoutes = {}));

//# sourceMappingURL=vault-category.model.js.map