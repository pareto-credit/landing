import { Block, ClientEntity, iBigInt, Page, PageSearchQuery } from '../core';
export interface VaultReward extends VaultRewardData, ClientEntity {
}
export declare function sVaultReward(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultRewardData {
    tokenId: string;
    vaultId: string;
    vaultAddress: string;
    block: Block;
    type: VaultRewardType;
    walletId: string;
    walletAddress: string;
    status: VaultRewardStatus;
    amount: iBigInt;
}
export declare function sVaultRewardData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultRewardType = 'PARETO_TOKEN_CLAIM' | 'PARETO_TOKEN_REWARD';
export declare function sVaultRewardType(): import("fluent-json-schema").StringSchema;
export type VaultRewardStatus = 'PENDING' | 'CLAIMED';
export declare function sVaultRewardStatus(): import("fluent-json-schema").StringSchema;
export type VaultRewardField = '_id' | 'vaultId' | 'vaultAddress' | 'walletId' | 'walletAddress' | 'status' | 'type' | 'amount' | 'block';
export declare const VAULT_REWARD_FIELDS: VaultRewardField[];
export declare const VAULT_REWARD_SORT_FIELDS: string[];
export type VaultRewardSortField = 'block.number';
export interface VaultRewardsSearchQuery extends PageSearchQuery<VaultRewardSortField> {
    vaultId?: string | string[];
    vaultAddress?: string | string[];
    walletId?: string | string[];
    walletAddress?: string | string[];
    status?: VaultRewardStatus | VaultRewardStatus[];
    type?: VaultRewardType | VaultRewardType[];
    'timestamp:gte'?: number;
    'timestamp:lte'?: number;
}
export declare function sVaultRewardsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface VaultRewardsClientModel {
    search: (params?: VaultRewardsSearchQuery) => Promise<Page<VaultReward>>;
    searchAll: (params?: VaultRewardsSearchQuery) => Promise<Page<VaultReward>>;
    list: (params?: VaultRewardsSearchQuery) => Promise<VaultReward[]>;
    listAll: (params?: VaultRewardsSearchQuery) => Promise<VaultReward[]>;
    findOne: (params?: VaultRewardsSearchQuery) => Promise<VaultReward | undefined>;
}
export declare enum VaultRewardRoutes {
    v1Search = "v1/vault-rewards"
}
