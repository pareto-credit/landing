import axios from 'axios';
import { CampaignsClient } from '../campaigns';
import { SignaturesClient } from '../signatures';
import { TransactionsClient } from '../transactions';
import { UsersClient } from '../users';
import { VaultEpochsClient } from '../vault-epochs';
import { createChainsClient } from '../chains';
import { createOperatorsClient } from '../operators';
import { createTokensClient } from '../tokens';
import { createVaultBlocksClient } from '../vault-blocks';
import { createVaultCategoriesClient } from '../vault-categories';
import { createVaultLatestBlocksClient } from '../vault-latest-blocks';
import { createVaultTypesClient } from '../vault-types';
import { createVaultsClient } from '../vaults';
import { createWalletLatestBlocksClient } from '../wallet-latest-blocks';
import { createWalletsClient } from '../wallets';
/**
 * API Client class
 */ export class ApiClient {
    /**
   * Axios initialization
   */ initAxios(apiUrl, token) {
        const options = {
            baseURL: `${apiUrl}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        };
        return axios.create(options);
    }
    constructor(apiUrl, token){
        this.axios = this.initAxios(apiUrl, token);
        this.campaigns = new CampaignsClient(this.axios);
        this.chains = createChainsClient(this.axios);
        this.operators = createOperatorsClient(this.axios);
        this.signatures = new SignaturesClient(this.axios);
        this.tokens = createTokensClient(this.axios);
        this.transactions = new TransactionsClient(this.axios);
        this.users = new UsersClient(this.axios);
        this.vaultBlocks = createVaultBlocksClient(this.axios);
        this.vaultCategories = createVaultCategoriesClient(this.axios);
        this.vaultEpochs = new VaultEpochsClient(this.axios);
        this.vaultLatestBlocks = createVaultLatestBlocksClient(this.axios);
        this.vaultTypes = createVaultTypesClient(this.axios);
        this.vaults = createVaultsClient(this.axios);
        this.walletLatestBlocks = createWalletLatestBlocksClient(this.axios);
        this.wallets = createWalletsClient(this.axios);
    }
}

//# sourceMappingURL=api-client.class.js.map