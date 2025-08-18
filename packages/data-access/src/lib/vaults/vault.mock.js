import { _ as _extends } from "@swc/helpers/_/_extends";
import { LocalesMock } from '../core';
import { WEB3_DEFAULT_ADDR, Web3BaseContractMock } from '../web3-client';
/**
 * Vault Mock
 */ export function VaultMock(options) {
    var _options_harvestTokenIds, _options_rewardPrograms, _options_rewardEmissions, _options_campaigns, _options_integrations;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_ID',
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        chainId: (options == null ? void 0 : options.chainId) || 'CHAIN_ID',
        typeId: options == null ? void 0 : options.typeId,
        categoryId: options == null ? void 0 : options.categoryId,
        description: LocalesMock(options == null ? void 0 : options.description),
        name: (options == null ? void 0 : options.name) || 'VAULT_NAME',
        address: (options == null ? void 0 : options.address) || 'VAULT_ADDRESS',
        symbol: (options == null ? void 0 : options.symbol) || 'VAULT_SYMBOL',
        protocol: (options == null ? void 0 : options.protocol) || 'Idle',
        contractType: (options == null ? void 0 : options.contractType) || 'BestYield',
        abi: VaultAbiParamMock(options == null ? void 0 : options.abi),
        visibility: (options == null ? void 0 : options.visibility) || 'HIDDEN',
        status: (options == null ? void 0 : options.status) || 'DISABLED',
        feePercentage: (options == null ? void 0 : options.feePercentage) || 0,
        harvestTokenIds: options == null ? void 0 : (_options_harvestTokenIds = options.harvestTokenIds) == null ? void 0 : _options_harvestTokenIds.map((id)=>id || 'TOKEN_ID'),
        cdoEpoch: VaultCdoEpochMock(options == null ? void 0 : options.cdoEpoch),
        strategy: Web3BaseContractMock(options == null ? void 0 : options.strategy),
        rewardPrograms: options == null ? void 0 : (_options_rewardPrograms = options.rewardPrograms) == null ? void 0 : _options_rewardPrograms.map((p)=>VaultRewardProgramMock(p)),
        rewardEmissions: options == null ? void 0 : (_options_rewardEmissions = options.rewardEmissions) == null ? void 0 : _options_rewardEmissions.map((e)=>VaultRewardEmissionMock(e)),
        paretoDollar: VaultParetoDollarMock(options == null ? void 0 : options.paretoDollar),
        campaigns: options == null ? void 0 : (_options_campaigns = options.campaigns) == null ? void 0 : _options_campaigns.map((c)=>VaultCampaignMock(c)),
        integrations: options == null ? void 0 : (_options_integrations = options.integrations) == null ? void 0 : _options_integrations.map((i)=>VaultIntegrationMock(i)),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
export function VaultIntegrationMock(options) {
    return {
        provider: options.provider,
        type: options.type
    };
}
export function VaultCdoEpochMock(options) {
    return {
        abi: VaultAbiParamMock(options == null ? void 0 : options.abi),
        address: (options == null ? void 0 : options.address) || WEB3_DEFAULT_ADDR,
        manager: VaultOperatorMock(options == null ? void 0 : options.manager),
        borrower: VaultOperatorMock(options == null ? void 0 : options.borrower),
        waitingPeriod: options == null ? void 0 : options.waitingPeriod,
        depositQueue: (options == null ? void 0 : options.depositQueue) && Web3BaseContractMock(options == null ? void 0 : options.depositQueue),
        withdrawQueue: (options == null ? void 0 : options.withdrawQueue) && Web3BaseContractMock(options == null ? void 0 : options.withdrawQueue),
        mode: (options == null ? void 0 : options.mode) || 'CREDIT'
    };
}
export function VaultParetoDollarStakingMock(options) {
    return _extends({
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID'
    }, Web3BaseContractMock(options));
}
export function VaultParetoDollarMock(options) {
    var _options_collaterals;
    return {
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        managers: (options == null ? void 0 : options.managers) || [],
        queue: Web3BaseContractMock(options == null ? void 0 : options.queue),
        staking: VaultParetoDollarStakingMock(options == null ? void 0 : options.staking),
        collaterals: options == null ? void 0 : (_options_collaterals = options.collaterals) == null ? void 0 : _options_collaterals.map((c)=>VaultParetoDollarCollateralMock(c))
    };
}
export function VaultParetoDollarCollateralMock(options) {
    return {
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        tokenAddress: (options == null ? void 0 : options.tokenAddress) || WEB3_DEFAULT_ADDR
    };
}
export function VaultOperatorMock(options) {
    return {
        address: (options == null ? void 0 : options.address) || '',
        operatorId: options == null ? void 0 : options.operatorId
    };
}
export function VaultAbiParamMock(options) {
    return options || [];
}
export function VaultRewardProgramMock(options) {
    var _options_excludedAddresses;
    var _options_isActive;
    return {
        isActive: (_options_isActive = options == null ? void 0 : options.isActive) != null ? _options_isActive : true,
        tokenId: (options == null ? void 0 : options.tokenId) || 'ffffffffffffffffffffffff',
        distributionType: (options == null ? void 0 : options.distributionType) || 'AMOUNT',
        distributionFrequency: VaultRewardDistributionFrequency(options == null ? void 0 : options.distributionFrequency),
        distributionValue: (options == null ? void 0 : options.distributionValue) || '0',
        startBlock: options == null ? void 0 : options.startBlock,
        endBlock: options == null ? void 0 : options.endBlock,
        blocksAmount: options == null ? void 0 : options.blocksAmount,
        excludedAddresses: options == null ? void 0 : (_options_excludedAddresses = options.excludedAddresses) == null ? void 0 : _options_excludedAddresses.map((a)=>VaultRewardAddressMock(a))
    };
}
export function VaultRewardDistributionFrequency(options) {
    return {
        value: (options == null ? void 0 : options.value) || 0,
        unit: (options == null ? void 0 : options.unit) || 'M'
    };
}
export function VaultRewardAddressMock(options) {
    return {
        address: (options == null ? void 0 : options.address) || WEB3_DEFAULT_ADDR,
        toRedistribute: (options == null ? void 0 : options.toRedistribute) || false
    };
}
export function VaultRewardEmissionMock(options) {
    return {
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        emissionRate: (options == null ? void 0 : options.emissionRate) || '0',
        frequency: (options == null ? void 0 : options.frequency) || 'BLOCK',
        startBlock: options == null ? void 0 : options.startBlock,
        endBlock: options == null ? void 0 : options.endBlock
    };
}
export function VaultCampaignMock(options) {
    return {
        _id: (options == null ? void 0 : options._id) || 'CAMPAIGN_ID',
        rules: options == null ? void 0 : options.rules,
        isActive: (options == null ? void 0 : options.isActive) || true
    };
}

//# sourceMappingURL=vault.mock.js.map