"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getWalletBlocksKeys", {
    enumerable: true,
    get: function() {
        return getWalletBlocksKeys;
    }
});
const _lodash = require("lodash");
function getWalletBlocksKeys(walletBlocks, key) {
    return (0, _lodash.uniq)(walletBlocks.filter((w)=>!!w[key]).map((w)=>w[key]));
}

//# sourceMappingURL=wallet-blocks-utils.lib.js.map