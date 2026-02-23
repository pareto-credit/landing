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
    WEB3_HASH_LINKS: function() {
        return WEB3_HASH_LINKS;
    },
    WEB3_MAX_TOKEN_AMOUNT: function() {
        return WEB3_MAX_TOKEN_AMOUNT;
    },
    WEB3_MIN_TOKEN_AMOUNT: function() {
        return WEB3_MIN_TOKEN_AMOUNT;
    },
    WEB3_PAYABLE_METHOD_EMPTY: function() {
        return WEB3_PAYABLE_METHOD_EMPTY;
    },
    WEB3_ZERO_ADDRESS: function() {
        return WEB3_ZERO_ADDRESS;
    }
});
const WEB3_PAYABLE_METHOD_EMPTY = {};
const WEB3_HASH_LINKS = {
    '0x1': 'https://etherscan.io',
    '0xa': 'https://optimistic.etherscan.io',
    '0x44d': 'https://polygonscan.com',
    '0x89': 'https://polygonscan.com',
    '0xa4b1': 'https://arbiscan.io',
    '0x2105': 'https://basescan.org'
};
const WEB3_MIN_TOKEN_AMOUNT = '1';
const WEB3_MAX_TOKEN_AMOUNT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const WEB3_ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

//# sourceMappingURL=web3.const.js.map