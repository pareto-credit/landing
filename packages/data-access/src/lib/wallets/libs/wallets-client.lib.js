"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WalletsClient", {
    enumerable: true,
    get: function() {
        return WalletsClient;
    }
});
const _walletmodel = require("../wallet.model");
const _core = require("../../core");
let WalletsClient = class WalletsClient extends _core.ApiEntity {
    /**
   * Search wallets by params
   * @param searchParams - the filters to apply
   * @returns a wallets page
   */ search(searchParams) {
        return this._search(_walletmodel.WalletRoutes.v1Search, searchParams);
    }
    /**
   * List wallets by params
   * @param searchParams - the filters to apply
   * @returns the wallets list
   */ list(searchParams) {
        return this._list(_walletmodel.WalletRoutes.v1Search, searchParams);
    }
    /**
   * Find a wallet by params
   * @param searchParams - the filters to apply
   * @returns an optional wallet
   */ findOne(searchParams) {
        return this._findOne(_walletmodel.WalletRoutes.v1Search, searchParams);
    }
    /**
   * Read a wallet by params
   * @param searchParams - the filters to apply
   * @returns the wallet
   */ readOne(searchParams) {
        return this._readOne(_walletmodel.WalletRoutes.v1Search, searchParams);
    }
    /**
   * Get wallet portfolio data
   * @param walletId - the wallet id
   * @param params - the portfolio filters
   * @returns the wallet portfolio
   */ portfolio(walletId, params) {
        return this.axios.request({
            url: _walletmodel.WalletRoutes.v1Portfolio.replace(':walletId', walletId),
            method: 'GET',
            params: params ? new URLSearchParams((0, _core.uriFy)(params)) : undefined
        }).then((response)=>response.data);
    }
    /**
   * Get wallet vault positions
   * @param walletId - the wallet id
   * @param searchParams - the portfolio filters
   * @returns the wallet positions
   */ vaults(walletId, searchParams) {
        return this.axios.request({
            url: (0, _core.replaceMany)(_walletmodel.WalletRoutes.v1Vaults, {
                ':walletId': walletId
            }),
            method: 'GET',
            params: searchParams ? new URLSearchParams((0, _core.uriFy)(searchParams)) : undefined
        }).then((response)=>response.data);
    }
    /**
   * Get wallet vault history
   * @param walletId - the wallet id
   * @param searchParams - the portfolio filters
   * @returns the wallet positions
   */ vault(walletId, vaultId, params) {
        return this.axios.request({
            url: (0, _core.replaceMany)(_walletmodel.WalletRoutes.v1History, {
                ':walletId': walletId,
                ':vaultId': vaultId
            }),
            method: 'GET',
            params: params ? new URLSearchParams((0, _core.uriFy)(params)) : undefined
        }).then((response)=>response.data);
    }
    /**
   * Ensure wallet existence by address
   * @param address - the wallet address
   * @returns the ensured wallet
   */ ensure(address) {
        return this.axios.request({
            url: _walletmodel.WalletRoutes.v1Ensure,
            method: 'POST',
            data: {
                address
            }
        }).then((response)=>response.data);
    }
    /**
   * Attach a user profile to a wallet
   * @param walletId - the wallet id
   * @param body - the user payload
   * @returns the updated user
   */ user(walletId, body) {
        return this.axios.request({
            url: _walletmodel.WalletRoutes.v1User.replace(':walletId', walletId),
            method: 'POST',
            data: body
        }).then((response)=>response.data);
    }
    /**
   * Register a referral for a wallet
   * @param walletId - the wallet id
   * @param referral - the referral code
   * @returns the updated wallet
   */ referral(walletId, referral) {
        return this.axios.request({
            url: _walletmodel.WalletRoutes.v1Referral.replace(':walletId', walletId),
            method: 'POST',
            data: {
                referral
            }
        }).then((response)=>response.data);
    }
    /**
   * Read wallet access policies
   * @param walletId - the wallet id
   * @returns the wallet access object
   */ access(walletId) {
        return this.axios.request({
            url: _walletmodel.WalletRoutes.v1Access.replace(':walletId', walletId),
            method: 'GET'
        }).then((response)=>response.data);
    }
    constructor(axios){
        super(axios);
    }
};

//# sourceMappingURL=wallets-client.lib.js.map