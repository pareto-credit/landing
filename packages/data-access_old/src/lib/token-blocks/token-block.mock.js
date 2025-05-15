import { BlockMock } from '../core';
/**
 * Token Block Mock
 */ export function TokenBlockMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'TOKEN_BLOCK_ID',
        block: BlockMock(options == null ? void 0 : options.block),
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        tokenAddress: (options == null ? void 0 : options.tokenAddress) || 'TOKEN_ADDRESS',
        price: (options == null ? void 0 : options.price) || '1',
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=token-block.mock.js.map