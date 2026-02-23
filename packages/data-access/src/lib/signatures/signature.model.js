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
    SIGNATURE_FIELDS: function() {
        return SIGNATURE_FIELDS;
    },
    SignatureErrorCodes: function() {
        return SignatureErrorCodes;
    },
    SignatureRoutes: function() {
        return SignatureRoutes;
    },
    sSignature: function() {
        return sSignature;
    },
    sSignatureCheck: function() {
        return sSignatureCheck;
    },
    sSignatureCheckBody: function() {
        return sSignatureCheckBody;
    },
    sSignatureData: function() {
        return sSignatureData;
    },
    sSignatureSignBody: function() {
        return sSignatureSignBody;
    },
    sSignaturesSearchQuery: function() {
        return sSignaturesSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _signatureconst = require("./signature.const");
function sSignature(isPartial) {
    return _fluentjsonschema.default.object().id('#signature').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sSignatureData(isPartial));
}
function sSignatureData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).prop('title', (0, _core.sLocales)()).prop('description', (0, _core.sLocales)()).prop('walletMessage', _fluentjsonschema.default.string()).prop('checks', _fluentjsonschema.default.array().items(sSignatureCheck())).required(isPartial ? [] : [
        'code',
        'walletMessage'
    ]);
}
function sSignatureCheck() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('label', (0, _core.sLocales)()).required().prop('link', _fluentjsonschema.default.string());
}
const SIGNATURE_FIELDS = [
    '_id',
    'name',
    'message',
    'checks',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
function sSignaturesSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name').description('Name that must match').extend((0, _core.sPageSearchQuery)(SIGNATURE_FIELDS));
}
function sSignatureCheckBody() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletAddress', (0, _core.sBCAddress)()).required();
}
function sSignatureSignBody() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletAddress', (0, _core.sBCAddress)()).required().prop('hash', (0, _core.sHexString)()).description('Signature hash').required();
}
var SignatureErrorCodes;
(function(SignatureErrorCodes) {
    SignatureErrorCodes["alreadyExists"] = "SIGNATURE_ALREADY_EXISTS";
    SignatureErrorCodes["notDeletable"] = "SIGNATURE_NOT_DELETABLE";
    SignatureErrorCodes["notExists"] = "SIGNATURE_NOT_EXISTS";
    SignatureErrorCodes["verificationFailed"] = "SIGNATURE_VERIFICATION_FAILED";
})(SignatureErrorCodes || (SignatureErrorCodes = {}));
var SignatureRoutes;
(function(SignatureRoutes) {
    SignatureRoutes[SignatureRoutes["v1Create"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}`] = "v1Create";
    SignatureRoutes[SignatureRoutes["v1Check"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}/:signatureId/check`] = "v1Check";
    SignatureRoutes[SignatureRoutes["v1Sign"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}/:signatureId/sign`] = "v1Sign";
    SignatureRoutes[SignatureRoutes["v1Delete"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}/:signatureId`] = "v1Delete";
    SignatureRoutes[SignatureRoutes["v1Read"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}/:signatureId`] = "v1Read";
    SignatureRoutes[SignatureRoutes["v1Update"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}/:signatureId`] = "v1Update";
    SignatureRoutes[SignatureRoutes["v1Search"] = `v1/${_signatureconst.SIGNATURES_ROUTES_KEY}`] = "v1Search";
})(SignatureRoutes || (SignatureRoutes = {}));

//# sourceMappingURL=signature.model.js.map