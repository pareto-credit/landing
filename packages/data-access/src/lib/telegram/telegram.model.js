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
    sTgChatType: function() {
        return sTgChatType;
    },
    sTgEpochAlertOptions: function() {
        return sTgEpochAlertOptions;
    },
    sTgNotification: function() {
        return sTgNotification;
    },
    sTgNotificationData: function() {
        return sTgNotificationData;
    },
    sTgNotificationEvent: function() {
        return sTgNotificationEvent;
    },
    sTgSubscription: function() {
        return sTgSubscription;
    },
    sTgSubscriptionData: function() {
        return sTgSubscriptionData;
    },
    sTgSubscriptionFilters: function() {
        return sTgSubscriptionFilters;
    },
    sTgSubscriptionOptions: function() {
        return sTgSubscriptionOptions;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
function sTgChatType() {
    return _fluentjsonschema.default.string().enum([
        'PRIVATE',
        'GROUP'
    ]);
}
function sTgSubscription(isPartial) {
    return _fluentjsonschema.default.object().id('#tgSubscription').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sTgSubscriptionData(isPartial));
}
function sTgSubscriptionData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tgChatId', _fluentjsonschema.default.string()).prop('tgUserId', _fluentjsonschema.default.string()).prop('type', sTgChatType()).prop('title', _fluentjsonschema.default.string()).prop('username', _fluentjsonschema.default.string()).prop('userId', (0, _core.sStringId)()).prop('walletId', (0, _core.sStringId)()).prop('isVerified', _fluentjsonschema.default.boolean()).prop('filters', sTgSubscriptionFilters()).prop('options', sTgSubscriptionOptions()).prop('isActive', _fluentjsonschema.default.boolean()).required(isPartial ? [] : [
        'tgChatId',
        'filters',
        'isActive'
    ]);
}
function sTgEpochAlertOptions() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('leadMinutes', _fluentjsonschema.default.array().items(_fluentjsonschema.default.number().minimum(1)));
}
function sTgSubscriptionOptions() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('audience', _fluentjsonschema.default.string().enum([
        'LENDER',
        'BORROWER',
        'MANAGER'
    ])).prop('epochAlerts', sTgEpochAlertOptions());
}
function sTgNotificationEvent() {
    return _fluentjsonschema.default.string().enum([
        'EPOCH_END',
        'EPOCH_PRE'
    ]);
}
function sTgNotification(isPartial) {
    return _fluentjsonschema.default.object().id('#tgNotification').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sTgNotificationData(isPartial));
}
function sTgNotificationData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('tgSubscriptionId', (0, _core.sStringId)()).prop('vaultId', (0, _core.sStringId)()).prop('vaultEpochId', (0, _core.sStringId)()).prop('event', sTgNotificationEvent()).prop('leadMinutes', _fluentjsonschema.default.number().minimum(0)).required(isPartial ? [] : [
        'tgSubscriptionId',
        'vaultId',
        'vaultEpochId',
        'event',
        'leadMinutes'
    ]);
}
function sTgSubscriptionFilters() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaultId', _fluentjsonschema.default.array().items((0, _core.sStringId)())).prop('walletId', _fluentjsonschema.default.array().items((0, _core.sStringId)()));
}

//# sourceMappingURL=telegram.model.js.map