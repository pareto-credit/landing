import { BlockNumber } from '../../core';
import { Token } from '../../tokens';
import { Web3CallData } from '../../web3-client';
import { Vault, VaultContractData, VaultContractModel, VaultContractOptions, VaultNonPayableMethodOptions, VaultNonPayableMethodType, VaultPayableMethodOptions, VaultPayableMethodType } from '../vault.model';
import { VaultContract } from './vault-contract.class';
export declare class VaultParetoToken extends VaultContract implements VaultContractModel {
    constructor(vault: Vault, token: Token, options?: VaultContractOptions);
    /**
     * Get contract data
     * @returns the blockchain contract data
     */
    getContractData(blockNumber?: BlockNumber): Promise<VaultContractData>;
    /**
     * Prepare call data
     * @returns the web3 call data
     */
    protected makeCallData(blockNumber?: BlockNumber): Web3CallData[];
    /**
     * Get vault payable method
     * @param type the payment method type
     * @param options the payment method options
     * @returns the web3 payable method
     */
    getPayableMethod(type: VaultPayableMethodType, options?: any): undefined;
    /**
     * Get vault non payable method
     * @param type
     * @param params
     */
    getValue(type: VaultNonPayableMethodType, options?: VaultNonPayableMethodOptions): Promise<any>;
    /**
     * Mint new USP tokens providing stablecoin as collateral
     * @param options the method params
     * @returns the payable method for stop the epoch
     */
    mint(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Check if wallet is allowed
     * @param options - the method options
     * @returns true if wallet is allowed
     */
    isWalletAllowed(options?: VaultNonPayableMethodOptions): Promise<boolean>;
}
