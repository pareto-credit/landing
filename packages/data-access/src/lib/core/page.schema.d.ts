import { JSONSchema } from 'fluent-json-schema';
export declare function sPage(schema?: JSONSchema): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sPageSearchQuery(itemFields?: string[], sortingFields?: string[]): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sPageSorting(): import("fluent-json-schema").StringSchema;
