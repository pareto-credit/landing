import { Block, iBigInt, Page, PageSearchQuery } from '../core';
export type VaultRequestType = 'DEPOSIT' | 'WITHDRAW' | 'REDEEM' | 'WRITEOFF';
export declare function sVaultRequestType(): import("fluent-json-schema").StringSchema;
export interface VaultRequest {
    vaultId: string;
    vaultAddress: string;
    type: VaultRequestType;
    amount: iBigInt;
    lpAmount?: iBigInt;
    block: Block;
    isInstant?: boolean;
    requestedOn: string;
    completedOn?: string;
    walletId: string;
    walletAddress: string;
    status: VaultRequestStatus;
    epochNumber?: number;
}
export type VaultRequestStatus = 'PENDING' | 'PROCESSED' | 'CLAIMABLE' | 'INSTANT_CLAIMABLE' | 'CLAIMED' | 'FULFILLED' | 'COMPLETED';
export declare function sVaultRequestStatus(): import("fluent-json-schema").StringSchema;
export declare function sVaultRequest(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultRequestField = '_id' | 'vaultId' | 'vaultAddress' | 'walletId' | 'walletAddress' | 'requestedOn' | 'status' | 'type' | 'amount' | 'lpAmount' | 'block' | 'epochNumber' | 'isInstant';
export declare const VAULT_REQUEST_FIELDS: VaultRequestField[];
export declare const VAULT_REQUEST_SORT_FIELDS: string[];
export type VaultRequestsSortField = 'requestedOn' | 'block.number';
export interface VaultRequestsSearchQuery extends PageSearchQuery<VaultRequestsSortField, VaultRequestField> {
    vaultId?: string | string[];
    vaultAddress?: string | string[];
    walletAddress?: string | string[];
    walletId?: string | string[];
    status?: VaultRequestStatus | VaultRequestStatus[];
    type?: VaultRequestType | VaultRequestType[];
}
export declare enum VaultRequestErrorCodes {
    notMatching = "VAULT_REQUEST_NOT_MATCHING",
    notClaimable = "VAULT_REQUEST_NOT_CLAIMABLE",
    epochNumber = "VAULT_REQUEST_INVALID_EPOCH_NUMBER",
    wrongStatus = "VAULT_REQUEST_WRONG_STATUS",
    wrongType = "VAULT_REQUEST_WRONG_TYPE",
    transactionNotFound = "VAULT_REQUEST_TRANSACTION_NOT_FOUND",
    writeOffAmounts = "VAULT_REQUEST_WRITEOFF_AMOUNTS"
}
export declare function sVaultRequestsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface VaultRequestsClientModel {
    search: (params?: VaultRequestsSearchQuery) => Promise<Page<VaultRequest>>;
    searchAll: (params?: VaultRequestsSearchQuery) => Promise<Page<VaultRequest>>;
    list: (params?: VaultRequestsSearchQuery) => Promise<VaultRequest[]>;
    listAll: (params?: VaultRequestsSearchQuery) => Promise<VaultRequest[]>;
    findOne: (params?: VaultRequestsSearchQuery) => Promise<VaultRequest | undefined>;
    readOne: (params: VaultRequestsSearchQuery) => Promise<VaultRequest>;
}
export declare enum VaultRequestsRoutes {
    v1Search = "v1/vault-requests"
}
