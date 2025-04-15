import { ContractEventOptions, PayableMethodObject } from 'web3-eth-contract';
import Web3, { Block, Contract, ContractAbi, EventLog, Filter, Transaction } from 'web3';
import { Abi, AbiContract, BlockNumber, iBigInt } from '../core';
import { VaultContractType } from '../vaults';
export interface Web3ClientOptions {
    web3: Web3;
    provider: Web3RPCProvider;
    contractAddress?: string;
    blocksPerYear?: number;
    logger?: any;
}
export type Web3Clients = {
    [chainId: string]: Web3ClientModel;
};
export interface Web3ClientModel {
    web3: Web3;
    provider: Web3RPCProvider;
    blocksPerYear: number;
    initContract: (abi: ContractAbi, address: string) => Contract<Abi>;
    parseBlock: (blockNumber: BlockNumber) => string;
    createTopic: (topic: Web3Topic) => string;
    getTransaction: (hash: string) => Promise<Transaction | undefined>;
    getContractEvents: (contract: Contract<Abi>, eventType: 'Transfer', startBlock: BlockNumber, endBlock?: BlockNumber, filters?: Filter, maxBlocks?: number) => Promise<Web3Event[]>;
    call: (callData: Web3CallData[], blockNumber?: BlockNumber) => Promise<Web3CallData[]>;
    getBlock: (blockNumber?: string | number | bigint) => Promise<Block>;
}
export type Web3Protocol = 'Idle' | 'Clearpool' | 'AaveV2' | 'Gearbox' | 'Compound' | 'Lido' | 'InstadApp' | 'UniswapV2' | 'UniswapV3' | 'Morpho' | 'Ethena';
export declare function sWeb3Protocol(): import("fluent-json-schema").StringSchema;
export type Web3ContractType = VaultContractType | 'POOL' | 'TOKEN' | 'ORACLE' | 'TRANCHE' | 'STRATEGY' | 'WALLET' | 'CDO_EPOCH_STRATEGY' | 'WALLET_DEPOSIT_QUEUE' | 'WALLET_WITHDRAW_QUEUE' | 'CDO_EPOCH_DEPOSIT_QUEUE' | 'CDO_EPOCH_WITHDRAW_QUEUE' | 'WALLET_CDO_EPOCH_STRATEGY';
export interface Web3Provider {
    web3: Web3;
    provider: Web3RPCProvider;
}
export interface Web3ProviderConnection {
    provider: Web3RPCProvider;
    https?: string;
    wss?: string;
}
export declare function sWeb3ProviderConnection(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type Web3RPCProvider = 'INFURA' | 'ALCHEMY';
export declare function sWeb3RPCProvider(): import("fluent-json-schema").StringSchema;
export type Web3Event = EventLog;
export interface Web3EventsOptions {
    event: string;
    type: Web3EventType;
    contract: Contract<Abi>;
    options: ContractEventOptions;
}
export type Web3EventType = 'MINT' | 'REDEEM' | 'TRANSFER' | 'START_EPOCH' | 'STOP_EPOCH' | 'GET_INSTANT_WITHDRAWS' | 'CLAIM_WITHDRAW' | 'CLAIM_INSTANT_WITHDRAW' | 'REQUEST_DEPOSIT' | 'DELETE_DEPOSIT_REQUEST' | 'PROCESS_DEPOSIT_QUEUE' | 'CLAIM_DEPOSIT_REQUEST' | 'REQUEST_WITHDRAW' | 'DELETE_WITHDRAW_REQUEST' | 'PROCESS_WITHDRAW_QUEUE' | 'CLAIM_WITHDRAW_REQUEST' | 'PROCESS_WITHDRAW_CLAIMS' | 'DISTRIBUTED_REWARDS';
export interface Web3Tokens {
    INFURA?: string;
    ALCHEMY?: string;
}
export interface Web3WalletTokens {
    walletConnect?: string;
    onBoardKey?: string;
}
export type Web3Subscription = 'logs' | 'newBlockHeaders' | 'newHeads' | 'newPendingTransactions' | 'pendingTransactions' | 'syncing';
export interface Web3SubscriptionOptions {
    filter?: any;
    fromBlock?: number;
    topics?: Web3Topic[];
}
export interface Web3PayableOptionsParams {
    method: PayableMethodObject;
    from: string;
    toleranceBearing?: number;
}
export type Web3Topic = 'transfer';
export interface Web3Entity {
    protocol: Web3Protocol;
    type: Web3ContractType;
    address: string;
}
export interface Web3CallData extends Web3Entity {
    block: 'current' | 'previous';
    method: string;
    parent?: Web3Entity;
    params?: Web3ContractMethodParam[];
    inputs: Web3DataParam[];
    outputs: Web3DataParam[];
}
export interface Web3DataParam {
    name?: string;
    type: string;
    value?: any;
    components?: any;
}
export type Web3DataParamType = string | {
    type: string;
    components: any;
};
export interface Web3DataParams {
    names: Array<string | undefined>;
    types: Array<Web3DataParamType>;
    values: Array<any>;
}
export interface Web3CallParam {
    address: string;
    allowFailure: 0 | 1;
    bytes: string;
}
export interface Web3TransactionFee {
    ETH: string;
    USD?: string;
}
export interface Web3Contract {
    web3Client: Web3ClientModel;
    contract: Contract<Abi>;
    address: string;
}
export interface Web3ContractMethod {
    protocol: Web3Protocol;
    type: Web3ContractType;
    block: 'current' | 'previous';
    method: string;
    params?: Web3ContractMethodParam[];
    tokenSymbol?: string;
}
export interface Web3ProtocolContract extends Web3BaseContract {
    fromBlock?: iBigInt;
    protocol: Web3Protocol;
}
export interface Web3BaseContract {
    address: string;
    abi: AbiContract;
}
export type Web3ContractMethodParam = 'vaultAddress' | 'tokenAddress' | 'walletAddress' | 'spenderAddress' | 'tokenAmount' | 'tokenFee' | 'epochNumber' | 'prevEpochNumber' | 'tokenPriceLimit' | 'tokenAddress[ARB]' | 'tokenAddress[USDC]' | 'tokenAddress[WETH]' | 'tokenAddress[stETH]' | 'tokenAddress[USDe]' | 'tokenAddress[MATIC]' | 'tokenAddress[OP]' | 'tokenAddresses[USDC|OP]' | 'tokenAddresses[USDC|WETH]' | 'tokenAddresses[USDC|MATIC]' | 'tokenAddresses[USDC|WETH|stETH]';
export declare function sWeb3ProtocolContract(): import("fluent-json-schema").ExtendedSchema;
export declare function sWeb3BaseContract(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
