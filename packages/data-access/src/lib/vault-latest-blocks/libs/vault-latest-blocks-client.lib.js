"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultLatestBlocksClient", {
    enumerable: true,
    get: function() {
        return VaultLatestBlocksClient;
    }
});
const _vaultlatestblockmodel = require("../vault-latest-block.model");
const _core = require("../../core");
let VaultLatestBlocksClient = class VaultLatestBlocksClient extends _core.ApiEntity {
    /**
   * Search latest blocks by params
   * @param searchParams - the filters to apply
   * @returns a blocks page
   */ search(searchParams) {
        return this._search(_vaultlatestblockmodel.VaultLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * List latest blocks by params
   * @param searchParams - the filters to apply
   * @returns the block list
   */ list(searchParams) {
        return this._list(_vaultlatestblockmodel.VaultLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * Read a latest block by params
   * @param searchParams - the filters to apply
   * @returns the matching block
   */ readOne(searchParams) {
        return this._readOne(_vaultlatestblockmodel.VaultLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find a latest block by params
   * @param searchParams - the filters to apply
   * @returns the matching block
   */ findOne(searchParams) {
        return this._findOne(_vaultlatestblockmodel.VaultLatestBlockRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-latest-blocks-client.lib.js.map