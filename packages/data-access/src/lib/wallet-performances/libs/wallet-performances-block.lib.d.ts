import { Token, TokenPriceData } from '../../tokens';
import { Block, iBigInt, Reward } from '../../core';
import { WalletBlockAmounts, WalletBlockEarnings, WalletBlockPerformance, WalletDistributedRewards, WalletPerformance, WalletPortfolio, WalletPosition, WalletPositionToken } from '../wallet-performance.model';
import { WalletBlock, WalletBlockData } from '../../wallet-blocks';
import { VaultBlock, VaultBlocks } from '../../vault-blocks';
import { VaultBlockPerformance } from '../../vault-performances';
import { Vault } from '../../vaults';
/**
 * Init wallet performance object
 * @param options partial vault performance
 * @returns wallet performance object
 */
export declare function initWalletPerformance(performance?: Partial<WalletBlockPerformance>): WalletBlockPerformance;
/**
 * Init wallet performance object
 * @param options partial vault performance
 * @returns wallet performance object
 */
export declare function initWalletPortfolio(position?: Partial<WalletPortfolio>): WalletPortfolio;
/**
 * Init wallet position object
 * @param options partial vault position
 * @returns wallet position object
 */
export declare function initWalletPosition(position?: Partial<WalletPosition>): WalletPosition;
/**
 * Init wallet earnings object
 * @param earnings partial earnings
 * @returns wallet earnings object
 */
export declare function initWalletEarnings(earnings?: Partial<WalletBlockEarnings>): WalletBlockEarnings;
/**
 * Init wallet block amounts object
 * @param options partial wallet block amounts
 * @returns wallet block amounts object
 */
export declare function initWalletBlockAmounts(amounts?: Partial<WalletBlockAmounts>): WalletBlockAmounts;
/**
 * Calculate wallet earnings
 * @param token vault token entity
 * @param tokenBalance wallet balance in underlying tokens
 * @param earningsPercentage earnings percentage
 * @param tokenPriceData token USD conversion data
 * @returns the wallet earnings
 */
export declare function getWalletEarnings(token: Token, tokenBalance: iBigInt, earningsPercentage: number, { price }: TokenPriceData): WalletBlockEarnings;
/**
 * Calculate wallet rewards eranings
 * @param distributedRewards distributed rewards
 * @returns wallet rewards earnings
 */
export declare function getWalletRewardsEarnings(distributedRewards: WalletDistributedRewards[]): WalletBlockEarnings;
/**
 * Calculate age between current block and last wallet performance block
 * @param block current block
 * @param lastWalletBlock last wallet block
 * @param lastWalletPerformance last wallet performance block
 * @returns age in seconds
 */
export declare function calculateWalletPerformanceAge(block: Block, lastWalletBlock: WalletBlockData, lastWalletPerformance: WalletPerformance | undefined): number;
/**
 * Calculate wallet last performance
 * @param lastWalletBlock - the last wallet block
 * @param lastWalletPerformance - the last performance of the wallet
 * @param vaultBlocks - the current and last vault blocks
 * @param currentVaultPerformance - the current vault performance
 * @param tokenPriceData - the token price data
 * @returns the current wallet performance
 */
export declare function getWalletPerformance(vault: Vault, token: Token, lastWalletBlock: WalletBlockData, lastWalletPerformance: WalletPerformance | undefined, { current: currentVault, last: lastVault }: VaultBlocks, vaultPerformance: VaultBlockPerformance, tokenPrice: TokenPriceData, distributedRewards?: WalletDistributedRewards[]): WalletBlockPerformance;
/**
 * Aggregate rewards earnings by tokenId
 * @param rewards distributed rewards
 * @returns aggregated earnings
 */
export declare function getWalletAccruedRewards(rewards: WalletDistributedRewards[]): Reward[];
/**
 * Calculate performance aggregation
 * @param currentPerformance - the performance of the current block
 * @param lastPerformance - the performance of the latest block
 * @returns the aggregation of the performances
 */
export declare function getWalletAggregatedPerformance(currentPerformance: WalletPerformance, lastPerformance?: WalletBlockPerformance): WalletBlockPerformance;
/**
 * Get vault tokens staked in pools
 * @param vault vault entity
 * @param walletBlock wallet block entity
 * @param options mongodb options
 * @returns wallet pools tokens balances
 */
export declare function getWalletPoolsTokens(vault: Vault, token: Token, walletBlock: WalletBlock, vaultBlock: VaultBlock): WalletPositionToken[];
/**
 * Get Pendle wallet position tokens grouped by ref
 * This function properly handles Pendle pools avoiding double-counting
 * and excluding YT tokens in LP performance context
 *
 * @param vault vault entity
 * @param token vault token
 * @param walletBlock wallet block entity
 * @param timestamp current timestamp for maturity filtering
 * @returns wallet position tokens for Pendle pools
 */
export declare function getPendleWalletPositionTokens(vault: Vault, token: Token, walletBlock: WalletBlock, timestamp?: number): WalletPositionToken[];
