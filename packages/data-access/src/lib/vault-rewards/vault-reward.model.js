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
    VAULT_REWARD_FIELDS: function() {
        return VAULT_REWARD_FIELDS;
    },
    VAULT_REWARD_SORT_FIELDS: function() {
        return VAULT_REWARD_SORT_FIELDS;
    },
    VaultRewardRoutes: function() {
        return VaultRewardRoutes;
    },
    sVaultReward: function() {
        return sVaultReward;
    },
    sVaultRewardData: function() {
        return sVaultRewardData;
    },
    sVaultRewardStatus: function() {
        return sVaultRewardStatus;
    },
    sVaultRewardType: function() {
        return sVaultRewardType;
    },
    sVaultRewardsSearchQuery: function() {
        return sVaultRewardsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _vaultrewardconst = require("./vault-reward.const");
function sVaultReward(isPartial) {
    return _fluentjsonschema.default.object().id('#vaultReward').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sVaultRewardData(isPartial));
}
function sVaultRewardData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenId', (0, _core.sStringId)()).prop('vaultId', (0, _core.sStringId)()).prop('vaultAddress', (0, _core.sBCAddress)()).prop('block', (0, _core.sBlock)()).prop('type', sVaultRewardType()).prop('walletId', (0, _core.sStringId)()).prop('walletAddress', (0, _core.sBCAddress)()).prop('status', sVaultRewardStatus()).prop('amount', (0, _core.sBigInt)()).required(isPartial ? [] : [
        'tokenId',
        'vaultId',
        'vaultAddress',
        'block',
        'type',
        'walletId',
        'walletAddress',
        'status',
        'amount'
    ]);
}
function sVaultRewardType() {
    return _fluentjsonschema.default.string().enum([
        'PARETO_TOKEN_CLAIM',
        'PARETO_TOKEN_REWARD'
    ]);
}
function sVaultRewardStatus() {
    return _fluentjsonschema.default.string().enum([
        'PENDING',
        'CLAIMED'
    ]);
}
const VAULT_REWARD_FIELDS = [
    '_id',
    'vaultId',
    'vaultAddress',
    'walletId',
    'walletAddress',
    'status',
    'type',
    'amount',
    'block'
];
const VAULT_REWARD_SORT_FIELDS = [
    'block.number'
];
function sVaultRewardsSearchQuery() {
    return _fluentjsonschema.default.object().prop('vaultId', _fluentjsonschema.default.array().items((0, _core.sStringId)()).minItems(1).maxItems(200)).prop('vaultAddress', _fluentjsonschema.default.array().items((0, _core.sBCAddress)()).minItems(1).maxItems(200)).prop('walletAddress', _fluentjsonschema.default.array().items((0, _core.sBCAddress)()).minItems(1).maxItems(200)).prop('walletId', _fluentjsonschema.default.array().items((0, _core.sStringId)()).minItems(1).maxItems(200)).prop('status', _fluentjsonschema.default.array().items(sVaultRewardStatus())).prop('type', _fluentjsonschema.default.array().items(sVaultRewardType())).extend((0, _core.sPageSearchQuery)(VAULT_REWARD_FIELDS, VAULT_REWARD_SORT_FIELDS));
}
var VaultRewardRoutes;
(function(VaultRewardRoutes) {
    VaultRewardRoutes[VaultRewardRoutes["v1Search"] = `v1/${_vaultrewardconst.VAULT_REWARDS_ROUTES_KEY}`] = "v1Search";
})(VaultRewardRoutes || (VaultRewardRoutes = {}));

//# sourceMappingURL=vault-reward.model.js.map