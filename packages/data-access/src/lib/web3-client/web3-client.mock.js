"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Web3BaseContractMock: function() {
        return Web3BaseContractMock;
    },
    Web3ClientsMock: function() {
        return Web3ClientsMock;
    }
});
const _ = require(".");
const _chains = require("../chains");
const _vaults = require("../vaults");
function Web3BaseContractMock(options) {
    return {
        abi: (0, _vaults.VaultAbiParamMock)(options == null ? void 0 : options.abi),
        address: (options == null ? void 0 : options.address) || _.WEB3_DEFAULT_ADDR
    };
}
function Web3ClientsMock() {
    const tokens = {
        INFURA: process.env['INFURA_TOKEN'],
        ALCHEMY: process.env['ALCHEMY_ZK_TOKEN']
    };
    // ChainsMocked
    const chains = [
        (0, _chains.ChainMock)({
            _id: '6672a503689d1ff1e80e4ec1',
            name: 'OP Mainnet',
            hex: '0xa',
            chainID: 10,
            RPCs: [
                {
                    name: 'Infura Optimism',
                    provider: 'INFURA',
                    https: 'https://optimism-mainnet.infura.io/v3/',
                    wss: 'wss://optimism-mainnet.infura.io/ws/v3/'
                }
            ],
            blocksPerYear: 15768000
        }),
        (0, _chains.ChainMock)({
            _id: '6659d1cf6d1cfe32afdfcd96',
            name: 'Ethereum Mainnet',
            hex: '0x1',
            chainID: 1,
            RPCs: [
                {
                    name: 'Infura Mainnet',
                    provider: 'INFURA',
                    https: 'https://mainnet.infura.io/v3/',
                    wss: 'wss://mainnet.infura.io/ws/v3/'
                }
            ],
            blocksPerYear: 2613400
        }),
        (0, _chains.ChainMock)({
            _id: '674704dec66aaf0857b07c08',
            name: 'Arbitrum One',
            hex: '0xa4b1',
            blocksPerYear: 126144000,
            chainID: 42161,
            RPCs: [
                {
                    name: 'Infura Arbitrum',
                    provider: 'INFURA',
                    https: 'https://arbitrum-mainnet.infura.io/v3/',
                    wss: 'wss://arbitrum-mainnet.infura.io/ws/v3/'
                }
            ]
        })
    ];
    const web3Clients = {};
    for (const { _id, RPCs = [], blocksPerYear } of chains){
        const { web3, provider } = (0, _.getWeb3HttpsProvider)(RPCs, tokens);
        web3Clients[_id] = new _.Web3Client({
            web3,
            provider,
            blocksPerYear
        });
    }
    return web3Clients;
}

//# sourceMappingURL=web3-client.mock.js.map