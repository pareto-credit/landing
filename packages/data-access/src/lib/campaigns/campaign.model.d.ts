import { ClientEntity, Locales, UnitTime, PageSearchQuery, Page, iBigInt } from '../core';
/**
 * Client Vault interface
 */
export interface Campaign extends CampaignData, ClientEntity {
}
export declare function sCampaign(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface CampaignData {
    code: string;
    name: Locales;
    description?: Locales;
    rules?: CampaignRule[];
    referrals?: CampaignReferral[];
    boosts?: CampaignBoost[];
    startDate?: string;
    endDate?: string;
    link?: string;
    galxeId?: number;
    isSyncable?: boolean;
}
export declare function sCampaignData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignRule {
    code: string;
    name: Locales;
    description?: Locales;
    trigger: CampaignRuleTrigger;
    deposit: CampaignRuleDeposit;
    reward: CampaignReward;
    frequency: CampaignRuleFrequency;
    vaultIds?: string[];
}
export declare function sCampaignRule(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignRuleTrigger = 'DEPOSIT' | 'DEPOSIT_REQUEST';
export declare function sCampaignRuleTrigger(): import("fluent-json-schema").StringSchema;
export interface CampaignRuleDeposit {
    type: CampaignRuleDepositType;
    value: number;
    tokenId?: string;
}
export declare function sCampaignRuleDeposit(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignRuleDepositType = 'BALANCE' | 'BALANCE_USP' | 'BALANCE_SUSP' | 'POOL_BALANCE' | 'AGE';
export declare function sCampaignRuleDepositType(): import("fluent-json-schema").StringSchema;
export interface CampaignReward {
    type: CampaignRewardType;
    value: number;
}
export declare function sCampaignReward(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignRewardType = 'AMOUNT' | 'MULTIPLIER' | 'PERCENTAGE';
export declare function sCampaignRewardType(): import("fluent-json-schema").StringSchema;
export interface CampaignRuleFrequency {
    value: number;
    unit: UnitTime;
}
export declare function sCampaignRuleFrequency(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignBoost {
    code: string;
    name: Locales;
    description?: Locales;
    operatorId?: string;
    link?: string;
    linkLabel?: Locales;
    type: CampaignBoostType;
    reward: CampaignReward;
    startDate?: string;
    endDate?: string;
    vaultIds?: string[];
    tokenId?: string;
    rules?: string[];
    pools?: string[];
}
export declare function sCampaignBoost(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignBoostType = 'REFERRAL' | 'REFERRAL_FEE' | 'REFERRED' | 'STAKE' | 'DEPOSIT' | 'DEPOSIT_BALANCER' | 'DEPOSIT_NAPIER' | 'DEPOSIT_PENDLE' | 'DEPOSIT_EULER' | 'SUPPLY_EULER' | 'SUPPLY_TERM';
export declare function sCampaignBoostType(): import("fluent-json-schema").StringSchema;
export interface CampaignReferral {
    code: string;
    isActive: boolean;
}
export declare function sCampaignReferral(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sCampaignReferralCode(): import("fluent-json-schema").StringSchema;
export interface CampaignsSearchQuery extends PageSearchQuery {
    code?: string | string[];
    startDate?: string;
    'startDate:lt'?: string;
    'startDate:lte'?: string;
    'startDate:gt'?: string;
    'startDate:gte'?: string;
    endDate?: string;
    'endDate:lt'?: string;
    'endDate:lte'?: string;
    'endDate:gt'?: string;
    'endDate:gte'?: string;
}
export declare function sCampaignsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export declare enum CampaignsRoutingKey {
    idleSync = "pareto.campaign.sync"
}
export interface CampaignsClientModel {
    create: (body: CampaignData) => Promise<Campaign>;
    search: (params?: CampaignsSearchQuery) => Promise<Page<Campaign>>;
    searchAll: (params?: CampaignsSearchQuery) => Promise<Page<Campaign>>;
    list: (params?: CampaignsSearchQuery) => Promise<Campaign[]>;
    listAll: (params?: CampaignsSearchQuery) => Promise<Campaign[]>;
    findOne: (params?: CampaignsSearchQuery) => Promise<Campaign | undefined>;
    readOne: (params: CampaignsSearchQuery) => Promise<Campaign>;
}
export declare enum CampaignRoutes {
    v1Create = "v1/campaigns",
    v1Delete = "v1/campaigns/:campaignId",
    v1Read = "v1/campaigns/:campaignId",
    v1Update = "v1/campaigns/:campaignId",
    v1Search = "v1/campaigns",
    v1Points = "v1/campaigns/:campaignId/points",
    v1Sync = "v1/campaigns/:campaignId/sync",
    v1Ranking = "v1/campaigns/:campaignId/ranking"
}
export declare enum CampaignErrorCodes {
    notFound = "CAMPAIGN_NOT_FOUND",
    notDeletable = "CAMPAIGN_NOT_DELETABLE",
    walletRequired = "WALLET_REQUIRED",
    referralNotValid = "REFERRAL_CODE_INVALID",
    referralCodeNotActive = "REFERRAL_CODE_NOT_ACTIVE",
    rankOverflow = "RANK_OVERFLOW"
}
export interface CampaignPointsQuery {
    walletId?: string;
    walletAddress?: string;
}
export declare function sCampaignPointsQuery(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignPoints extends CampaignMetrics {
    vaults?: CampaignPointsVault[];
    boosts?: CampaignPointsBoost[];
    metrics?: {
        [key: string]: string | number;
    };
}
export declare function sCampaignPoints(): import("fluent-json-schema").ExtendedSchema;
export interface CampaignPointsVault extends CampaignMetrics {
    _id: string;
}
export declare function sCampaignPointsVault(): import("fluent-json-schema").ExtendedSchema;
export declare function sCampaignPointsMetrics(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignMetrics {
    points: string;
    perDay: string;
    multiplierScaled?: string;
    multiplier: string;
    rewards?: CampaignMetricsReward[];
    code?: string;
    rules?: string[];
}
export interface CampaignMetricsReward {
    tokenId?: string;
    amount?: iBigInt;
    USD: iBigInt;
}
export declare function sCampaignMetricsReward(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sCampaignMetrics(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignPointsBoost extends CampaignMetrics {
    code: string;
}
export declare function sCampaignPointsBoost(): import("fluent-json-schema").ExtendedSchema;
export interface CampaignRankingQuery {
    walletId?: string | string[];
    walletAddress?: string | string[];
    rank?: number | number[];
}
export declare function sCampaignRankingQuery(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignRanking {
    totalPoints: number;
    totalWallets: number;
    totalWalletsWithPoints: number;
    rankings: CampaignRankingWallet[];
    updatedAt?: string;
}
export declare function sCampaignRanking(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignRankingWallet {
    walletId: string;
    walletAddress: string;
    points: number;
    perDay: number;
    rank: number;
}
export declare function sCampaignRankingWallet(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
