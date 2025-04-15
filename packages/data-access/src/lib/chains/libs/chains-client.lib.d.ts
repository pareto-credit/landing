import { Axios } from 'axios';
import { ChainsClient } from '../chain.model';
/**
 * Create chains client
 * @param axios - The Axios instance
 * @returns the chains AXIOS client
 */
export declare function createChainsClient(axios: Axios): ChainsClient;
