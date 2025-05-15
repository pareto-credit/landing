import { VaultContractFactory } from '../classes/vault-contract.factory';
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
 * Get spender address for deposits
 * @param vault vault object
 * @param block vault block object
 * @returns deposit spender address
 */ export function getVaultDepositSpender(vault, block) {
    var _vault_cdoEpoch_depositQueue, _vault_cdoEpoch, _block_cdoEpoch, _vault_cdoEpoch_depositQueue1, _vault_cdoEpoch1, _vault_cdoEpoch2;
    const isQueueEnabled = !!((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_depositQueue = _vault_cdoEpoch.depositQueue) == null ? void 0 : _vault_cdoEpoch_depositQueue.address);
    const isEpochRunning = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.status) === 'RUNNING';
    return isQueueEnabled && isEpochRunning ? (_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_depositQueue1 = _vault_cdoEpoch1.depositQueue) == null ? void 0 : _vault_cdoEpoch_depositQueue1.address : (_vault_cdoEpoch2 = vault.cdoEpoch) == null ? void 0 : _vault_cdoEpoch2.address;
}
/**
 * Get spender address for withdraws
 * @param vault vault object
 * @param block vault block object
 * @returns withdraw spender address
 */ export function getVaultWithdrawSpender(vault, block) {
    var _vault_cdoEpoch_withdrawQueue, _vault_cdoEpoch, _block_cdoEpoch, _vault_cdoEpoch_withdrawQueue1, _vault_cdoEpoch1;
    const isQueueEnabled = !!((_vault_cdoEpoch = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_withdrawQueue = _vault_cdoEpoch.withdrawQueue) == null ? void 0 : _vault_cdoEpoch_withdrawQueue.address);
    const isEpochRunning = ((_block_cdoEpoch = block.cdoEpoch) == null ? void 0 : _block_cdoEpoch.status) === 'RUNNING';
    return isQueueEnabled && isEpochRunning ? (_vault_cdoEpoch1 = vault.cdoEpoch) == null ? void 0 : (_vault_cdoEpoch_withdrawQueue1 = _vault_cdoEpoch1.withdrawQueue) == null ? void 0 : _vault_cdoEpoch_withdrawQueue1.address : undefined;
}

//# sourceMappingURL=vault-web3.lib.js.map