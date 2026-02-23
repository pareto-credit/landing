"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultRewardsClient", {
    enumerable: true,
    get: function() {
        return VaultRewardsClient;
    }
});
const _vaultrewardmodel = require("../vault-reward.model");
const _core = require("../../core");
let VaultRewardsClient = class VaultRewardsClient extends _core.ApiEntity {
    /**
   * Search rewards by params
   * @param searchParams - the search vault rewards search params
   * @returns the promise for search rewards
   */ search(searchParams) {
        return this._search(_vaultrewardmodel.VaultRewardRoutes.v1Search, searchParams);
    }
    /**
   * Search all reward by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_vaultrewardmodel.VaultRewardRoutes.v1Search, searchParams);
    }
    /**
   * List rewards by params
   * @param searchParams - the search vault rewards search params
   * @returns the promise for list rewards
   */ list(searchParams) {
        return this._list(_vaultrewardmodel.VaultRewardRoutes.v1Search, searchParams);
    }
    /**
   * List all rewards by params
   * @param searchParams - the search vault rewards search params
   * @returns the promise for list rewards
   */ listAll(searchParams) {
        return this._listAll(_vaultrewardmodel.VaultRewardRoutes.v1Search, searchParams);
    }
    /**
   * Find an reward by params
   * @param searchParams - the search params
   * @returns the promise for find an reward
   */ findOne(searchParams) {
        return this._findOne(_vaultrewardmodel.VaultRewardRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-rewards-client.lib.js.map