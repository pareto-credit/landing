import { BNify } from '../../core';
import axios from 'axios';
export class LidoClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return axios.create(options);
    }
    // Methods
    async getApr(tokenSymbol) {
        switch(tokenSymbol){
            case 'stETH':
                return this.getStETHApr();
            case 'MATIC':
                return this.getMaticApr();
            default:
                return 0;
        }
    }
    async getStETHApr() {
        return this.axios.get('https://eth-api.lido.fi/v1/protocol/steth/apr/last', {
            responseType: 'json'
        }).then((response)=>{
            if (!(response == null ? void 0 : response.data)) {
                return 0;
            }
            const { data: { apr } } = response.data;
            return BNify(apr).toNumber();
        }).catch(()=>0);
    }
    async getMaticApr() {
        return this.axios.get('https://polygon.lido.fi/api/stats', {
            responseType: 'json'
        }).then((response)=>BNify(response == null ? void 0 : response.data).toNumber()).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
}

//# sourceMappingURL=lido-client.js.map