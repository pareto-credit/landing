import { ContractEventOptions, PayableMethodObject } from 'web3-eth-contract';
import Web3, { Block, Contract, ContractAbi, EventLog, Filter, Transaction, TransactionReceipt } from 'web3';
import { Abi, AbiContract, BlockNumber, iBigInt } from '../core';
import { VaultContractType } from '../vaults';
import { TransactionType } from '../transactions';
export interface Web3ClientOptions {
    web3: Web3;
    provider: Web3RPCProvider;
    contractAddress?: string;
    blocksPerYear?: number;
    logger?: any;
}
export interface ERC20Token {
    decimals: number;
    symbol: string;
    name: string;
    address: string;
}
export declare function sERC20Token(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
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
    getTransactionLogs: (hash: string) => Promise<TransactionReceipt['logs']>;
    getERC20: (address: string) => Promise<ERC20Token | undefined>;
    getContractEvents: (contract: Contract<Abi>, eventType: 'Transfer', startBlock: BlockNumber, endBlock?: BlockNumber, filters?: Filter, maxBlocks?: number) => Promise<Web3Event[]>;
    call: (callData: Web3CallData[], blockNumber?: BlockNumber) => Promise<Web3CallData[]>;
    getBlock: (blockNumber?: string | number | bigint) => Promise<Block>;
}
export type Web3Protocol = 'Idle' | 'Clearpool' | 'AaveV2' | 'Gearbox' | 'Compound' | 'Lido' | 'InstadApp' | 'UniswapV2' | 'UniswapV3' | 'Morpho' | 'Ethena' | 'Curve' | 'Sky' | 'Balancer' | 'BalancerGauge' | 'NapierPT' | 'NapierYT' | 'NapierLP' | 'PendlePT' | 'PendleLP' | 'PendleSY' | 'PendleYT' | 'Euler' | 'EulerSupply' | 'Penpie' | 'TermFinance';
export declare function sWeb3Protocol(): import("fluent-json-schema").StringSchema;
export type Web3ContractType = VaultContractType | 'ERC20' | 'POOL' | 'TOKEN' | 'ORACLE' | 'TRANCHE' | 'STRATEGY' | 'WALLET' | 'POOL_TOKEN' | 'WALLET_POOL' | 'CDO_EPOCH_STRATEGY' | 'WALLET_DEPOSIT_QUEUE' | 'WALLET_WITHDRAW_QUEUE' | 'CDO_EPOCH_DEPOSIT_QUEUE' | 'CDO_EPOCH_WITHDRAW_QUEUE' | 'WALLET_CDO_EPOCH_STRATEGY' | 'PARETO_DOLLAR_QUEUE' | 'PARETO_DOLLAR_QUEUE_EPOCH_PENDING' | 'PARETO_DOLLAR_STAKING' | 'WALLET_PARETO_DOLLAR_STAKING' | 'PARETO_DOLLAR_QUEUE_YIELD_SOURCE' | 'WALLET_EULER_ACCOUNT_LENS' | 'WALLET_CDO_EPOCH_WRITEOFF';
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
export type Web3RPCProvider = 'INFURA' | 'ALCHEMY' | 'PUBLIC';
export declare function sWeb3RPCProvider(): import("fluent-json-schema").StringSchema;
export type Web3Event = EventLog & {
    values: EventLog['returnValues'];
};
export interface Web3EventsOptions {
    event: string;
    type: TransactionType;
    contract: Contract<Abi>;
    options: ContractEventOptions;
}
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
    value?: string;
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
export type Web3ContractMethodParam = '0' | '1' | '1e18' | 'vaultAddress' | 'tokenAddress' | 'walletAddress' | 'spenderAddress' | 'tokenAmount' | 'tokenFee' | 'epochNumber' | 'prevEpochNumber' | 'tokenPriceLimit' | 'yieldSourceAddress' | 'lpBalance' | 'poolAddress' | 'oracleAddress' | 'tokenAddress[ARB]' | 'tokenAddress[USDC]' | 'tokenAddress[WETH]' | 'tokenAddress[stETH]' | 'tokenAddress[USDe]' | 'tokenAddress[MATIC]' | 'tokenAddress[OP]' | 'tokenAddresses[USDC|OP]' | 'tokenAddresses[USDC|WETH]' | 'tokenAddresses[USDC|MATIC]' | 'tokenAddresses[USDC|WETH|stETH]';
export interface Web3ProtocolContract extends Web3BaseContract {
    fromBlock?: iBigInt;
    protocol: Web3Protocol;
    operatorId?: string;
}
/**
 * @deprecated Use generic contract
 */
export interface Web3BaseContract {
    address: string;
    abi?: AbiContract;
    abiCode?: AbiCode;
}
/**
 * @deprecated Use generic contract
 */
export declare function sWeb3BaseContract(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sWeb3ProtocolContract(): import("fluent-json-schema").ExtendedSchema;
export interface GenericContract {
    address: string;
    abi?: AbiContract;
    abiCode: AbiCode;
}
export declare function sGenericContract(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type AbiCode = 'ERC20' | 'CDO_MAIN_V1' | 'CDO_MAIN_V2' | 'CDO_MAIN_V3' | 'CDO_MAIN_V4' | 'CDO_STRATEGY_MAIN_V1' | 'CDO_STRATEGY_MAIN_V2' | 'CDO_STRATEGY_MAIN_V3' | 'BestYield_MAIN_V1' | 'BestYield_MAIN_V2' | 'CDO_EPOCH_MAIN_V1' | 'CDO_EPOCH_MAIN_V2' | 'CDO_EPOCH_MAIN_V3' | 'CDO_EPOCH_MAIN_V4' | 'CDO_EPOCH_DEPOSIT_QUEUE_V1' | 'CDO_EPOCH_DEPOSIT_QUEUE_V2' | 'CDO_EPOCH_WRITEOFF_V1' | 'CDO_EPOCH_STRATEGY_MAIN_V1' | 'CDO_EPOCH_STRATEGY_MAIN_V2' | 'PARETO_DOLLAR_MAIN_V1' | 'PARETO_DOLLAR_QUEUE_V1' | 'PARETO_DOLLAR_STAKING_V1' | 'ORACLE_AaveV2_V1' | 'ORACLE_Balancer_V1' | 'ORACLE_Clearpool_V1' | 'ORACLE_PendleSY_V1' | 'ORACLE_PendlePT_V1' | 'ORACLE_Euler_V1' | 'POOL_AaveV2_V1' | 'POOL_Balancer_V1' | 'POOL_BalancerGauge_V1' | 'POOL_Compound_V1' | 'POOL_Compound_V2' | 'POOL_Ethena_V1' | 'POOL_Gearbox_V1' | 'POOL_Idle_V1' | 'POOL_InstadApp_V1' | 'POOL_Morpho_V1' | 'POOL_NapierLP_V1' | 'POOL_NapierPT_V1' | 'POOL_NapierYT_V1' | 'POOL_PendleLP_V1' | 'POOL_PendlePT_V1' | 'POOL_PendleYT_V1' | 'POOL_Sky_V1' | 'POOL_Euler_V1' | 'POOL_TermFinance_V1';
export declare function sAbiCode(): import("fluent-json-schema").StringSchema;
