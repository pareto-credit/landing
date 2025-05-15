import S from 'fluent-json-schema';
import { sBCAddress, sBCHash, sBigInt, sBlock, sClientEntity, sDateString, sPageSearchQuery, sStringId } from '../core';
import { TRANSACTIONS_ROUTES_KEY } from './transaction.const';
import { uniq } from 'lodash';
export function sTransaction(isPartial) {
    return S.object().id('#transaction').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sTransactionData(isPartial));
}
export function sTransactionData(isPartial) {
    return S.object().additionalProperties(false).prop('vaultId', sStringId()).description('The vault IDentifier.').prop('vaultAddress', sBCAddress()).description('The vault blockchain address.').prop('walletId', sStringId()).description('The IDentifier of the wallet.').prop('walletAddress', sBCAddress()).description('The wallet blockchain address.').prop('tokenId', sStringId()).description('The token IDentifier.').prop('operatorId', sStringId()).description('The operator IDentifier.').prop('type', sTransactionType()).description('The transaction type.').prop('hash', sBCHash()).description('The transaction hash.').prop('block', sBlock()).description('The transaction blockchain block.').prop('amount', sBigInt()).description('The transaction amount.').prop('tokenAmount', sBigInt()).description('The transaction token amount.').prop('price', sBigInt()).description('The transaction vault price.').prop('input', S.string()).description('The transaction input data.').prop('transactionDate', sDateString()).description('The transaction date.').required(isPartial ? [] : [
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
export const TRANSACTION_TYPES = [
    'DEPOSIT',
    'REDEEM',
    'HARVEST',
    'DISTRIBUTED_REWARDS',
    // EPOCH
    'CLAIM_INSTANT_WITHDRAW',
    'CLAIM_WITHDRAW',
    'DELETE_DEPOSIT_REQUEST',
    'GET_INSTANT_WITHDRAWS',
    'PROCESS_DEPOSIT_QUEUE',
    'CLAIM_DEPOSIT_REQUEST',
    'REQUEST_DEPOSIT',
    'START_EPOCH',
    'STOP_EPOCH',
    'REQUEST_WITHDRAW',
    'DELETE_WITHDRAW_REQUEST',
    'PROCESS_WITHDRAW_QUEUE',
    'CLAIM_WITHDRAW_REQUEST',
    'PROCESS_WITHDRAW_CLAIMS',
    // USP
    'MINT',
    'REDEEM',
    'ADD_COLLATERAL',
    'REMOVE_COLLATERAL',
    'REQUEST_REDEEM',
    'NEW_EPOCH',
    'ADD_YIELD_SOURCE',
    'REMOVE_YIELD_SOURCE',
    'REDEEM_YIELD_SOURCE',
    'DEPOSIT_YIELD_SOURCE',
    'STAKE',
    'UNSTAKE',
    'DEPOSIT_REWARDS',
    'TRANSFER',
    'CLAIM_REDEEM_REQUEST',
    'STAKE_POOL',
    'UNSTAKE_POOL'
];
export function sTransactionType() {
    return S.string().enum(uniq(TRANSACTION_TYPES));
}
export const TRANSACTION_FIELDS = [
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
export const TRANSACTION_SORT_FIELDS = [
    '_id',
    'block',
    'timestamp'
];
// Route schema
export function sTransactionsSearchQuery() {
    return S.object().additionalProperties(false).prop('vaultId', S.array().minItems(1).maxItems(200).items(sStringId())).description('The vault IDentifier of the transaction.').prop('vaultAddress', S.array().minItems(1).maxItems(200).items(sBCAddress())).description('The vualt address of the transaction.').prop('walletId', S.array().minItems(1).maxItems(200).items(sStringId())).description('The wallet IDentifier of the transaction.').prop('walletAddress', S.array().minItems(1).maxItems(200).items(sBCAddress())).description('The wallet address of the transaction.').prop('tokentId', sStringId()).description('The token IDentifier of the transaction.').prop('type', S.array().minItems(1).maxItems(200).items(sTransactionType())).description('The type of the transaction.').prop('block', S.string()).description('The block of the transaction.').prop('timestamp:gte', S.number()).description('Start timestamp of the transaction.').prop('timestamp:lte', S.number()).description('End timestamp of the transaction.').extend(sPageSearchQuery(TRANSACTION_FIELDS, TRANSACTION_SORT_FIELDS));
}
export var TransactionRoutes;
(function(TransactionRoutes) {
    TransactionRoutes[TransactionRoutes["v1Create"] = `v1/${TRANSACTIONS_ROUTES_KEY}`] = "v1Create";
    TransactionRoutes[TransactionRoutes["v1Delete"] = `v1/${TRANSACTIONS_ROUTES_KEY}/:tokenId`] = "v1Delete";
    TransactionRoutes[TransactionRoutes["v1Read"] = `v1/${TRANSACTIONS_ROUTES_KEY}/:tokenId`] = "v1Read";
    TransactionRoutes[TransactionRoutes["v1Update"] = `v1/${TRANSACTIONS_ROUTES_KEY}/:tokenId`] = "v1Update";
    TransactionRoutes[TransactionRoutes["v1Search"] = `v1/${TRANSACTIONS_ROUTES_KEY}`] = "v1Search";
})(TransactionRoutes || (TransactionRoutes = {}));

//# sourceMappingURL=transaction.model.js.map