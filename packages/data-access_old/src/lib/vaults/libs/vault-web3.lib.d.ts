import { Token } from '../../tokens';
import { VaultBlock } from '../../vault-blocks';
import { Web3Clients } from '../../web3-client';
import { Vault, VaultKycData } from '../vault.model';
/**
 * Load vault web3 data
 * @param web3Clients - the web3 clients
 * @param vault - the vault data
 * @param tokens - the tokens available
 * @param options - the options
 * @returns the web3 data
 */
export declare function getVaultWeb3Data(web3Clients: Web3Clients, vault: Vault, tokens: Token[], options?: {
    walletAddress?: string;
}): Promise<VaultKycData>;
/**
 * Get spender address for deposits
 * @param vault vault object
 * @param block vault block object
 * @returns deposit spender address
 */
export declare function getVaultDepositSpender(vault: Vault, block: VaultBlock): string | undefined;
/**
 * Get spender address for withdraws
 * @param vault vault object
 * @param block vault block object
 * @returns withdraw spender address
 */
export declare function getVaultWithdrawSpender(vault: Vault, block: VaultBlock): string | undefined;
