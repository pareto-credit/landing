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
    VAULT_TYPE_FIELDS: function() {
        return VAULT_TYPE_FIELDS;
    },
    VAULT_TYPE_SORT_FIELDS: function() {
        return VAULT_TYPE_SORT_FIELDS;
    },
    VaultTypeErrorCodes: function() {
        return VaultTypeErrorCodes;
    },
    VaultTypeRoutes: function() {
        return VaultTypeRoutes;
    },
    sVaultType: function() {
        return sVaultType;
    },
    sVaultTypeData: function() {
        return sVaultTypeData;
    },
    sVaultTypesSearchSchema: function() {
        return sVaultTypesSearchSchema;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _vaulttypeconst = require("./vault-type.const");
const _core = require("../core");
function sVaultType(isPartial) {
    return _fluentjsonschema.default.object().id('#vaultType').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sVaultTypeData(isPartial));
}
function sVaultTypeData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).prop('name', (0, _core.sLocales)()).prop('description', (0, _core.sLocales)()).required(isPartial ? [] : [
        'code',
        'name'
    ]);
}
var VaultTypeErrorCodes;
(function(VaultTypeErrorCodes) {
    VaultTypeErrorCodes["collision"] = "VAULT_TYPE_COLLISION";
    VaultTypeErrorCodes["notFound"] = "VAULT_TYPE_NOT_FOUND";
    VaultTypeErrorCodes["notDeletable"] = "VAULT_TYPE_NOT_DELETABLE";
    VaultTypeErrorCodes["alreadyExists"] = "VAULT_TYPE_ALREADY_EXISTS";
})(VaultTypeErrorCodes || (VaultTypeErrorCodes = {}));
const VAULT_TYPE_FIELDS = [
    '_id',
    'code',
    'name',
    'description',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const VAULT_TYPE_SORT_FIELDS = [
    'code'
];
function sVaultTypesSearchSchema() {
    return _fluentjsonschema.default.object().additionalProperties(false).description('List of vault type IDs.').prop('code', _fluentjsonschema.default.string()).description('Code of the vault type that must match.').prop('code:ct', _fluentjsonschema.default.string()).description('Code of the vault type that must be contained.').extend((0, _core.sPageSearchQuery)(VAULT_TYPE_FIELDS, VAULT_TYPE_SORT_FIELDS));
}
var VaultTypeRoutes;
(function(VaultTypeRoutes) {
    VaultTypeRoutes[VaultTypeRoutes["v1Create"] = `v1/${_vaulttypeconst.VAULT_TYPES_ROUTES_KEY}`] = "v1Create";
    VaultTypeRoutes[VaultTypeRoutes["v1Delete"] = `v1/${_vaulttypeconst.VAULT_TYPES_ROUTES_KEY}/:typeId`] = "v1Delete";
    VaultTypeRoutes[VaultTypeRoutes["v1Read"] = `v1/${_vaulttypeconst.VAULT_TYPES_ROUTES_KEY}/:typeId`] = "v1Read";
    VaultTypeRoutes[VaultTypeRoutes["v1Update"] = `v1/${_vaulttypeconst.VAULT_TYPES_ROUTES_KEY}/:typeId`] = "v1Update";
    VaultTypeRoutes[VaultTypeRoutes["v1Search"] = `v1/${_vaulttypeconst.VAULT_TYPES_ROUTES_KEY}`] = "v1Search";
})(VaultTypeRoutes || (VaultTypeRoutes = {}));

//# sourceMappingURL=vault-type.model.js.map