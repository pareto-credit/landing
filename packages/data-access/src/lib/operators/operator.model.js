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
    OPERATOR_FIELDS: function() {
        return OPERATOR_FIELDS;
    },
    OPERATOR_SORT_FIELDS: function() {
        return OPERATOR_SORT_FIELDS;
    },
    OperatorErrorCodes: function() {
        return OperatorErrorCodes;
    },
    OperatorRoutes: function() {
        return OperatorRoutes;
    },
    sOperator: function() {
        return sOperator;
    },
    sOperatorData: function() {
        return sOperatorData;
    },
    sOperatorLinks: function() {
        return sOperatorLinks;
    },
    sOperatorType: function() {
        return sOperatorType;
    },
    sOperatorsSearchQuery: function() {
        return sOperatorsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _operatorconst = require("./operator.const");
function sOperator(isPartial) {
    return _fluentjsonschema.default.object().id('#operator').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sOperatorData(isPartial));
}
function sOperatorData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('The name of the operator.').prop('code', _fluentjsonschema.default.string()).description('The unique code of the operator.').prop('type', sOperatorType()).description('The operator type.').prop('description', (0, _core.sLocales)()).description('The operator description').prop('shortDescription', (0, _core.sLocales)()).description('The operator short description').prop('caption', (0, _core.sLocales)()).description('A short label about the operator').prop('rating', _fluentjsonschema.default.string()).description('The operator rating').prop('location', _fluentjsonschema.default.string()).description('The operator location').prop('color', _fluentjsonschema.default.string()).description('The operator main color').prop('links', sOperatorLinks()).description('Links about operator').required(isPartial ? [] : [
        'name',
        'code',
        'type'
    ]);
}
function sOperatorLinks() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('website', _fluentjsonschema.default.string()).prop('twitter', _fluentjsonschema.default.string()).prop('linkedIn', _fluentjsonschema.default.string()).prop('crunchbase', _fluentjsonschema.default.string());
}
function sOperatorType() {
    return _fluentjsonschema.default.string().enum([
        'PROTOCOL',
        'BORROWER',
        'CURATOR'
    ]);
}
var OperatorErrorCodes;
(function(OperatorErrorCodes) {
    OperatorErrorCodes["notFound"] = "OPERATOR_NOT_FOUND";
    OperatorErrorCodes["notDeletable"] = "OPERATOR_NOT_DELETABLE";
})(OperatorErrorCodes || (OperatorErrorCodes = {}));
const OPERATOR_FIELDS = [
    '_id',
    'name',
    'code',
    'type',
    'description',
    'label',
    'rating',
    'location',
    'links',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const OPERATOR_SORT_FIELDS = [
    '_id',
    'name'
];
function sOperatorsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('Name of the operator that must match.').prop('name:ct', _fluentjsonschema.default.string()).description('Name of the operator that must be contained.').prop('code', _fluentjsonschema.default.string()).description('Code of the operator that must match.').extend((0, _core.sPageSearchQuery)(OPERATOR_FIELDS, OPERATOR_SORT_FIELDS));
}
var OperatorRoutes;
(function(OperatorRoutes) {
    OperatorRoutes[OperatorRoutes["v1Create"] = `v1/${_operatorconst.OPERATORS_ROUTES_KEY}`] = "v1Create";
    OperatorRoutes[OperatorRoutes["v1Delete"] = `v1/${_operatorconst.OPERATORS_ROUTES_KEY}/:operatorId`] = "v1Delete";
    OperatorRoutes[OperatorRoutes["v1Read"] = `v1/${_operatorconst.OPERATORS_ROUTES_KEY}/:operatorId`] = "v1Read";
    OperatorRoutes[OperatorRoutes["v1Update"] = `v1/${_operatorconst.OPERATORS_ROUTES_KEY}/:operatorId`] = "v1Update";
    OperatorRoutes[OperatorRoutes["v1Search"] = `v1/${_operatorconst.OPERATORS_ROUTES_KEY}`] = "v1Search";
})(OperatorRoutes || (OperatorRoutes = {}));

//# sourceMappingURL=operator.model.js.map