"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationsRoutingKey", {
    enumerable: true,
    get: function() {
        return NotificationsRoutingKey;
    }
});
var NotificationsRoutingKey;
(function(NotificationsRoutingKey) {
    NotificationsRoutingKey["all"] = "notify.*";
    // Vault Epochs
    NotificationsRoutingKey["vaultEpoch"] = "notify.vaultEpoch";
    // Vault Requests
    NotificationsRoutingKey["vaultRequest"] = "notify.vaultRequest";
    // Wallet Transactions
    NotificationsRoutingKey["walletTransaction"] = "notify.walletTransaction";
})(NotificationsRoutingKey || (NotificationsRoutingKey = {}));

//# sourceMappingURL=notification.model.js.map