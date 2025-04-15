import { BlockMock } from '../core/utility.mock';
/**
 * WalletBlock Mock
 */ export function WalletBlockMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'WALLET_BLOCK_ID',
        block: BlockMock(options == null ? void 0 : options.block),
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        walletAddress: (options == null ? void 0 : options.walletAddress) || 'WALLET_ADDRESS',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || 'VAULT_ADDRESS',
        balance: (options == null ? void 0 : options.balance) || '0',
        tokenBalance: (options == null ? void 0 : options.tokenBalance) || '0',
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=wallet-block.mock.js.map