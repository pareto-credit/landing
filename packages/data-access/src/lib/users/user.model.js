import S from 'fluent-json-schema';
import { sClientEntity, sEmail, sPageSearchQuery } from '../core';
import { USERS_ROUTES_KEY } from './user.const';
export function sUser(isPartial) {
    return S.object().id('#user').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sUserData(isPartial));
}
export function sUserData(isPartial) {
    return S.object().additionalProperties(false).prop('name', S.string()).prop('email', sEmail()).prop('telegram', S.string()).prop('credentials', sUserCredentials()).required(isPartial ? [] : [
        'name'
    ]);
}
export function sUserCredentials() {
    return S.object().additionalProperties(false).prop('username', S.string()).required().prop('password', S.string()).required();
}
export var UserErrorCodes;
(function(UserErrorCodes) {
    UserErrorCodes["userCollision"] = "USER_COLLISION";
    UserErrorCodes["notFound"] = "USER_NOT_FOUND";
    UserErrorCodes["notDeletable"] = "USER_NOT_DELETABLE";
    UserErrorCodes["samePassword"] = "USER_SAME_PASSWORD";
    UserErrorCodes["wrongPassword"] = "USER_WRONG_PASSWORD";
})(UserErrorCodes || (UserErrorCodes = {}));
export const USER_FIELDS = [
    '_id',
    'name',
    'email',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
export const USER_SORT_FIELDS = [
    '_id',
    'name'
];
export var UserRoutes;
(function(UserRoutes) {
    UserRoutes[UserRoutes["v1Create"] = `v1/${USERS_ROUTES_KEY}`] = "v1Create";
    UserRoutes[UserRoutes["v1Delete"] = `v1/${USERS_ROUTES_KEY}/:userId`] = "v1Delete";
    UserRoutes[UserRoutes["v1Read"] = `v1/${USERS_ROUTES_KEY}/:userId`] = "v1Read";
    UserRoutes[UserRoutes["v1Update"] = `v1/${USERS_ROUTES_KEY}/:userId`] = "v1Update";
    UserRoutes[UserRoutes["v1Search"] = `v1/${USERS_ROUTES_KEY}`] = "v1Search";
    UserRoutes[UserRoutes["v1ChangePassword"] = `v1/${USERS_ROUTES_KEY}/:userId/change-password`] = "v1ChangePassword";
})(UserRoutes || (UserRoutes = {}));
export function sUsersSearchQuery() {
    return S.object().additionalProperties(false).prop('name', S.string()).description('Name of the user that must match.').prop('name:ct', S.string()).description('Name of the user that must be contained.').prop('email', sEmail()).description('Email of the user that must match.').extend(sPageSearchQuery(USER_FIELDS, USER_SORT_FIELDS));
}

//# sourceMappingURL=user.model.js.map