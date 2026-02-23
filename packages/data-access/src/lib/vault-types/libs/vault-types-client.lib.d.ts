import { Axios } from 'axios';
import { VaultType, VaultTypeData, VaultTypesClientModel, VaultTypesSearchQuery } from '../vault-type.model';
import { ApiEntity } from '../../core';
export declare class VaultTypesClient extends ApiEntity implements VaultTypesClientModel {
    constructor(axios: Axios);
    /**
     * Create a vault type
     * @param body - the type data
     * @returns the created type
     */
    create(body: VaultTypeData): Promise<VaultType>;
    /**
     * Search types by params
     * @param searchParams - the filters to apply
     * @returns a types page
     */
    search(searchParams?: VaultTypesSearchQuery): Promise<import("../../core").Page<VaultType>>;
    /**
     * List types by params
     * @param searchParams - the filters to apply
     * @returns the types list
     */
    list(searchParams?: VaultTypesSearchQuery): Promise<VaultType[]>;
    /**
     * Find a type by params
     * @param searchParams - the filters to apply
     * @returns an optional type
     */
    findOne(searchParams?: VaultTypesSearchQuery): Promise<VaultType | undefined>;
}
