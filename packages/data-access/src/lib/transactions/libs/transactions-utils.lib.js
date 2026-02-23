"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getTransactionsKeys", {
    enumerable: true,
    get: function() {
        return getTransactionsKeys;
    }
});
const _lodash = require("lodash");
function getTransactionsKeys(transactions, key) {
    return (0, _lodash.uniq)(transactions.filter((t)=>!!t[key]).map((t)=>t[key]));
}

//# sourceMappingURL=transactions-utils.lib.js.map