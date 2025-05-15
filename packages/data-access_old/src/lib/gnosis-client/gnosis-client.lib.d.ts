import { GnosisClientModel, GnosisSafe } from './gnosis-client.model';
import { Web3Clients } from '../web3-client';
/**
 * API Client class
 */
export declare class GnosisClient implements GnosisClientModel {
    private safeAddress;
    web3: Web3Clients;
    private axios;
    constructor(web3: Web3Clients, safeAddress?: string);
    /**
     * Axios initialization
     */
    private initAxios;
    /**
     * Get safe address to use
     * @param safeAddress safe address
     * @returns safe address
     */
    private getSafeAddress;
    /**
     * Verify gnosis safe signature hash
     * @param message message to sign
     * @param hash signed message hash
     * @param safeAddress safe address
     * @returns true | false
     */
    verifySignature(message: string, hash: string, safeAddress?: string): Promise<boolean>;
    /**
     * Get gnosis safe info from APIs
     * @param safeAddress safe address
     * @returns Safe info if any
     */
    getSafe(safeAddress?: string): Promise<GnosisSafe | undefined>;
}
