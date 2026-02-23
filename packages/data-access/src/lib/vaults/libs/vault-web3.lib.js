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
    checkContractAddress: function() {
        return checkContractAddress;
    },
    checkVaultPoolInternalTransfer: function() {
        return checkVaultPoolInternalTransfer;
    },
    ensureAbi: function() {
        return ensureAbi;
    },
    getAbiByCode: function() {
        return getAbiByCode;
    },
    getVaultPoolEventType: function() {
        return getVaultPoolEventType;
    },
    getVaultPoolsAddresses: function() {
        return getVaultPoolsAddresses;
    },
    getVaultWeb3Data: function() {
        return getVaultWeb3Data;
    },
    getWeb3EventAddresses: function() {
        return getWeb3EventAddresses;
    },
    makeWeb3CallData: function() {
        return makeWeb3CallData;
    }
});
const _web3client = require("../../web3-client");
const _vaultcontractfactory = require("../classes/vault-contract.factory");
const _core = require("../../core");
const _lodash = require("lodash");
const _abis = require("../abis");
async function getVaultWeb3Data(web3Clients, vault, tokens, options) {
    const token = tokens.find((t)=>vault.tokenId === t._id);
    const web3Client = web3Clients[vault.chainId];
    if (!token) {
        throw Error('Token not found');
    }
    // Init contract
    const contract = _vaultcontractfactory.VaultContractFactory.fromVault(vault, token, {
        web3Client
    });
    return getVaultKycData(vault, contract, options);
}
function makeWeb3CallData(contract, contractMethod, inputs, parent) {
    const { jsonInterface } = contract.options;
    const { protocol, type, method, block, params = [] } = contractMethod;
    const address = contract.options.address;
    if (!address) {
        throw new Error('Contract without a valid address');
    }
    // Get ABI method to prepare the right types
    const methodAbi = jsonInterface.find((f)=>f.name === method && f.inputs.length === params.length);
    if (!methodAbi) {
        throw new Error(`No ABI method '${method}' found for ${protocol} at contract ${contract.options.address}`);
    }
    // Method name + params
    const inputTypes = methodAbi.inputs.map((i)=>i.type);
    const methodName = `${methodAbi.name}(${inputTypes.join(',')})`;
    // Outputs
    const outputs = methodAbi.outputs.map((output)=>({
            type: output.type,
            name: output.name,
            components: output.components
        }));
    return {
        protocol,
        type,
        address,
        method: methodName,
        params,
        block,
        parent,
        inputs: inputs || [],
        outputs
    };
}
/**
 * Load all contract vault contract data
 * @param contract - the vault contract
 * @returns the promise<VaultKycData> for load contract data
 */ async function getVaultKycData(vault, contract, options = {}) {
    var _vault_kyc, _vault_kyc1;
    const { walletAddress } = options;
    const vaultId = vault._id;
    if (!walletAddress || !((_vault_kyc = vault.kyc) == null ? void 0 : _vault_kyc.isActive)) {
        var _vault_kyc2;
        return {
            vaultId,
            isActive: !!((_vault_kyc2 = vault.kyc) == null ? void 0 : _vault_kyc2.isActive)
        };
    }
    // Kyc data
    const isWalletAllowed = await contract.getValue('IS_WALLET_ALLOWED', {
        walletAddress
    });
    return {
        vaultId,
        isActive: !!((_vault_kyc1 = vault.kyc) == null ? void 0 : _vault_kyc1.isActive),
        isWalletAllowed
    };
}
function getVaultPoolsAddresses(vault) {
    return (vault.pools || []).reduce((acc, p)=>{
        const newAcc = [
            ...acc,
            p.address.toLowerCase()
        ];
        if (p.oracle) {
            return [
                ...newAcc,
                p.oracle.address.toLowerCase()
            ];
        }
        return newAcc;
    }, []);
}
function getVaultPoolEventType(vault, event, from, to) {
    const poolAddresses = getVaultPoolsAddresses(vault);
    const isPoolToken = poolAddresses.includes(event.address.toLowerCase());
    // Handle pool token transfer
    if (isPoolToken) {
        // Mint pool token
        if (from.toLowerCase() === _web3client.WEB3_DEFAULT_ADDR) {
            return 'STAKE_POOL';
        }
        // Redeem pool token
        if (to.toLowerCase() === _web3client.WEB3_DEFAULT_ADDR) {
            return 'UNSTAKE_POOL';
        }
    // Handle pool underlying token transfer
    } else {
        if (poolAddresses.includes(to.toLowerCase())) {
            return 'STAKE_POOL';
        }
        if (poolAddresses.includes(from.toLowerCase())) {
            return 'UNSTAKE_POOL';
        }
    }
    return;
}
function checkVaultPoolInternalTransfer(vault, event, from, to) {
    const poolAddresses = getVaultPoolsAddresses(vault);
    const eventType = getVaultPoolEventType(vault, event, from, to);
    switch(eventType){
        case 'STAKE_POOL':
            return poolAddresses.includes(from.toLowerCase());
        case 'UNSTAKE_POOL':
            return poolAddresses.includes(to.toLowerCase());
    }
    return false;
}
function checkContractAddress(vault, address) {
    var _vault_cdoEpoch, _vault_cdoEpoch1, _vault_paretoDollar, _vault_paretoDollar1;
    const isVault = (0, _core.compLower)(address, vault.address);
    const isCdo = vault.cdo ? (0, _core.compLower)(address, vault.cdo.address) : false;
    const isCdoEpoch = vault.cdoEpoch ? (0, _core.compLower)(address, vault.cdoEpoch.address) : false;
    const isStrategy = vault.strategy ? (0, _core.compLower)(address, vault.strategy.address) : false;
    const isDepositQueue = ((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.depositQueue) ? (0, _core.compLower)(address, vault.cdoEpoch.depositQueue.address) : false;
    const isWithdrawQueue = ((_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch1.withdrawQueue) ? (0, _core.compLower)(address, vault.cdoEpoch.withdrawQueue.address) : false;
    const isParetoDollarQueue = ((_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.queue) ? (0, _core.compLower)(address, vault.paretoDollar.queue.address) : false;
    const isParetoDollarStaking = ((_vault_paretoDollar1 = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar1.staking) ? (0, _core.compLower)(address, vault.paretoDollar.staking.address) : false;
    const poolAddresses = getVaultPoolsAddresses(vault);
    const isPoolAddress = poolAddresses.includes(address.toLowerCase());
    return isVault || isCdo || isCdoEpoch || isStrategy || isDepositQueue || isWithdrawQueue || isParetoDollarQueue || isParetoDollarStaking || isPoolAddress;
}
function getWeb3EventAddresses(vault, event, transaction) {
    const addresses = [
        transaction == null ? void 0 : transaction.from,
        event.values['from'],
        event.values['to'],
        event.values['_from'],
        event.values['_to'],
        event.values['user'],
        event.values['owner'],
        event.values['receiver'],
        event.values['sender'],
        event.values['owner'],
        event.values['0'],
        event.values['1']
    ].filter((address)=>address && (0, _core.isAddress)(address) && address !== _web3client.WEB3_DEFAULT_ADDR && !checkContractAddress(vault, address));
    return (0, _lodash.uniq)(addresses.map((addr)=>addr.toLowerCase()));
}
function getAbiByCode(abiCode) {
    switch(abiCode){
        // Generic
        case 'ERC20':
            return _abis.ERC20_ABI;
        // CDO
        case 'CDO_MAIN_V1':
            return _abis.CDO_MAIN_V1_ABI;
        case 'CDO_MAIN_V2':
            return _abis.CDO_MAIN_V2_ABI;
        case 'CDO_MAIN_V3':
            return _abis.CDO_MAIN_V3_ABI;
        case 'CDO_MAIN_V4':
            return _abis.CDO_MAIN_V4_ABI;
        // CDO Strategy
        case 'CDO_STRATEGY_MAIN_V1':
            return _abis.CDO_STRATEGY_MAIN_V1_ABI;
        case 'CDO_STRATEGY_MAIN_V2':
            return _abis.CDO_STRATEGY_MAIN_V2_ABI;
        case 'CDO_STRATEGY_MAIN_V3':
            return _abis.CDO_STRATEGY_MAIN_V3_ABI;
        // Best Yield
        case 'BestYield_MAIN_V1':
            return _abis.BestYield_MAIN_V1_ABI;
        case 'BestYield_MAIN_V2':
            return _abis.BestYield_MAIN_V2_ABI;
        // CDO Epoch
        case 'CDO_EPOCH_MAIN_V1':
            return _abis.CDO_EPOCH_MAIN_V1_ABI;
        case 'CDO_EPOCH_MAIN_V2':
            return _abis.CDO_EPOCH_MAIN_V2_ABI;
        case 'CDO_EPOCH_MAIN_V3':
            return _abis.CDO_EPOCH_MAIN_V3_ABI;
        case 'CDO_EPOCH_MAIN_V4':
            return _abis.CDO_EPOCH_MAIN_V4_ABI;
        case 'CDO_EPOCH_DEPOSIT_QUEUE_V1':
            return _abis.CDO_EPOCH_DEPOSIT_QUEUE_V1_ABI;
        case 'CDO_EPOCH_DEPOSIT_QUEUE_V2':
            return _abis.CDO_EPOCH_DEPOSIT_QUEUE_V2_ABI;
        case 'CDO_EPOCH_WRITEOFF_V1':
            return _abis.CDO_EPOCH_WRITEOFF_V1_ABI;
        // CDO Epoch Strategy
        case 'CDO_EPOCH_STRATEGY_MAIN_V1':
            return _abis.CDO_EPOCH_STRATEGY_MAIN_V1_ABI;
        case 'CDO_EPOCH_STRATEGY_MAIN_V2':
            return _abis.CDO_EPOCH_STRATEGY_MAIN_V2_ABI;
        // Pareto Dollar
        case 'PARETO_DOLLAR_MAIN_V1':
            return _abis.PARETO_DOLLAR_MAIN_V1_ABI;
        case 'PARETO_DOLLAR_QUEUE_V1':
            return _abis.PARETO_DOLLAR_QUEUE_V1_ABI;
        case 'PARETO_DOLLAR_STAKING_V1':
            return _abis.PARETO_DOLLAR_STAKING_V1_ABI;
        // Oracles
        case 'ORACLE_AaveV2_V1':
            return _abis.ORACLE_AaveV2_V1_ABI;
        case 'ORACLE_Balancer_V1':
            return _abis.ORACLE_Balancer_V1_ABI;
        case 'ORACLE_Clearpool_V1':
            return _abis.ORACLE_Clearpool_V1_ABI;
        case 'ORACLE_PendleSY_V1':
            return _abis.ORACLE_PendleSY_V1_ABI;
        case 'ORACLE_PendlePT_V1':
            return _abis.ORACLE_PendlePT_V1_ABI;
        case 'ORACLE_Euler_V1':
            return _abis.ORACLE_Euler_V1_ABI;
        // Pools
        case 'POOL_AaveV2_V1':
            return _abis.POOL_AaveV2_V1_ABI;
        case 'POOL_Balancer_V1':
            return _abis.POOL_Balancer_V1_ABI;
        case 'POOL_BalancerGauge_V1':
            return _abis.POOL_BalancerGauge_V1_ABI;
        case 'POOL_Compound_V1':
            return _abis.POOL_Compound_V1_ABI;
        case 'POOL_Compound_V2':
            return _abis.POOL_Compound_V2_ABI;
        case 'POOL_Ethena_V1':
            return _abis.POOL_Ethena_V1_ABI;
        case 'POOL_Gearbox_V1':
            return _abis.POOL_Gearbox_V1_ABI;
        case 'POOL_Idle_V1':
            return _abis.POOL_Idle_V1_ABI;
        case 'POOL_InstadApp_V1':
            return _abis.POOL_InstadApp_V1_ABI;
        case 'POOL_Morpho_V1':
            return _abis.POOL_Morpho_V1_ABI;
        case 'POOL_NapierLP_V1':
            return _abis.POOL_NapierLP_V1_ABI;
        case 'POOL_NapierPT_V1':
            return _abis.POOL_NapierPT_V1_ABI;
        case 'POOL_NapierYT_V1':
            return _abis.POOL_NapierYT_V1_ABI;
        case 'POOL_PendleLP_V1':
            return _abis.POOL_PendleLP_V1_ABI;
        case 'POOL_PendlePT_V1':
            return _abis.POOL_PendlePT_V1_ABI;
        case 'POOL_PendleYT_V1':
            return _abis.POOL_PendleYT_V1_ABI;
        case 'POOL_Sky_V1':
            return _abis.POOL_Sky_V1_ABI;
        case 'POOL_Euler_V1':
            return _abis.POOL_Euler_V1_ABI;
        case 'POOL_TermFinance_V1':
            return _abis.POOL_TermFinance_V1_ABI;
        default:
            throw new Error(`Unsupported ABI code: ${abiCode}`);
    }
}
function ensureAbi({ abi, abiCode }) {
    if (abi) {
        return abi;
    }
    if (abiCode) {
        return getAbiByCode(abiCode);
    }
    throw new Error(`ABI not found`);
}

//# sourceMappingURL=vault-web3.lib.js.map