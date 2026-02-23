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
    getTransactionInputData: function() {
        return getTransactionInputData;
    },
    getTransactionInputString: function() {
        return getTransactionInputString;
    },
    getTransactionMethodSignature: function() {
        return getTransactionMethodSignature;
    },
    isSafeTransaction: function() {
        return isSafeTransaction;
    }
});
const _core = require("../../core");
function getTransactionMethodSignature(transaction) {
    const inputString = getTransactionInputData(transaction);
    return String(inputString == null ? void 0 : inputString.slice(0, 10));
}
function getTransactionInputString(transaction) {
    const inputString = getTransactionInputData(transaction);
    return String(inputString == null ? void 0 : inputString.slice(10));
}
function isSafeTransaction(transaction) {
    var _transaction_input;
    return ((_transaction_input = transaction.input) == null ? void 0 : _transaction_input.slice(0, 10)) === '0x6a761202';
}
function getTransactionInputData(transaction) {
    var _transaction_input;
    const isSafe = isSafeTransaction(transaction);
    if (!isSafe) {
        return String(transaction.input);
    }
    const hexString = (_transaction_input = transaction.input) == null ? void 0 : _transaction_input.slice(10);
    if (!hexString) {
        return;
    }
    const inputParams = (0, _core.decodeAbiParameters)([
        'address',
        'uint256',
        'bytes',
        'uint8',
        'uint256',
        'uint256',
        'uint256',
        'address',
        'address',
        'bytes'
    ], hexString);
    return String(inputParams[2]);
}

//# sourceMappingURL=transactions.lib.js.map