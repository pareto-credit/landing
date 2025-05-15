import { VaultContract } from './vault-contract.class';
export class VaultParetoToken extends VaultContract {
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
        const { abi, address, protocol, contractType } = this.vault;
        const callData = this.makeProtocolData({
            abi,
            address,
            protocol
        }, contractType);
        return callData;
    }
    /**
   * Get vault payable method
   * @param type the payment method type
   * @param options the payment method options
   * @returns the web3 payable method
   */ getPayableMethod(type, options) {
        try {
            switch(type){
                default:
                    throw new Error('Method not available for this kind of vault');
            }
        } catch (error) {
            console.error(`Contract get method error`, type, error);
            return void 0;
        }
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
   * Mint new USP tokens providing stablecoin as collateral
   * @param options the method params
   * @returns the payable method for stop the epoch
   */ mint(options) {
        if (this.vault.contractType !== 'PARETO_TOKEN' || !this.vault.paretoDollar) {
            throw Error('Wrong vault type');
        }
        if ((options == null ? void 0 : options.collateralAddress) === undefined || options.amount === undefined) {
            throw Error('Collateral address and amount are mandatory');
        }
        const { abi, address } = this.vault;
        const { collateralAddress, amount } = options;
        // Check deposit amount
        const amountCheck = this.checkContractAmount(amount);
        if (!amountCheck) {
            return;
        }
        const params = [
            collateralAddress,
            amount
        ];
        return this.getContractPayableMethod({
            abi,
            address,
            method: 'mint',
            params
        });
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
            const { abi, address } = this.vault;
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
}

//# sourceMappingURL=vault-pareto-token.class.js.map