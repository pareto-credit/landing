import { TokenRoutes } from '../token.model';
import { uriFy } from '../../core';
import { stringify } from '../../core/utility.lib';
/**
 * Create tokens client
 * @param axios - The Axios instance
 * @returns the tokens GOT client
 */ export function createTokensClient(axios) {
    return {
        // Create new token
        create: (body)=>axios.request({
                url: TokenRoutes.v1Create,
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        // Search tokens
        search: (searchParams)=>axios.request({
                url: TokenRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        // List tokens
        list: (searchParams)=>axios.request({
                url: TokenRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: TokenRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            }),
        readOne: (searchParams)=>axios.request({
                url: TokenRoutes.v1Search,
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

//# sourceMappingURL=tokens-client.lib.js.map