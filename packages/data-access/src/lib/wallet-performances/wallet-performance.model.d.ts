import { Page } from '../core';
import { Block, ClientEntity, PageSearchQuery, Reward, iBigInt } from '../core';
import { WalletBlockDistributedRewards } from '../wallet-blocks';
/**
 * Client WalletPerformance interface
 */
export interface WalletPerformance extends WalletPerformanceData, ClientEntity {
}
export declare function sWalletPerformance(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface WalletPerformanceData extends WalletBlockPerformance {
    walletId: string;
    walletAddress: string;
    vaultId: string;
    vaultAddress: string;
    block: Block;
    deposits: WalletBlockAmounts;
    redeemable: WalletBlockAmounts;
}
export declare function sWalletPerformanceData(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface WalletPortfolio extends WalletBlockPerformance {
    vaultIds: string[];
    operators: WalletPositionOperator[];
    chains: WalletPositionChain[];
    tokens: WalletPositionToken[];
    deposits: WalletBlockAmounts;
    redeemable: WalletBlockAmounts;
    pendingDeposits: WalletBlockAmounts;
    pendingWithdraws: WalletBlockAmounts;
}
export declare function sWalletPositionAggregated(): import("fluent-json-schema").ExtendedSchema;
export interface WalletPositionToken {
    walletId: string;
    tokenId: string;
    tokenAddress: string;
    amount: iBigInt;
    USD: iBigInt;
    percentage: number;
    pool?: string;
    operatorId?: string;
}
export declare function sWalletPositionToken(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletPositionChain {
    chainId: string;
    USD: iBigInt;
    percentage: number;
}
export declare function sWalletPositionChain(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletPositionOperator {
    operatorId: string;
    USD: iBigInt;
    percentage: number;
}
export declare function sWalletPositionOperator(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletDistributedRewards extends WalletBlockDistributedRewards {
    walletId: string;
    block: Block;
    APR: number;
    percentage: number;
}
export declare function sWalletDistributedRewards(): import("fluent-json-schema").ExtendedSchema;
export interface WalletDeposits {
    walletId: string;
    avgPrice: iBigInt;
    firstBlock?: Block;
    deposits: WalletBlockAmounts;
    redeemable: WalletBlockAmounts;
    pendingDeposits: WalletBlockAmounts;
    pendingWithdraws: WalletBlockAmounts;
}
export declare function sWalletDeposits(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletVaultBalance {
    block: Block;
    balance: iBigInt;
    tokenBalance: iBigInt;
}
export declare function sWalletVaultBalance(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletPosition extends WalletBlockPerformance, WalletDeposits {
    block: Block;
    walletId: string;
    walletAddress: string;
    tokenId: string;
    vaultId: string;
    chainId: string;
    vaultPrice: string;
    vaultAddress: string;
    tokenAddress: string;
    balances?: WalletVaultBalance[];
}
export declare function sWalletPosition(): import("fluent-json-schema").ExtendedSchema;
export interface WalletBlockPerformance {
    age: number;
    earnings: WalletBlockEarnings;
    fees: WalletBlockAmounts;
    realizedAPY: number;
    rewardsRealizedAPY: number;
    poolSharePercentage: number;
    accruedRewards?: Reward[];
    collectedRewards?: Reward[];
    tokens?: WalletPositionToken[];
}
export declare function sWalletBlockPerformance(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletBlockAmounts {
    USD: iBigInt;
    token?: iBigInt;
    vault?: iBigInt;
}
export declare function sWalletBlockAmounts(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletBlockEarnings extends WalletBlockAmounts {
    percentage: number;
    rewards?: WalletBlockEarningsRewards;
}
export declare function sWalletBlockEarnings(): import("fluent-json-schema").ExtendedSchema;
export interface WalletBlockEarningsRewards {
    USD: iBigInt;
    percentage: number;
}
export declare function sWalletBlockEarningsRewards(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum WalletPerformanceErrorCodes {
    alreadyExists = "WALLET_PERFORMANCE_ALREADY_EXISTS",
    rewardProgramNotFound = "WALLET_PERFORMANCE_REWARD_PROGRAM_NOT_FOUND"
}
export type WalletPerformanceFields = '_id' | 'walletId' | 'vaultId' | 'block' | 'age' | 'earnings' | 'realizedAPY' | 'poolSharePercentage' | 'accruedRewards' | 'collectedRewards' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const WALLET_PERFORMANCE_FIELDS: string[];
export declare const WALLET_PERFORMANCE_SORT_FIELDS: string[];
export interface WalletPerformancesSearchQuery extends PageSearchQuery<'_id', WalletPerformanceFields> {
    vaultId?: string | string[];
    walletId?: string | string[];
    walletAddress?: string | string[];
}
export declare function sWalletPerformancesSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface WalletPerformanceClientModel {
    search: (params?: WalletPerformancesSearchQuery) => Promise<Page<WalletPerformance>>;
    searchAll: (params?: WalletPerformancesSearchQuery) => Promise<Page<WalletPerformance>>;
    list: (params?: WalletPerformancesSearchQuery) => Promise<WalletPerformance[]>;
    listAll: (params?: WalletPerformancesSearchQuery) => Promise<WalletPerformance[]>;
}
export declare enum WalletPerformanceRoutes {
    v1Search = "v1/wallet-performances"
}
