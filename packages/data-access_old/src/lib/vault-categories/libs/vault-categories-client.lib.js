import { VaultCategoryRoutes } from '../vault-category.model';
import { stringify, uriFy } from '../../core';
/**
 * Create vault categories client
 * @param axios - The Axios instance
 * @returns the vault category GOT client
 */ export function createVaultCategoriesClient(axios) {
    return {
        // Create new token
        create: (body)=>axios.request({
                url: VaultCategoryRoutes.v1Create,
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        // Search tokens
        search: (searchParams)=>axios.request({
                url: VaultCategoryRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        // List tokens
        list: (searchParams)=>axios.request({
                url: VaultCategoryRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: VaultCategoryRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            })
    };
}

//# sourceMappingURL=vault-categories-client.lib.js.map