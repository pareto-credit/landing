"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IntegrationClient", {
    enumerable: true,
    get: function() {
        return IntegrationClient;
    }
});
const _ethenaclientlib = require("./ethena-client/ethena-client.lib");
const _instadappclientlib = require("./instadapp-client/instadapp-client.lib");
const _lidoclient = require("./lido-client/lido-client");
const _usualclientlib = require("./usual-client/usual-client.lib");
const _termfinanceclientlib = require("./term-finance-client/term-finance-client.lib");
let IntegrationClient = class IntegrationClient {
    async getApr(tokenSymbol) {
        return this.client.getApr ? this.client.getApr(tokenSymbol) : 0;
    }
    async getRepoTokensHolders(params) {
        return this.client.getRepoTokensHolders ? this.client.getRepoTokensHolders(params) : [];
    }
    constructor(provider){
        switch(provider){
            case 'Usual':
                this.client = new _usualclientlib.UsualClient();
                break;
            case 'Lido':
                this.client = new _lidoclient.LidoClient();
                break;
            case 'Instadapp':
                this.client = new _instadappclientlib.InstadappClient();
                break;
            case 'Ethena':
                this.client = new _ethenaclientlib.EthenaClient();
                break;
            case 'TermFinance':
                this.client = new _termfinanceclientlib.TermFinanceClient();
                break;
            default:
                throw Error(`Integration Error: wrong provider "${provider}"`);
        }
    }
};

//# sourceMappingURL=integrations-client.lib.js.map