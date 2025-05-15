/**
 * Access Token Mock
 */ export function AccessTokenMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'ACCESS_TOKEN_ID',
        signature: (options == null ? void 0 : options.signature) || 'ACCESS_TOKEN_SIGNATURE',
        permission: (options == null ? void 0 : options.permission) || 'READ',
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID'
    };
}

//# sourceMappingURL=access-token.mock.js.map