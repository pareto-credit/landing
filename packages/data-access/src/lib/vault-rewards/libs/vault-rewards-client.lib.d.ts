import { Axios } from 'axios';
import { VaultReward, VaultRewardsClientModel, VaultRewardsSearchQuery } from '../vault-reward.model';
import { ApiEntity } from '../../core';
export declare class VaultRewardsClient extends ApiEntity implements VaultRewardsClientModel {
    constructor(axios: Axios);
    /**
     * Search rewards by params
     * @param searchParams - the search vault rewards search params
     * @returns the promise for search rewards
     */
    search(searchParams?: VaultRewardsSearchQuery): Promise<import("../../core").Page<VaultReward>>;
    /**
     * Search all reward by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: VaultRewardsSearchQuery): Promise<import("../../core").Page<VaultReward>>;
    /**
     * List rewards by params
     * @param searchParams - the search vault rewards search params
     * @returns the promise for list rewards
     */
    list(searchParams?: VaultRewardsSearchQuery): Promise<VaultReward[]>;
    /**
     * List all rewards by params
     * @param searchParams - the search vault rewards search params
     * @returns the promise for list rewards
     */
    listAll(searchParams?: VaultRewardsSearchQuery): Promise<VaultReward[]>;
    /**
     * Find an reward by params
     * @param searchParams - the search params
     * @returns the promise for find an reward
     */
    findOne(searchParams?: VaultRewardsSearchQuery): Promise<VaultReward | undefined>;
}
