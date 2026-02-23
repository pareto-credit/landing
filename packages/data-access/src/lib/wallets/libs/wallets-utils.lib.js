"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getWalletsKeys", {
    enumerable: true,
    get: function() {
        return getWalletsKeys;
    }
});
const _lodash = require("lodash");
function getWalletsKeys(wallets, key) {
    return (0, _lodash.uniq)(wallets.filter((t)=>!!t[key]).map((t)=>t[key]));
}

//# sourceMappingURL=wallets-utils.lib.js.map