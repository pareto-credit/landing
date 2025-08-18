import { CampaignPointRoutes } from '../campaign-points.model';
import { ApiEntity } from '../../core';
export class CampaignPointsClient extends ApiEntity {
    /**
   * Search epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for search epochs
   */ search(searchParams) {
        return this._search(CampaignPointRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(CampaignPointRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(CampaignPointRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(CampaignPointRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=campaign-points-client.lib.js.map