import S from 'fluent-json-schema';
import { sClientEntity, sLocales, sPageSearchQuery } from '../core';
import { OPERATORS_ROUTES_KEY } from './operator.const';
export function sOperator(isPartial) {
    return S.object().id('#operator').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sOperatorData(isPartial));
}
export function sOperatorData(isPartial) {
    return S.object().additionalProperties(false).prop('name', S.string()).description('The name of the operator.').prop('code', S.string()).description('The unique code of the operator.').prop('type', sOperatorType()).description('The operator type.').prop('description', sLocales()).description('The operator description').prop('shortDescription', sLocales()).description('The operator short description').prop('caption', sLocales()).description('A short label about the operator').prop('rating', S.string()).description('The operator rating').prop('location', S.string()).description('The operator location').prop('color', S.string()).description('The operator main color').prop('links', sOperatorLinks()).description('Links about operator').required(isPartial ? [] : [
        'name',
        'code',
        'type'
    ]);
}
export function sOperatorLinks() {
    return S.object().additionalProperties(false).prop('website', S.string()).prop('twitter', S.string()).prop('linkedIn', S.string()).prop('crunchbase', S.string());
}
export function sOperatorType() {
    return S.string().enum([
        'PROTOCOL',
        'BORROWER',
        'CURATOR'
    ]);
}
export var OperatorErrorCodes;
(function(OperatorErrorCodes) {
    OperatorErrorCodes["notFound"] = "OPERATOR_NOT_FOUND";
    OperatorErrorCodes["notDeletable"] = "OPERATOR_NOT_DELETABLE";
})(OperatorErrorCodes || (OperatorErrorCodes = {}));
export const OPERATOR_FIELDS = [
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
export const OPERATOR_SORT_FIELDS = [
    '_id',
    'name'
];
export function sOperatorsSearchQuery() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('Name of the operator that must match.').prop('name:ct', S.string()).description('Name of the operator that must be contained.').prop('code', S.string()).description('Code of the operator that must match.').extend(sPageSearchQuery(OPERATOR_FIELDS, OPERATOR_SORT_FIELDS));
}
export var OperatorRoutes;
(function(OperatorRoutes) {
    OperatorRoutes[OperatorRoutes["v1Create"] = `v1/${OPERATORS_ROUTES_KEY}`] = "v1Create";
    OperatorRoutes[OperatorRoutes["v1Delete"] = `v1/${OPERATORS_ROUTES_KEY}/:operatorId`] = "v1Delete";
    OperatorRoutes[OperatorRoutes["v1Read"] = `v1/${OPERATORS_ROUTES_KEY}/:operatorId`] = "v1Read";
    OperatorRoutes[OperatorRoutes["v1Update"] = `v1/${OPERATORS_ROUTES_KEY}/:operatorId`] = "v1Update";
    OperatorRoutes[OperatorRoutes["v1Search"] = `v1/${OPERATORS_ROUTES_KEY}`] = "v1Search";
})(OperatorRoutes || (OperatorRoutes = {}));

//# sourceMappingURL=operator.model.js.map