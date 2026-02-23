"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultCategoriesClient", {
    enumerable: true,
    get: function() {
        return VaultCategoriesClient;
    }
});
const _vaultcategorymodel = require("../vault-category.model");
const _core = require("../../core");
let VaultCategoriesClient = class VaultCategoriesClient extends _core.ApiEntity {
    /**
   * Create a vault category
   * @param body - the category data
   * @returns the created category
   */ create(body) {
        return this._create(_vaultcategorymodel.VaultCategoryRoutes.v1Create, body);
    }
    /**
   * Search categories by params
   * @param searchParams - the filters to apply
   * @returns a categories page
   */ search(searchParams) {
        return this._search(_vaultcategorymodel.VaultCategoryRoutes.v1Search, searchParams);
    }
    /**
   * List categories by params
   * @param searchParams - the filters to apply
   * @returns the categories list
   */ list(searchParams) {
        return this._list(_vaultcategorymodel.VaultCategoryRoutes.v1Search, searchParams);
    }
    /**
   * Find a category by params
   * @param searchParams - the filters to apply
   * @returns an optional category
   */ findOne(searchParams) {
        return this._findOne(_vaultcategorymodel.VaultCategoryRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vault-categories-client.lib.js.map