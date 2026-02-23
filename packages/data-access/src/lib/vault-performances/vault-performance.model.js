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
    VAULT_PERFORMANCE_FIELDS: function() {
        return VAULT_PERFORMANCE_FIELDS;
    },
    VAULT_PERFORMANCE_SORT_FIELDS: function() {
        return VAULT_PERFORMANCE_SORT_FIELDS;
    },
    VaultPerformanceErrorCodes: function() {
        return VaultPerformanceErrorCodes;
    },
    VaultPerformanceRoutes: function() {
        return VaultPerformanceRoutes;
    },
    sVaultBlockPerformance: function() {
        return sVaultBlockPerformance;
    },
    sVaultBlockPerformanceEarnings: function() {
        return sVaultBlockPerformanceEarnings;
    },
    sVaultPerformance: function() {
        return sVaultPerformance;
    },
    sVaultPerformanceData: function() {
        return sVaultPerformanceData;
    },
    sVaultPerformancesSearchQuery: function() {
        return sVaultPerformancesSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _vaultperformanceconst = require("./vault-performance.const");
function sVaultPerformance(isPartial) {
    return _fluentjsonschema.default.object().id('#vaultPerformance').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sVaultPerformanceData(isPartial));
}
function sVaultPerformanceData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).prop('vaultBlockId', (0, _core.sStringId)()).prop('block', (0, _core.sBlock)()).required(isPartial ? [] : [
        'vaultId',
        'vaultBlockId',
        'block'
    ]).extend(sVaultBlockPerformance(isPartial));
}
function sVaultBlockPerformance(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('age', _fluentjsonschema.default.number()).description('The age of the block performance in seconds.').prop('holders', _fluentjsonschema.default.number()).description("The vault's holders number.").prop('realizedAPY', _fluentjsonschema.default.number()).description("The vault's realized APY.").prop('accruedRewards', _fluentjsonschema.default.array().items((0, _core.sReward)())).description('The accrued rewards of the vault.').prop('earnings', sVaultBlockPerformanceEarnings()).description("The vault's earnings.").required(isPartial ? [] : [
        'age',
        'holders',
        'realizedAPY',
        'accruedRewards',
        'earnings'
    ]);
}
function sVaultBlockPerformanceEarnings() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('USD', (0, _core.sBigInt)()).required().prop('token', (0, _core.sBigInt)()).required().prop('percentage', _fluentjsonschema.default.number()).required();
}
var VaultPerformanceErrorCodes;
(function(VaultPerformanceErrorCodes) {
    VaultPerformanceErrorCodes["alreadyExists"] = "VAULT_PERFORMANCE_ALREADY_EXISTS";
})(VaultPerformanceErrorCodes || (VaultPerformanceErrorCodes = {}));
const VAULT_PERFORMANCE_FIELDS = [
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
const VAULT_PERFORMANCE_SORT_FIELDS = [
    '_id'
];
function sVaultPerformancesSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('Vault IDs of the performance that must match.').prop('vaultBlockId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('Vault block IDs of the performance that must match.').extend((0, _core.sPageSearchQuery)(VAULT_PERFORMANCE_FIELDS, VAULT_PERFORMANCE_SORT_FIELDS));
}
var VaultPerformanceRoutes;
(function(VaultPerformanceRoutes) {
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Create"] = `v1/${_vaultperformanceconst.VAULT_PERFORMANCES_ROUTES_KEY}`] = "v1Create";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Delete"] = `v1/${_vaultperformanceconst.VAULT_PERFORMANCES_ROUTES_KEY}/:vaultPerformanceId`] = "v1Delete";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Read"] = `v1/${_vaultperformanceconst.VAULT_PERFORMANCES_ROUTES_KEY}/:vaultPerformanceId`] = "v1Read";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Update"] = `v1/${_vaultperformanceconst.VAULT_PERFORMANCES_ROUTES_KEY}/:vaultPerformanceId`] = "v1Update";
    VaultPerformanceRoutes[VaultPerformanceRoutes["v1Search"] = `v1/${_vaultperformanceconst.VAULT_PERFORMANCES_ROUTES_KEY}`] = "v1Search";
})(VaultPerformanceRoutes || (VaultPerformanceRoutes = {}));

//# sourceMappingURL=vault-performance.model.js.map