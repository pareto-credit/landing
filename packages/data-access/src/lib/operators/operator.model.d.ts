import { ClientEntity, Locales, Page, PageSearchQuery } from '../core';
/**
 * Client Chain interface
 */
export interface Operator extends OperatorData, ClientEntity {
}
export declare function sOperator(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export interface OperatorData {
    name: string;
    code: string;
    type: OperatorType;
    description?: Locales<string>;
    shortDescription?: Locales<string>;
    caption?: Locales<string>;
    rating?: string;
    location?: string;
    color?: string;
    links?: OperatorLinks;
}
export declare function sOperatorData(isPartial?: boolean): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export interface OperatorLinks {
    website?: string;
    twitter?: string;
    linkedIn?: string;
    crunchbase?: string;
}
export declare function sOperatorLinks(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export type OperatorType = 'PROTOCOL' | 'BORROWER' | 'CURATOR';
export declare function sOperatorType(): import("fluent-json-schema").StringSchema;
export declare enum OperatorErrorCodes {
    notFound = "OPERATOR_NOT_FOUND",
    notDeletable = "OPERATOR_NOT_DELETABLE"
}
export type OperatorFields = '_id' | 'name' | 'code' | 'type' | 'description' | 'label' | 'rating' | 'location' | 'links' | 'createdAt' | 'createdBy' | 'updatedAt' | 'updatedBy';
export declare const OPERATOR_FIELDS: string[];
export declare const OPERATOR_SORT_FIELDS: string[];
export interface OperatorsSearchQuery extends PageSearchQuery<'name', OperatorFields> {
    name?: string;
    'name:ct'?: string;
    code?: string;
}
export declare function sOperatorsSearchQuery(): import("fluent-json-schema").ExtendedSchema;
export interface OperatorsClientModel {
    search: (params?: OperatorsSearchQuery) => Promise<Page<Operator>>;
    list: (params?: OperatorsSearchQuery) => Promise<Operator[]>;
    findOne: (params?: OperatorsSearchQuery) => Promise<Operator | undefined>;
}
export declare enum OperatorRoutes {
    v1Create = "v1/operators",
    v1Delete = "v1/operators/:operatorId",
    v1Read = "v1/operators/:operatorId",
    v1Update = "v1/operators/:operatorId",
    v1Search = "v1/operators"
}
