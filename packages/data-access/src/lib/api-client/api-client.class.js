"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiClient", {
    enumerable: true,
    get: function() {
        return ApiClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _campaigns = require("../campaigns");
const _signatures = require("../signatures");
const _transactions = require("../transactions");
const _users = require("../users");
const _vaultepochs = require("../vault-epochs");
const _chains = require("../chains");
const _operators = require("../operators");
const _tokens = require("../tokens");
const _vaultblocks = require("../vault-blocks");
const _vaultcategories = require("../vault-categories");
const _vaultlatestblocks = require("../vault-latest-blocks");
const _vaulttypes = require("../vault-types");
const _vaults = require("../vaults");
const _walletlatestblocks = require("../wallet-latest-blocks");
const _wallets = require("../wallets");
const _campaignpoints = require("../campaign-points");
const _walletperformances = require("../wallet-performances");
const _walletblocks = require("../wallet-blocks");
const _vaultrequests = require("../vault-requests");
const _vaultrewards = require("../vault-rewards");
let ApiClient = class ApiClient {
    /**
   * Axios initialization
   */ initAxios(apiUrl, token) {
        const options = {
            baseURL: `${apiUrl}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
    }
    constructor(apiUrl, token){
        this.axios = this.initAxios(apiUrl, token);
        this.campaignPoints = new _campaignpoints.CampaignPointsClient(this.axios);
        this.campaigns = new _campaigns.CampaignsClient(this.axios);
        this.chains = new _chains.ChainsClient(this.axios);
        this.operators = new _operators.OperatorsClient(this.axios);
        this.signatures = new _signatures.SignaturesClient(this.axios);
        this.tokens = new _tokens.TokensClient(this.axios);
        this.transactions = new _transactions.TransactionsClient(this.axios);
        this.users = new _users.UsersClient(this.axios);
        this.vaultBlocks = new _vaultblocks.VaultBlocksClient(this.axios);
        this.vaultCategories = new _vaultcategories.VaultCategoriesClient(this.axios);
        this.vaultEpochs = new _vaultepochs.VaultEpochsClient(this.axios);
        this.vaultLatestBlocks = new _vaultlatestblocks.VaultLatestBlocksClient(this.axios);
        this.vaultRequests = new _vaultrequests.VaultRequestsClient(this.axios);
        this.vaultRewards = new _vaultrewards.VaultRewardsClient(this.axios);
        this.vaultTypes = new _vaulttypes.VaultTypesClient(this.axios);
        this.vaults = new _vaults.VaultsClient(this.axios);
        this.walletBlocks = new _walletblocks.WalletBlocksClient(this.axios);
        this.walletLatestBlocks = new _walletlatestblocks.WalletLatestBlocksClient(this.axios);
        this.walletPerformances = new _walletperformances.WalletPerformanceClient(this.axios);
        this.wallets = new _wallets.WalletsClient(this.axios);
    }
};

//# sourceMappingURL=api-client.class.js.map