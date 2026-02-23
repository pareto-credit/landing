"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultBlocksClient", {
    enumerable: true,
    get: function() {
        return VaultBlocksClient;
    }
});
const _vaultblockmodel = require("../vault-block.model");
const _core = require("../../core");
let VaultBlocksClient = class VaultBlocksClient extends _core.ApiEntity {
    /**
   * Create a vault block
   * @param body - the vault block data
   * @returns the promise for create a new vault block
   */ create(body) {
        return this._create(_vaultblockmodel.VaultBlockRoutes.v1Create, body);
    }
    /**
   * Search blocks by params
   * @param searchParams - the vault blocks search params
   * @returns the promise for search blocks
   */ search(searchParams) {
        return this._search(_vaultblockmodel.VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * Search all blocks by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_vaultblockmodel.VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(_vaultblockmodel.VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(_vaultblockmodel.VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(_vaultblockmodel.VaultBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ readOne(searchParams) {
        return this._readOne(_vaultblockmodel.VaultBlockRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-blocks-client.lib.js.map