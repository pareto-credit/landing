"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sortChains", {
    enumerable: true,
    get: function() {
        return sortChains;
    }
});
const _lodash = require("lodash");
const _chainconst = require("../chain.const");
function sortChains(chains) {
    return (0, _lodash.sortBy)(chains, (c)=>_chainconst.CHAINS_ORDER.indexOf(c.hex));
}

//# sourceMappingURL=chains.lib.js.map