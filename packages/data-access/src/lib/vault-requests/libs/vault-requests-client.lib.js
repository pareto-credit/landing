"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultRequestsClient", {
    enumerable: true,
    get: function() {
        return VaultRequestsClient;
    }
});
const _vaultrequestmodel = require("../vault-request.model");
const _core = require("../../core");
let VaultRequestsClient = class VaultRequestsClient extends _core.ApiEntity {
    search(searchParams) {
        return this._search(_vaultrequestmodel.VaultRequestsRoutes.v1Search, searchParams);
    }
    searchAll(searchParams) {
        return this._searchAll(_vaultrequestmodel.VaultRequestsRoutes.v1Search, searchParams);
    }
    list(searchParams) {
        return this._list(_vaultrequestmodel.VaultRequestsRoutes.v1Search, searchParams);
    }
    listAll(searchParams) {
        return this._listAll(_vaultrequestmodel.VaultRequestsRoutes.v1Search, searchParams);
    }
    findOne(searchParams) {
        return this._findOne(_vaultrequestmodel.VaultRequestsRoutes.v1Search, searchParams);
    }
    readOne(searchParams) {
        return this._readOne(_vaultrequestmodel.VaultRequestsRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-requests-client.lib.js.map