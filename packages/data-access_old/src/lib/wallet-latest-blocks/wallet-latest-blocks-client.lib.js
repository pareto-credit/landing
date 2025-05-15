import { uriFy } from '../core';
import { WalletLatestBlockRoutes } from './wallet-latest-block.model';
/**
 * Create wallets latest blocks client
 * @param axios - The Axios instance
 * @returns the wallets latest blocks GOT client
 */ export function createWalletLatestBlocksClient(axios) {
    return {
        search: (searchParams)=>axios.request({
                url: WalletLatestBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        list: (searchParams)=>axios.request({
                url: WalletLatestBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: WalletLatestBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            })
    };
}

//# sourceMappingURL=wallet-latest-blocks-client.lib.js.map