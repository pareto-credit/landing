import { WalletRoutes } from '../wallet.model';
import { replaceMany, uriFy } from '../../core';
/**
 * Create wallets client
 * @param axios - The Axios instance
 * @returns the wallets GOT client
 */ export function createWalletsClient(axios) {
    return {
        search: (searchParams)=>axios.request({
                url: WalletRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        list: (searchParams)=>axios.request({
                url: WalletRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: WalletRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            }),
        readOne: (searchParams)=>axios.request({
                url: WalletRoutes.v1Search,
                method: 'GET',
                params: new URLSearchParams(uriFy(searchParams))
            }).then((response)=>{
                const { data } = response.data;
                if (!data.length) {
                    throw Error('Not found');
                }
                return data[0];
            }),
        portfolio: (walletId, params)=>axios.request({
                url: WalletRoutes.v1Portfolio.replace(':walletId', walletId),
                method: 'GET',
                params: new URLSearchParams(uriFy(params))
            }).then((response)=>response.data),
        vaults: (walletId, searchParams)=>axios.request({
                url: replaceMany(WalletRoutes.v1Vaults, {
                    ':walletId': walletId
                }),
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        ensure: (address)=>axios.request({
                url: WalletRoutes.v1Ensure,
                method: 'POST',
                data: {
                    address
                }
            }).then((response)=>response.data),
        user: (walletId, body)=>axios.request({
                url: WalletRoutes.v1User.replace(':walletId', walletId),
                method: 'POST',
                data: body
            }).then((response)=>response.data),
        referral: (walletId, referral)=>axios.request({
                url: WalletRoutes.v1Referral.replace(':walletId', walletId),
                method: 'POST',
                data: {
                    referral
                }
            }).then((response)=>response.data)
    };
}

//# sourceMappingURL=wallets-client.lib.js.map