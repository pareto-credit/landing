import { VaultBlockRoutes } from '../vault-block.model';
import { uriFy } from '../../core';
import { stringify } from '../../core/utility.lib';
/**
 * Create vaults client
 * @param axios - The Axios instance
 * @returns the vaults GOT client
 */ export function createVaultBlocksClient(axios) {
    return {
        // Create new Vault
        create: (body)=>axios.request({
                url: VaultBlockRoutes.v1Create,
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        search: (searchParams)=>axios.request({
                url: VaultBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        list: (searchParams)=>axios.request({
                url: VaultBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: VaultBlockRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            }),
        readOne: (searchParams)=>axios.request({
                url: VaultBlockRoutes.v1Search,
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

//# sourceMappingURL=vault-blocks-client.lib.js.map