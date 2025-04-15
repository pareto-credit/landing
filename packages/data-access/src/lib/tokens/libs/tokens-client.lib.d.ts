import { Axios } from 'axios';
import { TokensClient } from '../token.model';
/**
 * Create tokens client
 * @param axios - The Axios instance
 * @returns the tokens GOT client
 */
export declare function createTokensClient(axios: Axios): TokensClient;
