import { IntegrationClientModel } from '../integration-client.model';
export declare class EthenaClient implements IntegrationClientModel {
    private axios;
    constructor();
    /**
     * Axios initialization
     */
    private initAxios;
    getApr(tokenSymbol: string): Promise<number>;
    getUSDeApr(): Promise<number>;
}
