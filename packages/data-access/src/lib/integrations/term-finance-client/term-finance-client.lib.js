"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TermFinanceClient", {
    enumerable: true,
    get: function() {
        return TermFinanceClient;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _axios = /*#__PURE__*/ _interop_require_default._(require("axios"));
const _core = require("../../core");
const _etherscanclientlib = require("../etherscan-client/etherscan-client.lib");
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const TERM_FINANCE_SUBGRAPH_ENDPOINT = 'https://graphql-gateway-term.mainnet.mainnet.termfinance.io/graphql';
let TermFinanceClient = class TermFinanceClient {
    async getRepoTokensHolders(params) {
        const { collateralToken, blockNumber } = params;
        if (!collateralToken) {
            throw new Error('Integration Error: TermFinance collateralToken parameter is required');
        }
        const repoTokens = await this.fetchRepoTokens(collateralToken, blockNumber);
        if (!repoTokens.length) {
            return [];
        }
        const lenders = [];
        for (const { repoToken, purchaseToken } of repoTokens){
            const balances = await this.getRepoTokenBalances(repoToken, blockNumber);
            balances.forEach((balance, address)=>{
                if (balance.lte(0)) {
                    return;
                }
                lenders.push({
                    address,
                    repoToken,
                    purchaseToken,
                    balance: (0, _core.BNstring)(balance)
                });
            });
        }
        return lenders;
    }
    initAxios() {
        const options = {
            baseURL: TERM_FINANCE_SUBGRAPH_ENDPOINT,
            headers: {
                'content-type': 'application/json'
            }
        };
        return _axios.default.create(options);
    }
    async fetchRepoTokens(collateralToken, blockNumber) {
        var _data_errors, _data_data;
        const normalizedCollateral = collateralToken.toLowerCase();
        const blockArg = blockNumber && !isNaN(blockNumber) ? `, block: { number: ${blockNumber} }` : '';
        const query = `{
      termRepoCollaterals(where:{collateralToken:"${normalizedCollateral}" amountLocked_gt:0}${blockArg}){
        term{termRepoToken purchaseToken}
      }
    }`;
        const { data } = await this.axios.request({
            method: 'POST',
            data: {
                query
            }
        });
        if ((_data_errors = data.errors) == null ? void 0 : _data_errors.length) {
            const [error] = data.errors;
            throw new Error(`Integration Error: TermFinance repo token query failed (${error.message})`);
        }
        var _data_data_termRepoCollaterals;
        const termRepoCollaterals = (_data_data_termRepoCollaterals = (_data_data = data.data) == null ? void 0 : _data_data.termRepoCollaterals) != null ? _data_data_termRepoCollaterals : [];
        const tokensMap = new Map();
        termRepoCollaterals.forEach(({ term })=>{
            var _term_termRepoToken, _term_purchaseToken;
            const repoToken = term == null ? void 0 : (_term_termRepoToken = term.termRepoToken) == null ? void 0 : _term_termRepoToken.toLowerCase();
            const purchaseToken = term == null ? void 0 : (_term_purchaseToken = term.purchaseToken) == null ? void 0 : _term_purchaseToken.toLowerCase();
            if (!repoToken || !purchaseToken) {
                return;
            }
            tokensMap.set(repoToken, purchaseToken);
        });
        return Array.from(tokensMap.entries()).map(([repoToken, purchaseToken])=>({
                repoToken,
                purchaseToken
            }));
    }
    async getRepoTokenBalances(repoToken, blockNumber) {
        const transfers = await this.etherscanClient.getTokenTransfers(repoToken, {
            blockNumber
        });
        const balances = new Map();
        transfers.forEach((transfer)=>{
            var _transfer_from, _transfer_to;
            const value = (0, _core.BNify)(transfer.value);
            const from = (_transfer_from = transfer.from) == null ? void 0 : _transfer_from.toLowerCase();
            const to = (_transfer_to = transfer.to) == null ? void 0 : _transfer_to.toLowerCase();
            if (!from || !to) {
                return;
            }
            if (from !== ZERO_ADDRESS) {
                const current = balances.get(from) || (0, _core.BNify)(0);
                const updated = current.minus(value);
                if (updated.lte(0)) {
                    balances.delete(from);
                } else {
                    balances.set(from, updated);
                }
            }
            if (to !== ZERO_ADDRESS) {
                const current = balances.get(to) || (0, _core.BNify)(0);
                const updated = current.plus(value);
                if (updated.lte(0)) {
                    balances.delete(to);
                } else {
                    balances.set(to, updated);
                }
            }
        });
        return balances;
    }
    constructor(){
        this.axios = this.initAxios();
        this.etherscanClient = new _etherscanclientlib.EtherscanClient();
    }
};

//# sourceMappingURL=term-finance-client.lib.js.map