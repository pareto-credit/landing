import { DeepPartial } from '../core';
import { VaultAllocation, VaultApr, VaultBlock, VaultBlockRequest, VaultBlockTotalRequests, VaultContractCdoEpochData, VaultContractCdoEpochQueueData, VaultContractCdoEpochInstantWithdrawsData, VaultContractCdoEpochWithdrawsData, VaultPoolBlock, VaultTvl, VaultBlockRewardProgram, VaultBlockAPRs } from './vault-block.model';
export declare function VaultTvlMock(options?: Partial<VaultTvl>): VaultTvl;
/**
 * Vault Block Mock
 */
export declare function VaultBlockMock(options?: DeepPartial<VaultBlock>): VaultBlock;
export declare function VaultBlockInterestRatesMock(options?: Partial<VaultBlockAPRs>): {
    BASE: number;
    HARVEST: number | undefined;
    REWARDS: number | undefined;
    GROSS: number | undefined;
    NET: number | undefined;
};
export declare function VaultBlockCdoEpochMock(options?: DeepPartial<VaultContractCdoEpochData>): VaultContractCdoEpochData;
export declare function VaultBlockCdoEpochInstantWithdrawsMock(options?: Partial<VaultContractCdoEpochInstantWithdrawsData>): VaultContractCdoEpochInstantWithdrawsData;
export declare function VaultBlockRewardProgramMock(options?: Partial<VaultBlockRewardProgram>): VaultBlockRewardProgram;
export declare function VaultTotalRequestsMock(options?: DeepPartial<VaultBlockTotalRequests>): VaultBlockTotalRequests;
export declare function VaultRequestMock(options?: DeepPartial<VaultBlockRequest>): VaultBlockRequest;
export declare function VaultDepositTotalRequestMock(options?: Partial<VaultBlockTotalRequests['DEPOSIT']>): VaultBlockTotalRequests['DEPOSIT'];
export declare function VaultWithdrawTotalRequestMock(options?: Partial<VaultBlockTotalRequests['WITHDRAW']>): VaultBlockTotalRequests['WITHDRAW'];
export declare function VaultBlockAPRMock(options?: Partial<VaultApr>): VaultApr;
export declare function VaultAllocationMock(options?: Partial<VaultAllocation>): VaultAllocation;
export declare function VaultPoolMock(options?: DeepPartial<VaultPoolBlock>): VaultPoolBlock;
export declare function VaultCdoEpochInstantWithdrawsMock(options?: Partial<VaultContractCdoEpochInstantWithdrawsData>): VaultContractCdoEpochInstantWithdrawsData;
export declare function VaultCdoEpochWithdrawsMock(options?: Partial<VaultContractCdoEpochWithdrawsData>): VaultContractCdoEpochWithdrawsData;
export declare function VaultCdoEpochDepositQueue(options?: Partial<VaultContractCdoEpochQueueData>): VaultContractCdoEpochQueueData;
export declare function VaultContractCdoEpochMock(options?: DeepPartial<VaultContractCdoEpochData>): VaultContractCdoEpochData;
