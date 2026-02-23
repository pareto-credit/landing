"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EtherscanClient", {
    enumerable: true,
    get: function() {
        return EtherscanClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const DEFAULT_BASE_URL = 'https://api.etherscan.io/v2/api';
const DEFAULT_CHAIN_ID = 1;
const DEFAULT_PAGE_SIZE = 1000;
let EtherscanClient = class EtherscanClient {
    async getTokenTransfers(contractAddress, options = {}) {
        if (!this.apiKey) {
            throw new Error('Integration Error: ETHERSCAN_API_TOKEN is not configured in the environment');
        }
        const { blockNumber, pageSize = this.defaultPageSize } = options;
        const transfers = [];
        let page = 1;
        let dataLen = 0;
        do {
            const params = {
                module: 'account',
                action: 'tokentx',
                contractaddress: contractAddress,
                page,
                offset: pageSize,
                sort: 'asc',
                apikey: this.apiKey
            };
            if (typeof blockNumber === 'number') {
                params['endblock'] = blockNumber;
            }
            const { data } = await this.axios.request({
                method: 'GET',
                params
            });
            if (data.status === '0') {
                if (data.message === 'No transactions found') {
                    break;
                }
                const errorMessage = typeof data.result === 'string' && data.result.length ? data.result : data.message;
                throw new Error(`Integration Error: Etherscan response error (${errorMessage})`);
            }
            if (typeof data.result === 'string') {
                throw new Error(`Integration Error: Etherscan response error (${data.result})`);
            }
            transfers.push(...data.result);
            dataLen = data.result.length;
            page += 1;
        }while (dataLen >= pageSize)
        return transfers;
    }
    constructor(options = {}){
        const { apiKey = process.env['ETHERSCAN_API_TOKEN'], baseURL = DEFAULT_BASE_URL, chainId = DEFAULT_CHAIN_ID, defaultPageSize = DEFAULT_PAGE_SIZE } = options;
        this.apiKey = apiKey;
        this.defaultPageSize = defaultPageSize;
        const axiosOptions = {
            baseURL,
            params: {
                chainid: chainId
            },
            headers: {
                'content-type': 'application/json'
            }
        };
        this.axios = _axios.default.create(axiosOptions);
    }
};

//# sourceMappingURL=etherscan-client.lib.js.map