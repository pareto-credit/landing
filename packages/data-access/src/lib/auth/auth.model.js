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
    AuthErrorCodes: function() {
        return AuthErrorCodes;
    },
    AuthRoutes: function() {
        return AuthRoutes;
    }
});
const _authconst = require("./auth.const");
var AuthErrorCodes;
(function(AuthErrorCodes) {
    AuthErrorCodes["invalid"] = "INVALID_CREDENTIALS";
    AuthErrorCodes["conflict"] = "SESSION_CONFLICT";
    AuthErrorCodes["authUnexpected"] = "UNEXPECTED_AUTHORIZATION_HEADER";
    AuthErrorCodes["authUnsupported"] = "UNSUPPORTED_AUTHORIZATION_HEADER";
    AuthErrorCodes["notAuthenticated"] = "NOT_AUTHENTICATED";
    AuthErrorCodes["notAuthorized"] = "NOT_AUTHORIZED";
    AuthErrorCodes["userSamePassword"] = "USER_SAME_PASSWORD";
    AuthErrorCodes["userWrongPassword"] = "USER_WRONG_PASSWORD";
})(AuthErrorCodes || (AuthErrorCodes = {}));
var AuthRoutes;
(function(AuthRoutes) {
    AuthRoutes[AuthRoutes["authenticate"] = `${_authconst.AUTH_ROUTES_KEY}/authenticate`] = "authenticate";
    AuthRoutes[AuthRoutes["changePassword"] = `${_authconst.AUTH_ROUTES_KEY}/change-password`] = "changePassword";
    AuthRoutes[AuthRoutes["logout"] = `${_authconst.AUTH_ROUTES_KEY}/logout`] = "logout";
    AuthRoutes[AuthRoutes["resetPassword"] = `${_authconst.AUTH_ROUTES_KEY}/reset-password`] = "resetPassword";
    AuthRoutes[AuthRoutes["signIn"] = `${_authconst.AUTH_ROUTES_KEY}/sign-in`] = "signIn";
})(AuthRoutes || (AuthRoutes = {}));

//# sourceMappingURL=auth.model.js.map