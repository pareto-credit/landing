import S from 'fluent-json-schema';
/**
 * MongoDB ObjectId schema
 */
export declare function sObjectId(): S;
/**
 * MongoDB Date schema schema
 */
export declare function sDate(): S;
/**
 * Email format
 */
export declare function sEmail(): import("fluent-json-schema").StringSchema;
/**
 * MongoDB ObjectId string format schema
 */
export declare function sStringId(): import("fluent-json-schema").StringSchema;
/**
 * Percentage value
 */
export declare function sPercentage(): import("fluent-json-schema").NumberSchema;
/**
 * Date ISO String schema
 */
export declare function sDateString(): import("fluent-json-schema").StringSchema;
/**
 * BlockChain Address schema
 */
export declare function sBCAddress(): import("fluent-json-schema").StringSchema;
/**
 * BlockChain Hash schema
 */
export declare function sBCHash(): import("fluent-json-schema").StringSchema;
/**
 * BlockChain Hex schema
 */
export declare function sHexString(): import("fluent-json-schema").StringSchema;
/**
 * Block schema
 */
export declare function sBlock(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
/**
 * Reward schema
 */
export declare function sReward(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
/**
 * All printable ASCII chars, minus the "DEL" char.
 */
export declare function sPrintableASCII(): import("fluent-json-schema").StringSchema;
/**
 * Password schema
 */
export declare function sPassword(): import("fluent-json-schema").StringSchema;
/**
 * BigInt schema
 */
export declare function sBigInt(): import("fluent-json-schema").StringSchema;
/**
 * Locales management
 */
export declare function sLocales(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
/**
 * Meta data
 */
export declare function sMetaContent(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sMetaItem(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sMetaItems(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
