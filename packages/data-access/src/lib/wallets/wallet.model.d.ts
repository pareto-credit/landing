import { WalletPortfolio, WalletPosition, WalletVaultHistory } from '../wallet-performances';
import { ClientEntity, iBigInt, Block, PageSearchQuery, Page } from '../core';
import { VaultContractType, VaultsSearchQuery } from '../vaults';
import { User } from '../users';
/**
 * Client Wallet interface
 */
export interface Wallet extends WalletData, ClientEntity {
}
export declare function sWallet(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface WalletData extends WalletBody {
    address: string;
}
export declare function sWalletData(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface WalletBody {
    userId?: string;
    referralCode?: string;
    ens?: string;
    signatures?: WalletSignature[];
    campaigns?: WalletCampaign[];
    affiliates?: WalletAffiliate[];
    referred?: WalletReferred[];
}
export declare function sWalletBody(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletUserBody {
    name?: string;
    email?: string;
    telegram?: string;
}
export declare function sWalletUserBody(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletContractData {
    balance?: iBigInt;
    allowance?: iBigInt;
}
export interface WalletAmounts {
    balance: iBigInt;
    allowance: iBigInt;
}
export interface WalletSignature {
    _id: string;
    hash: string;
    signedOn: string;
}
export declare function sWalletSignature(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletCampaign {
    _id: string;
    referralCode: string;
    activatedOn: string;
}
export declare function sWalletCampaign(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletAffiliate {
    _id: string;
    address: string;
    activatedOn: string;
}
export declare function sWalletAffiliate(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletReferred extends WalletAffiliate {
    referralCode: string;
}
export declare function sWalletReferred(): import("fluent-json-schema").ExtendedSchema;
export interface WalletPortfolioQuery extends WalletPortfolioFilters, VaultsSearchQuery {
}
export declare function sWalletPortfolioQuery(): import("fluent-json-schema").ExtendedSchema;
export interface WalletPortfolioFilters {
    vaultId?: string | string[];
    'block:gte'?: Block['number'];
    'block:lte'?: Block['number'];
    'timestamp:gte'?: Block['timestamp'];
    'timestamp:lte'?: Block['timestamp'];
}
export declare function sWalletPortfolioFilters(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletAccess {
    vaults: WalletVault[];
    canAccessManager: boolean;
}
export declare function sWalletAccess(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface WalletVault {
    vaultId: string;
    contractType: VaultContractType;
    role: WalletRole;
}
export declare function sWalletVault(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type WalletRole = 'MANAGER' | 'BORROWER';
export declare function sWalletRole(): import("fluent-json-schema").StringSchema;
export declare enum WalletErrorCodes {
    vaultsMissing = "VAULT_IDS_MISSING",
    alreadyExists = "WALLET_ALREADY_EXISTS",
    notDeletable = "WALLET_NOT_DELETABLE",
    malformed = "WALLET_ADDRESS_MALFORMED",
    notFound = "WALLET_NOT_FOUND"
}
export declare enum WalletRoutes {
    v1Access = "v1/wallets/:walletId/access",
    v1Create = "v1/wallets",
    v1Delete = "v1/wallets/:walletId",
    v1Ensure = "v1/wallets/ensure",
    v1Perform = "v1/wallets/:walletId/perform",
    v1Portfolio = "v1/wallets/:walletId/portfolio",
    v1Read = "v1/wallets/:walletId",
    v1Referral = "v1/wallets/:walletId/referral",
    v1Search = "v1/wallets",
    v1Update = "v1/wallets/:walletId",
    v1User = "v1/wallets/:walletId/user",
    v1Vaults = "v1/wallets/:walletId/vaults",
    v1History = "v1/wallets/:walletId/history/:vaultId"
}
export type WalletFields = '_id' | 'address' | 'userId' | 'ens' | 'signatures' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const WALLET_FIELDS: string[];
export declare const WALLET_SORT_FIELDS: string[];
export declare function sWalletsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export type WalletSideData = 'kyc' | 'position' | 'signature' | 'balance' | 'deposit' | 'withdrawable' | 'depositAllowance' | 'depositSpender' | 'withdrawSpender' | 'withdrawAllowance';
export interface WalletsSearchQuery extends PageSearchQuery<'address', WalletFields> {
    address?: string;
}
export declare enum WalletsRoutingKey {
    paretoEvents = "pareto.wallet.*",
    paretoPerform = "pareto.wallet.perform"
}
export type WalletVaultHistorySort = 'timestamp';
export interface WalletVaultHistoryQuery extends PageSearchQuery<WalletVaultHistorySort, ''> {
}
export interface WalletsClientModel {
    search: (params?: WalletsSearchQuery) => Promise<Page<Wallet>>;
    list: (params?: WalletsSearchQuery) => Promise<Wallet[]>;
    findOne: (params?: WalletsSearchQuery) => Promise<Wallet | undefined>;
    readOne: (params: WalletsSearchQuery) => Promise<Wallet>;
    portfolio: (walletId: string, params?: WalletPortfolioQuery) => Promise<WalletPortfolio>;
    vaults: (walletId: string, params?: WalletPortfolioQuery) => Promise<WalletPosition[]>;
    vault: (walletId: string, vaultId: string, params?: WalletVaultHistoryQuery) => Promise<Page<WalletVaultHistory>>;
    ensure: (address: string) => Promise<Wallet>;
    user: (walletId: string, body: {
        name?: string;
        email?: string;
        telegram?: string;
    }) => Promise<User>;
    referral: (walletId: string, referral: string) => Promise<Wallet>;
    access: (walletId: string) => Promise<WalletAccess>;
}
