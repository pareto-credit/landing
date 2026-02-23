import { Block, ClientEntity, PageSearchQuery, iBigInt } from '../core';
/**
 * Client Token interface
 */
export interface TokenBlock extends TokenBlockData, ClientEntity {
}
export declare function sTokenBlock(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface TokenBlockData {
    block: Block;
    tokenId: string;
    tokenAddress: string;
    price: iBigInt;
}
export declare function sTokenBlockData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type TokenBlockFields = '_id' | 'block' | 'tokenId' | 'tokenAddress' | 'price' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const TOKEN_BLOCK_FIELDS: string[];
export declare const TOKEN_BLOCK_SORT_FIELDS: string[];
export interface TokenBlockSearchQuery extends PageSearchQuery<'block' | 'timestamp', TokenBlockFields> {
    tokenId?: string;
    block?: string | string[];
    tokenAddress?: string;
    'timestamp:gte'?: number;
    'timestamp:lte'?: number;
}
export declare function sTokenBlocksSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export declare enum TokenBlockRoutes {
    v1Create = "v1/token-blocks",
    v1Delete = "v1/token-blocks/:tokenBlockId",
    v1Read = "v1/token-blocks/:tokenBlockId",
    v1Update = "v1/token-blocks/:tokenBlockId",
    v1Search = "v1/token-blocks"
}
