export interface IntegrationClientModel {
    getApr: (tokenSymbol: string) => Promise<number>;
}
