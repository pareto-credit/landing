import { VaultEpochRoutes } from '../vault-epoch.model';
import { ApiEntity } from '../../core';
export class VaultEpochsClient extends ApiEntity {
    /**
   * Create a vault epoch
   * @param body - the vault epoch data
   * @returns the promise for create a new vault epoch
   */ create(body) {
        return this._create(VaultEpochRoutes.v1Create, body);
    }
    /**
   * Search epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for search epochs
   */ search(searchParams) {
        return this._search(VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(VaultEpochRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=vault-epochs-client.lib.js.map