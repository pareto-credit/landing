import { VaultLatestBlockRoutes } from '../vault-latest-block.model';
import { uriFy } from '../../core';
/**
 * Create vault latest blocks client
 * @param axios - The Axios instance
 * @returns the vault latest blocks GOT client
 */ export function createVaultLatestBlocksClient(axios) {
    return {
        search: (searchParams)=>axios.request({
                url: VaultLatestBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        list: (searchParams)=>axios.request({
                url: VaultLatestBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        readOne: (searchParams)=>axios.request({
                url: VaultLatestBlockRoutes.v1Search,
                method: 'GET',
                params: new URLSearchParams(uriFy(searchParams))
            }).then((response)=>{
                const { data } = response.data;
                if (!data.length) {
                    throw Error('Not found');
                }
                return data[0];
            })
    };
}

//# sourceMappingURL=vault-latest-blocks-client.lib.js.map