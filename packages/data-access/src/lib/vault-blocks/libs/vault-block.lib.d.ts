import { iBigInt } from '../../core';
import { Vault, VaultContractAPRs, VaultContractData, VaultContractType, VaultIntegrationsData, VaultRewardProgram } from '../../vaults';
import { RewardToken, VaultBlock, VaultBlockAPRs, VaultBlockAPYs, VaultContractCdoEpochInstantWithdrawsData } from '../vault-block.model';
import { VaultEpochProgression, VaultEpochStatus, VaultEpochWithdrawType } from '../../vault-epochs';
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
}): VaultBlockAPYs;
/**
 * Compound vault APR
 * @param vault vault entity
 * @param type APR type
 * @param rate APR
 * @returns Compounded APR
 */
export declare function compoundVaultApr(vaultContractType: VaultContractType, type: keyof VaultBlockAPRs, rate: number, totalDuration?: number): number;
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
 * @param token - the vault token
 * @param amount - the LP amount
 * @returns the LP price
 */
export declare function getVaultBlockUnderlyingAmount(block: VaultBlock, lpAmount: string): string;
/**
 * Get epoch withdraw type by block
 * @param block the vault block
 * @returns epoch withdraw type
 */
export declare function getEpochWithdrawTypeByBlock(block: VaultBlock): VaultEpochWithdrawType;
export declare function getVaultBlockEpochWithdrawType(apr: number, lastApr: number, instantWithdraws?: Partial<VaultContractCdoEpochInstantWithdrawsData>): VaultEpochWithdrawType;
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
export declare function getVaultBlockEpochWaitingProgression(block: VaultBlock, date?: Date): VaultEpochProgression;
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
