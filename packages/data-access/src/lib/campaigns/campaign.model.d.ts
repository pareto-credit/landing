import { ClientEntity, Locales, UnitTime, PageSearchQuery, Page } from '../core';
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
    galxeId?: number;
    startDate?: string;
    endDate?: string;
    link?: string;
}
export declare function sCampaignData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignRule {
    name: Locales;
    description?: Locales;
    trigger: CampaignRuleTrigger;
    deposit: CampaignRuleDeposit;
    reward: CampaignRuleReward;
    frequency: CampaignRuleFrequency;
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
}
export declare function sCampaignRuleDeposit(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignRuleDepositType = 'BALANCE' | 'AGE';
export declare function sCampaignRuleDepositType(): import("fluent-json-schema").StringSchema;
export interface CampaignRuleReward {
    type: CampaignRuleRewardType;
    value: number;
}
export declare function sCampaignRuleReward(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignRuleRewardType = 'AMOUNT' | 'MULTIPLIER';
export declare function sCampaignRuleRewardType(): import("fluent-json-schema").StringSchema;
export interface CampaignRuleFrequency {
    value: number;
    unit: UnitTime;
}
export declare function sCampaignRuleFrequency(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
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
export interface CampaignsClientModel {
    create: (body: CampaignData) => Promise<Campaign>;
    search: (params?: CampaignsSearchQuery) => Promise<Page<Campaign>>;
    searchAll: (params?: CampaignsSearchQuery) => Promise<Page<Campaign>>;
    list: (params?: CampaignsSearchQuery) => Promise<Campaign[]>;
    listAll: (params?: CampaignsSearchQuery) => Promise<Campaign[]>;
    findOne: (params?: CampaignsSearchQuery) => Promise<Campaign | undefined>;
}
export declare enum CampaignRoutes {
    v1Create = "v1/campaigns",
    v1Delete = "v1/campaigns/:campaignId",
    v1Read = "v1/campaigns/:campaignId",
    v1Update = "v1/campaigns/:campaignId",
    v1Search = "v1/campaigns",
    v1Points = "v1/campaigns/:campaignId/points"
}
export declare enum CampaignErrorCodes {
    notFound = "CAMPAIGN_NOT_FOUND",
    notDeletable = "CAMPAIGN_NOT_DELETABLE",
    walletRequired = "WALLET_REQUIRED",
    referralCodeNotActive = "REFERRAL_CODE_NOT_ACTIVE"
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
    multiplier: string;
}
export declare function sCampaignMetrics(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
