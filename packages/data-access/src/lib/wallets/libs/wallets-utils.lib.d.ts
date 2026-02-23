import { Wallet } from '../wallet.model';
/**
 * Get wallets uniq keys
 * @param wallets - the wallets array
 * @returns the array keys
 */
export declare function getWalletsKeys<T = string>(wallets: Wallet[], key: keyof Wallet): T[];
