import { uniq } from 'lodash';
/**
 * Get the operator IDs from a vault.
 * @param vault - the vault object
 * @returns the operator IDs
 */ export function getVaultOperatorIds(vault) {
    var _vault_cdoEpoch, _vault_cdoEpoch1;
    let operatorIds = [];
    if (vault.operatorIds) {
        operatorIds = vault.operatorIds;
    }
    if ((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.borrower.operatorId) {
        operatorIds.push(vault.cdoEpoch.borrower.operatorId);
    }
    if ((_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch1.manager.operatorId) {
        operatorIds.push(vault.cdoEpoch.manager.operatorId);
    }
    if (vault.pools) {
        operatorIds = [
            ...operatorIds,
            ...vault.pools.filter((p)=>!!p.operatorId).map((p)=>p.operatorId)
        ];
    }
    return uniq(operatorIds);
}

//# sourceMappingURL=vault-utils.lib.js.map