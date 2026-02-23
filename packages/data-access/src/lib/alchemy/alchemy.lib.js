"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "initAlchemySocketProvider", {
    enumerable: true,
    get: function() {
        return initAlchemySocketProvider;
    }
});
const _alchemysdk = require("alchemy-sdk");
const _alchemyconst = require("./alchemy.const");
async function initAlchemySocketProvider({ _id, name, chainID }, apiKey) {
    // Init Alchemy
    const network = _alchemyconst.ALCHEMY_CHAINS[chainID];
    const alchemy = new _alchemysdk.Alchemy({
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