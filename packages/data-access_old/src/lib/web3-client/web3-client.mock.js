import { getWeb3HttpsProvider, WEB3_DEFAULT_ADDR, Web3Client } from '.';
import { ChainMock } from '../chains';
import { VaultAbiParamMock } from '../vaults';
export function Web3BaseContractMock(options) {
    return {
        abi: VaultAbiParamMock(options == null ? void 0 : options.abi),
        address: (options == null ? void 0 : options.address) || WEB3_DEFAULT_ADDR
    };
}
/**
 * Create a Web3ClientsMock
 * @returns the Web3Clients Mock
 */ export function Web3ClientsMock() {
    const tokens = {
        INFURA: process.env['INFURA_TOKEN'],
        ALCHEMY: process.env['ALCHEMY_ZK_TOKEN']
    };
    // ChainsMocked
    const chains = [
        ChainMock({
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
        ChainMock({
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
        ChainMock({
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
        const { web3, provider } = getWeb3HttpsProvider(RPCs, tokens);
        web3Clients[_id] = new Web3Client({
            web3,
            provider,
            blocksPerYear
        });
    }
    return web3Clients;
}

//# sourceMappingURL=web3-client.mock.js.map