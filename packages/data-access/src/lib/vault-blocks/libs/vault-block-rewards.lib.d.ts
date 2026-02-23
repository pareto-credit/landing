import { iBigInt } from '../../core';
import { VaultContractData, VaultContractTokenData, VaultContractType, VaultRewardProgram, VaultRewardProgramFrequency } from '../../vaults';
import { RewardToken, VaultBlockAPRs, VaultBlockRewardProgram } from '../vault-block.model';
/**
 * Get distribution frequency in days
 * @param frequency frequency params
 * @returns distribution frequency in days
 */
export declare function getDistributionFrequencyInDays(frequency: VaultRewardProgramFrequency): number;
/**
 * Get reward program AMOUNT
 * @param rewardProgram reward program
 * @param options tvl and tokenPrice
 * @returns reward program AMOUNT data
 */
export declare function calculateRewardProgramAmount(rewardProgram: VaultRewardProgram, options?: {
    tvlUSD?: iBigInt;
    tokenPrice?: iBigInt;
}): {
    APR: number;
    USD?: undefined;
} | {
    APR: number;
    USD: string;
};
/**
 * Get reward program TARGET_APY
 * @param rewardProgram reward program
 * @param APRs vault interest rates
 * @returns reward program TARGET_APY data
 */
export declare function calculateRewardProgramTargetApy(rewardProgram: VaultRewardProgram, baseAPY: number): {
    APR: number;
};
/**
 * Get Reward program APR
 * @param APRs Vault block APRs
 * @param rewardProgram reward program object
 * @returns Reward program APR
 */
export declare function makeVaultBlockRewardProgram(rewardProgram: VaultRewardProgram, APRs: VaultBlockAPRs, options?: {
    tvlUSD?: iBigInt;
    tokenPrice?: iBigInt;
    feePercentage?: number;
    vaultContractType?: VaultContractType;
    epochDuration?: number;
}): {
    APR: number;
    USD?: iBigInt;
};
/**
 * Get vault cumulative reward programs APR
 * @param vault vault entity
 * @param vaultData vault contract data
 * @param APRs APRs
 * @param tvlUSD TVL USD
 * @param rewardTokens reward tokens entities
 * @returns cumulative vault reward programs APR
 */
export declare function getVaultRewardProgramsApr(vaultData: VaultContractData, APRs: VaultBlockAPRs, options?: {
    tvlUSD?: iBigInt;
    feePercentage?: number;
    rewardTokens?: RewardToken[];
    rewardPrograms?: VaultRewardProgram[];
    vaultContractType?: VaultContractType;
}): number;
/**
 * Get APRs for each reward program
 * @param vault vault entity
 * @param vaultData vault contract data
 * @param APRs vault APRs
 * @param options system options
 * @returns APR for each reward program
 */
export declare function getVaultBlockRewardPrograms(vaultData: VaultContractData, APRs: VaultBlockAPRs, options?: {
    tvlUSD?: iBigInt;
    feePercentage?: number;
    rewardTokens?: RewardToken[];
    rewardPrograms?: VaultRewardProgram[];
    vaultContractType?: VaultContractType;
}): VaultBlockRewardProgram[] | undefined;
/**
 * Get vault block reward program
 * @param rewardProgram vault reward program
 * @param APRs vault APRs
 * @param options tvl, reward tokens entities, tokens contract data
 * @returns vault block reward program
 */
export declare function getVaultBlockRewardProgram(rewardProgram: VaultRewardProgram, APRs: VaultBlockAPRs, options?: {
    tvlUSD?: iBigInt;
    feePercentage?: number;
    rewardTokens?: RewardToken[];
    tokens?: VaultContractTokenData[];
    vaultContractType?: VaultContractType;
    epochDuration?: number;
}): VaultBlockRewardProgram;
