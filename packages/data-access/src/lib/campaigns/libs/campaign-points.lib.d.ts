import { Transaction } from '../../transactions';
import { Vault } from '../../vaults';
import { WalletBlock } from '../../wallet-blocks';
import { Campaign, CampaignMetrics, CampaignPoints, CampaignPointsVault, CampaignRule, CampaignRuleTrigger } from '../campaign.model';
import { Token } from '../../tokens';
/**
 * Get campaign points
 * @param campaign - the campaign
 * @param vaults - the vault campaign
 * @param transactions - the vault transactions
 */
export declare function getCampaignPoints(campaign: Campaign, campaignVaults: Vault[], transactions: Transaction[], walletBlocks: WalletBlock[], tokens: Token[]): CampaignPoints;
/**
 * Get campaign vault points
 * @param campaign - the campaign
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the vault points
 */
export declare function getCampaignVaultPoints(campaign: Campaign, vault: Vault, transactions: Transaction[], walletBlocks: WalletBlock[], token?: Token): CampaignPointsVault;
/**
 * Get campaign rule vault points
 * @param rule - the campaign rule
 * @param vault - the vault
 * @param transactions - the wallet transactions
 * @param walletBlock -  the wallet block
 * @returns the rule vault points
 */
export declare function getCampaignRuleVaultPoints(campaign: Campaign, rule: CampaignRule, transactions: Transaction[], walletBlocks: WalletBlock[], token: Token): CampaignMetrics;
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
 * Calculate metrics by items
 * @param items - the metrics
 * @returns the new metrics
 */
export declare function calculateMetrics<T extends CampaignMetrics>(items: T[]): CampaignMetrics;
/**
 * Get campaign deposit point
 * @param campaign - the campaign
 * @param trigger - the rule trigger
 * @param token - the deposit token
 * @param depositAmount - the deposit amount
 * @returns the campaign point
 */
export declare function getCampaignPointsPerDay(campaign: Campaign, trigger: CampaignRuleTrigger, token: Token, depositAmount?: string): string;
