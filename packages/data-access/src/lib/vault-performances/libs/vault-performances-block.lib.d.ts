import BigNumber from 'bignumber.js';
import { Block } from '../../core';
import { Token, TokenPriceData } from '../../tokens';
import { Transaction } from '../../transactions';
import { VaultBlockData, VaultBlocks } from '../../vault-blocks';
import { VaultBlockEarnings, VaultBlockPerformance, VaultPerformance } from '../vault-performance.model';
import { WalletBlock } from '../../wallet-blocks';
import { VaultEpoch } from '../../vault-epochs';
import { Vault } from '../../vaults';
/**
 * Vault performance initial state
 */
export declare const VAULT_PERFORMANCE: VaultBlockPerformance;
/**
 * Init vault performance object
 * @param options partial vault performance
 * @returns vault performance object
 */
export declare function initVaultPerformance(performance?: Partial<VaultBlockPerformance>): VaultBlockPerformance;
export declare function initVaultEarnings(earnings?: Partial<VaultBlockEarnings>): VaultBlockEarnings;
/**
 * Calculate earnings percentage between two vault blocks
 * @param vaultBlocks current and last vault blocks
 * @returns earnings percentage
 */
export declare function getEarningsPercentage({ current, last, }: VaultBlocks): BigNumber;
/**
 * Calculate wallet earnings using transaction price
 * @param earnings earnings accumulator
 * @param token underlying token
 * @param transaction transaction entity
 * @param lastVaultBlock last vault block entity
 * @returns earnings generated for the transaction
 */
export declare function calculateTransactionEarnings(earnings: BigNumber, token: Token, transaction: Transaction, lastVaultBlock: VaultBlockData): BigNumber;
/**
 * Calculate earnings using transactions price
 * @param token underlying token
 * @param lastVaultBlock last vault block
 * @param transactions transactions entities
 * @returns total earnings generated
 */
export declare function calculateTransactionsEarnings(token: Token, lastVaultBlock: VaultBlockData, transactions?: Transaction[]): BigNumber;
/**
 * Get vault earnings in underlying token
 * @param token token entity
 * @param vaultBlocks current and last vault blocks
 * @param redeemTransactions redeems transactions
 * @returns vault earnings in underlying tokens
 */
export declare function getVaultEarningsToken(token: Token, { current, last }: VaultBlocks, redeemTransactions?: Transaction[]): BigNumber;
/**
 * Calculate vault performance earnings
 * @param token vault token entity
 * @param vaultBlocks last and current vault block
 * @param tokenPriceData token USD conversion data
 * @param redeemTransactions transactions with type REDEEM for the current block
 * @returns the vault earnings
 */
export declare function getVaultEarnings(token: Token, { current, last }: VaultBlocks, { price }: TokenPriceData, redeemTransactions?: Transaction[]): VaultBlockEarnings;
/**
 * Get seconds between current and last vault block
 * @param block current block
 * @param lastVaultBlock last vault block data
 * @returns Seconds passed between two blocks
 */
export declare function getSecondsBetweenBlocks(block: Block, lastVaultBlock: VaultBlockData): number;
export declare function getVaultPerformanceAge({ current, last }: VaultBlocks, epochsDuration?: number): number;
export declare function getVaultRealizedAPR(age: number, earningsPercentage: number): number;
/**
 * Calculate realized APY
 * @param secondsBetweenBlocks seconds between last and current vault block
 * @param earningsPercentage earnings generated between blocks in percentage
 * @returns realized APY
 */
export declare function getVaultRealizedAPY(age: number, earningsPercentage: number, compoundingPeriod?: number): number;
/**
 * Get vault finished epochs between blocks
 * @param vaultEpochs vault epochs
 * @param currLastBlocks vault current and prev blocks
 * @param lastWalletBlock last wallet block with balance
 * @returns vault finished epochs
 */
export declare function getVaultFinishedEpochs(vaultEpochs: VaultEpoch[], currLastBlocks: VaultBlocks, lastWalletBlock?: WalletBlock): VaultEpoch[];
export declare function getVaultEpochPerformance(vaultEpochs: VaultEpoch[], { current, last }: VaultBlocks, latestWalletBlockWithBalance: WalletBlock | undefined, token: Token, tokenPrice: TokenPriceData, walletBlocksHolders?: WalletBlock[], lastPerformance?: VaultPerformance, redeemTransactions?: Transaction[]): VaultBlockPerformance;
/**
 * Get vault performance options by vault contract type
 * @param vault vault object
 * @param vaultEpochs vault epochs
 * @param vaultBlocks vault current and previous blocks
 * @param latestWalletBlockWithBalance latest wallet block with balance
 * @returns vault performance options including age and compounding period
 */
export declare function getVaultPerformanceOptions(vault: Vault, vaultEpochs: VaultEpoch[], vaultBlocks: VaultBlocks, latestWalletBlockWithBalance: WalletBlock | undefined): {
    age: number;
    epochs?: number;
    avgAPY?: number;
    avgAPR?: number;
    compoundingPeriod: number;
};
/**
 * Calculate vault performances
 * @param block - the current block
 * @param vaultBlocks - the current and the latest blocks
 * @param tokenData - the token data
 * @returns the current vault performance
 */
export declare function getVaultPerformance({ current, last }: VaultBlocks, token: Token, tokenPrice: TokenPriceData, options: {
    age?: number;
    avgAPY?: number;
    compoundingPeriod?: number;
    walletBlocksHolders?: WalletBlock[];
    lastPerformance?: VaultPerformance;
    redeemTransactions?: Transaction[];
}): VaultBlockPerformance;
/**
 * Calculate performance aggregation
 * @param currentPerformance - the performance of the current block
 * @param vaultBlocks - the current and the latest blocks
 * @returns the aggregation of the performances
 */
export declare function getVaultAggregatedPerformance(currentPerformance: VaultBlockPerformance, lastPerformance?: VaultBlockPerformance): VaultBlockPerformance;
