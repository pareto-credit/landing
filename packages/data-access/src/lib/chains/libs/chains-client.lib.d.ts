import { Axios } from 'axios';
import { Chain, ChainsClientModel, ChainsSearchQuery } from '../chain.model';
import { ApiEntity } from '../../core';
export declare class ChainsClient extends ApiEntity implements ChainsClientModel {
    constructor(axios: Axios);
    /**
     * Search chains by params
     * @param searchParams - the filters to apply
     * @returns a chains page
     */
    search(searchParams?: ChainsSearchQuery): Promise<import("../../core").Page<Chain>>;
    /**
     * List chains by params
     * @param searchParams - the filters to apply
     * @returns the chains list
     */
    list(searchParams?: ChainsSearchQuery): Promise<Chain[]>;
    /**
     * Find a chain by params
     * @param searchParams - the filters to apply
     * @returns an optional chain
     */
    findOne(searchParams?: ChainsSearchQuery): Promise<Chain | undefined>;
    /**
     * Read a chain by params or throw
     * @param searchParams - the filters to apply
     * @returns the matching chain
     */
    readOne(searchParams: ChainsSearchQuery): Promise<Chain>;
}
