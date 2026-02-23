"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultRewardMock", {
    enumerable: true,
    get: function() {
        return VaultRewardMock;
    }
});
const _core = require("../core");
const _web3client = require("../web3-client");
function VaultRewardMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_REWARD_ID',
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || _web3client.WEB3_DEFAULT_ADDR,
        block: (0, _core.BlockMock)(options == null ? void 0 : options.block),
        type: (options == null ? void 0 : options.type) || 'PARETO_TOKEN_CLAIM',
        status: 'PENDING',
        walletAddress: (options == null ? void 0 : options.walletAddress) || _web3client.WEB3_DEFAULT_ADDR,
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        amount: (options == null ? void 0 : options.amount) || '0',
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=vault-reward.mock.js.map