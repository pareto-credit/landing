import { VaultBlock } from '../../vault-blocks';
import { Vault } from '../vault.model';
/**
 * Get vault cdoEpoch spender
 * @param vault vault object
 * @param block vault block object
 * @param kind the pender kind
 * @returns the spender address
 */
export declare function getVaultCdoEpochSpender(vault: Vault, block: VaultBlock, kind: 'DEPOSIT' | 'WITHDRAW' | 'EARLY_WITHDRAW'): string | undefined;
