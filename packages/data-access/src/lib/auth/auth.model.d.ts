export declare enum AuthErrorCodes {
    invalid = "INVALID_CREDENTIALS",
    conflict = "SESSION_CONFLICT",
    authUnexpected = "UNEXPECTED_AUTHORIZATION_HEADER",
    authUnsupported = "UNSUPPORTED_AUTHORIZATION_HEADER",
    notAuthenticated = "NOT_AUTHENTICATED",
    notAuthorized = "NOT_AUTHORIZED",
    userSamePassword = "USER_SAME_PASSWORD",
    userWrongPassword = "USER_WRONG_PASSWORD"
}
export declare enum AuthRoutes {
    authenticate = "auth/authenticate",
    changePassword = "auth/change-password",
    logout = "auth/logout",
    resetPassword = "auth/reset-password",
    signIn = "auth/sign-in"
}
