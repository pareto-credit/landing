import { Block, ClientEntity, Page, PageSearchQuery, iBigInt } from '../core';
/**
 * Client Transaction interface
 */
export interface Transaction extends TransactionData, ClientEntity {
}
export declare function sTransaction(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface TransactionData {
    vaultId: string;
    vaultAddress: string;
    walletId: string;
    walletAddress: string;
    tokenId: string;
    type: TransactionType;
    hash: string;
    block: Block;
    amount: iBigInt;
    tokenAmount: iBigInt;
    price: iBigInt;
    input?: string;
}
export declare function sTransactionData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type TransactionType = 'DEPOSIT' | 'REDEEM' | 'HARVEST' | 'START_EPOCH' | 'STOP_EPOCH' | 'GET_INSTANT_WITHDRAWS' | 'CLAIM_WITHDRAW' | 'CLAIM_INSTANT_WITHDRAW' | 'REQUEST_DEPOSIT' | 'DELETE_DEPOSIT_REQUEST' | 'PROCESS_DEPOSIT_QUEUE' | 'CLAIM_DEPOSIT_REQUEST' | 'REQUEST_WITHDRAW' | 'DELETE_WITHDRAW_REQUEST' | 'PROCESS_WITHDRAW_QUEUE' | 'CLAIM_WITHDRAW_REQUEST' | 'PROCESS_WITHDRAW_CLAIMS' | 'DISTRIBUTED_REWARDS';
export declare function sTransactionType(): import("fluent-json-schema").StringSchema;
export type TransactionFields = '_id' | 'vaultId' | 'vaultAddress' | 'walletId' | 'walletAddress' | 'tokenId' | 'type' | 'hash' | 'block' | 'amount' | 'tokenAmount' | 'price' | 'input' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const TRANSACTION_FIELDS: string[];
export declare const TRANSACTION_SORT_FIELDS: string[];
export type TransactionsSideData = 'wallet' | 'user' | 'token' | 'vault' | 'operator';
export interface TransactionsSearchQuery extends PageSearchQuery<'block' | 'timestamp', TransactionFields> {
    vaultId?: string | string[];
    vaultAddress?: string | string[];
    walletId?: string | string[];
    walletAddress?: string | string[];
    block?: string;
    tokenId?: string;
    type?: TransactionType | TransactionType[];
    'timestamp:gte'?: number;
    'timestamp:lte'?: number;
}
export declare function sTransactionsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export declare enum TransactionRoutes {
    v1Create = "v1/transactions",
    v1Delete = "v1/transactions/:tokenId",
    v1Read = "v1/transactions/:tokenId",
    v1Update = "v1/transactions/:tokenId",
    v1Search = "v1/transactions"
}
export interface TransactionsClientModel {
    search: (params?: TransactionsSearchQuery) => Promise<Page<Transaction>>;
    list: (params?: TransactionsSearchQuery) => Promise<Transaction[]>;
    findOne: (params?: TransactionsSearchQuery) => Promise<Transaction | undefined>;
    create: (body: TransactionData) => Promise<Transaction>;
}
