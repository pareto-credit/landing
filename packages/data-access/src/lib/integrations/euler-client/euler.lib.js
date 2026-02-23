"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getEulerSubAccounts", {
    enumerable: true,
    get: function() {
        return getEulerSubAccounts;
    }
});
const _ethers = require("ethers");
function getSubAccount(owner, id) {
    const ownerBytes = _ethers.utils.arrayify(owner);
    if (ownerBytes.length !== 20) {
        throw new Error(`getSubAccount: Address malformed (${owner})`);
    }
    const result = ownerBytes.slice();
    result[19] = result[19] ^ id;
    return _ethers.utils.getAddress(_ethers.utils.hexlify(result));
}
function getEulerSubAccounts(owner) {
    return Array.from({
        length: 256
    }, (_, id)=>{
        const subAccount = getSubAccount(owner, id);
        return subAccount;
    });
}

//# sourceMappingURL=euler.lib.js.map