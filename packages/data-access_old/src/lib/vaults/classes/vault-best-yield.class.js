import { VaultContract } from './vault-contract.class';
export class VaultBestYield extends VaultContract {
    /**
   * Get contract data
   * @returns the blockchain contract data
   */ async getContractData(blockNumber = 'latest') {
        const callData = this.makeCallData(blockNumber);
        return this.getData(callData, blockNumber);
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
   */ makeCallData(blockNumber) {
        // Parse vault contract methods
        const { abi, address, protocol, contractType } = this.vault;
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
}

//# sourceMappingURL=vault-best-yield.class.js.map