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
    WALLET_PERFORMANCE_FIELDS: function() {
        return WALLET_PERFORMANCE_FIELDS;
    },
    WALLET_PERFORMANCE_SORT_FIELDS: function() {
        return WALLET_PERFORMANCE_SORT_FIELDS;
    },
    WalletPerformanceErrorCodes: function() {
        return WalletPerformanceErrorCodes;
    },
    WalletPerformanceRoutes: function() {
        return WalletPerformanceRoutes;
    },
    sWalletBlockAmounts: function() {
        return sWalletBlockAmounts;
    },
    sWalletBlockEarnings: function() {
        return sWalletBlockEarnings;
    },
    sWalletBlockEarningsRewards: function() {
        return sWalletBlockEarningsRewards;
    },
    sWalletBlockPerformance: function() {
        return sWalletBlockPerformance;
    },
    sWalletDeposits: function() {
        return sWalletDeposits;
    },
    sWalletDistributedRewards: function() {
        return sWalletDistributedRewards;
    },
    sWalletPerformance: function() {
        return sWalletPerformance;
    },
    sWalletPerformanceData: function() {
        return sWalletPerformanceData;
    },
    sWalletPerformancesSearchQuery: function() {
        return sWalletPerformancesSearchQuery;
    },
    sWalletPosition: function() {
        return sWalletPosition;
    },
    sWalletPositionAggregated: function() {
        return sWalletPositionAggregated;
    },
    sWalletPositionChain: function() {
        return sWalletPositionChain;
    },
    sWalletPositionOperator: function() {
        return sWalletPositionOperator;
    },
    sWalletPositionToken: function() {
        return sWalletPositionToken;
    },
    sWalletVaultBalance: function() {
        return sWalletVaultBalance;
    },
    sWalletVaultHistory: function() {
        return sWalletVaultHistory;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _walletperformanceconst = require("./wallet-performance.const");
const _walletblocks = require("../wallet-blocks");
const _web3client = require("../web3-client");
const _vaults = require("../vaults");
const _transactions = require("../transactions");
function sWalletPerformance(isPartial) {
    return _fluentjsonschema.default.object().id('#walletPerformance').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sWalletPerformanceData(isPartial));
}
function sWalletPerformanceData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).prop('walletAddress', (0, _core.sBCAddress)()).prop('vaultId', (0, _core.sStringId)()).prop('vaultAddress', (0, _core.sBCAddress)()).prop('block', (0, _core.sBlock)()).prop('deposits', sWalletBlockAmounts()).description("The wallet's deposits.").prop('redeemable', sWalletBlockAmounts()).description("The wallet's redeemable amounts.").required(isPartial ? [] : [
        'walletId',
        'walletAddress',
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sWalletBlockPerformance(isPartial));
}
function sWalletPositionAggregated() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultIds', _fluentjsonschema.default.array().items((0, _core.sStringId)())).required().prop('operators', _fluentjsonschema.default.array().items(sWalletPositionOperator())).required().prop('chains', _fluentjsonschema.default.array().items(sWalletPositionChain())).required().prop('tokens', _fluentjsonschema.default.array().items(sWalletPositionToken())).required().prop('deposits', sWalletBlockAmounts()).description("The user's deposits.").required().prop('redeemable', sWalletBlockAmounts()).description("The user's redeemable amounts.").required().prop('pendingDeposits', sWalletBlockAmounts()).description("The user's pending deposits.").required().prop('pendingWithdraws', sWalletBlockAmounts()).description("The user's pending withdraws.").required().extend(sWalletBlockPerformance());
}
function sWalletPositionToken() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).required().prop('tokenId', (0, _core.sStringId)()).required().prop('tokenAddress', (0, _core.sBCAddress)()).required().prop('amount', (0, _core.sBigInt)()).required().prop('USD', (0, _core.sBigInt)()).required().prop('percentage', _fluentjsonschema.default.number()).required().prop('pool', _fluentjsonschema.default.string()).prop('operatorId', (0, _core.sStringId)()).prop('endDate', (0, _core.sDateString)()).prop('protocol', (0, _web3client.sWeb3Protocol)());
}
function sWalletPositionChain() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('chainId', (0, _core.sStringId)()).required().prop('USD', (0, _core.sBigInt)()).required().prop('percentage', _fluentjsonschema.default.number()).required();
}
function sWalletPositionOperator() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('operatorId', (0, _core.sStringId)()).required().prop('USD', (0, _core.sBigInt)()).required().prop('percentage', _fluentjsonschema.default.number()).required();
}
function sWalletDistributedRewards() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('block', (0, _core.sBlock)()).required().prop('APR', _fluentjsonschema.default.number()).required().prop('percentage', _fluentjsonschema.default.number()).required().extend((0, _walletblocks.sWalletBlockDistributedRewards)());
}
function sWalletDeposits() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).required().prop('avgPrice', (0, _core.sBigInt)()).description("The user's avg buy price.").required().prop('deposits', sWalletBlockAmounts()).description("The user's deposits.").required().prop('redeemable', sWalletBlockAmounts()).description("The user's redeemable amounts.").required().prop('pendingDeposits', sWalletBlockAmounts()).description("The user's pending deposits.").required().prop('pendingWithdraws', sWalletBlockAmounts()).description("The user's pending withdraws.").required();
}
function sWalletVaultBalance() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('block', (0, _core.sBlock)()).required().prop('balance', (0, _core.sBigInt)()).description('The balance of the wallet in the vault.').required().prop('tokenBalance', (0, _core.sBigInt)()).description('The current token balance of the wallet.').required();
}
function sWalletPosition() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).required().prop('vaultId', (0, _core.sStringId)()).required().prop('chainId', (0, _core.sStringId)()).required().prop('tokenId', (0, _core.sStringId)()).required().prop('walletAddress', (0, _core.sBCAddress)()).required().prop('vaultAddress', (0, _core.sBCAddress)()).required().prop('tokenAddress', (0, _core.sBCAddress)()).required().prop('vaultPrice', (0, _core.sBigInt)()).description('The current vault price').required().prop('balances', _fluentjsonschema.default.array().items(sWalletVaultBalance())).description("The user's redeemable amounts.").extend(sWalletBlockPerformance()).extend(sWalletDeposits());
}
function sWalletBlockPerformance(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('startBlock', (0, _core.sBlock)()).prop('endBlock', (0, _core.sBlock)()).prop('age', _fluentjsonschema.default.number()).prop('earnings', sWalletBlockEarnings()).description("The user's earnings.").prop('fees', sWalletBlockAmounts()).description("The user's fees.").prop('realizedAPY', _fluentjsonschema.default.number()).description("The user's APY realized.").prop('rewardsRealizedAPY', _fluentjsonschema.default.number()).description("The user's APY realized with rewards.").prop('poolSharePercentage', (0, _core.sPercentage)()).description('The pool share percentage of the user.').prop('accruedRewards', _fluentjsonschema.default.array().items((0, _core.sReward)())).description('The accrued rewards of the user.').prop('collectedRewards', _fluentjsonschema.default.array().items((0, _core.sReward)())).description('The collected rewards of the user.').prop('tokens', _fluentjsonschema.default.array().items(sWalletPositionToken()))// Backward-compatible
    .prop('balance', (0, _core.sBigInt)()).description('The balance of the wallet in the vault.').prop('tokenBalance', (0, _core.sBigInt)()).description('The current token balance of the wallet.').required(isPartial ? [] : [
        'age',
        'earnings',
        'realizedAPY',
        'poolSharePercentage'
    ]);
}
function sWalletBlockAmounts() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('USD', (0, _core.sBigInt)()).description("The wallet's earnings in USD.").required().prop('token', (0, _core.sBigInt)()).description("The wallet's earnings in underlying tokens.").prop('vault', (0, _core.sBigInt)()).description("The wallet's earnings in vault tokens.");
}
function sWalletBlockEarnings() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('percentage', _fluentjsonschema.default.number()).description("The wallet's percentage earnings.").required().prop('rewards', sWalletBlockEarningsRewards()).description("The user's rewards earnings.").extend(sWalletBlockAmounts());
}
function sWalletBlockEarningsRewards() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('USD', (0, _core.sBigInt)()).description("The wallet's rewards USD earnings.").required().prop('percentage', _fluentjsonschema.default.number()).description("The wallet's rewards percentage earnings.").required();
}
function sWalletVaultHistory() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).required().prop('tokenId', (0, _core.sStringId)()).required().prop('action', (0, _transactions.sTransactionType)()).required().prop('block', (0, _core.sBlock)()).required().prop('tokenBalance', (0, _core.sBigInt)()).required().prop('lpBalance', (0, _core.sBigInt)()).required().prop('stakedBalance', (0, _core.sBigInt)()).prop('poolsBalance', (0, _core.sBigInt)()).prop('earnings', (0, _vaults.sWalletEpochStatsEarnings)()).required().prop('earningsPercentage', (0, _vaults.sWalletEpochStatsEarningsPercentage)()).required().prop('price', (0, _core.sBigInt)()).required().prop('amount', (0, _core.sBigInt)()).required().prop('tokenAmount', (0, _core.sBigInt)()).required().prop('realizedAPY', _fluentjsonschema.default.number()).prop('hash', (0, _core.sBCHash)()).prop('epochNumber', _fluentjsonschema.default.number()).prop('operatorId', (0, _core.sStringId)());
}
var WalletPerformanceErrorCodes;
(function(WalletPerformanceErrorCodes) {
    WalletPerformanceErrorCodes["alreadyExists"] = "WALLET_PERFORMANCE_ALREADY_EXISTS";
    WalletPerformanceErrorCodes["rewardProgramNotFound"] = "WALLET_PERFORMANCE_REWARD_PROGRAM_NOT_FOUND";
})(WalletPerformanceErrorCodes || (WalletPerformanceErrorCodes = {}));
const WALLET_PERFORMANCE_FIELDS = [
    '_id',
    'walletId',
    'vaultId',
    'block',
    'age',
    'earnings',
    'realizedAPY',
    'poolSharePercentage',
    'accruedRewards',
    'collectedRewards',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const WALLET_PERFORMANCE_SORT_FIELDS = [
    '_id'
];
function sWalletPerformancesSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('Wallet IDs of the performance that must match.').prop('walletAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The wallet blockchain address').prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('Vault IDs of the performance that must match.').prop('vaultAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The vault blockchain address').prop('timestamp:gte', _fluentjsonschema.default.number()).description('Start timestamp of the performance.').prop('timestamp:lte', _fluentjsonschema.default.number()).description('End timestamp of the performance.').extend((0, _core.sPageSearchQuery)(WALLET_PERFORMANCE_FIELDS, WALLET_PERFORMANCE_SORT_FIELDS));
}
var WalletPerformanceRoutes;
(function(WalletPerformanceRoutes) {
    WalletPerformanceRoutes[WalletPerformanceRoutes["v1Search"] = `v1/${_walletperformanceconst.WALLET_PERFORMANCES_ROUTES_KEY}`] = "v1Search";
})(WalletPerformanceRoutes || (WalletPerformanceRoutes = {}));

//# sourceMappingURL=wallet-performance.model.js.map