import { Transaction } from '../transaction.model';
/**
 * Get transactions uniq keys
 * @param transactions - the transactions array
 * @returns the array keys
 */
export declare function getTransactionsKeys<T = string>(transactions: Transaction[], key: keyof Transaction): T[];
