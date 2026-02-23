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
    CAMPAIGN_POINT_FIELDS: function() {
        return CAMPAIGN_POINT_FIELDS;
    },
    CAMPAIGN_POINT_SORT_FIELDS: function() {
        return CAMPAIGN_POINT_SORT_FIELDS;
    },
    CampaignPointRoutes: function() {
        return CampaignPointRoutes;
    },
    sCampaignPoint: function() {
        return sCampaignPoint;
    },
    sCampaignPointData: function() {
        return sCampaignPointData;
    },
    sCampaignPointReward: function() {
        return sCampaignPointReward;
    },
    sCampaignPointsSearchQuery: function() {
        return sCampaignPointsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _campaignpointsconst = require("./campaign-points.const");
function sCampaignPoint(isPartial) {
    return _fluentjsonschema.default.object().id('#campaignPoint').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sCampaignPointData(isPartial));
}
function sCampaignPointData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).prop('walletAddress', (0, _core.sBCAddress)()).prop('campaignId', (0, _core.sStringId)()).prop('points', _fluentjsonschema.default.number()).prop('perDay', _fluentjsonschema.default.number()).prop('rewards', _fluentjsonschema.default.array().items(sCampaignPointReward())).required(isPartial ? [] : [
        'walletId',
        'walletAddress',
        'campaignId',
        'points',
        'perDay'
    ]);
}
function sCampaignPointReward() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('USD', (0, _core.sBigInt)()).required().prop('tokenId', (0, _core.sStringId)()).prop('amount', (0, _core.sBigInt)());
}
const CAMPAIGN_POINT_FIELDS = [
    '_id',
    'walletId',
    'walletAddress',
    'campaignId',
    'points',
    'perDay',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy'
];
const CAMPAIGN_POINT_SORT_FIELDS = [
    '_id',
    'points'
];
function sCampaignPointsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The wallet IDentifier.').prop('walletAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).description('The wallet blockchain address').prop('campaignId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).description('The campaign IDentifier.').extend((0, _core.sPageSearchQuery)(CAMPAIGN_POINT_FIELDS, CAMPAIGN_POINT_SORT_FIELDS));
}
var CampaignPointRoutes;
(function(CampaignPointRoutes) {
    CampaignPointRoutes[CampaignPointRoutes["v1Search"] = `v1/${_campaignpointsconst.CAMPAIGN_POINTS_ROUTES_KEY}`] = "v1Search";
})(CampaignPointRoutes || (CampaignPointRoutes = {}));

//# sourceMappingURL=campaign-points.model.js.map