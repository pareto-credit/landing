import { Vault, VaultSiblingsKeys, VaultYieldSourcesKeys } from '../vault.model';
import { VaultBlock } from '../../vault-blocks';
import { AbiContract } from '../../core';
import { AbiCode } from '../../web3-client';
/**
 * Get the operator IDs from a vault.
 * @param vault - the vault object
 * @returns the operator IDs
 */
export declare function getVaultOperatorIds(vault: Vault): string[];
/**
 * Get the token IDs from a vault
 * @param vault - the vault entity
 * @returns the token IDs
 */
export declare function getVaultTokenIds(vault: Vault): string[];
/**
 * Get vaults token ids
 * @param vaults - the vaults array
 * @returns the token ids
 */
export declare function getVaultsTokenIds(vaults: Vault[]): string[];
/**
 * Get vaults operator ids
 * @param vaults - the vaults array
 * @returns the operator ids
 */
export declare function getVaultsOperatorIds(vaults: Vault[]): string[];
/**
 * Get vaults uniq keys
 * @param vaults - the vaults array
 * @returns the array keys
 */
export declare function getVaultsKeys<T = string>(vaults: Vault[], key: keyof Vault): T[];
/**
 * Get vault yields sources ids
 * @param block - the vault block
 * @returns the yield sources ids
 */
export declare function getVaultYieldSourcesKeys(block: VaultBlock): VaultYieldSourcesKeys;
/**
 * Get vaults yields sources data
 * @param vaults - the vaults array
 * @returns the yield sources data
 */
export declare function getVaultsYieldSourcesKeys(vaults: Vault[], blocks: VaultBlock[]): VaultYieldSourcesKeys;
/**
 * Get vault siblings keys
 * @param vault - the vault
 * @returns the vault siblinngs keys
 */
export declare function getVaultSiblingsKeys(vault: Vault): VaultSiblingsKeys;
/**
 * Get vaults siblings keys
 * @param vaults - the vaults array
 * @returns the siblings keys
 */
export declare function getVaultsSiblingsKeys(vaults: Vault[]): VaultSiblingsKeys;
/**
 * Get vault campaign ids
 * @param vault - the vault
 * @returns the campaign ids
 */
export declare function getVaultCampaignIds(vault: Vault): string[];
/**
 * Get vaults campaign IDs
 * @param vaults - the vaults array
 * @returns the campaign ids
 */
export declare function getVaultsCampaignIds(vaults: Vault[]): string[];
/**
 * Get vault KYC address
 * @param vault - the vault entity
 * @returns the contract address to use
 */
export declare function getVaultKYCContract(vault: Vault): {
    abi?: AbiContract;
    abiCode?: AbiCode;
    address?: string;
};
