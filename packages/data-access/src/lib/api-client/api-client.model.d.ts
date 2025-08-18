import { CampaignPointClientModel } from '../campaign-points';
import { CampaignsClientModel } from '../campaigns';
import { ChainsClient } from '../chains';
import { OperatorsClient } from '../operators';
import { TokensClient } from '../tokens';
import { TransactionsClientModel } from '../transactions';
import { UsersClientModel } from '../users';
import { VaultBlocksClient } from '../vault-blocks';
import { VaultCategoriesClient } from '../vault-categories';
import { VaultEpochsClientModel } from '../vault-epochs';
import { VaultLatestBlocksClient } from '../vault-latest-blocks';
import { VaultTypesClient } from '../vault-types';
import { VaultsClient } from '../vaults';
import { WalletLatestBlocksClient } from '../wallet-latest-blocks';
import { WalletPerformanceClientModel } from '../wallet-performances';
import { WalletsClient } from '../wallets';
/**
 * API Client structure
 */
export interface ApiClientModel {
    campaignPoints: CampaignPointClientModel;
    campaigns: CampaignsClientModel;
    chains: ChainsClient;
    operators: OperatorsClient;
    tokens: TokensClient;
    transactions: TransactionsClientModel;
    users: UsersClientModel;
    vaultBlocks: VaultBlocksClient;
    vaultCategories: VaultCategoriesClient;
    vaultEpochs: VaultEpochsClientModel;
    vaultLatestBlocks: VaultLatestBlocksClient;
    vaultTypes: VaultTypesClient;
    vaults: VaultsClient;
    walletLatestBlocks: WalletLatestBlocksClient;
    walletPerformances: WalletPerformanceClientModel;
    wallets: WalletsClient;
}
