import { Block, ClientEntity, Page, PageSearchQuery, iBigInt } from '../core';
import { Web3Protocol } from '../web3-client';
import { VaultEpochWithdrawType } from '../vault-epochs';
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
export declare function sVaultBlockInterestRates(): import("fluent-json-schema").ObjectSchema<{
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
    totalSupply: iBigInt;
    price: iBigInt;
    TVL?: VaultTvl;
    cdo?: VaultContractCdoData;
    cdoEpoch?: VaultContractCdoEpochData;
    strategy?: VaultContractStrategyData;
    pools?: VaultPoolBlock[];
    allocations?: VaultAllocation[];
    previous?: VaultBlockBody;
    requests?: VaultBlockRequest[];
    totalRequests?: VaultBlockTotalRequests;
    rewardPrograms?: VaultBlockRewardProgram[];
}
export declare function sVaultBlockBody(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockRequest {
    type: VaultBlockRequestType;
    amount: iBigInt;
    block: Block;
    isInstant?: boolean;
    requestedOn: string;
    walletId: string;
    walletAddress: string;
    status: VaultBlockRequestStatus;
    epochNumber?: number;
}
export type VaultBlockRequestStatus = 'PENDING' | 'PROCESSED' | 'CLAIMABLE' | 'INSTANT_CLAIMABLE' | 'CLAIMED';
export declare function sVaultBlockRequestStatus(): import("fluent-json-schema").StringSchema;
export type VaultBlockRequestType = 'DEPOSIT' | 'WITHDRAW' | 'REDEEM';
export declare function sVaultBlockRequestType(): import("fluent-json-schema").StringSchema;
export declare function sVaultBlockRequest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockTotalRequests {
    DEPOSIT?: VaultBlockDepositTotalRequest;
    WITHDRAW?: VaultBlockWithdrawTotalRequest;
    REDEEM?: VaultBlockRedeemTotalRequest;
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
export interface VaultContractCdoEpochData {
    apr: number;
    lastApr?: number;
    lastInterest: iBigInt;
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
    depositQueue?: VaultContractCdoEpochQueueData;
    withdrawQueue?: VaultContractCdoEpochQueueData;
    instantWithdraws?: VaultContractCdoEpochInstantWithdrawsData;
    withdraws?: VaultContractCdoEpochWithdrawsData;
}
export declare function sVaultContractCdoEpochData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractCdoEpochQueueData {
    amount: iBigInt;
    lastAmount?: iBigInt;
    isInstant?: boolean;
}
export declare function sVaultContractCdoEpochQueueData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractCdoEpochInstantWithdrawsData {
    disabled?: boolean;
    deadline?: string;
    allowed: boolean;
    delay: number;
    amount: iBigInt;
    aprDelta: number;
}
export declare function sVaultContractCdoEpochInstantWithdrawsData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractCdoEpochWithdrawsData {
    amount: iBigInt;
    fees: iBigInt;
}
export declare function sVaultContractCdoEpochWithdrawsData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractCdoData {
    APRSplitRatio?: iBigInt;
    currentAARatio?: iBigInt;
}
export declare function sVaultContractCdoData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractStrategyData {
    APR?: iBigInt;
    rewardTokens?: string[];
}
export declare function sVaultContractStrategyData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultTvl {
    token: iBigInt;
    USD: iBigInt;
    withRequestsToken?: iBigInt;
    withRequestsUSD?: iBigInt;
}
export declare function sVaultTvl(): import("fluent-json-schema").ObjectSchema<{
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
export interface VaultPoolBlock {
    address: string;
    protocol: Web3Protocol;
    rates: VaultPoolBlockRates;
    utilization: VaultPoolUtilization;
    available: VaultPoolBlockAvailable;
}
export interface VaultAllocation {
    vaultId?: string;
    vaultAddress: string;
    percentage: number;
}
export interface VaultPoolUtilization {
    supplied: iBigInt;
    borrowed: iBigInt;
    rate: number;
}
export interface VaultPoolBlockRates {
    supply: number;
    borrow: number;
}
export interface VaultPoolBlockAvailable {
    toBorrow: iBigInt;
    toWithDraw: iBigInt;
}
export declare enum VaultBlockErrorCodes {
    notFound = "VAULT_BLOCK_NOT_FOUND",
    alreadyExists = "VAULT_BLOCK_ALREADY_EXISTS",
    wrontContractType = "VAULT_BLOCK_WRONG_CONTRACT_TYPE"
}
export declare enum VaultBlockRewardProgramErrorCodes {
    tokenNotFound = "VAULT_BLOCK_REWARD_PROGRAM_TOKEN_NOT_FOUND"
}
export declare enum VaultBlockRequestErrorCodes {
    notMatching = "VAULT_BLOCK_REQUEST_NOT_MATCHING",
    notClaimable = "VAULT_BLOCK_REQUEST_NOT_CLAIMABLE",
    epochNumber = "VAULT_BLOCK_REQUEST_INVALID_EPOCH_NUMBER",
    wrongStatus = "VAULT_BLOCK_REQUEST_WRONG_STATUS",
    wrongType = "VAULT_BLOCK_REQUEST_WRONG_TYPE"
}
export type VaultBlockFields = '_id' | 'vaultId' | 'vaultAddress' | 'block' | 'APRs' | 'totalSupply' | 'price' | 'TVL' | 'pools' | 'allocations' | 'cdo' | 'cdoEpoch' | 'strategy' | 'requests' | 'totalRequests' | 'current' | 'aggregated' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_BLOCK_FIELDS: string[];
export declare const VAULT_BLOCK_SORT_FIELDS: string[];
export interface VaultBlocksSearchQuery extends PageSearchQuery<'block' | 'timestamp', VaultBlockFields> {
    block?: string | string[];
    vaultId?: string | string[];
    vaultAddress?: string | string[];
    'cdoEpoch.status'?: VautlBlockEpochStatus | VautlBlockEpochStatus[];
}
export declare function sVaultBlocksSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export type VautlBlockEpochStatus = 'WAITING' | 'RUNNING' | 'DEFAULTED' | 'CURE';
export declare function sVautlBlockEpochStatus(): import("fluent-json-schema").StringSchema;
export interface VaultBlocksClient {
    create: (body: VaultBlockData) => Promise<VaultBlock>;
    search: (params?: VaultBlocksSearchQuery) => Promise<Page<VaultBlock>>;
    list: (params?: VaultBlocksSearchQuery) => Promise<VaultBlock[]>;
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
export declare function sVaultPoolBlock(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultPoolBlockRates(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultPoolUtilization(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultPoolBlockAvailable(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultAllocation(): import("fluent-json-schema").ObjectSchema<{
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
