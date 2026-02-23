import { ApiClientModel } from './api-client.model';
import { CampaignsClient } from '../campaigns';
import { SignaturesClient } from '../signatures';
import { TransactionsClient } from '../transactions';
import { UsersClient } from '../users';
import { VaultEpochsClient } from '../vault-epochs';
import { ChainsClient } from '../chains';
import { OperatorsClient } from '../operators';
import { TokensClient } from '../tokens';
import { VaultBlocksClient } from '../vault-blocks';
import { VaultCategoriesClient } from '../vault-categories';
import { VaultLatestBlocksClient } from '../vault-latest-blocks';
import { VaultTypesClient } from '../vault-types';
import { VaultsClient } from '../vaults';
import { WalletLatestBlocksClient } from '../wallet-latest-blocks';
import { WalletsClient } from '../wallets';
import { CampaignPointsClient } from '../campaign-points';
import { WalletPerformanceClient } from '../wallet-performances';
import { WalletBlocksClient } from '../wallet-blocks';
import { VaultRequestsClient } from '../vault-requests';
import { VaultRewardsClient } from '../vault-rewards';
/**
 * API Client class
 */
export declare class ApiClient implements ApiClientModel {
    campaignPoints: CampaignPointsClient;
    campaigns: CampaignsClient;
    chains: ChainsClient;
    operators: OperatorsClient;
    tokens: TokensClient;
    transactions: TransactionsClient;
    users: UsersClient;
    vaultBlocks: VaultBlocksClient;
    vaultCategories: VaultCategoriesClient;
    vaultEpochs: VaultEpochsClient;
    vaultLatestBlocks: VaultLatestBlocksClient;
    vaultRequests: VaultRequestsClient;
    vaultRewards: VaultRewardsClient;
    vaultTypes: VaultTypesClient;
    vaults: VaultsClient;
    walletBlocks: WalletBlocksClient;
    walletLatestBlocks: WalletLatestBlocksClient;
    walletPerformances: WalletPerformanceClient;
    wallets: WalletsClient;
    signatures: SignaturesClient;
    private axios;
    constructor(apiUrl: string, token: string);
    /**
     * Axios initialization
     */
    private initAxios;
}
