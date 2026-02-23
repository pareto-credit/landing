"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CampaignPointsClient", {
    enumerable: true,
    get: function() {
        return CampaignPointsClient;
    }
});
const _campaignpointsmodel = require("../campaign-points.model");
const _core = require("../../core");
let CampaignPointsClient = class CampaignPointsClient extends _core.ApiEntity {
    /**
   * Search epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for search epochs
   */ search(searchParams) {
        return this._search(_campaignpointsmodel.CampaignPointRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_campaignpointsmodel.CampaignPointRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(_campaignpointsmodel.CampaignPointRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(_campaignpointsmodel.CampaignPointRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=campaign-points-client.lib.js.map