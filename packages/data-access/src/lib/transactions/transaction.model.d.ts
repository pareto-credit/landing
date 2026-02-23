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
    fromAddress?: string;
    toAddress?: string;
    tokenId: string;
    operatorId?: string;
    type: TransactionType;
    hash: string;
    block: Block;
    amount: iBigInt;
    tokenAmount: iBigInt;
    price: iBigInt;
    input?: string;
    transactionDate?: string;
}
export declare function sTransactionData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
/**
 * #################################
 * ####### TRANSACTION TYPES #######
 * #################################
 */
export type TransactionTypeCommon = 'DEPOSIT' | 'REDEEM' | 'HARVEST' | 'DISTRIBUTED_REWARDS';
export declare const TRANSACTION_TYPES_COMMON: string[];
/**
 * Vault Pareto Dollar
 */
export type TransactionTypeParetoDollar = 'ADD_COLLATERAL' | 'ADD_YIELD_SOURCE' | 'CLAIM_REDEEM_REQUEST' | 'DEPOSIT_REWARDS' | 'DEPOSIT_YIELD_SOURCE' | 'MINT' | 'NEW_EPOCH' | 'REDEEM' | 'REDEEM_YIELD_SOURCE' | 'REMOVE_COLLATERAL' | 'REMOVE_YIELD_SOURCE' | 'REQUEST_REDEEM' | 'STAKE' | 'STAKE_POOL' | 'TRANSFER' | 'TRANSFER_POOL' | 'UNSTAKE' | 'UNSTAKE_POOL';
export declare const TRANSACTION_TYPES_PARETO_DOLLAR: string[];
export declare function sTransactionTypeParetoDollar(): import("fluent-json-schema").StringSchema;
/**
 * Vault CDO Epoch
 */
export declare const TRANSACTION_TYPES_CDO_EPOCH: string[];
export type TransactionTypeCdoEpoch = 'CLAIM_DEPOSIT_REQUEST' | 'CLAIM_INSTANT_WITHDRAW' | 'CLAIM_WITHDRAW' | 'CLAIM_WITHDRAW_REQUEST' | 'DELETE_DEPOSIT_REQUEST' | 'DELETE_WITHDRAW_REQUEST' | 'GET_INSTANT_WITHDRAWS' | 'PROCESS_DEPOSIT_QUEUE' | 'PROCESS_WITHDRAW_CLAIMS' | 'PROCESS_WITHDRAW_QUEUE' | 'REQUEST_DEPOSIT' | 'REQUEST_WITHDRAW' | 'START_EPOCH' | 'STOP_EPOCH' | 'REQUEST_WRITEOFF' | 'DELETE_WRITEOFF_REQUEST' | 'FULFILL_WRITEOFF_REQUEST' | 'DEPOSIT_WRITEOFF_REQUEST';
export declare function sTransactionTypeCdoEpoch(): import("fluent-json-schema").StringSchema;
export type TransactionType = TransactionTypeCommon | TransactionTypeParetoDollar | TransactionTypeCdoEpoch;
export declare const TRANSACTION_TYPES: string[];
export declare function sTransactionType(): import("fluent-json-schema").StringSchema;
/**
 * #####################################
 * ####### END TRANSACTION TYPES #######
 * #####################################
 */
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
