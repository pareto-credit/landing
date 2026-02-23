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
    VAULT_REQUEST_FIELDS: function() {
        return VAULT_REQUEST_FIELDS;
    },
    VAULT_REQUEST_SORT_FIELDS: function() {
        return VAULT_REQUEST_SORT_FIELDS;
    },
    VaultRequestErrorCodes: function() {
        return VaultRequestErrorCodes;
    },
    VaultRequestsRoutes: function() {
        return VaultRequestsRoutes;
    },
    sVaultRequest: function() {
        return sVaultRequest;
    },
    sVaultRequestStatus: function() {
        return sVaultRequestStatus;
    },
    sVaultRequestType: function() {
        return sVaultRequestType;
    },
    sVaultRequestsSearchQuery: function() {
        return sVaultRequestsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _vaultrequestconst = require("./vault-request.const");
function sVaultRequestType() {
    return _fluentjsonschema.default.string().enum([
        'DEPOSIT',
        'WITHDRAW',
        'REDEEM',
        'WRITEOFF'
    ]);
}
function sVaultRequestStatus() {
    return _fluentjsonschema.default.string().enum([
        'PENDING',
        'PROCESSED',
        'CLAIMABLE',
        'INSTANT_CLAIMABLE',
        'CLAIMED',
        'FULFILLED',
        'COMPLETED'
    ]);
}
function sVaultRequest(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).prop('vaultAddress', (0, _core.sBCAddress)()).prop('block', (0, _core.sBlock)()).prop('type', sVaultRequestType()).prop('amount', (0, _core.sBigInt)()).prop('lpAmount', (0, _core.sBigInt)()).prop('requestedOn', (0, _core.sDateString)()).prop('completedOn', (0, _core.sDateString)()).prop('walletId', (0, _core.sStringId)()).prop('walletAddress', (0, _core.sBCAddress)()).prop('status', sVaultRequestStatus()).prop('epochNumber', _fluentjsonschema.default.number()).prop('isInstant', _fluentjsonschema.default.boolean()).required(isPartial ? [] : [
        'vaultId',
        'vaultAddress',
        'block',
        'type',
        'amount',
        'requestedOn',
        'walletId',
        'walletAddress',
        'status'
    ]);
}
const VAULT_REQUEST_FIELDS = [
    '_id',
    'vaultId',
    'vaultAddress',
    'walletId',
    'walletAddress',
    'requestedOn',
    'status',
    'type',
    'amount',
    'lpAmount',
    'block',
    'epochNumber',
    'isInstant'
];
const VAULT_REQUEST_SORT_FIELDS = [
    'requestedOn',
    'block.number'
];
var VaultRequestErrorCodes;
(function(VaultRequestErrorCodes) {
    VaultRequestErrorCodes["notMatching"] = "VAULT_REQUEST_NOT_MATCHING";
    VaultRequestErrorCodes["notClaimable"] = "VAULT_REQUEST_NOT_CLAIMABLE";
    VaultRequestErrorCodes["epochNumber"] = "VAULT_REQUEST_INVALID_EPOCH_NUMBER";
    VaultRequestErrorCodes["wrongStatus"] = "VAULT_REQUEST_WRONG_STATUS";
    VaultRequestErrorCodes["wrongType"] = "VAULT_REQUEST_WRONG_TYPE";
    VaultRequestErrorCodes["transactionNotFound"] = "VAULT_REQUEST_TRANSACTION_NOT_FOUND";
    VaultRequestErrorCodes["writeOffAmounts"] = "VAULT_REQUEST_WRITEOFF_AMOUNTS";
})(VaultRequestErrorCodes || (VaultRequestErrorCodes = {}));
function sVaultRequestsSearchQuery() {
    return _fluentjsonschema.default.object().prop('vaultId', _fluentjsonschema.default.array().items((0, _core.sStringId)()).minItems(1).maxItems(200)).prop('vaultAddress', _fluentjsonschema.default.array().items((0, _core.sBCAddress)()).minItems(1).maxItems(200)).prop('walletAddress', _fluentjsonschema.default.array().items((0, _core.sBCAddress)()).minItems(1).maxItems(200)).prop('walletId', _fluentjsonschema.default.array().items((0, _core.sStringId)()).minItems(1).maxItems(200)).prop('status', _fluentjsonschema.default.array().items(sVaultRequestStatus())).prop('type', _fluentjsonschema.default.array().items(sVaultRequestType())).extend((0, _core.sPageSearchQuery)(VAULT_REQUEST_FIELDS, VAULT_REQUEST_SORT_FIELDS));
}
var VaultRequestsRoutes;
(function(VaultRequestsRoutes) {
    VaultRequestsRoutes[VaultRequestsRoutes["v1Search"] = `v1/${_vaultrequestconst.VAULT_REQUESTS_ROUTES_KEY}`] = "v1Search";
})(VaultRequestsRoutes || (VaultRequestsRoutes = {}));

//# sourceMappingURL=vault-request.model.js.map