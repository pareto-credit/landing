import { CampaignRoutes } from '../campaign.model';
import { ApiEntity, uriFy } from '../../core';
export class CampaignsClient extends ApiEntity {
    /**
   * Create a campaign
   * @param body - the campaign data
   * @returns the promise for create a new campaign
   */ create(body) {
        return this._create(CampaignRoutes.v1Create, body);
    }
    /**
   * Search epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for search epochs
   */ search(searchParams) {
        return this._search(CampaignRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(CampaignRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(CampaignRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(CampaignRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(CampaignRoutes.v1Search, searchParams);
    }
    /**
   * Read a campaign by params
   * @param searchParams - the search params
   * @returns the promise for read a campaign
   */ readOne(searchParams) {
        return this._readOne(CampaignRoutes.v1Search, searchParams);
    }
    /**
   * Get campaign points for a wallet address
   * @param campaignId - the campaign ID
   * @param walletAddress - the wallet address
   * @returns the points of a campaign for a wallet
   */ points(campaignId, walletAddress) {
        return this.axios.request({
            url: CampaignRoutes.v1Points.replace(':campaignId', campaignId),
            method: 'GET',
            params: new URLSearchParams(uriFy({
                walletAddress
            }))
        }).then((response)=>response.data);
    }
    /**
   * Get campaign ranking
   * @param campaignId - the campaign ID
   * @param query - the campaign ranking query
   * @returns the ranking of a campaign
   */ ranking(campaignId, query) {
        return this.axios.request({
            url: CampaignRoutes.v1Ranking.replace(':campaignId', campaignId),
            method: 'GET',
            params: new URLSearchParams(uriFy(query))
        }).then((response)=>response.data);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=campaigns-client.lib.js.map