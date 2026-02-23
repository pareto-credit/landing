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
    USER_FIELDS: function() {
        return USER_FIELDS;
    },
    USER_SORT_FIELDS: function() {
        return USER_SORT_FIELDS;
    },
    UserErrorCodes: function() {
        return UserErrorCodes;
    },
    UserRoutes: function() {
        return UserRoutes;
    },
    sUser: function() {
        return sUser;
    },
    sUserCredentials: function() {
        return sUserCredentials;
    },
    sUserData: function() {
        return sUserData;
    },
    sUserTelegram: function() {
        return sUserTelegram;
    },
    sUsersSearchQuery: function() {
        return sUsersSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _userconst = require("./user.const");
function sUser(isPartial) {
    return _fluentjsonschema.default.object().id('#user').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sUserData(isPartial));
}
function sUserData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).prop('email', (0, _core.sEmail)()).prop('telegram', sUserTelegram()).prop('credentials', sUserCredentials()).required(isPartial ? [] : [
        'name'
    ]);
}
function sUserTelegram() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('userId', _fluentjsonschema.default.number()).required().prop('username', _fluentjsonschema.default.string());
}
function sUserCredentials() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('username', _fluentjsonschema.default.string()).required().prop('password', _fluentjsonschema.default.string()).required();
}
var UserErrorCodes;
(function(UserErrorCodes) {
    UserErrorCodes["userCollision"] = "USER_COLLISION";
    UserErrorCodes["notFound"] = "USER_NOT_FOUND";
    UserErrorCodes["notDeletable"] = "USER_NOT_DELETABLE";
    UserErrorCodes["samePassword"] = "USER_SAME_PASSWORD";
    UserErrorCodes["wrongPassword"] = "USER_WRONG_PASSWORD";
})(UserErrorCodes || (UserErrorCodes = {}));
const USER_FIELDS = [
    '_id',
    'name',
    'email',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const USER_SORT_FIELDS = [
    '_id',
    'name'
];
var UserRoutes;
(function(UserRoutes) {
    UserRoutes[UserRoutes["v1Create"] = `v1/${_userconst.USERS_ROUTES_KEY}`] = "v1Create";
    UserRoutes[UserRoutes["v1Delete"] = `v1/${_userconst.USERS_ROUTES_KEY}/:userId`] = "v1Delete";
    UserRoutes[UserRoutes["v1Read"] = `v1/${_userconst.USERS_ROUTES_KEY}/:userId`] = "v1Read";
    UserRoutes[UserRoutes["v1Update"] = `v1/${_userconst.USERS_ROUTES_KEY}/:userId`] = "v1Update";
    UserRoutes[UserRoutes["v1Search"] = `v1/${_userconst.USERS_ROUTES_KEY}`] = "v1Search";
    UserRoutes[UserRoutes["v1ChangePassword"] = `v1/${_userconst.USERS_ROUTES_KEY}/:userId/change-password`] = "v1ChangePassword";
})(UserRoutes || (UserRoutes = {}));
function sUsersSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('name', _fluentjsonschema.default.string()).description('Name of the user that must match.').prop('name:ct', _fluentjsonschema.default.string()).description('Name of the user that must be contained.').prop('email', (0, _core.sEmail)()).description('Email of the user that must match.').extend((0, _core.sPageSearchQuery)(USER_FIELDS, USER_SORT_FIELDS));
}

//# sourceMappingURL=user.model.js.map