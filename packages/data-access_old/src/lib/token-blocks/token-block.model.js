import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sBlock, sClientEntity, sPageSearchQuery, sStringId } from '../core';
import { TOKEN_BLOCKS_ROUTES_KEY } from './token-block.const';
export function sTokenBlock(isPartial) {
    return S.object().id('#tokenBlock').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sTokenBlockData(isPartial));
}
export function sTokenBlockData(isPartial) {
    return S.object().additionalProperties(false).prop('block', sBlock()).prop('tokenId', sStringId()).description('The IDentifier of token.').prop('tokenAddress', sBCAddress()).description('The blockchain address of the token.').prop('price', sBigInt()).description('The token price.').required(isPartial ? [] : [
        'block',
        'tokenId',
        'tokenAddress',
        'price'
    ]);
}
export const TOKEN_BLOCK_FIELDS = [
    '_id',
    'block',
    'tokenId',
    'tokenAddress',
    'price',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const TOKEN_BLOCK_SORT_FIELDS = [
    'block',
    'timestamp'
];
export function sTokenBlocksSearchQuery() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).description('Token IDentifier to search.').prop('tokenAddress', sBCAddress()).description('Token blockchain address to search.').prop('block', S.array().minItems(1).maxItems(200).items(S.number())).description('Block number of the token block.').prop('timestamp:gte', S.number()).description('Start timestamp of the token block.').prop('timestamp:lte', S.number()).description('End timestamp of the token block.').extend(sPageSearchQuery(TOKEN_BLOCK_FIELDS, TOKEN_BLOCK_SORT_FIELDS));
}
export var TokenBlockRoutes;
(function(TokenBlockRoutes) {
    TokenBlockRoutes[TokenBlockRoutes["v1Create"] = `v1/${TOKEN_BLOCKS_ROUTES_KEY}`] = "v1Create";
    TokenBlockRoutes[TokenBlockRoutes["v1Delete"] = `v1/${TOKEN_BLOCKS_ROUTES_KEY}/:tokenBlockId`] = "v1Delete";
    TokenBlockRoutes[TokenBlockRoutes["v1Read"] = `v1/${TOKEN_BLOCKS_ROUTES_KEY}/:tokenBlockId`] = "v1Read";
    TokenBlockRoutes[TokenBlockRoutes["v1Update"] = `v1/${TOKEN_BLOCKS_ROUTES_KEY}/:tokenBlockId`] = "v1Update";
    TokenBlockRoutes[TokenBlockRoutes["v1Search"] = `v1/${TOKEN_BLOCKS_ROUTES_KEY}`] = "v1Search";
})(TokenBlockRoutes || (TokenBlockRoutes = {}));

//# sourceMappingURL=token-block.model.js.map