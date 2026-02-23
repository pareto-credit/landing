import { ClientEntity, iBigInt, Page, PageSearchQuery } from '../core';
/**
 * Campaign Point interface
 */
export interface CampaignPoint extends CampaignPointData, ClientEntity {
}
export declare function sCampaignPoint(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface CampaignPointData {
    walletId: string;
    walletAddress: string;
    campaignId: string;
    points: number;
    perDay: number;
    rewards?: CampaignPointReward[];
}
export declare function sCampaignPointData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface CampaignPointReward {
    tokenId?: string;
    amount?: iBigInt;
    USD: iBigInt;
}
export declare function sCampaignPointReward(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type CampaignPointFields = '_id' | 'walletId' | 'walletAddress' | 'campaignId' | 'points' | 'perDay' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export type CampaignPointSortFields = '_id' | 'points';
export declare const CAMPAIGN_POINT_FIELDS: string[];
export declare const CAMPAIGN_POINT_SORT_FIELDS: string[];
export interface CampaignPointsSearchQuery extends PageSearchQuery<CampaignPointSortFields, CampaignPointFields> {
    walletId?: string | string[];
    walletAddress?: string | string[];
    campaignId?: string | string[];
}
export declare function sCampaignPointsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface CampaignPointClientModel {
    search: (params?: CampaignPointsSearchQuery) => Promise<Page<CampaignPoint>>;
    searchAll: (params?: CampaignPointsSearchQuery) => Promise<Page<CampaignPoint>>;
    list: (params?: CampaignPointsSearchQuery) => Promise<CampaignPoint[]>;
    listAll: (params?: CampaignPointsSearchQuery) => Promise<CampaignPoint[]>;
}
export declare enum CampaignPointRoutes {
    v1Search = "v1/campaign-points"
}
