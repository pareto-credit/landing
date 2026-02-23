import { Page } from '../core';
import { WalletBlock, WalletBlocksSearchQuery } from '../wallet-blocks';
export interface WalletLatestBlocksClientModel {
    findOne: (params?: WalletBlocksSearchQuery) => Promise<WalletBlock | undefined>;
    search: (params?: WalletBlocksSearchQuery) => Promise<Page<WalletBlock>>;
    searchAll: (params?: WalletBlocksSearchQuery) => Promise<Page<WalletBlock>>;
    list: (params?: WalletBlocksSearchQuery) => Promise<WalletBlock[]>;
    listAll: (params?: WalletBlocksSearchQuery) => Promise<WalletBlock[]>;
}
export declare enum WalletLatestBlockRoutes {
    v1Search = "v1/wallet-latest-blocks"
}
