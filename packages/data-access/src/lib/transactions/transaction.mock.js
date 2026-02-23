"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransactionMock", {
    enumerable: true,
    get: function() {
        return TransactionMock;
    }
});
const _core = require("../core");
function TransactionMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'TRANSACTION_ID',
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || 'VAULT_ADDRESS',
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        walletAddress: (options == null ? void 0 : options.walletAddress) || 'WALLET_ADDRESS',
        type: (options == null ? void 0 : options.type) || 'DEPOSIT',
        hash: (options == null ? void 0 : options.hash) || 'TRANSACTION_HASH',
        block: (0, _core.BlockMock)(options == null ? void 0 : options.block),
        amount: (options == null ? void 0 : options.amount) || '0',
        tokenAmount: (options == null ? void 0 : options.tokenAmount) || '0',
        price: (options == null ? void 0 : options.price) || '0',
        input: options == null ? void 0 : options.input,
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=transaction.mock.js.map