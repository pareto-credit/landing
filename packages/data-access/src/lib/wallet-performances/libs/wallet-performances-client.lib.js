import { WalletPerformanceRoutes } from '../wallet-performance.model';
import { ApiEntity } from '../../core';
export class WalletPerformanceClient extends ApiEntity {
    /**
   * Search wallet performances by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for search wallet performances
   */ search(searchParams) {
        return this._search(WalletPerformanceRoutes.v1Search, searchParams);
    }
    /**
   * Search all epoch by params
   * @param searchParams - the vault
   * @returns
   */ searchAll(searchParams) {
        return this._searchAll(WalletPerformanceRoutes.v1Search, searchParams);
    }
    /**
   * List wallet performances by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list wallet performances
   */ list(searchParams) {
        return this._list(WalletPerformanceRoutes.v1Search, searchParams);
    }
    /**
   * List all wallet performances by params
   * @param searchParams - the search campaigns search params
   * @returns the promise for list wallet performances
   */ listAll(searchParams) {
        return this._listAll(WalletPerformanceRoutes.v1Search, searchParams);
    }
    constructor(axios){
        super(axios);
    }
}

//# sourceMappingURL=wallet-performances-client.lib.js.map