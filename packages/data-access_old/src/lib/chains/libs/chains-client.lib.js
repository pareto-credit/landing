import { ChainRoutes } from '../chain.model';
import { uriFy } from '../../core';
/**
 * Create chains client
 * @param axios - The Axios instance
 * @returns the chains AXIOS client
 */ export function createChainsClient(axios) {
    return {
        // Search chains
        search: (searchParams)=>axios.request({
                url: ChainRoutes.v1Search,
                method: 'GET',
                responseType: 'json',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        // List chains
        list: (searchParams)=>axios.request({
                url: ChainRoutes.v1Search,
                method: 'GET',
                responseType: 'json',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: ChainRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            }),
        readOne: (searchParams)=>axios.request({
                url: ChainRoutes.v1Search,
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

//# sourceMappingURL=chains-client.lib.js.map