import { Chain } from '../chains';
import { EthersRPC } from '../ethers';
/**
 * Init Alchemy WebSocket Provider
 * @param chain - the chain object
 * @param apiKey - the Alchemy API Key
 * @returns the ethers provider
 */
export declare function initAlchemySocketProvider({ _id, name, chainID }: Chain, apiKey: string): Promise<EthersRPC>;
