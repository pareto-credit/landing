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
    WALLET_BLOCK_FIELDS: function() {
        return WALLET_BLOCK_FIELDS;
    },
    WALLET_BLOCK_SORT_FIELDS: function() {
        return WALLET_BLOCK_SORT_FIELDS;
    },
    WalletBlockErrorCodes: function() {
        return WalletBlockErrorCodes;
    },
    WalletBlockRoutes: function() {
        return WalletBlockRoutes;
    },
    sWalletBlock: function() {
        return sWalletBlock;
    },
    sWalletBlockBody: function() {
        return sWalletBlockBody;
    },
    sWalletBlockData: function() {
        return sWalletBlockData;
    },
    sWalletBlockDistributedRewards: function() {
        return sWalletBlockDistributedRewards;
    },
    sWalletBlocksSearchQuery: function() {
        return sWalletBlocksSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _walletblockconst = require("./wallet-block.const");
const _vaults = require("../vaults");
function sWalletBlock(isPartial) {
    return _fluentjsonschema.default.object().id('#walletBlock').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sWalletBlockData(isPartial));
}
function sWalletBlockData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).description('The IDentifier of the wallet.').prop('walletAddress', (0, _core.sBCAddress)()).description('The blockchain address of the wallet.').prop('vaultId', (0, _core.sStringId)()).description('The IDentifier of the vault.').prop('vaultAddress', (0, _core.sBCAddress)()).description('The blockchain address vault.').prop('block', (0, _core.sBlock)()).description('The block number.').required(isPartial ? [] : [
        'walletId',
        'walletAddress',
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sWalletBlockBody(isPartial));
}
function sWalletBlockBody(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('balance', (0, _core.sBigInt)()).description('The balance of the wallet in the vault.').prop('tokenBalance', (0, _core.sBigInt)()).description('The current token balance of the wallet.').prop('distributedRewards', _fluentjsonschema.default.array().items(sWalletBlockDistributedRewards())).description('List of distributed rewards for the wallet').prop('cdoEpoch', (0, _vaults.sVaultWalletCdoEpochData)()).prop('paretoDollar', (0, _vaults.sVaultWalletParetoDollarData)()).prop('pools', _fluentjsonschema.default.array().items((0, _vaults.sVaultWalletPoolData)()))// Deprecated
    .prop('current', _fluentjsonschema.default.object().additionalProperties(true)).prop('uspAggregated', _fluentjsonschema.default.object().additionalProperties(true)).required(isPartial ? [] : [
        'balance',
        'tokenBalance'
    ]);
}
function sWalletBlockDistributedRewards() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenId', (0, _core.sStringId)()).required().prop('tokenAddress', (0, _core.sBCAddress)()).required().prop('amount', _fluentjsonschema.default.string()).required().prop('amountUSD', _fluentjsonschema.default.string()).required();
}
var WalletBlockErrorCodes;
(function(WalletBlockErrorCodes) {
    WalletBlockErrorCodes["alreadyExists"] = "WALLET_BLOCK_ALREADY_EXISTS";
})(WalletBlockErrorCodes || (WalletBlockErrorCodes = {}));
var WalletBlockRoutes;
(function(WalletBlockRoutes) {
    WalletBlockRoutes[WalletBlockRoutes["v1Create"] = `v1/${_walletblockconst.WALLET_BLOCKS_ROUTES_KEY}`] = "v1Create";
    WalletBlockRoutes[WalletBlockRoutes["v1Delete"] = `v1/${_walletblockconst.WALLET_BLOCKS_ROUTES_KEY}/:walletBlockId`] = "v1Delete";
    WalletBlockRoutes[WalletBlockRoutes["v1Read"] = `v1/${_walletblockconst.WALLET_BLOCKS_ROUTES_KEY}/:walletBlockId`] = "v1Read";
    WalletBlockRoutes[WalletBlockRoutes["v1Update"] = `v1/${_walletblockconst.WALLET_BLOCKS_ROUTES_KEY}/:walletBlockId`] = "v1Update";
    WalletBlockRoutes[WalletBlockRoutes["v1Search"] = `v1/${_walletblockconst.WALLET_BLOCKS_ROUTES_KEY}`] = "v1Search";
})(WalletBlockRoutes || (WalletBlockRoutes = {}));
const WALLET_BLOCK_FIELDS = [
    '_id',
    'walletId',
    'walletAddress',
    'vaultId',
    'vaultAddress',
    'block',
    'balance',
    'tokenBalance'
];
const WALLET_BLOCK_SORT_FIELDS = [
    'balance',
    'tokenBalance',
    'timestamp'
];
function sWalletBlocksSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The wallet IDentifier').prop('walletAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The wallet blockchain address').prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The vault IDentifier').prop('vaultAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The vault blockchain address').prop('balance:gt', _fluentjsonschema.default.string()).description('The wallet minimum balance').prop('tokenBalance:gt', _fluentjsonschema.default.string()).description('The wallet minimum token balance').prop('timestamp:gte', _fluentjsonschema.default.number()).description('Start timestamp of the wallet block.').prop('timestamp:lte', _fluentjsonschema.default.number()).description('End timestamp of the wallet block.').extend((0, _core.sPageSearchQuery)(WALLET_BLOCK_FIELDS, WALLET_BLOCK_SORT_FIELDS));
}

//# sourceMappingURL=wallet-block.model.js.map