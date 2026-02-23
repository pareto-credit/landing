"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiEntity", {
    enumerable: true,
    get: function() {
        return ApiEntity;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _core = require("../core");
let ApiEntity = class ApiEntity {
    /**
   * Create item by body
   * @param url - the url to use
   * @param body - the body to send
   * @returns the promise for create the item
   */ async _create(url, body) {
        return this.axios.request({
            url,
            method: 'POST',
            data: (0, _core.stringify)(body)
        }).then((response)=>response.data);
    }
    /**
   * Search items by params
   * @param url - the url to use
   * @param searchParams - the search params to filter the items
   * @returns the promise for search items
   */ async _search(url, searchParams) {
        return this.axios.request({
            url,
            method: 'GET',
            responseType: 'json',
            params: searchParams ? new URLSearchParams((0, _core.uriFy)(searchParams)) : undefined
        }).then((response)=>response.data);
    }
    /**
   * Search ALL items by params
   * @param url - the url to use
   * @param searchParams - the search params to filter the items
   * @returns the promise for search all items
   */ async _searchAll(url, searchParams = {}) {
        let offset = 0;
        let totalCount = this.limit;
        let data = [];
        do {
            const response = await this._search(url, _extends._({}, searchParams, {
                limit: this.limit,
                offset
            }));
            offset += this.limit;
            totalCount = response.totalCount;
            data = [
                ...data,
                ...response.data
            ];
        }while (offset <= totalCount)
        return {
            data,
            totalCount
        };
    }
    /**
   * List items by params
   * @param url - the url to use
   * @param searchParams - the search params for items filtering
   * @returns the promise for list items
   */ async _list(url, searchParams) {
        return this._search(url, searchParams).then((response)=>response.data);
    }
    /**
   * List ALL items by params
   * @param url - the url to use
   * @param searchParams - the search params for items filtering
   * @returns the promise for list items
   */ async _listAll(url, searchParams) {
        return this._searchAll(url, searchParams).then((response)=>response.data);
    }
    /**
   * Find one item by search params if exists
   * @param url - the url to use
   * @param searchParams - the search params for item search
   * @returns the promise for find an item
   */ async _findOne(url, searchParams) {
        return this.axios.request({
            url,
            method: 'GET',
            params: searchParams ? new URLSearchParams((0, _core.uriFy)(searchParams)) : undefined
        }).then((response)=>{
            const page = response.data;
            return page.data ? page.data[0] : undefined;
        });
    }
    /**
   * Read an item by params. Emit an error otherwise
   * @param url - the url string
   * @param searchParams - the search params to use
   * @returns the promise for read an item
   */ async _readOne(url, searchParams) {
        return this.axios.request({
            url,
            method: 'GET',
            params: new URLSearchParams((0, _core.uriFy)(searchParams))
        }).then((response)=>{
            const { data } = response.data;
            if (!data.length) {
                throw Error('Not found');
            }
            return data[0];
        });
    }
    constructor(axios){
        // Pagination
        this.defaultLimit = 50;
        this.limit = 200;
        this.axios = axios;
    }
};

//# sourceMappingURL=api-entity.class.js.map