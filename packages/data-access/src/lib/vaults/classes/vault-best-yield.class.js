"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultBestYield", {
    enumerable: true,
    get: function() {
        return VaultBestYield;
    }
});
const _vaultweb3lib = require("../libs/vault-web3.lib");
const _vaultcontractclass = require("./vault-contract.class");
let VaultBestYield = class VaultBestYield extends _vaultcontractclass.VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        const callData = this.makeCallData(blockNumber);
        return this.getData(callData, blockNumber);
    }
    /**
   * Get vault non payable method
   * @param type
   * @param params
   */ getValue(type, options) {
        switch(type){
            default:
                throw new Error('Method not available for this kind of vault');
        }
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
        let callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, contractType);
        if (this.walletAddresses) {
            callData = this.walletAddresses.reduce((acc, walletAddress)=>[
                    ...acc,
                    ...this.makeWalletData(walletAddress, {
                        abi,
                        address,
                        protocol
                    })
                ], callData);
        }
        // Parse vault pools methods
        if (this.vault.pools) {
            callData = this.vault.pools.reduce((acc, pool)=>[
                    ...acc,
                    ...this.makePoolData(pool, blockNumber)
                ], callData);
        }
        // Parse token methods
        if (this.token.oracle) {
            callData = [
                ...callData,
                ...this.makeProtocolData(this.token.oracle, 'ORACLE', this.token)
            ];
        }
        return callData;
    }
    constructor(vault, token, options){
        super(vault, token, options);
    }
};

//# sourceMappingURL=vault-best-yield.class.js.map