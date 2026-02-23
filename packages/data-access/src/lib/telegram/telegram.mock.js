"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TgSubscriptionMock", {
    enumerable: true,
    get: function() {
        return TgSubscriptionMock;
    }
});
function TgSubscriptionMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'TG_SUBSCRIPTION_ID',
        tgChatId: (options == null ? void 0 : options.tgChatId) || 'TG_CHAT_ID',
        tgUserId: options == null ? void 0 : options.tgUserId,
        type: options == null ? void 0 : options.type,
        title: options == null ? void 0 : options.title,
        username: (options == null ? void 0 : options.username) || 'TG_USERNAME',
        userId: options == null ? void 0 : options.userId,
        walletId: options == null ? void 0 : options.walletId,
        isVerified: options == null ? void 0 : options.isVerified,
        filters: (options == null ? void 0 : options.filters) || {},
        options: options == null ? void 0 : options.options,
        isActive: !!(options == null ? void 0 : options.isActive),
        createdAt: now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=telegram.mock.js.map