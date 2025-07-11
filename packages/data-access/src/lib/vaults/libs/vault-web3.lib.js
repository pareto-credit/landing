import { VaultContractFactory } from '../classes/vault-contract.factory';
import { compLower } from '../../core';
/**
 * Load vault web3 data
 * @param web3Clients - the web3 clients
 * @param vault - the vault data
 * @param tokens - the tokens available
 * @param options - the options
 * @returns the web3 data
 */ export async function getVaultWeb3Data(web3Clients, vault, tokens, options) {
    const token = tokens.find((t)=>vault.tokenId === t._id);
    const web3Client = web3Clients[vault.chainId];
    if (!token) {
        throw Error('Token not found');
    }
    // Init contract
    const contract = VaultContractFactory.fromVault(vault, token, {
        web3Client
    });
    return getVaultKycData(vault, contract, options);
}
/**
 * Make web3 call data for a specific contract method
 * @param contract contract
 * @param contractMethod contract method to call
 * @param parent parent web3 entity in case of nested calls
 * @returns web3 call data
 */ export function makeWeb3CallData(contract, contractMethod, inputs, parent) {
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
/**
 * Get Pool event type
 * @param vault vault object
 * @param from from address
 * @param to to address
 * @returns pool event type (if any)
 */ export function getVaultPoolEventType(vault, from, to) {
    var _vault_pools, _vault_pools1;
    if ((_vault_pools = vault.pools) == null ? void 0 : _vault_pools.map((p)=>p.address.toLowerCase()).includes(to.toLowerCase())) {
        return 'STAKE_POOL';
    }
    if ((_vault_pools1 = vault.pools) == null ? void 0 : _vault_pools1.map((p)=>p.address.toLowerCase()).includes(from.toLowerCase())) {
        return 'UNSTAKE_POOL';
    }
    return;
}
/**
 * Check if a specific address corresponds to a vault contract address
 * @param vault vault model
 * @param address address to check
 * @returns true | false
 */ export function checkContractAddress(vault, address) {
    var _vault_cdoEpoch, _vault_cdoEpoch1, _vault_paretoDollar, _vault_paretoDollar1;
    const isVault = compLower(address, vault.address);
    const isCdo = vault.cdo ? compLower(address, vault.cdo.address) : false;
    const isCdoEpoch = vault.cdoEpoch ? compLower(address, vault.cdoEpoch.address) : false;
    const isStrategy = vault.strategy ? compLower(address, vault.strategy.address) : false;
    const isDepositQueue = ((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch.depositQueue) ? compLower(address, vault.cdoEpoch.depositQueue.address) : false;
    const isWithdrawQueue = ((_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch1.withdrawQueue) ? compLower(address, vault.cdoEpoch.withdrawQueue.address) : false;
    const isParetoDollarQueue = ((_vault_paretoDollar = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar.queue) ? compLower(address, vault.paretoDollar.queue.address) : false;
    const isParetoDollarStaking = ((_vault_paretoDollar1 = vault.paretoDollar) == null ? void 0 : _vault_paretoDollar1.staking) ? compLower(address, vault.paretoDollar.staking.address) : false;
    return isVault || isCdo || isCdoEpoch || isStrategy || isDepositQueue || isWithdrawQueue || isParetoDollarQueue || isParetoDollarStaking;
}

//# sourceMappingURL=vault-web3.lib.js.map