"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsersClient", {
    enumerable: true,
    get: function() {
        return UsersClient;
    }
});
const _core = require("../../core");
const _usermodel = require("../user.model");
let UsersClient = class UsersClient extends _core.ApiEntity {
    /**
   * Search users by params
   * @param searchParams - the users search params
   * @returns the promise for search users
   */ search(searchParams) {
        return this._search(_usermodel.UserRoutes.v1Search, searchParams);
    }
    /**
   * List users by params
   * @param searchParams - the users search params
   * @returns the promise for search users
   */ list(searchParams) {
        return this._list(_usermodel.UserRoutes.v1Search, searchParams);
    }
    /**
   * Find a user by params
   * @param searchParams - the search params
   * @returns the promise for find a user
   */ findOne(searchParams) {
        return this._findOne(_usermodel.UserRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=users-client.lib.js.map