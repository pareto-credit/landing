export interface IntegrationClientModel {
    getApr?: (tokenSymbol: string) => Promise<number>;
    getAccountVaults?: (account: string) => Promise<string[]>;
}
