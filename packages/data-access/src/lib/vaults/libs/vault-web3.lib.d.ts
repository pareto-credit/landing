import { Contract } from 'web3';
import { Token } from '../../tokens';
import { Web3CallData, Web3Clients, Web3ContractMethod, Web3DataParam, Web3Entity, Web3EventType } from '../../web3-client';
import { Vault, VaultKycData } from '../vault.model';
import { AbiContract } from '../../core';
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
 * Make web3 call data for a specific contract method
 * @param contract contract
 * @param contractMethod contract method to call
 * @param parent parent web3 entity in case of nested calls
 * @returns web3 call data
 */
export declare function makeWeb3CallData(contract: Contract<AbiContract>, contractMethod: Web3ContractMethod, inputs?: Web3DataParam[], parent?: Web3Entity): Web3CallData;
/**
 * Get Pool event type
 * @param vault vault object
 * @param from from address
 * @param to to address
 * @returns pool event type (if any)
 */
export declare function getVaultPoolEventType(vault: Vault, from: string, to: string): Web3EventType | undefined;
/**
 * Check if a specific address corresponds to a vault contract address
 * @param vault vault model
 * @param address address to check
 * @returns true | false
 */
export declare function checkContractAddress(vault: Vault, address: string): boolean;
