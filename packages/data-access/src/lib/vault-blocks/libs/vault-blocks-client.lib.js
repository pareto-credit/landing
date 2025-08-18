import { VaultBlockRoutes } from '../vault-block.model';
import { ApiEntity } from '../../core';
export class VaultBlocksClient extends ApiEntity {
    /**
   * Create a vault block
   * @param body - the vault block data
   * @returns the promise for create a new vault block
   */ create(body) {
        return this._create(VaultBlockRoutes.v1Create, body);
    }
    /**
   * Search blocks by params
   * @param searchParams - the vault blocks search params
   * @returns the promise for search blocks
   */ search(searchParams) {
        return this._search(VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * Search all blocks by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ readOne(searchParams) {
        return this._readOne(VaultBlockRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=vault-blocks-client.lib.js.map