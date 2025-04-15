import { VaultRoutes } from '../vault.model';
import { uriFy } from '../../core';
import { stringify } from '../../core/utility.lib';
/**
 * Create vaults client
 * @param axios - The Axios instance
 * @returns the vaults GOT client
 */ export function createVaultsClient(axios) {
    return {
        // Create new Vault
        create: (body)=>axios.request({
                url: VaultRoutes.v1Create,
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        search: (searchParams)=>axios.request({
                url: VaultRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>response.data),
        list: (searchParams)=>axios.request({
                url: VaultRoutes.v1Search,
                method: 'GET',
                params: searchParams ? new URLSearchParams(uriFy(searchParams)) : undefined
            }).then((response)=>{
                const page = response.data;
                return page.data;
            }),
        findOne: (searchParams)=>axios.request({
                url: VaultRoutes.v1Search,
                method: 'GET',
                params: new URLSearchParams(uriFy(searchParams))
            }).then((response)=>{
                const page = response.data;
                return page.data ? page.data[0] : undefined;
            }),
        readOne: (searchParams)=>axios.request({
                url: VaultRoutes.v1Search,
                method: 'GET',
                params: new URLSearchParams(uriFy(searchParams))
            }).then((response)=>{
                const { data } = response.data;
                if (!data.length) {
                    throw Error('Not found');
                }
                return data[0];
            }),
        position: (vaultId, searchParams)=>axios.request({
                url: VaultRoutes.v1Position.replace(':vaultId', vaultId),
                method: 'GET',
                params: new URLSearchParams(uriFy(searchParams))
            }).then((response)=>response.data),
        integrations: (vaultId, searchParams)=>axios.request({
                url: VaultRoutes.v1Integrations.replace(':vaultId', vaultId),
                method: 'GET',
                params: new URLSearchParams(uriFy(searchParams))
            }).then((response)=>response.data),
        mint: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Mint.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        redeem: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Redeem.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        transfer: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Transfer.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        rewards: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Rewards.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        epoch: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Epoch.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        sync: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Sync.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        syncBlock: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1SyncBlock.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        block: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Block.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        perform: (vaultId, body)=>axios.request({
                url: VaultRoutes.v1Perform.replace(':vaultId', vaultId),
                method: 'POST',
                data: stringify(body)
            }).then((response)=>response.data),
        cure: (vaultId)=>axios.request({
                url: VaultRoutes.v1Cure.replace(':vaultId', vaultId),
                method: 'POST'
            })
    };
}

//# sourceMappingURL=vaults-client.lib.js.map