import { uriFy } from '../../core';
import { OperatorRoutes } from '../operator.model';
/**
 * Create operators client
 * @param axios - The Axios instance
 * @returns the operators AXIOS client
 */ export function createOperatorsClient(axios) {
    return {
        // Search operators
        search: (searchParams)=>axios.request({
                url: OperatorRoutes.v1Search,
                method: 'GET',
                responseType: 'json',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        // List operators
        list: (searchParams)=>axios.request({
                url: OperatorRoutes.v1Search,
                method: 'GET',
                responseType: 'json',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: OperatorRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            })
    };
}

//# sourceMappingURL=operators-client.lib.js.map