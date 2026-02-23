"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InstadappClient", {
    enumerable: true,
    get: function() {
        return InstadappClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _core = require("../../core");
let InstadappClient = class InstadappClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: 'https://api.instadapp.io/v2/mainnet/lite/users/',
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
            default:
                return 0;
        }
    }
    async getStETHApr() {
        return this.axios.request({
            url: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE/vaults',
            method: 'GET',
            responseType: 'json'
        }).then((response)=>{
            if (!(response == null ? void 0 : response.data)) {
                return 0;
            }
            const foundVault = response.data.find((r)=>r.vault === '0xA0D3707c569ff8C87FA923d3823eC5D81c98Be78');
            return (0, _core.BNify)(foundVault == null ? void 0 : foundVault.apy.apyWithoutFee).toNumber();
        }).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
};

//# sourceMappingURL=instadapp-client.lib.js.map