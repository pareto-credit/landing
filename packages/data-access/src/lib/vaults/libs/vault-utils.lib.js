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
    getVaultCampaignIds: function() {
        return getVaultCampaignIds;
    },
    getVaultKYCContract: function() {
        return getVaultKYCContract;
    },
    getVaultOperatorIds: function() {
        return getVaultOperatorIds;
    },
    getVaultSiblingsKeys: function() {
        return getVaultSiblingsKeys;
    },
    getVaultTokenIds: function() {
        return getVaultTokenIds;
    },
    getVaultYieldSourcesKeys: function() {
        return getVaultYieldSourcesKeys;
    },
    getVaultsCampaignIds: function() {
        return getVaultsCampaignIds;
    },
    getVaultsKeys: function() {
        return getVaultsKeys;
    },
    getVaultsOperatorIds: function() {
        return getVaultsOperatorIds;
    },
    getVaultsSiblingsKeys: function() {
        return getVaultsSiblingsKeys;
    },
    getVaultsTokenIds: function() {
        return getVaultsTokenIds;
    },
    getVaultsYieldSourcesKeys: function() {
        return getVaultsYieldSourcesKeys;
    }
});
const _lodash = require("lodash");
function getVaultOperatorIds(vault) {
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
    return (0, _lodash.uniq)(operatorIds);
}
function getVaultTokenIds(vault) {
    const tokenIds = [
        vault.tokenId
    ];
    if (vault.contractType === 'PARETO_DOLLAR' && vault.paretoDollar) {
        tokenIds.push(vault.paretoDollar.tokenId, vault.paretoDollar.staking.tokenId, ...(vault.paretoDollar.collaterals || []).map((collateral)=>collateral.tokenId));
    }
    return (0, _lodash.uniq)(tokenIds);
}
function getVaultsTokenIds(vaults) {
    const operatorIds = vaults.reduce((acc, v)=>[
            ...acc,
            ...getVaultTokenIds(v)
        ], []);
    return (0, _lodash.uniq)(operatorIds);
}
function getVaultsOperatorIds(vaults) {
    const operatorIds = vaults.reduce((acc, v)=>[
            ...acc,
            ...getVaultOperatorIds(v)
        ], []);
    return (0, _lodash.uniq)(operatorIds);
}
function getVaultsKeys(vaults, key) {
    return (0, _lodash.uniq)(vaults.filter((t)=>!!t[key]).map((t)=>t[key]));
}
function getVaultYieldSourcesKeys(block) {
    var _block_paretoDollar_queue, _block_paretoDollar;
    if (!((_block_paretoDollar = block.paretoDollar) == null ? void 0 : (_block_paretoDollar_queue = _block_paretoDollar.queue) == null ? void 0 : _block_paretoDollar_queue.yieldSources)) {
        return {};
    }
    const { yieldSources } = block.paretoDollar.queue;
    const vaultIds = (0, _lodash.uniq)(yieldSources.map((source)=>source.vaultId).filter((v)=>!!v));
    const operatorIds = (0, _lodash.uniq)(yieldSources.map((source)=>source.operatorId).filter((v)=>!!v));
    const tokenAddresses = (0, _lodash.uniq)(yieldSources.map((source)=>source.tokenAddress).filter((v)=>!!v));
    return {
        vaultIds,
        operatorIds,
        tokenAddresses
    };
}
function getVaultsYieldSourcesKeys(vaults, blocks) {
    const yieldSourcesKeys = vaults.reduce((acc, v)=>{
        const block = blocks.find((b)=>b.vaultId === v._id);
        if (!block) {
            return acc;
        }
        const { vaultIds, operatorIds, tokenAddresses } = getVaultYieldSourcesKeys(block);
        return {
            vaultIds: (0, _lodash.uniq)([
                ...acc.vaultIds || [],
                ...vaultIds || []
            ]),
            operatorIds: (0, _lodash.uniq)([
                ...acc.operatorIds || [],
                ...operatorIds || []
            ]),
            tokenAddresses: (0, _lodash.uniq)([
                ...acc.tokenAddresses || [],
                ...tokenAddresses || []
            ])
        };
    }, {});
    return yieldSourcesKeys;
}
function getVaultSiblingsKeys(vault) {
    if (!vault.siblings) {
        return {};
    }
    const vaultIds = (0, _lodash.uniq)(vault.siblings.map((s)=>s._id));
    const chainIds = (0, _lodash.uniq)(vault.siblings.map((s)=>s.chainId));
    return {
        vaultIds,
        chainIds
    };
}
function getVaultsSiblingsKeys(vaults) {
    const siblingsKeys = vaults.reduce((acc, v)=>{
        const { vaultIds, chainIds } = getVaultSiblingsKeys(v);
        return {
            vaultIds: (0, _lodash.uniq)([
                ...acc.vaultIds || [],
                ...vaultIds || []
            ]),
            chainIds: (0, _lodash.uniq)([
                ...acc.chainIds || [],
                ...chainIds || []
            ])
        };
    }, {});
    return siblingsKeys;
}
function getVaultCampaignIds(vault) {
    var _vault_campaigns;
    return (0, _lodash.uniq)((_vault_campaigns = vault.campaigns) == null ? void 0 : _vault_campaigns.map((c)=>c._id));
}
function getVaultsCampaignIds(vaults) {
    return vaults.reduce((acc, v)=>(0, _lodash.uniq)([
            ...acc,
            ...getVaultCampaignIds(v)
        ]), []);
}
function getVaultKYCContract(vault) {
    switch(vault.contractType){
        case 'CDO_EPOCH':
            {
                const { abi, abiCode, address } = vault.cdoEpoch || {};
                return {
                    abi,
                    abiCode,
                    address
                };
            }
        case 'PARETO_DOLLAR':
            {
                const { abi, abiCode, address } = vault;
                return {
                    abi,
                    abiCode,
                    address
                };
            }
        // Not available
        default:
            return {};
    }
}

//# sourceMappingURL=vault-utils.lib.js.map