"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultContractFactory", {
    enumerable: true,
    get: function() {
        return VaultContractFactory;
    }
});
const _vaultbestyieldclass = require("./vault-best-yield.class");
const _vaultcdoepochclass = require("./vault-cdo-epoch.class");
const _vaultcdoclass = require("./vault-cdo.class");
const _vaultparetodollarclass = require("./vault-pareto-dollar.class");
const _vaultparetotokenclass = require("./vault-pareto-token.class");
let VaultContractFactory = class VaultContractFactory {
    static fromVault(vault, token, options = {}) {
        switch(vault.contractType){
            case 'BestYield':
                return new _vaultbestyieldclass.VaultBestYield(vault, token, options);
            case 'CDO':
                return new _vaultcdoclass.VaultCDO(vault, token, options);
            case 'CDO_EPOCH':
                return new _vaultcdoepochclass.VaultCDOEpoch(vault, token, options);
            case 'PARETO_DOLLAR':
                return new _vaultparetodollarclass.VaultParetoDollar(vault, token, options);
            case 'PARETO_TOKEN':
                return new _vaultparetotokenclass.VaultParetoToken(vault, token, options);
        }
    }
};

//# sourceMappingURL=vault-contract.factory.js.map