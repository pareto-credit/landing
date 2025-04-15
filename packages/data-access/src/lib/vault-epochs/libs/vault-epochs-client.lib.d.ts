import { Axios } from 'axios';
import { VaultEpoch, VaultEpochData, VaultEpochsClientModel, VaultEpochsSearchQuery } from '../vault-epoch.model';
import { ApiEntity } from '../../core';
export declare class VaultEpochsClient extends ApiEntity implements VaultEpochsClientModel {
    constructor(axios: Axios);
    /**
     * Create a vault epoch
     * @param body - the vault epoch data
     * @returns the promise for create a new vault epoch
     */
    create(body: VaultEpochData): Promise<VaultEpoch>;
    /**
     * Search epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for search epochs
     */
    search(searchParams?: VaultEpochsSearchQuery): Promise<import("../../core").Page<VaultEpoch>>;
    /**
     * Search all epoch by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: VaultEpochsSearchQuery): Promise<import("../../core").Page<VaultEpoch>>;
    /**
     * List epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    list(searchParams?: VaultEpochsSearchQuery): Promise<VaultEpoch[]>;
    /**
     * List all epochs by params
     * @param searchParams - the search vault epochs search params
     * @returns the promise for list epochs
     */
    listAll(searchParams?: VaultEpochsSearchQuery): Promise<VaultEpoch[]>;
    /**
     * Find an epoch by params
     * @param searchParams - the search params
     * @returns the promise for find an epoch
     */
    findOne(searchParams?: VaultEpochsSearchQuery): Promise<VaultEpoch | undefined>;
}
