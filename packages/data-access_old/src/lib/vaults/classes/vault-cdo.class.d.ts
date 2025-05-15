import { BlockNumber } from '../../core';
import { Token } from '../../tokens';
import { Vault, VaultContractData, VaultContractModel, VaultContractOptions, VaultNonPayableMethodOptions, VaultNonPayableMethodType, VaultPayableMethodType } from '../vault.model';
import { VaultContract } from './vault-contract.class';
export declare class VaultCDO extends VaultContract implements VaultContractModel {
    constructor(vault: Vault, token: Token, options?: VaultContractOptions);
    /**
     * Get contract data
     * @returns the blockchain contract data
     */
    getContractData(blockNumber?: BlockNumber): Promise<VaultContractData>;
    /**
     * Get vault payable method
     * @param type the payment method type
     * @param options the payment method options
     * @returns the web3 payable method
     */
    getPayableMethod(type: VaultPayableMethodType, options?: any): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Get vault non payable method
     * @param type
     * @param params
     */
    getValue(type: VaultNonPayableMethodType, options?: VaultNonPayableMethodOptions): Promise<any>;
    /**
     * Prepare call data
     * @returns the web3 call data
     */
    private makeCallData;
}
