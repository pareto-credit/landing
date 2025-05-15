import axios from 'axios';
import { BNify } from '../../core';
export class UsualClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: 'https://app.usual.money/api/',
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.create(options);
    }
    // Methods
    async getApr(tokenSymbol) {
        switch(tokenSymbol){
            case 'USD0++':
                return this.getUsd0Apr();
            default:
                return 0;
        }
    }
    async getUsd0Apr() {
        return this.axios.request({
            url: 'rewards/rates/USD0++',
            method: 'GET',
            responseType: 'json'
        }).then((response)=>BNify(response == null ? void 0 : response.data.rewards[0].apr).times(100).toNumber()).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
}

//# sourceMappingURL=usual-client.lib.js.map