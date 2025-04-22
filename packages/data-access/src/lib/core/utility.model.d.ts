export type iBigInt = string;
/**
 * Block entity
 */
export interface Block {
    number: number;
    timestamp: number;
}
export type BlockNumber = bigint | number | string;
/**
 * Deep partial definition
 */
export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
/**
 * Locales management
 */
export type Locales<T = string> = {
    [locale: string]: T;
};
/**
 * Meta management
 */
export type MetaContent = {
    [key: string]: Locales<string>;
};
export interface MetaItem {
    title: Locales<string>;
    description?: Locales<string>;
}
export type MetaItems = {
    [key: string]: MetaItem[];
};
/**
 * Reward
 */
export interface Reward {
    tokenId: string;
    amount: iBigInt;
    amountUSD: iBigInt;
    APR: number;
    percentage: number;
}
export type UnitTime = 'seconds' | 'minutes' | 'hours' | 'days' | 'months' | 'years';
export declare function sUnitTime(): import("fluent-json-schema").StringSchema;
export interface Period {
    duration: number;
    unit: UnitTime;
}
