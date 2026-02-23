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
    ChainMock: function() {
        return ChainMock;
    },
    ChainRPCMock: function() {
        return ChainRPCMock;
    }
});
function ChainMock(options) {
    var _options_RPCs;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'CHAIN_ID',
        chainID: (options == null ? void 0 : options.chainID) || 0,
        name: (options == null ? void 0 : options.name) || 'CHAIN_NAME',
        hex: (options == null ? void 0 : options.hex) || 'CHAIN_HEX',
        blocksPerYear: (options == null ? void 0 : options.blocksPerYear) || 0,
        tokenSymbol: options == null ? void 0 : options.tokenSymbol,
        RPCs: (options == null ? void 0 : options.RPCs) ? options == null ? void 0 : (_options_RPCs = options.RPCs) == null ? void 0 : _options_RPCs.map((rpc)=>ChainRPCMock(rpc)) : [],
        createdAt: (options == null ? void 0 : options.createdAt) || now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: (options == null ? void 0 : options.updatedAt) || now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
function ChainRPCMock(options) {
    return {
        name: (options == null ? void 0 : options.name) || 'RPC_NAME',
        https: (options == null ? void 0 : options.https) || 'RPC_HTTPS',
        wss: (options == null ? void 0 : options.wss) || 'RPC_WSS',
        provider: (options == null ? void 0 : options.provider) || 'ALCHEMY',
        isPublic: options == null ? void 0 : options.isPublic
    };
}

//# sourceMappingURL=chain.mock.js.map