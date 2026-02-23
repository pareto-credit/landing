import { Block, ClientEntity, iBigInt, Page, PageSearchQuery, UnitTime } from '../core';
import { VaultTemplateType, WalletEpochStats } from '../vaults/vault.model';
import { VaultBlockTvl } from '../vault-blocks';
export interface VaultEpoch extends VaultEpochData, ClientEntity {
}
export declare function sVaultEpoch(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultEpochData extends VaultEpochBody {
    vaultId: string;
    vaultAddress: string;
}
export declare function sVaultEpochData(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultEpochBody {
    block: Block;
    APRs: VaultEpochAPRs;
    APYs?: VaultEpochAPYs;
    TVL: VaultBlockTvl;
    creditExtended: VaultCreditExtended;
    totalSupply: iBigInt;
    price: iBigInt;
    deposits: iBigInt;
    duration: number;
    bufferDuration: number;
    unclaimedFees: iBigInt;
    /**
     * @deprecated Use interest.GROSS instead
     */
    expectedInterest: iBigInt;
    interest?: VaultEpochInterest;
    startDate?: string;
    endDate?: string;
    count: number;
    status: VaultEpochStatus;
    withdrawType: VaultEpochWithdrawType;
    depositQueue?: VaultEpochQueue;
    withdrawQueue?: VaultEpochQueue;
    withdraws?: VaultEpochWithdraws;
    instantWithdraws?: VaultEpochInstantWithdraws;
}
export declare function sVaultEpochBody(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultCreditExtended {
    token: iBigInt;
    USD: iBigInt;
}
export declare function sVaultCreditExtended(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultEpochWithdrawType = 'INSTANT' | 'STANDARD';
export declare function sVaultEpochWithdrawType(): import("fluent-json-schema").StringSchema;
export interface VaultEpochAPYs {
    GROSS: number;
    NET: number;
    FEE: number;
}
export declare function sVaultEpochAPYs(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultEpochAPRs {
    EPOCH: number;
    BUFFER: number;
    CURE?: number;
    GROSS: number;
    NET: number;
    DELTA: number;
}
export declare function sVaultEpochAPRs(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultEpochInterest {
    NET: iBigInt;
    FEE: iBigInt;
    GROSS: iBigInt;
}
export declare function sVaultEpochInterest(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultEpochWithdrawals {
    NET: string;
    INTEREST: string;
    FEE: string;
    GROSS: string;
}
export interface VaultEpochFEEs {
    CYCLE: string;
    WITHDRAWALS: string;
    TOTAL: string;
}
export interface VaultEpochPrincipal {
    PREVIOUS: string;
    DEPOSITS: string;
    WITHDRAWALS: string;
    PRINCIPAL: string;
    TOTAL_SUPPLY: string;
    DELTA: string;
}
export interface VaultEpochDurations {
    EPOCH: number;
    BUFFER: number;
    CURE: number;
    TOTAL: number;
}
export interface VaultEpochAmounts {
    tvl: number | string;
    netInterest: number | string;
    grossInterest?: number | string;
    totalAPR?: number;
    epochBufferAPR?: number;
    lastAPR?: number;
    feePercentage?: number;
}
export interface VaultEpochTimings {
    startDate: string | Date;
    epochDuration: number;
    bufferDuration: number;
    lastEndDate?: string | Date;
}
export type VaultEpochStatus = 'WAITING' | 'RUNNING' | 'DEFAULTED' | 'FINISHED' | 'CURE';
export declare function sVaultEpochStatus(): import("fluent-json-schema").StringSchema;
export interface VaultEpochQueue {
    status: VaultEpochQueueStatus;
    amount: iBigInt;
}
export declare function sVaultEpochQueue(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultEpochQueueStatus = 'PENDING' | 'PROCESSED';
export declare function sVaultEpochQueueStatus(): import("fluent-json-schema").StringSchema;
export interface VaultEpochWithdraws {
    amount: iBigInt;
    fees: iBigInt;
}
export declare function sVaultEpochWithdraws(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultEpochInstantWithdraws {
    amount: iBigInt;
    delay: number;
    aprDelta: number;
    allowed: boolean;
    deadline?: string;
}
export declare function sVaultEpochInstantWithdraws(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultEpochWithdrawsCheck {
    balance: boolean;
    allowance: boolean;
}
export interface VaultEpochProgression {
    endDate: string;
    startDate: string;
    progress: number;
}
export type VaultEpochFields = '_id' | 'block' | 'APRs' | 'TVL' | 'totalSupply' | 'price' | 'deposits' | 'duration' | 'bufferDuration' | 'unclaimedFees' | 'expectedInterest' | 'startDate' | 'endDate' | 'count' | 'status' | 'withdrawType' | 'depositQueue' | 'withdrawQueue' | 'withdraws' | 'instantWithdraws' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_EPOCH_FIELDS: string[];
export declare const VAULT_EPOCH_SORT_FIELDS: string[];
export interface VaultEpochsSearchQuery extends PageSearchQuery<'count' | 'timestamp'> {
    vaultId?: string | string[];
    vaultAddress?: string | string[];
    status?: VaultEpochStatus;
    count?: number;
    'count:lt'?: number;
    'count:lte'?: number;
    'count:gt'?: number;
    'count:gte'?: number;
    'timestamp:gte'?: number;
    'timestamp:lte'?: number;
    startDate?: string;
    'startDate:lt'?: string;
    'startDate:lte'?: string;
    'startDate:gt'?: string;
    'startDate:gte'?: string;
    endDate?: string;
    'endDate:lt'?: string;
    'endDate:lte'?: string;
    'endDate:gt'?: string;
    'endDate:gte'?: string;
}
export declare function sVaultEpochsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface VaultEpochPdfQuery {
    type: VaultTemplateType;
    output?: 'inline' | 'download';
}
export declare function sVaultEpochPdfQuery(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultEpochsClientModel {
    create: (body: VaultEpochData) => Promise<VaultEpoch>;
    search: (params?: VaultEpochsSearchQuery) => Promise<Page<VaultEpoch>>;
    searchAll: (params?: VaultEpochsSearchQuery) => Promise<Page<VaultEpoch>>;
    list: (params?: VaultEpochsSearchQuery) => Promise<VaultEpoch[]>;
    listAll: (params?: VaultEpochsSearchQuery) => Promise<VaultEpoch[]>;
    findOne: (params?: VaultEpochsSearchQuery) => Promise<VaultEpoch | undefined>;
    holders: (vaultEpochId: string, params?: PageSearchQuery) => Promise<Page<WalletEpochStats>>;
    pdf: (vaultEpochId: string, params: VaultEpochPdfQuery) => Promise<ArrayBuffer>;
}
export declare enum VaultEpochRoutes {
    v1Create = "v1/vault-epochs",
    v1Delete = "v1/vault-epochs/:vaultEpochId",
    v1Read = "v1/vault-epochs/:vaultEpochId",
    v1Update = "v1/vault-epochs/:vaultEpochId",
    v1Search = "v1/vault-epochs",
    v1Holders = "v1/vault-epochs/:vaultEpochId/holders",
    v1Pdf = "v1/vault-epochs/:vaultEpochId/pdf"
}
export interface VaultCdoEpochData {
    epoch: VaultEpoch;
    lastEpoch?: VaultEpoch;
    withdrawAmount: string;
    withdrawDeadline: Date;
    instantWithdrawed?: boolean;
    interests: string;
    duration: number;
    durationSeconds: number;
    feePercentage: number;
    unit: UnitTime;
    APRs: VaultEpochAPRs;
    lastAPRs?: VaultEpochAPRs;
    toWithdraw: string;
    isDefaultable: boolean;
}
export declare enum VaultEpochErrorCodes {
    cdoEpochNotFound = "VAULT_EPOCH_CDO_EPOCH_NOT_FOUND",
    interestNotFound = "VAULT_EPOCH_INTEREST_NOT_FOUND"
}
export type MovementRow = {
    label: string;
    amount: string;
    variant?: 'negative';
};
export type EpochHolderRow = {
    label: string;
    startBalance: string;
    endBalance: string;
    interest: string;
    fee: string;
};
