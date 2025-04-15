import S from 'fluent-json-schema';
import { sClientEntity, sPageSearchQuery } from '../core';
import { sWeb3ProviderConnection } from '../web3-client/web3-client.model';
import { CHAINS_ROUTES_KEY } from './chain.const';
export function sChain(isPartial) {
    return S.object().id('#chain').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sChainData(isPartial));
}
export function sChainData(isPartial) {
    return S.object().additionalProperties(false).prop('name', S.string()).description('The official name of the blockchain.').prop('hex', S.string()).description('The HEX code of the blockchain.').prop('blocksPerYear', S.number()).description('Number of blocks mined every year.').prop('tokenSymbol', S.string()).description('The token gas symbol associated to the chain e.g. ETH, ARB').prop('chainID', S.number()).description('The official IDentifier of the blockchain.').prop('RPCs', S.array().items(sChainRpc()).minItems(1)).description('List of the RPCs that provide the blockchain.').prop('color', S.string()).description('The color of the chain').prop('isDisabled', S.boolean()).description('The flag to disable the chain.').required(isPartial ? [] : [
        'name',
        'hex',
        'blocksPerYear',
        'chainID'
    ]);
}
export function sChainRpc() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('The RPC official name.').required().prop('isPublic', S.boolean()).description('The visibility flag.').extend(sWeb3ProviderConnection());
}
export var ChainErrorCodes;
(function(ChainErrorCodes) {
    ChainErrorCodes["notFound"] = "CHAIN_NOT_FOUND";
    ChainErrorCodes["notDeletable"] = "CHAIN_NOT_DELETABLE";
})(ChainErrorCodes || (ChainErrorCodes = {}));
export const CHAIN_FIELDS = [
    '_id',
    'name',
    'hex',
    'RPCs',
    'chainID',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const CHAIN_SORT_FIELDS = [
    '_id',
    'name'
];
export function sChainsSearchQuery() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('Name of the chain that must match.').prop('name:ct', S.string()).description('Name of the chain that must be contained.').prop('hex', S.string()).description('HEX of the chain that must match.').prop('chainID', S.number()).description('The official IDentifier of the chain that must match.').extend(sPageSearchQuery(CHAIN_FIELDS, CHAIN_SORT_FIELDS));
}
export var ChainRoutes;
(function(ChainRoutes) {
    ChainRoutes[ChainRoutes["v1Create"] = `v1/${CHAINS_ROUTES_KEY}`] = "v1Create";
    ChainRoutes[ChainRoutes["v1Delete"] = `v1/${CHAINS_ROUTES_KEY}/:chainId`] = "v1Delete";
    ChainRoutes[ChainRoutes["v1Read"] = `v1/${CHAINS_ROUTES_KEY}/:chainId`] = "v1Read";
    ChainRoutes[ChainRoutes["v1Update"] = `v1/${CHAINS_ROUTES_KEY}/:chainId`] = "v1Update";
    ChainRoutes[ChainRoutes["v1Search"] = `v1/${CHAINS_ROUTES_KEY}`] = "v1Search";
})(ChainRoutes || (ChainRoutes = {}));

//# sourceMappingURL=chain.model.js.map