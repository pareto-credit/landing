import { VaultBlockParetoDollarYieldSource, VaultBlock } from '../../vault-blocks';
import { Vault, VaultYieldSourcesData, VaultYieldSourcesGraphData, VaultYieldSourcesGraphOptions, VaultYieldSourcesSideData } from '../vault.model';
/**
 * Get vault pareto dollar spender
 * @param vault - the vault object
 * @param kind - the spender kind
 * @returns the spender address
 */
export declare function getVaultDollarSpender(vault: Vault, kind: 'MINT' | 'STAKE'): string | undefined;
/**
 * Get vault pareto dollar unlent amounts
 * @param block
 * @returns the unlent amounts
 */
export declare function getVaultDollarUnlent(block: VaultBlock): {
    value: string;
    percentage: string;
};
/**
 * Get vault dollar available to deposit
 * @param block - the vault block
 * @returns the amount available to deposit
 */
export declare function getVaultDollarToDeposit(block: VaultBlock): string;
/**
 * Get the vualt dollar amount to withdraw net of the withdrawal requests already done
 * @param block - the vault block
 * @param yieldSources - the yield sources data
 */
export declare function getVaultDollarToWithdraw(vault: Vault, block: VaultBlock, { blocks }: VaultYieldSourcesData): {
    pending: string;
    requested: string;
    toWithdraw: string;
};
/**
 * Get vault dollar reserved withdrawals
 * @param block - the vault block
 * @returns the withdrawals reserved amount
 */
export declare function getVaultDollarReservedToWithdrawals(block: VaultBlock): string;
/**
 * Get vault dollar gain/losses
 * @param block the vault block
 * @returns the gain/losses amount
 */
export declare function getVaultDollarGainLosses(block: VaultBlock): string;
/**
 * Get vault dollar withdrawed
 * @param block - the vault block
 * @returns the amount withdrawed
 */
export declare function getVaultDollarWithdrawAmounts(block: VaultBlock): {
    value: string | number;
    percentage: number;
};
/**
 * Get Vault pareto dollar collateralization amounts
 * @param block - the vault block
 * @returns the collateralization amounts
 */
export declare function getVaultDollarCollateralization(block: VaultBlock): {
    value: string;
    percentage: string;
};
/**
 * Get vault pareto dollar allocation data
 * @param block - the vault block
 * @param yieldSource - the yield source
 * @returns the allocation data
 */
export declare function getVaultDollarYieldSourceAllocation(block: VaultBlock, yieldSource: VaultBlockParetoDollarYieldSource): {
    value: number;
    percentage: number;
};
/**
 * Get vault pareto dollar allocation graph data
 * @param block - the vault block
 * @param vaults - the allocation vaults
 * @param operators - the allocation operators
 * @param tokens - the allocation tokens
 * @returns the allocation data
 */
export declare function getVaultDollarAllocationGraph(block: VaultBlock, sourcesSideData?: VaultYieldSourcesSideData, options?: VaultYieldSourcesGraphOptions): VaultYieldSourcesGraphData;
/**
 * Get vault dollar APR NET
 * @param block - the vault block
 * @param yieldSourcesData yield sources blocks
 * @returns the vault dollar APR
 */
export declare function getVaultDollarAPR({ paretoDollar, pools, APRs }: VaultBlock, yieldSourcesData: {
    blocks: VaultBlock[];
}): string | undefined;
/**
 * Calculate new dollar APR
 */
export declare function getVaultDollarAPRDelta(action: 'DEPOSIT' | 'WITHDRAW', block: VaultBlock, yieldSourcesData: {
    blocks: VaultBlock[];
    actions: {
        sourceAddress: string;
        amount: string;
    }[];
}): {
    currentApr: number;
    newApr: number;
    delta: number;
};
