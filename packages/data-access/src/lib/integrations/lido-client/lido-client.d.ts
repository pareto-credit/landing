import { IntegrationClientModel } from '../integration-client.model';
export declare class LidoClient implements IntegrationClientModel {
    private axios;
    constructor();
    /**
     * Axios initialization
     */
    private initAxios;
    getApr(tokenSymbol: string): Promise<number>;
    getStETHApr(): Promise<number>;
    getMaticApr(): Promise<number>;
}
