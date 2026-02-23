import { DeepPartial } from '../core';
import { VaultBlockEarnings, VaultBlockPerformance, VaultPerformance } from './vault-performance.model';
/**
 * Vault Performance Mock
 */
export declare function VaultPerformanceMock(options?: DeepPartial<VaultPerformance>): VaultPerformance;
export declare function VaultBlockEarningsMock(options?: Partial<VaultBlockEarnings>): VaultBlockEarnings;
export declare function VaultBlockPerformanceMock(options?: DeepPartial<VaultBlockPerformance>): VaultBlockPerformance;
