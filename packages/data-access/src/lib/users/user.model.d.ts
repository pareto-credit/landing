import { ClientEntity, Page, PageSearchQuery } from '../core';
/**
 * Client Vault interface
 */
export interface User extends UserData, ClientEntity {
}
export declare function sUser(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface UserData {
    name: string;
    email?: string;
    telegram?: UserTelegram;
    credentials?: UserCredentials;
}
export declare function sUserData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface UserTelegram {
    userId: number;
    username?: string;
}
export declare function sUserTelegram(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface UserCredentials {
    username: string;
    password: string;
}
export declare function sUserCredentials(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare enum UserErrorCodes {
    userCollision = "USER_COLLISION",
    notFound = "USER_NOT_FOUND",
    notDeletable = "USER_NOT_DELETABLE",
    samePassword = "USER_SAME_PASSWORD",
    wrongPassword = "USER_WRONG_PASSWORD"
}
export type UserFields = '_id' | 'name' | 'email' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const USER_FIELDS: string[];
export declare const USER_SORT_FIELDS: string[];
export declare enum UserRoutes {
    v1Create = "v1/users",
    v1Delete = "v1/users/:userId",
    v1Read = "v1/users/:userId",
    v1Update = "v1/users/:userId",
    v1Search = "v1/users",
    v1ChangePassword = "v1/users/:userId/change-password"
}
export interface UsersSearchQuery extends PageSearchQuery<'name', UserFields> {
    name?: string;
    'name:ct'?: string;
    email?: string;
}
export declare function sUsersSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface UsersClientModel {
    findOne: (params?: UsersSearchQuery) => Promise<User | undefined>;
    search: (params?: UsersSearchQuery) => Promise<Page<User>>;
    list: (params?: UsersSearchQuery) => Promise<User[]>;
}
