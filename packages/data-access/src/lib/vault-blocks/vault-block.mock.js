import { BlockMock } from '../core';
import { WEB3_DEFAULT_ADDR } from '../web3-client';
export function VaultTvlMock(options) {
    return {
        token: (options == null ? void 0 : options.token) || '0',
        USD: (options == null ? void 0 : options.USD) || '0'
    };
}
/**
 * Vault Block Mock
 */ export function VaultBlockMock(options) {
    var _options_pools, _options_allocations, _options_requests, _options_rewardPrograms;
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_BLOCK_ID',
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || 'VAULT_ADDRESS',
        APRs: VaultBlockInterestRatesMock(options == null ? void 0 : options.APRs),
        APYs: VaultBlockInterestRatesMock(options == null ? void 0 : options.APYs),
        totalSupply: (options == null ? void 0 : options.totalSupply) || '0',
        price: (options == null ? void 0 : options.price) || '0',
        block: BlockMock(options == null ? void 0 : options.block),
        TVL: VaultTvlMock(options == null ? void 0 : options.TVL),
        pools: options == null ? void 0 : (_options_pools = options.pools) == null ? void 0 : _options_pools.map((p)=>VaultPoolMock(p)),
        allocations: options == null ? void 0 : (_options_allocations = options.allocations) == null ? void 0 : _options_allocations.map((a)=>VaultAllocationMock(a)),
        requests: options == null ? void 0 : (_options_requests = options.requests) == null ? void 0 : _options_requests.map((r)=>VaultRequestMock(r)),
        totalRequests: VaultTotalRequestsMock(options == null ? void 0 : options.totalRequests),
        rewardPrograms: options == null ? void 0 : (_options_rewardPrograms = options.rewardPrograms) == null ? void 0 : _options_rewardPrograms.map((p)=>VaultBlockRewardProgramMock(p)),
        cdoEpoch: (options == null ? void 0 : options.cdoEpoch) ? VaultBlockCdoEpochMock(options.cdoEpoch) : undefined,
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
export function VaultBlockInterestRatesMock(options) {
    return {
        BASE: (options == null ? void 0 : options.BASE) || 0,
        HARVEST: options == null ? void 0 : options.HARVEST,
        REWARDS: options == null ? void 0 : options.REWARDS,
        GROSS: options == null ? void 0 : options.GROSS,
        NET: options == null ? void 0 : options.NET
    };
}
export function VaultBlockCdoEpochMock(options) {
    return {
        apr: (options == null ? void 0 : options.apr) || 0,
        lastApr: options == null ? void 0 : options.lastApr,
        lastInterest: (options == null ? void 0 : options.lastInterest) || '0',
        expectedInterest: (options == null ? void 0 : options.expectedInterest) || '0',
        deposits: (options == null ? void 0 : options.deposits) || '0',
        duration: (options == null ? void 0 : options.duration) || 0,
        bufferDuration: options == null ? void 0 : options.bufferDuration,
        unclaimedFees: (options == null ? void 0 : options.unclaimedFees) || '0',
        contractValue: options == null ? void 0 : options.contractValue,
        epochNumber: options == null ? void 0 : options.epochNumber,
        startDate: options == null ? void 0 : options.startDate,
        endDate: options == null ? void 0 : options.endDate,
        startCureDate: options == null ? void 0 : options.startCureDate,
        count: options == null ? void 0 : options.epochNumber,
        withdrawType: options == null ? void 0 : options.withdrawType,
        status: (options == null ? void 0 : options.status) || 'WAITING',
        instantWithdraws: (options == null ? void 0 : options.instantWithdraws) ? VaultBlockCdoEpochInstantWithdrawsMock(options.instantWithdraws) : undefined
    };
}
export function VaultBlockCdoEpochInstantWithdrawsMock(options) {
    return {
        disabled: options == null ? void 0 : options.disabled,
        deadline: options == null ? void 0 : options.deadline,
        allowed: (options == null ? void 0 : options.allowed) || false,
        delay: (options == null ? void 0 : options.delay) || 0,
        amount: (options == null ? void 0 : options.amount) || '0',
        aprDelta: (options == null ? void 0 : options.aprDelta) || 0
    };
}
export function VaultBlockRewardProgramMock(options) {
    return {
        tokenId: (options == null ? void 0 : options.tokenId) || 'ffffffffffffffffffffffff',
        APR: (options == null ? void 0 : options.APR) || 0,
        USD: options == null ? void 0 : options.USD
    };
}
export function VaultTotalRequestsMock(options) {
    return {
        DEPOSIT: VaultDepositTotalRequestMock(options == null ? void 0 : options.DEPOSIT),
        WITHDRAW: VaultWithdrawTotalRequestMock(options == null ? void 0 : options.WITHDRAW)
    };
}
export function VaultRequestMock(options) {
    return {
        status: 'PENDING',
        amount: (options == null ? void 0 : options.amount) || '0',
        type: (options == null ? void 0 : options.type) || 'DEPOSIT',
        block: BlockMock(options == null ? void 0 : options.block),
        epochNumber: options == null ? void 0 : options.epochNumber,
        walletAddress: (options == null ? void 0 : options.walletAddress) || WEB3_DEFAULT_ADDR,
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        requestedOn: (options == null ? void 0 : options.requestedOn) || new Date().toISOString()
    };
}
export function VaultDepositTotalRequestMock(options) {
    return {
        PENDING: (options == null ? void 0 : options.PENDING) || '0',
        CLAIMED: (options == null ? void 0 : options.CLAIMED) || '0'
    };
}
export function VaultWithdrawTotalRequestMock(options) {
    return {
        PENDING: (options == null ? void 0 : options.PENDING) || '0',
        PROCESSED: (options == null ? void 0 : options.PROCESSED) || '0',
        CLAIMABLE: (options == null ? void 0 : options.CLAIMABLE) || '0',
        INSTANT_CLAIMABLE: (options == null ? void 0 : options.INSTANT_CLAIMABLE) || '0',
        CLAIMED: (options == null ? void 0 : options.CLAIMED) || '0'
    };
}
export function VaultBlockAPRMock(options) {
    return {
        type: (options == null ? void 0 : options.type) || 'BASE',
        rate: (options == null ? void 0 : options.rate) || 0
    };
}
export function VaultAllocationMock(options) {
    return {
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || 'VAULT_ADDRESS',
        percentage: (options == null ? void 0 : options.percentage) || 0
    };
}
export function VaultPoolMock(options) {
    var _options_utilization, _options_utilization1, _options_utilization2, _options_rates, _options_rates1, _options_available, _options_available1;
    return {
        protocol: (options == null ? void 0 : options.protocol) || 'Idle',
        address: (options == null ? void 0 : options.address) || WEB3_DEFAULT_ADDR,
        utilization: {
            supplied: (options == null ? void 0 : (_options_utilization = options.utilization) == null ? void 0 : _options_utilization.supplied) || '0',
            borrowed: (options == null ? void 0 : (_options_utilization1 = options.utilization) == null ? void 0 : _options_utilization1.borrowed) || '0',
            rate: (options == null ? void 0 : (_options_utilization2 = options.utilization) == null ? void 0 : _options_utilization2.rate) || 0
        },
        rates: {
            supply: (options == null ? void 0 : (_options_rates = options.rates) == null ? void 0 : _options_rates.supply) || 0,
            borrow: (options == null ? void 0 : (_options_rates1 = options.rates) == null ? void 0 : _options_rates1.borrow) || 0
        },
        available: {
            toBorrow: (options == null ? void 0 : (_options_available = options.available) == null ? void 0 : _options_available.toBorrow) || '0',
            toWithDraw: (options == null ? void 0 : (_options_available1 = options.available) == null ? void 0 : _options_available1.toWithDraw) || '0'
        }
    };
}
export function VaultCdoEpochInstantWithdrawsMock(options) {
    var _options_allowed;
    return {
        deadline: (options == null ? void 0 : options.deadline) || new Date().toISOString(),
        allowed: (_options_allowed = options == null ? void 0 : options.allowed) != null ? _options_allowed : true,
        delay: (options == null ? void 0 : options.delay) || 0,
        amount: (options == null ? void 0 : options.amount) || '0',
        aprDelta: (options == null ? void 0 : options.aprDelta) || 0
    };
}
export function VaultCdoEpochWithdrawsMock(options) {
    return {
        amount: (options == null ? void 0 : options.amount) || '0',
        fees: (options == null ? void 0 : options.fees) || '0'
    };
}
export function VaultCdoEpochDepositQueue(options) {
    return {
        amount: (options == null ? void 0 : options.amount) || '0',
        lastAmount: options == null ? void 0 : options.lastAmount
    };
}
export function VaultContractCdoEpochMock(options) {
    return {
        apr: (options == null ? void 0 : options.apr) || 0,
        lastApr: (options == null ? void 0 : options.lastApr) || 0,
        lastInterest: (options == null ? void 0 : options.lastInterest) || '0',
        expectedInterest: (options == null ? void 0 : options.expectedInterest) || '0',
        deposits: (options == null ? void 0 : options.deposits) || '0',
        duration: (options == null ? void 0 : options.duration) || 86400,
        bufferDuration: (options == null ? void 0 : options.bufferDuration) || 0,
        unclaimedFees: (options == null ? void 0 : options.unclaimedFees) || '0',
        contractValue: options == null ? void 0 : options.contractValue,
        startDate: options == null ? void 0 : options.startDate,
        endDate: options == null ? void 0 : options.endDate,
        count: options == null ? void 0 : options.count,
        status: (options == null ? void 0 : options.status) || 'WAITING',
        depositQueue: VaultCdoEpochDepositQueue(options == null ? void 0 : options.depositQueue),
        instantWithdraws: VaultCdoEpochInstantWithdrawsMock(options == null ? void 0 : options.instantWithdraws),
        withdraws: VaultCdoEpochWithdrawsMock(options == null ? void 0 : options.withdraws)
    };
}

//# sourceMappingURL=vault-block.mock.js.map