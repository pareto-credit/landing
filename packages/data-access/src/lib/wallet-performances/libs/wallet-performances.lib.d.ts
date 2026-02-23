import BigNumber from 'bignumber.js';
import { iBigInt } from '../../core';
import { WalletBlockAmounts, WalletBlockEarnings, WalletBlockPerformance, WalletDeposits, WalletDistributedRewards, WalletPortfolio, WalletPosition, WalletPositionChain, WalletPositionOperator, WalletPositionToken, WalletVaultHistory } from '../wallet-performance.model';
import { VaultBlock, VaultBlocks } from '../../vault-blocks';
import { WalletBlock, WalletBlockDistributedRewards } from '../../wallet-blocks';
import { TokenBlock } from '../../token-blocks';
import { Token, TokenPriceData } from '../../tokens';
import { VaultEpoch } from '../../vault-epochs';
import { Vault, WalletEpochStats, VaultRewardProgramFrequency } from '../../vaults';
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
export declare function makeWalletVaultPerformancePoints(vault: Vault, token: Token, vaultBlocks: VaultBlock[], walletBlocks: WalletBlock[], walletVaultRewards: WalletDistributedRewards[], tokenBlocks: TokenBlock[], vaultEpochs: VaultEpoch[]): WalletBlockPerformance[];
/**
 * Get vault epoch holders journeys paginated
 * @param vaultEpochId vault epoch
 * @param options system options
 * @returns holders journeys page
 */
export declare function getWalletVaultHistory(vault: Vault, vaultEpochs: VaultEpoch[], vaultBlocks: VaultBlock[], walletBlocks: WalletBlock[], transactions: Transaction[], feePercentage?: number): WalletVaultHistory[];
export declare function getWalletBalances(vault: Vault, vaultBlocks: VaultBlocks, walletBlocks: {
    current: WalletBlock | undefined;
    last: WalletBlock | undefined;
}): {
    lpBalance: iBigInt;
    tokenBalance: iBigInt;
    stakedBalance?: iBigInt;
    poolsBalance?: iBigInt;
};
export declare function makeWalletVaultHistory(vault: Vault, vaultEpochs: VaultEpoch[], vaultBlocks: VaultBlocks, walletBlocks: {
    current: WalletBlock | undefined;
    last: WalletBlock | undefined;
}, transaction: Transaction, feePercentage?: number): WalletVaultHistory;
export declare function makeWalletVaultEarningsPercentage(balance: iBigInt, earnings: WalletEpochStats['earnings']): WalletEpochStats['earningsPercentage'];
export declare function makeWalletVaultEarnings(balance: iBigInt, currentPrice: iBigInt, nextPrice: iBigInt, feePercentage?: number): WalletEpochStats['earnings'];
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
        token?: iBigInt;
        vault?: iBigInt;
    };
    redeemable: {
        USD: string;
        token?: iBigInt;
        vault?: iBigInt;
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
export declare function calculateWalletAvgPriceAccumulator(num: BigNumber, den: BigNumber, transaction: Transaction): {
    num: BigNumber;
    den: BigNumber;
};
export declare function calculateWalletDeposits(deposits: WalletBlockAmounts, transaction: Transaction): WalletBlockAmounts;
export declare function makeWalletVaultDeposits(token: Token, transactions: Transaction[], tokenPriceData: TokenPriceData, walletLatestBlock: WalletBlock, vaultLatestBlock: VaultBlock): WalletDeposits;
