import { BNify } from '../../core';
import { IntegrationClient } from '../../integrations/integrations-client.lib';
/**
 * Get vault integrations data
 * @param integrations vault integrations
 * @returns vault integrations data
 */ export async function getVaultIntegrationsData(integrations, options) {
    const { tokenSymbol, vaultType, cdoData } = options || {};
    const integrationsData = {};
    for (const integration of integrations){
        if (!tokenSymbol) {
            throw new Error(`Integration Error: TokenSymbol required but not specified (provider: ${integration.provider}, type: ${integration.type})`);
        }
        const client = new IntegrationClient(integration.provider);
        if (!client) continue;
        switch(integration.type){
            case 'APR':
                {
                    if (!vaultType) {
                        throw new Error(`Integration Error: vaultType not specified (provider: ${integration.provider}, type: ${integration.type})`);
                    }
                    const APR = await client.getApr(tokenSymbol);
                    // Get splitted APR for tranches
                    if ([
                        'AA',
                        'BB'
                    ].includes(vaultType)) {
                        if (!(cdoData == null ? void 0 : cdoData.currentAARatio) || !(cdoData == null ? void 0 : cdoData.APRSplitRatio)) {
                            throw new Error(`Integration Error: Missing or empty cdoData (provider: ${integration.provider}, type: ${integration.type})`);
                        }
                        integrationsData.APR = getTrancheApr(APR, vaultType, cdoData);
                    } else {
                        integrationsData.APR = APR;
                    }
                }
                break;
        }
    }
    return integrationsData;
}
/**
 * Get tranche APR depending on tranche split ratio
 * @param strategyApr base strategy APR
 * @param trancheType AA | BB
 * @param cdoData cdo data from contract
 * @returns tranche APR
 */ export function getTrancheApr(strategyApr, trancheType, cdoData) {
    const { currentAARatio, APRSplitRatio } = cdoData;
    if (!currentAARatio || !APRSplitRatio) {
        return 0;
    }
    const FULL_ALLOC = BNify(100000);
    const isAATranche = trancheType === 'AA';
    if (BNify(currentAARatio).eq(0)) {
        return isAATranche ? 0 : strategyApr;
    }
    if (BNify(strategyApr).isNaN()) {
        return 0;
    }
    const apr = isAATranche ? BNify(strategyApr).times(APRSplitRatio).div(currentAARatio) : BNify(strategyApr).times(FULL_ALLOC.minus(APRSplitRatio)).div(BNify(FULL_ALLOC).minus(currentAARatio));
    return apr.toNumber();
}

//# sourceMappingURL=vault-integrations.lib.js.map