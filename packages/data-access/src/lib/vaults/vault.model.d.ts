import Web3, { Bytes } from 'web3';
import { DeepPartial, DonutChartData, MetaContent, MetaItems, MimeType } from '../core';
import { AbiCode, ERC20Token, GenericContract, Web3ClientModel } from '../web3-client';
import { AbiContract, Block, BlockNumber, ClientEntity, Locales, Page, PageSearchQuery, iBigInt } from '../core';
import { VaultBlock, VaultBlockCdo, VaultBlockCdoEpoch, VaultBlockParetoDollar, VaultBlockStrategy, VaultBlockTvl } from '../vault-blocks';
import { Web3BaseContract, Web3Protocol, Web3ProtocolContract } from '../web3-client';
import { Token } from '../tokens';
import { WalletPosition } from '../wallet-performances';
import { CampaignRule } from '../campaigns';
import { WalletBlock } from '../wallet-blocks';
import { Operator } from '../operators';
import { TransactionType, TransactionTypeCdoEpoch, TransactionTypeParetoDollar } from '../transactions';
/**
 * VAULT MAIN DATA
 */
export interface Vault extends VaultData, ClientEntity {
}
export declare function sVault(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultData {
    tokenId: string;
    chainId: string;
    typeId?: string;
    categoryId?: string;
    operatorIds?: string[];
    name: string;
    address: string;
    symbol: string;
    protocol: Web3Protocol;
    contractType: VaultContractType;
    abi?: AbiContract;
    abiCode?: AbiCode;
    description?: Locales<string>;
    shortDescription?: Locales<string>;
    caption?: Locales<string>;
    keyInfo?: VaultKeyInfo[];
    metaContent?: MetaContent;
    metaItems?: MetaItems;
    visibility: VaultVisibility;
    status: VaultStatus;
    feePercentage: number;
    harvestTokenIds?: string[];
    rewardPrograms?: VaultRewardProgram[];
    rewardEmissions?: VaultRewardEmission[];
    cdo?: VaultCdo;
    cdoEpoch?: VaultCdoEpoch;
    paretoDollar?: VaultParetoDollar;
    paretoToken?: VaultParetoToken;
    strategy?: VaultStrategy;
    pools?: VaultPool[];
    kyc?: VaultKyc;
    signatures?: VaultSignature[];
    integrations?: VaultIntegration[];
    rwa?: VaultRwa[];
    maxCap?: VaultMaxCap;
    minDeposit?: VaultMinDeposit;
    documents?: VaultDocument[];
    campaigns?: VaultCampaign[];
    siblings?: VaultSibling[];
}
export declare function sVaultData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultRwa {
    rwaId: string;
    type?: 'sUSP' | 'USP';
    isActive: boolean;
}
export declare function sVaultRwa(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
/**
 * CDO
 */
export type VaultCdo = Web3BaseContract;
export declare function sVaultCdo(): import("fluent-json-schema").ExtendedSchema;
/**
 * CDO EPOCH
 */
export interface VaultCdoEpoch extends Web3BaseContract {
    manager: VaultOperator;
    borrower: VaultOperator;
    waitingPeriod?: number;
    mode: VaultCdoEpochMode;
    depositQueue?: Web3BaseContract;
    withdrawQueue?: Web3BaseContract;
    writeOff?: GenericContract;
}
export declare function sVaultCdoEpoch(): import("fluent-json-schema").ExtendedSchema;
export type VaultCdoEpochMode = 'STRATEGY' | 'CREDIT';
export type VaultCdoEpochAction = 'DEPOSIT' | 'WITHDRAW' | 'EARLY_WITHDRAW';
export type VaultStrategy = Web3BaseContract;
export declare function sVaultStrategy(): import("fluent-json-schema").ExtendedSchema;
/**
 * PARETO DOLLAR
 */
export interface VaultParetoDollar {
    tokenId: string;
    managers: VaultOperator[];
    queue: Web3BaseContract;
    staking: VaultParetoDollarStaking;
    collaterals?: VaultParetoDollarCollateral[];
}
export declare function sVaultParetoDollar(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultParetoDollarStaking extends Web3BaseContract {
    tokenId: string;
}
export declare function sVaultParetoDollarStaking(): import("fluent-json-schema").ExtendedSchema;
export interface VaultParetoDollarCollateral {
    tokenId: string;
    tokenAddress: string;
}
export declare function sVaultParetoDollarCollateral(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultDollarAction = 'MINT' | 'REDEEM' | 'STAKE' | 'UNSTAKE' | 'SWAP';
/**
 * PARETO TOKEN
 */
export interface VaultParetoToken {
    claim: VaultParetoTokenClaim;
    locking: VaultParetoTokenLocking;
    reward: VaultParetoTokenReward;
}
export declare function sVaultParetoToken(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultParetoTokenClaim extends GenericContract {
}
export declare function sVaultParetoTokenClaim(): import("fluent-json-schema").ExtendedSchema;
export interface VaultParetoTokenLocking extends GenericContract {
    tokenId: string;
    minDuration: number;
    maxDuration: number;
}
export declare function sVaultParetoTokenLocking(): import("fluent-json-schema").ExtendedSchema;
export interface VaultParetoTokenReward extends GenericContract {
}
export declare function sVaultParetoTokenReward(): import("fluent-json-schema").ExtendedSchema;
/**
 * SECONDARY MODELS
 */
export interface VaultIntegrationParams {
    chainId?: number;
    collateralToken?: string;
}
export interface VaultIntegration {
    provider: VaultIntegrationProvider;
    type: VaultIntegrationType;
    tags?: VaultIntegrationTag[];
    params?: VaultIntegrationParams;
}
export interface VaultIntegrationsData {
    APR?: number;
    repoTokenHolders?: TermFinanceHolder[];
}
export type VaultIntegrationTag = 'VAULT' | 'WALLET';
export type VaultIntegrationProvider = 'Usual' | 'Lido' | 'Instadapp' | 'Ethena' | 'Euler' | 'TermFinance';
export type VaultIntegrationType = 'APR' | 'strategyAPR' | 'accountVaults' | 'repoTokenHolders';
export interface TermFinanceHolder {
    address: string;
    repoToken: string;
    balance: iBigInt;
    purchaseToken: string;
}
export declare function sVaultIntegrationProvider(): import("fluent-json-schema").StringSchema;
export declare function sVaultIntegrationType(): import("fluent-json-schema").StringSchema;
export declare function sVaultIntegration(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultIntegrationTag(): import("fluent-json-schema").StringSchema;
export declare function sVaultIntegrationParams(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultIntegrationsData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultOperator {
    address: string;
    operatorId?: string;
}
export declare function sVaultOperator(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultPoolOracle {
    protocol?: Web3Protocol;
    address: string;
    abi?: AbiContract;
    abiCode?: AbiCode;
}
export interface VaultPool extends Web3ProtocolContract {
    ref?: string;
    oracle?: VaultPoolOracle;
    tokens?: VaultPoolToken[];
    poolsRefs?: string[];
    isVisible?: boolean;
    isSyncable?: boolean;
    endDate?: string;
    link?: string;
    description?: Locales;
}
export declare function sVaultPool(): import("fluent-json-schema").ExtendedSchema;
export interface VaultPoolToken extends Web3BaseContract {
    tokenId: string;
}
export declare function sVaultPoolToken(): import("fluent-json-schema").ExtendedSchema;
export type VaultRewardProgramFrequencyUnit = 'D' | 'W' | 'M' | 'Y';
export declare function sVaultRewardProgramFrequencyUnit(): import("fluent-json-schema").StringSchema;
export interface VaultRewardProgramFrequency {
    value: number;
    unit: VaultRewardProgramFrequencyUnit;
}
export declare function sVaultRewardProgramFrequency(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultRewardProgram {
    tokenId: string;
    tokenAddress?: string;
    isActive: boolean;
    distributionType: VaultDistributionType;
    distributionValue: iBigInt;
    distributionFrequency: VaultRewardProgramFrequency;
    startBlock?: number;
    endBlock?: number;
    blocksAmount?: number;
    senderAddresses?: string[];
    excludedAddresses?: VaultRewardAddress[];
}
export declare function sVaultRewardProgram(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultContractType = 'BestYield' | 'CDO' | 'CDO_EPOCH' | 'PARETO_DOLLAR' | 'PARETO_TOKEN';
export declare function sVaultContractType(): import("fluent-json-schema").StringSchema;
export type VaultNonPayableMethodType = 'IS_WALLET_ALLOWED' | 'WALLET_BALANCE' | 'WALLET_DEPOSIT' | 'WALLET_ALLOWANCE' | 'WALLET_ALLOWANCE_LP' | 'WALLET_WITHDRAWABLE' | 'TOKEN_BALANCE' | 'TOKEN_ALLOWANCE' | 'TOKEN_CONVERSION';
export interface VaultNonPayableMethodOptions {
    tokenAddress?: string;
    tokenAmount?: string;
    walletAddress?: string;
    spender?: string;
    pair?: string;
}
export type VaultPayableMethodType = 'START_EPOCH' | 'STOP_EPOCH' | 'STOP_EPOCH_WITH_DURATION' | 'DEFAULT' | 'TOKEN_APPROVE' | 'APPROVE' | 'APPROVE_LP' | 'SET_EPOCH_PARAMS' | 'SET_EPOCH_APR' | 'GET_INSTANT_WITHDRAWS' | 'PROCESS_WITHDRAW_QUEUE' | 'PROCESS_DEPOSIT_QUEUE' | 'PROCESS_WITHDRAWAL_CLAIMS' | 'DEPOSIT' | 'REQUEST_DEPOSIT' | 'WITHDRAW' | 'REQUEST_WITHDRAW' | 'CLAIM_WITHDRAW' | 'CLAIM_INSTANT_WITHDRAW' | 'CLAIM_WITHDRAW_REQUEST' | 'CANCEL_WITHDRAW_REQUEST' | 'CLAIM_DEPOSIT_REQUEST' | 'CANCEL_DEPOSIT_REQUEST' | 'MINT' | 'REQUEST_REDEEM' | 'STAKE' | 'UNSTAKE' | 'CLAIM_REDEEM_REQUEST';
export interface VaultPayableMethodOptions {
    tokenAddress?: string;
    epochAPR?: string;
    epochAPRScaled?: string;
    epochInterests?: string;
    epochDuration?: number;
    epochNumber?: number;
    bufferDuration?: number;
    collateralAddress?: string;
    amount?: string;
    spender?: string;
    overwriteInterests?: boolean;
    assets?: string;
    shares?: string;
    walletAddress?: string;
}
export interface VaultRewardAddress {
    address: string;
    toRedistribute: boolean;
}
export declare function sVaultRewardAddress(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultRewardEmission {
    tokenId: string;
    emissionRate: iBigInt;
    frequency: 'BLOCK' | 'SECOND';
    startBlock?: number;
    endBlock?: number;
}
export declare function sVaultRewardEmission(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultCampaign {
    _id: string;
    rules?: CampaignRule[];
    isActive: boolean;
}
export declare function sVaultCampaign(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultSibling {
    _id: string;
    chainId: string;
}
export declare function sVaultSibling(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultBlockEventBody {
    block: Block;
    vaultData: VaultContractData;
}
export interface VaultTransferBody extends VaultBaseTransactionBody {
    fromAddress?: string;
    toAddress?: string;
}
export interface VaultBaseTransactionBody {
    block: Block;
    transactionHash: string;
    vaultData: VaultContractData;
    transactionInput?: Bytes;
    amount?: iBigInt;
    price?: iBigInt;
    tokenAmount?: iBigInt;
    walletAddress?: string;
    tokenAddress?: string;
    tokenData?: ERC20Token;
}
export declare function sVaultBaseTransactionBody(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultTransferBody(): import("fluent-json-schema").ExtendedSchema;
export interface VaultDistributedRewardsBody {
    block: Block;
    amount: iBigInt;
    tokenAddress: string;
    fromAddress: string;
    toAddress: string;
    transactionHash: string;
    transactionInput?: Bytes;
    vaultData: VaultContractData;
}
export declare function sVaultDistributedRewardsBody(): import("fluent-json-schema").ExtendedSchema;
export interface VaultTransferUSPBody extends VaultTransferBody {
    action: TransactionTypeParetoDollar;
}
export declare function sVaultTransferUSPBody(): import("fluent-json-schema").ExtendedSchema;
export interface VaultTransferEpochBody {
    block: Block;
    amount?: iBigInt;
    walletAddress?: string;
    tokenAmount?: iBigInt;
    transactionHash: string;
    vaultData: VaultContractData;
    action: TransactionTypeCdoEpoch;
    transactionInput?: Bytes;
}
export declare function sVaultTransferEpochBody(): import("fluent-json-schema").ExtendedSchema;
export interface VaultPerformBody {
    block: Block;
}
export interface VaultSyncBlockBody {
    blockNumber?: string;
}
export interface VaultSyncBody {
    startBlock?: string;
    endBlock?: string;
    filters?: VaultSyncEventFilters;
}
export type VaultDistributionType = 'AMOUNT' | 'TARGET_APY';
export declare function sVaultDistributionType(): import("fluent-json-schema").StringSchema;
/**
 * - `HIDDEN`: The vault is not visible to any user. It is completely hidden from the interface.
 * - `RESTRICTED`: The vault is visible only to a specific group of users or under certain conditions. Access is limited.
 * - `PUBLIC`: The vault is visible and accessible to all users without restrictions.
 */
export type VaultVisibility = 'HIDDEN' | 'RESTRICTED' | 'PUBLIC';
export declare function sVaultVisibility(): import("fluent-json-schema").StringSchema;
export type VaultStatus = 'PAUSED' | 'DISABLED' | 'READY' | 'EXPERIMENTAL' | 'BOOSTED';
export declare function sVaultStatus(): import("fluent-json-schema").StringSchema;
export interface VaultsPerformances {
    TVL: iBigInt;
    creditExtended: iBigInt;
    tokens: VaultsPerformancesToken[];
    chains: VaultsPerformancesChain[];
    APRs: VaultsPerformancesAPRs;
    vaults: number;
}
export declare function sVaultsPerformances(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultsPerformancesToken {
    token: string;
    TVL: VaultBlockTvl;
    APR: number;
}
export interface VaultsPerformancesChain {
    chain: string;
    TVL: VaultBlockTvl;
    APR: number;
}
export declare function sVaultsPerformancesToken(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sVaultsPerformancesChain(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultsPerformancesAPRs {
    MAX: number;
    MIN: number;
    AVG: number;
}
export declare function sVaultsPerformancesAPRs(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum VaultErrorCodes {
    collision = "VAULT_COLLISION",
    notFound = "VAULT_NOT_FOUND",
    notDeletable = "VAULT_NOT_DELETABLE",
    blockNotValid = "VAULT_BLOCK_NOT_VALID",
    walletRequired = "VAULT_WALLET_REQUIRED",
    walletNotFound = "VAULT_WALLET_NOT_FOUND",
    integrationError = "VAULT_INTEGRATION_ERROR",
    rewardProgramNotFound = "VAULT_REWARD_PROGRAM_NOT_FOUND",
    paretoDollarWalletNotFound = "VAULT_PARETO_DOLLAR_WALLET_NOT_FOUND"
}
export interface VaultIntegrationsQuery {
    provider?: VaultIntegrationProvider | VaultIntegrationProvider[];
    type?: VaultIntegrationType | VaultIntegrationType[];
    blockNumber?: number;
    tag?: VaultIntegrationTag | VaultIntegrationTag[];
}
export declare function sVaultIntegrationsQuery(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultsPerformancesQuery extends PageSearchQuery {
    symbol?: string;
    status?: VaultStatus;
    chainId?: string | string[];
    visibility?: VaultVisibility;
    contractType?: VaultContractType;
}
export declare function sVaultsPerformancesQuery(): import("fluent-json-schema").ExtendedSchema;
export interface VaultPositionQuery {
    walletId?: string;
    walletAddress?: string;
    'block:gte'?: Block['number'];
    'block:lte'?: Block['number'];
    'timestamp:gte'?: Block['timestamp'];
    'timestamp:lte'?: Block['timestamp'];
}
export declare function sVaultPositionQuery(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultFields = '_id' | 'tokenId' | 'chainId' | 'typeId' | 'categoryId' | 'operatorIds' | 'name' | 'caption' | 'kyc' | 'address' | 'symbol' | 'protocol' | 'contractType' | 'abi' | 'description' | 'visibility' | 'status' | 'feePercentage' | 'harvestTokenIds' | 'rewardPrograms' | 'rewardEmissions' | 'cdo' | 'campaigns' | 'documents' | 'cdoEpoch' | 'rwa' | 'strategy' | 'pools' | 'siblings' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_FIELDS: string[];
export declare const VAULT_SORT_FIELDS: string[];
export type VaultSideData = 'block' | 'token' | 'operator' | 'chain' | 'KYC' | 'epoch' | 'signature' | 'campaign' | 'sibling' | 'yieldSource' | 'performance' | 'limit' | 'walletBlock' | 'walletRequests' | 'walletPosition';
export interface VaultsSearchQuery extends PageSearchQuery<'name', VaultFields> {
    name?: string;
    cdo?: string;
    'name:ct'?: string;
    address?: string;
    manager?: string;
    symbol?: string | string[];
    status?: VaultStatus;
    chainId?: string | string[];
    visibility?: VaultVisibility | VaultVisibility[];
    'visibility:ne'?: VaultVisibility | VaultVisibility[];
    contractType?: VaultContractType | VaultContractType[];
    'cdoEpoch.borrower.address'?: string | string[];
    'cdoEpoch.borrower.operatorId'?: string | string[];
    'cdoEpoch.manager.address'?: string | string[];
    'cdoEpoch.manager.operatorId'?: string | string[];
}
export declare function sVaultsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface VaultsClientModel {
    create: (body: VaultData) => Promise<Vault>;
    search: (params?: VaultsSearchQuery) => Promise<Page<Vault>>;
    list: (params?: VaultsSearchQuery) => Promise<Vault[]>;
    findOne: (params: VaultsSearchQuery) => Promise<Vault | undefined>;
    readOne: (params: VaultsSearchQuery) => Promise<Vault>;
    position: (vaultId: string, params: VaultPositionQuery) => Promise<WalletPosition>;
    performances: (params: VaultsPerformancesQuery) => Promise<VaultsPerformances>;
    sync: (vaultId: string, body: VaultSyncBody) => Promise<number>;
    syncBlock: (vaultId: string, body: VaultSyncBlockBody) => Promise<boolean>;
    block: (vaultId: string, body: VaultBlockEventBody) => Promise<void>;
    perform: (vaultId: string, body: VaultPerformBody) => Promise<void>;
    cure: (vaultId: string) => Promise<void>;
    integrations: (vaultId: string, params: VaultIntegrationsQuery) => Promise<VaultIntegrationsData>;
}
export declare enum VaultsRoutingKey {
    paretoEvents = "pareto.vault.*",
    paretoSync = "pareto.vault.sync",
    paretoWallets = "pareto.vault.wallets",
    paretoCreated = "pareto.vault.created",
    paretoUpdate = "pareto.vault.update",
    paretoTransfered = "pareto.vault.transfered",
    paretoPerformed = "pareto.vault.performed",
    bcEvents = "bc.vault.*",
    bcTransfer = "bc.vault.transfer"
}
export interface VaultSyncEventFilters {
    poolsRefs?: string[];
    events?: string[];
    contracts?: string[];
    transactionTypes?: TransactionType[];
}
export declare function sVaultSyncEventFilters(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractAPRs {
    BASE?: iBigInt;
}
export declare function sVaultContractAPRs(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractData {
    APRs?: VaultContractAPRs;
    allocations?: iBigInt[];
    availableTokens?: string[];
    price?: iBigInt;
    totalSupply?: iBigInt;
    cdo?: VaultContractDataCdo;
    cdoEpoch?: VaultContractDataCdoEpoch;
    paretoDollar?: VaultBlockParetoDollar;
    strategy?: VaultBlockStrategy;
    pools?: VaultContractPoolData[];
    wallets?: VaultWalletData[];
    tokens?: VaultContractTokenData[];
    integrations?: VaultIntegrationsData;
    previous?: VaultContractData;
}
export interface VaultContractDataCdo extends DeepPartial<VaultBlockCdo> {
}
export interface VaultContractDataCdoEpoch extends DeepPartial<VaultBlockCdoEpoch> {
}
export declare function sVaultContractData(): import("fluent-json-schema").ExtendedSchema;
export interface VaultContractTokenData {
    address: string;
    price: iBigInt;
}
export declare function sVaultContractTokenData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultWalletData {
    address: string;
    balance: iBigInt;
    cdoEpoch?: VaultWalletCdoEpochData;
    paretoDollar?: VaultWalletParetoDollarData;
    pools?: VaultWalletPoolData[];
}
export declare function sVaultWalletData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultWalletPoolData {
    lpBalance?: iBigInt;
    balance?: iBigInt;
    address: string;
    protocol: Web3Protocol;
    operatorId?: string;
    tokens?: VaultWalletPoolTokenData[];
}
export declare function sVaultWalletPoolData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultWalletPoolTokenData {
    tokenId?: string;
    tokenAddress: string;
    balance: iBigInt;
    balanceScaled?: iBigInt;
}
export declare function sVaultWalletPoolTokenData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultWalletParetoDollarData {
    stakedBalance?: iBigInt;
    uspBalance?: iBigInt;
}
export declare function sVaultWalletParetoDollarData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultWalletCdoEpochData {
    pendingDepositAmount?: iBigInt;
    pendingWithdrawAmount?: iBigInt;
    withdrawsRequests?: iBigInt;
    instantWithdrawsRequests?: iBigInt;
    writeOff?: VaultWalletCdoEpochWriteOffData;
}
export declare function sVaultWalletCdoEpochData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultWalletCdoEpochWriteOffData {
    tranches: iBigInt;
    underlyings: iBigInt;
}
export declare function sVaultWalletCdoEpochWriteOffData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractPoolData {
    protocol: Web3Protocol;
    address: string;
    supplyRate?: iBigInt;
    borrowRate?: iBigInt;
    exchangeRate?: iBigInt;
    underlyingBalance?: iBigInt;
    utilizationRate?: iBigInt;
    availableToBorrow?: iBigInt;
    availableToWithdraw?: iBigInt;
    totalSupply?: iBigInt;
    totalBorrow?: iBigInt;
    APR?: iBigInt;
    tokensInfo?: VaultContractPoolTokenInfo[];
}
export declare function sVaultContractPoolData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractPoolTokenInfo {
    address: string;
    balance: iBigInt;
    balanceScaled: iBigInt;
    tokenData?: ERC20Token;
}
export declare function sVaultContractPoolTokenInfo(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultKyc {
    policyId: number;
    isActive: boolean;
    isRequired?: boolean;
    link?: string;
    hideSensitiveData?: boolean;
}
export declare function sVaultKyc(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultKycData {
    vaultId: string;
    isActive: boolean;
    isWalletAllowed?: boolean;
}
export interface VaultKeyInfo {
    label: Locales<string>;
    value: Locales<string>;
    link?: string;
}
export declare function sVaultKeyInfo(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultMinDeposit {
    amount: iBigInt;
    isActive: boolean;
    enableTest?: boolean;
}
export declare function sVaultMinDeposit(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultMaxCap {
    amount: iBigInt;
    isActive: boolean;
}
export declare function sVaultMaxCap(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultDocument {
    name: string;
    type: MimeType;
    createdAt: string;
    url: string;
}
export declare function sVaultDocument(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultSignatureEntity = 'ALL' | 'LENDER' | 'MANAGER';
export declare function sVaultSignatureEntity(): import("fluent-json-schema").StringSchema;
export interface VaultSignature {
    _id: string;
    entity: VaultSignatureEntity;
}
export declare function sVaultSignature(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface VaultContractOptions {
    web3?: Web3;
    web3Client?: Web3ClientModel;
    walletAddresses?: string[];
    rewardTokens?: Token[];
}
export interface VaultContractModel {
    vault: Vault;
    getContractData: (blockNumber?: BlockNumber) => Promise<VaultContractData>;
    getValue: <T>(type: VaultNonPayableMethodType, params?: VaultNonPayableMethodOptions) => Promise<T> | undefined;
}
export interface VaultPerformanceValue<T = any> {
    date: string;
    value: number;
    data?: T;
}
export declare enum VaultRoutes {
    v1Create = "v1/vaults",
    v1Delete = "v1/vaults/:vaultId",
    v1Read = "v1/vaults/:vaultId",
    v1Update = "v1/vaults/:vaultId",
    v1Search = "v1/vaults",
    v1Sync = "v1/vaults/:vaultId/sync",
    v1Block = "v1/vaults/:vaultId/block",
    v1Perform = "v1/vaults/:vaultId/perform",
    v1Cure = "v1/vaults/:vaultId/cure",
    v1Performances = "v1/vaults/performances",
    v1Position = "v1/vaults/:vaultId/position",
    v1SyncBlock = "v1/vaults/:vaultId/sync-block",
    v1Integrations = "v1/vaults/:vaultId/integrations",
    v1PerformBlocks = "v1/vaults/:vaultId/perform-blocks",
    v1PerformWallets = "v1/vaults/:vaultId/perform-wallets"
}
/**
 * Vault siblings
 */
export interface VaultSiblingsKeys {
    vaultIds?: string[];
    chainIds?: string[];
}
/**
 * Vault Yield sources
 */
export interface VaultYieldSourcesKeys {
    vaultIds?: string[];
    operatorIds?: string[];
    tokenAddresses?: string[];
}
export interface VaultYieldSourcesData {
    vaults?: Vault[];
    operators?: Operator[];
    tokens?: Token[];
    blocks?: VaultBlock[];
}
export interface VaultYieldSourcesGraphData {
    unlent: {
        value: string;
        percentage: string;
    };
    total: string;
    sources: VaultYieldSourceGraphData[];
}
export type VaultYieldSourceGraphData = DonutChartData<{
    vault?: Vault;
    operator?: Operator;
    token?: Token;
}>;
export interface VaultYieldSourcesSideData {
    vaults?: Vault[];
    tokens?: Token[];
    operators?: Operator[];
}
export interface VaultYieldSourcesGraphOptions {
    primaryColor?: string;
    secondaryColor?: string;
    defaultColor?: string;
    currentKey?: string;
}
export interface WalletEpochStats {
    walletBlock: WalletBlock;
    startDate?: string;
    endDate?: string;
    startBalance: iBigInt;
    endBalance: iBigInt;
    earnings: WalletEpochStatsEarnings;
    earningsPercentage: WalletEpochEarningsPercentage;
}
export interface WalletEpochEarningsPercentage {
    NET: number;
    GROSS: number;
    FEE: number;
}
export interface WalletEpochStatsEarnings {
    NET: iBigInt;
    GROSS: iBigInt;
    FEE: iBigInt;
}
export declare function sWalletEpochStats(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sWalletEpochStatsEarningsPercentage(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sWalletEpochStatsEarnings(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type VaultTemplateParamValue = string | Record<string, string>;
export type VaultTemplateParams = Record<string, VaultTemplateParamValue>;
export interface VaultTemplate {
    name: string;
    content: string;
    filename?: string;
    requiredFields: string[];
    parser?: (params: VaultTemplateParams) => VaultTemplateParams;
    unsafeFields?: string[];
}
export type VaultTemplateType = 'LOAN_NOTICE' | 'CYCLE_REPORT';
export declare function sVaultTemplateType(): import("fluent-json-schema").StringSchema;
export interface VaultTemplateAttachment {
    filename: string;
    content: Uint8Array<ArrayBufferLike>;
}
