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
    VAULT_BLOCK_FIELDS: function() {
        return VAULT_BLOCK_FIELDS;
    },
    VAULT_BLOCK_SORT_FIELDS: function() {
        return VAULT_BLOCK_SORT_FIELDS;
    },
    VaultBlockErrorCodes: function() {
        return VaultBlockErrorCodes;
    },
    VaultBlockRewardProgramErrorCodes: function() {
        return VaultBlockRewardProgramErrorCodes;
    },
    VaultBlockRoutes: function() {
        return VaultBlockRoutes;
    },
    sVaultApr: function() {
        return sVaultApr;
    },
    sVaultAprType: function() {
        return sVaultAprType;
    },
    sVaultBlock: function() {
        return sVaultBlock;
    },
    sVaultBlockAllocation: function() {
        return sVaultBlockAllocation;
    },
    sVaultBlockBody: function() {
        return sVaultBlockBody;
    },
    sVaultBlockCdo: function() {
        return sVaultBlockCdo;
    },
    sVaultBlockCdoEpoch: function() {
        return sVaultBlockCdoEpoch;
    },
    sVaultBlockCdoEpochInstantWithdraws: function() {
        return sVaultBlockCdoEpochInstantWithdraws;
    },
    sVaultBlockCdoEpochQueue: function() {
        return sVaultBlockCdoEpochQueue;
    },
    sVaultBlockCdoEpochWithdraws: function() {
        return sVaultBlockCdoEpochWithdraws;
    },
    sVaultBlockData: function() {
        return sVaultBlockData;
    },
    sVaultBlockDepositTotalRequest: function() {
        return sVaultBlockDepositTotalRequest;
    },
    sVaultBlockInterest: function() {
        return sVaultBlockInterest;
    },
    sVaultBlockInterestRates: function() {
        return sVaultBlockInterestRates;
    },
    sVaultBlockParetoDollar: function() {
        return sVaultBlockParetoDollar;
    },
    sVaultBlockParetoDollarQueue: function() {
        return sVaultBlockParetoDollarQueue;
    },
    sVaultBlockParetoDollarStaking: function() {
        return sVaultBlockParetoDollarStaking;
    },
    sVaultBlockParetoDollarYieldSource: function() {
        return sVaultBlockParetoDollarYieldSource;
    },
    sVaultBlockPool: function() {
        return sVaultBlockPool;
    },
    sVaultBlockPoolAvailable: function() {
        return sVaultBlockPoolAvailable;
    },
    sVaultBlockPoolRates: function() {
        return sVaultBlockPoolRates;
    },
    sVaultBlockPoolToken: function() {
        return sVaultBlockPoolToken;
    },
    sVaultBlockRedeemTotalRequest: function() {
        return sVaultBlockRedeemTotalRequest;
    },
    sVaultBlockRequest: function() {
        return sVaultBlockRequest;
    },
    sVaultBlockRewardProgram: function() {
        return sVaultBlockRewardProgram;
    },
    sVaultBlockStrategy: function() {
        return sVaultBlockStrategy;
    },
    sVaultBlockTotalRequests: function() {
        return sVaultBlockTotalRequests;
    },
    sVaultBlockTvl: function() {
        return sVaultBlockTvl;
    },
    sVaultBlockWithdrawTotalRequest: function() {
        return sVaultBlockWithdrawTotalRequest;
    },
    sVaultBlockWriteoffTotalRequest: function() {
        return sVaultBlockWriteoffTotalRequest;
    },
    sVaultBlocks: function() {
        return sVaultBlocks;
    },
    sVaultBlocksSearchQuery: function() {
        return sVaultBlocksSearchQuery;
    },
    sVaultPoolUtilization: function() {
        return sVaultPoolUtilization;
    },
    sVautlBlockEpochStatus: function() {
        return sVautlBlockEpochStatus;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _web3client = require("../web3-client");
const _vaultblockconst = require("./vault-block.const");
const _vaultepochs = require("../vault-epochs");
const _vaultrequests = require("../vault-requests");
function sVaultBlock(isPartial) {
    return _fluentjsonschema.default.object().id('#vaultBlock').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sVaultBlockData(isPartial));
}
function sVaultBlockInterestRates() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('BASE', _fluentjsonschema.default.number()).required().description('Interest rate from base strategy').prop('HARVEST', _fluentjsonschema.default.number()).description('Interest rate from harvested rewards').prop('REWARDS', _fluentjsonschema.default.number()).description('Interest rate from distributed rewards').prop('GROSS', _fluentjsonschema.default.number()).description('Interest rate including fees').prop('NET', _fluentjsonschema.default.number()).description('Interest rate net of fees').prop('FEE', _fluentjsonschema.default.number()).description('Fees in percentage');
}
function sVaultBlockInterest() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('GROSS', (0, _core.sBigInt)()).description('Interest amount including fees').prop('NET', (0, _core.sBigInt)()).description('Net Interest amount (GROSS - fee)').prop('FEE', (0, _core.sBigInt)()).description('Fees amount');
}
function sVaultBlockRewardProgram() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenId', (0, _core.sStringId)()).required().prop('APR', _fluentjsonschema.default.number()).required().prop('USD', (0, _core.sBigInt)());
}
function sVaultBlockBody(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false)// Common data
    .prop('APRs', sVaultBlockInterestRates()).description('Non-coumponded interest rates').prop('APYs', sVaultBlockInterestRates()).description('Compounded interest rates').prop('interest', sVaultBlockInterest()).prop('lastInterest', sVaultBlockInterest()).description('Interest amounts').prop('totalSupply', (0, _core.sBigInt)()).prop('price', (0, _core.sBigInt)()).prop('TVL', sVaultBlockTvl()).prop('pools', _fluentjsonschema.default.array().items(sVaultBlockPool())).prop('totalRequests', sVaultBlockTotalRequests()).prop('rewardPrograms', _fluentjsonschema.default.array().items(sVaultBlockRewardProgram()))// ContractType based data
    .prop('cdo', sVaultBlockCdo()).prop('cdoEpoch', sVaultBlockCdoEpoch()).prop('strategy', sVaultBlockStrategy()).prop('paretoDollar', sVaultBlockParetoDollar()).prop('allocations', _fluentjsonschema.default.array().items(sVaultBlockAllocation())).prop('requests', _fluentjsonschema.default.array().items(sVaultBlockRequest())).required(isPartial ? [] : [
        'APRs',
        'APYs',
        'totalSupply',
        'price'
    ]);
}
function sVaultBlockParetoDollar() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('queue', sVaultBlockParetoDollarQueue()).prop('staking', sVaultBlockParetoDollarStaking());
}
function sVaultBlockParetoDollarYieldSource() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenId', (0, _core.sStringId)()).prop('vaultId', (0, _core.sStringId)()).prop('operatorId', (0, _core.sStringId)()).prop('tokenAddress', (0, _core.sBCAddress)()).required().prop('sourceAddress', (0, _core.sBCAddress)()).required().prop('vaultAddress', (0, _core.sBCAddress)()).required().prop('maxCap', (0, _core.sBigInt)()).required().prop('depositedAmount', (0, _core.sBigInt)()).required().prop('vaultType', _fluentjsonschema.default.number()).required();
}
function sVaultBlockParetoDollarQueue() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('epochNumber', _fluentjsonschema.default.number()).description('Queue contract epoch number').required().prop('totalCollateralsScaled', (0, _core.sBigInt)()).description('Queue contract total collateral scaled').required().prop('unlentBalanceScaled', (0, _core.sBigInt)()).description('Queue contract total unlent balance scaled').required().prop('totalReservedWithdrawals', (0, _core.sBigInt)()).description('Queue contract total reserved withdrawals').required().prop('yieldSources', _fluentjsonschema.default.array().items(sVaultBlockParetoDollarYieldSource())).description('Queue contract yield sources').required().prop('epochPending', (0, _core.sBigInt)()).description('Current epoch pending').prop('prevEpochPending', (0, _core.sBigInt)()).description('Previous epoch pending');
}
function sVaultBlockParetoDollarStaking() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('totalSupply', (0, _core.sBigInt)()).description('USP Staking contract total supply').required().prop('totalAssets', (0, _core.sBigInt)()).description('USP Staking contract total assets').required().prop('rewardsLastDeposit', (0, _core.sBigInt)()).description('USP Staking contract rewards last deposit').required();
}
function sVaultBlockRequest() {
    return _fluentjsonschema.default.object().additionalProperties(false).extend((0, _vaultrequests.sVaultRequest)(true));
}
function sVaultBlockTotalRequests() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('DEPOSIT', sVaultBlockDepositTotalRequest()).prop('WITHDRAW', sVaultBlockWithdrawTotalRequest()).prop('REDEEM', sVaultBlockRedeemTotalRequest()).prop('WRITEOFF', sVaultBlockWriteoffTotalRequest());
}
function sVaultBlockDepositTotalRequest() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('PENDING', (0, _core.sBigInt)()).required().prop('CLAIMED', (0, _core.sBigInt)()).required();
}
function sVaultBlockWithdrawTotalRequest() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('PENDING', (0, _core.sBigInt)()).required().prop('PROCESSED', (0, _core.sBigInt)()).required().prop('CLAIMABLE', (0, _core.sBigInt)()).required().prop('INSTANT_CLAIMABLE', (0, _core.sBigInt)()).required().prop('CLAIMED', (0, _core.sBigInt)()).required();
}
function sVaultBlockRedeemTotalRequest() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('PENDING', (0, _core.sBigInt)()).required().prop('CLAIMED', (0, _core.sBigInt)()).required();
}
function sVaultBlockWriteoffTotalRequest() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('PENDING', (0, _core.sBigInt)()).required().prop('FULFILLED', (0, _core.sBigInt)());
}
function sVaultBlockCdoEpoch() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('apr', _fluentjsonschema.default.number()).required().prop('lastInterest', (0, _core.sBigInt)()).required().prop('expectedInterest', (0, _core.sBigInt)()).required().prop('unclaimedFees', (0, _core.sBigInt)()).required().prop('deposits', (0, _core.sBigInt)()).required().prop('duration', _fluentjsonschema.default.number()).required().prop('status', sVautlBlockEpochStatus()).required().prop('contractValue', (0, _core.sBigInt)()).prop('lastApr', _fluentjsonschema.default.number()).prop('count', _fluentjsonschema.default.number()).prop('startDate', (0, _core.sDateString)()).prop('endDate', (0, _core.sDateString)()).prop('startCureDate', (0, _core.sDateString)()).prop('epochNumber', _fluentjsonschema.default.number()).prop('bufferDuration', _fluentjsonschema.default.number()).prop('withdrawType', (0, _vaultepochs.sVaultEpochWithdrawType)()).prop('withdraws', sVaultBlockCdoEpochWithdraws()).prop('depositQueue', sVaultBlockCdoEpochQueue()).prop('withdrawQueue', sVaultBlockCdoEpochQueue()).prop('instantWithdraws', sVaultBlockCdoEpochInstantWithdraws());
}
function sVaultBlockCdoEpochQueue() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('amount', (0, _core.sBigInt)()).required().prop('lastAmount', (0, _core.sBigInt)()).prop('isInstant', _fluentjsonschema.default.boolean()).prop('epochWithdrawPrice', (0, _core.sBigInt)());
}
function sVaultBlockCdoEpochInstantWithdraws() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('allowed', _fluentjsonschema.default.boolean()).required().prop('delay', _fluentjsonschema.default.number()).required().prop('amount', (0, _core.sBigInt)()).required().prop('aprDelta', _fluentjsonschema.default.number()).required().prop('deadline', (0, _core.sDateString)()).prop('disabled', _fluentjsonschema.default.boolean());
}
function sVaultBlockCdoEpochWithdraws() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('amount', (0, _core.sBigInt)()).required().prop('fees', (0, _core.sBigInt)()).required();
}
function sVaultBlockCdo() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('APRSplitRatio', (0, _core.sBigInt)()).prop('currentAARatio', (0, _core.sBigInt)());
}
function sVaultBlockStrategy() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('APR', (0, _core.sBigInt)()).prop('rewardTokens', _fluentjsonschema.default.array().items(_fluentjsonschema.default.string()));
}
function sVaultBlockTvl() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('token', (0, _core.sBigInt)()).required().prop('USD', (0, _core.sBigInt)()).required().prop('withRequestsToken', (0, _core.sBigInt)()).description('TVL including pending deposits and withdraws').prop('withRequestsUSD', (0, _core.sBigInt)()).description('TVL + pending requests converted in USD');
}
function sVaultApr() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('type', sVaultAprType()).required().prop('rate', _fluentjsonschema.default.number()).required();
}
function sVaultAprType() {
    return _fluentjsonschema.default.string().enum([
        'BASE',
        'HARVEST',
        'REWARDS',
        'EPOCH',
        'BUFFER',
        'GROSS'
    ]);
}
function sVaultBlockPool() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('address', (0, _core.sBCAddress)()).required().prop('protocol', (0, _web3client.sWeb3Protocol)()).required().prop('rates', sVaultBlockPoolRates()).prop('utilization', sVaultPoolUtilization()).prop('available', sVaultBlockPoolAvailable()).prop('APR', _fluentjsonschema.default.number()).prop('tokens', _fluentjsonschema.default.array().items(sVaultBlockPoolToken())).prop('exchangeRate', (0, _core.sBigInt)()).prop('underlyingBalance', (0, _core.sBigInt)()).prop('totalSupply', (0, _core.sBigInt)());
}
function sVaultBlockPoolToken() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tokenAddress', (0, _core.sBCAddress)()).required().prop('balance', (0, _core.sBigInt)()).required().prop('balanceScaled', (0, _core.sBigInt)()).required();
}
var VaultBlockErrorCodes;
(function(VaultBlockErrorCodes) {
    VaultBlockErrorCodes["notFound"] = "VAULT_BLOCK_NOT_FOUND";
    VaultBlockErrorCodes["alreadyExists"] = "VAULT_BLOCK_ALREADY_EXISTS";
    VaultBlockErrorCodes["wrongContractType"] = "VAULT_BLOCK_WRONG_CONTRACT_TYPE";
})(VaultBlockErrorCodes || (VaultBlockErrorCodes = {}));
var VaultBlockRewardProgramErrorCodes;
(function(VaultBlockRewardProgramErrorCodes) {
    VaultBlockRewardProgramErrorCodes["tokenNotFound"] = "VAULT_BLOCK_REWARD_PROGRAM_TOKEN_NOT_FOUND";
})(VaultBlockRewardProgramErrorCodes || (VaultBlockRewardProgramErrorCodes = {}));
const VAULT_BLOCK_FIELDS = [
    '_id',
    'vaultId',
    'vaultAddress',
    'block',
    'APRs',
    'APYs',
    'totalSupply',
    'price',
    'TVL',
    'pools',
    'allocations',
    'cdo',
    'cdoEpoch',
    'strategy',
    'requests',
    'totalRequests',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const VAULT_BLOCK_SORT_FIELDS = [
    'block',
    'timestamp'
];
function sVaultBlocksSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The vault IDentifier').prop('vaultAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The vault blockchain address').prop('block', _fluentjsonschema.default.array().minItems(1).maxItems(200).items(_fluentjsonschema.default.number())).description('The block number that must match').prop('timestamp:gt', _fluentjsonschema.default.number()).description('The block timestamp greater than').prop('timestamp:gte', _fluentjsonschema.default.number()).description('The block timestamp greater or equal than').prop('timestamp:lt', _fluentjsonschema.default.number()).description('The block timestamp less than').prop('timestamp:lte', _fluentjsonschema.default.number()).description('The block timestamp less or equal than').prop('cdoEpoch.status', _fluentjsonschema.default.array().minItems(1).maxItems(200).items(sVautlBlockEpochStatus())).description('The cdoEpoch status that must match').extend((0, _core.sPageSearchQuery)(VAULT_BLOCK_FIELDS, VAULT_BLOCK_SORT_FIELDS));
}
function sVautlBlockEpochStatus() {
    return _fluentjsonschema.default.string().enum([
        'WAITING',
        'RUNNING',
        'DEFAULTED',
        'CURE'
    ]);
}
var VaultBlockRoutes;
(function(VaultBlockRoutes) {
    VaultBlockRoutes[VaultBlockRoutes["v1Create"] = `v1/${_vaultblockconst.VAULT_BLOCKS_ROUTES_KEY}`] = "v1Create";
    VaultBlockRoutes[VaultBlockRoutes["v1Delete"] = `v1/${_vaultblockconst.VAULT_BLOCKS_ROUTES_KEY}/:vaultBlockId`] = "v1Delete";
    VaultBlockRoutes[VaultBlockRoutes["v1Read"] = `v1/${_vaultblockconst.VAULT_BLOCKS_ROUTES_KEY}/:vaultBlockId`] = "v1Read";
    VaultBlockRoutes[VaultBlockRoutes["v1Update"] = `v1/${_vaultblockconst.VAULT_BLOCKS_ROUTES_KEY}/:vaultBlockId`] = "v1Update";
    VaultBlockRoutes[VaultBlockRoutes["v1Search"] = `v1/${_vaultblockconst.VAULT_BLOCKS_ROUTES_KEY}`] = "v1Search";
})(VaultBlockRoutes || (VaultBlockRoutes = {}));
function sVaultBlockData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).prop('vaultAddress', (0, _core.sBCAddress)()).prop('block', (0, _core.sBlock)()).required(isPartial ? [] : [
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sVaultBlockBody(isPartial));
}
function sVaultBlockPoolRates() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('supply', _fluentjsonschema.default.number()).required().prop('borrow', _fluentjsonschema.default.number()).required();
}
function sVaultPoolUtilization() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('supplied', (0, _core.sBigInt)()).required().prop('borrowed', (0, _core.sBigInt)()).required().prop('rate', _fluentjsonschema.default.number()).required();
}
function sVaultBlockPoolAvailable() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('toBorrow', (0, _core.sBigInt)()).required().prop('toWithDraw', (0, _core.sBigInt)()).required();
}
function sVaultBlockAllocation() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).prop('vaultAddress', (0, _core.sBCAddress)()).required().prop('percentage', _fluentjsonschema.default.number()).required();
}
function sVaultBlocks() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('current', sVaultBlockData()).required().prop('last', sVaultBlockData());
}

//# sourceMappingURL=vault-block.model.js.map