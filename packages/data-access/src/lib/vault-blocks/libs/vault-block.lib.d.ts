import { iBigInt } from '../../core';
import { Vault, VaultContractAPRs, VaultContractData, VaultContractType, VaultIntegrationsData, VaultRewardProgram } from '../../vaults';
import { RewardToken, VaultBlock, VaultBlockAPRs, VaultBlockAPYs, VaultBlockCdoEpochInstantWithdraws, VaultBlockEpochPrices } from '../vault-block.model';
import { VaultEpochPrincipal, VaultEpochProgression, VaultEpochStatus, VaultEpochWithdrawals, VaultEpochWithdrawType } from '../../vault-epochs';
/**
 * Parse APRs from contract data
 * @param APRs vault contract raw APRs
 * @returns parsed APRs
 */
export declare function parseVaultContractAPRs(APRs: VaultContractAPRs, integrationsData?: VaultIntegrationsData): VaultBlockAPRs;
/**
 * Convert vault APRs into APYs
 * @param vault vault entity
 * @param APRs vault APRs
 * @returns Compounded APRs
 */
export declare function parseAPYs(vaultContractType: VaultContractType, APRs: VaultBlockAPRs, options?: {
    feePercentage?: number;
    totalDuration?: number;
    compoudingPeriod?: number;
}): VaultBlockAPYs;
/**
 * Compound vault APR
 * @param vault vault entity
 * @param type APR type
 * @param rate APR
 * @returns Compounded APR
 */
export declare function compoundVaultApr(vaultContractType: VaultContractType, type: keyof VaultBlockAPRs, rate: number, totalDuration?: number, compoudingPeriod?: number): number;
/**
 * Get vault compounding period
 * @param vault vault entity
 * @param epochDuration epoch duration
 * @returns vault compounding period
 */
export declare function getVaultCompoundingPeriod(vaultContractType: VaultContractType, totalDuration?: number): number;
/**
 * Get vault APRs
 * @param vault vault entity
 * @param vaultData vault contract data
 * @param tvlUSD TVL converted in USD
 * @param rewardTokens reward tokens entities
 * @returns Vault APRs
 */
export declare function makeVaultAPRs(vaultData: VaultContractData, options?: {
    tvlUSD?: iBigInt;
    feePercentage?: number;
    rewardTokens?: RewardToken[];
    rewardPrograms?: VaultRewardProgram[];
    vaultContractType?: VaultContractType;
    integrations?: VaultIntegrationsData;
}): VaultBlockAPRs;
/**
 * Get vault expected deposit interests
 * @param block - the vault block
 * @param depositAmount - the deposit amount
 * @returns the interest amount expected of the epoch
 */
export declare function getVaultBlockDepositInterest(block: VaultBlock, depositAmount: string): string;
/**
 * Get vault block withdrawable amount
 * @param block - the vault block
 * @param lpBalance - the LP balance
 * @param maxWithdrawable - the max withdrawable
 * @param withdrawAmount - the withdraw amount
 * @returns the underlying amount
 */
export declare function getVaultBlockWithdrawableAmount(block: VaultBlock, lpBalance: string, maxWithdrawable: string, withdrawAmount: string): string;
/**
 * Get vault block Underlying amount
 * @param block - the vault block
 * @param lpAmount - the LP token amount
 * @param price - the price of LP token
 * @returns the LP price
 */
export declare function getVaultBlockUnderlyingAmount(block: VaultBlock, lpAmount: string, price?: string): string;
/**
 * Get epoch withdraw type by block
 * @param block the vault block
 * @returns epoch withdraw type
 */
export declare function getEpochWithdrawTypeByBlock(block: VaultBlock): VaultEpochWithdrawType;
export declare function getVaultBlockEpochWithdrawType(apr: number, lastApr: number, instantWithdraws?: Partial<VaultBlockCdoEpochInstantWithdraws>): VaultEpochWithdrawType;
/**
 * Get vault block next epoch interests
 * @param block - the vault block
 * @param lpBalance - the LP balance
 * @param maxWithdrawable - the max withdrawable
 * @returns the interest amounts
 */
export declare function getVaultBlockInterestAmounts(block: VaultBlock, lpBalance: string, maxWithdrawable: string): {
    lp: string;
    amount: string;
};
/**
 * Calculate vault block interest amounts
 * @param block - the vault block
 * @param lpBalance - the LP balance
 * @returns the interest amounts
 */
export declare function calculateVaultBlockInterestAmounts(block: VaultBlock, lpBalance: string): {
    lp: string;
    amount: string;
};
/**
 * Get vault epoch status by block
 * @param vault - the cdo epoch vault
 * @param block - the vault block
 * @returns the epoch client status
 */
export declare function getVaultBlockEpochStatus(block: VaultBlock, date?: Date): VaultEpochStatus | undefined;
/**
 * Get vault block cap status
 * @param vault - the vault
 * @param block - the vault block
 * @param contractLimit - the limit by contract
 * @returns the cap status object
 */
export declare function getVaultBlockCapStatus(vault: Vault, block: VaultBlock, contractLimit?: string): {
    isActive: boolean;
    progression?: number;
    delta?: string;
    limit?: string;
};
/**
 * Get vault block CAP progression
 * @param vault - the vault
 * @param block - the vault block
 * @returns the percentage of completion
 */
export declare function getVaultBlockCapProgression(vault: Vault, block: VaultBlock): number;
/**
 * Get vault block epoch waiting progression data
 * @param block - the vault block
 * @param date - the date to use
 * @returns the progression data
 */
export declare function getVaultBlockEpochWaitingProgression(vault: Vault, block: VaultBlock, date?: Date): VaultEpochProgression;
/**
 * Get vault block epoch progression data
 * @param block - the vault block
 * @param date - the date to use
 * @returns the progression data
 */
export declare function getVaultBlockEpochProgression(block: VaultBlock, date?: Date): VaultEpochProgression;
/**
 * Get Vault block net APY
 * @param block - the vault block
 * @returns the vault block net APY calculated by gross and net
 */
export declare function getVaultBlockAPYNet(block: VaultBlock, type: 'BASE' | 'REWARDS'): string;
/**
 * Filter vault blocks per day
 * @param blocks - the vault blocks
 * @returns the blocks filtered
 */
export declare function filterVaultBlocksPerDay(blocks: VaultBlock[]): VaultBlock[];
/**
 * Return true if the epoch has been withdrawed
 * @param block - the vault block
 * @returns true if withdrawed
 */
export declare function isVaultBlockEpochWithdrawed(block: VaultBlock): boolean;
/**
 * Get vault block epoch to withdraw
 * @param block - the vault block
 * @returns the amount to withdraw from the block
 */
export declare function getVaultBlockEpochToWithdraw(block: VaultBlock): string;
/**
 * Get vault block epoch withdrawals breakdown
 * @param block - the vault block
 * @returns the vault epoch withdrawals breakdown
 */
export declare function getVaultBlockEpochWithdrawalsBreakdown(block: VaultBlock): VaultEpochWithdrawals;
/**
 * Get vault block epoch TVL pricipal values
 * @param block - the vault epoch
 * @returns the vault epoch principal values
 */
export declare function getVaultBlockEpochTVLPrincipal(block: VaultBlock): VaultEpochPrincipal;
/**
 * Get vault epoch prices by block
 * @param block - the vault block
 * @returns the start, current and end prices
 */
export declare function getVaultBlockEpochPrices(block: VaultBlock, currentDate?: string): VaultBlockEpochPrices;
