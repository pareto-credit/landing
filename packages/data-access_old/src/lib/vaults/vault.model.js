import S from 'fluent-json-schema';
import { sAbiContract, sBCAddress, sBigInt, sBlock, sClientEntity, sDateString, sMetaContent, sMetaItems, sMimeType, sPageSearchQuery, sStringId } from '../core';
import { sWeb3BaseContract, sWeb3Protocol, sWeb3ProtocolContract } from '../web3-client';
import { sLocales } from '../core';
import { sVaultContractCdoData, sVaultContractCdoEpochData, sVaultContractStrategyData, sVaultTvl } from '../vault-blocks';
import { VAULTS_ROUTES_KEY } from './vault.const';
import { sCampaignRule } from '../campaigns';
export function sVault(isPartial) {
    return S.object().id('#vault').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sVaultData(isPartial));
}
export function sVaultData(isPartial) {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).prop('chainId', sStringId()).prop('typeId', sStringId()).prop('categoryId', sStringId()).prop('operatorIds', S.array().items(S.string())).prop('name', S.string()).prop('address', sBCAddress()).prop('symbol', S.string()).prop('protocol', sWeb3Protocol()).prop('contractType', sVaultContractType()).prop('abi', sAbiContract()).prop('description', sLocales()).prop('shortDescription', sLocales()).prop('caption', sLocales()).prop('keyInfo', S.array().items(sVaultKeyInfo())).prop('metaContent', sMetaContent()).prop('metaItems', sMetaItems()).prop('visibility', sVaultVisibility()).prop('status', sVaultStatus()).prop('feePercentage', S.number()).prop('harvestTokenIds', S.array().items(S.string())).prop('rewardPrograms', S.array().items(sVaultRewardProgram())).prop('rewardEmissions', S.array().items(sVaultRewardEmission())).prop('cdo', sVaultCdo()).prop('cdoEpoch', sVaultCdoEpoch()).prop('paretoDollar', sVaultParetoDollar()).prop('strategy', sVaultStrategy()).prop('pools', S.array().items(sVaultPool())).prop('kyc', sVaultKyc()).prop('signatures', S.array().items(sVaultSignature())).prop('integrations', S.array().items(sVaultIntegration())).prop('minDeposit', sVaultMinDeposit()).prop('documents', S.array().items(sVaultDocument())).prop('campaigns', S.array().items(sVaultCampaign())).prop('siblings', S.array().items(sVaultSibling())).required(isPartial ? [] : [
        'tokenId',
        'chainId',
        'name',
        'address',
        'symbol',
        'protocol',
        'contractType',
        'abi',
        'visibility',
        'status',
        'feePercentage'
    ]);
}
export function sVaultIntegrationProvider() {
    return S.string().enum([
        'Usual',
        'Lido',
        'Instadapp',
        'Ethena'
    ]);
}
export function sVaultIntegrationType() {
    return S.string().enum([
        'APR',
        'strategyAPR'
    ]);
}
export function sVaultIntegration() {
    return S.object().additionalProperties(false).prop('provider', sVaultIntegrationProvider()).required().prop('type', sVaultIntegrationType()).required().prop('params', sVaultIntegrationParams());
}
export function sVaultIntegrationParams() {
    return S.object().additionalProperties(false).prop('chainId', S.number());
}
export function sVaultIntegrationsData() {
    return S.object().additionalProperties(false).prop('APR', S.number());
}
export function sVaultParetoDollar() {
    return S.object().additionalProperties(false).prop('queue', sWeb3BaseContract()).required().prop('staking', sWeb3BaseContract()).required();
}
export function sVaultCdo() {
    return S.object().additionalProperties(false).extend(sWeb3BaseContract());
}
export function sVaultCdoEpoch() {
    return S.object().additionalProperties(false).prop('borrower', sVaultCdoEpochOperator()).required().prop('manager', sVaultCdoEpochOperator()).required().prop('mode', S.string().enum([
        'STRATEGY',
        'CREDIT'
    ])).required().prop('waitingPeriod', S.number()).prop('depositQueue', sWeb3BaseContract()).prop('withdrawQueue', sWeb3BaseContract()).extend(sWeb3BaseContract());
}
export function sVaultCdoEpochOperator() {
    return S.object().additionalProperties(false).prop('address', S.string()).description('Operator wallet address').required().prop('operatorId', S.string()).description('Operator entity ID');
}
export function sVaultStrategy() {
    return S.object().additionalProperties(false).extend(sWeb3BaseContract());
}
export function sVaultPool() {
    return S.object().additionalProperties(false).prop('oracle', S.object().additionalProperties(false).prop('address', sBCAddress()).required().prop('abi', sAbiContract()).required().prop('protocol', S.string())).extend(sWeb3ProtocolContract());
}
export function sVaultRewardProgramFrequencyUnit() {
    return S.string().enum([
        'D',
        'W',
        'M',
        'Y'
    ]);
}
export function sVaultRewardProgramFrequency() {
    return S.object().additionalProperties(false).prop('value', S.number()).required().prop('unit', sVaultRewardProgramFrequencyUnit()).required();
}
export function sVaultRewardProgram() {
    return S.object().additionalProperties(false).prop('tokenId', sStringId()).required().prop('isActive', S.boolean()).required().prop('distributionType', sVaultDistributionType()).required().prop('distributionValue', sBigInt()).required().prop('distributionFrequency', sVaultRewardProgramFrequency()).required().prop('startBlock', S.number()).prop('endBlock', S.number()).prop('blocksAmount', S.number()).prop('tokenAddress', sBCAddress()).prop('senderAddresses', S.array().items(sBCAddress())).prop('excludedAddresses', S.array().items(sVaultRewardAddress()));
}
export function sVaultContractType() {
    return S.string().enum([
        'BestYield',
        'CDO',
        'CDO_EPOCH',
        'PARETO_DOLLAR',
        'PARETO_TOKEN'
    ]);
}
export function sVaultRewardAddress() {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).required().prop('toRedistribute', S.boolean()).required();
}
export function sVaultRewardEmission() {
    return S.object().additionalProperties(false);
}
export function sVaultCampaign() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().prop('rules', S.array().items(sCampaignRule())).prop('isActive', S.boolean()).required();
}
export function sVaultSibling() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().prop('chainId', sStringId()).required();
}
export function sVaultBaseTransactionBody() {
    return S.object().additionalProperties(false).prop('block', sBlock()).description('Block').required().prop('transactionHash', S.string()).description('Transaction hash').required().prop('vaultData', sVaultContractData()).description(`VaultBlock data`).required().prop('transactionInput', S.string()).description('Transaction input').prop('amount', sBigInt()).description(`Amount`).prop('price', sBigInt()).description(`Price`).prop('tokenAmount', sBigInt()).description(`tokenAmount`).prop('walletAddress').description('Wallet address');
}
export function sVaultTransferBody() {
    return S.object().additionalProperties(false).prop('fromAddress', sBCAddress()).description('Wallet from address').prop('toAddress', sBCAddress()).description('Wallet to address').extend(sVaultBaseTransactionBody());
}
export function sVaultMintRedeemBody() {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).description('Wallet address').extend(sVaultBaseTransactionBody());
}
export function sVaultDistributedRewardsBody() {
    return S.object().additionalProperties(false).prop('fromAddress', sBCAddress()).description('Rewards sender address').required().prop('toAddress', sBCAddress()).description('Rewards recipient address').required().prop('tokenAddress', sBCAddress()).description('Reward token address').required().extend(sVaultBaseTransactionBody());
}
export function sVaultTransferEpochType() {
    return S.string().enum([
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
        'PROCESS_WITHDRAW_CLAIMS'
    ]);
}
export function sVaultTransferEpochBody() {
    return S.object().additionalProperties(false).prop('action', sVaultTransferEpochType()).description('Epoch action').required().extend(sVaultBaseTransactionBody());
}
export function sVaultDistributionType() {
    return S.string().enum([
        'AMOUNT',
        'TARGET_APY'
    ]);
}
export function sVaultVisibility() {
    return S.string().enum([
        'HIDDEN',
        'RESTRICTED',
        'PUBLIC'
    ]);
}
export function sVaultStatus() {
    return S.string().enum([
        'PAUSED',
        'DISABLED',
        'READY',
        'EXPERIMENTAL',
        'BOOSTED'
    ]);
}
export function sVaultsPerformances() {
    return S.object().additionalProperties(false).prop('TVL', sBigInt()).required().prop('creditExtended', sBigInt()).required().prop('APRs', sVaultsPerformancesAPRs()).required().prop('tokens', S.array().minItems(1).maxItems(200).items(sVaultsPerformancesToken())).required().prop('chains', S.array().minItems(1).maxItems(200).items(sVaultsPerformancesToken())).required().prop('vaults').required();
}
export function sVaultsPerformancesToken() {
    return S.object().additionalProperties(false).prop('token', S.string()).required().prop('TVL', sVaultTvl()).required().prop('APR', S.number()).required();
}
export function sVaultsPerformancesChain() {
    return S.object().additionalProperties(false).prop('chain', S.string()).required().prop('TVL', sVaultTvl()).required().prop('APR', S.number()).required();
}
export function sVaultsPerformancesAPRs() {
    return S.object().additionalProperties(false).prop('MIN').required().prop('MAX').required().prop('AVG').required();
}
export var VaultErrorCodes;
(function(VaultErrorCodes) {
    VaultErrorCodes["collision"] = "VAULT_COLLISION";
    VaultErrorCodes["notFound"] = "VAULT_NOT_FOUND";
    VaultErrorCodes["notDeletable"] = "VAULT_NOT_DELETABLE";
    VaultErrorCodes["blockNotValid"] = "VAULT_BLOCK_NOT_VALID";
    VaultErrorCodes["walletRequired"] = "VAULT_WALLET_REQUIRED";
    VaultErrorCodes["integrationError"] = "VAULT_INTEGRATION_ERROR";
    VaultErrorCodes["rewardProgramNotFound"] = "VAULT_REWARD_PROGRAM_NOT_FOUND";
})(VaultErrorCodes || (VaultErrorCodes = {}));
export function sVaultIntegrationsQuery() {
    return S.object().additionalProperties(false).prop('provider', S.array().minItems(1).maxItems(200).items(sVaultIntegrationProvider())).prop('type', S.array().minItems(1).maxItems(200).items(sVaultIntegrationType()));
}
export function sVaultsPerformancesQuery() {
    return S.object().additionalProperties(false).prop('status', sVaultStatus()).description('Status of the vault that must match.').prop('visibility', sVaultVisibility()).description('Visibility of the vault that must match.').prop('symbol', S.string()).description('Symbol of the vault that must match.').prop('chainId', S.array().minItems(1).maxItems(200).items(sStringId())).description('ChainID of the vault that must match.').prop('contractType', sVaultContractType()).description('Contract type of the vault that must match.').extend(sPageSearchQuery());
}
export function sVaultPositionQuery() {
    S.object().additionalProperties(false).prop('walletId', sStringId()).description('Wallet Identifier').prop('walletAddress', sBCAddress()).description('Wallet address').prop('block:gte', S.number()).description('Start block').prop('block:lte', S.number()).description('End Block').prop('timestamp:hte', S.number()).description('Start timestamp').prop('timestamp:lte', S.number()).description('End timestamp');
}
export const VAULT_FIELDS = [
    '_id',
    'tokenId',
    'chainId',
    'typeId',
    'categoryId',
    'operatorIds',
    'name',
    'kyc',
    'address',
    'symbol',
    'protocol',
    'contractType',
    'abi',
    'description',
    'visibility',
    'status',
    'feePercentage',
    'harvestTokenIds',
    'rewardPrograms',
    'rewardEmissions',
    'cdo',
    'campaigns',
    'documents',
    'cdoEpoch',
    'strategy',
    'pools',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const VAULT_SORT_FIELDS = [
    'name'
];
export function sVaultsSearchQuery() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('Name of the vault that must match.').prop('name:ct', S.string()).description('Name of the vault that must be contained.').prop('address', sBCAddress()).description('Address of the vault that must match.').prop('status', sVaultStatus()).description('Status of the vault that must match.').prop('visibility', S.array().minItems(1).maxItems(3).items(sVaultVisibility())).description('Visibility of the vault that must match.').prop('visibility:ne', S.array().minItems(1).maxItems(3).items(sVaultVisibility())).description('Visibility of the vault that must be different.').prop('cdoEpoch.borrower.address', S.array().minItems(1).maxItems(200).items(sBCAddress())).description(`Borrower's address of the vault that must match.`).prop('cdoEpoch.borrower.operatorId', S.array().minItems(1).maxItems(200).items(S.string())).description(`Borrower's operator ID of the vault that must match.`).prop('cdoEpoch.manager.address', S.array().minItems(1).maxItems(200).items(sBCAddress())).description(`Manager's address of the vault that must match.`).prop('cdoEpoch.manager.operatorId', S.array().minItems(1).maxItems(200).items(S.string())).description(`Manager's operator ID of the vault that must match.`).prop('cdo', S.string()).description('CDO of the vault that must match.').prop('symbol', S.string()).description('Symbol of the vault that must match.').prop('chainId', S.array().minItems(1).maxItems(200).items(sStringId())).description('ChainID of the vault that must match.').prop('contractType', sVaultContractType()).description('Contract type of the vault that must match.').extend(sPageSearchQuery(VAULT_FIELDS, VAULT_SORT_FIELDS));
}
export var VaultsRoutingKey;
(function(VaultsRoutingKey) {
    VaultsRoutingKey["idleEvents"] = "idle.vault.*";
    VaultsRoutingKey["idleSync"] = "idle.vault.sync";
    VaultsRoutingKey["idleCreated"] = "idle.vault.created";
    VaultsRoutingKey["idleUpdate"] = "idle.vault.update";
    VaultsRoutingKey["idleTransfered"] = "idle.vault.transfered";
    VaultsRoutingKey["idlePerformed"] = "idle.vault.performed";
    VaultsRoutingKey["bcEvents"] = "bc.vault.*";
    VaultsRoutingKey["bcTransfer"] = "bc.vault.transfer";
})(VaultsRoutingKey || (VaultsRoutingKey = {}));
export function sVaultContractAPRs() {
    return S.object().additionalProperties(false).prop('BASE', sBigInt());
}
export function sVaultContractData() {
    return S.object().additionalProperties(false).description('The vault contract blockchain data').prop('previous', sContractData()).extend(sContractData());
}
function sContractData() {
    return S.object().additionalProperties(false).description('The vault contract blockchain data').prop('APRs', sVaultContractAPRs()).prop('totalSupply', sBigInt()).prop('strategy', sVaultContractStrategyData()).prop('price', sBigInt()).prop('allocations', S.array().items(sBigInt())).prop('availableTokens', S.array().items(sBCAddress())).prop('pools', S.array().items(sVaultContractPoolData())).prop('cdo', sVaultContractCdoData()).prop('tokens', S.array().items(sVaultContractTokenData())).prop('cdoEpoch', sVaultContractCdoEpochData()).prop('wallets', S.array().items(sVaultWalletData())).prop('integrations', sVaultIntegrationsData());
}
export function sVaultContractTokenData() {
    return S.object().additionalProperties(false).prop('price', sBigInt()).required().prop('address', sBCAddress()).required();
}
export function sVaultWalletData() {
    return S.object().additionalProperties(false).prop('address', sBCAddress()).required().prop('balance', sBigInt()).required().prop('cdoEpoch', sVaultWalletCdoEpochData());
}
export function sVaultWalletCdoEpochData() {
    return S.object().additionalProperties(false).prop('pendingDepositAmount').description('Deposit queue pending amount').prop('pendingWithdrawAmount').description('Withdraw queue pending amount').prop('withdrawsRequests').description('Standard withdraw requests').prop('instantWithdrawsRequests').description('Instant withdraw requests');
}
export function sVaultContractPoolData() {
    return S.object().additionalProperties(false).prop('protocol', sWeb3Protocol()).required().prop('address', sBCAddress()).required().prop('supplyRate', sBigInt()).prop('borrowRate', sBigInt()).prop('exchangeRate', sBigInt()).prop('utilizationRate', sBigInt()).prop('availableToBorrow', sBigInt()).prop('availableToWithdraw', sBigInt()).prop('totalSupply', sBigInt()).prop('totalBorrow', sBigInt());
}
export function sVaultKyc() {
    return S.object().additionalProperties(false).prop('policyId', S.number()).required().prop('isActive', S.boolean()).required().prop('link', S.string()).prop('hideSensitiveData', S.boolean());
}
export function sVaultKeyInfo() {
    return S.object().additionalProperties(false).prop('label', sLocales()).required().prop('value', sLocales()).required().prop('link', S.string());
}
export function sVaultMinDeposit() {
    return S.object().additionalProperties(false).prop('amount', sBigInt()).required().prop('isActive', S.boolean()).required().prop('enableTest', S.boolean());
}
export function sVaultDocument() {
    return S.object().additionalProperties(false).prop('name', S.string()).required().prop('type', sMimeType()).required().prop('createdAt', sDateString()).required().prop('url', S.string().format('url')).required();
}
export function sVaultSignatureEntity() {
    return S.string().enum([
        'ALL',
        'LENDER',
        'MANAGER'
    ]);
}
export function sVaultSignature() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().prop('entity', sVaultSignatureEntity()).required();
}
export var VaultRoutes;
(function(VaultRoutes) {
    VaultRoutes[VaultRoutes["v1Create"] = `v1/${VAULTS_ROUTES_KEY}`] = "v1Create";
    VaultRoutes[VaultRoutes["v1Delete"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId`] = "v1Delete";
    VaultRoutes[VaultRoutes["v1Read"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId`] = "v1Read";
    VaultRoutes[VaultRoutes["v1Update"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId`] = "v1Update";
    VaultRoutes[VaultRoutes["v1Search"] = `v1/${VAULTS_ROUTES_KEY}`] = "v1Search";
    VaultRoutes[VaultRoutes["v1Sync"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/sync`] = "v1Sync";
    VaultRoutes[VaultRoutes["v1Mint"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/mint`] = "v1Mint";
    VaultRoutes[VaultRoutes["v1Rewards"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/rewards`] = "v1Rewards";
    VaultRoutes[VaultRoutes["v1Block"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/block`] = "v1Block";
    VaultRoutes[VaultRoutes["v1Epoch"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/epoch`] = "v1Epoch";
    VaultRoutes[VaultRoutes["v1Redeem"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/redeem`] = "v1Redeem";
    VaultRoutes[VaultRoutes["v1Transfer"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/transfer`] = "v1Transfer";
    VaultRoutes[VaultRoutes["v1Perform"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/perform`] = "v1Perform";
    VaultRoutes[VaultRoutes["v1Cure"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/cure`] = "v1Cure";
    VaultRoutes[VaultRoutes["v1Performances"] = `v1/${VAULTS_ROUTES_KEY}/performances`] = "v1Performances";
    VaultRoutes[VaultRoutes["v1Position"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/position`] = "v1Position";
    VaultRoutes[VaultRoutes["v1SyncBlock"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/sync-block`] = "v1SyncBlock";
    VaultRoutes[VaultRoutes["v1Integrations"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/integrations`] = "v1Integrations";
    VaultRoutes[VaultRoutes["v1PerformBlocks"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/perform-blocks`] = "v1PerformBlocks";
    VaultRoutes[VaultRoutes["v1PerformWallets"] = `v1/${VAULTS_ROUTES_KEY}/:vaultId/perform-wallets`] = "v1PerformWallets";
})(VaultRoutes || (VaultRoutes = {}));

//# sourceMappingURL=vault.model.js.map