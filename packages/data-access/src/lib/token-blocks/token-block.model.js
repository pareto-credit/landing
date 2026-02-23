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
    TOKEN_BLOCK_FIELDS: function() {
        return TOKEN_BLOCK_FIELDS;
    },
    TOKEN_BLOCK_SORT_FIELDS: function() {
        return TOKEN_BLOCK_SORT_FIELDS;
    },
    TokenBlockRoutes: function() {
        return TokenBlockRoutes;
    },
    sTokenBlock: function() {
        return sTokenBlock;
    },
    sTokenBlockData: function() {
        return sTokenBlockData;
    },
    sTokenBlocksSearchQuery: function() {
        return sTokenBlocksSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _tokenblockconst = require("./token-block.const");
function sTokenBlock(isPartial) {
    return _fluentjsonschema.default.object().id('#tokenBlock').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sTokenBlockData(isPartial));
}
function sTokenBlockData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('block', (0, _core.sBlock)()).prop('tokenId', (0, _core.sStringId)()).description('The IDentifier of token.').prop('tokenAddress', (0, _core.sBCAddress)()).description('The blockchain address of the token.').prop('price', (0, _core.sBigInt)()).description('The token price.').required(isPartial ? [] : [
        'block',
        'tokenId',
        'tokenAddress',
        'price'
    ]);
}
const TOKEN_BLOCK_FIELDS = [
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
const TOKEN_BLOCK_SORT_FIELDS = [
    'block',
    'timestamp'
];
function sTokenBlocksSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenId', (0, _core.sStringId)()).description('Token IDentifier to search.').prop('tokenAddress', (0, _core.sBCAddress)()).description('Token blockchain address to search.').prop('block', _fluentjsonschema.default.array().minItems(1).maxItems(200).items(_fluentjsonschema.default.number())).description('Block number of the token block.').prop('timestamp:gte', _fluentjsonschema.default.number()).description('Start timestamp of the token block.').prop('timestamp:lte', _fluentjsonschema.default.number()).description('End timestamp of the token block.').extend((0, _core.sPageSearchQuery)(TOKEN_BLOCK_FIELDS, TOKEN_BLOCK_SORT_FIELDS));
}
var TokenBlockRoutes;
(function(TokenBlockRoutes) {
    TokenBlockRoutes[TokenBlockRoutes["v1Create"] = `v1/${_tokenblockconst.TOKEN_BLOCKS_ROUTES_KEY}`] = "v1Create";
    TokenBlockRoutes[TokenBlockRoutes["v1Delete"] = `v1/${_tokenblockconst.TOKEN_BLOCKS_ROUTES_KEY}/:tokenBlockId`] = "v1Delete";
    TokenBlockRoutes[TokenBlockRoutes["v1Read"] = `v1/${_tokenblockconst.TOKEN_BLOCKS_ROUTES_KEY}/:tokenBlockId`] = "v1Read";
    TokenBlockRoutes[TokenBlockRoutes["v1Update"] = `v1/${_tokenblockconst.TOKEN_BLOCKS_ROUTES_KEY}/:tokenBlockId`] = "v1Update";
    TokenBlockRoutes[TokenBlockRoutes["v1Search"] = `v1/${_tokenblockconst.TOKEN_BLOCKS_ROUTES_KEY}`] = "v1Search";
})(TokenBlockRoutes || (TokenBlockRoutes = {}));

//# sourceMappingURL=token-block.model.js.map