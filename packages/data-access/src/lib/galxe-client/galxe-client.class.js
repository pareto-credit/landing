"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GalxeClient", {
    enumerable: true,
    get: function() {
        return GalxeClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _galxeclientconst = require("./galxe-client.const");
const _lodash = require("lodash");
let GalxeClient = class GalxeClient {
    /**
   * Axios initialization
   */ initAxios(token) {
        const options = {
            baseURL: _galxeclientconst.GALXE_GRAPHQL_ENDPOINT,
            headers: {
                'x-api-key': token,
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
    }
    /**
   * Get campaign data by wallet address
   * @param campaignId - the campaign ID
   * @param walletAddress - the wallet address
   * @returns the wallet data
   */ getCampaignDataByWallet(campaignId, walletAddress) {
        // Prepare query
        const query = `
      query SpaceLoyaltyPoints(
        $id: Int,
        $address: String!,
        $sprintId: Int) {
        space(id: $id) {
          id
          addressLoyaltyPoints(address: $address, sprintId: $sprintId) {
            id
            points
            rank
          }
        }
      }
    `;
        const variables = {
            id: campaignId,
            address: walletAddress
        };
        return this.axios.request({
            method: 'POST',
            data: {
                query,
                variables
            }
        }).then((response)=>(0, _lodash.get)(response.data, 'data.space'));
    }
    constructor(token){
        this.axios = this.initAxios(token);
    }
};

//# sourceMappingURL=galxe-client.class.js.map