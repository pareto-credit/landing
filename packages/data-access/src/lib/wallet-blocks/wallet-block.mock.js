import { BlockMock } from '../core/utility.mock';
import { WEB3_DEFAULT_ADDR } from '../web3-client';
/**
 * WalletBlock Mock
 */ export function WalletBlockMock(options) {
    var _options_pools;
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
        paretoDollar: WalletBlockParetoDollarMock(options == null ? void 0 : options.paretoDollar),
        pools: options == null ? void 0 : (_options_pools = options.pools) == null ? void 0 : _options_pools.map((p)=>WalletBlockPoolMock(p)),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
export function WalletBlockParetoDollarMock(options) {
    return {
        uspBalance: options == null ? void 0 : options.uspBalance,
        stakedBalance: options == null ? void 0 : options.stakedBalance
    };
}
export function WalletBlockPoolMock(options) {
    var _options_tokens;
    return {
        balance: options == null ? void 0 : options.balance,
        lpBalance: options == null ? void 0 : options.lpBalance,
        address: (options == null ? void 0 : options.address) || WEB3_DEFAULT_ADDR,
        protocol: (options == null ? void 0 : options.protocol) || 'Idle',
        operatorId: options == null ? void 0 : options.operatorId,
        tokens: options == null ? void 0 : (_options_tokens = options.tokens) == null ? void 0 : _options_tokens.map((t)=>WalletBlockPoolTokenMock(t))
    };
}
export function WalletBlockPoolTokenMock(options) {
    return {
        tokenId: options == null ? void 0 : options.tokenId,
        tokenAddress: (options == null ? void 0 : options.tokenAddress) || WEB3_DEFAULT_ADDR,
        balance: (options == null ? void 0 : options.balance) || '0',
        balanceScaled: options == null ? void 0 : options.balanceScaled
    };
}

//# sourceMappingURL=wallet-block.mock.js.map