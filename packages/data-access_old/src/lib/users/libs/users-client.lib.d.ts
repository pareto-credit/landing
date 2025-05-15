import { Axios } from 'axios';
import { ApiEntity } from '../../core';
import { User, UsersClientModel, UsersSearchQuery } from '../user.model';
export declare class UsersClient extends ApiEntity implements UsersClientModel {
    constructor(axios: Axios);
    /**
     * Search users by params
     * @param searchParams - the users search params
     * @returns the promise for search users
     */
    search(searchParams?: UsersSearchQuery): Promise<import("../../core").Page<User>>;
    /**
     * List users by params
     * @param searchParams - the users search params
     * @returns the promise for search users
     */
    list(searchParams?: UsersSearchQuery): Promise<User[]>;
    /**
     * Find a user by params
     * @param searchParams - the search params
     * @returns the promise for find a user
     */
    findOne(searchParams?: UsersSearchQuery): Promise<User | undefined>;
}
