"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UsualClient", {
    enumerable: true,
    get: function() {
        return UsualClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _core = require("../../core");
let UsualClient = class UsualClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: 'https://app.usual.money/api/',
            headers: {
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
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
        }).then((response)=>(0, _core.BNify)(response == null ? void 0 : response.data.rewards[0].apr).times(100).toNumber()).catch(()=>0);
    }
    constructor(){
        this.axios = this.initAxios();
    }
};

//# sourceMappingURL=usual-client.lib.js.map