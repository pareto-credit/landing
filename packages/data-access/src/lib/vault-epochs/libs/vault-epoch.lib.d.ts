import BigNumber from 'bignumber.js';
import { iBigInt, UnitTime } from '../../core';
import { VaultCdoEpochData, VaultEpoch, VaultEpochAmounts, VaultEpochAPRs, VaultEpochDurations, VaultEpochFEEs, VaultEpochInterest, VaultEpochPrincipal, VaultEpochProgression, VaultEpochStatus, VaultEpochTimings, VaultEpochWithdrawals, VaultEpochWithdrawsCheck, VaultEpochWithdrawType } from '../vault-epoch.model';
import { VaultBlock, VaultBlockCdoEpoch, VaultBlockInterest } from '../../vault-blocks';
import { Vault, VaultCdoEpoch, VaultCdoEpochMode } from '../../vaults';
import { Token } from '../../tokens';
import { Transaction } from '../../transactions';
/**
 * Initialize vault epoch APRs object
 * @param options APRs
 * @returns initialized APRs object
 */
export declare function initVaultEpochAPRs(options?: VaultEpochAPRs): VaultEpochAPRs;
/**
 * Get vault epoch client status
 * @param epoch - the vault epoch
 * @param date - the date to use
 * @returns the epoch client status
 */
export declare function getVaultEpochStatus(epoch: VaultEpoch, date?: Date): VaultEpochStatus;
/**
 * Get next epoch price based on current TVL and expected interest
 * @param current current vault epoch
 * @returns next epoch price
 */
export declare function getNextEpochPrice(current: VaultEpoch, options?: {
    fee?: number;
    expectedInterest?: iBigInt;
}): string;
/**
 * Get vault epoch duration
 * @param block - the vault block
 * @returns the duration of the epoch
 */
export declare function getVaultEpochDurationByBlock(block: VaultBlock): {
    duration: number;
    unit: UnitTime;
};
/**
 * Get vault epoch progression data
 * @param epoch - the vault epoch
 * @param date - the date to use
 * @returns the progression data
 */
export declare function getVaultEpochProgression(epoch: VaultEpoch, date?: Date): VaultEpochProgression;
/**
 * Get vault epoch buffer period to use (override with vault.waitingPeriod)
 * @param vault vault entity
 * @param cdoEpoch cdo epoch data
 * @returns buffer period to use
 */
export declare function getVaultEpochBufferDuration(cdoEpoch: VaultCdoEpoch | undefined, bufferDuration?: number): number;
/**
 * Get vault epoch total duration
 * @param vault vault entity
 * @param vaultBlock vault block entity
 * @returns vault epoch total duration
 */
export declare function getVaultEpochTotalDuration(vaultCdoEpoch: VaultCdoEpoch | undefined, blockCdoEpoch: VaultBlockCdoEpoch | undefined): number;
/**
 * Get vault epoch waiting progression data
 * @param epoch - the vault epoch
 * @param date - the date to use
 * @returns the progression data
 */
export declare function getVaultEpochWaitingProgression(epoch: VaultEpoch, date?: Date): VaultEpochProgression;
/**
 * Get epoch standard withdraws payment deadline
 * @param epoch - the vault epoch
 * @returns the date of the standards withdraws payment deadline
 */
export declare function getVaultEpochStandardDeadline(epoch: VaultEpoch): Date;
/**
 * Get epoch instant withdraw deadline depending on epoch status
 * @param epoch - the vault epoch
 * @returns the date of the instant withdraws payment deadline
 */
export declare function getVaultEpochInstantDeadline(epoch: VaultEpoch): Date;
/**
 * Get vault epoch withdraws amount
 * @param epoch - the vault epoch
 * @returns the withdraws amount to get
 */
export declare function getVaultEpochWithdrawsAmount(epoch: VaultEpoch): BigNumber;
/**
 * Get vault epoch deadline
 * @param epoch - the vault epoch
 * @returns the vault epoch deadline
 */
export declare function getVaultEpochDeadline(epoch: VaultEpoch): Date;
/**
 * Get vault epoch to withdraw
 * @param epoch - the vault epoch
 * @returns the amount to withdraw
 */
export declare function getVaultEpochToWithdraw(epoch: VaultEpoch, customInterests?: BigNumber.Value): BigNumber;
/**
 * Check if epoch is payable
 * @param epoch - the vault epoch
 * @returns true if is payable
 */
export declare function checkVaultEpochPayable(epoch: VaultEpoch, date?: Date): boolean;
/**
 * Check if the instant withdraws deadline is passed
 * @param epoch - the vault epoch
 * @returns true | false
 */
export declare function checkInstantWithdrawsPayable(epoch: VaultEpoch, date?: Date): boolean;
/**
 * Check wether an epoch is finished and ready to be paid
 * @param epoch - the vault epoch
 * @returns true | false
 */
export declare function checkStandardWithdrawsPayable(epoch: VaultEpoch, date?: Date): boolean;
/**
 * Get balance and allowance check from wallet based on amount to be withdrawn
 * @param amount amount requested
 * @param options borrower's balance and allowance
 * @returns balance and allowance check
 */
export declare function getEpochWithdrawsChecks(amount: BigNumber.Value, options: {
    balance?: BigNumber.Value;
    allowance?: BigNumber.Value;
}): VaultEpochWithdrawsCheck;
/**
 * Calculate next epoch expected interests based on current TVL
 * @param epoch - the vault epoch
 * @returns next epoch expected interests
 */
export declare function getVaultEpochExpectedInterests(epoch: VaultEpoch): BigNumber;
/**
 * Get Vault epoch net interest
 * @param grossInterest - the gross interest
 * @param feePercentage - the fee percentage
 * @returns the net interest
 */
export declare function getVaultEpochNetInterest(grossInterest: string | number, feePercentage: number): string;
/**
 * Get Vault epoch gross interest
 * @param netInterest - the net interest
 * @param feePercentage - the fee percentage
 * @returns the net interest
 */
export declare function getVaultEpochGrossInterest(netInterest: string | number, feePercentage: number): string;
/**
 * Get vault epoch APR scaled
 * @param epoch - the vault epoch
 * @param epochApr - the epoch apr to scale
 * @returns the apr scaled
 */
export declare function getVaultEpochAPRScaled(epoch: VaultEpoch, epochApr?: string | number, duration?: string | number): string;
/**
 * Return the cdo epoch vault withdraw type
 * @param epoch - the VaultEpoch,
 * @returns the epoch withdraw type
 */
export declare function getVaultEpochNextWithdrawType(epoch: VaultEpoch, nextAPR: string | number): VaultEpochWithdrawType;
/**
 * Calculate the next epoch end date
 * @param epoch - the vault epoch
 * @param options - the
 */
export declare function getVaultEpochNextEndDate(epoch: VaultEpoch, options?: {
    date?: Date;
    newEpochDuration?: number;
}): Date;
/**
 * Return true if the epoch has been withdrawed
 * @param epoch - the vault epoch
 * @returns true if withdrawed
 */
export declare function isVaultEpochWithdrawed(epoch: VaultEpoch): boolean;
/**
 * Return true if epoch is startable
 * @param epoch - the VaultEpoch,
 * @returns the boolean that indicates if the epoch is startable
 */
export declare function isVaultEpochStartable(epoch: VaultEpoch, date?: Date): boolean;
/**
 * Make vault epoch durations
 * @param startDate - the start date of the epoch
 * @param epochDuration - the epoch duration in seconds
 * @param bufferDuration - the buffer duration in seconds
 * @param prevEndDate - the previous epoch end date
 * @returns the epoch durations in seconds
 */
export declare function makeVaultEpochDurations(startDate: string | Date, epochDuration: number, bufferDuration: number, prevEndDate?: string | Date, isUnderCure?: boolean): VaultEpochDurations;
/**
 * Make vault epoch APRs from amounts and timing
 * @param amounts - the epoch amounts
 * @param timing - the timing data about epoch
 * @returns the vault epoch APRs
 */
export declare function makeVaultEpochAPRs(amounts: VaultEpochAmounts, timings: VaultEpochTimings, isUnderCure?: boolean): VaultEpochAPRs;
/**
 * Calculate epoch APR from total APR
 * @param totalApr total APR
 * @param epochDuration epoch duration
 * @param bufferPeriod buffer period duration
 * @returns epoch apr
 */
export declare function makeVaultEpochApr(totalApr: number, epochDuration: number, bufferDuration: number): BigNumber;
/**
 * GROSS Apr calculation
 * Case 1 -> from TOTAL APR
 * Case 2 -> from EPOCH+BUFFER APR
 * Case 3 -> from interests
 * @param tvl
 * @param durations
 * @param options
 */
export declare function makeVaultEpochAprGross(tvl: number | string, durations: VaultEpochDurations, options?: {
    totalAPR?: number;
    epochBufferAPR?: number;
    grossInterest?: string | number;
}): number;
/**
 * Calculate vault epoch NET APR based on net interest
 * @param tvl total TVL in underlying tokens
 * @param durations epoch durations
 * @param options options
 * @returns vault epoch APR
 */
export declare function makeVaultEpochAprNet(tvl: number | string, durations: VaultEpochDurations, options: {
    grossApr?: number;
    netInterest?: string | number;
    feePercentage?: number;
}): number;
/**
 * Calculate vault epoch APR based on generated interests
 * @param tvl total TVL in undering tokens
 * @param interests interests generated in underlying tokens
 * @param epochDuration epoch duration
 * @returns APR based on interests generated on TVL
 */
export declare function makeVaultEpochAprFromInterests(tvl: string | number, interest: string | number, duration: number): BigNumber;
/**
 * Parse a list of vault epochs into a dictionary
 * @param epochs - the epochs list
 * @returns the dictionary of the epochs
 */
export declare function parseVaultEpochs(epochs: VaultEpoch[]): {
    epoch?: VaultEpoch;
    lastEpoch?: VaultEpoch;
};
/**
 * Get amount required to be withdrawn from the borrower to stop an epoch
 * @param epoch - the vault epoch
 * @param customInterests - the custom interests to use for the calculation
 * @returns total standard amount
 * @deprecated
 */
export declare function getVaultEpochStandardAmount(epoch: VaultEpoch, customInterests?: BigNumber.Value): BigNumber;
/**
 * Get cdo epoch standard withdraws
 * @param epoch - the vault epoch
 * @returns standard withdraws amount
 * @deprecated
 */
export declare function getVaultEpochStandardWithdraws(epoch: VaultEpoch): BigNumber;
/**
 * Get cdo epoch instant withdraws
 * @param epoch - the vault epoch
 * @returns instant withdraws amount
 * @deprecated
 */
export declare function getVaultEpochInstantWithdraws(epoch: VaultEpoch): BigNumber;
/**
 * Get total withdraws amount for a cdo epoch
 * @param epoch - the vault epoch
 * @returns epoch total withdraws
 * @deprecated
 */
export declare function getVaultEpochTotalWithdraws(epoch: VaultEpoch): BigNumber;
/**
 * Get vault epoch data
 * @param vault - the vault entity
 * @param token - the token entity
 * @param epochs - the last 2 epochs of the vault
 * @returns the vault epoch data
 */
export declare function getVaultEpochData(vault: Vault, token: Token, epochs?: VaultEpoch[]): VaultCdoEpochData | undefined;
export declare function getVaultEpochAvgRate(rates: number[], durations: number[]): number;
/**
 * Set vault epoch data APR Gross
 * @param epochData - the vault epoch data
 * @param token - the token entity
 * @param aprGross - the apr gross to set
 * @returns the vault epoch data
 */
export declare function setVaultEpochDataApr(epochData: VaultCdoEpochData, aprGross?: string | number): VaultCdoEpochData;
/**
 * Set vault epoch data duration
 * @param epochData - the vault epoch data
 * @param newDuration - the new duration to set
 * @returns the vault epoch data
 */
export declare function setVaultEpochDataDuration(epochData: VaultCdoEpochData, newDuration?: string | number): VaultCdoEpochData;
/**
 * Set vault epoch data end date
 * @param epochData - the vault epoch data
 * @param endDate - the new end date
 * @returns the vault epoch data
 */
export declare function setVaultEpochDataEndDate(epochData: VaultCdoEpochData, options: {
    startDate?: Date | string | null;
    endDate?: Date | string | null;
}): VaultCdoEpochData;
/**
 * Set vault epoch data unit
 * @param epochData - the vault epoch data
 * @param unit - the new unit time
 * @returns the vault epoch data
 */
export declare function setVaultEpochDataUnit(epochData: VaultCdoEpochData, unit: UnitTime): VaultCdoEpochData;
/**
 * Set vault epoch data interests
 * @param epochData - the vault epoch data
 * @param token - the token entity
 * @param newInterests - the new interests amount
 * @returns the vault epoch data
 */
export declare function setVaultEpochDataInterests(epochData: VaultCdoEpochData, token: Token, newInterests?: string): VaultCdoEpochData;
/**
 * Calculate epoch start and end dates
 * @param epoch - the current Epoch
 * @param lastEpoch - the previous Epoch
 * @returns the start date and end date of the epoch
 */
export declare function getVaultEpochDates({ duration, bufferDuration, startDate, endDate }: VaultEpoch, lastEpoch?: VaultEpoch): {
    startDate: string;
    endDate: string;
};
/**
 * Get vault epoch interest breakdown
 * @param epoch - the vault epoch
 * @param mode - the vault cdoEpoch mode
 * @returns the interest breakdown data NET, FEE, GROSS
 * @deprecated
 */
export declare function getVaultEpochInterestBreakdown({ expectedInterest, APYs }: VaultEpoch, mode: VaultCdoEpochMode): VaultEpochInterest;
/**
 * Get vault epoch withdrawals breakdown
 * @param epoch - the vault epoch
 * @returns the vault epoch withdrawals breakdown
 */
export declare function getVaultEpochWithdrawalsBreakdown({ withdraws, instantWithdraws, APYs, }: VaultEpoch): VaultEpochWithdrawals;
/**
 * Get vault epoch TVL pricipal values
 * @param epoch - the vault epoch
 * @returns the vault epoch principal values
 */
export declare function getVaultEpochTVLPrincipal(epoch: VaultEpoch): VaultEpochPrincipal;
/**
 * Calculate epochs principal amounts
 * @param epoch - the vault epoch
 * @param prevEpoch - the previous vault epoch
 * @returns the principals amounts
 */
export declare function getVaultEpochsPrincipalAmounts(epoch: VaultEpoch, prevEpoch?: VaultEpoch): {
    PREVIOUS: string;
    INTEREST: string;
    WITHDRAWALS: string;
    DEPOSITS: string;
    PRINCIPAL: string;
    DELTA: string;
};
/**
 * Get vault epoch FEE breakdown
 * @param epoch - the vault epoch
 * @return the fee breakdown
 */
export declare function getVaultEpochFEE(epoch: VaultEpoch): VaultEpochFEEs;
/**
 * Get vault epoch interest
 * @param token token entity
 * @param epochMode cdo epoch mode
 * @param cdoEpochData cdo epoch data
 * @param options side options
 * @returns vault block interest
 */
export declare function getVaultEpochInterest(epochMode: VaultCdoEpochMode, interest: iBigInt, options?: {
    withdrawsFee?: iBigInt;
    feePercentage?: number;
}): VaultBlockInterest;
/**
 * Get Tx breakdown by a vault epoch
 * @param epoch - the vault epoch
 * @param tx - the REQUEST_WITHDRAW tx
 * @returns the withdrawal breakdown
 */
export declare function getVaultEpochWithdrawalTxBreakdown(epoch: VaultEpoch, { tokenAmount, price }: Transaction, newPrice: string): VaultEpochWithdrawals;
