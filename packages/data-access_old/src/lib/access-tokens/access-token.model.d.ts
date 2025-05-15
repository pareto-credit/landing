/**
 * Client Chain interface
 */
export interface AccessToken extends AccessTokenData {
    _id: string;
    /**
     * Creation date
     */
    createdAt: string;
    /**
     * Token expiration date
     */
    expiresOn?: string;
}
export declare function sAccessToken(): import("fluent-json-schema").ExtendedSchema;
export interface AccessTokenData {
    /**
     * Token JWT signature
     */
    signature: string;
    /**
     * Permission level
     */
    permission: 'READ' | 'WRITE';
    /**
     * User assigned
     */
    userId?: string;
    /**
     * Creation user Id
     */
    createdBy?: string;
}
export declare function sAccessTokenData(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface AccessTokenSignature {
    userId?: string;
    tokenId: string;
}
export declare const ACCESS_TOKENS_ROUTES_KEY = "access-tokens";
export declare enum AccessTokenRoutes {
    v1Create = "v1/access-tokens",
    v1Delete = "v1/access-tokens/:accessTokenId"
}
