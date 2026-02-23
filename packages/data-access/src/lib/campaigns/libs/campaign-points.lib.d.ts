import BigNumber from 'bignumber.js';
import { Transaction } from '../../transactions';
import { Vault, VaultPool } from '../../vaults';
import { WalletBlock, WalletBlockBalanceField } from '../../wallet-blocks';
import { Campaign, CampaignBoost, CampaignMetrics, CampaignMetricsReward, CampaignPoints, CampaignPointsVault, CampaignReward, CampaignRule, CampaignRuleDepositType, CampaignRuleTrigger } from '../campaign.model';
import { Token } from '../../tokens';
import { CampaignPoint } from '../../campaign-points';
import { Web3Protocol } from '../../web3-client';
import { WalletPerformance } from '../../wallet-performances';
import { WalletReferred } from '../../wallets';
/**
 * Get campaign points
 * @param campaign - the campaign
 * @param vaults - the vault campaign
 * @param transactions - the vault transactions
 */
export declare function getCampaignPoints(campaign: Campaign, campaignVaults: Vault[], transactions: Transaction[], walletBlocks: WalletBlock[], tokens: Token[], campaignTokens?: Token[], affiliatedPoints?: CampaignPoint[], affiliatedPerformances?: WalletPerformance[], referred?: WalletReferred[]): CampaignPoints;
/**
 * Get campaign vault points
 * @param campaign - the campaign
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the vault points
 */
export declare function getCampaignVaultPoints(campaign: Campaign, vault: Vault, transactions: Transaction[], walletBlocks: WalletBlock[], token?: Token, campaignTokens?: Token[]): CampaignPointsVault;
/**
 * Get campaign rule vault points
 * @param rule - the campaign rule
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the rule vault points
 */
export declare function getCampaignRuleVaultPoints(campaign: Campaign, rule: CampaignRule, transactions: Transaction[], walletBlocks: WalletBlock[], token: Token, vaultPools: VaultPool[]): CampaignMetrics;
/**
 * Get campaign vault boost points
 * @param rule - the campaign rule
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @param token -  the vault token
 * @returns the rule vault points
 */
export declare function getCampaignBoostVaultPoints(campaign: Campaign, boost: CampaignBoost, walletBlocks: WalletBlock[], token: Token, vaultPools: VaultPool[]): CampaignMetrics;
/**
 * Get campaign boost points
 * @param rule - the campaign rule
 * @param affiliatedPoints - the affiliated points
 * @returns the boost global points
 */
export declare function getCampaignBoostPoints(boost: CampaignBoost, totalPoints: string, affiliatedPoints?: CampaignPoint[], affiliatedPerformances?: WalletPerformance[], referredBlocks?: WalletBlock[], token?: Token): CampaignMetrics;
/**
 * Get rule deposit balance points
 * @param rule - the rule campaign
 * @param walletBlocks - the wallet blocks
 * @param token - the vault token
 * @param options - the calculation options
 * @returns the campaign points
 */
export declare function getRuleDepositBalancePoints({ frequency, reward }: CampaignRule, walletBlocks: WalletBlock[], token: Token, options: {
    startDate: string;
    endDate?: string;
    balanceField?: WalletBlockBalanceField;
    vaultPools?: VaultPool[];
    poolsFilter?: VaultPool[];
    includeYT?: boolean;
}): CampaignMetrics;
/**
 * Get rule deposit age points
 * @param rule - the rule campaign
 * @param walletBlocks - the wallet blocks
 * @param options - the calculation options
 * @returns the campaign points
 */
export declare function getRuleDepositAgePoints({ frequency, reward }: CampaignRule, walletBlocks: WalletBlock[], options: {
    startDate: string;
    endDate?: string;
}): CampaignMetrics;
/**
 * Get boost stake rewards
 * @param boost boost object
 * @param transactions vault transactions
 * @param walletBlocks wallet blocks
 * @param token vault token
 * @param options campaign options
 * @returns boost rewards
 */
export declare function getBoostStakeRewards(boost: CampaignBoost, walletBlocks: WalletBlock[], token: Token, options: {
    protocols?: Web3Protocol[];
    balanceField?: WalletBlockBalanceField;
    startDate: string;
    endDate?: string;
    vaultPools?: VaultPool[];
    poolsFilter?: VaultPool[];
}): CampaignMetrics;
/**
 * Get boost referral fees reward
 * @param boost - the campaign boost
 * @param affiliatedPoints - the affiliated fees
 * @returns the metrics
 */
export declare function getBoostReferralFeeReward({ reward }: CampaignBoost, affiliatedPerformances?: WalletPerformance[]): CampaignMetrics;
/**
 * Get boost referral reward
 * @param boost - the campaign boost
 * @param affiliatedPoints - the affiliated points
 * @returns the metrics
 */
export declare function getBoostReferralReward({ reward }: CampaignBoost, affiliatedPoints?: CampaignPoint[]): CampaignMetrics;
/**
 * Get boost referred reward
 * @param param0
 * @param totalPoints
 */
export declare function getBoostReferredReward({ reward }: CampaignBoost, totalPoints: string, referredBlocks?: WalletBlock[], token?: Token): CampaignMetrics;
/**
 * Calculate boost rewards from walletBlocks
 * @param reward campaign reward data
 * @param walletBlocks wallet blocks
 * @param vaultType vault type
 * @param stakedAmount wallet staked amount
 * @returns boost rewards
 */
export declare function calculateBoostBlockRewards(token: Token, reward: CampaignReward, walletBlock: WalletBlock, vaultPools?: VaultPool[], protocols?: Web3Protocol[], poolsFilter?: VaultPool[]): {
    points?: BigNumber;
    multiplier?: BigNumber;
    stakedAmount: BigNumber;
    blockBalance: BigNumber;
};
/**
 * Get boost rewards for a specific wallet
 * @param token token object
 * @param reward campaign reward
 * @param walletBlocks wallet blocks
 * @returns
 */
export declare function getBoostRewards(token: Token, reward: CampaignReward, walletBlocks: WalletBlock[], options: {
    protocols?: Web3Protocol[];
    balanceField?: WalletBlockBalanceField;
    startDate: string;
    endDate?: string;
    vaultPools?: VaultPool[];
    poolsFilter?: VaultPool[];
}): {
    totalAge: BigNumber;
    points: BigNumber;
    multiplier: BigNumber;
    stakedAmount: BigNumber;
    lastMultiplier: BigNumber;
    totalStakedAmount: BigNumber;
};
/**
 * Get rule queue balance points
 * @param rule - the rule campaign
 * @param transactions - the vault transactions
 * @param options - the calculation options
 * @returns the campaign points
 */
export declare function getRuleQueuePoints(rule: CampaignRule, transactions: Transaction[], token: Token, options: {
    startDate: string;
    endDate?: string;
}): CampaignMetrics;
/**
 * Campaign metrics accumulator
 * @param acc accumulator
 * @param item campaign metric
 * @returns campaign metrics
 */
export declare function makeMetrics<T extends CampaignMetrics>(acc: CampaignMetrics, item: T): {
    rewards: CampaignMetricsReward[];
    points: string;
    perDay: string;
    multiplier: string;
    multiplierScaled: string;
};
/**
 * Aggregate rewards by tokenId or USD
 * @param source source rewards
 * @param target target rewards
 * @returns aggregated rewards amounts
 */
export declare function mergeRewards(source: CampaignMetricsReward[], target: CampaignMetricsReward[]): CampaignMetricsReward[];
/**
 * Get campaign deposit point
 * @param campaign - the campaign
 * @param trigger - the rule trigger
 * @param token - the deposit token
 * @param depositAmount - the deposit amount
 * @returns the campaign point
 */
export declare function getCampaignPointsPerDay(campaign: Campaign, trigger: CampaignRuleTrigger, depositType: CampaignRuleDepositType, token: Token, vaultId: string, depositAmount?: string): string;
