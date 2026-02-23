import { Axios } from 'axios';
import { VaultBlock, VaultBlockData, VaultBlocksClientModel, VaultBlocksSearchQuery } from '../vault-block.model';
import { ApiEntity } from '../../core';
export declare class VaultBlocksClient extends ApiEntity implements VaultBlocksClientModel {
    constructor(axios: Axios);
    /**
     * Create a vault block
     * @param body - the vault block data
     * @returns the promise for create a new vault block
     */
    create(body: VaultBlockData): Promise<VaultBlock>;
    /**
     * Search blocks by params
     * @param searchParams - the vault blocks search params
     * @returns the promise for search blocks
     */
    search(searchParams?: VaultBlocksSearchQuery): Promise<import("../../core").Page<VaultBlock>>;
    /**
     * Search all blocks by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: VaultBlocksSearchQuery): Promise<import("../../core").Page<VaultBlock>>;
    /**
     * List epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    list(searchParams?: VaultBlocksSearchQuery): Promise<VaultBlock[]>;
    /**
     * List all epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    listAll(searchParams?: VaultBlocksSearchQuery): Promise<VaultBlock[]>;
    /**
     * Find an epoch by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    findOne(searchParams?: VaultBlocksSearchQuery): Promise<VaultBlock | undefined>;
    /**
     * Find an epoch by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    readOne(searchParams?: VaultBlocksSearchQuery): Promise<VaultBlock>;
}
