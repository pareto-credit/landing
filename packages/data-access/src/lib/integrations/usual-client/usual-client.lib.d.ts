import { IntegrationClientModel } from '../integration-client.model';
export declare class UsualClient implements IntegrationClientModel {
    private axios;
    constructor();
    /**
     * Axios initialization
     */
    private initAxios;
    getApr(tokenSymbol: string): Promise<number>;
    getUsd0Apr(): Promise<number>;
}
