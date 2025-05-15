import { AbiContract } from '../core';
import { Vault, VaultCampaign, VaultCdoEpoch, VaultCdoEpochOperator, VaultIntegration, VaultParetoDollar, VaultParetoDollarCollateral, VaultParetoDollarStaking, VaultRewardAddress, VaultRewardEmission, VaultRewardProgram, VaultRewardProgramFrequency } from './vault.model';
/**
 * Vault Mock
 */
export declare function VaultMock(options?: Partial<Vault>): Vault;
export declare function VaultIntegrationMock(options: VaultIntegration): VaultIntegration;
export declare function VaultCdoEpochMock(options?: Partial<VaultCdoEpoch>): VaultCdoEpoch;
export declare function VaultParetoDollarStakingMock(options?: Partial<VaultParetoDollarStaking>): VaultParetoDollarStaking;
export declare function VaultParetoDollarMock(options?: Partial<VaultParetoDollar>): VaultParetoDollar;
export declare function VaultParetoDollarCollateralMock(options?: Partial<VaultParetoDollarCollateral>): VaultParetoDollarCollateral;
export declare function VaultCdoEpochOperatorMock(options?: Partial<VaultCdoEpochOperator>): VaultCdoEpochOperator;
export declare function VaultAbiParamMock(options?: AbiContract): AbiContract;
export declare function VaultRewardProgramMock(options?: Partial<VaultRewardProgram>): VaultRewardProgram;
export declare function VaultRewardDistributionFrequency(options?: Partial<VaultRewardProgramFrequency>): VaultRewardProgramFrequency;
export declare function VaultRewardAddressMock(options?: Partial<VaultRewardAddress>): VaultRewardAddress;
export declare function VaultRewardEmissionMock(options?: Partial<VaultRewardEmission>): VaultRewardEmission;
export declare function VaultCampaignMock(options?: Partial<VaultCampaign>): VaultCampaign;
