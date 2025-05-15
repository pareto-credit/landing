import S from 'fluent-json-schema';
import { sBCAddress, sClientEntity, sHexString, sLocales, sPageSearchQuery } from '../core';
import { SIGNATURES_ROUTES_KEY } from './signature.const';
export function sSignature(isPartial) {
    return S.object().id('#signature').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sSignatureData(isPartial));
}
export function sSignatureData(isPartial) {
    return S.object().additionalProperties(false).prop('code', S.string()).prop('title', sLocales()).prop('description', sLocales()).prop('walletMessage', S.string()).prop('checks', S.array().items(sSignatureCheck())).required(isPartial ? [] : [
        'code',
        'walletMessage'
    ]);
}
export function sSignatureCheck() {
    return S.object().additionalProperties(false).prop('label', sLocales()).required().prop('link', S.string());
}
export const SIGNATURE_FIELDS = [
    '_id',
    'name',
    'message',
    'checks',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export function sSignaturesSearchQuery() {
    return S.object().additionalProperties(false).prop('name').description('Name that must match').extend(sPageSearchQuery(SIGNATURE_FIELDS));
}
export function sSignatureCheckBody() {
    return S.object().additionalProperties(false).prop('walletAddress', sBCAddress()).required();
}
export function sSignatureSignBody() {
    return S.object().additionalProperties(false).prop('walletAddress', sBCAddress()).required().prop('hash', sHexString()).description('Signature hash').required();
}
export var SignatureErrorCodes;
(function(SignatureErrorCodes) {
    SignatureErrorCodes["alreadyExists"] = "SIGNATURE_ALREADY_EXISTS";
    SignatureErrorCodes["notDeletable"] = "SIGNATURE_NOT_DELETABLE";
    SignatureErrorCodes["notExists"] = "SIGNATURE_NOT_EXISTS";
    SignatureErrorCodes["verificationFailed"] = "SIGNATURE_VERIFICATION_FAILED";
})(SignatureErrorCodes || (SignatureErrorCodes = {}));
export var SignatureRoutes;
(function(SignatureRoutes) {
    SignatureRoutes[SignatureRoutes["v1Create"] = `v1/${SIGNATURES_ROUTES_KEY}`] = "v1Create";
    SignatureRoutes[SignatureRoutes["v1Check"] = `v1/${SIGNATURES_ROUTES_KEY}/:signatureId/check`] = "v1Check";
    SignatureRoutes[SignatureRoutes["v1Sign"] = `v1/${SIGNATURES_ROUTES_KEY}/:signatureId/sign`] = "v1Sign";
    SignatureRoutes[SignatureRoutes["v1Delete"] = `v1/${SIGNATURES_ROUTES_KEY}/:signatureId`] = "v1Delete";
    SignatureRoutes[SignatureRoutes["v1Read"] = `v1/${SIGNATURES_ROUTES_KEY}/:signatureId`] = "v1Read";
    SignatureRoutes[SignatureRoutes["v1Update"] = `v1/${SIGNATURES_ROUTES_KEY}/:signatureId`] = "v1Update";
    SignatureRoutes[SignatureRoutes["v1Search"] = `v1/${SIGNATURES_ROUTES_KEY}`] = "v1Search";
})(SignatureRoutes || (SignatureRoutes = {}));

//# sourceMappingURL=signature.model.js.map