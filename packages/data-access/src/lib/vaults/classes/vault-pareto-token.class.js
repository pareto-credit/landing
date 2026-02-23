"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultParetoToken", {
    enumerable: true,
    get: function() {
        return VaultParetoToken;
    }
});
const _vaultcontractclass = require("./vault-contract.class");
const _vaultweb3lib = require("../libs/vault-web3.lib");
let VaultParetoToken = class VaultParetoToken extends _vaultcontractclass.VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        const callData = this.makeCallData(blockNumber);
        return this.getData(callData, blockNumber);
    }
    /**
   * Prepare call data
   * @returns the web3 call data
   */ makeCallData(blockNumber) {
        // Parse vault contract methods
        const { abi: vaultAbi, abiCode, address, protocol, contractType } = this.vault;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: vaultAbi,
            abiCode
        });
        const callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, contractType);
        return callData;
    }
    /**
   * Get vault non payable method
   * @param type
   * @param params
   */ getValue(type, options) {
        try {
            switch(type){
                default:
                    throw new Error('Value not available for this kind of vault');
            }
        } catch (error) {
            console.error(`Contract get value error`, type, error);
            return Promise.resolve(null);
        }
    }
    /**
   * Check if wallet is allowed
   * @param options - the method options
   * @returns true if wallet is allowed
   */ isWalletAllowed(options) {
        try {
            if (this.vault.contractType !== 'PARETO_TOKEN' || !this.vault.paretoDollar) {
                throw Error('Wrong vault type');
            }
            if ((options == null ? void 0 : options.walletAddress) === undefined) {
                throw Error('Wallet address is mandatory');
            }
            const { abi: vaultAbi, abiCode, address } = this.vault;
            const abi = (0, _vaultweb3lib.ensureAbi)({
                abi: vaultAbi,
                abiCode
            });
            const method = this.getContractNonPayableMethod({
                abi,
                address,
                method: 'isWalletAllowed',
                params: [
                    options.walletAddress
                ]
            });
            if (!method) {
                throw Error('Not method available');
            }
            return method.call();
        } catch (error) {
            return Promise.resolve(false);
        }
    }
    constructor(vault, token, options){
        super(vault, token, options);
    }
};

//# sourceMappingURL=vault-pareto-token.class.js.map