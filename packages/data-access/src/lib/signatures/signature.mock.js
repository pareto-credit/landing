"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SignatureMock", {
    enumerable: true,
    get: function() {
        return SignatureMock;
    }
});
function SignatureMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'SIGNATURE_ID',
        code: (options == null ? void 0 : options.code) || 'SIGNATURE_CODE',
        walletMessage: (options == null ? void 0 : options.walletMessage) || 'SIGNATURE_MESSAGE',
        checks: (options == null ? void 0 : options.checks) || [],
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=signature.mock.js.map