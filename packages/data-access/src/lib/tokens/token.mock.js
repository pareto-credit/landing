"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokenMock", {
    enumerable: true,
    get: function() {
        return TokenMock;
    }
});
function TokenMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'TOKEN_ID',
        name: (options == null ? void 0 : options.name) || 'TOKEN_NAME',
        address: (options == null ? void 0 : options.address) || 'TOKEN_ADDRESS',
        symbol: (options == null ? void 0 : options.symbol) || 'SYMB',
        decimals: (options == null ? void 0 : options.decimals) || 18,
        chainId: (options == null ? void 0 : options.chainId) || '',
        oracle: options == null ? void 0 : options.oracle,
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=token.mock.js.map