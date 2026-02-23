import Web3, { Block, Contract, ContractAbi, Filter, Transaction, TransactionReceipt } from 'web3';
import { ERC20Token, Web3CallData, Web3ClientModel, Web3ClientOptions, Web3DataParam, Web3DataParams, Web3Event, Web3RPCProvider, Web3Topic } from './web3-client.model';
import { Abi, BlockNumber } from '../core';
/**
 * Web3 Client class
 */
export declare class Web3Client implements Web3ClientModel {
    readonly provider: Web3RPCProvider;
    web3: Web3;
    blocksPerYear: number;
    contractAddress: string;
    private logger?;
    constructor({ web3, provider, contractAddress, blocksPerYear, logger, }: Web3ClientOptions);
    /**
     * Initialize contract instance
     * @param abi - the contract ABI
     * @param address - the address
     * @returns the new instance of Web3 Contract
     */
    initContract(abi: ContractAbi, address: string): Contract<Abi>;
    /**
     * Create a topic from a type
     * @param topicType - the topic type
     * @returns the topic encoded
     */
    createTopic(topicType: Web3Topic): string;
    /**
     * Get web3 transaction from hash
     * @param hash transaction hash
     * @returns web3 transaction object
     */
    getTransaction(hash: string): Promise<Transaction | undefined>;
    /**
     * Get transcation logs from hash
     * @param hash transaction hash
     * @returns transaction logs array
     */
    getTransactionLogs(hash: string): Promise<TransactionReceipt['logs']>;
    /**
     * Get block data
     * @param blockNumber - the block number
     * @returns the promise to load block data
     */
    getBlock(blockNumber?: BlockNumber): Promise<Block>;
    /**
     * Get contract events using block range
     * @param contract vault contract
     * @param eventType event type
     * @param startBlock start block number
     * @param endBlock end block number
     * @param maxBlocks max blocks per batch
     * @returns concatenated past events
     */
    getContractEvents(contract: Contract<Abi>, eventType: 'Transfer', startBlock: BlockNumber, endBlock?: BlockNumber, filters?: Filter, maxBlocks?: number): Promise<Web3Event[]>;
    /**
     * Parse block number into hex string
     * @param blockNumber - the block number
     * @returns the block number HEX string
     */
    parseBlock(blockNumber: BlockNumber): string;
    /**
     * Decode parameters by ABI
     * @param abi - the ABI
     * @param params - the params encoded
     * @returns the parameters
     */
    decodeParams<T = any>(abi: any, params: string): Array<T>;
    /**
     * Extract data param into flag values
     * @param params - the data params
     * @returns the object with values
     */
    extractDataParams(params: Web3DataParam[]): Web3DataParams;
    /**
     * Get ERC20 token info
     * @param address token address
     * @returns ERC20 info
     */
    getERC20(address: string): Promise<ERC20Token | undefined>;
    /**
     * Execute Web3 Call
     * @param callData - the call params
     * @param blockNumber - what block to use as the current state
     * @returns the promise to use for load contract data
     */
    call(callData: Web3CallData[], blockNumber?: BlockNumber): Promise<Web3CallData[]>;
    /**
     * Perform single calls to blockchain
     * @param callData calls data
     * @param blockNumber block number
     * @returns parsed data for passed calls
     */
    singleCalls(callData: Web3CallData[], blockNumber?: BlockNumber): Promise<Web3CallData[]>;
    /**
     * Encode multi calls params
     * @param callData - the list of the call data
     * @returns the string encoded of the params
     */
    private encodeCallsParams;
    /**
     * Parse call parameters
     * @param callData - the call data to parse
     * @returns the call data keccak256 encoded string
     */
    private parseCallParams;
    /**
     * Decode multicall response
     * @param response - the call encoded response
     */
    private decodeCallsResponse;
    /**
     * Decode single call response
     * @param success - True if it's ok
     * @param response - the response encoded
     * @param request - the request object
     * @returns the callData object
     */
    private decodeCallResponse;
}
