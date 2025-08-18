import { IntegrationClientModel } from '../integration-client.model';
export declare class EulerClient implements IntegrationClientModel {
    private axios;
    constructor();
    /**
     * Axios initialization
     */
    private initAxios;
    getAccountVaults(account: string): Promise<string[]>;
}
