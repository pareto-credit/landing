"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserMock", {
    enumerable: true,
    get: function() {
        return UserMock;
    }
});
function UserMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'USER_ID',
        name: (options == null ? void 0 : options.name) || 'USER_NAME',
        email: options == null ? void 0 : options.email,
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=user.mock.js.map