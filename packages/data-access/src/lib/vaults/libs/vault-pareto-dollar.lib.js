/**
 * Get vault pareto dollar spender
 * @param vault - the vault object
 * @param kind - the spender kind
 * @returns the spender address
 */ export function getVaultParetoDollarSpender(vault, kind) {
    switch(kind){
        case 'MINT':
            return vault.address;
        case 'STAKE':
            var _vault_paretoDollar;
            return (_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.staking.address;
    }
}

//# sourceMappingURL=vault-pareto-dollar.lib.js.map