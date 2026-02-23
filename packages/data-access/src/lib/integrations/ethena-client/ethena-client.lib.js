"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EthenaClient", {
    enumerable: true,
    get: function() {
        return EthenaClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _core = require("../../core");
let EthenaClient = class EthenaClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: 'https://app.ethena.fi/api/',
            headers: {
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
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
        }).then((response)=>(0, _core.BNify)(response == null ? void 0 : response.data.stakingYield.value).toNumber()).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
};

//# sourceMappingURL=ethena-client.lib.js.map