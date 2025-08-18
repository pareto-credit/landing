import S from 'fluent-json-schema';
import { sAbiContract, sBCAddress, sBigInt, sStringId } from '../core';
export function sERC20Token() {
    return S.object().additionalProperties(false).prop('decimals', S.number()).required().prop('symbol', S.string()).required().prop('name', S.string()).required().prop('address', sBCAddress()).required();
}
export function sWeb3Protocol() {
    return S.string().enum([
        'Idle',
        'Clearpool',
        'AaveV2',
        'Morpho',
        'Gearbox',
        'Compound',
        'Lido',
        'InstadApp',
        'Ethena',
        'UniswapV2',
        'UniswapV3',
        'Curve',
        'Sky',
        'Balancer',
        'BalancerGauge',
        'NapierPT',
        'NapierYT',
        'NapierLP',
        'PendlePT',
        'PendleLP',
        'PendleSY',
        'Euler'
    ]);
}
export function sWeb3ProviderConnection() {
    return S.object().additionalProperties(false).prop('provider', sWeb3RPCProvider()).description('The RPC provider.').required().prop('https', S.string()).description('The RPC official https URL.').prop('wss', S.string()).description('The RPC official wss URL.');
}
export function sWeb3RPCProvider() {
    return S.string().enum([
        'INFURA',
        'ALCHEMY'
    ]);
}
export function sWeb3ProtocolContract() {
    return S.object().additionalProperties(false).prop('protocol', sWeb3Protocol()).prop('fromBlock', sBigInt()).prop('operatorId', sStringId()).extend(sWeb3BaseContract());
}
export function sWeb3BaseContract() {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).required().prop('abi', sAbiContract()).required();
}

//# sourceMappingURL=web3-client.model.js.map