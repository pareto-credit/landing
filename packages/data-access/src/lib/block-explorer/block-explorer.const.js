"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BLOCK_EXPLORER_PROVIDERS", {
    enumerable: true,
    get: function() {
        return BLOCK_EXPLORER_PROVIDERS;
    }
});
const BLOCK_EXPLORER_PROVIDERS = [
    {
        name: 'Etherscan',
        url: 'https://api.etherscan.io/api',
        env: 'ETHERSCAN_API_TOKEN'
    },
    {
        name: 'Optimism',
        url: 'https://api-optimistic.etherscan.io/api',
        env: 'OPTIMISMSCAN_API_TOKEN'
    },
    {
        name: 'Polygon',
        url: 'https://api-zkevm.polygonscan.com/api',
        env: 'POLYGONSCAN_API_KEY'
    }
];

//# sourceMappingURL=block-explorer.const.js.map