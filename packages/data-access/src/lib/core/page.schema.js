"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    sPage: function() {
        return sPage;
    },
    sPageSearchQuery: function() {
        return sPageSearchQuery;
    },
    sPageSorting: function() {
        return sPageSorting;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _utilityschema = require("./utility.schema");
function sPage(schema) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('data', schema ? _fluentjsonschema.default.array().items(schema) : _fluentjsonschema.default.array()).description('Paginated elements that match the search parameters.').required().prop('totalCount', _fluentjsonschema.default.integer().minimum(0)).description('Count of total elements that match the search parameters.').required();
}
function sPageSearchQuery(itemFields = [
    '_id'
], sortingFields = [
    '_id'
]) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('_id', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _utilityschema.sStringId)())).description('List of item IDs.').prop('limit', _fluentjsonschema.default.integer().minimum(1).maximum(200).default(50)).description('Number of requested items.').prop('offset', _fluentjsonschema.default.integer().minimum(0)).description('Number of skipped items.').prop('fields', _fluentjsonschema.default.array().items(_fluentjsonschema.default.string().enum(itemFields))).description('Fields to include in the response.').prop('sort', _fluentjsonschema.default.string().enum(sortingFields)).description('The field to use to sort the items.').prop('order', sPageSorting()).description('Sort order of the items.');
}
function sPageSorting() {
    return _fluentjsonschema.default.string().enum([
        'asc',
        'desc'
    ]);
}

//# sourceMappingURL=page.schema.js.map