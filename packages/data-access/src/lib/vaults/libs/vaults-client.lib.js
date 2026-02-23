"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultsClient", {
    enumerable: true,
    get: function() {
        return VaultsClient;
    }
});
const _vaultmodel = require("../vault.model");
const _core = require("../../core");
const _utilitylib = require("../../core/utility.lib");
let VaultsClient = class VaultsClient extends _core.ApiEntity {
    /**
   * Create a vault
   * @param body - the vault data
   * @returns the created vault
   */ create(body) {
        return this._create(_vaultmodel.VaultRoutes.v1Create, body);
    }
    /**
   * Search vaults by params
   * @param searchParams - the filters to apply
   * @returns a vaults page
   */ search(searchParams) {
        return this._search(_vaultmodel.VaultRoutes.v1Search, searchParams);
    }
    /**
   * List vaults by params
   * @param searchParams - the filters to apply
   * @returns the vault list
   */ list(searchParams) {
        return this._list(_vaultmodel.VaultRoutes.v1Search, searchParams);
    }
    /**
   * Find a vault by params
   * @param searchParams - the filters to apply
   * @returns an optional vault
   */ findOne(searchParams) {
        return this._findOne(_vaultmodel.VaultRoutes.v1Search, searchParams);
    }
    /**
   * Read a vault by params
   * @param searchParams - the filters to apply
   * @returns the vault
   */ readOne(searchParams) {
        return this._readOne(_vaultmodel.VaultRoutes.v1Search, searchParams);
    }
    /**
   * Get wallet position for a vault
   * @param vaultId - the vault id
   * @param searchParams - the position filters
   * @returns the wallet position
   */ position(vaultId, searchParams) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Position.replace(':vaultId', vaultId),
            method: 'GET',
            params: new URLSearchParams((0, _core.uriFy)(searchParams))
        }).then((response)=>response.data);
    }
    /**
   * Get performances breakdown
   * @param params - the performances filters
   * @returns the performances summary
   */ performances(params) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Performances,
            method: 'GET',
            params: new URLSearchParams((0, _core.uriFy)(params))
        }).then((response)=>response.data);
    }
    /**
   * Get integrations data
   * @param vaultId - the vault id
   * @param searchParams - the integrations filters
   * @returns the integrations data
   */ integrations(vaultId, searchParams) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Integrations.replace(':vaultId', vaultId),
            method: 'GET',
            params: new URLSearchParams((0, _core.uriFy)(searchParams))
        }).then((response)=>response.data);
    }
    /**
   * Sync vault state
   * @param vaultId - the vault id
   * @param body - the sync payload
   * @returns the synced block number
   */ sync(vaultId, body) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Sync.replace(':vaultId', vaultId),
            method: 'POST',
            data: (0, _utilitylib.stringify)(body)
        }).then((response)=>response.data);
    }
    /**
   * Sync a specific block
   * @param vaultId - the vault id
   * @param body - the sync payload
   * @returns whether the sync happened
   */ syncBlock(vaultId, body) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1SyncBlock.replace(':vaultId', vaultId),
            method: 'POST',
            data: (0, _utilitylib.stringify)(body)
        }).then((response)=>response.data);
    }
    /**
   * Emit a block event
   * @param vaultId - the vault id
   * @param body - the event payload
   * @returns void
   */ block(vaultId, body) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Block.replace(':vaultId', vaultId),
            method: 'POST',
            data: (0, _utilitylib.stringify)(body)
        }).then((response)=>response.data);
    }
    /**
   * Perform a vault action
   * @param vaultId - the vault id
   * @param body - the perform payload
   * @returns void
   */ perform(vaultId, body) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Perform.replace(':vaultId', vaultId),
            method: 'POST',
            data: (0, _utilitylib.stringify)(body)
        }).then((response)=>response.data);
    }
    /**
   * Cure a vault
   * @param vaultId - the vault id
   * @returns void
   */ cure(vaultId) {
        return this.axios.request({
            url: _vaultmodel.VaultRoutes.v1Cure.replace(':vaultId', vaultId),
            method: 'POST'
        }).then((response)=>response.data);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=vaults-client.lib.js.map