import { Block, ClientEntity, PageSearchQuery, Reward, iBigInt } from '../core';
/**
 * Client VaultPerformance interface
 */
export interface VaultPerformance extends VaultPerformanceData, ClientEntity {
}
export declare function sVaultPerformance(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultPerformanceData extends VaultBlockPerformance {
    vaultId: string;
    vaultBlockId: string;
    block: Block;
}
export declare function sVaultPerformanceData(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultBlockPerformance {
    age: number;
    holders: number;
    realizedAPY: number;
    earnings: VaultBlockEarnings;
    accruedRewards?: Reward[];
}
export declare function sVaultBlockPerformance(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockEarnings {
    USD: iBigInt;
    token: iBigInt;
    percentage: number;
}
export declare function sVaultBlockPerformanceEarnings(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum VaultPerformanceErrorCodes {
    alreadyExists = "VAULT_PERFORMANCE_ALREADY_EXISTS"
}
export type VaultPerformanceFields = '_id' | 'vaultId' | 'vaultBlockId' | 'block' | 'age' | 'holders' | 'realizedAPY' | 'accruedRewards' | 'earnings' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_PERFORMANCE_FIELDS: string[];
export declare const VAULT_PERFORMANCE_SORT_FIELDS: string[];
export interface VaultPerformancesSearchQuery extends PageSearchQuery<'_id', VaultPerformanceFields> {
    vaultId?: string | string[];
    vaultBlockId?: string | string[];
}
export declare function sVaultPerformancesSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export declare enum VaultPerformanceRoutes {
    v1Create = "v1/vault-performances",
    v1Delete = "v1/vault-performances/:vaultPerformanceId",
    v1Read = "v1/vault-performances/:vaultPerformanceId",
    v1Update = "v1/vault-performances/:vaultPerformanceId",
    v1Search = "v1/vault-performances"
}
