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
    ACCESS_TOKENS_ROUTES_KEY: function() {
        return ACCESS_TOKENS_ROUTES_KEY;
    },
    AccessTokenRoutes: function() {
        return AccessTokenRoutes;
    },
    sAccessToken: function() {
        return sAccessToken;
    },
    sAccessTokenData: function() {
        return sAccessTokenData;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
function sAccessToken() {
    return _fluentjsonschema.default.object().id('#accessToken').additionalProperties(false).prop('_id', (0, _core.sStringId)()).description('Access Token ID.').required().prop('createdAt', (0, _core.sDateString)()).description('Access Token creation date.').required().prop('createdBy', (0, _core.sStringId)()).description('The IDentifier of the creation subject.').required().extend(sAccessTokenData());
}
function sAccessTokenData() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('signature', _fluentjsonschema.default.string()).required().prop('permission', _fluentjsonschema.default.string().enum([
        'READ',
        'WRITE'
    ])).required().prop('userId', (0, _core.sStringId)()).prop('expirationDate', (0, _core.sDateString)());
}
const ACCESS_TOKENS_ROUTES_KEY = 'access-tokens';
var AccessTokenRoutes;
(function(AccessTokenRoutes) {
    AccessTokenRoutes[AccessTokenRoutes["v1Create"] = `v1/${ACCESS_TOKENS_ROUTES_KEY}`] = "v1Create";
    AccessTokenRoutes[AccessTokenRoutes["v1Delete"] = `v1/${ACCESS_TOKENS_ROUTES_KEY}/:accessTokenId`] = "v1Delete";
})(AccessTokenRoutes || (AccessTokenRoutes = {}));

//# sourceMappingURL=access-token.model.js.map