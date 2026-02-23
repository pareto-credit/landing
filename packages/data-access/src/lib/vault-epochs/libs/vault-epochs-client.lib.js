"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultEpochsClient", {
    enumerable: true,
    get: function() {
        return VaultEpochsClient;
    }
});
const _vaultepochmodel = require("../vault-epoch.model");
const _core = require("../../core");
let VaultEpochsClient = class VaultEpochsClient extends _core.ApiEntity {
    /**
   * Create a vault epoch
   * @param body - the vault epoch data
   * @returns the promise for create a new vault epoch
   */ create(body) {
        return this._create(_vaultepochmodel.VaultEpochRoutes.v1Create, body);
    }
    /**
   * Search epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for search epochs
   */ search(searchParams) {
        return this._search(_vaultepochmodel.VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_vaultepochmodel.VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(_vaultepochmodel.VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(_vaultepochmodel.VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(_vaultepochmodel.VaultEpochRoutes.v1Search, searchParams);
    }
    /**
   * List holders for a specific epoch
   * @param vaultEpochId - the vault epoch identifier
   * @param searchParams - pagination options
   * @returns the promise for epoch holders
   */ holders(vaultEpochId, searchParams) {
        const url = _vaultepochmodel.VaultEpochRoutes.v1Holders.replace(':vaultEpochId', vaultEpochId);
        return this._search(url, searchParams);
    }
    /**
   * Download vault epoch PDF
   * @param vaultEpochId - the vault epoch identifier
   * @param searchParams - the query options
   * @returns the PDF as ArrayBuffer
   */ pdf(vaultEpochId, searchParams) {
        const url = _vaultepochmodel.VaultEpochRoutes.v1Pdf.replace(':vaultEpochId', vaultEpochId);
        return this.axios.request({
            url,
            method: 'GET',
            params: new URLSearchParams((0, _core.uriFy)(searchParams)),
            responseType: 'arraybuffer'
        }).then((response)=>response.data);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-epochs-client.lib.js.map