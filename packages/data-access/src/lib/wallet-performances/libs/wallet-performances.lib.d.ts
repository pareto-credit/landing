import BigNumber from 'bignumber.js';
import { Block } from '../../core';
import { WalletBlockAmounts, WalletBlockEarnings, WalletDeposits, WalletDistributedRewards, WalletPortfolio, WalletPosition, WalletPositionChain, WalletPositionOperator, WalletPositionToken } from '../wallet-performance.model';
import { VaultBlock } from '../../vault-blocks';
import { WalletBlock, WalletBlockDistributedRewards } from '../../wallet-blocks';
import { TokenBlock } from '../../token-blocks';
import { Token, TokenPriceData } from '../../tokens';
import { VaultEpoch } from '../../vault-epochs';
import { Vault, VaultRewardProgramFrequency } from '../../vaults';
import { Transaction } from '../../transactions';
/**
 * Get wallet position total USD
 * @param walletPosition wallet position object
 * @returns wallet position total USD
 */
export declare function getPositionTotalUSD(walletPosition: WalletPosition): BigNumber;
/**
 * Aggregate tokens data for aggregated wallet performance
 * @param tokens current tokens data
 * @param walletPosition wallet vault position
 * @returns tokens aggregated data
 */
export declare function aggregateTokens(tokens: WalletPositionToken[], walletPosition: WalletPosition): WalletPositionToken[];
/**
 * Aggregate chains data for aggregated wallet performance
 * @param chains current chains data
 * @param walletPosition wallet vault position
 * @returns chains aggregated data
 */
export declare function aggregateChains(chains: WalletPositionChain[], walletPosition: WalletPosition): WalletPositionChain[];
/**
 * Aggregate tokens data for aggregated wallet performance
 * @param tokens current tokens data
 * @param walletPosition wallet vault position
 * @returns tokens aggregated data
 */
export declare function aggregateOperators(operatorIds: string[], operators: WalletPositionOperator[], walletPosition: WalletPosition): WalletPositionOperator[];
/**
 * Aggregate vaults data
 * @param portfolio the wallet portfolio data
 * @param position - the wallet position
 * @param vault - the vault
 * @returns the vaults data
 */
export declare function aggregateVaults(portfolio: WalletPortfolio, position: WalletPosition): {
    vaultIds: string[];
    earnings: WalletBlockEarnings;
    deposits: {
        USD: string;
        token?: string | undefined;
        vault?: string | undefined;
    };
    redeemable: {
        USD: string;
        token?: string | undefined;
        vault?: string | undefined;
    };
    pendingDeposits: {
        USD: string;
    };
    pendingWithdraws: {
        USD: string;
    };
    realizedAPY: number;
    accruedRewards: import("../../core").Reward[];
    rewardsRealizedAPY: number;
};
/**
 * Get wallet performances for a specific vault
 * @param vault vault
 * @param token token
 * @param vaultBlocks vault blocks
 * @param walletBlocks wallet blocks
 * @param walletVaultRewards wallet vault rewards
 * @param tokenBlocks token blocks
 * @param vaultEpochs vault epochs
 * @param latestVaultBlock latest vault block
 * @param walletVaultDeposits wallet vault deposited
 * @param tokens wallet position tokens
 * @returns wallet vault performances
 */
export declare function makeWalletVaultPerformance(vault: Vault, token: Token, vaultBlocks: VaultBlock[], walletBlocks: WalletBlock[], walletVaultRewards: WalletDistributedRewards[], tokenBlocks: TokenBlock[], vaultEpochs: VaultEpoch[], latestVaultBlock: VaultBlock, walletVaultDeposits: WalletDeposits, tokens: WalletPositionToken[]): WalletPosition;
/**
 * Make distributed reward performance for wallet portfolio
 * @param vault vault entity
 * @param token token entity
 * @param walletBlock wallet block entity
 * @param distributedReward distributed reward object
 * @param tokenPrice token price at specific block
 * @returns distributed rewards performance
 */
export declare function makeWalletDistributedReward(vault: Vault, token: Token, walletBlock: WalletBlock, distributedReward: WalletBlockDistributedRewards, tokenPrice: string): WalletDistributedRewards;
/**
 * Calculate APR from distributed rewards
 * @param distributedAmountUSD amount received in USD
 * @param balanceUSD wallet balance in USD
 * @param distributionFrequency reward program distribution frequency
 * @returns APR from distributed rewards
 */
export declare function calculateDistributedRewardAPR(distributedAmountUSD: string, balanceUSD: string, distributionFrequency: VaultRewardProgramFrequency): number;
export declare function calculateWalletFirstBlock(deposits: WalletBlockAmounts, transaction: Transaction, firstBlock?: Block): Block | undefined;
export declare function calculateWalletAvgPriceAccumulator(num: BigNumber, den: BigNumber, transaction: Transaction): {
    num: BigNumber;
    den: BigNumber;
};
export declare function calculateWalletDeposits(deposits: WalletBlockAmounts, transaction: Transaction): WalletBlockAmounts;
export declare function makeWalletVaultDeposits(token: Token, transactions: Transaction[], tokenPriceData: TokenPriceData, walletLatestBlock: WalletBlock, vaultLatestBlock: VaultBlock): WalletDeposits;
