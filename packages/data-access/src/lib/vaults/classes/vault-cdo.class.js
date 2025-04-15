import { _ as _extends } from "@swc/helpers/_/_extends";
import { VaultContract } from './vault-contract.class';
export class VaultCDO extends VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        return this.getData(this.makeCallData(), blockNumber);
    }
    /**
   * Get vault payable method
   * @param type the payment method type
   * @param options the payment method options
   * @returns the web3 payable method
   */ getPayableMethod(type, options) {
        switch(type){
            case 'APPROVE':
                return this.approveToken(options);
            default:
                throw new Error('Method not available for this kind of vault');
        }
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
        const { abi, address, protocol } = this.vault;
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
            ...this.makeProtocolData(_extends({}, this.vault.cdo, {
                protocol: this.vault.protocol
            }), 'CDO')
        ];
        if (this.vault.strategy) {
            callData = [
                ...callData,
                ...this.makeProtocolData(_extends({}, this.vault.strategy, {
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
}

//# sourceMappingURL=vault-cdo.class.js.map