import S from 'fluent-json-schema';
import { sBCAddress, sBigInt, sClientEntity, sPageSearchQuery, sStringId } from '../core';
import { CAMPAIGN_POINTS_ROUTES_KEY } from './campaign-points.const';
export function sCampaignPoint(isPartial) {
    return S.object().id('#campaignPoint').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sCampaignPointData(isPartial));
}
export function sCampaignPointData(isPartial) {
    return S.object().additionalProperties(false).prop('walletId', sStringId()).prop('walletAddress', sBCAddress()).prop('campaignId', sStringId()).prop('points', S.number()).prop('perDay', S.number()).prop('rewards', S.array().items(sCampaignPointReward())).required(isPartial ? [] : [
        'walletId',
        'walletAddress',
        'campaignId',
        'points',
        'perDay'
    ]);
}
export function sCampaignPointReward() {
    return S.object().additionalProperties(false).prop('USD', sBigInt()).required().prop('tokenId', sStringId()).prop('amount', sBigInt());
}
export const CAMPAIGN_POINT_FIELDS = [
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
export const CAMPAIGN_POINT_SORT_FIELDS = [
    '_id',
    'points'
];
export function sCampaignPointsSearchQuery() {
    return S.object().additionalProperties(false).prop('walletId', S.array().minItems(1).maxItems(200).items(sStringId())).description('The wallet IDentifier.').prop('walletAddress', S.array().minItems(1).maxItems(200).items(sBCAddress())).description('The wallet blockchain address').prop('campaignId', S.array().minItems(1).maxItems(200).items(sStringId())).description('The campaign IDentifier.').extend(sPageSearchQuery(CAMPAIGN_POINT_FIELDS, CAMPAIGN_POINT_SORT_FIELDS));
}
export var CampaignPointRoutes;
(function(CampaignPointRoutes) {
    CampaignPointRoutes[CampaignPointRoutes["v1Search"] = `v1/${CAMPAIGN_POINTS_ROUTES_KEY}`] = "v1Search";
})(CampaignPointRoutes || (CampaignPointRoutes = {}));

//# sourceMappingURL=campaign-points.model.js.map