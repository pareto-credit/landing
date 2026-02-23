import { Contract, Transaction } from 'web3';
import { Token } from '../../tokens';
import { AbiCode, Web3CallData, Web3Clients, Web3ContractMethod, Web3DataParam, Web3Entity, Web3Event } from '../../web3-client';
import { Vault, VaultKycData } from '../vault.model';
import { AbiContract } from '../../core';
import { TransactionType } from '../../transactions';
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
 *
 * @param vault
 * @returns
 */
export declare function getVaultPoolsAddresses(vault: Vault): string[];
/**
 * Get Pool event type
 * @param vault vault object
 * @param from from address
 * @param to to address
 * @returns pool event type (if any)
 */
export declare function getVaultPoolEventType(vault: Vault, event: Web3Event, from: string, to: string): TransactionType | undefined;
/**
 * Check if a transfer is an internal pool
 * @param vault vault object
 * @param from from address
 * @param to to address
 * @returns true | false
 */
export declare function checkVaultPoolInternalTransfer(vault: Vault, event: Web3Event, from: string, to: string): boolean;
/**
 * Check if a specific address corresponds to a vault contract address
 * @param vault vault model
 * @param address address to check
 * @returns true | false
 */
export declare function checkContractAddress(vault: Vault, address: string): boolean;
/**
 * Get all wallet addresses to track from a web3 event
 * @param vault vault object
 * @param event web3 event
 * @returns list of addresses
 */
export declare function getWeb3EventAddresses(vault: Vault, event: Web3Event, transaction?: Transaction): string[];
/**
 * Get ABI contract by code
 * @param abiCode ABI code
 * @returns ABI contract
 */
export declare function getAbiByCode(abiCode: AbiCode): AbiContract;
/**
 * Retrieve Abi Contract by abi or abiCode
 * @param options - the abi or the abiCode
 * @returns the ABI contract
 */
export declare function ensureAbi({ abi, abiCode, }: {
    abi?: AbiContract;
    abiCode?: AbiCode;
}): AbiContract;
