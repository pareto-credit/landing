import { CampaignPointClientModel } from '../campaign-points';
import { CampaignsClientModel } from '../campaigns';
import { ChainsClientModel } from '../chains';
import { OperatorsClientModel } from '../operators';
import { TokensClientModel } from '../tokens';
import { TransactionsClientModel } from '../transactions';
import { UsersClientModel } from '../users';
import { VaultBlocksClient } from '../vault-blocks';
import { VaultCategoriesClientModel } from '../vault-categories';
import { VaultEpochsClientModel } from '../vault-epochs';
import { VaultLatestBlocksClientModel } from '../vault-latest-blocks';
import { VaultRequestsClient } from '../vault-requests';
import { VaultRewardsClient } from '../vault-rewards';
import { VaultTypesClientModel } from '../vault-types';
import { VaultsClientModel } from '../vaults';
import { WalletBlocksClient } from '../wallet-blocks';
import { WalletLatestBlocksClient } from '../wallet-latest-blocks';
import { WalletPerformanceClientModel } from '../wallet-performances';
import { WalletsClientModel } from '../wallets';
/**
 * API Client structure
 */
export interface ApiClientModel {
    campaignPoints: CampaignPointClientModel;
    campaigns: CampaignsClientModel;
    chains: ChainsClientModel;
    operators: OperatorsClientModel;
    tokens: TokensClientModel;
    transactions: TransactionsClientModel;
    users: UsersClientModel;
    vaultBlocks: VaultBlocksClient;
    vaultCategories: VaultCategoriesClientModel;
    vaultEpochs: VaultEpochsClientModel;
    vaultLatestBlocks: VaultLatestBlocksClientModel;
    vaultRequests: VaultRequestsClient;
    vaultRewards: VaultRewardsClient;
    vaultTypes: VaultTypesClientModel;
    vaults: VaultsClientModel;
    walletBlocks: WalletBlocksClient;
    walletLatestBlocks: WalletLatestBlocksClient;
    walletPerformances: WalletPerformanceClientModel;
    wallets: WalletsClientModel;
}
