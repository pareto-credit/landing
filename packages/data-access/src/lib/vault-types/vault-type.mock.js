"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "VaultTypeMock", {
    enumerable: true,
    get: function() {
        return VaultTypeMock;
    }
});
const _core = require("../core");
function VaultTypeMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_TYPE_ID',
        code: (options == null ? void 0 : options.code) || 'VAULT_TYPE_CODE',
        name: (0, _core.LocalesMock)(options == null ? void 0 : options.name),
        description: (0, _core.LocalesMock)(options == null ? void 0 : options.description),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=vault-type.mock.js.map