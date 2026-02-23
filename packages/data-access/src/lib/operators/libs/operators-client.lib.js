"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OperatorsClient", {
    enumerable: true,
    get: function() {
        return OperatorsClient;
    }
});
const _operatormodel = require("../operator.model");
const _core = require("../../core");
let OperatorsClient = class OperatorsClient extends _core.ApiEntity {
    /**
   * Search operators by params
   * @param searchParams - the filters to apply
   * @returns an operators page
   */ search(searchParams) {
        return this._search(_operatormodel.OperatorRoutes.v1Search, searchParams);
    }
    /**
   * List operators by params
   * @param searchParams - the filters to apply
   * @returns the operators list
   */ list(searchParams) {
        return this._list(_operatormodel.OperatorRoutes.v1Search, searchParams);
    }
    /**
   * Find an operator by params
   * @param searchParams - the filters to apply
   * @returns an optional operator
   */ findOne(searchParams) {
        return this._findOne(_operatormodel.OperatorRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=operators-client.lib.js.map