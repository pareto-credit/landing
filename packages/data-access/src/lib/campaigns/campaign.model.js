import S from 'fluent-json-schema';
import { sClientEntity, sDateString, sLocales, sStringId, sUnitTime, sPageSearchQuery, sBCAddress } from '../core';
import { CAMPAIGN_FIELDS, CAMPAIGN_SORT_FIELDS, CAMPAIGNS_ROUTES_KEY } from './campaign.const';
export function sCampaign(isPartial) {
    return S.object().id('#campaign').additionalProperties(false).extend(sClientEntity(isPartial)).extend(sCampaignData(isPartial));
}
export function sCampaignData(isPartial) {
    return S.object().additionalProperties(false).prop('code', S.string()).prop('name', sLocales()).prop('description', sLocales()).prop('rules', S.array().items(sCampaignRule())).prop('referrals', S.array().items(sCampaignReferral())).prop('boosts', S.array().items(sCampaignBoost())).prop('startDate', sDateString()).prop('endDate', sDateString()).prop('link', S.string()).prop('galxeId', S.number()).required(isPartial ? [] : [
        'code',
        'name'
    ]);
}
export function sCampaignRule() {
    return S.object().additionalProperties(false).prop('name', sLocales()).required().prop('description', sLocales()).prop('trigger', sCampaignRuleTrigger()).required().prop('deposit', sCampaignRuleDeposit()).required().prop('reward', sCampaignReward()).required().prop('frequency', sCampaignRuleFrequency()).required();
}
export function sCampaignRuleTrigger() {
    return S.string().enum([
        'DEPOSIT',
        'DEPOSIT_REQUEST',
        'MINT'
    ]);
}
export function sCampaignRuleDeposit() {
    return S.object().additionalProperties(false).prop('type', sCampaignRuleDepositType()).required().prop('value', S.number()).required();
}
export function sCampaignRuleDepositType() {
    return S.string().enum([
        'BALANCE',
        'AGE'
    ]);
}
export function sCampaignReward() {
    return S.object().additionalProperties(false).prop('type', sCampaignRewardType()).required().prop('value', S.number()).required();
}
export function sCampaignRewardType() {
    return S.string().enum([
        'AMOUNT',
        'MULTIPLIER',
        'PERCENTAGE'
    ]);
}
export function sCampaignRuleFrequency() {
    return S.object().additionalProperties(false).prop('value', S.number()).required().prop('unit', sUnitTime()).required();
}
export function sCampaignBoost() {
    return S.object().additionalProperties(false).prop('code', S.string()).required().prop('name', sLocales()).required().prop('description', sLocales()).prop('operatorId', sStringId()).prop('link', S.string()).prop('type', sCampaignBoostType()).required().prop('reward', sCampaignReward()).required();
}
export function sCampaignBoostType() {
    return S.string().enum([
        'REFERRAL',
        'STAKE'
    ]);
}
export function sCampaignReferral() {
    return S.object().additionalProperties(false).prop('code', sCampaignReferralCode()).required().prop('isActive', S.boolean()).required();
}
export function sCampaignReferralCode() {
    return S.string().minLength(6).maxLength(8).pattern('^[a-zA-Z0-9]*$');
}
export function sCampaignsSearchQuery() {
    return S.object().additionalProperties(false).prop('code', S.array().maxItems(200).items(S.string())).prop('tokenId', S.array().maxItems(200).items(sStringId())).description('The token IDentifier').prop('startDate', sDateString()).description('The epoch start date equal than').prop('startDate:lt', sDateString()).description('The epoch start date less than').prop('startDate:lte', sDateString()).description('The epoch start date less or equal than').prop('startDate:gt', sDateString()).description('The epoch start date greater than').prop('startDate:gte', sDateString()).description('The epoch start date greater or equal than').prop('endDate', sDateString()).description('The epoch end date equal than').prop('endDate:lt', sDateString()).description('The epoch start date equal than').prop('endDate:lte', sDateString()).description('The epoch start date equal than').prop('endDate:gt', sDateString()).description('The epoch start date equal than').prop('endDate:gte', sDateString()).description('The epoch start date equal than').extend(sPageSearchQuery(CAMPAIGN_FIELDS, CAMPAIGN_SORT_FIELDS));
}
export var CampaignRoutes;
(function(CampaignRoutes) {
    CampaignRoutes[CampaignRoutes["v1Create"] = `v1/${CAMPAIGNS_ROUTES_KEY}`] = "v1Create";
    CampaignRoutes[CampaignRoutes["v1Delete"] = `v1/${CAMPAIGNS_ROUTES_KEY}/:campaignId`] = "v1Delete";
    CampaignRoutes[CampaignRoutes["v1Read"] = `v1/${CAMPAIGNS_ROUTES_KEY}/:campaignId`] = "v1Read";
    CampaignRoutes[CampaignRoutes["v1Update"] = `v1/${CAMPAIGNS_ROUTES_KEY}/:campaignId`] = "v1Update";
    CampaignRoutes[CampaignRoutes["v1Search"] = `v1/${CAMPAIGNS_ROUTES_KEY}`] = "v1Search";
    CampaignRoutes[CampaignRoutes["v1Points"] = `v1/${CAMPAIGNS_ROUTES_KEY}/:campaignId/points`] = "v1Points";
})(CampaignRoutes || (CampaignRoutes = {}));
export var CampaignErrorCodes;
(function(CampaignErrorCodes) {
    CampaignErrorCodes["notFound"] = "CAMPAIGN_NOT_FOUND";
    CampaignErrorCodes["notDeletable"] = "CAMPAIGN_NOT_DELETABLE";
    CampaignErrorCodes["walletRequired"] = "WALLET_REQUIRED";
    CampaignErrorCodes["referralNotValid"] = "REFERRAL_CODE_INVALID";
    CampaignErrorCodes["referralCodeNotActive"] = "REFERRAL_CODE_NOT_ACTIVE";
})(CampaignErrorCodes || (CampaignErrorCodes = {}));
export function sCampaignPointsQuery() {
    return S.object().additionalProperties(false).prop('walletId', sStringId()).description('Wallet Identifier').prop('walletAddress', sBCAddress()).description('Wallet address');
}
export function sCampaignPoints() {
    return S.object().additionalProperties(false).prop('vaults', S.array().items(sCampaignPointsVault())).prop('boosts', S.array().items(sCampaignPointsBoost())).prop('metrics', sCampaignPointsMetrics()).extend(sCampaignMetrics());
}
export function sCampaignPointsVault() {
    return S.object().additionalProperties(false).prop('_id', sStringId()).required().extend(sCampaignMetrics());
}
export function sCampaignPointsMetrics() {
    return S.object().additionalProperties(true);
}
export function sCampaignMetrics() {
    return S.object().prop('points', S.string()).required().prop('perDay', S.string()).required().prop('multiplier', S.string()).required();
}
export function sCampaignPointsBoost() {
    return S.object().additionalProperties(false).prop('code', S.string()).required().extend(sCampaignMetrics());
}

//# sourceMappingURL=campaign.model.js.map