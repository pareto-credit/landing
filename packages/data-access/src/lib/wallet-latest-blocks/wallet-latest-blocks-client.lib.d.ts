import { Axios } from 'axios';
import { WalletLatestBlocksClient } from './wallet-latest-block.model';
/**
 * Create wallets latest blocks client
 * @param axios - The Axios instance
 * @returns the wallets latest blocks GOT client
 */
export declare function createWalletLatestBlocksClient(axios: Axios): WalletLatestBlocksClient;
