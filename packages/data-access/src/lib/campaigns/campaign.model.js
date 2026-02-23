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
    CampaignErrorCodes: function() {
        return CampaignErrorCodes;
    },
    CampaignRoutes: function() {
        return CampaignRoutes;
    },
    CampaignsRoutingKey: function() {
        return CampaignsRoutingKey;
    },
    sCampaign: function() {
        return sCampaign;
    },
    sCampaignBoost: function() {
        return sCampaignBoost;
    },
    sCampaignBoostType: function() {
        return sCampaignBoostType;
    },
    sCampaignData: function() {
        return sCampaignData;
    },
    sCampaignMetrics: function() {
        return sCampaignMetrics;
    },
    sCampaignMetricsReward: function() {
        return sCampaignMetricsReward;
    },
    sCampaignPoints: function() {
        return sCampaignPoints;
    },
    sCampaignPointsBoost: function() {
        return sCampaignPointsBoost;
    },
    sCampaignPointsMetrics: function() {
        return sCampaignPointsMetrics;
    },
    sCampaignPointsQuery: function() {
        return sCampaignPointsQuery;
    },
    sCampaignPointsVault: function() {
        return sCampaignPointsVault;
    },
    sCampaignRanking: function() {
        return sCampaignRanking;
    },
    sCampaignRankingQuery: function() {
        return sCampaignRankingQuery;
    },
    sCampaignRankingWallet: function() {
        return sCampaignRankingWallet;
    },
    sCampaignReferral: function() {
        return sCampaignReferral;
    },
    sCampaignReferralCode: function() {
        return sCampaignReferralCode;
    },
    sCampaignReward: function() {
        return sCampaignReward;
    },
    sCampaignRewardType: function() {
        return sCampaignRewardType;
    },
    sCampaignRule: function() {
        return sCampaignRule;
    },
    sCampaignRuleDeposit: function() {
        return sCampaignRuleDeposit;
    },
    sCampaignRuleDepositType: function() {
        return sCampaignRuleDepositType;
    },
    sCampaignRuleFrequency: function() {
        return sCampaignRuleFrequency;
    },
    sCampaignRuleTrigger: function() {
        return sCampaignRuleTrigger;
    },
    sCampaignsSearchQuery: function() {
        return sCampaignsSearchQuery;
    }
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _fluentjsonschema = /*#__PURE__*/ _interop_require_default._(require("fluent-json-schema"));
const _core = require("../core");
const _campaignconst = require("./campaign.const");
function sCampaign(isPartial) {
    return _fluentjsonschema.default.object().id('#campaign').additionalProperties(false).extend((0, _core.sClientEntity)(isPartial)).extend(sCampaignData(isPartial));
}
function sCampaignData(isPartial) {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).prop('name', (0, _core.sLocales)()).prop('description', (0, _core.sLocales)()).prop('rules', _fluentjsonschema.default.array().items(sCampaignRule())).prop('referrals', _fluentjsonschema.default.array().items(sCampaignReferral())).prop('boosts', _fluentjsonschema.default.array().items(sCampaignBoost())).prop('startDate', (0, _core.sDateString)()).prop('endDate', (0, _core.sDateString)()).prop('link', _fluentjsonschema.default.string()).prop('galxeId', _fluentjsonschema.default.number()).prop('isSyncable', _fluentjsonschema.default.boolean()).required(isPartial ? [] : [
        'code',
        'name'
    ]);
}
function sCampaignRule() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).required().prop('name', (0, _core.sLocales)()).required().prop('description', (0, _core.sLocales)()).prop('trigger', sCampaignRuleTrigger()).required().prop('deposit', sCampaignRuleDeposit()).required().prop('reward', sCampaignReward()).required().prop('frequency', sCampaignRuleFrequency()).required().prop('vaultIds', _fluentjsonschema.default.array().items((0, _core.sStringId)()));
}
function sCampaignRuleTrigger() {
    return _fluentjsonschema.default.string().enum([
        'DEPOSIT',
        'DEPOSIT_REQUEST'
    ]);
}
function sCampaignRuleDeposit() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('type', sCampaignRuleDepositType()).required().prop('value', _fluentjsonschema.default.number()).required().prop('tokenId', (0, _core.sStringId)());
}
function sCampaignRuleDepositType() {
    return _fluentjsonschema.default.string().enum([
        'BALANCE',
        'BALANCE_USP',
        'BALANCE_SUSP',
        'POOL_BALANCE',
        'AGE'
    ]);
}
function sCampaignReward() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('type', sCampaignRewardType()).required().prop('value', _fluentjsonschema.default.number()).required();
}
function sCampaignRewardType() {
    return _fluentjsonschema.default.string().enum([
        'AMOUNT',
        'MULTIPLIER',
        'PERCENTAGE'
    ]);
}
function sCampaignRuleFrequency() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('value', _fluentjsonschema.default.number()).required().prop('unit', (0, _core.sUnitTime)()).required();
}
function sCampaignBoost() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).required().prop('name', (0, _core.sLocales)()).required().prop('type', sCampaignBoostType()).required().prop('reward', sCampaignReward()).required().prop('startDate', (0, _core.sDateString)()).prop('endDate', (0, _core.sDateString)()).prop('description', (0, _core.sLocales)()).prop('operatorId', (0, _core.sStringId)()).prop('link', _fluentjsonschema.default.string()).prop('linkLabel', (0, _core.sLocales)()).prop('tokenId', (0, _core.sStringId)()).prop('vaultIds', _fluentjsonschema.default.array().items((0, _core.sStringId)())).description('VaultIds realted to the boost').prop('rules', _fluentjsonschema.default.array().items(_fluentjsonschema.default.string())).description('Rules realted to the boost').prop('pools', _fluentjsonschema.default.array().items(_fluentjsonschema.default.string())).description('Pools realted to the boost');
}
function sCampaignBoostType() {
    return _fluentjsonschema.default.string().enum([
        'REFERRAL',
        'REFERRAL_FEE',
        'REFERRED',
        'STAKE',
        'DEPOSIT',
        'DEPOSIT_BALANCER',
        'DEPOSIT_NAPIER',
        'DEPOSIT_PENDLE',
        'DEPOSIT_EULER',
        'SUPPLY_EULER',
        'SUPPLY_TERM'
    ]);
}
function sCampaignReferral() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', sCampaignReferralCode()).required().prop('isActive', _fluentjsonschema.default.boolean()).required();
}
function sCampaignReferralCode() {
    return _fluentjsonschema.default.string().minLength(6).maxLength(8).pattern('^[a-zA-Z0-9]*$');
}
function sCampaignsSearchQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.array().maxItems(200).items(_fluentjsonschema.default.string())).prop('tokenId', _fluentjsonschema.default.array().maxItems(200).items((0, _core.sStringId)())).description('The token IDentifier').prop('startDate', (0, _core.sDateString)()).description('The epoch start date equal than').prop('startDate:lt', (0, _core.sDateString)()).description('The epoch start date less than').prop('startDate:lte', (0, _core.sDateString)()).description('The epoch start date less or equal than').prop('startDate:gt', (0, _core.sDateString)()).description('The epoch start date greater than').prop('startDate:gte', (0, _core.sDateString)()).description('The epoch start date greater or equal than').prop('endDate', (0, _core.sDateString)()).description('The epoch end date equal than').prop('endDate:lt', (0, _core.sDateString)()).description('The epoch start date equal than').prop('endDate:lte', (0, _core.sDateString)()).description('The epoch start date equal than').prop('endDate:gt', (0, _core.sDateString)()).description('The epoch start date equal than').prop('endDate:gte', (0, _core.sDateString)()).description('The epoch start date equal than').extend((0, _core.sPageSearchQuery)(_campaignconst.CAMPAIGN_FIELDS, _campaignconst.CAMPAIGN_SORT_FIELDS));
}
var CampaignsRoutingKey;
(function(CampaignsRoutingKey) {
    CampaignsRoutingKey["idleSync"] = "pareto.campaign.sync";
})(CampaignsRoutingKey || (CampaignsRoutingKey = {}));
var CampaignRoutes;
(function(CampaignRoutes) {
    CampaignRoutes[CampaignRoutes["v1Create"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}`] = "v1Create";
    CampaignRoutes[CampaignRoutes["v1Delete"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}/:campaignId`] = "v1Delete";
    CampaignRoutes[CampaignRoutes["v1Read"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}/:campaignId`] = "v1Read";
    CampaignRoutes[CampaignRoutes["v1Update"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}/:campaignId`] = "v1Update";
    CampaignRoutes[CampaignRoutes["v1Search"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}`] = "v1Search";
    CampaignRoutes[CampaignRoutes["v1Points"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}/:campaignId/points`] = "v1Points";
    CampaignRoutes[CampaignRoutes["v1Sync"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}/:campaignId/sync`] = "v1Sync";
    CampaignRoutes[CampaignRoutes["v1Ranking"] = `v1/${_campaignconst.CAMPAIGNS_ROUTES_KEY}/:campaignId/ranking`] = "v1Ranking";
})(CampaignRoutes || (CampaignRoutes = {}));
var CampaignErrorCodes;
(function(CampaignErrorCodes) {
    CampaignErrorCodes["notFound"] = "CAMPAIGN_NOT_FOUND";
    CampaignErrorCodes["notDeletable"] = "CAMPAIGN_NOT_DELETABLE";
    CampaignErrorCodes["walletRequired"] = "WALLET_REQUIRED";
    CampaignErrorCodes["referralNotValid"] = "REFERRAL_CODE_INVALID";
    CampaignErrorCodes["referralCodeNotActive"] = "REFERRAL_CODE_NOT_ACTIVE";
    CampaignErrorCodes["rankOverflow"] = "RANK_OVERFLOW";
})(CampaignErrorCodes || (CampaignErrorCodes = {}));
function sCampaignPointsQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).description('Wallet Identifier').prop('walletAddress', (0, _core.sBCAddress)()).description('Wallet address');
}
function sCampaignPoints() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('vaults', _fluentjsonschema.default.array().items(sCampaignPointsVault())).prop('boosts', _fluentjsonschema.default.array().items(sCampaignPointsBoost())).prop('metrics', sCampaignPointsMetrics()).extend(sCampaignMetrics());
}
function sCampaignPointsVault() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('_id', (0, _core.sStringId)()).required().extend(sCampaignMetrics());
}
function sCampaignPointsMetrics() {
    return _fluentjsonschema.default.object().additionalProperties(true);
}
function sCampaignMetricsReward() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('USD', (0, _core.sBigInt)()).required().prop('tokenId', (0, _core.sStringId)()).prop('amount', (0, _core.sBigInt)());
}
function sCampaignMetrics() {
    return _fluentjsonschema.default.object().prop('points', _fluentjsonschema.default.string()).required().prop('perDay', _fluentjsonschema.default.string()).required().prop('multiplier', _fluentjsonschema.default.string()).required().prop('multiplierScaled', _fluentjsonschema.default.string()).prop('rewards', _fluentjsonschema.default.array().items(sCampaignMetricsReward())).prop('code', _fluentjsonschema.default.string()).prop('rules', _fluentjsonschema.default.array().items(_fluentjsonschema.default.string()));
}
function sCampaignPointsBoost() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('code', _fluentjsonschema.default.string()).required().extend(sCampaignMetrics());
}
function sCampaignRankingQuery() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sStringId)())).prop('walletAddress', _fluentjsonschema.default.array().minItems(1).maxItems(200).items((0, _core.sBCAddress)())).prop('rank', _fluentjsonschema.default.array().minItems(1).maxItems(200).items(_fluentjsonschema.default.number()));
}
function sCampaignRanking() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('totalPoints', _fluentjsonschema.default.number()).required().prop('totalWallets', _fluentjsonschema.default.number()).required().prop('totalWalletsWithPoints', _fluentjsonschema.default.number()).required().prop('rankings', _fluentjsonschema.default.array().items(sCampaignRankingWallet())).required().prop('updatedAt', _fluentjsonschema.default.string());
}
function sCampaignRankingWallet() {
    return _fluentjsonschema.default.object().additionalProperties(false).prop('walletId', (0, _core.sStringId)()).required().prop('walletAddress', (0, _core.sBCAddress)()).required().prop('points', _fluentjsonschema.default.number()).required().prop('perDay', _fluentjsonschema.default.number()).required().prop('rank', _fluentjsonschema.default.number()).required();
}

//# sourceMappingURL=campaign.model.js.map