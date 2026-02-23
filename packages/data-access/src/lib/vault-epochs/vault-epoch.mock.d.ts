import { DeepPartial } from '../core';
import { VaultEpoch, VaultEpochAPRs, VaultEpochQueue, VaultEpochInstantWithdraws, VaultEpochWithdraws, VaultCdoEpochData, VaultEpochAPYs, VaultCreditExtended, VaultEpochInterest } from './vault-epoch.model';
/**
 * Vault Epoch Mock
 */
export declare function VaultEpochMock(options?: DeepPartial<VaultEpoch>): VaultEpoch;
export declare function VaultCreditExtendedMock(options?: Partial<VaultCreditExtended>): VaultCreditExtended;
export declare function VaultCdoEpochDepositQueueMock(options?: Partial<VaultEpochQueue>): VaultEpochQueue;
export declare function VaultEpochAPRsMock(options?: Partial<VaultEpochAPRs>): VaultEpochAPRs;
export declare function VaultEpochAPYsMock(options?: Partial<VaultEpochAPYs>): VaultEpochAPYs;
export declare function VaultEpochInterestMock(options?: Partial<VaultEpochInterest>): VaultEpochInterest;
export declare function VaultEpochWithdrawsMock(options?: Partial<VaultEpochWithdraws>): VaultEpochWithdraws;
export declare function VaultEpochInstantWithdrawsMock(options?: Partial<VaultEpochInstantWithdraws>): VaultEpochInstantWithdraws;
export declare function VaultCdoEpochDataMock(options?: Partial<VaultCdoEpochData>): VaultCdoEpochData;
