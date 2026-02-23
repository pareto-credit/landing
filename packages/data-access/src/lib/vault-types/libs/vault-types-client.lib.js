"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultTypesClient", {
    enumerable: true,
    get: function() {
        return VaultTypesClient;
    }
});
const _vaulttypemodel = require("../vault-type.model");
const _core = require("../../core");
let VaultTypesClient = class VaultTypesClient extends _core.ApiEntity {
    /**
   * Create a vault type
   * @param body - the type data
   * @returns the created type
   */ create(body) {
        return this._create(_vaulttypemodel.VaultTypeRoutes.v1Create, body);
    }
    /**
   * Search types by params
   * @param searchParams - the filters to apply
   * @returns a types page
   */ search(searchParams) {
        return this._search(_vaulttypemodel.VaultTypeRoutes.v1Search, searchParams);
    }
    /**
   * List types by params
   * @param searchParams - the filters to apply
   * @returns the types list
   */ list(searchParams) {
        return this._list(_vaulttypemodel.VaultTypeRoutes.v1Search, searchParams);
    }
    /**
   * Find a type by params
   * @param searchParams - the filters to apply
   * @returns an optional type
   */ findOne(searchParams) {
        return this._findOne(_vaulttypemodel.VaultTypeRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-types-client.lib.js.map