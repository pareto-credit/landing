import { ClientEntity, Block, iBigInt, PageSearchQuery } from '../core';
/**
 * Client Vault interface
 */
export interface WalletBlock extends WalletBlockData, ClientEntity {
}
export declare function sWalletBlock(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface WalletBlockData extends WalletBlockBody {
    walletId: string;
    walletAddress: string;
    vaultId: string;
    vaultAddress: string;
    block: Block;
}
export declare function sWalletBlockData(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
/**
 * The updateable data of the block
 */
export interface WalletBlockBody {
    balance: iBigInt;
    tokenBalance: iBigInt;
    distributedRewards?: WalletBlockDistributedRewards[];
}
export declare function sWalletBlockBody(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletBlockDistributedRewards {
    tokenId: string;
    tokenAddress: string;
    amount: string;
    amountUSD: string;
}
export declare function sWalletBlockDistributedRewards(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum WalletBlockErrorCodes {
    alreadyExists = "WALLET_BLOCK_ALREADY_EXISTS"
}
export declare enum WalletBlockRoutes {
    v1Create = "v1/wallet-blocks",
    v1Delete = "v1/wallet-blocks/:walletBlockId",
    v1Read = "v1/wallet-blocks/:walletBlockId",
    v1Update = "v1/wallet-blocks/:walletBlockId",
    v1Search = "v1/wallet-blocks"
}
export type WalletBlockFields = '_id' | 'walletId' | 'walletAddress' | 'vaultId' | 'vaultAddress' | 'block' | 'balance' | 'tokenBalance';
export declare const WALLET_BLOCK_FIELDS: string[];
export declare const WALLET_BLOCK_SORT_FIELDS: string[];
export interface WalletBlocksSearchQuery extends PageSearchQuery<'balance' | 'timestamp', WalletBlockFields> {
    walletId?: string;
    walletAddress?: string;
    vaultId?: string;
    vaultAddress?: string;
    'balance:gt'?: string;
    'timestamp:gte'?: number;
    'timestamp:lte'?: number;
}
export declare function sWalletBlocksSearchQuery(): import("fluent-json-schema").ExtendedSchema;
