import { Vault } from '../vault.model';
/**
 * Get vault pareto dollar spender
 * @param vault - the vault object
 * @param kind - the spender kind
 * @returns the spender address
 */
export declare function getVaultParetoDollarSpender(vault: Vault, kind: 'MINT' | 'STAKE'): string | undefined;
