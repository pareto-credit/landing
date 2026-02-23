"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EulerClient", {
    enumerable: true,
    get: function() {
        return EulerClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
let EulerClient = class EulerClient {
    /**
   * Axios initialization
   */ initAxios() {
        const options = {
            baseURL: 'https://app.euler.finance/api/v1/',
            headers: {
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
    }
    // Methods
    async getAccountVaults(account) {
        return this.axios.request({
            url: `accounts/vaults?chainId=1&account=${account}`,
            method: 'GET',
            responseType: 'json'
        }).then((response)=>{
            if (!(response == null ? void 0 : response.data)) {
                return [];
            }
            return response.data.map((d)=>d.vault);
        }).catch(()=>[]);
    }
    constructor(){
        this.axios = this.initAxios();
    }
};

//# sourceMappingURL=euler-client.lib.js.map