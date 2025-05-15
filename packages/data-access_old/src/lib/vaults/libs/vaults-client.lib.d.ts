import { Axios } from 'axios';
import { VaultsClient } from '../vault.model';
/**
 * Create vaults client
 * @param axios - The Axios instance
 * @returns the vaults GOT client
 */
export declare function createVaultsClient(axios: Axios): VaultsClient;
