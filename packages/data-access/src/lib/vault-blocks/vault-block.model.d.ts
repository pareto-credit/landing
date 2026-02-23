import { Block, ClientEntity, Page, PageSearchQuery, iBigInt } from '../core';
import { Web3Protocol } from '../web3-client';
import { VaultEpochWithdrawType } from '../vault-epochs';
import { VaultRequest } from '../vault-requests';
/**
 * Client VaultBlock interface
 */
export interface VaultBlock extends VaultBlockData, ClientEntity {
}
export declare function sVaultBlock(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultBlockData extends VaultBlockBody {
    vaultId: string;
    vaultAddress: string;
    block: Block;
}
export interface VaultBlockInterestRates {
    BASE: number;
    HARVEST?: number;
    REWARDS?: number;
    GROSS?: number;
    NET?: number;
    FEE?: number;
}
export interface VaultBlockAPRs extends VaultBlockInterestRates {
}
export interface VaultBlockAPYs extends VaultBlockInterestRates {
}
export interface VaultBlockEpochPrices {
    NEGATIVE: string;
    START: string;
    CURRENT: string;
    MIDDLE: string;
    END: string;
}
export declare function sVaultBlockInterestRates(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockInterest {
    GROSS: iBigInt;
    NET: iBigInt;
    FEE: iBigInt;
}
export declare function sVaultBlockInterest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface RewardToken {
    _id: string;
    address: string;
}
export interface VaultBlockRewardProgram {
    tokenId: string;
    APR: number;
    USD?: iBigInt;
}
export declare function sVaultBlockRewardProgram(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockBody {
    APRs: VaultBlockAPRs;
    APYs: VaultBlockAPYs;
    interest?: VaultBlockInterest;
    lastInterest?: VaultBlockInterest;
    totalSupply: iBigInt;
    price: iBigInt;
    TVL?: VaultBlockTvl;
    pools?: VaultBlockPool[];
    totalRequests?: VaultBlockTotalRequests;
    rewardPrograms?: VaultBlockRewardProgram[];
    cdo?: VaultBlockCdo;
    cdoEpoch?: VaultBlockCdoEpoch;
    strategy?: VaultBlockStrategy;
    paretoDollar?: VaultBlockParetoDollar;
    allocations?: VaultBlockAllocation[];
    requests?: VaultBlockRequest[];
}
export declare function sVaultBlockBody(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockParetoDollar {
    queue?: VaultBlockParetoDollarQueue;
    staking?: VaultBlockParetoDollarStaking;
}
export declare function sVaultBlockParetoDollar(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockParetoDollarYieldSource {
    tokenId?: string;
    vaultId?: string;
    operatorId?: string;
    tokenAddress: string;
    sourceAddress: string;
    vaultAddress: string;
    maxCap: iBigInt;
    depositedAmount: iBigInt;
    vaultType: number;
}
export declare function sVaultBlockParetoDollarYieldSource(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockParetoDollarQueue {
    epochNumber?: number;
    totalCollateralsScaled?: iBigInt;
    unlentBalanceScaled?: iBigInt;
    totalReservedWithdrawals?: iBigInt;
    yieldSources?: VaultBlockParetoDollarYieldSource[];
    epochPending?: iBigInt;
    prevEpochPending?: iBigInt;
}
export declare function sVaultBlockParetoDollarQueue(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockParetoDollarStaking {
    totalSupply?: iBigInt;
    totalAssets?: iBigInt;
    rewardsLastDeposit?: iBigInt;
}
export declare function sVaultBlockParetoDollarStaking(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultBlockRequest = Omit<VaultRequest, 'vaultId' | 'vaultAddress'> & {
    vaultId?: string;
    vaultAddress?: string;
};
export declare function sVaultBlockRequest(): import("fluent-json-schema").ExtendedSchema;
export interface VaultBlockTotalRequests {
    DEPOSIT?: VaultBlockDepositTotalRequest;
    WITHDRAW?: VaultBlockWithdrawTotalRequest;
    REDEEM?: VaultBlockRedeemTotalRequest;
    WRITEOFF?: VaultBlockWriteoffTotalRequest;
}
export declare function sVaultBlockTotalRequests(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
interface VaultBlockDepositTotalRequest {
    PENDING: iBigInt;
    CLAIMED: iBigInt;
}
export declare function sVaultBlockDepositTotalRequest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
interface VaultBlockWithdrawTotalRequest {
    PENDING: iBigInt;
    PROCESSED: iBigInt;
    CLAIMABLE: iBigInt;
    INSTANT_CLAIMABLE: iBigInt;
    CLAIMED: iBigInt;
}
export declare function sVaultBlockWithdrawTotalRequest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
interface VaultBlockRedeemTotalRequest {
    PENDING: iBigInt;
    CLAIMED: iBigInt;
}
export declare function sVaultBlockRedeemTotalRequest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
interface VaultBlockWriteoffTotalRequest {
    PENDING: iBigInt;
    FULFILLED: iBigInt;
}
export declare function sVaultBlockWriteoffTotalRequest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockCdoEpoch {
    apr: number;
    lastApr?: number;
    lastInterest: iBigInt;
    /**
     * WARNING: Do not use this value anymore
     * mode STRATEGY -> NET INTEREST
     * mode CREDIT -> GROSS INTEREST
     * @deprecated
     */
    expectedInterest: iBigInt;
    deposits: iBigInt;
    duration: number;
    bufferDuration?: number;
    unclaimedFees: iBigInt;
    contractValue?: iBigInt;
    epochNumber?: number;
    startDate?: string;
    endDate?: string;
    startCureDate?: string;
    count?: number;
    status: VautlBlockEpochStatus;
    withdrawType?: VaultEpochWithdrawType;
    depositQueue?: VaultBlockCdoEpochQueue;
    withdrawQueue?: VaultBlockCdoEpochQueue;
    instantWithdraws?: VaultBlockCdoEpochInstantWithdraws;
    withdraws?: VaultBlockCdoEpochWithdraws;
}
export declare function sVaultBlockCdoEpoch(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockCdoEpochQueue {
    amount: iBigInt;
    lastAmount?: iBigInt;
    isInstant?: boolean;
    epochWithdrawPrice?: iBigInt;
}
export declare function sVaultBlockCdoEpochQueue(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockCdoEpochInstantWithdraws {
    disabled?: boolean;
    deadline?: string;
    allowed: boolean;
    delay: number;
    amount: iBigInt;
    aprDelta: number;
}
export declare function sVaultBlockCdoEpochInstantWithdraws(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockCdoEpochWithdraws {
    amount: iBigInt;
    fees: iBigInt;
}
export declare function sVaultBlockCdoEpochWithdraws(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockCdo {
    APRSplitRatio?: iBigInt;
    currentAARatio?: iBigInt;
}
export declare function sVaultBlockCdo(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockStrategy {
    APR?: iBigInt;
    rewardTokens?: string[];
}
export declare function sVaultBlockStrategy(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockTvl {
    token: iBigInt;
    USD: iBigInt;
    withRequestsToken?: iBigInt;
    withRequestsUSD?: iBigInt;
}
export declare function sVaultBlockTvl(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultApr {
    type: VaultAprType;
    rate: number;
}
export declare function sVaultApr(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlocks {
    current: VaultBlockData;
    last?: VaultBlockData;
}
export type VaultAprType = 'BASE' | 'HARVEST' | 'REWARDS' | 'EPOCH' | 'BUFFER' | 'GROSS' | 'DELTA' | 'NET';
export declare function sVaultAprType(): import("fluent-json-schema").StringSchema;
export interface VaultBlockPool {
    address: string;
    protocol: Web3Protocol;
    rates?: VaultBlockPoolRates;
    utilization?: VaultPoolUtilization;
    available?: VaultBlockPoolAvailable;
    APR?: number;
    underlyingBalance?: iBigInt;
    exchangeRate?: iBigInt;
    totalSupply?: iBigInt;
    tokens?: VaultBlockPoolToken[];
}
export declare function sVaultBlockPool(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockPoolToken {
    tokenAddress: string;
    balance: iBigInt;
    balanceScaled: iBigInt;
}
export declare function sVaultBlockPoolToken(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockAllocation {
    vaultId?: string;
    vaultAddress: string;
    percentage: number;
}
export interface VaultPoolUtilization {
    supplied: iBigInt;
    borrowed: iBigInt;
    rate: number;
}
export interface VaultBlockPoolRates {
    supply: number;
    borrow: number;
}
export interface VaultBlockPoolAvailable {
    toBorrow: iBigInt;
    toWithDraw: iBigInt;
}
export declare enum VaultBlockErrorCodes {
    notFound = "VAULT_BLOCK_NOT_FOUND",
    alreadyExists = "VAULT_BLOCK_ALREADY_EXISTS",
    wrongContractType = "VAULT_BLOCK_WRONG_CONTRACT_TYPE"
}
export declare enum VaultBlockRewardProgramErrorCodes {
    tokenNotFound = "VAULT_BLOCK_REWARD_PROGRAM_TOKEN_NOT_FOUND"
}
export type VaultBlockFields = '_id' | 'vaultId' | 'vaultAddress' | 'block' | 'APRs' | 'APYs' | 'totalSupply' | 'price' | 'TVL' | 'pools' | 'allocations' | 'cdo' | 'cdoEpoch' | 'strategy' | 'requests' | 'totalRequests' | 'current' | 'uspAggregated' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_BLOCK_FIELDS: string[];
export declare const VAULT_BLOCK_SORT_FIELDS: string[];
export interface VaultBlocksSearchQuery extends PageSearchQuery<'block' | 'timestamp', VaultBlockFields> {
    block?: number | number[];
    vaultId?: string | string[];
    vaultAddress?: string | string[];
    'timestamp:lt'?: number;
    'timestamp:lte'?: number;
    'timestamp:gt'?: number;
    'timestamp:gte'?: number;
    'cdoEpoch.status'?: VautlBlockEpochStatus | VautlBlockEpochStatus[];
}
export declare function sVaultBlocksSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export type VautlBlockEpochStatus = 'WAITING' | 'RUNNING' | 'DEFAULTED' | 'CURE';
export declare function sVautlBlockEpochStatus(): import("fluent-json-schema").StringSchema;
export interface VaultBlocksClientModel {
    create: (body: VaultBlockData) => Promise<VaultBlock>;
    search: (params?: VaultBlocksSearchQuery) => Promise<Page<VaultBlock>>;
    searchAll: (params?: VaultBlocksSearchQuery) => Promise<Page<VaultBlock>>;
    list: (params?: VaultBlocksSearchQuery) => Promise<VaultBlock[]>;
    listAll: (params?: VaultBlocksSearchQuery) => Promise<VaultBlock[]>;
    findOne: (params?: VaultBlocksSearchQuery) => Promise<VaultBlock | undefined>;
    readOne: (params: VaultBlocksSearchQuery) => Promise<VaultBlock>;
}
export declare enum VaultBlockRoutes {
    v1Create = "v1/vault-blocks",
    v1Delete = "v1/vault-blocks/:vaultBlockId",
    v1Read = "v1/vault-blocks/:vaultBlockId",
    v1Update = "v1/vault-blocks/:vaultBlockId",
    v1Search = "v1/vault-blocks"
}
export declare function sVaultBlockData(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export declare function sVaultBlockPoolRates(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultPoolUtilization(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultBlockPoolAvailable(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultBlockAllocation(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultBlocks(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export {};
