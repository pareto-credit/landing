import { DeepPartial } from '../core';
import { VaultBlockAllocation, VaultApr, VaultBlock, VaultBlockRequest, VaultBlockTotalRequests, VaultBlockCdoEpoch, VaultBlockCdoEpochQueue, VaultBlockCdoEpochInstantWithdraws, VaultBlockCdoEpochWithdraws, VaultBlockPool, VaultBlockTvl, VaultBlockRewardProgram, VaultBlockAPRs, VaultBlockParetoDollar, VaultBlockParetoDollarStaking, VaultBlockParetoDollarQueue, VaultBlockParetoDollarYieldSource, VaultBlockInterest } from './vault-block.model';
export declare function VaultBlockTvlMock(options?: Partial<VaultBlockTvl>): VaultBlockTvl;
/**
 * Vault Block Mock
 */
export declare function VaultBlockMock(options?: DeepPartial<VaultBlock>): VaultBlock;
export declare function VaultBlockInterestMock(options?: Partial<VaultBlockInterest>): {
    NET: string;
    FEE: string;
    GROSS: string;
};
export declare function VaultBlockInterestRatesMock(options?: Partial<VaultBlockAPRs>): {
    BASE: number;
    HARVEST: number | undefined;
    REWARDS: number | undefined;
    GROSS: number | undefined;
    NET: number | undefined;
    FEE: number | undefined;
};
export declare function VaultBlockCdoEpochMock(options?: DeepPartial<VaultBlockCdoEpoch>): VaultBlockCdoEpoch;
export declare function VaultBlockParetoDollarMock(options?: DeepPartial<VaultBlockParetoDollar>): VaultBlockParetoDollar;
export declare function VaultBlockParetoDollarQueueMock(options?: DeepPartial<VaultBlockParetoDollarQueue>): VaultBlockParetoDollarQueue;
export declare function VaultBlockParetoDollarYieldSourceMock(options?: Partial<VaultBlockParetoDollarYieldSource>): VaultBlockParetoDollarYieldSource;
export declare function VaultBlockParetoDollarStakingMock(options?: DeepPartial<VaultBlockParetoDollarStaking>): VaultBlockParetoDollarStaking;
export declare function VaultBlockCdoEpochInstantWithdrawsMock(options?: Partial<VaultBlockCdoEpochInstantWithdraws>): VaultBlockCdoEpochInstantWithdraws;
export declare function VaultBlockRewardProgramMock(options?: Partial<VaultBlockRewardProgram>): VaultBlockRewardProgram;
export declare function VaultTotalRequestsMock(options?: DeepPartial<VaultBlockTotalRequests>): VaultBlockTotalRequests;
export declare function VaultBlockRequestMock(options?: DeepPartial<VaultBlockRequest>): VaultBlockRequest;
export declare function VaultDepositTotalRequestMock(options?: Partial<VaultBlockTotalRequests['DEPOSIT']>): VaultBlockTotalRequests['DEPOSIT'];
export declare function VaultWithdrawTotalRequestMock(options?: Partial<VaultBlockTotalRequests['WITHDRAW']>): VaultBlockTotalRequests['WITHDRAW'];
export declare function VaultBlockAPRMock(options?: Partial<VaultApr>): VaultApr;
export declare function VaultBlockAllocationMock(options?: Partial<VaultBlockAllocation>): VaultBlockAllocation;
export declare function VaultPoolMock(options?: DeepPartial<VaultBlockPool>): VaultBlockPool;
export declare function VaultCdoEpochInstantWithdrawsMock(options?: Partial<VaultBlockCdoEpochInstantWithdraws>): VaultBlockCdoEpochInstantWithdraws;
export declare function VaultCdoEpochWithdrawsMock(options?: Partial<VaultBlockCdoEpochWithdraws>): VaultBlockCdoEpochWithdraws;
export declare function VaultCdoEpochDepositQueue(options?: Partial<VaultBlockCdoEpochQueue>): VaultBlockCdoEpochQueue;
export declare function VaultContractCdoEpochMock(options?: DeepPartial<VaultBlockCdoEpoch>): VaultBlockCdoEpoch;
