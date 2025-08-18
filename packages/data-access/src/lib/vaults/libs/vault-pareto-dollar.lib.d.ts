import { VaultBlock } from '../../vault-blocks';
import { Vault, VaultYieldSourcesData, VaultYieldSourcesOptions, VaultYieldSourcesSideData } from '../vault.model';
/**
 * Get vault pareto dollar spender
 * @param vault - the vault object
 * @param kind - the spender kind
 * @returns the spender address
 */
export declare function getVaultParetoDollarSpender(vault: Vault, kind: 'MINT' | 'STAKE'): string | undefined;
/**
 * Get Vault pareto dollar collateralization amounts
 * @param block - the vault block
 * @returns the collateralization amounts
 */
export declare function getVaultParetoDollarCollateralization(block: VaultBlock): {
    value: string;
    percentage: string;
};
/**
 * Get vault pareto dollar allocation data
 * @param block - the vault block
 * @param vaults - the allocation vaults
 * @param operators - the allocation operators
 * @param tokens - the allocation tokens
 * @returns the allocation data
 */
export declare function getVaultParetoDollarAllocation(block: VaultBlock, sourcesSideData?: VaultYieldSourcesSideData, options?: VaultYieldSourcesOptions): VaultYieldSourcesData;
