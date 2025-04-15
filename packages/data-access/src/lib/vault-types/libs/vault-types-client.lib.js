import { VaultTypeRoutes } from '../vault-type.model';
import { stringify, uriFy } from '../../core';
/**
 * Create vault types client
 * @param axios - The Axios instance
 * @returns the vault type GOT client
 */ export function createVaultTypesClient(axios) {
    return {
        // Create new token
        create: (body)=>axios.request({
                url: VaultTypeRoutes.v1Create,
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        // Search tokens
        search: (searchParams)=>axios.request({
                url: VaultTypeRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        // List tokens
        list: (searchParams)=>axios.request({
                url: VaultTypeRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: VaultTypeRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            })
    };
}

//# sourceMappingURL=vault-types-client.lib.js.map