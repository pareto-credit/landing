import { BlockMock } from '../core';
import { VaultTvlMock } from '../vault-blocks';
import { WEB3_DEFAULT_ADDR } from '../web3-client';
/**
 * Vault Epoch Mock
 */ export function VaultEpochMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_EPOCH_ID',
        block: BlockMock(options == null ? void 0 : options.block),
        vaultId: (options == null ? void 0 : options.vaultId) || 'VAULT_ID',
        vaultAddress: (options == null ? void 0 : options.vaultAddress) || WEB3_DEFAULT_ADDR,
        APRs: VaultEpochAPRsMock(options == null ? void 0 : options.APRs),
        APYs: VaultEpochAPYsMock(options == null ? void 0 : options.APYs),
        totalSupply: (options == null ? void 0 : options.totalSupply) || '0',
        price: (options == null ? void 0 : options.price) || '0',
        TVL: VaultTvlMock(options == null ? void 0 : options.TVL),
        expectedInterest: (options == null ? void 0 : options.expectedInterest) || '0',
        deposits: (options == null ? void 0 : options.deposits) || '0',
        duration: (options == null ? void 0 : options.duration) || 0,
        bufferDuration: (options == null ? void 0 : options.bufferDuration) || 0,
        unclaimedFees: (options == null ? void 0 : options.unclaimedFees) || '0',
        startDate: options == null ? void 0 : options.startDate,
        endDate: options == null ? void 0 : options.endDate,
        count: (options == null ? void 0 : options.count) || 0,
        status: (options == null ? void 0 : options.status) || 'WAITING',
        depositQueue: VaultCdoEpochDepositQueueMock(options == null ? void 0 : options.depositQueue),
        withdrawType: (options == null ? void 0 : options.withdrawType) || 'STANDARD',
        withdraws: (options == null ? void 0 : options.withdraws) ? VaultEpochWithdrawsMock(options.withdraws) : undefined,
        instantWithdraws: (options == null ? void 0 : options.instantWithdraws) ? VaultEpochInstantWithdrawsMock(options.instantWithdraws) : undefined,
        createdAt: (options == null ? void 0 : options.createdAt) || now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: (options == null ? void 0 : options.updatedAt) || now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}
export function VaultCdoEpochDepositQueueMock(options) {
    return {
        status: (options == null ? void 0 : options.status) || 'PENDING',
        amount: (options == null ? void 0 : options.amount) || '0'
    };
}
export function VaultEpochAPRsMock(options) {
    return {
        NET: (options == null ? void 0 : options.NET) || 0,
        DELTA: (options == null ? void 0 : options.DELTA) || 0,
        GROSS: (options == null ? void 0 : options.GROSS) || 0,
        EPOCH: (options == null ? void 0 : options.EPOCH) || 0,
        BUFFER: (options == null ? void 0 : options.BUFFER) || 0,
        CURE: (options == null ? void 0 : options.CURE) || 0
    };
}
export function VaultEpochAPYsMock(options) {
    return {
        NET: (options == null ? void 0 : options.NET) || 0,
        GROSS: (options == null ? void 0 : options.GROSS) || 0,
        FEE: (options == null ? void 0 : options.FEE) || 0
    };
}
export function VaultEpochWithdrawsMock(options) {
    return {
        amount: (options == null ? void 0 : options.amount) || '0',
        fees: (options == null ? void 0 : options.fees) || '0'
    };
}
export function VaultEpochInstantWithdrawsMock(options) {
    var _options_allowed;
    return {
        amount: (options == null ? void 0 : options.amount) || '0',
        delay: (options == null ? void 0 : options.delay) || 0,
        aprDelta: (options == null ? void 0 : options.aprDelta) || 0,
        allowed: (_options_allowed = options == null ? void 0 : options.allowed) != null ? _options_allowed : true,
        deadline: options == null ? void 0 : options.deadline
    };
}
export function VaultCdoEpochDataMock(options) {
    return {
        epoch: VaultEpochMock(options == null ? void 0 : options.epoch),
        lastEpoch: VaultEpochMock(options == null ? void 0 : options.lastEpoch),
        withdrawAmount: (options == null ? void 0 : options.withdrawAmount) || '0',
        withdrawDeadline: (options == null ? void 0 : options.withdrawDeadline) || new Date(),
        instantWithdrawed: !!(options == null ? void 0 : options.instantWithdrawed),
        interests: (options == null ? void 0 : options.interests) || '0',
        duration: (options == null ? void 0 : options.duration) || 0,
        durationSeconds: (options == null ? void 0 : options.durationSeconds) || 0,
        unit: (options == null ? void 0 : options.unit) || 'seconds',
        APRs: VaultEpochAPRsMock(options == null ? void 0 : options.APRs),
        feePercentage: (options == null ? void 0 : options.feePercentage) || 0,
        toWithdraw: (options == null ? void 0 : options.toWithdraw) || '0',
        isDefaultable: !!(options == null ? void 0 : options.isDefaultable)
    };
}

//# sourceMappingURL=vault-epoch.mock.js.map