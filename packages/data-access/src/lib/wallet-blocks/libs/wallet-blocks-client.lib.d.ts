import { Axios } from 'axios';
import { ApiEntity } from '../../core';
import { WalletBlock, WalletBlocksSearchQuery, WalletBlocksClientModel } from '../wallet-block.model';
export declare class WalletBlocksClient extends ApiEntity implements WalletBlocksClientModel {
    constructor(axios: Axios);
    /**
     * Search wallet latest blocks by params
     * @param searchParams - the wallet block search params
     * @returns the promise for search wallet wallet blocks
     */
    search(searchParams?: WalletBlocksSearchQuery): Promise<import("../../core").Page<WalletBlock>>;
    /**
     * Search all wallet blocks by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: WalletBlocksSearchQuery): Promise<import("../../core").Page<WalletBlock>>;
    /**
     * List wallet blocks by params
     * @param searchParams - the search vault blocks search params
     * @returns the promise for list blocks
     */
    list(searchParams?: WalletBlocksSearchQuery): Promise<WalletBlock[]>;
    /**
     * List all epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    listAll(searchParams?: WalletBlocksSearchQuery): Promise<WalletBlock[]>;
    /**
     * Find an epoch by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    findOne(searchParams?: WalletBlocksSearchQuery): Promise<WalletBlock | undefined>;
}
