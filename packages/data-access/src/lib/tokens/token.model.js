import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sClientEntity, sPageSearchQuery } from '../core';
import { sWeb3ProtocolContract } from '../web3-client';
import { TOKENS_ROUTES_KEY } from './token.const';
export function sToken(isPartial) {
    return S.object().id('#token').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sTokenData(isPartial));
}
export function sTokenData(isPartial) {
    return S.object().additionalProperties(false).prop('name', S.string()).description('The name of the token.').prop('chainId', S.string()).description('The chainID of the token.').prop('address', sBCAddress()).description('The blockchain address of the token.').prop('symbol', S.string()).prop('color', S.string()).prop('decimals', S.number()).prop('oracle', sTokenOracle()).description('Token oracle').required(isPartial ? [] : [
        'name',
        'chainId',
        'address',
        'symbol',
        'decimals'
    ]);
}
export function sTokenOracle() {
    return S.object().additionalProperties(false).prop('USDCAddress', sBCAddress()).prop('wETHAddress', sBCAddress()).prop('stETHAddress', sBCAddress()).prop('USDEAddress', sBCAddress()).prop('ARBAddress', sBCAddress()).prop('OPAddress', sBCAddress()).prop('fee', S.number()).extend(sWeb3ProtocolContract());
}
export function sTokenPriceData() {
    return S.object().additionalProperties(false).prop('price', sBigInt()).required().prop('decimals', S.number()).required();
}
export var TokenErrorCodes;
(function(TokenErrorCodes) {
    TokenErrorCodes["notDeletable"] = "TOKEN_NOT_DELETABLE";
    TokenErrorCodes["dataNotValid"] = "TOKEN_DATA_NOT_VALID";
    TokenErrorCodes["addressMalformed"] = "TOKEN_ADDRESS_MALFORMED";
})(TokenErrorCodes || (TokenErrorCodes = {}));
export const TOKEN_FIELDS = [
    '_id',
    'name',
    'chainId',
    'address',
    'symbol',
    'decimals',
    'oracle',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const TOKEN_SORT_FIELDS = [
    '_id',
    'name'
];
export function sTokensSearchQuery() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('Name of the token that must match.').prop('name:ct', S.string()).description('Name of the token that must be contained.').prop('address', sBCAddress()).description('Blockchain address of the token that must match.').prop('symbol', S.string()).description('Symbol of the token that must match.').prop('chainId', S.string()).description('ChainID of the token that must match.').extend(sPageSearchQuery(TOKEN_FIELDS, TOKEN_SORT_FIELDS));
}
export var TokenRoutes;
(function(TokenRoutes) {
    TokenRoutes[TokenRoutes["v1Create"] = `v1/${TOKENS_ROUTES_KEY}`] = "v1Create";
    TokenRoutes[TokenRoutes["v1Delete"] = `v1/${TOKENS_ROUTES_KEY}/:tokenId`] = "v1Delete";
    TokenRoutes[TokenRoutes["v1Read"] = `v1/${TOKENS_ROUTES_KEY}/:tokenId`] = "v1Read";
    TokenRoutes[TokenRoutes["v1Update"] = `v1/${TOKENS_ROUTES_KEY}/:tokenId`] = "v1Update";
    TokenRoutes[TokenRoutes["v1Search"] = `v1/${TOKENS_ROUTES_KEY}`] = "v1Search";
})(TokenRoutes || (TokenRoutes = {}));

//# sourceMappingURL=token.model.js.map