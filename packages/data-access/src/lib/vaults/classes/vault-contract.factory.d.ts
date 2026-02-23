import { Token } from '../../tokens';
import { Vault, VaultContractModel, VaultContractOptions } from '../vault.model';
/**
 * Vault contract generic class
 */
export declare class VaultContractFactory {
    static fromVault(vault: Vault, token: Token, options?: VaultContractOptions): VaultContractModel;
}
