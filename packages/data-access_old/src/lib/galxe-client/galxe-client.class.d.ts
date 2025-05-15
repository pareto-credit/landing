import { GalxeSpacePoints } from './galxe-client.model';
export declare class GalxeClient {
    private axios;
    constructor(token: string);
    /**
     * Axios initialization
     */
    private initAxios;
    /**
     * Get campaign data by wallet address
     * @param campaignId - the campaign ID
     * @param walletAddress - the wallet address
     * @returns the wallet data
     */
    getCampaignDataByWallet(campaignId: number, walletAddress: string): Promise<GalxeSpacePoints | undefined>;
}
