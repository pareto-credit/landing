import { Axios } from 'axios';
import { WalletsClient } from '../wallet.model';
/**
 * Create wallets client
 * @param axios - The Axios instance
 * @returns the wallets GOT client
 */
export declare function createWalletsClient(axios: Axios): WalletsClient;
