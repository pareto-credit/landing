import { ApiClientModel } from '../../api-client';
import { SharedLogger } from '../../core';
export declare class RwaClient {
    private axios;
    private apiKey;
    private api;
    private logger;
    private dryRun;
    constructor(options: {
        api: ApiClientModel;
        apiKey: string;
        logger?: SharedLogger;
        dryRun?: boolean;
    });
    pushLatest(): Promise<{
        results: {
            date: string;
            vaultId: string;
            rwaId: string;
            message?: string;
        }[];
    }>;
    private initAxios;
    private addParetoDollarEntries;
}
