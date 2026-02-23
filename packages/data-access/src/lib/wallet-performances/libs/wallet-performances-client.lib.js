"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WalletPerformanceClient", {
    enumerable: true,
    get: function() {
        return WalletPerformanceClient;
    }
});
const _walletperformancemodel = require("../wallet-performance.model");
const _core = require("../../core");
let WalletPerformanceClient = class WalletPerformanceClient extends _core.ApiEntity {
    /**
   * Search wallet performances by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for search wallet performances
   */ search(searchParams) {
        return this._search(_walletperformancemodel.WalletPerformanceRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_walletperformancemodel.WalletPerformanceRoutes.v1Search, searchParams);
    }
    /**
   * List wallet performances by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list wallet performances
   */ list(searchParams) {
        return this._list(_walletperformancemodel.WalletPerformanceRoutes.v1Search, searchParams);
    }
    /**
   * List all wallet performances by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list wallet performances
   */ listAll(searchParams) {
        return this._listAll(_walletperformancemodel.WalletPerformanceRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=wallet-performances-client.lib.js.map