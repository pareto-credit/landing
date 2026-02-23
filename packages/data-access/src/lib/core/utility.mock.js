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
    BlockMock: function() {
        return BlockMock;
    },
    LocalesMock: function() {
        return LocalesMock;
    },
    RewardMock: function() {
        return RewardMock;
    }
});
function BlockMock(options) {
    return {
        number: (options == null ? void 0 : options.number) || 0,
        timestamp: (options == null ? void 0 : options.timestamp) || 0
    };
}
function RewardMock(options) {
    return {
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        amount: (options == null ? void 0 : options.amount) || '0',
        amountUSD: (options == null ? void 0 : options.amountUSD) || '0',
        APR: (options == null ? void 0 : options.APR) || 0,
        percentage: (options == null ? void 0 : options.percentage) || 0
    };
}
function LocalesMock(options) {
    return options || {
        en: 'TEXT'
    };
}

//# sourceMappingURL=utility.mock.js.map