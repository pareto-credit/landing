import S from 'fluent-json-schema';
import { sStringId } from './utility.schema';
export function sPage(schema) {
    return S.object().additionalProperties(false).prop('data', schema ? S.array().items(schema) : S.array()).description('Paginated elements that match the search parameters.').required().prop('totalCount', S.integer().minimum(0)).description('Count of total elements that match the search parameters.').required();
}
export function sPageSearchQuery(itemFields = [
    '_id'
], sortingFields = [
    '_id'
]) {
    return S.object().additionalProperties(false).prop('_id', S.array().minItems(1).maxItems(200).items(sStringId())).description('List of item IDs.').prop('limit', S.integer().minimum(1).maximum(200).default(50)).description('Number of requested items.').prop('offset', S.integer().minimum(0)).description('Number of skipped items.').prop('fields', S.array().items(S.string().enum(itemFields))).description('Fields to include in the response.').prop('sort', S.string().enum(sortingFields)).description('The field to use to sort the items.').prop('order', sPageSorting()).description('Sort order of the items.');
}
export function sPageSorting() {
    return S.string().enum([
        'asc',
        'desc'
    ]);
}

//# sourceMappingURL=page.schema.js.map