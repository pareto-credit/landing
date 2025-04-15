import { VaultBestYield } from './vault-best-yield.class';
import { VaultCDOEpoch } from './vault-cdo-epoch.class';
import { VaultCDO } from './vault-cdo.class';
/**
 * Vault contract generic class
 */ export class VaultContractFactory {
    static fromVault(vault, token, options = {}) {
        switch(vault.contractType){
            case 'BestYield':
                return new VaultBestYield(vault, token, options);
            case 'CDO':
                return new VaultCDO(vault, token, options);
            case 'CDO_EPOCH':
                return new VaultCDOEpoch(vault, token, options);
        }
    }
}

//# sourceMappingURL=vault-contract.factory.js.map