import { Axios } from 'axios';
import { WalletPerformance, WalletPerformanceClientModel, WalletPerformancesSearchQuery } from '../wallet-performance.model';
import { ApiEntity } from '../../core';
export declare class WalletPerformanceClient extends ApiEntity implements WalletPerformanceClientModel {
    constructor(axios: Axios);
    /**
     * Search wallet performances by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for search wallet performances
     */
    search(searchParams?: WalletPerformancesSearchQuery): Promise<import("../../core").Page<WalletPerformance>>;
    /**
     * Search all epoch by params
     * @param searchParams - the vault
     * @returns
     */
    searchAll(searchParams?: WalletPerformancesSearchQuery): Promise<import("../../core").Page<WalletPerformance>>;
    /**
     * List wallet performances by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for list wallet performances
     */
    list(searchParams?: WalletPerformancesSearchQuery): Promise<WalletPerformance[]>;
    /**
     * List all wallet performances by params
     * @param searchParams - the search campaigns search params
     * @returns the promise for list wallet performances
     */
    listAll(searchParams?: WalletPerformancesSearchQuery): Promise<WalletPerformance[]>;
}
