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
    sClientDocument: function() {
        return sClientDocument;
    },
    sClientEntity: function() {
        return sClientEntity;
    },
    sClientFields: function() {
        return sClientFields;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _utilityschema = require("./utility.schema");
function sClientEntity(isPartial) {
    return _fluentjsonschema.default.object().id('#clientEntity').additionalProperties(false).prop('createdAt', (0, _utilityschema.sDateString)()).description('Entity creation date.').prop('createdBy', (0, _utilityschema.sStringId)()).description('The creation subject ID.').prop('updatedAt', (0, _utilityschema.sDateString)()).description('The last-update date.').prop('updatedBy', (0, _utilityschema.sStringId)()).description('The last-update subject ID.').required(isPartial ? [] : [
        'createdAt',
        'updatedAt'
    ]).extend(sClientDocument());
}
function sClientDocument() {
    return _fluentjsonschema.default.object().id('#clientDocument').additionalProperties(false).prop('_id', (0, _utilityschema.sStringId)()).description('Entity ID.').readOnly(true).required().prop('createdAt', (0, _utilityschema.sDateString)()).description('Entity creation date.').prop('createdBy', (0, _utilityschema.sStringId)()).description('The creation subject ID.').prop('updatedAt', (0, _utilityschema.sDateString)()).description('The last-update date.').prop('updatedBy', (0, _utilityschema.sStringId)()).description('The last-update subject ID.');
}
function sClientFields() {
    return _fluentjsonschema.default.string().enum([
        '_id',
        'createdAt',
        'createdBy',
        'updatedAt',
        'updatedBy'
    ]);
}

//# sourceMappingURL=client.schema.js.map