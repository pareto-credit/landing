import { BlockNumber } from '../../core';
import { Token } from '../../tokens';
import { Vault, VaultContractData, VaultContractModel, VaultContractOptions, VaultPayableMethodOptions, VaultPayableMethodType, VaultNonPayableMethodOptions, VaultNonPayableMethodType } from '../vault.model';
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
    private makeCallData;
    /**
     * Get vault payable method
     * @param type the payment method type
     * @param options the payment method options
     * @returns the web3 payable method
     */
    getPayableMethod(type: VaultPayableMethodType, options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Get vault non payable method
     * @param type
     * @param params
     */
    getValue(type: VaultNonPayableMethodType, options?: VaultNonPayableMethodOptions): Promise<any>;
    /**
     * Process deposit queue
     * @returns the payable method for process the deposit queue
     */
    processDepositQueue(): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Process withdraw queue
     * @returns the payable method for process the withdraw queue
     */
    processWithdrawQueue(): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Process withdrawal claims
     * @param options the method options
     * @returns the payable method for process withdrawal claims
     */
    processWithdrawalClaims(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Start vault epoch
     * @returns the payable method for start the epoch
     */
    startEpoch(): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Stop vault epoch
     * @param options the method params
     * @returns the payable method for stop the epoch
     */
    stopEpoch(options?: VaultPayableMethodOptions, withDuration?: boolean): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Deposit amount
     * @param options the method params
     * @returns the payable method for deposit
     */
    deposit(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Request deposit
     * @param options the method params
     * @returns the payable method for request deposit
     */
    requestDeposit(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Withdraw amount
     * @param options - the method params
     * @return the payable method for withdraw
     */
    withdraw(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Withdraw amount
     * @param options - the method params
     * @return the payable method for withdraw
     */
    requestWithdraw(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Claim withdraw
     * @return the payable method for withdraw
     */
    claimWithdraw(isInstant?: boolean): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Claim deposit request
     * @param options - the request options
     * @returns
     */
    claimDepositRequest(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Cancel deposit request
     * @param options - the request options
     * @returns
     */
    cancelDepositRequest(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Claim withdraw request
     * @param options - the request options
     * @returns
     */
    claimWithdrawRequest(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Cancel withdraw request
     * @param options - the request options
     * @returns
     */
    cancelWithdrawRequest(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Close the current vault
     * @returns the payable method for close the vault
     */
    defaultVault(): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Set epoch params
     * @param options - the method params
     * @returns the payable method for set the epoch params
     */
    setEpochParams(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Set epoch APR
     * @param options - the method params
     * @returns the payable method for set the epoch apr
     */
    setAPRs(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
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
     * Get instant withdraw funds
     * @returns the payable method for get the instant withdraws funds
     */
    getInstantWithdrawFunds(): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Check if wallet is allowed
     * @param options - the method options
     * @returns true if wallet is allowed
     */
    isWalletAllowed(options?: VaultNonPayableMethodOptions): Promise<boolean>;
}
