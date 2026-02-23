import { TermFinanceHolder, VaultIntegrationProvider } from '../vaults';
import { IntegrationClientModel, IntegrationRepoTokensParams } from './integration-client.model';
export declare class IntegrationClient implements IntegrationClientModel {
    private client;
    constructor(provider: VaultIntegrationProvider);
    getApr(tokenSymbol: string): Promise<number>;
    getRepoTokensHolders(params: IntegrationRepoTokensParams): Promise<TermFinanceHolder[]>;
}
