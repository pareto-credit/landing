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
    CHAIN_FIELDS: function() {
        return CHAIN_FIELDS;
    },
    CHAIN_SORT_FIELDS: function() {
        return CHAIN_SORT_FIELDS;
    },
    ChainErrorCodes: function() {
        return ChainErrorCodes;
    },
    ChainRoutes: function() {
        return ChainRoutes;
    },
    sChain: function() {
        return sChain;
    },
    sChainData: function() {
        return sChainData;
    },
    sChainRpc: function() {
        return sChainRpc;
    },
    sChainsSearchQuery: function() {
        return sChainsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _web3clientmodel = require("../web3-client/web3-client.model");
const _chainconst = require("./chain.const");
function sChain(isPartial) {
    return _fluentjsonschema.default.object().id('#chain').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sChainData(isPartial));
}
function sChainData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('The official name of the blockchain.').prop('hex', _fluentjsonschema.default.string()).description('The HEX code of the blockchain.').prop('blocksPerYear', _fluentjsonschema.default.number()).description('Number of blocks mined every year.').prop('blocksMaxRange', _fluentjsonschema.default.number()).description('Number of max blocks to be synced.').prop('tokenSymbol', _fluentjsonschema.default.string()).description('The token gas symbol associated to the chain e.g. ETH, ARB').prop('chainID', _fluentjsonschema.default.number()).description('The official IDentifier of the blockchain.').prop('RPCs', _fluentjsonschema.default.array().items(sChainRpc()).minItems(1)).description('List of the RPCs that provide the blockchain.').prop('color', _fluentjsonschema.default.string()).description('The color of the chain').prop('isDisabled', _fluentjsonschema.default.boolean()).description('The flag to disable the chain.').required(isPartial ? [] : [
        'name',
        'hex',
        'blocksPerYear',
        'chainID'
    ]);
}
function sChainRpc() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('The RPC official name.').required().prop('isPublic', _fluentjsonschema.default.boolean()).description('The visibility flag.').extend((0, _web3clientmodel.sWeb3ProviderConnection)());
}
var ChainErrorCodes;
(function(ChainErrorCodes) {
    ChainErrorCodes["notFound"] = "CHAIN_NOT_FOUND";
    ChainErrorCodes["notDeletable"] = "CHAIN_NOT_DELETABLE";
})(ChainErrorCodes || (ChainErrorCodes = {}));
const CHAIN_FIELDS = [
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
const CHAIN_SORT_FIELDS = [
    '_id',
    'name'
];
function sChainsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('Name of the chain that must match.').prop('name:ct', _fluentjsonschema.default.string()).description('Name of the chain that must be contained.').prop('hex', _fluentjsonschema.default.string()).description('HEX of the chain that must match.').prop('chainID', _fluentjsonschema.default.number()).description('The official IDentifier of the chain that must match.').extend((0, _core.sPageSearchQuery)(CHAIN_FIELDS, CHAIN_SORT_FIELDS));
}
var ChainRoutes;
(function(ChainRoutes) {
    ChainRoutes[ChainRoutes["v1Create"] = `v1/${_chainconst.CHAINS_ROUTES_KEY}`] = "v1Create";
    ChainRoutes[ChainRoutes["v1Delete"] = `v1/${_chainconst.CHAINS_ROUTES_KEY}/:chainId`] = "v1Delete";
    ChainRoutes[ChainRoutes["v1Read"] = `v1/${_chainconst.CHAINS_ROUTES_KEY}/:chainId`] = "v1Read";
    ChainRoutes[ChainRoutes["v1Update"] = `v1/${_chainconst.CHAINS_ROUTES_KEY}/:chainId`] = "v1Update";
    ChainRoutes[ChainRoutes["v1Search"] = `v1/${_chainconst.CHAINS_ROUTES_KEY}`] = "v1Search";
})(ChainRoutes || (ChainRoutes = {}));

//# sourceMappingURL=chain.model.js.map