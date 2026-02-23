import { TermFinanceHolder } from '../vaults';
export interface IntegrationRepoTokensParams {
    collateralToken: string;
    blockNumber?: number;
}
export interface IntegrationClientModel {
    getApr?: (tokenSymbol: string) => Promise<number>;
    getAccountVaults?: (account: string) => Promise<string[]>;
    getRepoTokensHolders?: (params: IntegrationRepoTokensParams) => Promise<TermFinanceHolder[]>;
}
