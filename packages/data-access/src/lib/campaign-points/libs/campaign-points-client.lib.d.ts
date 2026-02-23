import { Axios } from 'axios';
import { CampaignPoint, CampaignPointClientModel, CampaignPointsSearchQuery } from '../campaign-points.model';
import { ApiEntity } from '../../core';
export declare class CampaignPointsClient extends ApiEntity implements CampaignPointClientModel {
    constructor(axios: Axios);
    /**
     * Search epochs by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for search epochs
     */
    search(searchParams?: CampaignPointsSearchQuery): Promise<import("../../core").Page<CampaignPoint>>;
    /**
     * Search all epoch by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: CampaignPointsSearchQuery): Promise<import("../../core").Page<CampaignPoint>>;
    /**
     * List epochs by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for list epochs
     */
    list(searchParams?: CampaignPointsSearchQuery): Promise<CampaignPoint[]>;
    /**
     * List all epochs by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for list epochs
     */
    listAll(searchParams?: CampaignPointsSearchQuery): Promise<CampaignPoint[]>;
}
