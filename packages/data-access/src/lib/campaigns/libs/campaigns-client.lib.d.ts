import { Axios } from 'axios';
import { Campaign, CampaignData, CampaignsSearchQuery, CampaignsClientModel, CampaignPoints } from '../campaign.model';
import { ApiEntity } from '../../core';
export declare class CampaignsClient extends ApiEntity implements CampaignsClientModel {
    constructor(axios: Axios);
    /**
     * Create a campaign
     * @param body - the campaign data
     * @returns the promise for create a new campaign
     */
    create(body: CampaignData): Promise<Campaign>;
    /**
     * Search epochs by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for search epochs
     */
    search(searchParams?: CampaignsSearchQuery): Promise<import("../../core").Page<Campaign>>;
    /**
     * Search all epoch by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: CampaignsSearchQuery): Promise<import("../../core").Page<Campaign>>;
    /**
     * List epochs by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for list epochs
     */
    list(searchParams?: CampaignsSearchQuery): Promise<Campaign[]>;
    /**
     * List all epochs by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for list epochs
     */
    listAll(searchParams?: CampaignsSearchQuery): Promise<Campaign[]>;
    /**
     * Find an epoch by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    findOne(searchParams?: CampaignsSearchQuery): Promise<Campaign | undefined>;
    /**
     * Get campaign points for a wallet address
     * @param campaignId - the campaign ID
     * @param walletAddress - the wallet address
     * @returns the points of a campaign for a wallet
     */
    points(campaignId: string, walletAddress: string): Promise<CampaignPoints>;
}
