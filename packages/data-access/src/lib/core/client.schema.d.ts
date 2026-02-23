export declare function sClientEntity(isPartial?: boolean): import("fluent-json-schema").ExtendedSchema;
export declare function sClientDocument(): import("fluent-json-schema").ObjectSchema<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
}>;
export declare function sClientFields(): import("fluent-json-schema").StringSchema;
