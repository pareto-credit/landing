import axios from 'axios';
import { GALXE_GRAPHQL_ENDPOINT } from './galxe-client.const';
import { get } from 'lodash';
export class GalxeClient {
    /**
   * Axios initialization
   */ initAxios(token) {
        const options = {
            baseURL: GALXE_GRAPHQL_ENDPOINT,
            headers: {
                'x-api-key': token,
                'content-type': 'application/json'
            }
        };
        return axios.create(options);
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
        }).then((response)=>get(response.data, 'data.space'));
    }
    constructor(token){
        this.axios = this.initAxios(token);
    }
}

//# sourceMappingURL=galxe-client.class.js.map