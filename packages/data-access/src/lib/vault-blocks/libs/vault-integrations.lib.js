"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getTrancheApr: function() {
        return getTrancheApr;
    },
    getVaultIntegrationsData: function() {
        return getVaultIntegrationsData;
    }
});
const _core = require("../../core");
const _integrationsclientlib = require("../../integrations/integrations-client.lib");
async function getVaultIntegrationsData(integrations, options) {
    const { tokenSymbol, vaultType, cdoData, blockNumber, logger } = options || {};
    const integrationsData = {};
    for (const integration of integrations){
        const client = new _integrationsclientlib.IntegrationClient(integration.provider);
        switch(integration.type){
            case 'APR':
                {
                    if (!tokenSymbol) {
                        throw new Error(`Integration Error: TokenSymbol required but not specified (provider: ${integration.provider}, type: ${integration.type})`);
                    }
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
            case 'repoTokenHolders':
                {
                    var _integration_params;
                    const collateralToken = (_integration_params = integration.params) == null ? void 0 : _integration_params.collateralToken;
                    if (!collateralToken) {
                        throw new Error(`Integration Error: Missing collateralToken (provider: ${integration.provider}, type: ${integration.type})`);
                    }
                    try {
                        const repoTokenHolders = await client.getRepoTokensHolders({
                            collateralToken,
                            blockNumber
                        });
                        if (repoTokenHolders == null ? void 0 : repoTokenHolders.length) {
                            var _integrationsData_repoTokenHolders;
                            integrationsData.repoTokenHolders = [
                                ...(_integrationsData_repoTokenHolders = integrationsData.repoTokenHolders) != null ? _integrationsData_repoTokenHolders : [],
                                ...repoTokenHolders
                            ];
                        }
                    } catch (error) {
                        var _logger_error;
                        logger == null ? void 0 : (_logger_error = logger.error) == null ? void 0 : _logger_error.call(logger, `Integration Error: Failed to fetch repoTokenHolders (provider: ${integration.provider}, type: ${integration.type}): ${error}`);
                    }
                }
                break;
        }
    }
    return integrationsData;
}
function getTrancheApr(strategyApr, trancheType, cdoData) {
    const { currentAARatio, APRSplitRatio } = cdoData;
    if (!currentAARatio || !APRSplitRatio) {
        return 0;
    }
    const FULL_ALLOC = (0, _core.BNify)(100000);
    const isAATranche = trancheType === 'AA';
    if ((0, _core.BNify)(currentAARatio).eq(0)) {
        return isAATranche ? 0 : strategyApr;
    }
    if ((0, _core.BNify)(strategyApr).isNaN()) {
        return 0;
    }
    const apr = isAATranche ? (0, _core.BNify)(strategyApr).times(APRSplitRatio).div(currentAARatio) : (0, _core.BNify)(strategyApr).times(FULL_ALLOC.minus(APRSplitRatio)).div((0, _core.BNify)(FULL_ALLOC).minus(currentAARatio));
    return apr.toNumber();
}

//# sourceMappingURL=vault-integrations.lib.js.map