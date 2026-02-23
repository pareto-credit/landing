"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChainsClient", {
    enumerable: true,
    get: function() {
        return ChainsClient;
    }
});
const _chainmodel = require("../chain.model");
const _core = require("../../core");
let ChainsClient = class ChainsClient extends _core.ApiEntity {
    /**
   * Search chains by params
   * @param searchParams - the filters to apply
   * @returns a chains page
   */ search(searchParams) {
        return this._search(_chainmodel.ChainRoutes.v1Search, searchParams);
    }
    /**
   * List chains by params
   * @param searchParams - the filters to apply
   * @returns the chains list
   */ list(searchParams) {
        return this._list(_chainmodel.ChainRoutes.v1Search, searchParams);
    }
    /**
   * Find a chain by params
   * @param searchParams - the filters to apply
   * @returns an optional chain
   */ findOne(searchParams) {
        return this._findOne(_chainmodel.ChainRoutes.v1Search, searchParams);
    }
    /**
   * Read a chain by params or throw
   * @param searchParams - the filters to apply
   * @returns the matching chain
   */ readOne(searchParams) {
        return this._readOne(_chainmodel.ChainRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=chains-client.lib.js.map