export interface Page<T> {
    /**
     * Paginated documents.
     */
    data: T[];
    /**
     * Number of documents that match the requested filter.
     */
    totalCount: number;
}
export interface PageSearchQuery<SortingFieldType = '_id', ItemField = string> {
    _id?: string | string[];
    limit?: number;
    offset?: number;
    sort?: SortingFieldType;
    order?: PageSorting;
    fields?: ItemField[];
}
export type PageSorting = 'asc' | 'desc';
export interface PageOptions {
    /**
     * List of projected fields and/or fields to exclude ($project stage).
     * This field is used only when `projection` options is not specified.
     */
    fields?: string[];
    excludeFields?: string[];
    /**
     * MongoDB aggregation's $project stage.
     */
    projection?: object;
    /**
     * MongoDB aggregation's $limit stage.
     */
    limit?: number;
    /**
     * MongoDB aggregation's $skip stage.
     */
    offset?: number;
    /**
     * This field is used only when sort is not an object.
     */
    order?: 1 | -1;
    /**
     * Can be the $sort stage or the sort field.
     */
    sort?: string | object;
    /**
     * Perform a text search with Altas Search.
     */
    text?: string;
    /**
     * Atlas Search text index's name.
     * @default "text_search"
     */
    textIndex?: string;
    /**
     * Do not perform the documents count aggregation.
     */
    skipCount?: boolean;
}
export interface PaginationOffset {
    limit: number;
    offset: number;
}
