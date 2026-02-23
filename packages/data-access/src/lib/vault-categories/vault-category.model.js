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
    VAULT_CATEGORY_FIELDS: function() {
        return VAULT_CATEGORY_FIELDS;
    },
    VAULT_CATEGORY_SORT_FIELDS: function() {
        return VAULT_CATEGORY_SORT_FIELDS;
    },
    VaultCategoryErrorCodes: function() {
        return VaultCategoryErrorCodes;
    },
    VaultCategoryRoutes: function() {
        return VaultCategoryRoutes;
    },
    sVaultCategoriesSearchSchema: function() {
        return sVaultCategoriesSearchSchema;
    },
    sVaultCategory: function() {
        return sVaultCategory;
    },
    sVaultCategoryData: function() {
        return sVaultCategoryData;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _vaultcategoryconst = require("./vault-category.const");
function sVaultCategory(isPartial) {
    return _fluentjsonschema.default.object().id('#vaultCategory').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sVaultCategoryData(isPartial));
}
function sVaultCategoryData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).prop('name', (0, _core.sLocales)()).prop('description', (0, _core.sLocales)()).required(isPartial ? [] : [
        'code',
        'name'
    ]);
}
var VaultCategoryErrorCodes;
(function(VaultCategoryErrorCodes) {
    VaultCategoryErrorCodes["collision"] = "VAULT_CATEGORY_COLLISION";
    VaultCategoryErrorCodes["notFound"] = "VAULT_CATEGORY_NOT_FOUND";
    VaultCategoryErrorCodes["notDeletable"] = "VAULT_CATEGORY_NOT_DELETABLE";
    VaultCategoryErrorCodes["alreadyExists"] = "VAULT_CATEGORY_ALREADY_EXISTS";
})(VaultCategoryErrorCodes || (VaultCategoryErrorCodes = {}));
const VAULT_CATEGORY_FIELDS = [
    '_id',
    'code',
    'name',
    'description',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const VAULT_CATEGORY_SORT_FIELDS = [
    '_id',
    'code'
];
function sVaultCategoriesSearchSchema() {
    return _fluentjsonschema.default.object().additionalProperties(false).description('List of vault type IDs.').prop('code', _fluentjsonschema.default.string()).description('Code of the vault type that must match.').prop('code:ct', _fluentjsonschema.default.string()).description('Code of the vault type that must be contained.').extend((0, _core.sPageSearchQuery)(VAULT_CATEGORY_FIELDS, VAULT_CATEGORY_SORT_FIELDS));
}
var VaultCategoryRoutes;
(function(VaultCategoryRoutes) {
    VaultCategoryRoutes[VaultCategoryRoutes["v1Create"] = `v1/${_vaultcategoryconst.VAULT_CATEGORIES_ROUTES_KEY}`] = "v1Create";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Delete"] = `v1/${_vaultcategoryconst.VAULT_CATEGORIES_ROUTES_KEY}/:typeId`] = "v1Delete";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Read"] = `v1/${_vaultcategoryconst.VAULT_CATEGORIES_ROUTES_KEY}/:typeId`] = "v1Read";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Update"] = `v1/${_vaultcategoryconst.VAULT_CATEGORIES_ROUTES_KEY}/:typeId`] = "v1Update";
    VaultCategoryRoutes[VaultCategoryRoutes["v1Search"] = `v1/${_vaultcategoryconst.VAULT_CATEGORIES_ROUTES_KEY}`] = "v1Search";
})(VaultCategoryRoutes || (VaultCategoryRoutes = {}));

//# sourceMappingURL=vault-category.model.js.map