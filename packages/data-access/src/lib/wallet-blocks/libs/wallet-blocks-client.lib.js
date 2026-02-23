"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WalletBlocksClient", {
    enumerable: true,
    get: function() {
        return WalletBlocksClient;
    }
});
const _core = require("../../core");
const _walletblockmodel = require("../wallet-block.model");
let WalletBlocksClient = class WalletBlocksClient extends _core.ApiEntity {
    /**
   * Search wallet latest blocks by params
   * @param searchParams - the wallet block search params
   * @returns the promise for search wallet wallet blocks
   */ search(searchParams) {
        return this._search(_walletblockmodel.WalletBlockRoutes.v1Search, searchParams);
    }
    /**
   * Search all wallet blocks by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_walletblockmodel.WalletBlockRoutes.v1Search, searchParams);
    }
    /**
   * List wallet blocks by params
   * @param searchParams - the search vault blocks search params
   * @returns the promise for list blocks
   */ list(searchParams) {
        return this._list(_walletblockmodel.WalletBlockRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(_walletblockmodel.WalletBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(_walletblockmodel.WalletBlockRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=wallet-blocks-client.lib.js.map