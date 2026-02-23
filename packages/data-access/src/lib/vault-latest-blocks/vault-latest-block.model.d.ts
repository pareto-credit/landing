import { Page } from '../core';
import { VaultBlock, VaultBlocksSearchQuery } from '../vault-blocks';
export interface VaultLatestBlocksClientModel {
    search: (params?: VaultBlocksSearchQuery) => Promise<Page<VaultBlock>>;
    list: (params?: VaultBlocksSearchQuery) => Promise<VaultBlock[]>;
    readOne: (params: VaultBlocksSearchQuery) => Promise<VaultBlock>;
}
export declare enum VaultLatestBlockRoutes {
    v1Search = "v1/vault-latest-blocks"
}
