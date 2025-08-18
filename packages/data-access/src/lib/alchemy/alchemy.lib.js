import { Alchemy } from 'alchemy-sdk';
import { ALCHEMY_CHAINS } from './alchemy.const';
/**
 * Init Alchemy WebSocket Provider
 * @param chain - the chain object
 * @param apiKey - the Alchemy API Key
 * @returns the ethers provider
 */ export async function initAlchemySocketProvider({ _id, name, chainID }, apiKey) {
    // Init Alchemy
    const network = ALCHEMY_CHAINS[chainID];
    const alchemy = new Alchemy({
        apiKey,
        network
    });
    // Provider
    const provider = await alchemy.config.getWebSocketProvider();
    return {
        chain: {
            _id,
            name,
            chainID
        },
        provider
    };
}

//# sourceMappingURL=alchemy.lib.js.map