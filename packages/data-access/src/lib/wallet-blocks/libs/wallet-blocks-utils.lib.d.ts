import { WalletBlock } from '../wallet-block.model';
/**
 * Get wallet blocks uniq keys
 * @param walletBlocks - the walletBlocks array
 * @returns the array keys
 */
export declare function getWalletBlocksKeys<T = string>(walletBlocks: WalletBlock[], key: keyof WalletBlock): T[];
