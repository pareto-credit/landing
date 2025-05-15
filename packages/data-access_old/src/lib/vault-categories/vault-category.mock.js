import { LocalesMock } from '../core';
/**
 * Vault Type Mock
 */ export function VaultCategoryMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'VAULT_CATEGORY_ID',
        code: (options == null ? void 0 : options.code) || 'VAULT_CATEGORY_CODE',
        name: LocalesMock(options == null ? void 0 : options.name),
        description: LocalesMock(options == null ? void 0 : options.description),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=vault-category.mock.js.map