"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TokensClient", {
    enumerable: true,
    get: function() {
        return TokensClient;
    }
});
const _tokenmodel = require("../token.model");
const _core = require("../../core");
let TokensClient = class TokensClient extends _core.ApiEntity {
    /**
   * Create a token
   * @param body - the token data
   * @returns the created token
   */ create(body) {
        return this._create(_tokenmodel.TokenRoutes.v1Create, body);
    }
    /**
   * Search tokens by params
   * @param searchParams - the filters to apply
   * @returns a tokens page
   */ search(searchParams) {
        return this._search(_tokenmodel.TokenRoutes.v1Search, searchParams);
    }
    /**
   * List tokens by params
   * @param searchParams - the filters to apply
   * @returns the token list
   */ list(searchParams) {
        return this._list(_tokenmodel.TokenRoutes.v1Search, searchParams);
    }
    /**
   * Find a token by params
   * @param searchParams - the filters to apply
   * @returns an optional token
   */ findOne(searchParams) {
        return this._findOne(_tokenmodel.TokenRoutes.v1Search, searchParams);
    }
    /**
   * Read a token by params or throw
   * @param searchParams - the filters to apply
   * @returns the token
   */ readOne(searchParams) {
        return this._readOne(_tokenmodel.TokenRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=tokens-client.lib.js.map