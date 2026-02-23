import { Axios } from 'axios';
import { VaultLatestBlocksClientModel } from '../vault-latest-block.model';
import { VaultBlock, VaultBlocksSearchQuery } from '../../vault-blocks';
import { ApiEntity } from '../../core';
export declare class VaultLatestBlocksClient extends ApiEntity implements VaultLatestBlocksClientModel {
    constructor(axios: Axios);
    /**
     * Search latest blocks by params
     * @param searchParams - the filters to apply
     * @returns a blocks page
     */
    search(searchParams?: VaultBlocksSearchQuery): Promise<import("../../core").Page<VaultBlock>>;
    /**
     * List latest blocks by params
     * @param searchParams - the filters to apply
     * @returns the block list
     */
    list(searchParams?: VaultBlocksSearchQuery): Promise<VaultBlock[]>;
    /**
     * Read a latest block by params
     * @param searchParams - the filters to apply
     * @returns the matching block
     */
    readOne(searchParams: VaultBlocksSearchQuery): Promise<VaultBlock>;
    /**
     * Find a latest block by params
     * @param searchParams - the filters to apply
     * @returns the matching block
     */
    findOne(searchParams: VaultBlocksSearchQuery): Promise<VaultBlock | undefined>;
}
