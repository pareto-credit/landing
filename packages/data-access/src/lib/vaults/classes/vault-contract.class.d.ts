import Web3, { Contract, ContractAbi } from 'web3';
import { PayableMethodObject, NonPayableMethodObject } from 'web3-eth-contract';
import { Web3CallData, Web3ClientModel, Web3ContractMethod, Web3ContractMethodParam, Web3ContractType, Web3DataParam, Web3Entity, Web3Protocol, Web3ProtocolContract } from '../../web3-client';
import { Vault, VaultContractData, VaultContractOptions, VaultNonPayableMethodOptions, VaultPayableMethodOptions, VaultPool } from '../vault.model';
import { AbiContract, AbiJsonParam, BlockNumber, Web3MethodOptions } from '../../core';
import { Token } from '../../tokens';
export declare class VaultContract {
    vault: Vault;
    token: Token;
    web3?: Web3;
    web3Client?: Web3ClientModel;
    walletAddresses?: string[];
    rewardTokens?: Token[];
    minTokenAmount: string;
    maxTokenAmount: string;
    constructor(vault: Vault, token: Token, { web3, web3Client, walletAddresses, rewardTokens, }?: VaultContractOptions);
    /**
     * Get parsed contract data
     * @param callData call data to execute
     * @param blockNumber block number
     * @param prefillContractData prefill contract data object
     * @param prefillPreviousContractData prefill previous contract data object
     * @returns parsed blockchain contract data
     */
    protected getData(callData: Web3CallData[], blockNumber?: BlockNumber, prefill?: {
        current?: VaultContractData;
        previous?: VaultContractData;
    }): Promise<VaultContractData>;
    /**
     * Prepare Web3 Protocol Contract data
     * @param protocolContract - the web3 protocol contract
     * @param type protocol type
     * @param tokenSymbol token symbol
     * @param values custom parameters
     * @param token token override
     * @returns the web3 call data
     */
    protected makeProtocolData({ abi, address, protocol }: Web3ProtocolContract, type: Web3ContractType, token?: Token, values?: {
        [key in Web3ContractMethodParam]?: any;
    }, parent?: Web3Entity): Web3CallData[];
    /**
     * Check if the pool block is >= block number
     * @param pool pool data
     * @param blockNumber web3 call block number
     * @returns
     */
    private checkPoolBlock;
    /**
     * Check is the amount is formatted correctly for the contract
     * @param amount normalized amount
     * @returns true | false
     */
    protected checkContractAmount(amount: string | undefined): boolean;
    /**
     * Prepare reward tokens data
     * @param protocol protocol data
     * @returns web3 call data
     */
    protected makeRewardTokensData(protocol: Web3Protocol): Web3CallData[];
    /**
     * Prepare wallet data
     * @param address - the wallet address
     * @returns the web3 call data
     */
    protected makeWalletData(walletAddress: string, { abi, address, protocol }: Web3ProtocolContract): Web3CallData[];
    /**
     * Prepare pool data
     * @param pool - the vault pool
     * @returns the web3 call data
     */
    protected makePoolData(pool: VaultPool, blockNumber?: BlockNumber): Web3CallData[];
    /**
     * Get contract and relative methods
     * @returns the contract initialize and the relative methods
     */
    protected getContractMethods(abi: ContractAbi, address: string, protocol: Web3Protocol, type: Web3ContractType, token?: Token): {
        contract: Contract<AbiContract>;
        methods: Web3ContractMethod[];
    };
    /**
     * Make web3 call data for a specific contract method
     * @param contract contract
     * @param contractMethod contract method to call
     * @param parent parent web3 entity in case of nested calls
     * @param paramsValues custom params data
     * @returns web3 call data
     */
    protected makeMethodData(contract: Contract<AbiContract>, contractMethod: Web3ContractMethod, parent?: Web3Entity, values?: {
        [key in Web3ContractMethodParam]?: any;
    }, token?: Token): Web3CallData;
    /**
     * Parse vault json param
     * @param vault - the vault
     * @param input - the ABI Json Param
     * @returns the vault data param
     */
    protected makeMethodParamData(input: AbiJsonParam, param?: Web3ContractMethodParam, values?: {
        [key in Web3ContractMethodParam]?: any;
    }, token?: Token): Web3DataParam;
    /**
     * Parse method param
     * @param param - the method param
     * @returns the value of the param
     */
    private parseMethodParam;
    /**
     * Parse Web3CallData into contract data
     * @param response - the response from web3call data
     * @returns the vault contract data
     */
    protected parseCallResponses(responses: Web3CallData[], contractData?: VaultContractData): VaultContractData;
    /**
     * Parse vault call method
     * @param method - the method
     * @param outputs - the response outputs
     * @returns the partial vault contract data
     */
    private parseCallResponse;
    /**
     * Parse BestYield response
     * @param data - the already processed data
     * @param response - the BestYield response
     * @returns the contract data
     */
    private parseBestYieldResponse;
    /**
     * Parse Cdo response
     * @param data - the already processed data
     * @param response - the BestYield response
     * @returns the contract data
     */
    private parseCdoResponse;
    /**
     * Parse CDO Epoch response
     * @param data - the already processed data
     * @param response - the CDO Epoch response
     * @returns the contract data
     */
    private parseCdoEpochResponse;
    /**
     * Parse wallet deposit queue response
     * @param data - the already processed data
     * @param response - the wallet deposit queue response
     * @returns the contract data
     */
    private parseWalletDepositQueueResponse;
    /**
     * Parse wallet deposit queue response
     * @param data - the already processed data
     * @param response - the wallet deposit queue response
     * @returns the contract data
     */
    private parseWalletWithdrawQueueResponse;
    /**
     * Parse wallet deposit queue response
     * @param data - the already processed data
     * @param response - the wallet deposit queue response
     * @returns the contract data
     */
    private parseWalletCdoEpochStrategyResponse;
    /**
     * Parse wallet response
     * @param data - the already processed data
     * @param response - the wallet response
     * @returns the contract data
     */
    private parseWalletResponse;
    /**
     * Parse Cdo Epoch Strategy response
     * @param data - the already processed data
     * @param response - the BestYield response
     * @returns the contract data
     */
    private parseCdoEpochStrategyResponse;
    /**
     * Parse Cdo Epoch deposit queue response
     * @param data - the already processed data
     * @param response - the BestYield response
     * @returns the contract data
     */
    private parseCdoEpochDepositQueueResponse;
    /**
     * Parse Cdo Epoch deposit queue response
     * @param data - the already processed data
     * @param response - the BestYield response
     * @returns the contract data
     */
    private parseCdoEpochWithdrawQueueResponse;
    /**
     * Parse Strategy response
     * @param data - the already processed data
     * @param response - the Strategy response
     * @returns the contract data
     */
    private parseStrategyResponse;
    /**
     * Parse data from Oracle response
     * @param data vault contract data
     * @param response Oracle call response
     * @returns Vault contract data with oracle parsed data
     */
    private parseOracleResponse;
    /**
     * Parse data from TOKEN response
     * @param data vault contract data
     * @param web3CallData web3 call data
     * @returns parse TOKEN response
     */
    private parseTokenResponse;
    /**
     * Parse data from POOL response
     * @param data vault contract data
     * @param response Pool call response
     * @returns Vault contract data with pool parsed data
     */
    private parsePoolResponse;
    /**
     * Implement pools data with new pool data
     * @param pools pools data
     * @param poolData new pool data
     * @returns combined pools data and new pool data
     */
    private implementPoolsData;
    /**
     * Get web3 payable method object ready to be sent
     * @param web3 web3 injected instance
     * @param payableMethodOptions payable method meta-data
     * @returns payable method object
     */
    protected getContractPayableMethod(payableMethodOptions: Web3MethodOptions): PayableMethodObject | undefined;
    /**
     * Get web3 non-payable method object
     * @param web3 web3 injected instance
     * @param valueMethodOptions value method meta-data
     * @returns payable method object
     */
    protected getContractNonPayableMethod(valueMethodOptions: Web3MethodOptions): NonPayableMethodObject | undefined;
    /**
     * Increment token allowance
     * @param options the method options
     * @returns the payable method for increment allowance
     */
    approveToken(options?: VaultPayableMethodOptions): PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Increment token allowance
     * @param options the method options
     * @returns the payable method for increment allowance
     */
    approveLPToken(options?: VaultPayableMethodOptions): PayableMethodObject<unknown[], unknown[]> | undefined;
    /**
     * Get wallet deposit amount
     * @param options - the method options
     * @returns the deposit amount
     */
    getWalletBalance(options?: VaultNonPayableMethodOptions): Promise<string>;
    /**
     * Get wallet deposit amount
     * @param options - the method options
     * @returns the deposit amount
     */
    getWalletDeposit(options?: VaultNonPayableMethodOptions): Promise<string>;
}
