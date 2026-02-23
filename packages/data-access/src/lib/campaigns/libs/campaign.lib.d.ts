import { Campaign } from '../campaign.model';
/**
 * Check if a campaign is currently active
 * @param campaign - the campaign model
 * @returns true if the campaign is active
 */
export declare function isCampaignActive({ startDate, endDate }: Campaign): boolean;
