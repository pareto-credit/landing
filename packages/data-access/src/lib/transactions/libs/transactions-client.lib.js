"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransactionsClient", {
    enumerable: true,
    get: function() {
        return TransactionsClient;
    }
});
const _transactionmodel = require("../transaction.model");
const _core = require("../../core");
let TransactionsClient = class TransactionsClient extends _core.ApiEntity {
    /**
   * Create a vault epoch
   * @param body - the vault epoch data
   * @returns the promise for create a new vault epoch
   */ create(body) {
        return this._create(_transactionmodel.TransactionRoutes.v1Create, body);
    }
    /**
   * Search epochs by params
   * @param searchParams - the vault epochs search params
   * @returns the promise for search epochs
   */ search(searchParams) {
        return this._search(_transactionmodel.TransactionRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(_transactionmodel.TransactionRoutes.v1Search, searchParams);
    }
    /**
   * List epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ list(searchParams) {
        return this._list(_transactionmodel.TransactionRoutes.v1Search, searchParams);
    }
    /**
   * List all epochs by params
   * @param searchParams - the search vault epochs search params
   * @returns the promise for list epochs
   */ listAll(searchParams) {
        return this._listAll(_transactionmodel.TransactionRoutes.v1Search, searchParams);
    }
    /**
   * Find an epoch by params
   * @param searchParams - the search params
   * @returns the promise for find an epoch
   */ findOne(searchParams) {
        return this._findOne(_transactionmodel.TransactionRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=transactions-client.lib.js.map