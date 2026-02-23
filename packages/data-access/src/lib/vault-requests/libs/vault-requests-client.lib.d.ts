import { Axios } from 'axios';
import { VaultRequest, VaultRequestsClientModel, VaultRequestsSearchQuery } from '../vault-request.model';
import { ApiEntity } from '../../core';
export declare class VaultRequestsClient extends ApiEntity implements VaultRequestsClientModel {
    constructor(axios: Axios);
    search(searchParams?: VaultRequestsSearchQuery): Promise<import("../../core").Page<VaultRequest>>;
    searchAll(searchParams?: VaultRequestsSearchQuery): Promise<import("../../core").Page<VaultRequest>>;
    list(searchParams?: VaultRequestsSearchQuery): Promise<VaultRequest[]>;
    listAll(searchParams?: VaultRequestsSearchQuery): Promise<VaultRequest[]>;
    findOne(searchParams?: VaultRequestsSearchQuery): Promise<VaultRequest | undefined>;
    readOne(searchParams: VaultRequestsSearchQuery): Promise<VaultRequest>;
}
