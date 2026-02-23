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
    VaultBlockEarningsMock: function() {
        return VaultBlockEarningsMock;
    },
    VaultBlockPerformanceMock: function() {
        return VaultBlockPerformanceMock;
    },
    VaultPerformanceMock: function() {
        return VaultPerformanceMock;
    }
});
const _core = require("../core");
function VaultPerformanceMock(options) {
    var _options_accruedRewards;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_PERFORMANCE_ID',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultBlockId: (options == null ? void 0 : options.vaultBlockId) || 'VAULT_BLOCK_ID',
        block: (0, _core.BlockMock)(options == null ? void 0 : options.block),
        age: (options == null ? void 0 : options.age) || 0,
        holders: (options == null ? void 0 : options.holders) || 0,
        realizedAPY: (options == null ? void 0 : options.realizedAPY) || 0,
        earnings: VaultBlockEarningsMock(options == null ? void 0 : options.earnings),
        accruedRewards: options == null ? void 0 : (_options_accruedRewards = options.accruedRewards) == null ? void 0 : _options_accruedRewards.map((a)=>(0, _core.RewardMock)(a)),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
function VaultBlockEarningsMock(options) {
    return {
        token: (options == null ? void 0 : options.token) || '0',
        USD: (options == null ? void 0 : options.USD) || '0',
        percentage: (options == null ? void 0 : options.percentage) || 0
    };
}
function VaultBlockPerformanceMock(options) {
    var _options_accruedRewards;
    return {
        age: (options == null ? void 0 : options.age) || 0,
        holders: (options == null ? void 0 : options.holders) || 0,
        realizedAPY: (options == null ? void 0 : options.realizedAPY) || 0,
        earnings: VaultBlockEarningsMock(options == null ? void 0 : options.earnings),
        accruedRewards: options == null ? void 0 : (_options_accruedRewards = options.accruedRewards) == null ? void 0 : _options_accruedRewards.map((a)=>(0, _core.RewardMock)(a))
    };
}

//# sourceMappingURL=vault-performance.mock.js.map