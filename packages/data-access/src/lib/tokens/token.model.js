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
    TOKEN_FIELDS: function() {
        return TOKEN_FIELDS;
    },
    TOKEN_SORT_FIELDS: function() {
        return TOKEN_SORT_FIELDS;
    },
    TokenErrorCodes: function() {
        return TokenErrorCodes;
    },
    TokenRoutes: function() {
        return TokenRoutes;
    },
    sToken: function() {
        return sToken;
    },
    sTokenData: function() {
        return sTokenData;
    },
    sTokenOracle: function() {
        return sTokenOracle;
    },
    sTokenPriceData: function() {
        return sTokenPriceData;
    },
    sTokensSearchQuery: function() {
        return sTokensSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _web3client = require("../web3-client");
const _tokenconst = require("./token.const");
function sToken(isPartial) {
    return _fluentjsonschema.default.object().id('#token').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sTokenData(isPartial));
}
function sTokenData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('The name of the token.').prop('chainId', _fluentjsonschema.default.string()).description('The chainID of the token.').prop('address', (0, _core.sBCAddress)()).description('The blockchain address of the token.').prop('symbol', _fluentjsonschema.default.string()).prop('color', _fluentjsonschema.default.string()).prop('decimals', _fluentjsonschema.default.number()).prop('oracle', sTokenOracle()).description('Token oracle').required(isPartial ? [] : [
        'name',
        'chainId',
        'address',
        'symbol',
        'decimals'
    ]);
}
function sTokenOracle() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('USDCAddress', (0, _core.sBCAddress)()).prop('wETHAddress', (0, _core.sBCAddress)()).prop('stETHAddress', (0, _core.sBCAddress)()).prop('USDEAddress', (0, _core.sBCAddress)()).prop('ARBAddress', (0, _core.sBCAddress)()).prop('OPAddress', (0, _core.sBCAddress)()).prop('fee', _fluentjsonschema.default.number()).extend((0, _web3client.sWeb3ProtocolContract)());
}
function sTokenPriceData() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('price', (0, _core.sBigInt)()).required().prop('decimals', _fluentjsonschema.default.number()).required();
}
var TokenErrorCodes;
(function(TokenErrorCodes) {
    TokenErrorCodes["notFound"] = "TOKEN_NOT_FOUND";
    TokenErrorCodes["notDeletable"] = "TOKEN_NOT_DELETABLE";
    TokenErrorCodes["dataNotValid"] = "TOKEN_DATA_NOT_VALID";
    TokenErrorCodes["addressMalformed"] = "TOKEN_ADDRESS_MALFORMED";
})(TokenErrorCodes || (TokenErrorCodes = {}));
const TOKEN_FIELDS = [
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
const TOKEN_SORT_FIELDS = [
    '_id',
    'name'
];
function sTokensSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('Name of the token that must match.').prop('name:ct', _fluentjsonschema.default.string()).description('Name of the token that must be contained.').prop('address', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('Blockchain address of the token that must match.').prop('symbol', _fluentjsonschema.default.string()).description('Symbol of the token that must match.').prop('chainId', _fluentjsonschema.default.string()).description('ChainID of the token that must match.').extend((0, _core.sPageSearchQuery)(TOKEN_FIELDS, TOKEN_SORT_FIELDS));
}
var TokenRoutes;
(function(TokenRoutes) {
    TokenRoutes[TokenRoutes["v1Create"] = `v1/${_tokenconst.TOKENS_ROUTES_KEY}`] = "v1Create";
    TokenRoutes[TokenRoutes["v1Delete"] = `v1/${_tokenconst.TOKENS_ROUTES_KEY}/:tokenId`] = "v1Delete";
    TokenRoutes[TokenRoutes["v1Read"] = `v1/${_tokenconst.TOKENS_ROUTES_KEY}/:tokenId`] = "v1Read";
    TokenRoutes[TokenRoutes["v1Update"] = `v1/${_tokenconst.TOKENS_ROUTES_KEY}/:tokenId`] = "v1Update";
    TokenRoutes[TokenRoutes["v1Search"] = `v1/${_tokenconst.TOKENS_ROUTES_KEY}`] = "v1Search";
})(TokenRoutes || (TokenRoutes = {}));

//# sourceMappingURL=token.model.js.map