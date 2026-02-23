import { ClientEntity, Locales, Page, PageSearchQuery } from '../core';
/**
 * Client Vault interface
 */
export interface VaultType extends VaultTypeData, ClientEntity {
}
export declare function sVaultType(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface VaultTypeData {
    code: string;
    name: Locales<string>;
    description?: Locales<string>;
}
export declare function sVaultTypeData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum VaultTypeErrorCodes {
    collision = "VAULT_TYPE_COLLISION",
    notFound = "VAULT_TYPE_NOT_FOUND",
    notDeletable = "VAULT_TYPE_NOT_DELETABLE",
    alreadyExists = "VAULT_TYPE_ALREADY_EXISTS"
}
export type VaultTypeFields = '_id' | 'code' | 'name' | 'description' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const VAULT_TYPE_FIELDS: string[];
export declare const VAULT_TYPE_SORT_FIELDS: string[];
export interface VaultTypesSearchQuery extends PageSearchQuery<'code', VaultTypeFields> {
    code?: string;
    'code:ct'?: string;
}
export declare function sVaultTypesSearchSchema(): import("fluent-json-schema").ExtendedSchema;
export interface VaultTypesClientModel {
    search: (params?: VaultTypesSearchQuery) => Promise<Page<VaultType>>;
    list: (params?: VaultTypesSearchQuery) => Promise<VaultType[]>;
    findOne: (params?: VaultTypesSearchQuery) => Promise<VaultType | undefined>;
    create: (body: VaultTypeData) => Promise<VaultType>;
}
export declare enum VaultTypeRoutes {
    v1Create = "v1/vault-types",
    v1Delete = "v1/vault-types/:typeId",
    v1Read = "v1/vault-types/:typeId",
    v1Update = "v1/vault-types/:typeId",
    v1Search = "v1/vault-types"
}
