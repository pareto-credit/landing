import { BlockNumber } from '../../core';
import { Token } from '../../tokens';
import { Vault, VaultContractData, VaultContractModel, VaultContractOptions, VaultNonPayableMethodOptions, VaultNonPayableMethodType } from '../vault.model';
import { VaultContract } from './vault-contract.class';
export declare class VaultCDO extends VaultContract implements VaultContractModel {
    constructor(vault: Vault, token: Token, options?: VaultContractOptions);
    /**
     * Get contract data
     * @returns the blockchain contract data
     */
    getContractData(blockNumber?: BlockNumber): Promise<VaultContractData>;
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
