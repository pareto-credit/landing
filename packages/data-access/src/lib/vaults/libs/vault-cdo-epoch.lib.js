/**
 * Get vault cdoEpoch spender
 * @param vault vault object
 * @param block vault block object
 * @param kind the pender kind
 * @returns the spender address
 */ export function getVaultCdoEpochSpender(vault, block, kind) {
    switch(kind){
        case 'DEPOSIT':
            return getDepositSpender(vault, block);
        case 'WITHDRAW':
            return getWithdrawSpender(vault, block);
    }
}
function getDepositSpender(vault, block) {
    var _vault_cdoEpoch_depositQueue, _vault_cdoEpoch, _block_cdoEpoch, _vault_cdoEpoch_depositQueue1, _vault_cdoEpoch1, _vault_cdoEpoch2;
    const isQueueEnabled = !!((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_depositQueue = _vault_cdoEpoch.depositQueue) == null ? void 0 : _vault_cdoEpoch_depositQueue.address);
    const isEpochRunning = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.status) === 'RUNNING';
    return isQueueEnabled && isEpochRunning ? (_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_depositQueue1 = _vault_cdoEpoch1.depositQueue) == null ? void 0 : _vault_cdoEpoch_depositQueue1.address : (_vault_cdoEpoch2 = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch2.address;
}
function getWithdrawSpender(vault, block) {
    var _vault_cdoEpoch_withdrawQueue, _vault_cdoEpoch, _block_cdoEpoch, _vault_cdoEpoch_withdrawQueue1, _vault_cdoEpoch1;
    const isQueueEnabled = !!((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_withdrawQueue = _vault_cdoEpoch.withdrawQueue) == null ? void 0 : _vault_cdoEpoch_withdrawQueue.address);
    const isEpochRunning = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.status) === 'RUNNING';
    return isQueueEnabled && isEpochRunning ? (_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_withdrawQueue1 = _vault_cdoEpoch1.withdrawQueue) == null ? void 0 : _vault_cdoEpoch_withdrawQueue1.address : undefined;
}

//# sourceMappingURL=vault-cdo-epoch.lib.js.map