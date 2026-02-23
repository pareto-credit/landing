import { Page, PageSearchQuery } from '../core';
import { ClientEntity } from '../core';
import { Web3ProviderConnection } from '../web3-client/web3-client.model';
/**
 * Client Chain interface
 */
export interface Chain extends ChainData, ClientEntity {
}
export declare function sChain(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface ChainData {
    name: string;
    hex: string;
    blocksPerYear: number;
    blocksMaxRange?: number;
    tokenSymbol?: string;
    color?: string;
    chainID: number;
    RPCs?: ChainRpc[];
    isDisabled?: boolean;
}
export declare function sChainData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface ChainRpc extends Web3ProviderConnection {
    name: string;
    isPublic?: boolean;
}
export declare function sChainRpc(): import("fluent-json-schema").ExtendedSchema;
export declare enum ChainErrorCodes {
    notFound = "CHAIN_NOT_FOUND",
    notDeletable = "CHAIN_NOT_DELETABLE"
}
export type ChainFields = '_id' | 'name' | 'hex' | 'RPCs' | 'chainID' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const CHAIN_FIELDS: string[];
export declare const CHAIN_SORT_FIELDS: string[];
export interface ChainsSearchQuery extends PageSearchQuery<'name', ChainFields> {
    name?: string;
    'name:ct'?: string;
    hex?: string;
    RPCs?: boolean;
    chainID?: number;
}
export declare function sChainsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface ChainsClientModel {
    search: (params?: ChainsSearchQuery) => Promise<Page<Chain>>;
    list: (params?: ChainsSearchQuery) => Promise<Chain[]>;
    findOne: (params?: ChainsSearchQuery) => Promise<Chain | undefined>;
    readOne: (params: ChainsSearchQuery) => Promise<Chain | undefined>;
}
export declare enum ChainRoutes {
    v1Create = "v1/chains",
    v1Delete = "v1/chains/:chainId",
    v1Read = "v1/chains/:chainId",
    v1Update = "v1/chains/:chainId",
    v1Search = "v1/chains"
}
