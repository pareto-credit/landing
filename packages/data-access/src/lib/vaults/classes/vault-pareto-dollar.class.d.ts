import { BlockNumber } from '../../core';
import { Token } from '../../tokens';
import { Web3CallData } from '../../web3-client';
import { Vault, VaultContractData, VaultContractModel, VaultContractOptions, VaultContractPoolData, VaultNonPayableMethodOptions, VaultNonPayableMethodType, VaultPayableMethodOptions, VaultPayableMethodType } from '../vault.model';
import { VaultContract } from './vault-contract.class';
export declare class VaultParetoDollar extends VaultContract implements VaultContractModel {
    constructor(vault: Vault, token: Token, options?: VaultContractOptions);
    /**
     * Get contract data
     * @returns the blockchain contract data
     */
    getContractData(blockNumber?: BlockNumber): Promise<VaultContractData>;
    /**
     * Get Euler vaults data for each wallet
     * @param blockNumber block number
     * @param contractData main contract data
     * @returns euler vaults data
     */
    protected getEulerWalletsCalls(): Web3CallData[];
    private makeEulerVaultsCalls;
    /**
     * Parse Cdo epoch raw contract data
     * @param contractData Cdo Epoch contract raw data
     * @returns Parsed Cdo Epoch contract data
     */
    protected parseContractData(contractData: VaultContractData): VaultContractData;
    /**
     * Include napierPT pool tokens into napierYT pool
     * @param pools
     * @returns parsed pools
     */
    protected parsePools(pools: VaultContractPoolData[]): VaultContractPoolData[];
    /**
     * Get additional data from queue contract
     * @param blockNumber block number
     * @param contractData main contract data
     * @returns vault contract data
     */
    private getAdditionalData;
    /**
     * Get contract data from queue contract
     * @param blockNumber block number
     * @param contractData main contract data
     * @returns queue contract data
     */
    private getQueueYieldSourcesCalls;
    /**
     * Prepare call data for deposit queue
     * @param contractData processed contract data
     * @returns deposit queue call data
     */
    private makeYieldSourceData;
    /**
     * Get contract data from queue contract
     * @param blockNumber block number
     * @param contractData main contract data
     * @returns queue contract data
     */
    private getQueueEpochPendingCalls;
    /**
     * Prepare call data for deposit queue
     * @param contractData processed contract data
     * @returns deposit queue call data
     */
    private makeQueuePendingEpochData;
    /**
     * Get vault payable method
     * @param type the payment method type
     * @param options the payment method options
     * @returns the web3 payable method
     */
    getPayableMethod(type: VaultPayableMethodType, options?: any): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Prepare call data
     * @returns the web3 call data
     */
    protected makeCallData(blockNumber?: BlockNumber): Web3CallData[];
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
     * Request redeem back collateral from USP amount
     * @param options - the payable method options
     * @returns the payable method
     */
    requestRedeem(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Claim redeem request
     * @param options - the payable method options
     * @returns the payable method
     */
    claim(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Stake USP tokens
     * @param options the method params
     * @returns the payable method for stop the epoch
     */
    stake(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Unstake sUSP tokens
     * @param options the method params
     * @returns the payable method for stop the epoch
     */
    unstake(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Check if wallet is allowed
     * @param options - the method options
     * @returns true if wallet is allowed
     */
    isWalletAllowed(options?: VaultNonPayableMethodOptions): Promise<boolean>;
    /**
     * Get token balance
     * @param options - the method options
     * @returns the token balance
     */
    getTokenBalance(options?: VaultNonPayableMethodOptions): Promise<string | undefined>;
    /**
     * Get token allowance
     * @param options
     * @returns
     */
    getTokenAllowance(options?: VaultNonPayableMethodOptions): Promise<string | undefined>;
    /**
     * Get token conversion
     * @param options
     * @returns
     */
    getTokenConversion(options?: VaultNonPayableMethodOptions): Promise<string | undefined>;
    /**
     * Increment token allowance
     * @param options the method options
     * @returns the payable method for increment allowance
     */
    approveToken(options?: VaultPayableMethodOptions): import("web3-eth-contract").PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Get address and abi of the pareto token
     * @param tokenId
     */
    private getContractAbi;
}
