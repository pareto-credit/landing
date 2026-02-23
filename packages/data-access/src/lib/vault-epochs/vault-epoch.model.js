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
    VAULT_EPOCH_FIELDS: function() {
        return VAULT_EPOCH_FIELDS;
    },
    VAULT_EPOCH_SORT_FIELDS: function() {
        return VAULT_EPOCH_SORT_FIELDS;
    },
    VaultEpochErrorCodes: function() {
        return VaultEpochErrorCodes;
    },
    VaultEpochRoutes: function() {
        return VaultEpochRoutes;
    },
    sVaultCreditExtended: function() {
        return sVaultCreditExtended;
    },
    sVaultEpoch: function() {
        return sVaultEpoch;
    },
    sVaultEpochAPRs: function() {
        return sVaultEpochAPRs;
    },
    sVaultEpochAPYs: function() {
        return sVaultEpochAPYs;
    },
    sVaultEpochBody: function() {
        return sVaultEpochBody;
    },
    sVaultEpochData: function() {
        return sVaultEpochData;
    },
    sVaultEpochInstantWithdraws: function() {
        return sVaultEpochInstantWithdraws;
    },
    sVaultEpochInterest: function() {
        return sVaultEpochInterest;
    },
    sVaultEpochPdfQuery: function() {
        return sVaultEpochPdfQuery;
    },
    sVaultEpochQueue: function() {
        return sVaultEpochQueue;
    },
    sVaultEpochQueueStatus: function() {
        return sVaultEpochQueueStatus;
    },
    sVaultEpochStatus: function() {
        return sVaultEpochStatus;
    },
    sVaultEpochWithdrawType: function() {
        return sVaultEpochWithdrawType;
    },
    sVaultEpochWithdraws: function() {
        return sVaultEpochWithdraws;
    },
    sVaultEpochsSearchQuery: function() {
        return sVaultEpochsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _vaultmodel = require("../vaults/vault.model");
const _vaultblocks = require("../vault-blocks");
const _vaultepochconst = require("./vault-epoch.const");
function sVaultEpoch(isPartial) {
    return _fluentjsonschema.default.object().id('#vaultEpoch').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sVaultEpochData(isPartial));
}
function sVaultEpochData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).prop('vaultAddress', (0, _core.sBCAddress)()).prop('block', (0, _core.sBlock)()).required(isPartial ? [] : [
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sVaultEpochBody(isPartial));
}
function sVaultEpochBody(isPartial) {
    return _fluentjsonschema.default.object().prop('APRs', sVaultEpochAPRs()).prop('APYs', sVaultEpochAPYs()).prop('interest', sVaultEpochInterest()).prop('totalSupply', (0, _core.sBigInt)()).prop('price', (0, _core.sBigInt)()).prop('TVL', (0, _vaultblocks.sVaultBlockTvl)()).prop('creditExtended', sVaultCreditExtended()).prop('expectedInterest', (0, _core.sBigInt)()).prop('unclaimedFees', (0, _core.sBigInt)()).prop('deposits', (0, _core.sBigInt)()).prop('duration', _fluentjsonschema.default.number()).prop('status', sVaultEpochStatus()).prop('withdrawType', sVaultEpochWithdrawType()).prop('count', _fluentjsonschema.default.number()).prop('bufferDuration', _fluentjsonschema.default.number()).prop('startDate', _fluentjsonschema.default.string()).prop('endDate', _fluentjsonschema.default.string()).prop('withdraws', sVaultEpochWithdraws()).prop('depositQueue', sVaultEpochQueue()).prop('withdrawQueue', sVaultEpochQueue()).prop('instantWithdraws', sVaultEpochInstantWithdraws()).required(isPartial ? [] : [
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
function sVaultCreditExtended() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('token', (0, _core.sBigInt)()).required().prop('USD', (0, _core.sBigInt)()).required();
}
function sVaultEpochWithdrawType() {
    return _fluentjsonschema.default.string().enum([
        'INSTANT',
        'STANDARD'
    ]);
}
function sVaultEpochAPYs() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('GROSS', _fluentjsonschema.default.number()).required().prop('NET', _fluentjsonschema.default.number()).required().prop('FEE', _fluentjsonschema.default.number()).required();
}
function sVaultEpochAPRs() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('EPOCH', _fluentjsonschema.default.number()).required().prop('BUFFER', _fluentjsonschema.default.number()).required().prop('CURE', _fluentjsonschema.default.number()).prop('GROSS', _fluentjsonschema.default.number()).required().prop('NET', _fluentjsonschema.default.number()).required().prop('DELTA', _fluentjsonschema.default.number()).required();
}
function sVaultEpochInterest() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('NET', (0, _core.sBigInt)()).required().prop('FEE', (0, _core.sBigInt)()).required().prop('GROSS', (0, _core.sBigInt)()).required();
}
function sVaultEpochStatus() {
    return _fluentjsonschema.default.string().enum([
        'WAITING',
        'RUNNING',
        'DEFAULTED',
        'FINISHED',
        'CURE'
    ]);
}
function sVaultEpochQueue() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('amount', (0, _core.sBigInt)()).required().prop('status', sVaultEpochQueueStatus()).required();
}
function sVaultEpochQueueStatus() {
    return _fluentjsonschema.default.string().enum([
        'PENDING',
        'PROCESSED'
    ]);
}
function sVaultEpochWithdraws() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('amount', (0, _core.sBigInt)()).required().prop('fees', (0, _core.sBigInt)()).required();
}
function sVaultEpochInstantWithdraws() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('amount', (0, _core.sBigInt)()).required().prop('delay', _fluentjsonschema.default.number()).required().prop('aprDelta', _fluentjsonschema.default.number()).required().prop('allowed', _fluentjsonschema.default.boolean()).required().prop('deadline', _fluentjsonschema.default.string());
}
const VAULT_EPOCH_FIELDS = [
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
const VAULT_EPOCH_SORT_FIELDS = [
    '_id',
    'count',
    'timestamp'
];
function sVaultEpochsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The vault IDentifier').prop('vaultAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The vault blockchain address').prop('count', _fluentjsonschema.default.number()).description('The epoch number that must match').prop('count:lt', _fluentjsonschema.default.number()).description('The epoch number less then').prop('count:lte', _fluentjsonschema.default.number()).description('The epoch number less or equal than').prop('count:gt', _fluentjsonschema.default.number()).description('The epoch number greater than').prop('count:gte', _fluentjsonschema.default.number()).description('The epoch number greater or equal than').prop('timestamp:gte', _fluentjsonschema.default.number()).description('The epoch block timestamp greater or equal than').prop('timestamp:lte', _fluentjsonschema.default.number()).description('The epoch block timestamp less or equal than').prop('startDate', (0, _core.sDateString)()).description('The epoch start date equal than').prop('startDate:lt', (0, _core.sDateString)()).description('The epoch start date less than').prop('startDate:lte', (0, _core.sDateString)()).description('The epoch start date less or equal than').prop('startDate:gt', (0, _core.sDateString)()).description('The epoch start date greater than').prop('startDate:gte', (0, _core.sDateString)()).description('The epoch start date greater or equal than').prop('endDate', (0, _core.sDateString)()).description('The epoch end date equal than').prop('endDate:lt', (0, _core.sDateString)()).description('The epoch start date equal than').prop('endDate:lte', (0, _core.sDateString)()).description('The epoch start date equal than').prop('endDate:gt', (0, _core.sDateString)()).description('The epoch start date equal than').prop('endDate:gte', (0, _core.sDateString)()).description('The epoch start date equal than').prop('status', sVaultEpochStatus()).description('The status that must match').extend((0, _core.sPageSearchQuery)(VAULT_EPOCH_FIELDS, VAULT_EPOCH_SORT_FIELDS));
}
function sVaultEpochPdfQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('type', (0, _vaultmodel.sVaultTemplateType)()).required().prop('output', _fluentjsonschema.default.string().enum([
        'inline',
        'download'
    ]).description('Controls if the PDF renders inline or downloads.'));
}
var VaultEpochRoutes;
(function(VaultEpochRoutes) {
    VaultEpochRoutes[VaultEpochRoutes["v1Create"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}`] = "v1Create";
    VaultEpochRoutes[VaultEpochRoutes["v1Delete"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId`] = "v1Delete";
    VaultEpochRoutes[VaultEpochRoutes["v1Read"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId`] = "v1Read";
    VaultEpochRoutes[VaultEpochRoutes["v1Update"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId`] = "v1Update";
    VaultEpochRoutes[VaultEpochRoutes["v1Search"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}`] = "v1Search";
    VaultEpochRoutes[VaultEpochRoutes["v1Holders"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId/holders`] = "v1Holders";
    VaultEpochRoutes[VaultEpochRoutes["v1Pdf"] = `v1/${_vaultepochconst.VAULT_EPOCHS_ROUTES_KEY}/:vaultEpochId/pdf`] = "v1Pdf";
})(VaultEpochRoutes || (VaultEpochRoutes = {}));
var VaultEpochErrorCodes;
(function(VaultEpochErrorCodes) {
    VaultEpochErrorCodes["cdoEpochNotFound"] = "VAULT_EPOCH_CDO_EPOCH_NOT_FOUND";
    VaultEpochErrorCodes["interestNotFound"] = "VAULT_EPOCH_INTEREST_NOT_FOUND";
})(VaultEpochErrorCodes || (VaultEpochErrorCodes = {}));

//# sourceMappingURL=vault-epoch.model.js.map