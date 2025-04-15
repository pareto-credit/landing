import { AUTH_ROUTES_KEY } from './auth.const';
export var AuthErrorCodes;
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
export var AuthRoutes;
(function(AuthRoutes) {
    AuthRoutes[AuthRoutes["authenticate"] = `${AUTH_ROUTES_KEY}/authenticate`] = "authenticate";
    AuthRoutes[AuthRoutes["changePassword"] = `${AUTH_ROUTES_KEY}/change-password`] = "changePassword";
    AuthRoutes[AuthRoutes["logout"] = `${AUTH_ROUTES_KEY}/logout`] = "logout";
    AuthRoutes[AuthRoutes["resetPassword"] = `${AUTH_ROUTES_KEY}/reset-password`] = "resetPassword";
    AuthRoutes[AuthRoutes["signIn"] = `${AUTH_ROUTES_KEY}/sign-in`] = "signIn";
})(AuthRoutes || (AuthRoutes = {}));

//# sourceMappingURL=auth.model.js.map