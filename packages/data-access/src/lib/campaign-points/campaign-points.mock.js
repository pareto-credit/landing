"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CampaignPointMock", {
    enumerable: true,
    get: function() {
        return CampaignPointMock;
    }
});
function CampaignPointMock(options) {
    const now = new Date().toISOString();
    return {
        _id: (options == null ? void 0 : options._id) || 'CAMPAIGN_POINT_ID',
        walletId: (options == null ? void 0 : options.walletId) || 'WALLET_ID',
        walletAddress: (options == null ? void 0 : options.walletAddress) || 'WALLET_ADDRESS',
        campaignId: (options == null ? void 0 : options.campaignId) || 'CAMPAIGN_ID',
        points: (options == null ? void 0 : options.points) || 0,
        perDay: (options == null ? void 0 : options.perDay) || 0,
        createdAt: (options == null ? void 0 : options.createdAt) || now,
        createdBy: (options == null ? void 0 : options.createdBy) || 'USER_ID',
        updatedAt: (options == null ? void 0 : options.updatedAt) || now,
        updatedBy: (options == null ? void 0 : options.updatedBy) || 'USER_ID'
    };
}

//# sourceMappingURL=campaign-points.mock.js.map