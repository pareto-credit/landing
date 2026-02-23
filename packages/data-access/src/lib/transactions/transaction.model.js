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
    TRANSACTION_FIELDS: function() {
        return TRANSACTION_FIELDS;
    },
    TRANSACTION_SORT_FIELDS: function() {
        return TRANSACTION_SORT_FIELDS;
    },
    TRANSACTION_TYPES: function() {
        return TRANSACTION_TYPES;
    },
    TRANSACTION_TYPES_CDO_EPOCH: function() {
        return TRANSACTION_TYPES_CDO_EPOCH;
    },
    TRANSACTION_TYPES_COMMON: function() {
        return TRANSACTION_TYPES_COMMON;
    },
    TRANSACTION_TYPES_PARETO_DOLLAR: function() {
        return TRANSACTION_TYPES_PARETO_DOLLAR;
    },
    TransactionRoutes: function() {
        return TransactionRoutes;
    },
    sTransaction: function() {
        return sTransaction;
    },
    sTransactionData: function() {
        return sTransactionData;
    },
    sTransactionType: function() {
        return sTransactionType;
    },
    sTransactionTypeCdoEpoch: function() {
        return sTransactionTypeCdoEpoch;
    },
    sTransactionTypeParetoDollar: function() {
        return sTransactionTypeParetoDollar;
    },
    sTransactionsSearchQuery: function() {
        return sTransactionsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _transactionconst = require("./transaction.const");
const _lodash = require("lodash");
function sTransaction(isPartial) {
    return _fluentjsonschema.default.object().id('#transaction').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sTransactionData(isPartial));
}
function sTransactionData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', (0, _core.sStringId)()).description('The vault IDentifier.').prop('vaultAddress', (0, _core.sBCAddress)()).description('The vault blockchain address.').prop('walletId', (0, _core.sStringId)()).description('The IDentifier of the wallet.').prop('walletAddress', (0, _core.sBCAddress)()).description('The wallet blockchain address.').prop('fromAddress', (0, _core.sBCAddress)()).description('The from blockchain address.').prop('toAddress', (0, _core.sBCAddress)()).description('The to blockchain address.').prop('tokenId', (0, _core.sStringId)()).description('The token IDentifier.').prop('operatorId', (0, _core.sStringId)()).description('The operator IDentifier.').prop('type', sTransactionType()).description('The transaction type.').prop('hash', (0, _core.sBCHash)()).description('The transaction hash.').prop('block', (0, _core.sBlock)()).description('The transaction blockchain block.').prop('amount', (0, _core.sBigInt)()).description('The transaction amount.').prop('tokenAmount', (0, _core.sBigInt)()).description('The transaction token amount.').prop('price', (0, _core.sBigInt)()).description('The transaction vault price.').prop('input', _fluentjsonschema.default.string()).description('The transaction input data.').prop('transactionDate', (0, _core.sDateString)()).description('The transaction date.').required(isPartial ? [] : [
        'vaultId',
        'vaultAddress',
        'walletId',
        'walletAddress',
        'tokenId',
        'type',
        'hash',
        'block',
        'amount',
        'tokenAmount',
        'price'
    ]);
}
const TRANSACTION_TYPES_COMMON = [
    'DEPOSIT',
    'REDEEM',
    'HARVEST',
    'DISTRIBUTED_REWARDS'
];
const TRANSACTION_TYPES_PARETO_DOLLAR = [
    'ADD_COLLATERAL',
    'ADD_YIELD_SOURCE',
    'CLAIM_REDEEM_REQUEST',
    'DEPOSIT_REWARDS',
    'DEPOSIT_YIELD_SOURCE',
    'MINT',
    'NEW_EPOCH',
    'REDEEM',
    'REDEEM_YIELD_SOURCE',
    'REMOVE_COLLATERAL',
    'REMOVE_YIELD_SOURCE',
    'REQUEST_REDEEM',
    'STAKE',
    'STAKE_POOL',
    'TRANSFER',
    'TRANSFER_POOL',
    'UNSTAKE',
    'UNSTAKE_POOL'
];
function sTransactionTypeParetoDollar() {
    return _fluentjsonschema.default.string().enum(TRANSACTION_TYPES_PARETO_DOLLAR);
}
const TRANSACTION_TYPES_CDO_EPOCH = [
    'CLAIM_DEPOSIT_REQUEST',
    'CLAIM_INSTANT_WITHDRAW',
    'CLAIM_WITHDRAW',
    'CLAIM_WITHDRAW_REQUEST',
    'DELETE_DEPOSIT_REQUEST',
    'DELETE_WITHDRAW_REQUEST',
    'GET_INSTANT_WITHDRAWS',
    'PROCESS_DEPOSIT_QUEUE',
    'PROCESS_WITHDRAW_CLAIMS',
    'PROCESS_WITHDRAW_QUEUE',
    'REQUEST_DEPOSIT',
    'REQUEST_WITHDRAW',
    'START_EPOCH',
    'STOP_EPOCH',
    'REQUEST_WRITEOFF',
    'DELETE_WRITEOFF_REQUEST',
    'FULFILL_WRITEOFF_REQUEST',
    'DEPOSIT_WRITEOFF_REQUEST'
];
function sTransactionTypeCdoEpoch() {
    return _fluentjsonschema.default.string().enum(TRANSACTION_TYPES_CDO_EPOCH);
}
const TRANSACTION_TYPES = [
    ...TRANSACTION_TYPES_COMMON,
    ...TRANSACTION_TYPES_PARETO_DOLLAR,
    ...TRANSACTION_TYPES_CDO_EPOCH
];
function sTransactionType() {
    return _fluentjsonschema.default.string().enum((0, _lodash.uniq)(TRANSACTION_TYPES));
}
const TRANSACTION_FIELDS = [
    '_id',
    'vaultId',
    'vaultAddress',
    'walletId',
    'walletAddress',
    'tokenId',
    'type',
    'hash',
    'block',
    'amount',
    'tokenAmount',
    'price',
    'input',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const TRANSACTION_SORT_FIELDS = [
    '_id',
    'block',
    'timestamp'
];
function sTransactionsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The vault IDentifier of the transaction.').prop('vaultAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The vualt address of the transaction.').prop('walletId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The wallet IDentifier of the transaction.').prop('walletAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The wallet address of the transaction.').prop('tokentId', (0, _core.sStringId)()).description('The token IDentifier of the transaction.').prop('type', _fluentjsonschema.default.array().minItems(1).maxItems(200).items(sTransactionType())).description('The type of the transaction.').prop('block', _fluentjsonschema.default.string()).description('The block of the transaction.').prop('timestamp:gte', _fluentjsonschema.default.number()).description('Start timestamp of the transaction.').prop('timestamp:lte', _fluentjsonschema.default.number()).description('End timestamp of the transaction.').extend((0, _core.sPageSearchQuery)(TRANSACTION_FIELDS, TRANSACTION_SORT_FIELDS));
}
var TransactionRoutes;
(function(TransactionRoutes) {
    TransactionRoutes[TransactionRoutes["v1Create"] = `v1/${_transactionconst.TRANSACTIONS_ROUTES_KEY}`] = "v1Create";
    TransactionRoutes[TransactionRoutes["v1Delete"] = `v1/${_transactionconst.TRANSACTIONS_ROUTES_KEY}/:tokenId`] = "v1Delete";
    TransactionRoutes[TransactionRoutes["v1Read"] = `v1/${_transactionconst.TRANSACTIONS_ROUTES_KEY}/:tokenId`] = "v1Read";
    TransactionRoutes[TransactionRoutes["v1Update"] = `v1/${_transactionconst.TRANSACTIONS_ROUTES_KEY}/:tokenId`] = "v1Update";
    TransactionRoutes[TransactionRoutes["v1Search"] = `v1/${_transactionconst.TRANSACTIONS_ROUTES_KEY}`] = "v1Search";
})(TransactionRoutes || (TransactionRoutes = {}));

//# sourceMappingURL=transaction.model.js.map