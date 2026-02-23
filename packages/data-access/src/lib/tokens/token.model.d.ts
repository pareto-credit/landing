import { ClientEntity, Page, PageSearchQuery } from '../core';
import { Web3ProtocolContract } from '../web3-client';
/**
 * Client Token interface
 */
export interface Token extends TokenData, ClientEntity {
}
export declare function sToken(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface TokenData {
    name: string;
    address: string;
    color?: string;
    symbol: string;
    decimals: number;
    chainId: string;
    oracle?: TokenOracle;
}
export declare function sTokenData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface TokenOracle extends Web3ProtocolContract {
    USDCAddress?: string;
    wETHAddress?: string;
    stETHAddress?: string;
    USDEAddress?: string;
    MATICAddress?: string;
    ARBAddress?: string;
    OPAddress?: string;
    fee?: number;
}
export declare function sTokenOracle(): import("fluent-json-schema").ExtendedSchema;
export interface TokenPriceData {
    price: string;
    decimals: number;
}
export declare function sTokenPriceData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum TokenErrorCodes {
    notFound = "TOKEN_NOT_FOUND",
    notDeletable = "TOKEN_NOT_DELETABLE",
    dataNotValid = "TOKEN_DATA_NOT_VALID",
    addressMalformed = "TOKEN_ADDRESS_MALFORMED"
}
export type TokenFields = '_id' | 'name' | 'chainId' | 'address' | 'symbol' | 'decimals' | 'oracle';
export declare const TOKEN_FIELDS: string[];
export declare const TOKEN_SORT_FIELDS: string[];
export interface TokensSearchQuery extends PageSearchQuery<'name'> {
    name?: string;
    'name:ct'?: string;
    address?: string | string[];
    symbol?: string;
    chainId?: string;
}
export declare function sTokensSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface TokensClientModel {
    search: (params?: TokensSearchQuery) => Promise<Page<Token>>;
    list: (params?: TokensSearchQuery) => Promise<Token[]>;
    findOne: (params?: TokensSearchQuery) => Promise<Token | undefined>;
    readOne: (params: TokensSearchQuery) => Promise<Token>;
    create: (body: TokenData) => Promise<Token>;
}
export declare enum TokenRoutes {
    v1Create = "v1/tokens",
    v1Delete = "v1/tokens/:tokenId",
    v1Read = "v1/tokens/:tokenId",
    v1Update = "v1/tokens/:tokenId",
    v1Search = "v1/tokens"
}
