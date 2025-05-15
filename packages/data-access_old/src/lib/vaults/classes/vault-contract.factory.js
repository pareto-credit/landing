import { VaultBestYield } from './vault-best-yield.class';
import { VaultCDOEpoch } from './vault-cdo-epoch.class';
import { VaultCDO } from './vault-cdo.class';
import { VaultParetoDollar } from './vault-pareto-dollar.class';
import { VaultParetoToken } from './vault-pareto-token.class';
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
            case 'PARETO_DOLLAR':
                return new VaultParetoDollar(vault, token, options);
            case 'PARETO_TOKEN':
                return new VaultParetoToken(vault, token, options);
        }
    }
}

//# sourceMappingURL=vault-contract.factory.js.map