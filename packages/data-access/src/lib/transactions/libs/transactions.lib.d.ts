import { Bytes, HexString, Transaction } from 'web3';
/**
 * Extract method signature from transaction input field
 * @param transaction web3 transaction
 * @returns transaction method signature
 */
export declare function getTransactionMethodSignature(transaction: Transaction): Bytes | undefined;
/**
 * Extract input string from transaction considering SAFE
 * @param transaction web3 transaction
 * @returns transaction input hex string
 */
export declare function getTransactionInputString(transaction: Transaction): HexString | undefined;
/**
 * Check whether the transaction is from SAFE
 * @param transaction web3 transaction
 * @returns true | false
 */
export declare function isSafeTransaction(transaction: Transaction): boolean;
/**
 * Decode SAFE transaction input and get data
 * @param transaction web3 transaction
 * @returns SAFE transaction input hex string
 */
export declare function getTransactionInputData(transaction: Transaction): HexString | undefined;
