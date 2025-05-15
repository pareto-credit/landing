import axios from 'axios';
import { BNify } from '../../core';
export class EthenaClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: 'https://app.ethena.fi/api/',
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.create(options);
    }
    // Methods
    async getApr(tokenSymbol) {
        switch(tokenSymbol){
            case 'USDe':
                return this.getUSDeApr();
            default:
                return 0;
        }
    }
    async getUSDeApr() {
        return this.axios.request({
            url: 'yields/protocol-and-staking-yield',
            method: 'GET',
            responseType: 'json'
        }).then((response)=>BNify(response == null ? void 0 : response.data.stakingYield.value).toNumber()).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
}

//# sourceMappingURL=ethena-client.lib.js.map