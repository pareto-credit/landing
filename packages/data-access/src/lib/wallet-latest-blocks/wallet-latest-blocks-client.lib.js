"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WalletLatestBlocksClient", {
    enumerable: true,
    get: function() {
        return WalletLatestBlocksClient;
    }
});
const _core = require("../core");
const _walletlatestblockmodel = require("./wallet-latest-block.model");
let WalletLatestBlocksClient = class WalletLatestBlocksClient extends _core.ApiEntity {
    /**
   * Search wallet latest blocks by params
   * @param searchParams - the wallet block search params
   * @returns the promise for search wallet wallet blocks
   */ search(searchParams) {
        return this._search(_walletlatestblockmodel.WalletLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * Search all wallet blocks by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_walletlatestblockmodel.WalletLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * List wallet blocks by params
   * @param searchParams - the search vault blocks search params
   * @returns the promise for list blocks
   */ list(searchParams) {
        return this._list(_walletlatestblockmodel.WalletLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(_walletlatestblockmodel.WalletLatestBlockRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(_walletlatestblockmodel.WalletLatestBlockRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=wallet-latest-blocks-client.lib.js.map