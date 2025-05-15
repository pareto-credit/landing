import { Axios } from 'axios';
import { VaultBlocksClient } from '../vault-block.model';
/**
 * Create vaults client
 * @param axios - The Axios instance
 * @returns the vaults GOT client
 */
export declare function createVaultBlocksClient(axios: Axios): VaultBlocksClient;
