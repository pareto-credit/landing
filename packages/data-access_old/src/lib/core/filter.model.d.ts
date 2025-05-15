export type FilterOperator = 'eq' | 'gt' | 'gte' | 'lt' | 'lte' | 'neq' | 'ex' | 'nex' | 'inc';
export interface FilterValue<T = string> {
    id: T;
    value: string;
}
