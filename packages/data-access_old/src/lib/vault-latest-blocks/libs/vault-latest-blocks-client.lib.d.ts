import { Axios } from 'axios';
import { VaultLatestBlocksClient } from '../vault-latest-block.model';
/**
 * Create vault latest blocks client
 * @param axios - The Axios instance
 * @returns the vault latest blocks GOT client
 */
export declare function createVaultLatestBlocksClient(axios: Axios): VaultLatestBlocksClient;
