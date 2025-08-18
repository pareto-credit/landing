import { ApiClientModel } from './api-client.model';
import { CampaignsClient } from '../campaigns';
import { SignaturesClient } from '../signatures';
import { TransactionsClient } from '../transactions';
import { UsersClient } from '../users';
import { VaultEpochsClient } from '../vault-epochs';
import { VaultBlocksClient } from '../vault-blocks';
import { CampaignPointsClient } from '../campaign-points';
import { WalletPerformanceClient } from '../wallet-performances';
/**
 * API Client class
 */
export declare class ApiClient implements ApiClientModel {
    campaignPoints: CampaignPointsClient;
    campaigns: CampaignsClient;
    chains: import("../chains").ChainsClient;
    operators: import("../operators").OperatorsClient;
    tokens: import("../tokens").TokensClient;
    transactions: TransactionsClient;
    users: UsersClient;
    vaultBlocks: VaultBlocksClient;
    vaultCategories: import("../vault-categories").VaultCategoriesClient;
    vaultEpochs: VaultEpochsClient;
    vaultLatestBlocks: import("../vault-latest-blocks").VaultLatestBlocksClient;
    vaultTypes: import("../vault-types").VaultTypesClient;
    vaults: import("../vaults").VaultsClient;
    walletLatestBlocks: import("../wallet-latest-blocks").WalletLatestBlocksClient;
    walletPerformances: WalletPerformanceClient;
    wallets: import("../wallets").WalletsClient;
    signatures: SignaturesClient;
    private axios;
    constructor(apiUrl: string, token: string);
    /**
     * Axios initialization
     */
    private initAxios;
}
