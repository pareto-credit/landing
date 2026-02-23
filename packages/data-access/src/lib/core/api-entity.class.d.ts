import { Axios } from 'axios';
import { Page } from '../core';
export declare class ApiEntity {
    protected axios: Axios;
    protected defaultLimit: number;
    protected limit: number;
    constructor(axios: Axios);
    /**
     * Create item by body
     * @param url - the url to use
     * @param body - the body to send
     * @returns the promise for create the item
     */
    protected _create<T>(url: string, body: any): Promise<T>;
    /**
     * Search items by params
     * @param url - the url to use
     * @param searchParams - the search params to filter the items
     * @returns the promise for search items
     */
    protected _search<T>(url: string, searchParams?: any): Promise<Page<T>>;
    /**
     * Search ALL items by params
     * @param url - the url to use
     * @param searchParams - the search params to filter the items
     * @returns the promise for search all items
     */
    protected _searchAll<T>(url: string, searchParams?: any): Promise<Page<T>>;
    /**
     * List items by params
     * @param url - the url to use
     * @param searchParams - the search params for items filtering
     * @returns the promise for list items
     */
    protected _list<T>(url: string, searchParams?: any): Promise<T[]>;
    /**
     * List ALL items by params
     * @param url - the url to use
     * @param searchParams - the search params for items filtering
     * @returns the promise for list items
     */
    protected _listAll<T>(url: string, searchParams?: any): Promise<T[]>;
    /**
     * Find one item by search params if exists
     * @param url - the url to use
     * @param searchParams - the search params for item search
     * @returns the promise for find an item
     */
    protected _findOne<T>(url: string, searchParams?: any): Promise<T | undefined>;
    /**
     * Read an item by params. Emit an error otherwise
     * @param url - the url string
     * @param searchParams - the search params to use
     * @returns the promise for read an item
     */
    protected _readOne<T>(url: string, searchParams: any): Promise<T>;
}
