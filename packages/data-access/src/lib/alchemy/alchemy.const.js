"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ALCHEMY_CHAINS", {
    enumerable: true,
    get: function() {
        return ALCHEMY_CHAINS;
    }
});
const _alchemysdk = require("alchemy-sdk");
const ALCHEMY_CHAINS = {
    1: _alchemysdk.Network.ETH_MAINNET,
    10: _alchemysdk.Network.OPT_MAINNET,
    137: _alchemysdk.Network.MATIC_MAINNET,
    1101: _alchemysdk.Network.POLYGONZKEVM_MAINNET,
    42161: _alchemysdk.Network.ARB_MAINNET
};

//# sourceMappingURL=alchemy.const.js.map