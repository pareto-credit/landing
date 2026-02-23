"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LidoClient", {
    enumerable: true,
    get: function() {
        return LidoClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _core = require("../../core");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
let LidoClient = class LidoClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            headers: {
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
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
            return (0, _core.BNify)(apr).toNumber();
        }).catch(()=>0);
    }
    async getMaticApr() {
        return this.axios.get('https://polygon.lido.fi/api/stats', {
            responseType: 'json'
        }).then((response)=>(0, _core.BNify)(response == null ? void 0 : response.data).toNumber()).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
};

//# sourceMappingURL=lido-client.js.map