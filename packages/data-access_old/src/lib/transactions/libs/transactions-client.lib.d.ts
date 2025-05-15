import { Axios } from 'axios';
import { Transaction, TransactionData, TransactionsClientModel, TransactionsSearchQuery } from '../transaction.model';
import { ApiEntity } from '../../core';
export declare class TransactionsClient extends ApiEntity implements TransactionsClientModel {
    constructor(axios: Axios);
    /**
     * Create a vault epoch
     * @param body - the vault epoch data
     * @returns the promise for create a new vault epoch
     */
    create(body: TransactionData): Promise<Transaction>;
    /**
     * Search epochs by params
     * @param searchParams - the vault epochs search params
     * @returns the promise for search epochs
     */
    search(searchParams?: TransactionsSearchQuery): Promise<import("../../core").Page<Transaction>>;
    /**
     * Search all epoch by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: TransactionsSearchQuery): Promise<import("../../core").Page<Transaction>>;
    /**
     * List epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    list(searchParams?: TransactionsSearchQuery): Promise<Transaction[]>;
    /**
     * List all epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    listAll(searchParams?: TransactionsSearchQuery): Promise<Transaction[]>;
    /**
     * Find an epoch by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    findOne(searchParams?: TransactionsSearchQuery): Promise<Transaction | undefined>;
}
