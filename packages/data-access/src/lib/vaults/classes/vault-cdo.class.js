"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultCDO", {
    enumerable: true,
    get: function() {
        return VaultCDO;
    }
});
const _extends = require("@swc/helpers/_/_extends");
const _vaultweb3lib = require("../libs/vault-web3.lib");
const _vaultcontractclass = require("./vault-contract.class");
let VaultCDO = class VaultCDO extends _vaultcontractclass.VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        return this.getData(this.makeCallData(), blockNumber);
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
   */ makeCallData() {
        // Parse vault contract methods
        const { abi: vaultAbi, abiCode, address, protocol } = this.vault;
        const abi = (0, _vaultweb3lib.ensureAbi)({
            abi: vaultAbi,
            abiCode
        });
        let callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, 'TRANCHE');
        // TODO: this should not be necessary. Fix VaultCdoType
        if (!this.vault.cdo) {
            return [];
        }
        // Parse vault CDO methods
        callData = [
            ...callData,
            ...this.makeProtocolData(_extends._({}, this.vault.cdo, {
                protocol: this.vault.protocol
            }), 'CDO')
        ];
        if (this.vault.strategy) {
            callData = [
                ...callData,
                ...this.makeProtocolData(_extends._({}, this.vault.strategy, {
                    protocol: this.vault.protocol
                }), 'STRATEGY')
            ];
        }
        // Parse wallet methods
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
                    ...this.makePoolData(pool)
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
        if (!vault.cdo) {
            throw new Error('Vault without CDO data');
        }
    }
};

//# sourceMappingURL=vault-cdo.class.js.map