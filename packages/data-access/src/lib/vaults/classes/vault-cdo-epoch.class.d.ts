import { BlockNumber } from '../../core';
import { Token } from '../../tokens';
import { Web3CallData } from '../../web3-client';
import { Vault, VaultContractData, VaultContractModel, VaultContractOptions, VaultNonPayableMethodOptions, VaultNonPayableMethodType } from '../vault.model';
import { VaultContract } from './vault-contract.class';
export declare class VaultCDOEpoch extends VaultContract implements VaultContractModel {
    constructor(vault: Vault, token: Token, options: VaultContractOptions);
    /**
     * Parse Cdo epoch raw contract data
     * @param contractData Cdo Epoch contract raw data
     * @returns Parsed Cdo Epoch contract data
     */
    protected parseContractData(contractData: VaultContractData): VaultContractData;
    /**
     * Merge multiple array of VaultWalletData into one single array
     * @param walletsList arrays of wallets data
     * @returns array of wallet data
     */
    private mergeWalletsData;
    /**
     * Get contract data
     * @returns the blockchain contract data
     */
    getContractData(blockNumber?: BlockNumber): Promise<VaultContractData>;
    /**
     * Get contract data from deposit queue contract
     * @param blockNumber block number
     * @param contractData main contract data
     * @param parsedContractData main contract parsed data
     * @returns deposit queue contract data
     */
    private getDepositQueueContractData;
    /**
     * Get contract data from withdraw queue contract
     * @param blockNumber block number
     * @param contractData main contract data
     * @param parsedContractData main contract parsed data
     * @returns withdraw queue contract data
     */
    private getWithdrawQueueContractData;
    /**
     * Prepare call data for deposit queue
     * @param contractData processed contract data
     * @returns deposit queue call data
     */
    private makeDepositQueueData;
    /**
     * Prepare call data for deposit queue
     * @param contractData processed contract data
     * @returns deposit queue call data
     */
    private makeWithdrawQueueData;
    /**
     * Prepare call data
     * @returns the web3 call data
     */
    protected makeCallData(blockNumber?: BlockNumber): Web3CallData[];
    protected makeWriteOffData(): Web3CallData[];
    protected makeStrategyData(): Web3CallData[];
    /**
     * Get vault non payable method
     * @param type
     * @param params
     */
    getValue(type: VaultNonPayableMethodType, options?: VaultNonPayableMethodOptions): Promise<any>;
    /**
     * Get wallet allowance
     * @param options - the method options
     * @returns the allowance amount
     */
    getWalletAllowance(options?: VaultNonPayableMethodOptions, contract?: {
        address: string;
    }): Promise<string>;
    /**
     * Get wallet max withdrawable
     * @param options - the method options
     * @returns the withdrawable amount
     */
    getWalletWithdrawable(options?: VaultNonPayableMethodOptions): Promise<string>;
    /**
     * Check if wallet is allowed
     * @param options - the method options
     * @returns true if wallet is allowed
     */
    isWalletAllowed(options?: VaultNonPayableMethodOptions): Promise<boolean>;
}
