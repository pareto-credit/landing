import { BNify } from '../../core';
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
/**
 * Get Vault pareto dollar collateralization amounts
 * @param block - the vault block
 * @returns the collateralization amounts
 */ export function getVaultParetoDollarCollateralization(block) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { totalSupply } = block;
    const { totalCollateralsScaled } = queue;
    const value = BNify(totalCollateralsScaled).toString();
    const percentage = BNify(value).div(BNify(totalSupply)).times(100).toString();
    return {
        value,
        percentage
    };
}
/**
 * Get vault pareto dollar allocation data
 * @param block - the vault block
 * @param vaults - the allocation vaults
 * @param operators - the allocation operators
 * @param tokens - the allocation tokens
 * @returns the allocation data
 */ export function getVaultParetoDollarAllocation(block, sourcesSideData, options) {
    var _block_paretoDollar;
    const queue = (_block_paretoDollar = block.paretoDollar) == null ? void 0 : _block_paretoDollar.queue;
    if (!queue) {
        throw Error('Wrong vault contract type');
    }
    const { totalCollateralsScaled, unlentBalanceScaled, yieldSources = [] } = queue;
    const total = BNify(totalCollateralsScaled).toString();
    const unlentValue = BNify(unlentBalanceScaled).toString();
    const unlentPercentage = BNify(unlentValue).div(total).times(100).toString();
    const unlent = {
        value: unlentValue,
        percentage: unlentPercentage
    };
    // Parse yield sources data
    const sources = yieldSources.filter((y)=>y.vaultType !== 0).map((yieldSource)=>parseYieldSourceAllocation(total, yieldSource, sourcesSideData, options));
    return {
        total,
        unlent,
        sources
    };
}
function parseYieldSourceAllocation(totalSources, yieldSource, sourcesData = {}, options = {}) {
    const { vaults, operators, tokens } = sourcesData;
    const { currentKey, defaultColor, primaryColor } = options;
    // Check yield source type
    const vault = vaults == null ? void 0 : vaults.find((v)=>v._id === yieldSource.vaultId);
    const operator = operators == null ? void 0 : operators.find((o)=>{
        var _vault_cdoEpoch;
        return o._id === yieldSource.operatorId || o._id === (vault == null ? void 0 : (_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.borrower.operatorId);
    });
    const token = tokens == null ? void 0 : tokens.find((t)=>t._id === yieldSource.tokenId);
    // Get yield source data
    const label = (vault == null ? void 0 : vault.name) || (token == null ? void 0 : token.name) || (operator == null ? void 0 : operator.name) || 'Yield source';
    const value = BNify(yieldSource.depositedAmount).toNumber();
    const percentage = BNify(yieldSource.depositedAmount).div(totalSources).times(100).toNumber();
    const key = vault ? `VAULT_${vault.symbol}` : token ? `TOKEN_${token.symbol}` : operator ? `OPERATOR_${operator.code}` : 'YIELD_SOURCE';
    // Yield color
    const sourceColor = (operator == null ? void 0 : operator.color) || (token == null ? void 0 : token.color) || primaryColor;
    const color = currentKey === key ? sourceColor : defaultColor;
    return {
        key,
        label,
        value,
        percentage,
        color,
        data: {
            vault,
            operator,
            token
        }
    };
}

//# sourceMappingURL=vault-pareto-dollar.lib.js.map