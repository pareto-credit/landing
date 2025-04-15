import { VaultIntegrationProvider } from '../vaults';
import { IntegrationClientModel } from './integration-client.model';
export declare class IntegrationClient implements IntegrationClientModel {
    private client;
    constructor(provider: VaultIntegrationProvider);
    getApr(tokenSymbol: string): Promise<number>;
}
