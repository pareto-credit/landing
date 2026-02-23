import { Axios } from 'axios';
import { Token, TokenData, TokensClientModel, TokensSearchQuery } from '../token.model';
import { ApiEntity } from '../../core';
export declare class TokensClient extends ApiEntity implements TokensClientModel {
    constructor(axios: Axios);
    /**
     * Create a token
     * @param body - the token data
     * @returns the created token
     */
    create(body: TokenData): Promise<Token>;
    /**
     * Search tokens by params
     * @param searchParams - the filters to apply
     * @returns a tokens page
     */
    search(searchParams?: TokensSearchQuery): Promise<import("../../core").Page<Token>>;
    /**
     * List tokens by params
     * @param searchParams - the filters to apply
     * @returns the token list
     */
    list(searchParams?: TokensSearchQuery): Promise<Token[]>;
    /**
     * Find a token by params
     * @param searchParams - the filters to apply
     * @returns an optional token
     */
    findOne(searchParams?: TokensSearchQuery): Promise<Token | undefined>;
    /**
     * Read a token by params or throw
     * @param searchParams - the filters to apply
     * @returns the token
     */
    readOne(searchParams: TokensSearchQuery): Promise<Token>;
}
