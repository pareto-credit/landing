import { decodeAbiParameters } from '../../core';
/**
 * Extract method signature from transaction input field
 * @param transaction web3 transaction
 * @returns transaction method signature
 */ export function getTransactionMethodSignature(transaction) {
    const inputString = getTransactionInputData(transaction);
    return String(inputString == null ? void 0 : inputString.slice(0, 10));
}
/**
 * Extract input string from transaction considering SAFE
 * @param transaction web3 transaction
 * @returns transaction input hex string
 */ export function getTransactionInputString(transaction) {
    const inputString = getTransactionInputData(transaction);
    return String(inputString == null ? void 0 : inputString.slice(10));
}
/**
 * Check whether the transaction is from SAFE
 * @param transaction web3 transaction
 * @returns true | false
 */ export function isSafeTransaction(transaction) {
    var _transaction_input;
    return ((_transaction_input = transaction.input) == null ? void 0 : _transaction_input.slice(0, 10)) === '0x6a761202';
}
/**
 * Decode SAFE transaction input and get data
 * @param transaction web3 transaction
 * @returns SAFE transaction input hex string
 */ export function getTransactionInputData(transaction) {
    var _transaction_input;
    const isSafe = isSafeTransaction(transaction);
    if (!isSafe) {
        return String(transaction.input);
    }
    const hexString = (_transaction_input = transaction.input) == null ? void 0 : _transaction_input.slice(10);
    if (!hexString) {
        return;
    }
    const inputParams = decodeAbiParameters([
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