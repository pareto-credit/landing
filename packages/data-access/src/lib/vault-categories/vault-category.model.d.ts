import { ClientEntity, Locales, Page, PageSearchQuery } from '../core';
/**
 * Client Vault interace
 */
export interface VaultCategory extends VaultCategoryData, ClientEntity {
}
export declare function sVaultCategory(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultCategoryData {
    code: string;
    name: Locales<string>;
    description?: Locales<string>;
}
export declare function sVaultCategoryData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum VaultCategoryErrorCodes {
    collision = "VAULT_CATEGORY_COLLISION",
    notFound = "VAULT_CATEGORY_NOT_FOUND",
    notDeletable = "VAULT_CATEGORY_NOT_DELETABLE",
    alreadyExists = "VAULT_CATEGORY_ALREADY_EXISTS"
}
export type VaultCategoryFields = '_id' | 'code' | 'name' | 'description' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_CATEGORY_FIELDS: string[];
export declare const VAULT_CATEGORY_SORT_FIELDS: string[];
export interface VaultCategoriesSearchQuery extends PageSearchQuery<'code', VaultCategoryFields> {
    code?: string;
    'code:ct'?: string;
}
export declare function sVaultCategoriesSearchSchema(): import("fluent-json-schema").ExtendedSchema;
export interface VaultCategoriesClientModel {
    search: (params?: VaultCategoriesSearchQuery) => Promise<Page<VaultCategory>>;
    list: (params?: VaultCategoriesSearchQuery) => Promise<VaultCategory[]>;
    findOne: (params?: VaultCategoriesSearchQuery) => Promise<VaultCategory | undefined>;
    create: (body: VaultCategoryData) => Promise<VaultCategory>;
}
export declare enum VaultCategoryRoutes {
    v1Create = "v1/vault-categories",
    v1Delete = "v1/vault-categories/:typeId",
    v1Read = "v1/vault-categories/:typeId",
    v1Update = "v1/vault-categories/:typeId",
    v1Search = "v1/vault-categories"
}
