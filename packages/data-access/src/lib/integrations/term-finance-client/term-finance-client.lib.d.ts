import { IntegrationClientModel, IntegrationRepoTokensParams } from '../integration-client.model';
import { TermFinanceHolder } from '../../vaults';
export declare class TermFinanceClient implements IntegrationClientModel {
    private readonly axios;
    private readonly etherscanClient;
    constructor();
    getRepoTokensHolders(params: IntegrationRepoTokensParams): Promise<TermFinanceHolder[]>;
    private initAxios;
    private fetchRepoTokens;
    private getRepoTokenBalances;
}
