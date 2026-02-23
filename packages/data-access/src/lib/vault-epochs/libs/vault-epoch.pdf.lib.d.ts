import { WalletEpochStats } from '../../vaults';
import { MovementRow, VaultEpoch, VaultEpochAPRs, VaultEpochAPYs, VaultEpochInterest } from '../vault-epoch.model';
import { Transaction } from '../../transactions';
import { Operator } from '../../operators';
export declare function getLPLabel(name: string | undefined, address: string, chainHex?: string): string;
export declare function buildEpochMovementsTable(deposits: MovementRow[], withdraws: MovementRow[]): string;
export declare function formatPeriodRange(startDate: string, endDate: string): string;
export declare function formatDate(value?: string, format?: string): string;
export declare function buildEpochStatsTable({ bufferDuration, duration, APRs, APYs, interest, }: {
    bufferDuration: number;
    duration: number;
    APRs: VaultEpochAPRs;
    APYs?: VaultEpochAPYs;
    interest?: VaultEpochInterest;
}): string;
export declare function buildInflowsOutflowsTable(chainHex: string, transactions: Transaction[], epoch: VaultEpoch, walletNames: Record<string, string | undefined>, vaultToken: {
    symbol: string;
    decimals: number;
}, underlyingToken: {
    symbol: string;
    decimals: number;
}): string;
export declare function buildEpochPrincipalBreakdownTable(epochs: {
    current: VaultEpoch;
    previous?: VaultEpoch;
}, decimals: number): string;
export declare function formatTokenAmount(value: any, decimals: number): string;
export declare function formatNegativeAmount(value: any, decimals: number): string;
export declare function buildEpochInterestBreakdownTable(vaultEpoch: VaultEpoch, token: {
    symbol: string;
    decimals: number;
}, options: {
    curator?: Operator;
}): string;
export declare function buildEpochHoldersTable(currEpochHolders: WalletEpochStats[], walletNames: Record<string, string | undefined>, tokenMeta: {
    decimals: number;
}, chainHex?: string): string;
