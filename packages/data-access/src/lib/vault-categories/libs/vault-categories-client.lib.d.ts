import { Axios } from 'axios';
import { VaultCategory, VaultCategoryData, VaultCategoriesClientModel, VaultCategoriesSearchQuery } from '../vault-category.model';
import { ApiEntity } from '../../core';
export declare class VaultCategoriesClient extends ApiEntity implements VaultCategoriesClientModel {
    constructor(axios: Axios);
    /**
     * Create a vault category
     * @param body - the category data
     * @returns the created category
     */
    create(body: VaultCategoryData): Promise<VaultCategory>;
    /**
     * Search categories by params
     * @param searchParams - the filters to apply
     * @returns a categories page
     */
    search(searchParams?: VaultCategoriesSearchQuery): Promise<import("../../core").Page<VaultCategory>>;
    /**
     * List categories by params
     * @param searchParams - the filters to apply
     * @returns the categories list
     */
    list(searchParams?: VaultCategoriesSearchQuery): Promise<VaultCategory[]>;
    /**
     * Find a category by params
     * @param searchParams - the filters to apply
     * @returns an optional category
     */
    findOne(searchParams?: VaultCategoriesSearchQuery): Promise<VaultCategory | undefined>;
}
