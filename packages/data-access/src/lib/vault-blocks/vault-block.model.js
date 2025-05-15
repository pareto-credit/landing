import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sBlock, sClientEntity, sDateString, sPageSearchQuery, sStringId } from '../core';
import { sWeb3Protocol } from '../web3-client';
import { VAULT_BLOCKS_ROUTES_KEY } from './vault-block.const';
import { sVaultEpochWithdrawType } from '../vault-epochs';
export function sVaultBlock(isPartial) {
    return S.object().id('#vaultBlock').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sVaultBlockData(isPartial));
}
export function sVaultBlockInterestRates() {
    return S.object().additionalProperties(false).prop('BASE', S.number()).required().description('Interest rate from base strategy').prop('HARVEST', S.number()).description('Interest rate from harvested rewards').prop('REWARDS', S.number()).description('Interest rate from distributed rewards').prop('GROSS', S.number()).description('Interest rate including fees').prop('NET', S.number()).description('Interest rate net of fees').prop('FEE', S.number()).description('Fees in percentage');
}
export function sVaultBlockRewardProgram() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).required().prop('APR', S.number()).required().prop('USD', sBigInt());
}
export function sVaultBlockBody(isPartial) {
    return S.object().additionalProperties(false).prop('APRs', sVaultBlockInterestRates()).description('Non-coumponded interest rates').prop('APYs', sVaultBlockInterestRates()).description('Compounded interest rates').prop('totalSupply', sBigInt()).prop('price', sBigInt()).prop('TVL', sVaultTvl()).prop('pools', S.array().items(sVaultPoolBlock())).prop('allocations', S.array().items(sVaultAllocation())).prop('cdo', sVaultContractCdoData()).prop('cdoEpoch', sVaultContractCdoEpochData()).prop('strategy', sVaultContractStrategyData()).prop('paretoDollar', sVaultContractParetoDollarData()).prop('requests', S.array().items(sVaultBlockRequest())).prop('totalRequests', sVaultBlockTotalRequests()).prop('rewardPrograms', S.array().items(sVaultBlockRewardProgram()))// Deprecated
    .prop('current', S.object().additionalProperties(true)).deprecated().prop('aggregated', S.object().additionalProperties(true)).deprecated().required(isPartial ? [] : [
        'APRs',
        'APYs',
        'totalSupply',
        'price'
    ]);
}
export function sVaultContractParetoDollarData() {
    return S.object().additionalProperties(false).prop('queue', sVaultContractParetoDollarQueue()).prop('staking', sVaultContractParetoDollarStaking());
}
export function sParetoDollarQueueYieldSource() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).prop('vaultId', sStringId()).prop('operatorId', sStringId()).prop('tokenAddress', sBCAddress()).required().prop('sourceAddress', sBCAddress()).required().prop('vaultAddress', sBCAddress()).required().prop('maxCap', sBigInt()).required().prop('depositedAmount', sBigInt()).required().prop('vaultType', S.number()).required();
}
export function sVaultContractParetoDollarQueue() {
    return S.object().additionalProperties(false).prop('epochNumber', S.number()).description('Queue contract epoch number').required().prop('totalCollateralsScaled', sBigInt()).description('Queue contract total collateral scaled').required().prop('unlentBalanceScaled', sBigInt()).description('Queue contract total unlent balance scaled').required().prop('totalReservedWithdrawals', sBigInt()).description('Queue contract total reserved withdrawals').required().prop('yieldSources', S.array().items(sParetoDollarQueueYieldSource())).description('Queue contract yield sources').required().prop('epochPending', sBigInt()).description('Current epoch pending').prop('prevEpochPending', sBigInt()).description('Previous epoch pending');
}
export function sVaultContractParetoDollarStaking() {
    return S.object().additionalProperties(false).prop('totalSupply', sBigInt()).description('USP Staking contract total supply').required().prop('totalAssets', sBigInt()).description('USP Staking contract total assets').required().prop('rewardsLastDeposit', sBigInt()).description('USP Staking contract rewards last deposit').required();
}
export function sVaultBlockRequestStatus() {
    return S.string().enum([
        'PENDING',
        'PROCESSED',
        'CLAIMABLE',
        'INSTANT_CLAIMABLE',
        'CLAIMED'
    ]);
}
export function sVaultBlockRequestType() {
    return S.string().enum([
        'DEPOSIT',
        'WITHDRAW',
        'REDEEM'
    ]);
}
export function sVaultBlockRequest() {
    return S.object().additionalProperties(false).prop('block', sBlock()).required().prop('type', sVaultBlockRequestType()).required().prop('amount', sBigInt()).required().prop('requestedOn', sDateString()).required().prop('walletId', sStringId()).required().prop('walletAddress', sBCAddress()).required().prop('status', sVaultBlockRequestStatus()).required().prop('epochNumber', S.number()).prop('isInstant', S.boolean());
}
export function sVaultBlockTotalRequests() {
    return S.object().additionalProperties(false).prop('DEPOSIT', sVaultBlockDepositTotalRequest()).prop('WITHDRAW', sVaultBlockWithdrawTotalRequest()).prop('REDEEM', sVaultBlockRedeemTotalRequest());
}
export function sVaultBlockDepositTotalRequest() {
    return S.object().additionalProperties(false).prop('PENDING', sBigInt()).required().prop('CLAIMED', sBigInt()).required();
}
export function sVaultBlockWithdrawTotalRequest() {
    return S.object().additionalProperties(false).prop('PENDING', sBigInt()).required().prop('PROCESSED', sBigInt()).required().prop('CLAIMABLE', sBigInt()).required().prop('INSTANT_CLAIMABLE', sBigInt()).required().prop('CLAIMED', sBigInt()).required();
}
export function sVaultBlockRedeemTotalRequest() {
    return S.object().additionalProperties(false).prop('PENDING', sBigInt()).required().prop('CLAIMED', sBigInt()).required();
}
export function sVaultContractCdoEpochData() {
    return S.object().additionalProperties(false).prop('apr', S.number()).required().prop('lastInterest', sBigInt()).required().prop('expectedInterest', sBigInt()).required().prop('unclaimedFees', sBigInt()).required().prop('deposits', sBigInt()).required().prop('duration', S.number()).required().prop('status', sVautlBlockEpochStatus()).required().prop('contractValue', sBigInt()).prop('lastApr', S.number()).prop('count', S.number()).prop('startDate', sDateString()).prop('endDate', sDateString()).prop('startCureDate', sDateString()).prop('epochNumber', S.number()).prop('bufferDuration', S.number()).prop('withdrawType', sVaultEpochWithdrawType()).prop('withdraws', sVaultContractCdoEpochWithdrawsData()).prop('depositQueue', sVaultContractCdoEpochQueueData()).prop('withdrawQueue', sVaultContractCdoEpochQueueData()).prop('instantWithdraws', sVaultContractCdoEpochInstantWithdrawsData());
}
export function sVaultContractCdoEpochQueueData() {
    return S.object().additionalProperties(false).prop('amount', sBigInt()).required().prop('lastAmount', sBigInt()).prop('isInstant', S.boolean());
}
export function sVaultContractCdoEpochInstantWithdrawsData() {
    return S.object().additionalProperties(false).prop('allowed', S.boolean()).required().prop('delay', S.number()).required().prop('amount', sBigInt()).required().prop('aprDelta', S.number()).required().prop('deadline', sDateString()).prop('disabled', S.boolean());
}
export function sVaultContractCdoEpochWithdrawsData() {
    return S.object().additionalProperties(false).prop('amount', sBigInt()).required().prop('fees', sBigInt()).required();
}
export function sVaultContractCdoData() {
    return S.object().additionalProperties(false).prop('APRSplitRatio', sBigInt()).prop('currentAARatio', sBigInt());
}
export function sVaultContractStrategyData() {
    return S.object().additionalProperties(false).prop('APR', sBigInt()).prop('rewardTokens', S.array().items(S.string()));
}
export function sVaultTvl() {
    return S.object().additionalProperties(false).prop('token', sBigInt()).required().prop('USD', sBigInt()).required().prop('withRequestsToken', sBigInt()).description('TVL including pending deposits and withdraws').prop('withRequestsUSD', sBigInt()).description('TVL + pending requests converted in USD');
}
export function sVaultApr() {
    return S.object().additionalProperties(false).prop('type', sVaultAprType()).required().prop('rate', S.number()).required();
}
export function sVaultAprType() {
    return S.string().enum([
        'BASE',
        'HARVEST',
        'REWARDS',
        'EPOCH',
        'BUFFER',
        'GROSS'
    ]);
}
export function sVaultPoolBlock() {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).required().prop('protocol', sWeb3Protocol()).required().prop('rates', sVaultPoolBlockRates()).required().prop('utilization', sVaultPoolUtilization()).required().prop('available', sVaultPoolBlockAvailable()).required().prop('APR', S.number());
}
export var VaultBlockErrorCodes;
(function(VaultBlockErrorCodes) {
    VaultBlockErrorCodes["notFound"] = "VAULT_BLOCK_NOT_FOUND";
    VaultBlockErrorCodes["alreadyExists"] = "VAULT_BLOCK_ALREADY_EXISTS";
    VaultBlockErrorCodes["wrontContractType"] = "VAULT_BLOCK_WRONG_CONTRACT_TYPE";
})(VaultBlockErrorCodes || (VaultBlockErrorCodes = {}));
export var VaultBlockRewardProgramErrorCodes;
(function(VaultBlockRewardProgramErrorCodes) {
    VaultBlockRewardProgramErrorCodes["tokenNotFound"] = "VAULT_BLOCK_REWARD_PROGRAM_TOKEN_NOT_FOUND";
})(VaultBlockRewardProgramErrorCodes || (VaultBlockRewardProgramErrorCodes = {}));
export var VaultBlockRequestErrorCodes;
(function(VaultBlockRequestErrorCodes) {
    VaultBlockRequestErrorCodes["notMatching"] = "VAULT_BLOCK_REQUEST_NOT_MATCHING";
    VaultBlockRequestErrorCodes["notClaimable"] = "VAULT_BLOCK_REQUEST_NOT_CLAIMABLE";
    VaultBlockRequestErrorCodes["epochNumber"] = "VAULT_BLOCK_REQUEST_INVALID_EPOCH_NUMBER";
    VaultBlockRequestErrorCodes["wrongStatus"] = "VAULT_BLOCK_REQUEST_WRONG_STATUS";
    VaultBlockRequestErrorCodes["wrongType"] = "VAULT_BLOCK_REQUEST_WRONG_TYPE";
})(VaultBlockRequestErrorCodes || (VaultBlockRequestErrorCodes = {}));
export const VAULT_BLOCK_FIELDS = [
    '_id',
    'vaultId',
    'vaultAddress',
    'block',
    'APRs',
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
    'current',
    'aggregated',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const VAULT_BLOCK_SORT_FIELDS = [
    'block',
    'timestamp'
];
export function sVaultBlocksSearchQuery() {
    return S.object().additionalProperties(false).prop('vaultId', S.array().minItems(1).maxItems(200).items(sStringId())).description('The vault IDentifier').prop('vaultAddress', S.array().minItems(1).maxItems(200).items(sBCAddress())).description('The vault blockchain address').prop('block', S.array().minItems(1).maxItems(200).items(S.string())).description('The block number that must match').prop('cdoEpoch.status', S.array().minItems(1).maxItems(200).items(sVautlBlockEpochStatus())).description('The cdoEpoch status that must match').extend(sPageSearchQuery(VAULT_BLOCK_FIELDS, VAULT_BLOCK_SORT_FIELDS));
}
export function sVautlBlockEpochStatus() {
    return S.string().enum([
        'WAITING',
        'RUNNING',
        'DEFAULTED',
        'CURE'
    ]);
}
export var VaultBlockRoutes;
(function(VaultBlockRoutes) {
    VaultBlockRoutes[VaultBlockRoutes["v1Create"] = `v1/${VAULT_BLOCKS_ROUTES_KEY}`] = "v1Create";
    VaultBlockRoutes[VaultBlockRoutes["v1Delete"] = `v1/${VAULT_BLOCKS_ROUTES_KEY}/:vaultBlockId`] = "v1Delete";
    VaultBlockRoutes[VaultBlockRoutes["v1Read"] = `v1/${VAULT_BLOCKS_ROUTES_KEY}/:vaultBlockId`] = "v1Read";
    VaultBlockRoutes[VaultBlockRoutes["v1Update"] = `v1/${VAULT_BLOCKS_ROUTES_KEY}/:vaultBlockId`] = "v1Update";
    VaultBlockRoutes[VaultBlockRoutes["v1Search"] = `v1/${VAULT_BLOCKS_ROUTES_KEY}`] = "v1Search";
})(VaultBlockRoutes || (VaultBlockRoutes = {}));
export function sVaultBlockData(isPartial) {
    return S.object().additionalProperties(false).prop('vaultId', sStringId()).prop('vaultAddress', sBCAddress()).prop('block', sBlock()).required(isPartial ? [] : [
        'vaultId',
        'vaultAddress',
        'block'
    ]).extend(sVaultBlockBody(isPartial));
}
export function sVaultPoolBlockRates() {
    return S.object().additionalProperties(false).prop('supply', S.number()).required().prop('borrow', S.number()).required();
}
export function sVaultPoolUtilization() {
    return S.object().additionalProperties(false).prop('supplied', sBigInt()).required().prop('borrowed', sBigInt()).required().prop('rate', S.number()).required();
}
export function sVaultPoolBlockAvailable() {
    return S.object().additionalProperties(false).prop('toBorrow', sBigInt()).required().prop('toWithDraw', sBigInt()).required();
}
export function sVaultAllocation() {
    return S.object().additionalProperties(false).prop('vaultId', sStringId()).prop('vaultAddress', sBCAddress()).required().prop('percentage', S.number()).required();
}
export function sVaultBlocks() {
    return S.object().additionalProperties(false).prop('current', sVaultBlockData()).required().prop('last', sVaultBlockData());
}

//# sourceMappingURL=vault-block.model.js.map