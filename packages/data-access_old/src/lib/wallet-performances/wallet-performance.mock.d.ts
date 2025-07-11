import { DeepPartial } from '../core';
import { WalletBlockEarnings, WalletBlockEarningsRewards, WalletBlockPerformance, WalletPerformance } from './wallet-performance.model';
/**
 * Wallet Performance Mock
 */
export declare function WalletPerformanceMock(options?: DeepPartial<WalletPerformance>): WalletPerformance;
export declare function WalletBlockPerformanceMock(options?: DeepPartial<WalletBlockPerformance>): WalletBlockPerformance;
export declare function WalletBlockEarningsMock(options?: DeepPartial<WalletBlockEarnings>): WalletBlockEarnings;
export declare function WalletBlockEarningsRewardsMock(options?: Partial<WalletBlockEarningsRewards>): WalletBlockEarningsRewards;
