export function BlockMock(options) {
    return {
        number: (options == null ? void 0 : options.number) || 0,
        timestamp: (options == null ? void 0 : options.timestamp) || 0
    };
}
export function RewardMock(options) {
    return {
        tokenId: (options == null ? void 0 : options.tokenId) || 'TOKEN_ID',
        amount: (options == null ? void 0 : options.amount) || '0',
        amountUSD: (options == null ? void 0 : options.amountUSD) || '0',
        APR: (options == null ? void 0 : options.APR) || 0,
        percentage: (options == null ? void 0 : options.percentage) || 0
    };
}
export function LocalesMock(options) {
    return options || {
        en_EN: ''
    };
}

//# sourceMappingURL=utility.mock.js.map